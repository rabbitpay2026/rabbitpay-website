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
