import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  PARTNER_NOTIFICATION_SUBJECT,
  formatSubmittedAt,
  renderPartnerNotificationHtml,
  renderPartnerNotificationText,
  type PartnerNotification,
} from "./partner-notification.ts";

const submittedAt = new Date("2026-09-19T09:05:00.000Z");

const full: PartnerNotification = {
  fullName: "Asha Rao",
  email: "asha@agency.com",
  phone: "9876543210",
  company: "Rao Digital",
  websiteUrl: "https://agency.com",
  partnerType: "agency",
  message: "We run Shopify stores for D2C brands.",
  submittedAt,
};

describe("partner notification", () => {
  test("subject is fixed so inbox filters can match it", () => {
    assert.equal(PARTNER_NOTIFICATION_SUBJECT, "New RabbitPay Partner Application");
  });

  test("submission time is rendered in IST with the UTC time alongside", () => {
    assert.equal(formatSubmittedAt(submittedAt), "19 Sept 2026, 14:35 IST (09:05 UTC)");
  });

  test("text body carries every submitted field", () => {
    const text = renderPartnerNotificationText(full);
    for (const expected of [
      "Full name:\nAsha Rao",
      "Email:\nasha@agency.com",
      "Phone:\n9876543210",
      "Company:\nRao Digital",
      "Website / store URL:\nhttps://agency.com",
      "Partner type:\nAgency",
      "Message:\nWe run Shopify stores for D2C brands.",
      "Submitted:\n19 Sept 2026, 14:35 IST (09:05 UTC)",
    ]) {
      assert.ok(text.includes(expected), `missing ${JSON.stringify(expected)}`);
    }
  });

  test("optional fields read 'Not provided' rather than blank", () => {
    const withoutOptional: PartnerNotification = { ...full };
    delete withoutOptional.company;
    delete withoutOptional.message;
    const text = renderPartnerNotificationText(withoutOptional);
    assert.ok(text.includes("Company:\nNot provided"));
    assert.ok(text.includes("Message:\nNot provided"));
    assert.ok(!text.includes("undefined"));
  });

  test("partner type is rendered as its label", () => {
    assert.ok(renderPartnerNotificationText({ ...full, partnerType: "technology" }).includes("Technology partner"));
    assert.ok(renderPartnerNotificationText({ ...full, partnerType: "other" }).includes("Partner type:\nOther"));
  });

  test("html body escapes applicant-supplied markup", () => {
    const html = renderPartnerNotificationHtml({
      ...full,
      fullName: `<script>alert("x")</script>`,
      message: "Tom & Jerry's <b>shop</b>",
    });
    assert.ok(!html.includes("<script>"));
    assert.ok(html.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"));
    assert.ok(html.includes("Tom &amp; Jerry&#39;s &lt;b&gt;shop&lt;/b&gt;"));
    assert.ok(html.startsWith("<pre "));
  });
});
