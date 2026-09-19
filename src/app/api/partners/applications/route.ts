import { NextResponse, type NextRequest } from "next/server";
import {
  getEmailFrom,
  getEmailFromDomain,
  getPartnerEmailTo,
  getResend,
  missingEmailVars,
} from "@/lib/email/resend";
import {
  PARTNER_NOTIFICATION_SUBJECT,
  renderPartnerNotificationHtml,
  renderPartnerNotificationText,
} from "@/lib/email/templates/partner-notification";
import { validatePartnerApplication } from "@/lib/partners-schema";
import { REQUEST_RULE, SEND_RULE, checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/partners/applications — emails a partner application from
 * /partners to the team. Same shape and safeguards as /api/leads; nothing is
 * stored, so "submitted" means "Resend accepted the email".
 *
 *   POST { fullName, email, phone, company?, websiteUrl, partnerType, message? }
 *     200 { status: "ok",    email_sent: true,  email_id }
 *     400 { status: "error", email_sent: false, error, code: "validation_failed", field }
 *     429 { status: "error", email_sent: false, error, code: "rate_limited" }
 *     502 { status: "error", email_sent: false, error, code: "email_send_failed" }
 *     503 { status: "error", email_sent: false, error, code: "email_not_configured", missing }
 *     500 { status: "error", email_sent: false, error, code: "server_error" }
 *
 * `error` is always a generic sentence safe to show in the browser. Provider
 * responses are logged server-side only, and no applicant data is logged.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Every field is capped by the schema; the whole body fits well under this. */
const MAX_BODY_BYTES = 8 * 1024;

const GENERIC_ERROR = "We couldn't submit your application just now. Please try again.";

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function fail(error: string, status: number, code: string, extra?: Record<string, unknown>) {
  return json({ status: "error", email_sent: false, error, code, ...extra }, status);
}

/** Resend's error fields are not own-enumerable; pull them out explicitly. */
function describeSendError(error: unknown): string {
  if (error && typeof error === "object") {
    const { name, message, statusCode } = error as {
      name?: unknown;
      message?: unknown;
      statusCode?: unknown;
    };
    const parts = [
      statusCode === undefined ? null : `statusCode=${String(statusCode)}`,
      name === undefined ? null : `name=${String(name)}`,
      message === undefined ? null : `message=${String(message)}`,
    ].filter(Boolean);
    if (parts.length) return parts.join(" ");
  }
  return String(error);
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  if (!checkRateLimit(`partners:req:${ip}`, REQUEST_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429, "rate_limited");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return fail("Invalid request.", 400, "validation_failed");
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return fail("Invalid request.", 400, "validation_failed");
    }
    payload = JSON.parse(raw);
  } catch {
    return fail("Invalid request.", 400, "validation_failed");
  }

  // Server-side validation is the one that counts; only the listed fields survive.
  const result = validatePartnerApplication(payload);
  if (!result.ok) {
    return fail(result.message, 400, "validation_failed", { field: result.field });
  }
  const application = result.value;

  // Spent only once the payload is known to be real, so typos cost nothing.
  if (!checkRateLimit(`partners:send:${ip}`, SEND_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429, "rate_limited");
  }

  const resend = getResend();
  const from = getEmailFrom();
  const to = getPartnerEmailTo();

  if (!resend || !from || !to) {
    // Names only — these are already public in .env.example.
    const missing = missingEmailVars();
    console.error(
      `[partners] Email is not configured — missing: ${missing.join(", ") || "unknown"}. ` +
        "On AWS Amplify these must be written into .env.production at build time; see amplify.yml.",
    );
    return fail(GENERIC_ERROR, 503, "email_not_configured", { missing });
  }

  const notification = { ...application, submittedAt: new Date() };

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: PARTNER_NOTIFICATION_SUBJECT,
      html: renderPartnerNotificationHtml(notification),
      text: renderPartnerNotificationText(notification),
      replyTo: application.email,
    });

    if (error || !data?.id) {
      // A 403 here almost always means EMAIL_FROM is not on a domain verified
      // in Resend — the shared onboarding@resend.dev sender only delivers to
      // the account owner's own address.
      console.error(
        `[partners] Resend rejected the application email: ` +
          `${error ? describeSendError(error) : "no email id returned"} ` +
          `(from domain=${getEmailFromDomain() ?? "unknown"})`,
      );
      return fail(GENERIC_ERROR, 502, "email_send_failed");
    }

    console.info(`[partners] Application emailed (type=${application.partnerType}, id=${data.id})`);
    return json({ status: "ok", email_sent: true, email_id: data.id }, 200);
  } catch (error) {
    console.error(
      `[partners] Unexpected failure sending the application email: ${describeSendError(error)}`,
    );
    return fail(GENERIC_ERROR, 500, "server_error");
  }
}
