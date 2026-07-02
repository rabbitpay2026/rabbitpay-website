# RabbitPay — Marketing Landing Page

A single-page, production-grade marketing landing page for **RabbitPay** — a 1-Click Checkout for Shopify & D2C brands, made in India for Indian businesses.

Built with **React + Tailwind CSS** and animated end-to-end with **Magic UI** components implemented in `src/components/magic-ui/`.

## Run locally

```bash
cd /app/frontend
yarn install
yarn start
```

The dev server runs at `http://localhost:3000`. Supervisor manages the process in this container; changes hot-reload automatically.

## Tech stack

- **React 19** (Create React App via `craco`)
- **Tailwind CSS 3.4** — token-mapped RabbitPay palette (`#6D28D9`, `#4C1D95`, `#7C3AED`)
- **framer-motion** — motion primitives used by Magic UI components
- **lucide-react** — icons
- Fonts: **Geist** (heading + body) loaded from Google Fonts

## Structure

```
src/
├── App.js                          # Single BrowserRouter → LandingPage
├── index.css                       # Tailwind + Geist + brand tokens + animations
├── components/
│   ├── LandingPage.jsx             # Composes all 12 sections
│   ├── magic-ui/                   # Every animated primitive lives here
│   │   ├── aurora-text.jsx
│   │   ├── blur-fade.jsx
│   │   ├── number-ticker.jsx
│   │   ├── text-animate.jsx
│   │   ├── marquee.jsx
│   │   ├── dot-pattern.jsx
│   │   ├── retro-grid.jsx
│   │   ├── particles.jsx
│   │   ├── shimmer-button.jsx
│   │   ├── interactive-hover-button.jsx
│   │   ├── rainbow-button.jsx
│   │   ├── script-copy-button.jsx
│   │   ├── border-beam.jsx
│   │   ├── magic-card.jsx
│   │   ├── neon-gradient-card.jsx
│   │   ├── animated-list.jsx
│   │   ├── animated-beam.jsx
│   │   ├── animated-circular-progress.jsx
│   │   ├── scroll-progress.jsx
│   │   ├── iphone-15-pro.jsx
│   │   ├── terminal.jsx
│   │   ├── globe.jsx
│   │   ├── warp-background.jsx
│   │   ├── bento-grid.jsx
│   │   └── theme-toggle.jsx
│   └── sections/                   # 12 landing sections
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── LogoWall.jsx
│       ├── ValueProps.jsx
│       ├── HowItWorks.jsx
│       ├── Features.jsx
│       ├── Pricing.jsx
│       ├── Metrics.jsx
│       ├── Testimonials.jsx
│       ├── Integration.jsx
│       ├── FinalCTA.jsx
│       └── Footer.jsx
```

## Magic UI components used per section

| # | Section          | Magic UI components                                                                    |
|---|------------------|----------------------------------------------------------------------------------------|
| 1 | Sticky Header    | Scroll Progress · Interactive Hover Button                                             |
| 2 | Hero             | Aurora Text · Blur Fade · Shimmer Button · Retro Grid · Dot Pattern · iPhone 15 Pro · Number Ticker |
| 3 | Logo Wall        | Marquee                                                                                |
| 4 | Why RabbitPay    | Bento Grid · Border Beam · Magic Card · Animated List · Blur Fade                      |
| 5 | How it works     | Animated Beam · Blur Fade                                                              |
| 6 | Feature deep-dive| Magic Card · Animated Circular Progress · Globe · Blur Fade                            |
| 7 | Pricing          | Neon Gradient Card · Rainbow Button · Number Ticker · Blur Fade                        |
| 8 | Metrics band     | Number Ticker · Text Animate · Dot Pattern                                             |
| 9 | Testimonials     | Marquee (2 rows, opposite dirs) · Magic Card                                           |
|10 | Integration      | Terminal · Script Copy Button · Blur Fade                                              |
|11 | Final CTA        | Warp Background · Particles · Shimmer Button · Blur Fade                               |
|12 | Footer           | Dot Pattern                                                                            |

## Notes

- **Single route only** — the `App.js` `<BrowserRouter>` returns `<LandingPage />` for `/` and any other path. Nav items (`Product`, `Pricing`, `Integrations`, `Support`) are in-page anchor links (`#product`, `#pricing`, `#integrations`, `#support`).
- **No badges** anywhere — the "recommended" plan uses a Neon Gradient Card + elevation instead of a "Popular" pill.
- **Light theme primary**, with a dark-mode toggle in the header (`localStorage['rp-theme']`).
- **Accessibility** — every interactive element carries a semantic role and a `data-testid`; the page respects `prefers-reduced-motion` via CSS + framer's `useReducedMotion`.
- **All CTAs** point to `mailto:hello@rabbitpay.in`.
