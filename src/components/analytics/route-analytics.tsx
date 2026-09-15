"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GA_MEASUREMENT_ID, POSTHOG_KEY } from "@/data/analytics-config";
import { trackPageView } from "@/lib/analytics";

/**
 * App Router page-view tracking.
 *
 * The React site was a single page, so one page view on load was the whole
 * story. With real routes, client-side navigations have to be reported too —
 * and each provider needs a different amount of help:
 *
 *  - Plausible needs none. Its script patches `history.pushState` and reports
 *    SPA navigations on its own, which is why there is nothing for it here.
 *  - PostHog captures the initial view itself and nothing after it.
 *  - GA4 is the same shape as PostHog: `gtag("config", …)` sends exactly one
 *    page view, at load, and is silent for every navigation after that.
 *
 * So both PostHog and GA4 let their own snippet report the landing URL and
 * report every change after it from here. That split is the whole
 * duplicate-prevention story: the load page view comes from the provider's
 * snippet, every later one comes from this file, and the two sets never
 * overlap.
 */
function useRouteChange(onChange: (url: string) => void, enabled: boolean) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /**
   * The URL already reported to the provider, or `null` before the first run.
   * The first run records the landing URL *without* reporting it — that view
   * was already counted by the provider's own snippet at load.
   */
  const reported = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const query = searchParams.toString();
    const url = window.location.origin + pathname + (query ? `?${query}` : "");

    /*
      Deduplicate on the URL itself rather than by counting renders.

      A "skip the first render" flag gets this wrong in precisely the case it
      exists to handle: React Strict Mode mounts effects twice in development,
      so the second mount sees the flag already cleared and reports the landing
      page a second time — a duplicate page_view on every dev session, on the
      one hit that matters most to GA4's entrance and bounce reports.

      Comparing URLs is immune to that, and to re-renders generally: any run
      that produces a URL already reported returns without sending anything, no
      matter how many times the effect is invoked or why. `searchParams` is a
      fresh object identity on most renders, which makes such runs routine.
    */
    if (reported.current === url) return;

    const isInitialLoad = reported.current === null;
    reported.current = url;
    if (isInitialLoad) return;

    onChange(url);
  }, [pathname, searchParams, enabled, onChange]);
}

function PostHogPageviews() {
  useRouteChange((url) => {
    window.posthog?.capture("$pageview", { $current_url: url });
  }, Boolean(POSTHOG_KEY));

  return null;
}

function Ga4Pageviews() {
  useRouteChange((url) => {
    trackPageView(url);
  }, Boolean(GA_MEASUREMENT_ID));

  return null;
}

/**
 * Both trackers read `useSearchParams`, so this whole component renders inside
 * the `<Suspense>` boundary the root layout puts around it.
 */
export function RouteAnalytics() {
  return (
    <>
      {POSTHOG_KEY ? <PostHogPageviews /> : null}
      {GA_MEASUREMENT_ID ? <Ga4Pageviews /> : null}
    </>
  );
}
