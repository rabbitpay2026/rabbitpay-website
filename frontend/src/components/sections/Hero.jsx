"use client";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, MapPin, QrCode, ChevronLeft, X } from "lucide-react";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { RABBITPAY_LOGO } from "@/context/LeadFormContext";
import { openCalendly, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * HERO
 * Uses: Aurora Text, Blur Fade, Shimmer Button, iPhone 15 Pro, Retro Grid + Dot Pattern, Number Ticker.
 * "Start free" and "Book a demo" open the in-page Calendly popup.
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
      className="relative isolate overflow-hidden pt-28 md:pt-32 pb-8 md:pb-12"
    >
      <RetroGrid />
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent_75%)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.05}>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.24em] text-brand">
                Made in India — for Indian D2C
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <h1 className="mt-4 text-[40px] sm:text-[56px] lg:text-[64px] font-semibold leading-[1.02] tracking-tighter text-ink dark:text-white">
                <span className="block">1-Click Checkout,</span>
                <AuroraText className="font-semibold">built in India.</AuroraText>
              </h1>
            </BlurFade>
            <BlurFade delay={0.28}>
              <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish —
                with prefilled addresses, UPI-first payments, and verified COD.
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/50 dark:bg-white/5 px-5 py-3 text-sm font-medium text-ink/80 dark:text-white/80 backdrop-blur transition-colors hover:text-brand hover:border-brand"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </BlurFade>

            <BlurFade delay={0.55}>
              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> Zero setup fee
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> Live in minutes
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" /> 1:1 support
                </li>
              </ul>
            </BlurFade>
          </div>

          {/* Right visual — iPhone with mock checkout inspired by real RabbitPay flow */}
          <BlurFade delay={0.35} className="lg:col-span-5">
            <div className="relative mx-auto">
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.35),transparent_60%)] blur-2xl"
              />
              {/* Floating "prefilled" badge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 top-24 hidden lg:flex items-center gap-2 rounded-2xl border border-border bg-white/95 dark:bg-neutral-900/95 px-3.5 py-2.5 shadow-xl backdrop-blur z-20"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Address prefilled
                  </p>
                  <p className="text-xs font-semibold text-ink dark:text-white">
                    3 fields · 220&nbsp;ms
                  </p>
                </div>
              </div>
              {/* Floating "UPI paid" badge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 bottom-16 hidden lg:flex items-center gap-2 rounded-2xl border border-border bg-white/95 dark:bg-neutral-900/95 px-3.5 py-2.5 shadow-xl backdrop-blur z-20"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-success text-white">
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
              <IPhone15Pro width={320}>
                <MockCheckoutUI />
              </IPhone15Pro>
            </div>
          </BlurFade>
        </div>

        {/* Stats strip */}
        <BlurFade delay={0.6}>
          <div className="relative mt-14 md:mt-16 rounded-2xl border border-border bg-white/70 dark:bg-white/[0.03] p-5 sm:p-6 backdrop-blur">
            <BorderBeam size={220} duration={12} colorFrom="#7C3AED" colorTo="#22D3EE" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Stat
                icon={<Zap className="h-4 w-4" />}
                label="Conversion uplift"
                value={35}
                suffix="%"
                prefix="+"
              />
              <Stat
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Return-to-Origin"
                value={28}
                suffix="%"
                prefix="−"
                tone="success"
              />
              <Stat
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Checkout time"
                value={3}
                suffix="s"
                prefix="<"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/80">
            Illustrative benchmarks aggregated across pilot merchants — your mileage may vary.
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
          "grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand",
          tone === "success" && "text-success",
        )}
      >
        {icon}
      </span>
      <div>
        <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink dark:text-white">
          <NumberTicker value={value} prefix={prefix} suffix={suffix} />
        </div>
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

/**
 * Mock RabbitPay checkout inside the iPhone.
 * Visual language mirrors the real RabbitPay checkout: brand header with
 * progress bar, order summary, delivery details, "Save X% on prepaid"
 * pill, and multiple payment method rows.
 */
function MockCheckoutUI() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F7F7FB] pt-10 dark:bg-neutral-900 text-[10px] leading-tight">
      {/* Promo strip */}
      <div className="bg-[#4C1D95] text-white text-center py-1.5 text-[9px] font-semibold tracking-wide">
        Shop now! Sale ends in 24 hours.
      </div>
      {/* Header with brand + step indicator */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white dark:bg-neutral-800 dark:border-white/5 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <ChevronLeft className="h-3.5 w-3.5 text-ink dark:text-white" strokeWidth={2.5} />
          <img
            src={RABBITPAY_LOGO}
            alt="RabbitPay"
            className="h-5 w-5 rounded-md"
          />
          <span className="text-[10px] font-semibold text-ink dark:text-white">
            RabbitPay
          </span>
        </div>
        <div className="flex items-center gap-1">
          <StepDot done />
          <span className="text-[8px] text-ink/30 dark:text-white/30">···</span>
          <StepDot done />
          <span className="text-[8px] text-ink/30 dark:text-white/30">···</span>
          <StepDot current />
          <span className="ml-1 text-[9px] font-semibold text-ink dark:text-white">Pay</span>
        </div>
        <X className="h-3.5 w-3.5 text-ink/60 dark:text-white/60" />
      </div>

      <div className="flex-1 overflow-hidden px-3 pt-2.5 pb-2">
        {/* Order summary row */}
        <div className="flex items-center justify-between rounded-lg border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-brand/10 text-brand text-[9px] font-bold">
              📦
            </span>
            <div>
              <p className="text-[10px] font-semibold text-ink dark:text-white">
                Order · 1 Item
              </p>
              <p className="text-[9px] text-black/50 dark:text-white/50">Male Vintage Watch</p>
            </div>
          </div>
          <p className="text-[11px] font-bold text-ink dark:text-white">₹1,089</p>
        </div>

        {/* Delivery details — HIGHLIGHTED as prefilled */}
        <div className="relative mt-2 rounded-lg border-2 border-brand/40 bg-brand/5 p-2.5">
          <div className="absolute -top-1.5 left-2 rounded-full bg-brand px-1.5 py-[1px] text-[8px] font-bold uppercase tracking-widest text-white">
            Prefilled
          </div>
          <div className="mt-0.5 flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-brand inline-flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5" />
              Deliver to
            </span>
            <span className="text-[9px] font-semibold text-brand">Change</span>
          </div>
          <p className="mt-0.5 text-[10px] font-semibold text-ink dark:text-white">
            Avijeet Dey · +91 62955 29286
          </p>
          <p className="text-[9px] leading-tight text-black/60 dark:text-white/60">
            56A Savithri Nilayam, Bengaluru — 560035
          </p>
        </div>

        {/* Payment methods heading + prepaid save badge */}
        <div className="mt-2.5 flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
            Payment methods
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-[2px] text-[8px] font-semibold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-2.5 w-2.5" />
            Save 8% on prepaid
          </span>
        </div>

        <div className="mt-1.5 space-y-1">
          <PayRow name="UPI · GPay / PhonePe" price="₹1,001" strike="₹1,089" selected icon={<QrCode className="h-3 w-3" />} />
          <PayRow name="Cards / NetBanking" price="₹1,001" strike="₹1,089" />
          <PayRow name="Wallets · Paytm, Mobikwik" price="₹1,001" strike="₹1,089" />
          <PayRow name="Cash on Delivery · verified" price="₹1,089" />
        </div>

        {/* Success + Pay button */}
        <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-success/10 px-2 py-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-success text-white">
            <CheckCircle2 className="h-2.5 w-2.5" />
          </span>
          <span className="text-[9px] font-medium text-success">
            Payment successful · ₹1,001.88
          </span>
        </div>
        <button
          disabled
          className="mt-2 w-full rounded-lg bg-brand py-2.5 text-[10px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]"
        >
          Pay ₹1,001.88 via UPI
        </button>
      </div>
    </div>
  );
}

function StepDot({ done, current }) {
  return (
    <span
      className={cn(
        "grid h-3 w-3 place-items-center rounded-full border text-white text-[7px]",
        done && "bg-brand border-brand",
        current && "bg-ink border-ink dark:bg-white dark:border-white",
        !done && !current && "border-black/20 bg-white",
      )}
    >
      {done ? "✓" : ""}
    </span>
  );
}

function PayRow({ name, price, strike, selected, icon }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border px-2 py-1.5 text-[10px]",
        selected
          ? "border-brand/40 bg-brand/[0.06]"
          : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800",
      )}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        {icon ? (
          <span className="grid h-4 w-4 place-items-center rounded bg-brand/10 text-brand">
            {icon}
          </span>
        ) : (
          <span className="h-4 w-4 rounded bg-ink/10 dark:bg-white/10" />
        )}
        <span className="truncate font-medium text-ink dark:text-white">{name}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {strike ? (
          <span className="text-[9px] line-through text-black/40 dark:text-white/40">
            {strike}
          </span>
        ) : null}
        <span className={cn("text-[10px] font-semibold", selected ? "text-brand" : "text-ink dark:text-white")}>
          {price}
        </span>
      </div>
    </div>
  );
}
