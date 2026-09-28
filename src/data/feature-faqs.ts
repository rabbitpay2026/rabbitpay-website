import { ALL_FAQS } from "@/data/faq";
import type { FaqItem } from "@/types";

/**
 * The questions each Features page shows.
 *
 * Mostly questions already in `data/faq.ts`, picked by id so an answer is never
 * written twice. The rest are page-specific and follow that file's rule: each
 * is assembled from something the site or RabbitPay's own documentation
 * already states, and carries a `source:` comment saying what.
 *
 * These are not emitted as FAQPage structured data — see `FeatureFaq`.
 */

/** Existing FAQ entries by id; throws at import time if an id disappears. */
function pick(...ids: string[]): FaqItem[] {
  return ids.map((id) => {
    const item = ALL_FAQS.find((faq) => faq.id === id);
    if (!item) throw new Error(`FAQ id "${id}" is not present in data/faq.ts`);
    return item;
  });
}

export const ONE_CLICK_FAQS: FaqItem[] = [
  ...pick("how-does-checkout-work"),
  {
    // source: the checkout journey (`data/checkout-journey.ts`), FAQ
    // `address-prefill`, and the documentation's checkout flow, where existing
    // shoppers get their saved details back after the number is verified.
    id: "returning-vs-first-time",
    question: "Is the checkout different for returning and first-time shoppers?",
    answer:
      "Both start the same way: a mobile number, confirmed with a one-time code. When saved details are available for that number they come back already filled in and editable; when they are not, the shopper enters their delivery details. Both then choose how to pay and place the order.",
  },
  ...pick("setup-time", "documents-required", "shopify-compatibility", "brand-customization"),
];

export const ADDRESS_AUTOFILL_FAQS: FaqItem[] = [
  ...pick("address-prefill"),
  {
    // source: the checkout journey step "Delivery details prefilled" and the
    // prefill bullets in `data/features.ts`.
    id: "which-details-prefilled",
    question: "Which details can be prefilled?",
    answer:
      "The shopper's name, delivery address, phone number and email. They appear next to the order summary, already filled in, once the mobile number has been confirmed with a one-time code.",
  },
  {
    // source: the prefill illustration ("Editable before payment") and FAQ
    // `how-does-checkout-work` ("already filled in and editable").
    id: "can-shoppers-edit-prefill",
    question: "Can shoppers change a prefilled address?",
    answer:
      "Yes. Prefilled details are editable before payment, so a shopper sending an order to a different address changes it in the checkout rather than starting over.",
  },
  {
    // source: the checkout journey — prefill depends on saved details being
    // available for the verified number.
    id: "no-saved-details",
    question: "What happens if there are no saved details for a number?",
    answer:
      "Nothing is prefilled, and the shopper enters their delivery details. The rest of the checkout — the order summary, the payment step and the confirmation — is the same.",
  },
  ...pick("data-security"),
];

export const UPI_FAQS: FaqItem[] = [
  ...pick("what-payment-methods"),
  {
    // source: RabbitPay documentation, "How to Accept UPI QR Code Payments"
    // and "Generate Razorpay QR Code".
    id: "upi-qr-in-checkout",
    question: "Can shoppers pay by scanning a UPI QR code?",
    answer:
      "Yes, for stores using Razorpay. Once a QR code has been created in Razorpay, a shopper who chooses UPI can show the QR code inside the RabbitPay checkout and scan it with their UPI app, without being sent to a separate payment page. The QR code only needs to be created once.",
    link: {
      href: "/documentation/product/upi-qr-payments",
      label: "Read the UPI QR setup guide",
      proxied: true,
    },
  },
  {
    // source: RabbitPay documentation, "How to Control Payment Option Priority".
    id: "payment-option-order",
    question: "Can I choose which payment option appears first?",
    answer:
      "Yes. Payment rules in the RabbitPay Dashboard are evaluated from top to bottom, and moving a rule up or down changes which option shoppers see first — for example, placing full prepaid payment above cash on delivery.",
    link: {
      href: "/documentation/dashboard-handbook/payment-option-priority",
      label: "Read the payment priority guide",
      proxied: true,
    },
  },
  ...pick("existing-payment-gateway", "settlements", "when-am-i-charged"),
];

export const CONVERSION_FAQS: FaqItem[] = [
  {
    // source: llms.txt "Figures RabbitPay publishes" — RabbitPay publishes no
    // conversion-uplift figure on this site.
    id: "conversion-uplift-figure",
    question: "How much will RabbitPay increase my conversion rate?",
    answer:
      "RabbitPay does not publish a conversion-uplift figure, and results depend on each store's traffic, products and payment mix. The reliable answer is the one you measure on your own store: completed checkouts before and after, over comparable periods.",
  },
  {
    // source: the measurement method on /solutions/checkout-conversion.
    id: "measure-completed-checkouts",
    question: "How do I measure completed checkouts?",
    answer:
      "Compare the share of sessions that reach checkout and go on to complete an order, using Shopify's own reports or your analytics tool, across two periods of the same length with similar campaigns. Look at completed orders rather than checkout starts, split prepaid from COD, and for COD orders follow through to delivered versus returned.",
  },
  ...pick("what-problem-does-rabbitpay-solve", "what-is-rto", "part-payment", "cod-transaction-fee"),
];

export const INTEGRATIONS_FAQS: FaqItem[] = [
  ...pick("which-gateways-supported", "multiple-payment-gateways", "settlements"),
  ...pick("marketing-analytics-integrations"),
  {
    // source: FAQ `shopify-compatibility` and llms.txt ("The site documents
    // Shopify only; no other ecommerce platform is described").
    id: "other-platforms",
    question: "Does RabbitPay work on platforms other than Shopify?",
    answer:
      "RabbitPay is built specifically for Shopify stores, and this site does not describe support for any other ecommerce platform. If your store runs on something else, ask the team before planning around it.",
    link: { href: "/contact", label: "Ask the team" },
  },
  {
    // source: RabbitPay documentation, "One Click Checkout for Shopify"
    // (Shopify collaborator access).
    id: "store-access-for-setup",
    question: "What access does the RabbitPay team need to set up my store?",
    answer:
      "Collaborator access to your Shopify store. You copy the collaborator request code from Settings → Users and permissions in Shopify admin and share it with your store URL. You never need to share your Shopify password.",
  },
];

export const SHOPIFY_PRICING_URL = "https://www.shopify.com/in/pricing";

export const PRICING_FAQS: FaqItem[] = [
  {
    id: "how-does-pricing-work",
    question: "How does RabbitPay pricing work?",
    answer:
      "This page does not list a price table. You tell the team about your store through the form on this page, and they contact you within 12–24 hours to discuss pricing for your requirements.",
    link: { href: "#demo-section", label: "Ask about pricing" },
  },
  {
    id: "fixed-or-customised",
    question: "Is RabbitPay pricing fixed or customised?",
    answer:
      "The team discusses pricing with you based on your store and requirements rather than publishing a fixed price list here. Ask them what applies to your store.",
  },
  {
    id: "what-pricing-depends-on",
    question: "What does pricing depend on?",
    answer:
      "That is what the conversation is for. It starts from your store and requirements. Sharing your store URL and, if you can, your monthly GMV gives the team a starting point.",
  },
  {
    id: "gateway-charges-included",
    question: "Are payment gateway charges included?",
    answer:
      "RabbitPay works with the payment gateway you already use, and your gateway keeps handling settlements. Your gateway's charges come from your own arrangement with it. Ask the team to confirm exactly what RabbitPay's pricing covers for your store.",
    link: { href: "/integrations", label: "See supported gateways" },
  },
  {
    id: "compare-shopify-transaction-costs",
    question: "How does RabbitPay compare with Shopify transaction costs?",
    answer:
      "Shopify's pricing page lists a transaction fee for orders paid through a third-party payment provider, and the rate varies by Shopify plan. RabbitPay does not claim to remove it or to guarantee a saving. The team can go through how your Shopify plan, your gateway and RabbitPay fit together for your store.",
    link: { href: SHOPIFY_PRICING_URL, label: "See Shopify's pricing", external: true },
  },
  {
    id: "what-to-share-for-pricing",
    question: "What information should I provide to get pricing?",
    answer:
      "The form asks for your email address, mobile number and store URL. Monthly GMV is optional, but it helps the team understand your store's scale.",
  },
  {
    id: "existing-shopify-store",
    question: "Can I use RabbitPay with my existing Shopify store?",
    answer:
      "Yes. RabbitPay is built specifically for Shopify stores and integrates without disrupting your existing operations. You keep your current payment gateway, and the team handles the setup.",
    link: { href: "/features/one-click-checkout", label: "How setup works" },
  },
];
