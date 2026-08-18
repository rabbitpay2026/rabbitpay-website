# RabbitPay — Product Requirements Document (PRD)

## Problem statement (verbatim)
Build a single-page, production-grade marketing landing page for RabbitPay — a 1-Click Checkout for Shopify & D2C brands, made in India for Indian businesses. Every animated/interactive element must come from Magic UI.

## User personas
- **D2C founder/operator (primary)** — Indian D2C brand founder evaluating a checkout upgrade. Cares about conversion, RTO, and time-to-launch.
- **E-commerce dev (secondary)** — evaluating install effort and integration surface for a Shopify store.
- **Ops / finance stakeholder** — needs clear, honest pricing.

## Non-functional / hard constraints
- Single scrolling landing page at `/` (nav = anchor scroll only, no other routes).
- All animation/effect/button/animated-text/background elements MUST be Magic UI components.
- No badges anywhere; typographic hierarchy drives emphasis.
- Fully responsive (360px → 1440px+); WCAG-lean semantics; respects `prefers-reduced-motion`.
- Light theme primary + optional dark mode toggle.

## Sections shipped (v1)
1. Sticky Header — Scroll Progress · Interactive Hover Button
2. Hero — Aurora Text · Blur Fade · Shimmer Button · iPhone 15 Pro · Retro Grid · Number Ticker
3. Social proof — Marquee logo wall (real Indian D2C brand names supplied by user)
4. Why RabbitPay — Bento Grid + Border Beam + Magic Card + Animated List
5. How it works — Animated Beam (Store → RabbitPay → UPI/Cards/COD → Confirmed)
6. Feature deep-dive — Magic Card panels + Animated Circular Progress + Globe
7. Pricing — Neon Gradient Card + Rainbow Button (exact copy shipped)
8. Metrics — Number Ticker + Text Animate (dark inverted band)
9. Testimonials — Marquee 2 rows opposite dirs + Magic Card + real Unsplash portraits
10. Integration — Terminal + Script Copy Button
11. Final CTA — Warp Background + Particles + Shimmer Button
12. Footer — multi-column + Dot Pattern backdrop

## Copy locked (do not alter numbers)
- Transaction Fee: 1% on successful prepaid orders, 0.3% on successful COD orders
- COD Verification: FREE Forever
- SMS OTP: ₹0.30/message
- WhatsApp Utility: Starting at ₹0.40/message
- Zero Setup Fee — No hidden charges
- Dedicated 1:1 Customer Support
- Tagline: Faster Checkout → Lower RTO → Higher Conversions

## User choices (locked)
- Tech stack: React + Tailwind (CRA)
- Dark mode: enabled with toggle
- CTAs: `mailto:hello@rabbitpay.in`
- Logo wall names: Qwerty Cases, Rabbit Rain, Perlex, Airy Store + complementary D2C names

## Change log
- **2025-12 (v1)** — Landing page shipped with 12 sections, full Magic UI implementation, light + dark theme, mobile → desktop responsive.

## Prioritized backlog
### P1 — enhancement worth adding next
- Contact form via Resend (native lead capture with email verification) — replace `mailto:` with a form + toast confirmation.
- "See it live" interactive demo — a lightweight iframe/loop that shows the RabbitPay checkout flow.
- FAQ section (accordion using existing shadcn `Accordion`).

### P2
- Blog / customer stories linked from footer.
- "Compare" table vs. legacy checkouts.
- SEO / OG tags + og:image generation.
- Analytics (Plausible / GA4).
- i18n (Hindi + regional variants).

## Next tasks
- Wire up a real lead-capture form (Resend integration) — replaces `mailto:` primary CTA.
- Add a lightweight visitor analytics beacon.
