import type { FaqCategory, FaqItem } from "@/types";

/**
 * The complete RabbitPay FAQ — the single source of truth.
 *
 * Provenance matters here, so entries come in two clearly separable tiers:
 *
 *  1. ORIGINAL (16 questions, marked below). Carried over verbatim from the
 *     production React implementation (`src/components/sections/FAQ.jsx`). The
 *     copy is byte-identical to what https://rabbitpay.ai/ has always served.
 *     Do not reword these without a content decision.
 *
 *  2. DERIVED (marked below). Written during the SEO / AI-discoverability work
 *     to answer questions merchants and AI systems actually ask that the
 *     original 16 left unanswered. Every one is assembled from facts already
 *     published elsewhere on this site, and each carries a `source:` comment
 *     naming the module or section those facts come from. Nothing here is
 *     invented: no capability, price, integration, certification, statistic,
 *     customer or policy appears that the website does not already state.
 *
 * When a fact changes on the site, change it here too — these answers are
 * reported to search engines and AI crawlers as authoritative.
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
    description: "What RabbitPay is, who it is built for, and the infrastructure behind it.",
    items: [
      {
        // ORIGINAL
        id: "what-is-rabbitpay-checkout",
        question: "What is RabbitPay Checkout and how does it help my business?",
        answer:
          "RabbitPay Checkout is a fast one-click checkout built for Shopify brands. It helps improve conversions, reduce checkout abandonment, lower payment costs, and deliver a smoother buying experience.",
        link: { href: "/features", label: "See all features" },
      },
      {
        // DERIVED — source: hero eyebrow "Built for Indian D2C brands", the logo
        // wall heading, `data/trust.ts` TRUST_POINTS, and the Shopify answers below.
        id: "who-is-rabbitpay-for",
        question: "Who is RabbitPay built for?",
        answer:
          "Indian D2C brands selling on Shopify — particularly high-COD businesses, where unverified cash-on-delivery orders and return-to-origin are a real cost, and brands that treat checkout conversion as something worth optimising rather than accepting as-is.",
      },
      {
        // DERIVED — source: the Metrics section intro ("more conversion, less RTO,
        // faster checkout completion, more addresses prefilled") and `data/features.ts`.
        id: "what-problem-does-rabbitpay-solve",
        question: "What problem does RabbitPay solve?",
        answer:
          "Three costs that sit at the same point in an Indian D2C funnel: shoppers dropping off during a slow checkout, unverified COD orders that ship and come back undelivered, and payment friction on mobile. RabbitPay addresses all three at the checkout step itself — address prefill to cut typing, verified COD and risk checks to cut RTO, and a UPI-first payment step for mobile-heavy traffic.",
      },
      /*
        Removed: "What results does RabbitPay report?". It existed only to
        report the four merchant-impact counters the homepage used to carry
        (35% conversion uplift, 28% RTO reduction, sub-3s checkout, 92% prefill
        rate). Those counters are gone — no merchant data in this repository
        supports them — so the question had nothing left to point at, and
        leaving it would have kept the figures in the FAQ schema after they
        stopped being published.
      */
      {
        // ORIGINAL
        id: "powered-by-cod-king",
        question: "Is RabbitPay powered by COD King?",
        answer:
          "Yes. RabbitPay is built on top of COD King's proven checkout and COD optimization infrastructure, trusted by Indian merchants.",
      },
    ],
  },
  {
    id: "checkout",
    title: "Checkout experience",
    description: "How the checkout looks and behaves for your shoppers.",
    items: [
      {
        // DERIVED — source: the hero's checkout mock (`mock-checkout-ui.tsx`),
        // which is the checkout the site itself puts on screen.
        id: "how-does-checkout-work",
        question: "What does the RabbitPay checkout look like for a shopper?",
        answer:
          "The shopper opens a checkout with their delivery address already filled in and editable, sees the order summary and total, then picks how to pay — UPI, cards or netbanking, or verified cash on delivery — and confirms. It is designed to read as one screen on mobile rather than a multi-step form.",
        link: { href: "/features/one-click-checkout", label: "See the checkout in detail" },
      },
      {
        /*
          ORIGINAL, with one edit: the "up to a 95% fill rate" figure has been
          dropped. It is a performance claim with no supporting merchant data in
          this repository, it sat on the homepage FAQ preview next to a 92%
          prefill counter that said something different, and that counter has
          now been removed for the same reason. Everything else the answer said
          is unchanged.
        */
        id: "address-prefill",
        question: "Can my customers get their address pre-filled during checkout?",
        answer:
          "Yes. RabbitPay pre-fills the customer's saved address at checkout, so shoppers type less, make fewer address errors, and move through checkout faster.",
        link: { href: "/features/address-autofill", label: "How address autofill works" },
      },
      {
        // DERIVED — source: `data/features.ts` UPI-first feature and bullets,
        // `data/integrations.ts` UPI_APPS, and the checkout mock's payment rows.
        id: "what-payment-methods",
        question: "Which payment methods can my shoppers use?",
        answer:
          "UPI takes the primary position in the payment step, with cards and netbanking as fallbacks, and verified cash on delivery alongside them. The UPI experience covers the apps Indian shoppers already use — Google Pay, PhonePe, Paytm, BHIM UPI, Amazon Pay and CRED.",
        link: { href: "/features/upi-checkout", label: "See the UPI-first experience" },
      },
      {
        // DERIVED — source: `data/features.ts` RTO-control feature bullets and
        // RISK_CARDS ("Pending orders screened before dispatch", "Intent check").
        id: "verified-cod-how",
        question: "How does verified COD work?",
        answer:
          "RabbitPay keeps the COD path your shoppers expect and adds guardrails around it: pending orders are screened before dispatch, risk checks run before fulfillment, and customers confirm their details with less friction. The aim is fewer fake orders and less leakage between checkout and delivery, not fewer COD orders.",
      },
      {
        // DERIVED — RTO is the term the site uses throughout (hero, metrics,
        // features, footer). This defines it and makes no product claim.
        id: "what-is-rto",
        question: "What is RTO, and why does RabbitPay focus on it?",
        answer:
          "RTO means return to origin: an order that ships but comes back undelivered. The brand pays forward and reverse shipping, handles the returned stock, and books no sale — which is what makes it one of the more expensive failure modes in Indian D2C. It is why RabbitPay pairs verified COD and risk checks with the checkout itself rather than treating them as a separate step.",
      },
      {
        // ORIGINAL
        id: "brand-customization",
        question: "Can I customize the checkout to match my brand?",
        answer:
          "Yes. RabbitPay Checkout can be customized with your brand logo, colors, and styling to provide a seamless shopping experience.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting started",
    description: "Setup, paperwork, and requesting a walkthrough.",
    items: [
      {
        // DERIVED — source: the lead-capture card and its 12–24 hour response time.
        id: "how-do-i-get-started",
        question: "How do I get started with RabbitPay?",
        answer:
          "Leave your email address and mobile number in the short form on the home or contact page, and our team will contact you within 12–24 hours. You can also reach the team directly by phone or WhatsApp.",
        link: { href: "/contact", label: "Get in touch" },
      },
      {
        // ORIGINAL
        id: "setup-time",
        question: "How long does it take to set up RabbitPay?",
        answer:
          "Your RabbitPay Checkout can be live on your Shopify store within 1 hour. Our team takes care of the complete setup for you.",
      },
      {
        // ORIGINAL
        id: "documents-required",
        question: "Do I need to submit any documents?",
        answer:
          "No. There are no documents, paperwork, or lengthy verification processes required to get started with RabbitPay.",
      },
      {
        // DERIVED — source: the Shopify, existing-gateway and settlements answers
        // below, gathered into the question merchants actually ask first.
        id: "will-it-disrupt-operations",
        question: "Will switching to RabbitPay disrupt my existing store or operations?",
        answer:
          "No. RabbitPay integrates with your Shopify store without disrupting existing operations — you keep your current payment gateway, your settlement process stays exactly as it is, and the team handles the setup rather than leaving it to your developers.",
      },
      {
        // ORIGINAL
        id: "get-a-demo",
        question: "How can I get a demo?",
        answer:
          "Request a free demo through the form on this site, and our team will contact you within 12–24 hours to walk you through the checkout, features, pricing, and answer any questions specific to your business.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "What RabbitPay costs, how the plans differ, and fees you can pass on.",
    items: [
      {
        // ORIGINAL
        id: "how-much-does-it-cost",
        question: "How much does RabbitPay cost?",
        answer:
          "Choose the pricing that suits your business. Pay 1% on successful prepaid orders and 0.3% on successful COD orders, with no setup fee or monthly commitment, or opt for our monthly plans starting at ₹999.",
        link: { href: "/pricing", label: "Compare the plans" },
      },
      {
        // ORIGINAL
        id: "cod-order-charges",
        question: "What does RabbitPay charge on COD orders?",
        answer:
          "RabbitPay charges 0.3% on successful COD orders. This is separate from the 1% on successful prepaid orders, so you only pay the rate that matches how the order was actually paid.",
      },
      {
        // DERIVED — source: the pricing table, where both rates are stated as
        // applying to *successful* orders.
        id: "when-am-i-charged",
        question: "Am I charged on every order, or only successful ones?",
        answer:
          "Both rates apply to successful orders: 1% on a successful prepaid order and 0.3% on a successful COD order. An order that does not complete does not attract the transaction fee.",
      },
      {
        // DERIVED — source: the pricing table (Setup Fee "Free" on both plans)
        // and the cost answer above ("no setup fee or monthly commitment").
        id: "setup-fee",
        question: "Is there a setup fee or a monthly commitment?",
        answer:
          "Setup is free on both plans, and the per-transaction option carries no monthly commitment. If a fixed monthly cost suits your volume better, monthly plans start at ₹999.",
        link: { href: "/pricing", label: "See what each plan includes" },
      },
      {
        // DERIVED — source: `data/pricing.ts` PRICING_PLANS and PRICING_ROWS,
        // i.e. the comparison table rendered on /pricing.
        id: "growth-vs-enterprise",
        question: "What is the difference between the Growth and Enterprise plans?",
        answer:
          "Growth is the standard plan for growing D2C brands: 1% on successful prepaid orders, 0.3% on successful COD orders, free setup, unlimited monthly volume, COD verification included and standard support. Enterprise is for brands at 50k+ monthly orders and is priced on volume, adding an SLA, MDR discounts, a dedicated customer success manager and dedicated support.",
        link: { href: "/pricing", label: "See the full comparison" },
      },
      {
        // ORIGINAL
        id: "cod-transaction-fee",
        question: "Can I add a COD transaction fee?",
        answer:
          "Yes. You can easily add a COD convenience fee for your customers to encourage prepaid orders and reduce unnecessary COD purchases. This is separate from RabbitPay's own pricing, which is 1% on successful prepaid orders and 0.3% on successful COD orders.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & settlements",
    description: "Your gateway, your money, and how payments are collected.",
    items: [
      {
        // ORIGINAL
        id: "existing-payment-gateway",
        question: "Can I continue using my existing payment gateway?",
        answer:
          "Yes. RabbitPay works with your existing payment gateway, so there's no need to switch providers.",
      },
      {
        // ORIGINAL
        id: "multiple-payment-gateways",
        question: "Can I enable multiple payment gateways?",
        answer:
          "Yes. RabbitPay supports multiple payment gateways, giving you the flexibility to choose how payments are processed.",
      },
      {
        // ORIGINAL
        id: "part-payment",
        question: "Does RabbitPay support part payment or split payment?",
        answer:
          "Yes. Collect a partial payment online and the remaining amount on delivery. This helps reduce RTO, improve customer commitment, and increase prepaid conversions.",
      },
      {
        // ORIGINAL
        id: "settlements",
        question: "Will my payment settlements change?",
        answer:
          "No. Your existing payment gateway continues to handle settlements, so your settlement process remains exactly the same.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "The payment, marketing and analytics platforms RabbitPay connects with.",
    items: [
      {
        // DERIVED — source: `data/integrations.ts` PAYMENT_PARTNERS, the logos
        // shown in the Integrations strip on / and /integrations.
        id: "which-gateways-supported",
        question: "Which payment gateways and providers does RabbitPay work with?",
        answer:
          "The payment partners shown on the integrations page are Razorpay, PhonePe, PayU, Paytm, Cashfree, Juspay and Decentro. RabbitPay works alongside the gateway you already use rather than replacing it, and supports running more than one.",
        link: { href: "/integrations", label: "See the integrations" },
      },
      {
        // DERIVED — source: `data/integrations.ts` MARKETING_PARTNERS.
        id: "marketing-analytics-integrations",
        question: "Does RabbitPay work with my marketing and analytics tools?",
        answer:
          "The marketing and analytics partners shown on the integrations page are Meta, Google Ads and Google Analytics, so checkout activity can reach the platforms most D2C brands already run acquisition and reporting on.",
        link: { href: "/integrations", label: "See the integrations" },
      },
    ],
  },
  {
    id: "platform-security",
    title: "Platform & security",
    description: "Working with Shopify, and how your data is handled.",
    items: [
      {
        // ORIGINAL
        id: "shopify-compatibility",
        question: "Will RabbitPay work with my Shopify store?",
        answer:
          "Yes. RabbitPay is built specifically for Shopify stores and can be integrated without disrupting your existing operations.",
      },
      {
        // ORIGINAL
        id: "data-security",
        question: "Is my data secure?",
        answer:
          "Yes. RabbitPay follows industry-standard security practices to protect your customer and transaction data.",
      },
      {
        // DERIVED — source: `data/pricing.ts` PRICING_TRUST_POINTS, shown on the
        // pricing page, plus the data-security answer above. This reports exactly
        // what the site states and routes anything further to the team; no
        // compliance status beyond what is published is asserted here.
        id: "security-compliance-information",
        question: "What security and compliance information does RabbitPay publish?",
        answer:
          "The pricing page carries PCI-DSS Level 1 and SOC 2 (in progress) as trust indicators, and RabbitPay states that it follows industry-standard security practices to protect customer and transaction data. For anything more specific — a security questionnaire, data processing agreement or current compliance documentation — ask the team directly.",
        link: { href: "/contact", label: "Ask the team" },
      },
    ],
  },
  {
    id: "support",
    title: "Support & resources",
    description: "How to reach the team, when, and where the documentation lives.",
    items: [
      {
        // DERIVED — source: `components/support/contact-channels.tsx` and the
        // support section copy ("direct access to the team", "no ticket maze").
        id: "support-channels",
        question: "How do I contact RabbitPay support?",
        answer:
          "Four channels, all listed on the support and contact pages: phone, WhatsApp, email, and the lead form. Every RabbitPay merchant gets direct access to the team rather than a ticket queue, so ops and tech questions land in the same place.",
        link: { href: "/support", label: "See the support channels" },
      },
      {
        // DERIVED — source: `data/site.ts` SUPPORT_HOURS and `data/trust.ts`
        // SUPPORT_PROMISES.
        id: "support-hours",
        question: "What are RabbitPay's support hours?",
        answer:
          "Monday to Saturday, 09:00 to 21:00 IST. Within those hours RabbitPay commits to fast responses, ops and tech on the same channel, and hands-on help when you need a faster rollout.",
        link: { href: "/support", label: "See support hours and channels" },
      },
      {
        // DERIVED — source: `data/navigation.ts` RESOURCES_NAV, which links
        // /documentation from the Resources menu in the site header.
        id: "documentation",
        question: "Is there documentation for setting up and configuring RabbitPay?",
        answer:
          "Yes. Setup and configuration documentation is published at rabbitpay.ai/documentation, linked from the Resources menu in the site header. It covers getting started, integrations and troubleshooting.",
        link: { href: "/documentation", label: "Open the documentation", proxied: true },
      },
      {
        // DERIVED — source: the Enterprise plan ("Custom", volume-based) and the
        // "Talk to Sales" CTA rendered under the pricing table.
        id: "talk-to-sales",
        question: "How do I talk to sales about Enterprise pricing?",
        answer:
          "Enterprise is priced on volume, so it starts with a conversation. Use Talk to Sales on the pricing page, request a demo, or reach the team on any of the usual support channels — phone, WhatsApp or email.",
        link: { href: "/pricing", label: "See Enterprise on the pricing page" },
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

/**
 * A duplicated slug would silently break an accordion anchor and emit two
 * Questions with the same name into the JSON-LD, so fail loudly at import time.
 */
const seenFaqIds = new Set<string>();
for (const faq of ALL_FAQS) {
  if (seenFaqIds.has(faq.id)) {
    throw new Error(`Duplicate FAQ id "${faq.id}" in FAQ_CATEGORIES`);
  }
  seenFaqIds.add(faq.id);
}
