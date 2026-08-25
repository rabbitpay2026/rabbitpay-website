import { NextResponse, type NextRequest } from "next/server";
import {
  getEmailFrom,
  getEmailTo,
  getResend,
} from "@/lib/email/resend";
import {
  LEAD_NOTIFICATION_SUBJECT,
  renderLeadNotificationHtml,
  renderLeadNotificationText,
} from "@/lib/email/templates/lead-notification";
import { validateLead } from "@/lib/leads-schema";
import { REQUEST_RULE, SEND_RULE, checkRateLimit } from "@/lib/rate-limit";

/**
 * POST /api/leads — the homepage / contact lead-capture endpoint.
 *
 * Replaces the old Hostinger PHP handler and the local FastAPI server; neither
 * is migrated. Runs server-side only, so RESEND_API_KEY never reaches the
 * browser.
 *
 * Contract — matches the FastAPI / PHP handlers this replaces, so the browser
 * client reads the same fields it always did:
 *   POST { email, phone, source }
 *     200 { status: "ok",    email_sent: true,  email_id, success: true }
 *     400 { status: "error", email_sent: false, error }   invalid input
 *     429 { status: "error", email_sent: false, error }   rate limited
 *     500 { status: "error", email_sent: false, error }   send failure
 *
 * `success` is kept alongside `status` purely so nothing that already reads it
 * breaks; `status` / `email_sent` / `email_id` are the fields the old backends
 * returned and are the ones to rely on.
 *
 * Errors returned to the browser are deliberately generic. Provider responses
 * and stack traces are logged server-side only.
 */

// Node runtime: the Resend SDK is not edge-targeted.
export const runtime = "nodejs";
// Never cache a mutation.
export const dynamic = "force-dynamic";

/** Body cap — the payload is three short strings; anything larger is abuse. */
const MAX_BODY_BYTES = 4 * 1024;

function clientIp(request: NextRequest): string {
  // Amplify/CloudFront put the original client first in X-Forwarded-For.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/** Failure response in the shape the old backends returned. */
function fail(error: string, status: number) {
  return json({ status: "error", email_sent: false, error }, status);
}

/**
 * Render a Resend error for the server log.
 *
 * The SDK's error is a plain object whose fields are not own-enumerable, so
 * `JSON.stringify` renders it as `{}` — which is exactly how a misconfigured
 * sender stayed invisible here. Pull the fields out explicitly instead.
 */
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

  // --- 1. Generous brake on hammering the endpoint at all ----------------
  // Deliberately loose: a merchant correcting a typo must never be locked out
  // of the lead form. The tight budget is applied to sending, below.
  if (!checkRateLimit(`req:${ip}`, REQUEST_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429);
  }

  // --- 2. Reject oversized bodies ----------------------------------------
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return fail("Invalid request.", 400);
  }

  // --- 3. Parse JSON safely ----------------------------------------------
  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return fail("Invalid request.", 400);
    }
    payload = JSON.parse(raw);
  } catch {
    return fail("Invalid request.", 400);
  }

  // --- 4. Validate (never trusting the client's own checks) ---------------
  const result = validateLead(payload);
  if (!result.ok) {
    return fail(result.message, 400);
  }
  const lead = result.value;

  // --- 5. Spend the send budget, now that we know the payload is real -----
  // Consumed here (not at the top) so invalid submissions cost nothing.
  if (!checkRateLimit(`send:${ip}`, SEND_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429);
  }

  // --- 6. Send via Resend -------------------------------------------------
  const resend = getResend();
  const to = getEmailTo();
  const from = getEmailFrom();

  if (!resend || !to || !from) {
    // A deployment problem, not a user problem — say so in the server log only.
    console.error(
      "[leads] Email is not configured. Set RESEND_API_KEY, EMAIL_TO and EMAIL_FROM.",
    );
    return fail("We couldn't submit that just now. Please try again.", 500);
  }

  const submittedAt = new Date();
  const notification = { ...lead, submittedAt };

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject: LEAD_NOTIFICATION_SUBJECT,
      html: renderLeadNotificationHtml(notification),
      text: renderLeadNotificationText(notification),
      replyTo: lead.email,
    });

    if (error) {
      // Log the provider detail; return nothing specific to the browser.
      // A 403 here almost always means EMAIL_FROM is on a domain that is not
      // verified in Resend, or EMAIL_TO is not the account owner while sending
      // from the shared onboarding@resend.dev sender.
      console.error(`[leads] Resend rejected the send: ${describeSendError(error)}`);
      return fail("We couldn't submit that just now. Please try again.", 500);
    }

    const emailId = data?.id ?? null;
    if (!emailId) {
      // Mirrors the PHP handler: no id back means nothing was actually sent.
      console.error("[leads] Resend returned no email id — treating as not sent.");
      return fail("We couldn't submit that just now. Please try again.", 500);
    }

    console.info(`[leads] Lead emailed (source=${lead.source}, id=${emailId})`);
    return json(
      { status: "ok", email_sent: true, email_id: emailId, success: true },
      200,
    );
  } catch (error) {
    console.error(
      `[leads] Unexpected failure sending the lead email: ${describeSendError(error)}`,
    );
    return fail("We couldn't submit that just now. Please try again.", 500);
  }
}
