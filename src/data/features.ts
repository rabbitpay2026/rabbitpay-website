import { ShieldCheck, Smartphone, UserRoundCheck } from "lucide-react";
import type { FeatureItem } from "@/types";

/**
 * Product highlights. `visual` names the illustration the FeatureRow renders —
 * the visuals themselves live in `components/product/visuals/` so this stays
 * plain data.
 */
export const FEATURES: FeatureItem[] = [
  {
    eyebrow: "Prefilled checkout",
    title: "Ship a checkout that feels already known.",
    body: "RabbitPay pre-fills the shopper's details so the first screen feels fast, familiar, and frictionless.",
    bullets: [
      "Address, phone, and email can appear prefilled",
      "Cleaner first step on mobile",
      "Designed to reduce drop-offs before payment",
    ],
    Icon: UserRoundCheck,
    visual: "prefill",
  },
  {
    eyebrow: "RTO control",
    title: "Verified COD and risk-aware order capture.",
    body: "Keep the easy COD path, but add the guardrails that reduce fake orders and unnecessary return-to-origin costs.",
    bullets: [
      "Verified COD flows",
      "Smarter risk checks before fulfillment",
      "Less leakage between checkout and delivery",
    ],
    Icon: ShieldCheck,
    visual: "risk",
  },
  {
    eyebrow: "UPI-first",
    title: "A payment experience Indian shoppers actually use.",
    body: "UPI gets the premium treatment, with cards and netbanking available as smooth fallbacks when shoppers need them.",
    bullets: [
      "UPI-first ordering experience",
      "Fast fallback to other payment methods",
      "Built for mobile-heavy Indian traffic",
    ],
    Icon: Smartphone,
    visual: "upi",
  },
];

/** Prefill visual field rows. */
export const PREFILL_FIELDS = [
  { label: "Name", value: "Ananya Sharma", fill: 92 },
  { label: "Phone", value: "+91 98••••••420", fill: 98 },
  { label: "Address", value: "A-14, HSR Layout, Bengaluru", fill: 88 },
  { label: "Pincode", value: "560102", fill: 100 },
];

/** RTO-control visual cards. */
export const RISK_CARDS = [
  { title: "Verified COD", text: "Pending orders screened before dispatch" },
  { title: "Lower RTO", text: "Risk signals help reduce bad-fit orders" },
  { title: "Intent check", text: "Customers confirm details with less friction" },
  { title: "Ops-ready", text: "Clean handoff into fulfillment" },
];
