import type {
  PartnerApplicationField,
  PartnerApplicationInput,
} from "@/lib/partners-schema";

/**
 * Browser-side client for the partner application endpoint.
 *
 * Posts to the app's own Route Handler — same origin, no configured URL and no
 * credentials in the browser. The Resend key lives only on the server.
 */

export const PARTNER_APPLICATIONS_ENDPOINT = "/api/partners/applications";

export type SubmitPartnerApplicationResult =
  | { ok: true; emailId: string | null }
  | { ok: false; message: string; field?: PartnerApplicationField };

const GENERIC_ERROR = "We couldn't submit your application just now. Please try again.";

type PartnerApplicationResponse = {
  status?: unknown;
  email_sent?: unknown;
  email_id?: unknown;
  error?: unknown;
  field?: unknown;
};

export async function submitPartnerApplication(
  payload: PartnerApplicationInput,
): Promise<SubmitPartnerApplicationResult> {
  try {
    const response = await fetch(PARTNER_APPLICATIONS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data =
      ((await response.json().catch(() => null)) as PartnerApplicationResponse | null) ?? {};
    const message = typeof data.error === "string" ? data.error : GENERIC_ERROR;
    const field =
      typeof data.field === "string" ? (data.field as PartnerApplicationField) : undefined;

    if (!response.ok) return { ok: false, message, field };

    // Submitted only when the server says the email was accepted — a 200 with
    // email_sent false is still a failure.
    if (data.status !== "ok" || data.email_sent !== true) {
      return { ok: false, message };
    }

    return { ok: true, emailId: typeof data.email_id === "string" ? data.email_id : null };
  } catch {
    return { ok: false, message: GENERIC_ERROR };
  }
}
