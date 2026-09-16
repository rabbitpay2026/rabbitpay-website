import type { LucideIcon } from "lucide-react";

/* ---------------------------------- nav ---------------------------------- */

export type NavLink = {
  label: string;
  href: string;
  /** External links open in a new tab and are never marked active. */
  external?: boolean;
  /**
   * Served from this origin, but by an application other than this one — the
   * proxied documentation under `/documentation`.
   *
   * Still an internal link in every way a visitor can see: same tab, no
   * `rel="noopener"`, no external-link affordance. What it changes is how the
   * navigation happens. Next's `<Link>` treats a same-origin path as one of its
   * own routes and tries a client-side transition, which means fetching an RSC
   * payload for it — and the payload that comes back belongs to Mintlify's
   * build, referencing module ids this app does not have. The router recovers
   * by falling back to a document load, so the visitor still arrives, but the
   * failed attempt costs a round trip and logs an error.
   *
   * A plain anchor asks for the document in the first place, which is the
   * correct thing for a page this app does not render.
   */
  proxied?: boolean;
};

/**
 * A primary navbar entry: either a plain route or the Resources dropdown.
 * Discriminated on `kind` so the Header can render an ordered list without
 * knowing which position Resources occupies.
 */
export type PrimaryNavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "menu"; label: string; items: ResourceLink[] };

/** An entry in the Resources dropdown. */
export type ResourceLink = {
  label: string;
  description: string;
  /** Absent when the destination does not exist yet — the item renders disabled. */
  href?: string;
  external?: boolean;
  /** Same-origin but not this app — see `NavLink.proxied`. */
  proxied?: boolean;
  /** Shown as a "Coming soon" pill instead of a link. */
  comingSoon?: boolean;
  /** Component reference, not an element — keeps the data module JSX-free. */
  Icon: LucideIcon;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

/* ---------------------------------- faq ---------------------------------- */

export type FaqItem = {
  /** Stable slug — also the accordion value and the JSON-LD key. */
  id: string;
  question: string;
  /**
   * The complete answer, as plain text. This exact string is what the page
   * renders AND what goes into the FAQPage JSON-LD, so the two cannot diverge.
   */
  answer: string;
  /**
   * Optional "read more" link rendered under the answer. Kept out of `answer`
   * so the structured data stays plain text; the link is navigation, not part
   * of the answer.
   */
  link?: { href: string; label: string; external?: boolean; proxied?: boolean };
};

export type FaqCategory = {
  /** Stable slug used for the `#anchor` and the sidebar link. */
  id: string;
  title: string;
  /** Navigational label describing the group — not a product claim. */
  description: string;
  items: FaqItem[];
};

/* -------------------------------- pricing -------------------------------- */

export type PricingPlan = {
  key: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  secondaryPrice?: string;
  secondaryPriceNote?: string;
  highlight: boolean;
};

/**
 * A comparison-table cell. `true`/`false` render as a tick / dash, strings
 * render as-is, and an array of lines renders stacked — used where one plan
 * carries more than one rate (prepaid vs COD).
 */
export type PricingCellValue = boolean | string | { value: string; note: string }[];

export type PricingRow = {
  feature: string;
  growth: PricingCellValue;
  enterprise: PricingCellValue;
};

/* -------------------------------- metrics -------------------------------- */

export type MetricItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Component reference, not an element — keeps the data module JSX-free. */
  Icon: LucideIcon;
};

/* -------------------------------- features ------------------------------- */

export type FeatureVisualKey = "prefill" | "risk" | "upi";

export type FeatureItem = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  Icon: LucideIcon;
  visual: FeatureVisualKey;
};

/* ------------------------------ integrations ----------------------------- */

export type PartnerLogo = {
  name: string;
  file: string;
  /** Google Ads only ships a portrait icon — render it taller. */
  mark?: boolean;
  /** Decentro publishes no wordmark lockup — pair the mark with the name. */
  withText?: boolean;
};

/* -------------------------------- clients -------------------------------- */

export type ClientBrand = {
  name: string;
  url: string;
  logo: string;
};

/* --------------------------------- leads --------------------------------- */

export type LeadPayload = {
  email: string;
  phone: string;
  source: string;
};

export type LeadResponse = {
  status?: string;
  email_sent?: boolean;
  email_id?: string | null;
};

/* ------------------------------ structured data ------------------------------ */

/** A single Schema.org entity inside a JSON-LD document. */
export type JsonLdNode = {
  "@type": string | string[];
  [key: string]: unknown;
};

/**
 * A Schema.org JSON-LD document — either a single entity or an `@graph` of
 * related ones. Loose by design: the builders in `lib/json-ld.ts` are the typed
 * surface, and this only constrains what `<JsonLd>` accepts to something
 * serialisable that carries a `@context`.
 */
export type JsonLdDocument = {
  "@context": "https://schema.org";
  [key: string]: unknown;
};
