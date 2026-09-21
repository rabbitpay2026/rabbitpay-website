/**
 * Partner application validation, shared by the browser and the API route.
 *
 * Dependency-free so both sides can import it: the form uses it for instant
 * feedback, the route re-runs it because client-side validation is never
 * trusted. Email, phone and URL rules are reused from `leads-schema` so the two
 * forms on the site cannot disagree about what a valid address looks like.
 */
import {
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_STORE_URL_LENGTH,
  isValidEmail,
  normalizeIndianPhone,
  normalizeStoreUrl,
} from "./leads-schema.ts";

export { MAX_EMAIL_LENGTH, MAX_PHONE_LENGTH, MAX_STORE_URL_LENGTH };

/** Partner categories. The server rejects anything not in this list. */
export const PARTNER_TYPES = ["agency", "technology", "affiliate", "other"] as const;

export type PartnerType = (typeof PARTNER_TYPES)[number];

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  agency: "Agency",
  technology: "Technology partner",
  affiliate: "Affiliate",
  other: "Other",
};

export function isPartnerType(value: unknown): value is PartnerType {
  return typeof value === "string" && (PARTNER_TYPES as readonly string[]).includes(value);
}

export const MAX_FULL_NAME_LENGTH = 100;
export const MAX_COMPANY_LENGTH = 120;
export const MAX_MESSAGE_LENGTH = 1000;

/** Collapse runs of whitespace so "  Asha   Rao " and "Asha Rao" store alike. */
function collapse(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function isValidFullName(fullName: string) {
  const name = collapse(fullName);
  return name.length >= 2 && name.length <= MAX_FULL_NAME_LENGTH;
}

export function isValidWebsiteUrl(websiteUrl: string) {
  return normalizeStoreUrl(websiteUrl) !== null;
}

export function isValidPartnerPhone(phone: string) {
  return normalizeIndianPhone(phone.trim()) !== null;
}

export type PartnerApplicationInput = {
  fullName: string;
  email: string;
  phone: string;
  /** Optional. Absent — never "" — when the applicant left it blank. */
  company?: string;
  /** Required. Absolute URL after normalisation. */
  websiteUrl: string;
  partnerType: PartnerType;
  message?: string;
};

export type PartnerApplicationField =
  | "fullName"
  | "email"
  | "phone"
  | "company"
  | "websiteUrl"
  | "partnerType"
  | "message";

export type PartnerApplicationValidation =
  | { ok: true; value: PartnerApplicationInput }
  | { ok: false; field: PartnerApplicationField; message: string };

/** Per-field messages, so the form and the API say the same thing. */
export const PARTNER_MESSAGES: Record<PartnerApplicationField, string> = {
  fullName: "Please enter your full name.",
  email: "Please enter a valid work email address.",
  phone: "Please enter a valid 10-digit Indian mobile number.",
  company: "Company name is too long.",
  websiteUrl: "Please enter a valid website or store URL (for example, mystore.com).",
  partnerType: "Please choose a partner type.",
  message: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
};

/** Validate an unknown payload and return the normalised application. */
export function validatePartnerApplication(input: unknown): PartnerApplicationValidation {
  if (typeof input !== "object" || input === null) {
    return { ok: false, field: "fullName", message: "Invalid request body." };
  }
  const { fullName, email, phone, company, websiteUrl, partnerType, message } =
    input as Record<string, unknown>;

  if (typeof fullName !== "string" || !isValidFullName(fullName)) {
    return { ok: false, field: "fullName", message: PARTNER_MESSAGES.fullName };
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return { ok: false, field: "email", message: PARTNER_MESSAGES.email };
  }
  const normalizedPhone = typeof phone === "string" ? normalizeIndianPhone(phone.trim()) : null;
  if (!normalizedPhone) {
    return { ok: false, field: "phone", message: PARTNER_MESSAGES.phone };
  }
  if (company !== undefined && company !== null && typeof company !== "string") {
    return { ok: false, field: "company", message: "Invalid request body." };
  }
  if (typeof company === "string" && collapse(company).length > MAX_COMPANY_LENGTH) {
    return { ok: false, field: "company", message: PARTNER_MESSAGES.company };
  }
  const normalizedUrl = typeof websiteUrl === "string" ? normalizeStoreUrl(websiteUrl) : null;
  if (!normalizedUrl) {
    return { ok: false, field: "websiteUrl", message: PARTNER_MESSAGES.websiteUrl };
  }
  if (!isPartnerType(partnerType)) {
    return { ok: false, field: "partnerType", message: PARTNER_MESSAGES.partnerType };
  }
  if (message !== undefined && message !== null && typeof message !== "string") {
    return { ok: false, field: "message", message: "Invalid request body." };
  }
  if (typeof message === "string" && message.trim().length > MAX_MESSAGE_LENGTH) {
    return { ok: false, field: "message", message: PARTNER_MESSAGES.message };
  }

  const value: PartnerApplicationInput = {
    fullName: collapse(fullName),
    email: email.trim().toLowerCase(),
    phone: normalizedPhone,
    websiteUrl: normalizedUrl,
    partnerType,
  };
  // Assigned conditionally so a blank optional field is absent, never "".
  const normalizedCompany = typeof company === "string" ? collapse(company) : "";
  if (normalizedCompany) value.company = normalizedCompany;
  const normalizedMessage = typeof message === "string" ? message.trim() : "";
  if (normalizedMessage) value.message = normalizedMessage;

  return { ok: true, value };
}

export { isValidEmail };
