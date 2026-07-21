from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
import html
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging early so helpers/routes can use `logger` at import time.
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent-managed email integration constants
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get('EMERGENT_EMAIL_KEY')
EMAIL_FROM_NAME = os.environ.get('EMAIL_FROM_NAME', 'RabbitPay')
SALES_INBOX = os.environ.get('SALES_INBOX', 'hello@rabbitpay.in')

if not EMAIL_KEY:
    logger.warning(
        "EMERGENT_EMAIL_KEY is missing — /api/leads will store leads but skip email delivery."
    )

# Create the main app without a prefix
app = FastAPI(title="RabbitPay Marketing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---- Models ----
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    brand: str = Field(min_length=1, max_length=120)
    phone: Optional[str] = Field(default=None, max_length=32)
    monthly_orders: Optional[str] = Field(default=None, max_length=64)
    message: Optional[str] = Field(default=None, max_length=2000)
    source: Optional[str] = Field(default="landing_page", max_length=64)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    brand: str
    phone: Optional[str] = None
    monthly_orders: Optional[str] = None
    message: Optional[str] = None
    source: str = "landing_page"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---- Routes ----
@api_router.get("/")
async def root():
    return {"message": "RabbitPay API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in rows:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return rows


def _lead_email_html(lead: Lead) -> str:
    """Render a compact HTML email body for the sales inbox."""
    esc = html.escape
    fields = [
        ("Name", lead.name),
        ("Email", lead.email),
        ("Brand / Company", lead.brand),
        ("Phone", lead.phone or "—"),
        ("Monthly orders", lead.monthly_orders or "—"),
        ("Source", lead.source),
        ("Submitted", lead.timestamp.isoformat()),
    ]
    rows = "".join(
        f"<tr><td style='padding:8px 12px;border-bottom:1px solid #eef;color:#64748B;font-size:12px;text-transform:uppercase;letter-spacing:.1em'>{esc(k)}</td>"
        f"<td style='padding:8px 12px;border-bottom:1px solid #eef;color:#0F172A;font-size:14px'>{esc(str(v))}</td></tr>"
        for k, v in fields
    )
    message_block = ""
    if lead.message:
        message_block = (
            "<h3 style='margin:24px 0 8px;color:#0F172A;font-size:14px;text-transform:uppercase;letter-spacing:.1em'>Message</h3>"
            f"<p style='margin:0;color:#0F172A;font-size:14px;line-height:1.6;white-space:pre-wrap'>{esc(lead.message)}</p>"
        )
    return f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#FAFAFF; padding:24px;">
      <table role="presentation" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #eef;border-radius:12px;overflow:hidden">
        <tr>
          <td style="background:linear-gradient(135deg,#0D4CB3,#196BF5);padding:20px 24px;color:#fff">
            <div style="font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.14em;opacity:.7">New lead — RabbitPay</div>
            <div style="font-weight:700;font-size:22px;margin-top:4px">{esc(lead.brand)} · {esc(lead.name)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 12px">
            <table role="presentation" style="width:100%;border-collapse:collapse">
              {rows}
            </table>
            {message_block}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px;background:#FAFAFF;border-top:1px solid #eef;color:#64748B;font-size:12px">
            Sent by rabbitpay.in landing page · reply to reach the lead directly.
          </td>
        </tr>
      </table>
    </div>
    """


async def _send_lead_email(lead: Lead) -> Optional[str]:
    """Send the lead notification via the Emergent-managed email proxy."""
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing — skipping send")
        return None
    payload = {
        "to": [SALES_INBOX],
        "subject": f"New RabbitPay lead — {lead.brand} ({lead.name})",
        "html": _lead_email_html(lead),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": lead.email,
    }
    try:
        async with httpx.AsyncClient(timeout=20) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Lead email send failed: {e.response.status_code} {e.response.text}")
        return None
    except Exception as e:
        logger.error(f"Lead email send error: {e}")
        return None


@api_router.post("/leads")
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    try:
        await db.leads.insert_one(doc)
    except Exception as e:
        logger.error(f"Lead insert failed: {e}")
        raise HTTPException(status_code=500, detail="Could not save lead")

    email_id = await _send_lead_email(lead)
    return {
        "status": "ok",
        "id": lead.id,
        "email_sent": email_id is not None,
        "email_id": email_id,
    }


# Include the router in the main app
app.include_router(api_router)


@app.get("/health")
async def health_root():
    """Root-level health endpoint for Kubernetes liveness/readiness probes."""
    return {"status": "ok"}


@app.get("/api/health")
async def health_api():
    """Same health endpoint under /api for ingress-forwarded checks."""
    return {"status": "ok"}


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
