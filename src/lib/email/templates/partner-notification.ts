import { PARTNER_TYPE_LABELS, type PartnerType } from "../../partners-schema.ts";

/**
 * The internal notification sent to the RabbitPay team when a partner
 * application is stored. Same plain format as the lead notification: one
 * internal inbox, no marketing HTML. Every applicant-supplied value is
 * HTML-escaped at the point of use.
 *
 * No `server-only` import: this module renders strings only and holds no
 * secrets, which is what lets the unit tests import it.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type PartnerNotification = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  websiteUrl: string;
  partnerType: PartnerType;
  message?: string;
  submittedAt: Date;
};

const NOT_PROVIDED = "Not provided";

export const PARTNER_NOTIFICATION_SUBJECT = "New RabbitPay Partner Application";

/** "19 Sep 2026, 14:05 IST (09:05 UTC)" — the team reads IST; UTC disambiguates. */
export function formatSubmittedAt(date: Date) {
  const ist = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
  const utc = date.toISOString().slice(11, 16);
  return `${ist} IST (${utc} UTC)`;
}

function lines(notification: PartnerNotification): [string, string][] {
  return [
    ["Full name", notification.fullName],
    ["Email", notification.email],
    ["Phone", notification.phone],
    ["Company", notification.company ?? NOT_PROVIDED],
    ["Website / store URL", notification.websiteUrl],
    ["Partner type", PARTNER_TYPE_LABELS[notification.partnerType]],
    ["Message", notification.message ?? NOT_PROVIDED],
    ["Submitted", formatSubmittedAt(notification.submittedAt)],
  ];
}

export function renderPartnerNotificationText(notification: PartnerNotification) {
  return [
    "New RabbitPay partner application received.",
    "",
    lines(notification).map(([label, value]) => `${label}:\n${value}`).join("\n\n"),
  ].join("\n");
}

export function renderPartnerNotificationHtml(notification: PartnerNotification) {
  const body = [
    "New RabbitPay partner application received.",
    "",
    lines(notification)
      .map(([label, value]) => `${escapeHtml(label)}:\n${escapeHtml(value)}`)
      .join("\n\n"),
  ].join("\n");

  return `<pre style="font-family: sans-serif; font-size: 14px; line-height: 1.5; color: #0F172A; white-space: pre-wrap; margin: 0; padding: 0;">${body}</pre>`;
}
