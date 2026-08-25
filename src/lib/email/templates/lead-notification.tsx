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
  source: LeadSource;
  submittedAt: Date;
};

/**
 * Fixed subject line, identical to the FastAPI and PHP handlers this replaces —
 * the team's inbox filters are built on this exact string, so it must not vary
 * by source. The source is carried in the body instead.
 */
export const LEAD_NOTIFICATION_SUBJECT = "New RabbitPay Demo Request";

export function renderLeadNotificationHtml({
  email,
  phone,
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
    `Source:\n${LEAD_SOURCE_LABELS[source]}`,
    "",
    `Submitted:\n${timestamp}`,
  ].join("\n");
}
