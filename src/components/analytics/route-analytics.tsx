"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { POSTHOG_KEY } from "@/data/analytics-config";

/**
 * App Router pageview tracking for PostHog.
 *
 * The React site was a single page, so one pageview on load was the whole story.
 * With real routes, client-side navigations need to be reported too.
 *
 * PostHog's snippet captures the initial pageview itself (its `capture_pageview`
 * default is load-only), so the first render here is deliberately skipped to
 * avoid double-counting; every subsequent route change is captured.
 *
 * Plausible needs no equivalent — its script patches `history.pushState` and
 * reports SPA navigations on its own.
 */
function PostHogPageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const query = searchParams.toString();
    const url = window.location.origin + pathname + (query ? `?${query}` : "");
    window.posthog?.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function RouteAnalytics() {
  if (!POSTHOG_KEY) return null;
  return <PostHogPageviews />;
}
