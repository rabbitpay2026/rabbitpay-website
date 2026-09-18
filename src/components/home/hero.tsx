import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { MockCheckoutUI } from "@/components/home/mock-checkout-ui";
import { SCREEN_WIDTH } from "@/components/home/mock-checkout-data";
import { HERO_ID } from "@/data/anchors";
import { HERO_BADGES } from "@/data/trust";
import { COD_KING_ICON } from "@/data/site";

/** Homepage hero. Ported from the React `sections/Hero.jsx`. */
export function Hero() {
  return (
    <section
      id={HERO_ID}
      data-testid="hero-section"
      className="relative isolate overflow-hidden pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <RetroGrid />
      <DotPattern className="[mask-image:radial-gradient(620px_circle_at_center,white,transparent_75%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(25,107,245,0.22),transparent_68%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <BlurFade delay={0.05}>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand sm:text-sm">
                Built for Indian D2C brands
              </p>
            </BlurFade>

            <BlurFade delay={0.15}>
              <h1 className="mt-4 max-w-3xl text-[40px] font-semibold leading-[1.02] tracking-tighter text-ink dark:text-white sm:text-[56px] lg:text-[68px]">
                {/* The trailing space is deliberate. Both lines render as
                    blocks so it changes nothing visually, but without it a
                    text extractor reads the <h1> as "Checkout,built in India."
                    — and this heading is the site's clearest statement of what
                    RabbitPay is. */}
                <span className="block">RabbitPay is 1-Click Checkout, </span>
                <AuroraText className="font-semibold">built in India.</AuroraText>
              </h1>
            </BlurFade>

            <BlurFade delay={0.28}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                RabbitPay replaces the default Shopify checkout for Indian D2C brands with prefilled
                addresses, UPI-first payments, and verified COD - so more shoppers finish, and fewer
                orders come back.{" "}
                <Link
                  href="/what-is-rabbitpay"
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  What is RabbitPay?
                </Link>
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {HERO_BADGES.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:bg-white/5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    {item}
                  </span>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.45}>
              <div className="mt-4 flex flex-wrap gap-2.5 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] px-3 py-1.5 font-medium dark:bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COD_KING_ICON}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-[3px] object-contain"
                  />
                  Powered by COD King
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] px-3 py-1.5 font-medium dark:bg-white/5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                  Trusted by Indian Shopify merchants
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} className="mt-12">
              <LeadCaptureCard source="hero_inline" testPrefix="hero-lead" />
            </BlurFade>
          </div>

          <BlurFade delay={0.35} className="lg:col-span-5">
            {/* Device widths track the rendered COD King hero phone: 94% / 70% of the container,
                then 230-301px and 329px plus the 20px gutter the floating chips were positioned against. */}
            <div className="relative mx-auto w-[94%] sm:max-[1023px]:w-[70%] lg:max-[1151px]:w-[calc(134.16%_-_228.9px)] min-[1152px]:w-[369px]">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(25,107,245,0.35),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(74,140,250,0.16),transparent_52%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[calc(100%_+_12px)] top-[76px] z-30 hidden w-max items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur min-[1152px]:flex dark:bg-neutral-900/95"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-[0_10px_24px_rgba(25,107,245,0.24)]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Address prefilled
                  </p>
                  <p className="text-xs font-semibold text-ink dark:text-white">3 fields - 220 ms</p>
                </div>
                <span className="absolute left-full top-1/2 h-[7px] w-8 -translate-y-1/2">
                  <span className="absolute left-0 right-[8px] top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-brand/45" />
                  <span className="absolute right-[2px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-brand" />
                </span>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(100%_-_4px)] top-[62%] z-30 hidden w-max items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur min-[1366px]:flex min-[1440px]:left-[calc(100%_+_8px)] dark:bg-neutral-900/95"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-accent text-white shadow-[0_10px_24px_rgba(74,140,250,0.24)]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    UPI - Paid
                  </p>
                  <p className="text-xs font-semibold text-ink dark:text-white">Rs 1,001 - 2.4s</p>
                </div>
                <span className="absolute right-full top-1/2 h-[7px] w-4 -translate-y-1/2 min-[1440px]:w-7">
                  <span className="absolute left-[8px] right-0 top-1/2 h-[1.5px] -translate-y-1/2 rounded-full bg-brand/45" />
                  <span className="absolute left-[2px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3.5px] border-r-[6px] border-y-transparent border-r-brand" />
                </span>
              </div>

              <div className="relative z-10 lg:mx-5">
                <IPhone15Pro screenWidth={SCREEN_WIDTH}>
                  <MockCheckoutUI />
                </IPhone15Pro>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
