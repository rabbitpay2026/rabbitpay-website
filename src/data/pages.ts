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
 * the footer, and `/blog`, which does not exist and renders in the nav as a
 * disabled "Coming soon" item.
 *
 * `/documentation` is excluded too, for a different reason. It is served from
 * this domain rather than linked away — `app/documentation` proxies the
 * Mintlify deployment — but the pages under it are authored and published
 * elsewhere, so this registry does not know their titles, descriptions or even
 * how many there are. Listing only the front page here would put one URL in the
 * sitemap and give every page beneath it a `<title>` from this app instead of
 * its own. The documentation ships its own sitemap at
 * `/documentation/sitemap.xml`, which is proxied and address-translated like
 * everything else under that path, and llms.txt points crawlers at it.
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
      "RabbitPay is a 1-click checkout for Shopify stores run by Indian D2C brands, with prefilled addresses, UPI-first payments and verified COD to lift conversion and cut RTO.",
    ogTitle: "RabbitPay - 1-Click Checkout, built in India",
    summary:
      "Product overview, the merchant-impact figures RabbitPay publishes, pricing, features, integrations, support and a short FAQ.",
  },
  {
    path: "/what-is-rabbitpay",
    name: "What is RabbitPay?",
    title: "What is RabbitPay?",
    description:
      "RabbitPay is a 1-click checkout app for Shopify stores run by Indian D2C brands. What it is, who it is for, how it works, and how it differs from the default Shopify checkout.",
    ogTitle: "What is RabbitPay? 1-Click Checkout for Shopify in India",
    summary:
      "The plain-language definition of RabbitPay: the product category it belongs to, the platform it runs on, the market it serves, how a merchant goes live, and the COD King infrastructure behind it.",
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
    path: "/partners",
    name: "Partner With Us",
    title: "Partner With Us",
    description:
      "Partner with RabbitPay to bring 1-click checkout to Indian D2C brands. For agencies, technology partners and affiliates — apply in a couple of minutes.",
    ogTitle: "Partner With RabbitPay",
    summary:
      "The RabbitPay partner program: who it is for (agencies, technology partners and affiliates), what partners get, what the team looks for, how an application is reviewed, and the application form itself.",
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
  {
    path: "/calculator",
    name: "Calculator",
    title: "Free D2C Calculator — Profit, ROI & ROAS",
    description:
      "Free calculators for Shopify and D2C brands. Work out profit margin, ROI, ROAS, the price and ad cost for a target margin, and monthly revenue from your own numbers.",
    ogTitle: "RabbitPay Calculator — Profit, ROI & ROAS for D2C brands",
    summary:
      "The calculator hub: links to five free calculators that run in the browser on numbers the merchant enters — profit margin, ROI, ROAS, target-margin pricing and revenue.",
  },
  {
    path: "/calculator/profit-margin",
    name: "Profit Margin Calculator",
    title: "Profit Margin Calculator",
    description:
      "Free profit margin calculator for Shopify and D2C brands. Enter revenue, product cost, ads, shipping and payment fees to see net profit and net profit margin.",
    ogTitle: "Profit Margin Calculator for D2C brands | RabbitPay",
    summary:
      "Net profit and net profit margin from revenue minus product cost, advertising, shipping, payment fees and other costs, with gross profit shown separately and a breakdown of where revenue goes.",
  },
  {
    path: "/calculator/roi",
    name: "ROI Calculator",
    title: "ROI Calculator",
    description:
      "Free ROI calculator for D2C brands. Enter what you invested and the revenue it generated to see net return and return on investment as a percentage.",
    ogTitle: "ROI Calculator for D2C brands | RabbitPay",
    summary:
      "Return on investment from total investment, additional costs and the revenue generated: net return in rupees and ROI as a percentage, with the difference from ROAS explained.",
  },
  {
    path: "/calculator/roas",
    name: "ROAS Calculator",
    title: "ROAS Calculator",
    description:
      "Free ROAS calculator for D2C brands. Enter ad spend and attributed revenue to see return on ad spend, revenue per ₹1 spent and your break-even ROAS.",
    ogTitle: "ROAS Calculator for D2C brands | RabbitPay",
    summary:
      "Return on ad spend from advertising spend and attributed revenue, the revenue each ₹1 of ads brings in, and — with a margin before ad spend — break-even ROAS and profit after ad spend.",
  },
  {
    path: "/calculator/high-profit",
    name: "High Profit Calculator",
    title: "High Profit Calculator",
    description:
      "Free target margin calculator for D2C brands. Enter your costs per order and a target profit margin to see the selling price and maximum ad cost that reach it.",
    ogTitle: "High Profit Calculator for D2C brands | RabbitPay",
    summary:
      "Works backwards from a target profit margin: current profit and margin per order, break-even selling price, the selling price required for the target, and the maximum advertising cost per order it allows.",
  },
  {
    path: "/calculator/revenue",
    name: "Revenue Calculator",
    title: "Revenue Calculator",
    description:
      "Free revenue calculator for Shopify and D2C brands. Estimate monthly and annual revenue from sessions, conversion rate, average order value and a growth rate.",
    ogTitle: "Revenue Calculator for D2C brands | RabbitPay",
    summary:
      "Estimated orders, monthly revenue and annual revenue from monthly sessions, conversion rate and average order value, with an optional growth rate shown next to the current estimate.",
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

/** Whether a path is one of the registered public routes. */
export function isPublicRoute(path: string): path is PublicRoute {
  return path in PAGE_BY_PATH;
}

/** The registry entry for a route, typed so a bad path fails the build. */
export function getPage(path: PublicRoute): PublicPage {
  return PAGE_BY_PATH[path];
}
