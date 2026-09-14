import { BookOpen, FileText, HelpCircle } from "lucide-react";
import type { FooterColumn, NavLink, PrimaryNavItem, ResourceLink } from "@/types";
import { SUPPORT_EMAIL } from "@/data/site";

/**
 * Single source of truth for navigation. Consumed by the desktop nav, the mobile
 * menu, and the footer — there is no second copy anywhere.
 *
 * "Book a Demo" is deliberately absent: it is a CTA that opens the Calendly
 * popup over the current page, not a route. See `src/lib/calendly.ts`.
 */
export const MAIN_NAV: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

/**
 * The Resources dropdown, rendered between Pricing and Contact on desktop and as
 * a labelled group in the mobile menu. Same array drives both.
 *
 * Blog has no `href`: there is no RabbitPay blog today (`rabbitpay.ai/blog`
 * returns 404 and `blog.rabbitpay.ai` does not resolve), so it renders as a
 * disabled "Coming soon" row rather than pointing at a URL that does not exist.
 * Give it an `href` and drop `comingSoon` once a real destination ships.
 */
export const RESOURCES_NAV: ResourceLink[] = [
  {
    label: "FAQ",
    description: "Questions merchants ask most, answered.",
    href: "/faq",
    Icon: HelpCircle,
  },
  {
    label: "Docs",
    description: "Set up and configure RabbitPay.",
    href: "https://docs.rabbitpay.ai",
    external: true,
    Icon: FileText,
  },
  {
    label: "Blog",
    description: "Product updates and insights.",
    comingSoon: true,
    Icon: BookOpen,
  },
];

/** Label for the Resources dropdown trigger. */
export const RESOURCES_LABEL = "Resources";

/**
 * The primary navbar, in render order:
 *
 *   Product | Pricing | Support | Resources | Contact
 *
 * Order lives here rather than in the Header so there is one place to change it,
 * and the desktop nav and the mobile menu iterate this same array. `kind`
 * distinguishes a plain route from the Resources dropdown.
 */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  { kind: "link", label: "Product", href: "/product" },
  { kind: "link", label: "Pricing", href: "/pricing" },
  { kind: "link", label: "Support", href: "/support" },
  { kind: "menu", label: RESOURCES_LABEL, items: RESOURCES_NAV },
  { kind: "link", label: "Contact", href: "/contact" },
];

/** Internal routes reachable from the Resources menu — used for active state. */
export const RESOURCES_ROUTES = RESOURCES_NAV.filter(
  (item) => item.href && !item.external,
).map((item) => item.href as string);

/*
 * The list of public routes used to live here. It now lives in `data/pages.ts`
 * as `PUBLIC_ROUTES`, alongside each page's title, description and summary, so
 * the sitemap, llms.txt, page metadata and structured data all read one list.
 */

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    // FAQ and Docs live here rather than in a fourth "Resources" column so the
    // footer keeps its existing three-column geometry.
    title: "Product",
    links: [
      { label: "1-Click Checkout", href: "/product" },
      { label: "Conversion Metrics", href: "/#metrics" },
      { label: "Pricing", href: "/pricing" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Docs", href: "https://docs.rabbitpay.ai", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/support" },
      { label: "Careers", href: `mailto:${SUPPORT_EMAIL}?subject=Careers`, external: true },
      { label: "Press", href: `mailto:${SUPPORT_EMAIL}?subject=Press`, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: `mailto:${SUPPORT_EMAIL}?subject=Privacy`, external: true },
      { label: "Terms", href: `mailto:${SUPPORT_EMAIL}?subject=Terms`, external: true },
      { label: "Security", href: `mailto:${SUPPORT_EMAIL}?subject=Security`, external: true },
    ],
  },
];
