/**
 * The public page registry — the single source of truth for every indexable
 * RabbitPay route.
 *
 * One entry per page drives, without duplication:
 *   - `app/sitemap.ts`        the URL list
 *   - `app/llms.txt/route.ts` the "Important pages" section
 *   - `lib/seo.ts`            each route's `<title>`, description and canonical
 *   - `lib/json-ld.ts`        the WebPage + BreadcrumbList nodes
 *
 * Adding a public route means adding it here once; forgetting to describe it is
 * a TypeScript error rather than a silently missing sitemap entry.
 *
 * Only routes that exist and are meant to be indexed belong here. Deliberately
 * excluded: `/api/leads` (a POST endpoint), the 404 page, the `mailto:` links in
 * the footer, `docs.rabbitpay.ai` (a different host — linked from llms.txt as an
 * external resource), and `/blog`, which does not exist and renders in the nav
 * as a disabled "Coming soon" item.
 */

export type PublicPage = {
  /** Route path, also the canonical URL suffix. */
  path: string;
  /**
   * `<title>` segment. The root layout's template appends " | RabbitPay",
   * except on "/", which keeps its own full default title.
   */
  title: string;
  /** Meta description, and the `description` on the page's WebPage node. */
  description: string;
  /** Open Graph / Twitter title, where it should read differently to `title`. */
  ogTitle?: string;
  /** Short label for breadcrumbs, schema `name` and the llms.txt link text. */
  name: string;
  /** One line for llms.txt explaining what an agent will find on the page. */
  summary: string;
};

/**
 * Ordered by importance, which is also the order the sitemap and llms.txt use.
 */
export const PUBLIC_PAGES = [
  {
    path: "/",
    name: "Home",
    // Preserved verbatim from the production React site — see `lib/seo.ts`.
    title: "RabbitPay - 1-Click Checkout for Shopify & D2C, made in India",
    description:
      "RabbitPay helps Shopify and D2C brands ship a faster, blue-branded one-click checkout with UPI-first payments, verified COD, and address prefill.",
    ogTitle: "RabbitPay - 1-Click Checkout, built in India",
    summary:
      "Product overview, the merchant-impact figures RabbitPay publishes, pricing, features, integrations, support and a short FAQ.",
  },
  {
    path: "/product",
    name: "Product",
    title: "Product",
    description:
      "Inside RabbitPay Checkout: address prefill, verified COD and RTO control, UPI-first payments with card and netbanking fallback, and supported payment partners.",
    ogTitle: "RabbitPay Product - prefilled checkout, verified COD, UPI-first",
    summary:
      "The three product pillars in detail — prefilled checkout, RTO control through verified COD, and a UPI-first payment experience — plus the payment, marketing and analytics partners RabbitPay integrates with.",
  },
  {
    path: "/pricing",
    name: "Pricing",
    title: "Pricing",
    description:
      "1% on successful prepaid orders and 0.3% on successful COD orders. No setup fee, unlimited monthly volume, and an enterprise plan for 50k+ orders a month.",
    ogTitle: "RabbitPay Pricing - 1% prepaid, 0.3% COD, zero setup fee",
    summary:
      "The Growth and Enterprise plans side by side: transaction rates, setup fee, COD verification, support level, SLA, monthly volume, MDR discounts and dedicated CSM.",
  },
  {
    path: "/support",
    name: "Support",
    title: "Support",
    description:
      "Every RabbitPay merchant gets direct access to the team - by phone, WhatsApp or email, Mon-Sat 09:00 to 21:00 IST. No ticket maze, no hold music.",
    ogTitle: "RabbitPay Support - real humans, ready to help",
    summary:
      "How RabbitPay support works and the four channels merchants can use: phone, WhatsApp, email and the published support hours.",
  },
  {
    path: "/contact",
    name: "Contact",
    title: "Contact",
    description:
      "Contact RabbitPay by phone, WhatsApp or email, Mon-Sat 09:00 to 21:00 IST, or leave your email and mobile number and the team will get back to you.",
    ogTitle: "Contact RabbitPay",
    summary:
      "Every way to reach RabbitPay — phone, WhatsApp, email, support hours, and a short form that takes an email address and mobile number for a callback.",
  },
  {
    path: "/faq",
    name: "FAQ",
    title: "FAQ — Frequently Asked Questions",
    description:
      "Answers about RabbitPay setup, pricing, COD charges, payment gateways, address prefill, part payments, integrations, settlements, Shopify and support.",
    ogTitle: "RabbitPay FAQ — Frequently Asked Questions",
    summary:
      "The most detailed single source on the site: questions on what RabbitPay is, onboarding, pricing, payments, gateways, the checkout experience, integrations, security and support.",
  },
] as const satisfies readonly PublicPage[];

/** Union of every public route path — used to key route-specific records. */
export type PublicRoute = (typeof PUBLIC_PAGES)[number]["path"];

/** Every public route path, in sitemap order. */
export const PUBLIC_ROUTES = PUBLIC_PAGES.map((page) => page.path) as PublicRoute[];

/** Lookup by path, so a page module can read its own entry. */
export const PAGE_BY_PATH = Object.fromEntries(
  PUBLIC_PAGES.map((page) => [page.path, page]),
) as Record<PublicRoute, PublicPage>;

/** The registry entry for a route, typed so a bad path fails the build. */
export function getPage(path: PublicRoute): PublicPage {
  return PAGE_BY_PATH[path];
}
