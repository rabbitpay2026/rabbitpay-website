import { BookOpenCheck, Handshake, Headset, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PARTNER_TYPE_LABELS, PARTNER_TYPES, type PartnerType } from "@/lib/partners-schema";

/**
 * Copy for `/partners`. Nothing here states a commercial figure the website
 * does not already publish — rates and revenue share are agreed per
 * partnership, which is what the page says.
 */

export type PartnerBenefit = {
  title: string;
  body: string;
  /** Component reference, not an element — keeps the data module JSX-free. */
  Icon: LucideIcon;
};

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    title: "A checkout merchants keep",
    body: "RabbitPay is built for Indian D2C: prefilled addresses, UPI-first payments and verified COD that brings RTO down.",
    Icon: Store,
  },
  {
    title: "Terms agreed with you",
    body: "Commercial terms are set partnership by partnership rather than forced into one template, and discussed openly on the first call.",
    Icon: Handshake,
  },
  {
    title: "Direct access to the team",
    body: "The same line every RabbitPay merchant gets — phone, WhatsApp or email, Mon-Sat 09:00 to 21:00 IST. No ticket maze.",
    Icon: Headset,
  },
  {
    title: "Support through every launch",
    body: "Documentation, integration help and a team that stays on the call while your merchants go live.",
    Icon: BookOpenCheck,
  },
];

/** Who the program is for — the same four categories the form offers. */
export const PARTNER_AUDIENCES: { type: PartnerType; label: string; body: string }[] = [
  {
    type: "agency",
    label: PARTNER_TYPE_LABELS.agency,
    body: "Shopify, D2C and performance agencies building or running stores for Indian brands.",
  },
  {
    type: "technology",
    label: PARTNER_TYPE_LABELS.technology,
    body: "Platforms, apps and tools that sit alongside checkout, payments or logistics.",
  },
  {
    type: "affiliate",
    label: PARTNER_TYPE_LABELS.affiliate,
    body: "Consultants, communities and creators who introduce merchants to RabbitPay.",
  },
  {
    type: "other",
    label: PARTNER_TYPE_LABELS.other,
    body: "Something else in mind? Describe it in the form and the team will take a look.",
  },
];

/** What the team looks for in an application. */
export const PARTNER_REQUIREMENTS: string[] = [
  "You work with Indian D2C or Shopify merchants, or you are building for them.",
  "A live website or store URL the team can look at.",
  "A person we can reach by phone or email during working hours.",
  "You stay involved while your merchants onboard, alongside the RabbitPay team.",
];

export const PARTNER_STEPS: { title: string; body: string }[] = [
  {
    title: "Apply",
    body: "Fill in the form at the top of this page. It takes a couple of minutes and there is nothing to sign yet.",
  },
  {
    title: "Talk it through",
    body: "The team reviews your application and gets in touch within 12-24 hours to discuss fit and commercials.",
  },
  {
    title: "Go live",
    body: "Once terms are agreed we set you up and stay on hand through your first merchant launches.",
  },
];

/** Select options for the form, in the order they are offered. */
export const PARTNER_TYPE_OPTIONS = PARTNER_TYPES.map((type) => ({
  value: type,
  label: PARTNER_TYPE_LABELS[type],
}));
