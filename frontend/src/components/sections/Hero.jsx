"use client";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { cn } from "@/lib/utils";

/**
 * HERO
 * Uses: Aurora Text, Blur Fade, Shimmer Button, iPhone 15 Pro, Retro Grid + Dot Pattern, Number Ticker.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative isolate overflow-hidden pt-32 md:pt-40"
    >
      <RetroGrid />
      <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent_75%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left copy */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.05}>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand">
                Made in India — for Indian D2C
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <h1 className="mt-5 text-[42px] sm:text-[56px] lg:text-[72px] font-semibold leading-[1.02] tracking-tighter text-ink dark:text-white">
                <span className="block">1-Click Checkout,</span>
                <AuroraText className="font-semibold">built in India.</AuroraText>
              </h1>
            </BlurFade>
            <BlurFade delay={0.28}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Higher conversions. Lower RTO. A checkout your Indian shoppers actually finish —
                with prefilled addresses, UPI-first payments, and verified COD.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ShimmerButton
                  as="a"
                  href="mailto:hello@rabbitpay.in"
                  data-testid="hero-primary-cta"
                >
                  Start free
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </ShimmerButton>
                <a
                  href="mailto:hello@rabbitpay.in?subject=Book%20a%20Demo"
                  data-testid="hero-secondary-cta"
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium text-ink/80 dark:text-white/80 hover:text-brand transition-colors"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </BlurFade>

            <BlurFade delay={0.55}>
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

          {/* Right visual — iPhone with mock checkout */}
          <BlurFade delay={0.35} className="lg:col-span-5">
            <div className="relative mx-auto">
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.35),transparent_60%)] blur-2xl"
              />
              <IPhone15Pro width={340}>
                <MockCheckoutUI />
              </IPhone15Pro>
            </div>
          </BlurFade>
        </div>

        {/* Stats strip */}
        <BlurFade delay={0.6}>
          <div className="mt-20 md:mt-24 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-white/70 dark:bg-white/[0.03] p-6 backdrop-blur sm:grid-cols-3">
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
    <div className="flex items-center gap-5">
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

/** Mock RabbitPay checkout inside the iPhone. */
function MockCheckoutUI() {
  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAFF] pt-14 dark:bg-neutral-900">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-black/5 px-5 pb-3 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-white text-[10px] font-bold">
            R
          </span>
          <span className="text-[11px] font-semibold text-ink dark:text-white">
            RabbitPay
          </span>
        </div>
        <span className="text-[10px] text-black/50 dark:text-white/50">Secure</span>
      </div>

      <div className="flex-1 overflow-hidden px-5 py-4">
        {/* Address */}
        <div className="rounded-lg border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
              Deliver to
            </span>
            <span className="text-[10px] font-semibold text-brand">Change</span>
          </div>
          <p className="mt-1 text-[11px] font-semibold text-ink dark:text-white">
            Ananya S. · +91 98•••••420
          </p>
          <p className="text-[10px] leading-tight text-black/60 dark:text-white/60">
            A-14, HSR Layout, Sector 7, Bengaluru — 560102
          </p>
        </div>

        {/* Order summary */}
        <div className="mt-3 rounded-lg border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-ink dark:text-white">
              Sunset Cotton Tee
            </span>
            <span className="text-[11px] font-semibold text-ink dark:text-white">
              ₹1,199
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[11px] text-black/60 dark:text-white/60">
              Shipping
            </span>
            <span className="text-[11px] font-medium text-success">FREE</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2 dark:border-white/10">
            <span className="text-[11px] font-semibold text-ink dark:text-white">
              Total
            </span>
            <span className="text-sm font-bold text-ink dark:text-white">
              ₹1,199
            </span>
          </div>
        </div>

        {/* Payment method */}
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
            Payment method
          </p>
          <div className="mt-2 space-y-1.5">
            <PayRow name="UPI · GPay / PhonePe" selected />
            <PayRow name="Cards / NetBanking" />
            <PayRow name="Cash on Delivery — verified" />
          </div>
        </div>

        {/* Success */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-success text-white">
            <CheckCircle2 className="h-3 w-3" />
          </span>
          <span className="text-[11px] font-medium text-success">
            Payment successful · ₹1,199
          </span>
        </div>

        {/* Pay button */}
        <button
          disabled
          className="mt-4 w-full rounded-lg bg-brand py-3 text-[12px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]"
        >
          Pay ₹1,199 via UPI
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
        selected
          ? "border-brand/40 bg-brand/5"
          : "border-black/5 bg-white dark:border-white/10 dark:bg-neutral-800",
      )}
    >
      <span className="font-medium text-ink dark:text-white">{name}</span>
      <span
        className={cn(
          "grid h-3.5 w-3.5 place-items-center rounded-full border",
          selected
            ? "border-brand bg-brand"
            : "border-black/20 dark:border-white/20",
        )}
      >
        {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
      </span>
    </div>
  );
}
