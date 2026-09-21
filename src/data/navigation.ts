import { BookOpen, FileText, HelpCircle } from "lucide-react";
import type { FooterColumn, NavLink, NavMenuItem, PrimaryNavItem, ResourceLink } from "@/types";
import {
  ALL_FEATURES_LINK,
  FEATURE_DESTINATIONS,
  FEATURES_MENU_SECTIONS,
} from "@/data/feature-pages";
import { SUPPORT_EMAIL } from "@/data/site";

/**
 * Single source of truth for navigation. Consumed by the desktop nav, the mobile
 * menu, and the footer — there is no second copy anywhere.
 *
 * "Request a Demo" is deliberately absent: it is a CTA that scrolls to the lead
 * form, not a route. See `components/cta/book-demo-button.tsx`.
 */
export const MAIN_NAV: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
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
    /*
      Served from this origin rather than linked away. The content is still the
      Mintlify deployment the writers publish to — `app/documentation` proxies
      this path straight to it — but the address is ours, so a click is an
      internal link: no `external` flag, no new tab, no `rel="noopener"`, and
      the row lights up as active like every other internal destination through
      `menuRoutes` below.
    */
    label: "Docs",
    description: "Set up and configure RabbitPay.",
    href: "/documentation",
    proxied: true,
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
 * The Features dropdown. "All Features" sits above the groups as the overview
 * entry; the groups themselves come from `data/feature-pages.ts`, which the
 * footer and the `/features` page read as well.
 *
 * Left-aligned to its trigger: Features is the first item in the nav, so a
 * panel centred on it would run past the left edge of a laptop viewport.
 */
export const FEATURES_MENU: NavMenuItem = {
  kind: "menu",
  label: "Features",
  overview: ALL_FEATURES_LINK,
  sections: FEATURES_MENU_SECTIONS,
  columns: true,
  align: "start",
};

export const RESOURCES_MENU: NavMenuItem = {
  kind: "menu",
  label: RESOURCES_LABEL,
  sections: [{ items: RESOURCES_NAV }],
};

/**
 * The primary navbar, in render order:
 *
 *   Features ▾ | Pricing | Calculator | Resources ▾ | Partner With Us | Contact
 *
 * Order lives here rather than in the Header so there is one place to change it,
 * and the desktop nav and the mobile menu iterate this same array. `kind`
 * distinguishes a plain route from a dropdown.
 *
 * Features replaced a plain "Product" link to `/product`, which now redirects
 * to `/features` (see `next.config.ts`).
 */
export const PRIMARY_NAV: PrimaryNavItem[] = [
  FEATURES_MENU,
  { kind: "link", label: "Pricing", href: "/pricing" },
  { kind: "link", label: "Calculator", href: "/calculator" },
  RESOURCES_MENU,
  { kind: "link", label: "Partner With Us", shortLabel: "Partners", href: "/partners" },
  { kind: "link", label: "Contact", href: "/contact" },
];

/**
 * Internal routes reachable from a dropdown — used for its active state. The
 * Features menu is active on `/features/*` because `/features` is one of its
 * routes and the Header matches by prefix.
 */
export function menuRoutes(menu: NavMenuItem): string[] {
  const rows = [
    ...(menu.overview ? [menu.overview] : []),
    ...menu.sections.flatMap((section) => section.items),
  ];
  return rows.filter((item) => item.href && !item.external).map((item) => item.href as string);
}

/*
 * The list of public routes used to live here. It now lives in `data/pages.ts`
 * as `PUBLIC_ROUTES`, alongside each page's title, description and summary, so
 * the sitemap, llms.txt, page metadata and structured data all read one list.
 */

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    // The same destinations, in the same order, as the header's Features menu.
    title: "Features",
    links: [
      { label: ALL_FEATURES_LINK.label, href: ALL_FEATURES_LINK.href },
      ...FEATURE_DESTINATIONS.map((page) => ({ label: page.label, href: page.href })),
    ],
  },
  {
    // FAQ and Docs live here rather than in a separate "Resources" column.
    // "1-Click Checkout" (which pointed at /product) moved to the Features
    // column above as "One-Click Checkout".
    title: "Product",
    links: [
      { label: "What is RabbitPay?", href: "/what-is-rabbitpay" },
      { label: "Pricing", href: "/pricing" },
      { label: "Calculator", href: "/calculator" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Docs", href: "/documentation", proxied: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About RabbitPay", href: "/what-is-rabbitpay" },
      { label: "Partner With Us", href: "/partners" },
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
