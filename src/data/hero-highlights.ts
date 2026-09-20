import {
  Layers,
  MapPin,
  MousePointerClick,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import type { HeroHighlight } from "@/types";

/**
 * The six capability callouts arranged around the hero's checkout demo.
 *
 * Every line is something this site already states, and each entry carries the
 * answer in `data/faq.ts` (or the module) it comes from. Nothing here is a new
 * claim, and deliberately none of it is a number: no speed, fill rate,
 * conversion or volume figure appears, because none is supported by data in
 * this repository.
 *
 * COD sits in the set as one capability of six rather than the headline
 * message, which is what the content plan asks for.
 */
export const HERO_HIGHLIGHTS: HeroHighlight[] = [
  {
    // FAQ `address-prefill` ("pre-fills the customer's saved address at
    // checkout") and `how-does-checkout-work` ("already filled in and
    // editable"). Same wording as llms.txt.
    title: "Address autofill",
    label: "Prefilled and editable",
    Icon: MapPin,
  },
  {
    // FAQ `what-payment-methods`: "UPI takes the primary position in the
    // payment step" and names Google Pay, PhonePe, Paytm, BHIM UPI, Amazon Pay
    // and CRED. The payment rows in the checkout demo match.
    title: "UPI-first payments",
    label: "GPay, PhonePe & more",
    Icon: Smartphone,
  },
  {
    // FAQ `what-is-rabbitpay-checkout`: "a fast one-click checkout built for
    // Shopify brands". The mobile-number sign-in is the demo's own first step.
    title: "One-click checkout",
    label: "Mobile number sign-in",
    Icon: MousePointerClick,
  },
  {
    // FAQ `verified-cod-how` and RISK_CARDS in `data/features.ts`: "pending
    // orders are screened before dispatch".
    title: "Verified COD",
    label: "Checked before dispatch",
    Icon: ShieldCheck,
  },
  {
    // FAQ `shopify-compatibility` ("built specifically for Shopify stores"),
    // `existing-payment-gateway` and `settlements` (gateway and settlements
    // stay as they are).
    title: "Built for Shopify",
    label: "Keeps your gateway",
    Icon: ShoppingBag,
  },
  {
    // FAQ `how-does-checkout-work`: "designed to read as one screen on mobile
    // rather than a multi-step form". A description of the flow, not a
    // measured speed-up.
    title: "Fewer checkout steps",
    label: "One screen, not a form",
    Icon: Layers,
  },
];
