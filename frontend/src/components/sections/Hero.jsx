"use client";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, MapPin } from "lucide-react";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { RABBITPAY_ICON } from "@/context/LeadFormContext";
import { openCalendly, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * HERO
 * Keeps the existing structure, but aligns all accents to the RabbitPay blue system.
 */
export function Hero() {
  const onStartFree = () => {
    trackEvent("cta_click", { location: "hero_primary", label: "Start free" });
    openCalendly("hero_primary");
  };

  const onBookDemo = () => {
    trackEvent("cta_click", { location: "hero_secondary", label: "Book a demo" });
    openCalendly("hero_secondary");
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative isolate overflow-hidden pb-8 pt-28 md:pb-12 md:pt-32"
    >
      <RetroGrid />
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent_75%)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <BlurFade delay={0.05}>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-brand sm:text-sm">
                Made in India - for Indian D2C
              </p>
            </BlurFade>

            <BlurFade delay={0.15}>
              <h1 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-tighter text-ink dark:text-white sm:text-[56px] lg:text-[64px]">
                <span className="block">One-Click Checkout,</span>
                <AuroraText className="font-semibold">built in India.</AuroraText>
              </h1>
            </BlurFade>

            <BlurFade delay={0.28}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish - with
                prefilled addresses, UPI-first payments, and verified COD.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <ShimmerButton
                  as="button"
                  type="button"
                  onClick={onStartFree}
                  data-testid="hero-primary-cta"
                >
                  Start free
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </ShimmerButton>
                <button
                  type="button"
                  onClick={onBookDemo}
                  data-testid="hero-secondary-cta"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/50 px-5 py-3 text-sm font-medium text-ink/80 backdrop-blur transition-colors hover:border-brand hover:text-brand dark:bg-white/5 dark:text-white/80"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </BlurFade>

            <BlurFade delay={0.55}>
              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> Zero setup fee
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> Live in minutes
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> 1:1 support
                </li>
              </ul>
            </BlurFade>
          </div>

          <BlurFade delay={0.35} className="lg:col-span-5">
            <div className="relative mx-auto">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(25,107,245,0.38),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(74,140,250,0.18),transparent_55%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 top-24 z-30 hidden items-center gap-2 rounded-2xl border border-border bg-white/95 px-3.5 py-2.5 shadow-xl backdrop-blur lg:flex dark:bg-neutral-900/95"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-[0_10px_24px_rgba(25,107,245,0.24)]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Address prefilled
                  </p>
                  <p className="text-xs font-semibold text-ink dark:text-white">
                    3 fields · 220 ms
                  </p>
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
                    UPI · Paid
                  </p>
                  <p className="text-xs font-semibold text-ink dark:text-white">
                    ₹1,001 · 2.4s
                  </p>
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

        <BlurFade delay={0.6}>
          <div className="relative mt-14 rounded-2xl border border-border bg-white/70 p-5 backdrop-blur dark:bg-white/[0.03] md:mt-16 sm:p-6">
            <BorderBeam size={220} duration={12} colorFrom="#196BF5" colorTo="#4A8CFA" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Stat icon={<Zap className="h-4 w-4" />} label="Conversion uplift" value={35} suffix="%" prefix="+" />
              <Stat
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Return-to-Origin"
                value={28}
                suffix="%"
                prefix="−"
                tone="accent"
              />
              <Stat icon={<CheckCircle2 className="h-4 w-4" />} label="Checkout time" value={3} suffix="s" prefix="<" />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/80">
            Illustrative benchmarks aggregated across pilot merchants - your mileage may vary.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

function Stat({ icon, label, value, prefix, suffix, tone }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl border border-border bg-background",
          tone === "accent" ? "text-brand-accent" : "text-brand",
        )}
      >
        {icon}
      </span>
      <div>
        <div className="text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
          <NumberTicker value={value} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function MockCheckoutUI() {
  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFF] pt-14 dark:bg-neutral-900">
      <div className="flex items-center justify-between border-b border-black/5 px-5 pb-3 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white shadow-sm">
            <img src={RABBITPAY_ICON} alt="RabbitPay" className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold text-ink dark:text-white">RabbitPay</span>
        </div>
        <span className="text-[10px] text-black/50 dark:text-white/50">Secure</span>
      </div>

      <div className="flex-1 overflow-hidden px-5 py-4">
        <div className="relative rounded-lg border-2 border-brand/40 bg-brand/5 p-3">
          <div className="absolute -top-2 left-3 rounded-full bg-brand px-2 py-[2px] text-[9px] font-bold uppercase tracking-widest text-white">
            Prefilled
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">
              Deliver to
            </span>
            <span className="text-[10px] font-semibold text-brand">Change</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-ink dark:text-white">
            Avijeet Dey · +91 62955 29286
          </p>
          <p className="text-[10px] leading-tight text-black/60 dark:text-white/60">
            56A Savithri Nilayam, Bengaluru - 560035
          </p>
        </div>

        <div className="mt-3 rounded-lg border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-ink dark:text-white">Male Vintage Watch</span>
            <span className="text-[11px] font-semibold text-ink dark:text-white">₹1,089</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] text-black/60 dark:text-white/60">Shipping</span>
            <span className="text-[11px] font-medium text-brand-accent">FREE</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2 dark:border-white/10">
            <span className="text-[11px] font-semibold text-ink dark:text-white">Total</span>
            <span className="text-sm font-bold text-ink dark:text-white">₹1,089</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
              Payment method
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-[2px] text-[8px] font-semibold text-brand dark:text-brand-accent">
              <Sparkles className="h-2.5 w-2.5" />
              Save 8% on prepaid
            </span>
          </div>
          <div className="mt-2 space-y-1.5">
            <PayRow name="UPI · GPay / PhonePe" selected />
            <PayRow name="Cards / NetBanking" />
            <PayRow name="Cash on Delivery - verified" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand/10 px-3 py-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-medium text-brand">Payment successful · ₹1,001.88</span>
        </div>

        <button
          disabled
          className="mt-3 w-full rounded-lg bg-brand py-3 text-[12px] font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.24)]"
        >
          Pay ₹1,001.88 via UPI
        </button>
      </div>
    </div>
  );
}

function PayRow({ name, selected }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border px-2.5 py-2 text-[11px]",
        selected ? "border-brand/40 bg-brand/5" : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800",
      )}
    >
      <span className="font-medium text-ink dark:text-white">{name}</span>
      <span
        className={cn(
          "grid h-3.5 w-3.5 place-items-center rounded-full border",
          selected ? "border-brand bg-brand" : "border-black/20 dark:border-white/20",
        )}
      >
        {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
      </span>
    </div>
  );
}
