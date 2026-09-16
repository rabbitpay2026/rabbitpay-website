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

export const MAX_STORE_URL_LENGTH = 200;
export const MAX_MONTHLY_GMV_LENGTH = 64;

/**
 * A store address, as merchants actually type it.
 *
 * Deliberately permissive about the scheme and the path and strict about only
 * one thing: it has to look like a hostname, meaning at least one dot and a
 * real TLD. That rejects "my store" and "mystore" while accepting every shape
 * a merchant plausibly pastes — `mystore.com`, `www.mystore.com`,
 * `https://mystore.myshopify.com/collections/all`, a port, a trailing slash.
 *
 * A stricter URL check here would be the wrong trade: this field exists so
 * sales can look at the storefront, and a merchant who typed a real address in
 * an unexpected shape is a lead lost to a regex.
 */
const STORE_URL_RE =
  /^(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?::\d{2,5})?(?:[/?#]\S*)?$/i;

/**
 * Reduce a submitted store address to a canonical absolute URL, or null.
 *
 * The scheme is added when missing so the notification email carries a link
 * that is actually clickable — `mystore.com` in an href resolves against the
 * mail client, not the web. Everything after the host is left verbatim,
 * because paths and query strings are case- and character-sensitive and this
 * is not the place to guess at them.
 */
export function normalizeStoreUrl(storeUrl: string): string | null {
  const trimmed = storeUrl.trim();
  if (!trimmed || trimmed.length > MAX_STORE_URL_LENGTH) return null;
  if (!STORE_URL_RE.test(trimmed)) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function isValidStoreUrl(storeUrl: string) {
  return normalizeStoreUrl(storeUrl) !== null;
}

/**
 * Monthly GMV is an optional, free-text qualifier.
 *
 * Left as text on purpose: merchants answer this with "5L", "₹50,00,000",
 * "50 lakh", "10-20L", and coercing that to a number would either reject the
 * honest answer or silently record the wrong figure. Sales reads it; no code
 * computes on it.
 *
 * Returns null for "not provided" — empty, whitespace-only and absent are all
 * the same thing, which is what makes the field genuinely optional rather than
 * optional-unless-you-touch-it.
 */
export function normalizeMonthlyGmv(monthlyGmv: string): string | null {
  const trimmed = monthlyGmv.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_MONTHLY_GMV_LENGTH);
}

export type LeadInput = {
  email: string;
  phone: string;
  /** Required. Absolute URL after normalisation — see `normalizeStoreUrl`. */
  storeUrl: string;
  /**
   * Optional, free text. Absent when the merchant left it blank — the property
   * is omitted rather than set to "", so "not provided" has exactly one
   * representation for every consumer to check.
   */
  monthlyGmv?: string;
  source: LeadSource;
};

export type LeadValidation =
  | { ok: true; value: LeadInput }
  | {
      ok: false;
      field: "email" | "phone" | "storeUrl" | "monthlyGmv" | "source";
      message: string;
    };

/**
 * Validate an unknown payload. Used by the API route on the parsed JSON body and
 * by the form on its own state, so both agree on what is acceptable.
 */
export function validateLead(input: unknown): LeadValidation {
  if (typeof input !== "object" || input === null) {
    return { ok: false, field: "source", message: "Invalid request body." };
  }
  const { email, phone, storeUrl, monthlyGmv, source } = input as Record<string, unknown>;

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
  const normalizedStoreUrl =
    typeof storeUrl === "string" ? normalizeStoreUrl(storeUrl) : null;
  if (!normalizedStoreUrl) {
    return {
      ok: false,
      field: "storeUrl",
      message: "Please enter your store URL (for example, mystore.com).",
    };
  }
  /*
    Optional means optional: undefined, null and "" are all accepted and all
    mean the same thing. Only a value that is present AND over the length cap
    is a rejection — a merchant is never blocked for leaving this blank.
  */
  if (monthlyGmv !== undefined && monthlyGmv !== null && typeof monthlyGmv !== "string") {
    return { ok: false, field: "monthlyGmv", message: "Invalid request body." };
  }
  if (typeof monthlyGmv === "string" && monthlyGmv.length > MAX_MONTHLY_GMV_LENGTH) {
    return {
      ok: false,
      field: "monthlyGmv",
      message: "Monthly GMV is too long.",
    };
  }
  if (!isLeadSource(source)) {
    return { ok: false, field: "source", message: "Invalid request body." };
  }

  const normalizedGmv =
    typeof monthlyGmv === "string" ? normalizeMonthlyGmv(monthlyGmv) : null;

  const value: LeadInput = {
    email: email.trim(),
    phone: phone.trim(),
    storeUrl: normalizedStoreUrl,
    source,
  };
  // Assigned conditionally so a blank field is an ABSENT property, never "".
  if (normalizedGmv) value.monthlyGmv = normalizedGmv;

  return { ok: true, value };
}
