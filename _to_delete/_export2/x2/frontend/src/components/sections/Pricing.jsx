"use client";
import { Check, Sparkles, Star } from "lucide-react";
import { NeonGradientCard } from "@/components/magic-ui/neon-gradient-card";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { trackEvent } from "@/lib/analytics";
import { useLeadForm } from "@/context/LeadFormContext";
import { cn } from "@/lib/utils";

/**
 * PRICING
 * Keeps the same structure, but remaps every accent to the RabbitPay blue palette.
 */
export function Pricing() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="pricing"
      data-testid="pricing"
      className="relative border-t border-border py-20 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(25,107,245,0.20),transparent_60%)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            The best pricing in India
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Pay for what works.
            <br className="hidden sm:block" /> Nothing else.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            One transparent plan. No setup fees, no lock-in, no minimums. Only pay a
            small fee on successful prepaid orders.
          </p>
        </BlurFade>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="relative lg:col-span-2">
            <p className="absolute -top-4 left-6 z-10 text-[11px] font-bold uppercase tracking-[0.28em] text-brand">
              <span className="mr-1.5">★</span> Best value for D2C
            </p>
            <NeonGradientCard borderSize={2} borderRadius={22}>
              <div className="p-6 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
                      RabbitPay Growth
                    </h3>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      Everything a modern D2C brand needs to ship a world-class checkout in India.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-semibold tracking-tighter text-brand sm:text-6xl">
                      <NumberTicker value={0.5} decimalPlaces={1} suffix="%" />
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      on successful prepaid
                    </div>
                  </div>
                </div>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  <PriceLine>
                    Transaction Fee:{" "}
                    <span className="font-semibold text-ink dark:text-white">Just 0.5%</span>{" "}
                    on successful prepaid orders only
                  </PriceLine>
                  <PriceLine>
                    COD Verification:{" "}
                    <span className="rounded-md bg-brand/10 px-1.5 py-0.5 font-bold text-brand">
                      FREE
                    </span>{" "}
                    <span className="font-semibold text-ink dark:text-white">Forever</span>
                  </PriceLine>
                  <PriceLine>
                    SMS OTP:{" "}
                    <span className="font-semibold text-ink dark:text-white">₹0.30</span> / message
                  </PriceLine>
                  <PriceLine>
                    WhatsApp Utility:{" "}
                    <span className="font-semibold text-ink dark:text-white">Starting at ₹0.40</span>{" "}
                    / message
                  </PriceLine>
                  <PriceLine>
                    <span className="font-semibold text-ink dark:text-white">Zero Setup Fee</span> - No hidden charges
                  </PriceLine>
                  <PriceLine>
                    <span className="font-semibold text-ink dark:text-white">Dedicated 1:1</span>{" "}
                    Customer Support
                  </PriceLine>
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                  <p className="text-base font-medium text-ink dark:text-white">
                    Faster Checkout <span className="text-muted-foreground">→</span> Lower RTO{" "}
                    <span className="text-muted-foreground">→</span> Higher Conversions.
                  </p>
                  <RainbowButton
                    as="button"
                    type="button"
                    onClick={() => {
                      trackEvent("cta_click", { location: "pricing_growth", label: "Start now" });
                      openLeadForm({ source: "pricing_growth" });
                    }}
                    data-testid="pricing-primary-cta"
                  >
                    <Sparkles className="mr-2 inline h-4 w-4" />
                    Start now - zero setup
                  </RainbowButton>
                </div>
              </div>
            </NeonGradientCard>
          </div>

          <BlurFade delay={0.15}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-7">
              <BorderBeam size={180} duration={14} colorFrom="#196BF5" colorTo="#4A8CFA" />
              <h3 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
                Enterprise
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For brands doing 50k+ monthly orders across multiple stores.
              </p>
              <div className="mt-5">
                <div className="text-4xl font-semibold tracking-tighter text-ink dark:text-white">
                  Custom
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  volume-based pricing
                </div>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Discounted MDR & COD verification",
                  "Priority ops & incident response",
                  "Dedicated CSM & tech partner",
                  "Custom SLAs and rollout support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink/80 dark:text-white/80">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("cta_click", { location: "pricing_enterprise", label: "Talk to sales" });
                  openLeadForm({ source: "pricing_enterprise" });
                }}
                data-testid="pricing-enterprise-cta"
                className="mt-auto inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand dark:text-white"
              >
                Talk to sales
              </a>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.2}>
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

function PriceLine({ children }) {
  return (
    <li className={cn("flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80")}>
      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
      <span>{children}</span>
    </li>
  );
}
