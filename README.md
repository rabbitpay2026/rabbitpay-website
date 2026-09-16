# RabbitPay — Next.js website

Migration of the RabbitPay marketing site from Create React App to Next.js
(App Router, TypeScript, Tailwind 3.4.17).

The source of truth for design and behaviour is the React project at
`../rabbitpay-website-react`, which is **read-only** and was not modified.

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
npm run lint
```

## Structure

```
src/
├── app/                 routes + metadata (page.tsx files stay composition-only)
│   ├── page.tsx         /          full landing page
│   ├── product/         /product
│   ├── pricing/         /pricing
│   ├── support/         /support
│   ├── contact/         /contact
│   ├── faq/             /faq
│   ├── api/leads/       POST lead endpoint (server-only, Resend)
│   ├── sitemap.ts robots.ts not-found.tsx
│   ├── layout.tsx       header, footer, analytics, fonts, toaster
│   └── globals.css      port of the React project's index.css
├── components/
│   ├── layout/          header, footer, brand lockup, sticky mobile CTA
│   ├── home/            hero, metrics, logo wall, demo CTA, powered-by
│   ├── product/         features, integrations, feature visuals
│   ├── pricing/         pricing table + CTAs
│   ├── support/         support section, contact cards/channels
│   ├── contact/         contact page section
│   ├── faq/             FAQ page (hero, sidebar, category, accordion, CTA)
│   ├── forms/           lead capture card
│   ├── cta/             Request a Demo button, Talk to Sales button
│   ├── navigation/      Resources dropdown
│   ├── analytics/       Plausible / PostHog / GA4 scripts, route pageviews
│   ├── magic-ui/        the 10 Magic UI components the site actually uses
│   └── ui/              card, toaster
├── data/                navigation, faq, pricing, features, metrics, …
├── lib/                 utils, analytics, leads, leads-schema,
│                        rate-limit, seo, fonts, json-ld
│   └── email/           resend client + lead notification template
└── types/               shared types
```

Sections that appear on both the homepage and a dedicated route (Features,
Pricing, CustomerSupport) are **one component rendered twice** — they take
`asPage` / `headingLevel` props rather than being duplicated. Navbar order and
the Resources list live once in `data/navigation.ts`; FAQ content lives once in
`data/faq.ts` and feeds the homepage preview, `/faq`, and the JSON-LD.

## Server vs Client Components

Server by default. `"use client"` is only on: `Header`, `StickyMobileCTA`,
`ScrollProgress`, `BlurFade`, `NumberTicker`, `MagicCard`, `DotPattern`,
`LeadCaptureCard`, `FaqAccordion`, `FaqSidebar`, `Toaster`, `BookDemoButton`,
`TalkToSalesButton`, `ResourcesMenu`, `RouteAnalytics`.

Every page prerenders as static HTML; only `/api/leads` is dynamic.

## CTA flows

**Start Free** (lead capture) — the card on the homepage, demo section and `/contact`:

```
email + phone -> client validation -> POST /api/leads
   -> server re-validates -> Resend -> EMAIL_TO -> inline success state
```

**Request a Demo** — the navbar CTA, the pricing and sticky mobile "Start Free"
buttons and the FAQ CTA, all rendered by `components/cta/book-demo-button.tsx`:

```
click -> scroll to the lead form on this page, or open /#demo-section
```

It never posts a lead itself; the team contacts the merchant within 12–24 hours
of a form submission.

**View Demo Store** and **WhatsApp Us** are plain external links to
`DEMO_STORE_URL` and `SUPPORT_WHATSAPP_HREF` in `data/site.ts`.

## Lead endpoint

`POST /api/leads` (`src/app/api/leads/route.ts`), Node runtime, never cached.

```
POST { email, phone, source }
  200 { success: true }
  400 { success: false, error }   invalid input
  429 { success: false, error }   rate limited
  500 { success: false, error }   send failure
```

- **Validation runs on both sides** from one shared module, `lib/leads-schema.ts`,
  so the form and the server can never drift. Phone accepts the formats merchants
  actually type (`9876543210`, `+91 98765 43210`, `09876543210`, `(+91) 98765-43210`)
  and normalises to 10 national digits beginning 6-9.
- **`source`** is an allow-list (`hero_inline`, `demo_cta`, `contact_page`); anything
  else is rejected. It sets the email subject.
- **Errors returned to the browser are generic.** Provider responses and stack
  traces are logged server-side only.
- **Rate limiting** is two-tier and in-memory (`lib/rate-limit.ts`): a generous
  30 requests/min brake per IP, plus a tight 5 sends/min budget consumed only
  once a payload is valid — so a merchant correcting a typo is never locked out.
  On Amplify this is per-Lambda-instance and best-effort, not a guarantee; put
  AWS WAF rate-based rules in front of the route if lead spam becomes real.

### Secrets

`RESEND_API_KEY` is read only in `lib/email/resend.ts`, which starts with
`import "server-only"` — any Client Component importing it is a **build error**.
It has no `NEXT_PUBLIC_` prefix, so Next never inlines it client-side. The
recipient and sender come from `EMAIL_TO` / `EMAIL_FROM` and are never hardcoded
in the route.

## Analytics

Three independent providers, each inert unless its identifier is configured.
Loaded once, in the root layout, by `components/analytics/analytics-scripts.tsx`.

| Provider  | Identifier                      | Page views on route change      |
| --------- | ------------------------------- | ------------------------------- |
| Plausible | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`  | automatic (patches `pushState`) |
| PostHog   | `NEXT_PUBLIC_POSTHOG_KEY`       | `route-analytics.tsx`           |
| GA4       | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `route-analytics.tsx`           |

### GA4

**Where it is initialised.** `components/analytics/analytics-scripts.tsx`, and
nowhere else — one `gtag/js` tag and exactly one `gtag("config", …)`. There is
no Google Tag Manager container. `strategy="afterInteractive"` keeps it off the
critical path; the inline snippet defines `dataLayer` and `gtag` synchronously,
so events fired before gtag.js finishes downloading queue rather than vanish.

**Where the ID comes from.** `NEXT_PUBLIC_GA_MEASUREMENT_ID`, read once in
`data/analytics-config.ts` (the former `NEXT_PUBLIC_GA4_ID` still works as a
fallback). A measurement ID is a public identifier, not a secret — it ships in
the page source of every GA4 site — so `NEXT_PUBLIC_` is correct here. There is
deliberately **no hardcoded default**: unset the variable and GA4 disappears
entirely, which is what keeps local and preview traffic out of the property.

> `NEXT_PUBLIC_*` values are inlined at **build** time. Set this in Amplify →
> App settings → Environment variables (applied to the branch) *before* the
> build runs. Unlike `RESEND_API_KEY`, writing it to `.env.production` during
> the build would be too late.

**Page views.** `gtag("config", …)` sends the one for the initial load. Every
client-side navigation after that sends a single `page_view` from
`components/analytics/route-analytics.tsx`, which reports the landing URL only
once so the two never overlap. Route changes are *not* tracked by repeating
`config` — that is the usual way a Next.js app double-counts every navigation.

Deduplication there is by **URL**, not by a "skip the first render" flag. The
flag version breaks under React Strict Mode, which mounts effects twice in
development and so reports the landing page a second time; comparing against
the last URL actually reported is immune to that and to re-renders generally.

> **Required GA4 setting — otherwise every client-side navigation is counted
> twice.** The data stream's *Enhanced measurement* includes **“Page changes
> based on browser history events”**, which is **on by default** and fires its
> own `page_view` on every History API change. Verified against the live tag:
> with it on, one client-side navigation produces two `page_view` hits — ours
> (correct URL and title) and GA4's (marked `ae=a`, carrying the URL of the
> page being *left*). Turn it off in **Admin → Data collection and
> modification → Data streams → Rabbitpay website → Enhanced measurement →
> gear icon → uncheck “Page changes based on browser history events”**. Leave
> the other enhanced-measurement options alone.
>
> Do not "fix" this by deleting the manual tracking instead: on its own, GA4's
> history listener reports each page view one navigation late and never
> records the last page of a session.

**Events.** The full set lives in `ANALYTICS_EVENTS` in `lib/analytics.ts`, as a
closed union so a typo is a build error rather than a silently missing report.

| Event                 | Fired when                                    | Parameters         |
| --------------------- | --------------------------------------------- | ------------------ |
| `start_free_click`    | a "Start Free" CTA is clicked                  | `location`         |
| `demo_click`          | a "Request a Demo" CTA is clicked              | `location`         |
| `demo_form_submit`    | `/api/leads` **accepted** a lead               | `source`           |
| `talk_to_sales_click` | the pricing "Talk to Sales" CTA is clicked     | `location`         |

`scheduler_open` is still declared in `ANALYTICS_EVENTS` but is no longer fired,
since the Calendly scheduler was removed. `demo_form_submit` fires *after* the
API accepts the lead, never on submit, so it is safe to mark as a conversion —
a validation failure is not a conversion.

**Verifying in GA4.**

- **Realtime** (Reports → Realtime) needs no setup: browse the site and the
  events appear within seconds, with an "Event count by Event name" card.
- **DebugView** (Admin → Data display → DebugView) also shows each event's
  *parameters*, but only for sessions flagged as debug. Flag one by installing
  the *Google Analytics Debugger* Chrome extension and enabling it for the tab.
  (The other route — adding `debug_mode: true` to the `config` call — means
  editing `analytics-scripts.tsx`, so prefer the extension and leave the code
  alone.)
- **Without touching GA4 at all**, the browser's network tab is the ground
  truth: filter on `google-analytics.com/g/collect` and read the `en=`
  parameter. When gtag batches several events into one request the names move
  into the POST body, one `en=` per line, so check the payload as well as the
  URL.

One gotcha worth knowing before you conclude something is broken: GA4 batches
non-`page_view` events and flushes on its own schedule, and a heavy third-party
widget on the page can push that past ten seconds. Backgrounding
the tab forces the flush. An event that has not shown up *yet* is usually not a
missing event.

## Deploying to AWS Amplify

- **Build command:** `npm run build` (see `amplify.yml`)
- **Base directory:** `.next` — this is an SSR/WEB_COMPUTE app, not a static export
- **Node.js:** 20 or 22 (Next.js 16 requires >= 20.9)
- **Environment variables** — set in *App settings → Environment variables*:

  | Variable | Scope | Required | Notes |
  |---|---|---|---|
  | `RESEND_API_KEY` | server | yes | Secret. Never `NEXT_PUBLIC_`, never in git. |
  | `EMAIL_TO` | server | yes | Inbox that receives lead notifications. |
  | `EMAIL_FROM` | server | yes | Must be on a **domain verified in Resend**, else sends are rejected. |
  | `CALENDLY_WEBHOOK_SIGNING_KEY` | server | no | Reserved; no webhook is implemented. |
  | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | public | for GA4 | `G-6RQ63F8KDN`. A public identifier, not a secret. **No default** — unset means no GA4 at all. |
  | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` | public | no | Analytics; have defaults. |

  `NEXT_PUBLIC_*` values are inlined at **build** time, so changing one needs a
  redeploy, not just a restart. Server-side values are read per request.
- **Rewrites/redirects:** none required. Amplify's Next.js adapter handles
  routing; do not add a SPA catch-all rewrite to `/index.html` — that would
  break the App Router.
