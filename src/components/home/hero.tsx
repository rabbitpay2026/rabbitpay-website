import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { HeroHighlights } from "@/components/home/hero-highlights";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { MockCheckoutUI } from "@/components/home/mock-checkout-ui";
import { SCREEN_WIDTH } from "@/components/home/mock-checkout-data";
import { CHECKOUT_DEMO_ID, HERO_ID } from "@/data/anchors";
import { HERO_BADGES } from "@/data/trust";
import { COD_KING_ICON, COD_KING_URL, DEMO_STORE_URL } from "@/data/site";

/**
 * Homepage hero. Ported from the React `sections/Hero.jsx`.
 *
 * No entrance animation in here, deliberately. `BlurFade` is a client component
 * that renders its children at `opacity: 0` in the server HTML and only fades
 * them in once React has hydrated and framer-motion has run. Below the fold
 * that is a scroll reveal; at the top of the page it meant the headline, the
 * badges and the CTAs arrived faded — measured at 0.18, 0 and 0 opacity 700ms
 * after DOMContentLoaded — which is what made the hero look washed out and
 * half-blurred. The hero now paints sharp from the server HTML. Every section
 * below still uses BlurFade.
 */

export function Hero() {
  return (
    <section
      id={HERO_ID}
      data-testid="hero-section"
      className="relative isolate overflow-hidden pb-10 pt-28 md:pb-14 md:pt-32"
    >
      {/* Softened: at full strength the perspective grid drew hard 1px lines
          straight through the headline and description. Same treatment, just
          far enough back to read as texture rather than interference. */}
      <RetroGrid className="opacity-40" />
      <DotPattern className="[mask-image:radial-gradient(620px_circle_at_center,white,transparent_75%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(25,107,245,0.22),transparent_68%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div>
              {/* A step up from text-xs/sm: large enough to read as a
                  positioning line above the headline, still well below it in
                  weight and size. Tracking eased from 0.28em so the longer
                  wording stays readable and wraps cleanly on a phone. */}
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand sm:text-base">
                One-click checkout for Indian Shopify brands
              </p>
            </div>

            <div>
              {/* The headline is split across two lines so the second can carry
                  the existing aurora treatment. The trailing space is
                  deliberate: both lines render as blocks, so it changes nothing
                  visually, but without it a text extractor reads the <h1> as
                  "...IntoCompleted Purchases".

                  Sizes are set so the headline lands on exactly two lines —
                  "Turn More Checkouts Into" / "Completed Purchases" — at every
                  width where the hero is two columns. The text column is 615px
                  from 1152px up (52px fits) and 540px between 1024 and 1151px
                  (44px fits); below `lg` the hero is one column and the copy
                  wraps naturally. */}
              <h1 className="mt-4 max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-[52px] lg:text-[44px] min-[1152px]:text-[52px]">
                <span className="block">Turn More Checkouts Into </span>
                <AuroraText className="font-semibold">Completed Purchases</AuroraText>
              </h1>
            </div>

            <div>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Make checkout easier with prefilled details and UPI-first payments. Help shoppers
                spend less time typing and move smoothly towards placing an order.{" "}
                <Link
                  href="/what-is-rabbitpay"
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  What is RabbitPay?
                </Link>
              </p>
            </div>

            {/*
              Opaque, not `bg-white/80` + `backdrop-blur`. Over the grid and the
              hero glow the translucent fill plus an 8px backdrop blur smeared
              the background through the badge and left both the pill edges and
              the label looking out of focus. Same shape, same border, same
              shadow — it just reads sharply now. `items-center` keeps each icon
              on the text's centre line, and the row wraps instead of
              overflowing on narrow screens.
            */}
            <div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {HERO_BADGES.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm dark:bg-white/10"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/*
              The COD King relationship, as a proper lockup rather than a grey
              pill in grey text. It uses the same COD King mark the header and
              the "Powered by" section already use, sits on the hero's card
              treatment, and stays clearly secondary to the RabbitPay headline:
              small mark, small caps label, no brand fill.
            */}
            <div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={COD_KING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="hero-cod-king"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-white px-3.5 py-2 shadow-sm transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COD_KING_ICON}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 rounded-md object-contain"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Powered by
                    </span>
                    <span className="mt-1 text-sm font-semibold text-ink dark:text-white">
                      COD King
                    </span>
                  </span>
                </a>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-brand" />
                  Trusted by Indian Shopify merchants
                </span>
              </div>
            </div>

            {/*
              "Book a Demo" scrolls to the existing lead form in #demo-section —
              the same BookDemoButton every other demo CTA on the site uses.

              "Try the Checkout" is the header's "View Demo Store" button under
              a different label: same `DEMO_STORE_URL`, same new tab, same
              `rel`, same trailing arrow. Trying the checkout means using the
              real one on the demo storefront, so it resolves to that rather
              than to the demo request form. The header button is untouched.
            */}
            <div className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookDemoButton
                  location="hero_primary"
                  intent="demo"
                  testId="hero-book-demo"
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_22px_46px_rgba(25,107,245,0.36)] active:translate-y-0 sm:w-auto"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </BookDemoButton>
                <a
                  href={DEMO_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="hero-try-checkout"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white sm:w-auto"
                >
                  Try the Checkout
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Device widths track the rendered COD King hero phone: 94% / 70% of the container,
                then 230-301px and 329px plus the 20px gutter the floating chips were positioned against. */}
            {/* `translate-x` at ≥1800px, and only there, is what lets the
                left-hand callouts climb the phone instead of bunching under
                the hero text. The hero container is centred and capped at
                1152px, so on a wide screen ~400px of viewport sits unused
                outside it on each side while the corridor between the text
                column (which the headline fills to its full 615px) and the
                phone stays 96px — too narrow for a callout. Sliding the device
                145px into the right-hand gutter widens that corridor to ~230px
                and still leaves room for the right-hand column. Below 1800px
                the arithmetic does not close (see hero-highlights), so the
                phone stays exactly where it was. The callouts are positioned
                against this element, so they travel with it. */}
            <div className="relative mx-auto w-[94%] transition-none sm:max-[1023px]:w-[70%] lg:max-[1151px]:w-[calc(134.16%_-_228.9px)] min-[1152px]:w-[369px] min-[1600px]:translate-x-[80px] min-[1800px]:translate-x-[145px]">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(25,107,245,0.35),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(74,140,250,0.16),transparent_52%)] blur-2xl"
              />
              {/* The six capability callouts. At >=1440px they sit three a
                  side around the phone, anchored to this wrapper so they track
                  the phone itself; below that width the same six render as a
                  grid under the hero row. They replace the two hand-placed
                  chips that used to live here. */}
              <HeroHighlights variant="floating" />

              {/* The page's one checkout demo. "See how RabbitPay checkout
                  works" and the hero's "Try the Checkout" both point here, so
                  the demo exists exactly once on the page. */}
              <div id={CHECKOUT_DEMO_ID} className="relative z-10 scroll-mt-24 lg:mx-5">
                <IPhone15Pro screenWidth={SCREEN_WIDTH}>
                  <MockCheckoutUI />
                </IPhone15Pro>
              </div>
            </div>
          </div>
        </div>

        {/* The same six callouts, for every width below 1440px where there is
            no gutter beside the phone to float them in. Hidden at the width the
            floating set takes over, so only one of the two is ever in the
            document's accessibility tree. */}
        <HeroHighlights variant="grid" />
      </div>
    </section>
  );
}
