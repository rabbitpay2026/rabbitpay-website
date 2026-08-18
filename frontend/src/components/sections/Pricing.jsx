"use client";
import { Check, Minus, Sparkles, Star, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { openCalendly } from "@/lib/calendly";
import { trackEvent } from "@/lib/analytics";
import { COD_KING_ICON } from "@/context/LeadFormContext";
import { cn } from "@/lib/utils";

function scrollToDemo() {
  trackEvent("cta_click", { location: "pricing_enterprise", label: "Talk to Sales" });
  document
    .getElementById("demo-section")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/** Plan columns. Values mirror the previous pricing cards exactly. */
const PLANS = [
  {
    key: "growth",
    name: "Growth",
    tagline: "For growing D2C brands",
    price: "1%",
    priceNote: "on successful prepaid orders",
    secondaryPrice: "0.3%",
    secondaryPriceNote: "on successful COD orders",
    highlight: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "For 50k+ monthly orders",
    price: "Custom",
    priceNote: "volume-based pricing",
    highlight: false,
  },
];

/**
 * `true`/`false` render as a tick / dash; strings render as-is. An array of
 * `{ value, note }` renders as stacked lines — used where one plan carries more
 * than one rate (prepaid vs COD).
 */
const ROWS = [
  { feature: "Setup Fee", growth: "Free", enterprise: "Free" },
  {
    feature: "Transaction Fee",
    growth: [
      { value: "1%", note: "on successful prepaid orders" },
      { value: "0.3%", note: "on successful COD orders" },
    ],
    enterprise: "Custom",
  },
  { feature: "COD Verification", growth: "Included", enterprise: "Included" },
  { feature: "Customer Support", growth: "Standard", enterprise: "Dedicated" },
  { feature: "SLA", growth: false, enterprise: true },
  { feature: "Monthly Volume", growth: "Unlimited", enterprise: "50k+" },
  { feature: "MDR Discounts", growth: false, enterprise: true },
  { feature: "Dedicated CSM", growth: false, enterprise: true },
];

function Cell({ value, highlight }) {
  if (Array.isArray(value)) {
    return (
      <span className="flex flex-col items-center gap-1.5">
        {value.map((line) => (
          <span key={line.value} className="flex flex-col items-center">
            <span
              className={cn(
                "text-sm font-semibold sm:text-[15px]",
                highlight ? "text-brand" : "text-ink dark:text-white",
              )}
            >
              {line.value}
            </span>
            <span className="text-[11px] leading-tight text-muted-foreground">{line.note}</span>
          </span>
        ))}
      </span>
    );
  }
  if (value === true) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Check className="h-4 w-4" strokeWidth={2.5} />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground/70">
        <Minus className="h-4 w-4" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-sm font-semibold sm:text-[15px]",
        highlight ? "text-brand" : "text-ink dark:text-white",
      )}
    >
      {value}
    </span>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing"
      className="relative border-t border-border py-20 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(25,107,245,0.18),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Pricing
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Simple pricing that feels premium, not punitive.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Two clear rates: 1% on successful prepaid orders and 0.3% on successful COD orders. One
            plan for growing brands, with an enterprise path for higher volume merchants that need
            bespoke rollout support.
          </p>
        </BlurFade>

        <BlurFade delay={0.08}>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F3F4F6] px-4 py-2 text-xs font-medium text-[#6B7280] dark:bg-white/5">
            <img
              src={COD_KING_ICON}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.5 flex-shrink-0 rounded-[3px] object-contain"
            />
            Every RabbitPay plan is backed by COD King's verification and checkout optimization
            infrastructure.
          </p>
        </BlurFade>

        {/* Comparison table */}
        <BlurFade delay={0.12}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.06),transparent)]">
                    <th scope="col" className="px-5 py-6 sm:px-7">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Compare plans
                      </span>
                    </th>
                    {PLANS.map((plan) => (
                      <th
                        key={plan.key}
                        scope="col"
                        className={cn(
                          "px-5 py-6 text-center align-top sm:px-7",
                          plan.highlight && "relative bg-brand/[0.04]",
                        )}
                      >
                        {plan.highlight ? (
                          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                            <Sparkles className="h-3 w-3" />
                            Best value
                          </span>
                        ) : null}
                        <div className="text-lg font-semibold tracking-tight text-ink dark:text-white">
                          {plan.name}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{plan.tagline}</div>
                        <div
                          className={cn(
                            "mt-3 text-3xl font-semibold tracking-tighter sm:text-4xl",
                            plan.highlight ? "text-brand" : "text-ink dark:text-white",
                          )}
                        >
                          {plan.price}
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {plan.priceNote}
                        </div>
                        {plan.secondaryPrice ? (
                          <>
                            <div
                              className={cn(
                                "mt-2 text-xl font-semibold tracking-tighter sm:text-2xl",
                                plan.highlight ? "text-brand" : "text-ink dark:text-white",
                              )}
                            >
                              {plan.secondaryPrice}
                            </div>
                            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                              {plan.secondaryPriceNote}
                            </div>
                          </>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {ROWS.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "group border-b border-border/70 transition-colors last:border-0 hover:bg-brand/[0.04]",
                        index % 2 === 1 && "bg-muted/30",
                      )}
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-sm font-medium text-ink/80 sm:px-7 sm:text-[15px] dark:text-white/80"
                      >
                        {row.feature}
                      </th>
                      <td className="bg-brand/[0.03] px-5 py-4 text-center sm:px-7">
                        <Cell value={row.growth} highlight />
                      </td>
                      <td className="px-5 py-4 text-center sm:px-7">
                        <Cell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* CTA below the table */}
        <BlurFade delay={0.18}>
          <div className="mt-10 rounded-3xl border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.06),transparent)] px-6 py-10 text-center sm:px-10">
            <h3 className="text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-3xl">
              Ready to start accepting payments faster?
            </h3>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openCalendly("pricing_start_free")}
                data-testid="pricing-primary-cta"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_22px_46px_rgba(25,107,245,0.36)] active:translate-y-0 sm:w-auto"
              >
                Start Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#demo-section"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToDemo();
                }}
                data-testid="pricing-enterprise-cta"
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white sm:w-auto"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-brand text-brand" /> Rated 4.9/5 by 100+ merchants
            </span>
            <span>PCI-DSS Level 1</span>
            <span>SOC 2 - In progress</span>
            <span>Made in India</span>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
