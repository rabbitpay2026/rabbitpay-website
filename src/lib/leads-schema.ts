/**
 * Lead validation rules, shared by the browser and the API route.
 *
 * This module is intentionally dependency-free and safe to import from both
 * sides: the client uses it for instant feedback, the server re-runs the exact
 * same checks because client-side validation is never trusted. Keeping one copy
 * means the two can't drift apart.
 */

/** Where a lead came from. The server rejects anything not in this list. */
export const LEAD_SOURCES = ["hero_inline", "demo_cta", "contact_page"] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

/** Human-readable labels used in the notification email subject and body. */
export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  hero_inline: "Homepage",
  demo_cta: "Homepage — Demo CTA",
  contact_page: "Contact page",
};

export function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === "string" && (LEAD_SOURCES as readonly string[]).includes(value);
}

/** Ported verbatim from the React LeadCaptureCard. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_EMAIL_LENGTH = 254;
export const MAX_PHONE_LENGTH = 32;

export function isValidEmail(email: string) {
  const trimmed = email.trim();
  return trimmed.length <= MAX_EMAIL_LENGTH && EMAIL_RE.test(trimmed);
}

/**
 * Reduce a submitted phone number to its 10 national digits, or null.
 *
 * Accepts the shapes merchants actually type — "9876543210",
 * "+91 98765 43210", "091-98765-43210", "(+91) 9876543210" — by stripping
 * separators and an optional +91 / 91 / 0 trunk prefix.
 */
export function normalizeIndianPhone(phone: string): string | null {
  if (phone.length > MAX_PHONE_LENGTH) return null;
  let digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  // Indian mobile numbers are 10 digits beginning 6-9.
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function isValidPhone(phone: string) {
  return normalizeIndianPhone(phone.trim()) !== null;
}

export type LeadInput = {
  email: string;
  phone: string;
  source: LeadSource;
};

export type LeadValidation =
  | { ok: true; value: LeadInput }
  | { ok: false; field: "email" | "phone" | "source"; message: string };

/**
 * Validate an unknown payload. Used by the API route on the parsed JSON body and
 * by the form on its own state, so both agree on what is acceptable.
 */
export function validateLead(input: unknown): LeadValidation {
  if (typeof input !== "object" || input === null) {
    return { ok: false, field: "source", message: "Invalid request body." };
  }
  const { email, phone, source } = input as Record<string, unknown>;

  if (typeof email !== "string" || !isValidEmail(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }
  if (typeof phone !== "string" || !isValidPhone(phone)) {
    return {
      ok: false,
      field: "phone",
      message: "Please enter a valid 10-digit Indian mobile number.",
    };
  }
  if (!isLeadSource(source)) {
    return { ok: false, field: "source", message: "Invalid request body." };
  }

  return { ok: true, value: { email: email.trim(), phone: phone.trim(), source } };
}
