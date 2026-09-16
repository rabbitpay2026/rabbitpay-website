import "server-only";
import { Resend } from "resend";

/**
 * Server-only Resend client.
 *
 * `import "server-only"` makes this a build error if any Client Component ever
 * imports it, so RESEND_API_KEY cannot leak into the browser bundle by accident.
 * The key is read from a plain (non-NEXT_PUBLIC_) env var, which Next never
 * inlines client-side.
 *
 * The client is created lazily so a missing key fails at request time with a
 * handled error rather than crashing the build or cold start.
 */

let client: Resend | null = null;

export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/** Where lead notifications are delivered. Never hardcoded in a route. */
export function getEmailTo(): string | null {
  return process.env.EMAIL_TO?.trim() || null;
}

/**
 * The notification sender. Must be an address on a domain verified in Resend —
 * an unverified sender is rejected by the API, so there is deliberately no
 * fallback value here.
 */
export function getEmailFrom(): string | null {
  return process.env.EMAIL_FROM?.trim() || null;
}

/** True when every variable the lead email needs is present. */
export function isEmailConfigured() {
  return Boolean(getResend() && getEmailTo() && getEmailFrom());
}

/** The env vars the lead email needs. Order is the order we report them in. */
export const REQUIRED_EMAIL_VARS = ["RESEND_API_KEY", "EMAIL_TO", "EMAIL_FROM"] as const;

/**
 * Names of the required variables that are missing or blank — names only, never
 * values, so this is safe to log and safe to return to the browser.
 *
 * This exists because "email is not configured" is the one failure that looks
 * identical to a provider outage from the outside, and on AWS Amplify it is the
 * likely one: Amplify injects environment variables into the *build* container,
 * and the server that runs this route only sees them if the build wrote them
 * into `.env.production` first (see amplify.yml).
 */
export function missingEmailVars(): string[] {
  return REQUIRED_EMAIL_VARS.filter((name) => !process.env[name]?.trim());
}

/**
 * The sender's domain, e.g. "rabbitpay.ai". Not a secret — it is visible in the
 * From header of every notification — and it is the fastest way to spot the
 * other common misconfiguration: `onboarding@resend.dev` is Resend's shared
 * sandbox sender, which may only deliver to the Resend account owner's own
 * address. Any other recipient is rejected with a 403.
 */
export function getEmailFromDomain(): string | null {
  return getEmailFrom()?.match(/@([^>\s]+)/)?.[1]?.toLowerCase() ?? null;
}
