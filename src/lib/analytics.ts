/**
 * Lightweight analytics helpers. Ported from the React project's
 * `src/lib/analytics.js`.
 *
 * Plausible and PostHog are loaded declaratively in `components/analytics/`
 * via next/script — this module only *emits* events, so it stays safe to import
 * from anywhere. GA4 is optional and stays inert unless NEXT_PUBLIC_GA4_ID is set.
 */

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

export const GA4_ID = (process.env.NEXT_PUBLIC_GA4_ID ?? "").trim();

/** Fire a single event to Plausible and GA4 (safe if either is absent). */
export function trackEvent(name: string, props: EventProps = {}) {
  try {
    if (typeof window === "undefined") return;
    window.plausible?.(name, { props });
    if (GA4_ID) window.gtag?.("event", name, props);
  } catch {
    /* silently ignore analytics failures */
  }
}
