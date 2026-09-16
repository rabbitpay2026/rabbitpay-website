import type { LeadInput } from "@/lib/leads-schema";

/**
 * Browser-side client for the lead endpoint.
 *
 * Posts to the app's own `/api/leads` Route Handler — same origin, no configured
 * URL, and no credentials of any kind in the browser. The Resend key lives only
 * on the server (see `lib/email/resend.ts`).
 *
 * Validation helpers live in `lib/leads-schema.ts` and are shared with the
 * route, so the form and the server enforce identical rules.
 */

export const LEADS_ENDPOINT = "/api/leads";

export type SubmitLeadResult =
  | { ok: true; emailId: string | null }
  | { ok: false; message: string };

/** Fallback shown when the server gives us nothing usable. */
const GENERIC_ERROR = "We couldn't submit that just now. Please try again.";

/** The success envelope the route returns, mirroring the old backends. */
type LeadResponse = {
  status?: unknown;
  email_sent?: unknown;
  email_id?: unknown;
  error?: unknown;
};

export async function submitLead(payload: LeadInput): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data =
      ((await response.json().catch(() => null)) as LeadResponse | null) ?? {};
    const message = typeof data.error === "string" ? data.error : GENERIC_ERROR;

    if (!response.ok) return { ok: false, message };

    // Treat it as sent only when the server says so — the same check the React
    // card made on `email_sent`. A 200 with email_sent false is still a failure.
    if (data.status !== "ok" || data.email_sent !== true) {
      return { ok: false, message };
    }

    return { ok: true, emailId: typeof data.email_id === "string" ? data.email_id : null };
  } catch {
    // Network failure, offline, request blocked.
    return { ok: false, message: GENERIC_ERROR };
  }
}

export { isValidEmail, isValidPhone } from "@/lib/leads-schema";
