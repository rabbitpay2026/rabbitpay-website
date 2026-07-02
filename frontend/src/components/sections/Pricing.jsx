"use client";
import { Check, Sparkles } from "lucide-react";
import { NeonGradientCard } from "@/components/magic-ui/neon-gradient-card";
import { RainbowButton } from "@/components/magic-ui/rainbow-button";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { cn } from "@/lib/utils";

/**
 * PRICING
 * Uses: Neon Gradient Card (recommended plan), Rainbow Button, Number Ticker.
 * NOTE: No "Popular" badges — the recommended plan is marked with subtle border + Neon Gradient Card.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      data-testid="pricing"
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand">
            Simple, honest pricing
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-ink dark:text-white">
            Pay for what works.
            <br className="hidden sm:block" /> Nothing else.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            One transparent plan. No setup fees, no lock-in, no minimums. Only pay a
            small fee on successful prepaid orders.
          </p>
        </BlurFade>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Recommended plan — Neon Gradient */}
          <div className="lg:col-span-2">
            <NeonGradientCard>
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
                      RabbitPay Growth
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Everything a modern D2C brand needs to ship a world-class checkout in India.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl sm:text-6xl font-semibold tracking-tighter text-ink dark:text-white">
                      <NumberTicker value={0.5} decimalPlaces={1} suffix="%" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      on successful prepaid
                    </div>
                  </div>
                </div>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  <PriceLine>
                    Transaction Fee: <span className="font-semibold text-ink dark:text-white">Just 0.5%</span> on successful prepaid orders only
                  </PriceLine>
                  <PriceLine>
                    COD Verification:{" "}
                    <span className="rounded-md bg-success/10 px-1.5 py-0.5 font-bold text-success">FREE</span>{" "}
                    <span className="font-semibold text-ink dark:text-white">Forever</span>
                  </PriceLine>
                  <PriceLine>
                    SMS OTP: <span className="font-semibold text-ink dark:text-white">₹0.30</span> / message
                  </PriceLine>
                  <PriceLine>
                    WhatsApp Utility: <span className="font-semibold text-ink dark:text-white">Starting at ₹0.40</span> / message
                  </PriceLine>
                  <PriceLine>
                    <span className="font-semibold text-ink dark:text-white">Zero Setup Fee</span> — No hidden charges
                  </PriceLine>
                  <PriceLine>
                    <span className="font-semibold text-ink dark:text-white">Dedicated 1:1</span> Customer Support
                  </PriceLine>
                </ul>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                  <p className="text-base sm:text-lg font-medium text-ink dark:text-white">
                    Faster Checkout{" "}
                    <span className="text-muted-foreground">→</span> Lower RTO{" "}
                    <span className="text-muted-foreground">→</span> Higher Conversions.
                  </p>
                  <RainbowButton
                    as="a"
                    href="mailto:hello@rabbitpay.in?subject=Start%20RabbitPay"
                    data-testid="pricing-primary-cta"
                  >
                    <Sparkles className="mr-2 inline h-4 w-4" />
                    Start now — zero setup
                  </RainbowButton>
                </div>
              </div>
            </NeonGradientCard>
          </div>

          {/* Complementary card — Enterprise */}
          <BlurFade delay={0.15}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
                Enterprise
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For brands doing 50k+ monthly orders across multiple stores.
              </p>
              <div className="mt-6">
                <div className="text-4xl font-semibold tracking-tighter text-ink dark:text-white">
                  Custom
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  volume-based pricing
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Discounted MDR & COD verification",
                  "Priority ops & incident response",
                  "Dedicated CSM & tech partner",
                  "Custom SLAs and rollout support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:hello@rabbitpay.in?subject=Enterprise"
                data-testid="pricing-enterprise-cta"
                className="mt-auto inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-ink dark:text-white transition-colors hover:border-brand hover:text-brand"
              >
                Talk to sales
              </a>
            </div>
          </BlurFade>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prefer to see it live?{" "}
          <a
            href="mailto:hello@rabbitpay.in?subject=Book%20a%20Demo"
            className="font-semibold text-brand hover:underline"
          >
            Book a 20-minute demo
          </a>
          .
        </p>
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
