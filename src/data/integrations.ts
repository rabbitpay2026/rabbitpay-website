import type { PartnerLogo } from "@/types";

/**
 * Logos are self-hosted in `public/logos/` so there are no external requests.
 * Ported from the React project's `sections/Integrations.jsx`.
 */
export const PAYMENT_PARTNERS: PartnerLogo[] = [
  { name: "Razorpay", file: "wm-razorpay.svg" },
  { name: "PhonePe", file: "wm-phonepe.svg" },
  { name: "PayU", file: "wm-payu.svg" },
  { name: "Paytm", file: "wm-paytm.svg" },
  { name: "Cashfree", file: "wm-cashfree-new.jpg" },
  { name: "Juspay", file: "wm-juspay.svg" },
  // Decentro publishes no wordmark lockup — pair the brand mark with the name.
  { name: "Decentro", file: "partner-decentro.png", withText: true },
];

export const MARKETING_PARTNERS: PartnerLogo[] = [
  { name: "Meta", file: "wm-meta.svg" },
  // Google Ads only ships a portrait icon (250x313), so at wordmark height it
  // renders far narrower than the others — `mark` gives it extra height.
  { name: "Google Ads", file: "wm-googleads.svg", mark: true },
  { name: "Google Analytics", file: "wm-ganalytics.png" },
];

/** Official payment-app logos used by the UPI-first feature visual. */
export const UPI_APPS: PartnerLogo[] = [
  { name: "Google Pay", file: "wm-googlepay.svg" },
  { name: "PhonePe", file: "wm-phonepe.svg" },
  { name: "Paytm", file: "wm-paytm.svg" },
  { name: "BHIM UPI", file: "wm-bhim.svg" },
  { name: "Amazon Pay", file: "wm-amazonpay.svg" },
  { name: "CRED", file: "wm-cred.png" },
];
