import "server-only";
import type { LeadSource } from "@/lib/leads-schema";
import { LEAD_SOURCE_LABELS } from "@/lib/leads-schema";

/**
 * The internal notification sent to the RabbitPay team when a merchant submits
 * the lead-capture card.
 *
 * Deliberately plain: this goes to one internal inbox, so it mirrors the format
 * the previous backends produced (Email / Phone / Source / Submitted) rather
 * than introducing branded marketing HTML nobody asked for.
 *
 * Every interpolated value is HTML-escaped — the email body is the only place
 * user-supplied text is rendered, so it is escaped at the point of use.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type LeadNotification = {
  email: string;
  phone: string;
  storeUrl: string;
  /** Absent when the merchant left it blank — rendered as "Not provided". */
  monthlyGmv?: string;
  source: LeadSource;
  submittedAt: Date;
};

/**
 * What to print for the one optional field.
 *
 * Spelled out rather than left blank so the reader can tell "the merchant
 * skipped this" from "the field broke on the way here" — an empty line under a
 * heading looks like a bug and invites someone to go and check.
 */
const NOT_PROVIDED = "Not provided";

/**
 * Fixed subject line, identical to the FastAPI and PHP handlers this replaces —
 * the team's inbox filters are built on this exact string, so it must not vary
 * by source. The source is carried in the body instead.
 */
export const LEAD_NOTIFICATION_SUBJECT = "New RabbitPay Demo Request";

export function renderLeadNotificationHtml({
  email,
  phone,
  storeUrl,
  monthlyGmv,
  source,
  submittedAt,
}: LeadNotification) {
  const timestamp = `${submittedAt.toISOString().slice(0, 19).replace("T", " ")} UTC`;
  const body = [
    "New RabbitPay lead received.",
    "",
    "Email:",
    escapeHtml(email),
    "",
    "Phone:",
    escapeHtml(phone),
    "",
    "Store URL:",
    escapeHtml(storeUrl),
    "",
    "Monthly GMV:",
    escapeHtml(monthlyGmv ?? NOT_PROVIDED),
    "",
    "Source:",
    escapeHtml(LEAD_SOURCE_LABELS[source]),
    "",
    "Submitted:",
    timestamp,
  ].join("\n");

  return `<pre style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #0F172A; white-space: pre-wrap; margin: 0; padding: 0;">${body}</pre>`;
}

/** Plain-text alternative, for clients that will not render HTML. */
export function renderLeadNotificationText({
  email,
  phone,
  storeUrl,
  monthlyGmv,
  source,
  submittedAt,
}: LeadNotification) {
  const timestamp = `${submittedAt.toISOString().slice(0, 19).replace("T", " ")} UTC`;
  return [
    "New RabbitPay lead received.",
    "",
    `Email:\n${email}`,
    "",
    `Phone:\n${phone}`,
    "",
    `Store URL:\n${storeUrl}`,
    "",
    `Monthly GMV:\n${monthlyGmv ?? NOT_PROVIDED}`,
    "",
    `Source:\n${LEAD_SOURCE_LABELS[source]}`,
    "",
    `Submitted:\n${timestamp}`,
  ].join("\n");
}
