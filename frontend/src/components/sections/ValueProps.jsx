"use client";
import {
  Zap,
  ShieldCheck,
  Percent,
  MapPinned,
  CheckCircle2,
  Truck,
  Smartphone,
  IndianRupee,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/magic-ui/bento-grid";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { AnimatedList } from "@/components/magic-ui/animated-list";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { cn } from "@/lib/utils";

const ORDER_EVENTS = [
  {
    icon: <CheckCircle2 className="h-4 w-4" />,
    title: "Order placed",
    detail: "#RP-84210 · ₹1,499 · Bengaluru",
    tone: "bg-brand/10 text-brand",
  },
  {
    icon: <Smartphone className="h-4 w-4" />,
    title: "OTP verified",
    detail: "+91 98•••••420 · COD confirmed",
    tone: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: <IndianRupee className="h-4 w-4" />,
    title: "Prepaid captured",
    detail: "UPI · ₹2,299 · Delhi NCR",
    tone: "bg-success/10 text-success",
  },
  {
    icon: <Truck className="h-4 w-4" />,
    title: "Shipped via Delhivery",
    detail: "AWB 9821•••20 · ETA 2 days",
    tone: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400",
  },
  {
    icon: <ShieldCheck className="h-4 w-4" />,
    title: "RTO risk: Low",
    detail: "Address score 92 · Prev 6 orders",
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
];

/**
 * VALUE PROPS — Bento grid.
 * Uses: Bento Grid, Border Beam, Magic Card, Animated List.
 */
export function ValueProps() {
  return (
    <section
      id="product"
      data-testid="value-props"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            Why RabbitPay
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white">
            The checkout your Indian
            <br className="hidden sm:block" /> shoppers were waiting for.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Built for the way India buys online — fewer taps, UPI-first, verified COD,
            and address prefill for millions of shoppers.
          </p>
        </BlurFade>

        <div className="mt-14">
          <BentoGrid className="auto-rows-[minmax(220px,auto)]">
            {/* Big — animated list of order events */}
            <BentoCard
              colSpan="md:col-span-4"
              rowSpan="md:row-span-2"
              className="min-h-[420px]"
            >
              <BorderBeam
                size={260}
                duration={10}
                colorFrom="#7C3AED"
                colorTo="#22D3EE"
              />
              <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Live · India network
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink dark:text-white">
                    Real-time order events, powered by RabbitPay
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Track every checkout signal from OTP to prepaid capture with a merchant
                    dashboard that behaves like production, not a demo.
                  </p>
                </div>
                <div className="mt-8">
                  <AnimatedList
                    items={ORDER_EVENTS}
                    visibleCount={4}
                    renderItem={(item) => (
                      <div className="flex items-center gap-3 rounded-xl border border-border bg-background/80 dark:bg-white/[0.02] p-3 backdrop-blur">
                        <span
                          className={cn(
                            "grid h-8 w-8 place-items-center rounded-lg",
                            item.tone,
                          )}
                        >
                          {item.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink dark:text-white">
                            {item.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </BentoCard>

            {/* Faster checkout */}
            <FeatureCell
              colSpan="md:col-span-2"
              icon={<Zap className="h-5 w-5" />}
              title="Faster checkout"
              body="A ruthless UX — 2 taps for returning shoppers, 3 for new ones. UPI-first."
              accent="from-brand/15 to-transparent"
            />
            {/* Lower RTO */}
            <FeatureCell
              colSpan="md:col-span-2"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Lower RTO"
              body="COD verification, address scoring, and intent checks catch risky orders early."
              accent="from-emerald-500/15 to-transparent"
            />
            {/* Higher conversions */}
            <FeatureCell
              colSpan="md:col-span-3"
              icon={<Percent className="h-5 w-5" />}
              title="Higher conversions"
              body="Address prefill and a saved-shopper network means fewer drop-offs. Real. Measurable."
              accent="from-fuchsia-500/15 to-transparent"
            />
            {/* Made in India */}
            <FeatureCell
              colSpan="md:col-span-3"
              icon={<MapPinned className="h-5 w-5" />}
              title="Made in India"
              body="UPI intent + QR, regional pincode intelligence, and support that speaks your language."
              accent="from-brand/15 to-transparent"
            />
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ colSpan, icon, title, body, accent }) {
  return (
    <BentoCard colSpan={colSpan} className="min-h-[220px]">
      <MagicCard className="h-full rounded-3xl border-0 bg-transparent">
        <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b opacity-70",
              accent,
            )}
          />
          <span className="relative z-10 inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand">
            {icon}
          </span>
          <div className="relative z-10 mt-6">
            <h3 className="text-xl font-semibold tracking-tight text-ink dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {body}
            </p>
          </div>
        </div>
      </MagicCard>
    </BentoCard>
  );
}
