import { NextResponse, type NextRequest } from "next/server";
import {
  REQUIRED_EMAIL_VARS,
  getEmailFrom,
  getEmailFromDomain,
  getEmailTo,
  getResend,
  missingEmailVars,
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
 *     400 { status: "error", email_sent: false, error, code: "validation_failed" }
 *     429 { status: "error", email_sent: false, error, code: "rate_limited" }
 *     502 { status: "error", email_sent: false, error, code: "email_send_failed" }
 *     503 { status: "error", email_sent: false, error, code: "email_not_configured", missing: [...] }
 *     500 { status: "error", email_sent: false, error, code: "server_error" }
 *
 * `success` is kept alongside `status` purely so nothing that already reads it
 * breaks; `status` / `email_sent` / `email_id` are the fields the old backends
 * returned and are the ones to rely on.
 *
 * `code` is the machine-readable cause. It was added because every deployment
 * failure previously came back as one indistinguishable 500, which made a
 * missing environment variable on AWS Amplify look exactly like a Resend
 * outage. `error` stays a generic human sentence; `code` is what you read in
 * the Network tab. Neither ever carries a secret — `missing` lists variable
 * NAMES only, which are already public in .env.example.
 *
 * Provider responses and stack traces are logged server-side only.
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

/** Failure response in the shape the old backends returned, plus a cause code. */
function fail(
  error: string,
  status: number,
  code: string,
  extra?: Record<string, unknown>,
) {
  return json({ status: "error", email_sent: false, error, code, ...extra }, status);
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

/**
 * GET /api/leads — health/config probe.
 *
 * Answers one question you otherwise cannot answer from outside the server:
 * *did the running server actually receive its environment?* It reports
 * presence as booleans and the sender's domain, never a value, so it is safe to
 * expose. Without it, diagnosing a production failure means guessing between a
 * missing variable, an unverified sender, and a Resend outage.
 *
 * 200 when the route is live and configured, 503 when a variable is missing —
 * so `curl -o /dev/null -w '%{http_code}' https://rabbitpay.ai/api/leads` is a
 * one-line deployment check.
 */
export async function GET() {
  const missing = missingEmailVars();
  const configured = missing.length === 0;
  const fromDomain = getEmailFromDomain();

  return json(
    {
      status: configured ? "ok" : "error",
      route: "/api/leads",
      // Proves the server side of the app deployed at all. If this 404s on
      // Amplify, the app is being served as a static site and no API route
      // exists in production — that is a hosting/platform problem, not a code one.
      runtime: "nodejs",
      email_configured: configured,
      // Names only — these are already documented in .env.example.
      required_vars: REQUIRED_EMAIL_VARS,
      missing_vars: missing,
      // Not a secret: it is in the From header of every email we send.
      email_from_domain: fromDomain,
      // Resend's shared sandbox sender only delivers to the account owner.
      email_from_is_resend_sandbox: fromDomain === "resend.dev",
    },
    configured ? 200 : 503,
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  // --- 1. Generous brake on hammering the endpoint at all ----------------
  // Deliberately loose: a merchant correcting a typo must never be locked out
  // of the lead form. The tight budget is applied to sending, below.
  if (!checkRateLimit(`req:${ip}`, REQUEST_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429, "rate_limited");
  }

  // --- 2. Reject oversized bodies ----------------------------------------
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return fail("Invalid request.", 400, "validation_failed");
  }

  // --- 3. Parse JSON safely ----------------------------------------------
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

  // --- 4. Validate (never trusting the client's own checks) ---------------
  const result = validateLead(payload);
  if (!result.ok) {
    return fail(result.message, 400, "validation_failed", { field: result.field });
  }
  const lead = result.value;

  // --- 5. Spend the send budget, now that we know the payload is real -----
  // Consumed here (not at the top) so invalid submissions cost nothing.
  if (!checkRateLimit(`send:${ip}`, SEND_RULE).allowed) {
    return fail("Too many requests. Please try again in a minute.", 429, "rate_limited");
  }

  // --- 6. Send via Resend -------------------------------------------------
  const resend = getResend();
  const to = getEmailTo();
  const from = getEmailFrom();

  if (!resend || !to || !from) {
    // A deployment problem, not a user problem. Name the missing variables (names
    // only) so the cause is visible without shell access to the server — on
    // Amplify this is what a build that never wrote .env.production looks like.
    const missing = missingEmailVars();
    console.error(
      `[leads] Email is not configured — missing: ${missing.join(", ") || "unknown"}. ` +
        "On AWS Amplify these must be written into .env.production at build time; see amplify.yml.",
    );
    return fail(
      "We couldn't submit that just now. Please try again.",
      503,
      "email_not_configured",
      { missing },
    );
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
      console.error(
        `[leads] Resend rejected the send: ${describeSendError(error)} ` +
          `(from domain=${getEmailFromDomain() ?? "unknown"})`,
      );
      return fail("We couldn't submit that just now. Please try again.", 502, "email_send_failed");
    }

    const emailId = data?.id ?? null;
    if (!emailId) {
      // Mirrors the PHP handler: no id back means nothing was actually sent.
      console.error("[leads] Resend returned no email id — treating as not sent.");
      return fail("We couldn't submit that just now. Please try again.", 502, "email_send_failed");
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
    return fail("We couldn't submit that just now. Please try again.", 500, "server_error");
  }
}
