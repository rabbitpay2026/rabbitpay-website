/**
 * Lightweight analytics helpers. Ported from the React project's
 * `src/lib/analytics.js`.
 *
 * Plausible, PostHog and GA4 are loaded declaratively in `components/analytics/`
 * via next/script — this module only *emits* events, so it stays safe to import
 * from anywhere, including from modules that run during SSR.
 *
 * Every provider is optional and independent: each call below is a no-op when
 * the provider it targets was never configured, so a missing environment
 * variable degrades to "no data" and never to a broken page.
 */

import { GA_MEASUREMENT_ID } from "@/data/analytics-config";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (name: string, opts?: { props?: EventProps }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    posthog?: {
      capture: (name: string, props?: EventProps) => void;
    };
  }
}

/**
 * The events this site sends, in one place.
 *
 * Named as a closed set rather than passed as loose strings so a typo is a
 * build error and so this list *is* the documentation of what GA4 will see. A
 * new interaction means adding a name here first, which keeps the taxonomy
 * something that was decided rather than something that accumulated.
 *
 * Every name is snake_case: GA4 reports group by exact event name, and mixing
 * conventions splits one interaction across two rows forever.
 */
export const ANALYTICS_EVENTS = {
  /** A "Start Free" CTA was clicked. Opens the scheduler. */
  START_FREE_CLICK: "start_free_click",
  /** A "Book a Demo" CTA was clicked. Opens the scheduler. */
  DEMO_CLICK: "demo_click",
  /** The Calendly overlay actually rendered — the click above succeeded. */
  SCHEDULER_OPEN: "scheduler_open",
  /** The email + phone lead form was accepted by /api/leads. */
  DEMO_FORM_SUBMIT: "demo_form_submit",
  /** The pricing page's "Talk to Sales" CTA was clicked. */
  TALK_TO_SALES_CLICK: "talk_to_sales_click",
  /*
    The /calculator events carry the calculator's id and nothing else. The
    numbers a merchant types are their store's finances and never leave the
    browser — see `components/calculator/calculator-analytics.ts`.
  */
  /** /calculator was opened. */
  CALCULATOR_VIEW: "calculator_view",
  /** A different calculator was chosen on /calculator. */
  CALCULATOR_SELECTED: "calculator_selected",
  /** A calculator's required fields were filled and it showed a result. */
  CALCULATOR_CALCULATE: "calculator_calculate",
  /** A calculator's Reset button was pressed. */
  CALCULATOR_RESET: "calculator_reset",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Fire a single event to Plausible and GA4 (safe if either is absent).
 *
 * Wrapped in try/catch on purpose: an analytics provider is never allowed to
 * break an interaction. A blocked script, an ad blocker, a browser that refuses
 * third-party storage — all of those must cost a data point and nothing else,
 * so a click handler that calls this still does its real work.
 */
export function trackEvent(name: AnalyticsEvent, props: EventProps = {}) {
  try {
    if (typeof window === "undefined") return;
    window.plausible?.(name, { props });
    if (GA_MEASUREMENT_ID) window.gtag?.("event", name, props);
  } catch {
    /* silently ignore analytics failures */
  }
}

/**
 * Report a page view to GA4 after a client-side route change.
 *
 * Only for *subsequent* navigations. The initial page view is sent by gtag
 * itself when `config` runs (see `analytics-scripts.tsx`), which is both more
 * accurate — it happens at load, not after React commits — and the reason this
 * function must never be called on first render. Calling it there would put two
 * page_view hits on the landing page of every session and inflate every
 * entrance, bounce and landing-page report that GA4 derives from them.
 *
 * `page_location` must be absolute: GA4 derives host, path and query from it,
 * and a bare path is recorded against the wrong property dimensions.
 */
export function trackPageView(url: string, title?: string) {
  try {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
    const pageTitle = title ?? document.title;

    /*
      `set` before `event`, and the order is the point.

      gtag remembers the `page_location` it was given by the last `config` call
      and stamps it on EVERY later event. Sending the new URL only as a
      parameter of `page_view` therefore fixes the page_view and nothing else:
      a `demo_click` fired on /pricing after a client-side navigation still
      reports the URL the visitor originally landed on. Every event-scoped
      report — which page drives demo clicks, where the form converts — would
      then attribute the whole session to its entry page.

      `set` writes the value into gtag's persistent parameters instead, so it
      sticks for the page_view below and for every event until the next
      navigation. The explicit parameters on the `page_view` are redundant
      after that and kept anyway, because a page_view that carries its own URL
      is the one hit that must never depend on ambient state being right.
    */
    window.gtag?.("set", { page_location: url, page_title: pageTitle });
    window.gtag?.("event", "page_view", {
      page_location: url,
      page_title: pageTitle,
    });
  } catch {
    /* silently ignore analytics failures */
  }
}
