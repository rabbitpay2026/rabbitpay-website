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
