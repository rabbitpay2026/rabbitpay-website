/**
 * Analytics identifiers.
 *
 * These are public, client-side identifiers — the same values the React site
 * exposed in its HTML — not secrets. They are read from env vars so a preview or
 * staging deployment can point at a different project (or none at all: leave a
 * value empty and that script simply never loads).
 *
 * The React site tracked the domain `rabbitpay.in` while serving from
 * `rabbitpay.ai`, so Plausible was recording against a property that did not
 * match the site. The default below corrects that to the canonical domain.
 */
export const PLAUSIBLE_DOMAIN = (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "rabbitpay.ai").trim();

export const POSTHOG_KEY = (
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs"
).trim();

export const POSTHOG_API_HOST = (
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"
).trim();

/**
 * The GA4 measurement ID.
 *
 * A measurement ID is a public identifier — it ships in the page source of
 * every GA4 site on the web and identifies a destination property, not an
 * account. `NEXT_PUBLIC_` is therefore the correct prefix: the value has to
 * reach the browser to work at all, and exposing it grants nothing. The
 * write-side credentials GA4 does have (API secrets for the Measurement
 * Protocol) are a different thing entirely and are not used here.
 *
 * Deliberately no hardcoded fallback, unlike `POSTHOG_KEY` above. The ID is
 * read from the environment only, so a preview build, a fork or a local run
 * sends nothing unless it has been told where to send it — and an unset value
 * leaves GA4 entirely inert rather than quietly polluting the production
 * property with traffic that is not production traffic.
 *
 * `NEXT_PUBLIC_GA4_ID` is honoured as a fallback because it is the name this
 * project shipped with; either spelling works, and the canonical one is first.
 *
 * NOTE: `NEXT_PUBLIC_*` values are inlined at BUILD time, so this must be set
 * in the Amplify environment before the build runs — writing it to
 * `.env.production` during the build (as `amplify.yml` does for the server-only
 * secrets) would be too late.
 */
export const GA_MEASUREMENT_ID = (
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
  process.env.NEXT_PUBLIC_GA4_ID ??
  ""
).trim();
