import type { PricingPlan, PricingRow } from "@/types";

/** Plan columns. Values mirror the React implementation exactly. */
export const PRICING_PLANS: PricingPlan[] = [
  {
    key: "growth",
    name: "Growth",
    tagline: "For growing D2C brands",
    price: "1%",
    priceNote: "on successful prepaid orders",
    secondaryPrice: "0.3%",
    secondaryPriceNote: "on successful COD orders",
    highlight: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "For 50k+ monthly orders",
    price: "Custom",
    priceNote: "volume-based pricing",
    highlight: false,
  },
];

export const PRICING_ROWS: PricingRow[] = [
  { feature: "Setup Fee", growth: "Free", enterprise: "Free" },
  {
    feature: "Transaction Fee",
    growth: [
      { value: "1%", note: "on successful prepaid orders" },
      { value: "0.3%", note: "on successful COD orders" },
    ],
    enterprise: "Custom",
  },
  { feature: "COD Verification", growth: "Included", enterprise: "Included" },
  { feature: "Customer Support", growth: "Standard", enterprise: "Dedicated" },
  { feature: "SLA", growth: false, enterprise: true },
  { feature: "Monthly Volume", growth: "Unlimited", enterprise: "50k+" },
  { feature: "MDR Discounts", growth: false, enterprise: true },
  { feature: "Dedicated CSM", growth: false, enterprise: true },
];

export const PRICING_TRUST_POINTS = [
  "PCI-DSS Level 1",
  "SOC 2 - In progress",
  "Made in India",
];
