"use client";
import { CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { AuroraText } from "@/components/magic-ui/aurora-text";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { RetroGrid } from "@/components/magic-ui/retro-grid";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";
import { RABBITPAY_ICON } from "@/context/LeadFormContext";
import { cn } from "@/lib/utils";

/**
 * HERO
 * Keeps the existing structure, but aligns all accents to the RabbitPay blue system.
 */
export function Hero() {
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


      </div>
    </section>
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
