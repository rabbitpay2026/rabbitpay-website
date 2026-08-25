import type { FaqCategory, FaqItem } from "@/types";

/**
 * The complete RabbitPay FAQ — the single source of truth.
 *
 * Every question and answer is carried over verbatim from the production React
 * implementation (`src/components/sections/FAQ.jsx`). Nothing here was written,
 * expanded, reworded or invented: the copy is byte-identical to what
 * https://rabbitpay.ai/ serves today.
 *
 * The only thing added by the migration is the *grouping*. The 16 questions were
 * sorted into six categories that describe what they actually ask about; the
 * category `title` and `description` are navigational labels for those groups,
 * not product claims.
 *
 * Consumed by:
 *  - `/faq`              — every category, every question
 *  - the homepage        — `HOMEPAGE_FAQS`, a subset selected by id
 *  - the FAQ JSON-LD     — built from `ALL_FAQS`, so structured data can never
 *                          drift from what is rendered
 */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    description: "What RabbitPay is, and the infrastructure behind it.",
    items: [
      {
        id: "what-is-rabbitpay-checkout",
        question: "What is RabbitPay Checkout and how does it help my business?",
        answer:
          "RabbitPay Checkout is a fast one-click checkout built for Shopify brands. It helps improve conversions, reduce checkout abandonment, lower payment costs, and deliver a smoother buying experience.",
      },
      {
        id: "powered-by-cod-king",
        question: "Is RabbitPay powered by COD King?",
        answer:
          "Yes. RabbitPay is built on top of COD King's proven checkout and COD optimization infrastructure, trusted by Indian merchants.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting started",
    description: "Setup, paperwork, and booking a walkthrough.",
    items: [
      {
        id: "setup-time",
        question: "How long does it take to set up RabbitPay?",
        answer:
          "Your RabbitPay Checkout can be live on your Shopify store within 1 hour. Our team takes care of the complete setup for you.",
      },
      {
        id: "documents-required",
        question: "Do I need to submit any documents?",
        answer:
          "No. There are no documents, paperwork, or lengthy verification processes required to get started with RabbitPay.",
      },
      {
        id: "get-a-demo",
        question: "How can I get a demo?",
        answer:
          "Book a free demo with our team, and we'll walk you through the checkout, features, pricing, and answer any questions specific to your business.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "What RabbitPay costs, and fees you can pass on.",
    items: [
      {
        id: "how-much-does-it-cost",
        question: "How much does RabbitPay cost?",
        answer:
          "Choose the pricing that suits your business. Pay 1% on successful prepaid orders and 0.3% on successful COD orders, with no setup fee or monthly commitment, or opt for our monthly plans starting at just ₹999.",
      },
      {
        id: "cod-order-charges",
        question: "What does RabbitPay charge on COD orders?",
        answer:
          "RabbitPay charges 0.3% on successful COD orders. This is separate from the 1% on successful prepaid orders, so you only pay the rate that matches how the order was actually paid.",
      },
      {
        id: "cod-transaction-fee",
        question: "Can I add a COD transaction fee?",
        answer:
          "Yes. You can easily add a COD convenience fee for your customers to encourage prepaid orders and reduce unnecessary COD purchases. This is separate from RabbitPay's own pricing, which is 1% on successful prepaid orders and 0.3% on successful COD orders.",
      },
    ],
  },
  {
    id: "checkout",
    title: "Checkout experience",
    description: "How the checkout looks and behaves for your shoppers.",
    items: [
      {
        id: "address-prefill",
        question: "Can my customers get their address pre-filled during checkout?",
        answer:
          "Yes. RabbitPay intelligently pre-fills customer addresses with up to a 95% fill rate, enabling faster checkouts, fewer address errors, and higher conversion rates.",
      },
      {
        id: "brand-customization",
        question: "Can I customize the checkout to match my brand?",
        answer:
          "Yes. RabbitPay Checkout can be customized with your brand logo, colors, and styling to provide a seamless shopping experience.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & gateways",
    description: "Gateways, payment options, and settlements.",
    items: [
      {
        id: "existing-payment-gateway",
        question: "Can I continue using my existing payment gateway?",
        answer:
          "Yes. RabbitPay works with your existing payment gateway, so there's no need to switch providers.",
      },
      {
        id: "multiple-payment-gateways",
        question: "Can I enable multiple payment gateways?",
        answer:
          "Yes. RabbitPay supports multiple payment gateways, giving you the flexibility to choose how payments are processed.",
      },
      {
        id: "part-payment",
        question: "Does RabbitPay support part payment or split payment?",
        answer:
          "Yes. Collect a partial payment online and the remaining amount on delivery. This helps reduce RTO, improve customer commitment, and increase prepaid conversions.",
      },
      {
        id: "settlements",
        question: "Will my payment settlements change?",
        answer:
          "No. Your existing payment gateway continues to handle settlements, so your settlement process remains exactly the same.",
      },
    ],
  },
  {
    id: "platform-security",
    title: "Platform & security",
    description: "Working with Shopify, and how your data is handled.",
    items: [
      {
        id: "shopify-compatibility",
        question: "Will RabbitPay work with my Shopify store?",
        answer:
          "Yes. RabbitPay is built specifically for Shopify stores and can be integrated without disrupting your existing operations.",
      },
      {
        id: "data-security",
        question: "Is my data secure?",
        answer:
          "Yes. RabbitPay follows industry-standard security practices to protect your customer and transaction data.",
      },
    ],
  },
];

/** Every question, flattened — used by the homepage subset and the JSON-LD. */
export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((category) => category.items);

/**
 * The questions the homepage preview shows, chosen by id so the selection stays
 * stable if categories are reordered. These are the six that cover what a
 * merchant evaluating RabbitPay asks first.
 */
const HOMEPAGE_FAQ_IDS = [
  "what-is-rabbitpay-checkout",
  "setup-time",
  "how-much-does-it-cost",
  "cod-order-charges",
  "existing-payment-gateway",
  "address-prefill",
] as const;

export const HOMEPAGE_FAQS: FaqItem[] = HOMEPAGE_FAQ_IDS.map((id) => {
  const item = ALL_FAQS.find((faq) => faq.id === id);
  if (!item) throw new Error(`Homepage FAQ id "${id}" is not present in FAQ_CATEGORIES`);
  return item;
});
