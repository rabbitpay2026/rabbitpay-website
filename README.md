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
│   ├── cta/             book demo (Calendly) button, Talk to Sales button
│   ├── navigation/      Resources dropdown
│   ├── analytics/       Plausible / PostHog / GA4 scripts, route pageviews
│   ├── magic-ui/        the 10 Magic UI components the site actually uses
│   └── ui/              card, toaster
├── data/                navigation, faq, pricing, features, metrics, …
├── lib/                 utils, analytics, calendly, leads, leads-schema,
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

## The two CTA flows

They are deliberately independent and never touch each other.

**Start Free** (lead capture) — the card on the homepage, demo section and `/contact`:

```
email + phone -> client validation -> POST /api/leads
   -> server re-validates -> Resend -> EMAIL_TO -> inline success state
```

**Book a Demo** (scheduling) — the navbar CTA, the pricing "Start Free" button and
the FAQ CTA, all rendered by `components/cta/book-demo-button.tsx`:

```
click -> lazy-load the Calendly widget -> popup overlay on the current page
```

There is **no `/book-a-demo` route** and Book a Demo never posts a lead. The
Calendly widget is not loaded until someone actually clicks.

If `NEXT_PUBLIC_CALENDLY_URL` is unset the button logs a warning and opens
nothing — it never navigates and never invents a fallback destination.

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
  | `NEXT_PUBLIC_CALENDLY_URL` | public | for Book a Demo | Inlined into the bundle. |
  | `CALENDLY_WEBHOOK_SIGNING_KEY` | server | no | Reserved; no webhook is implemented. |
  | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` / `NEXT_PUBLIC_GA4_ID` | public | no | Analytics; have defaults. |

  `NEXT_PUBLIC_*` values are inlined at **build** time, so changing one needs a
  redeploy, not just a restart. Server-side values are read per request.
- **Rewrites/redirects:** none required. Amplify's Next.js adapter handles
  routing; do not add a SPA catch-all rewrite to `/index.html` — that would
  break the App Router.
