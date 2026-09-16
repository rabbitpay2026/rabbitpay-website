import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { MockCheckoutUI } from "@/components/home/mock-checkout-ui";
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
                <span className="block">1-Click Checkout,</span>
                <AuroraText className="font-semibold">built in India.</AuroraText>
              </h1>
            </BlurFade>

            <BlurFade delay={0.28}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish with
                prefilled addresses, UPI-first payments, and verified COD.
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
            <div className="relative mx-auto max-w-[360px]">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(25,107,245,0.35),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(74,140,250,0.16),transparent_52%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 top-20 z-30 hidden items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur lg:flex dark:bg-neutral-900/95"
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
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 bottom-16 z-30 hidden items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur lg:flex dark:bg-neutral-900/95"
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
              </div>

              <div className="relative z-10">
                <IPhone15Pro width={320}>
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
