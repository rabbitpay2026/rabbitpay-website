import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  PLAUSIBLE_DOMAIN,
  POSTHOG_API_HOST,
  POSTHOG_KEY,
} from "@/data/analytics-config";

/**
 * Third-party analytics loaders, migrated from the inline <script> tags the
 * React project kept in `public/index.html`.
 *
 * Each one only renders when it is configured, so nothing loads by accident in
 * a preview or local build. Route-change pageviews are handled separately by
 * `route-analytics.tsx`.
 */
export function AnalyticsScripts() {
  return (
    <>
      {/* Plausible — the stub queues events fired before the script finishes loading. */}
      {PLAUSIBLE_DOMAIN ? (
        <>
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.tagged-events.js"
            strategy="afterInteractive"
          />
          <Script id="plausible-stub" strategy="afterInteractive">
            {`window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) };`}
          </Script>
        </>
      ) : null}

      {/* PostHog — same snippet and options the React site shipped. */}
      {POSTHOG_KEY ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init me ws ys ps bs capture je Di ks register register_once register_for_session unregister unregister_for_session Ps getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Es $s createPersonProfile Is opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Ss debug xs getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init(${JSON.stringify(
            POSTHOG_KEY,
          )},{api_host:${JSON.stringify(
            POSTHOG_API_HOST,
          )},person_profiles:"identified_only",session_recording:{recordCrossOriginIframes:true,capturePerformance:false}});`}
        </Script>
      ) : null}

      {/*
        GA4 — the one and only initialisation of gtag.js on this site.

        There is no Google Tag Manager container and no second `config` call
        anywhere; route-change page views are sent as explicit `page_view`
        events by `route-analytics.tsx`, never by a repeated `config`. A second
        `config` for the same measurement ID is the usual way a Next.js site
        ends up double-counting every navigation, because `config` sends a page
        view of its own each time it runs.

        `afterInteractive` so the tag loads after hydration: analytics must not
        sit on the critical path, and nothing on the page waits for it. Events
        fired before the script finishes downloading are not lost — the inline
        snippet defines `dataLayer` and `gtag` synchronously, so calls queue and
        flush once gtag.js arrives.

        `anonymize_ip` is carried over from the original snippet. It is a no-op
        on GA4 (which always truncates IPs) and harmless to keep.
      */}
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js", new Date());gtag("config", ${JSON.stringify(
              GA_MEASUREMENT_ID,
            )}, { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
    </>
  );
}
