"use client";
import { Check } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { COD_KING_LOGO, COD_KING_ICON } from "@/context/LeadFormContext";

const TRUST_POINTS = [
  "Trusted by Indian Shopify Merchants",
  "Built for High-COD Businesses",
  "Lower Return-to-Origin Rates",
  "Proven Checkout Infrastructure",
];

/** Qualitative only — no invented figures. */
const TRUST_METRICS = [
  "Thousands of Orders Processed",
  "Reduced RTO Rates",
  "Shopify Ecosystem Expertise",
  "Built in India",
];

/**
 * "Powered by COD King" trust badge — the RabbitPay message stays dominant;
 * COD King appears as the supporting infrastructure, not a competing product.
 */
export function PoweredBy() {
  return (
    <section id="powered-by" data-testid="powered-by" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
        <BlurFade>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Powered by
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#111827] sm:text-4xl">
              Built on the infrastructure trusted by thousands of Indian merchants.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6B7280]">
              RabbitPay leverages the technology and operational expertise of COD King to deliver
              faster checkouts, lower RTO, and higher conversion rates for modern D2C brands.
            </p>
          </div>
        </BlurFade>

        {/* COD King logo */}
        <BlurFade delay={0.12}>
          <div className="mt-10 flex justify-center">
            <div className="group inline-flex items-center justify-center rounded-3xl border border-[#E5E7EB] bg-white px-10 py-7 shadow-[0_10px_30px_rgba(17,24,39,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(25,107,245,0.14)] sm:px-14 sm:py-8">
              <img
                src={COD_KING_ICON}
                alt="COD King"
                loading="lazy"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:hidden"
              />
              <img
                src={COD_KING_LOGO}
                alt="COD King"
                loading="lazy"
                className="hidden h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:block"
              />
            </div>
          </div>
        </BlurFade>

        {/* Trust indicators */}
        <BlurFade delay={0.2}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_10px_28px_rgba(17,24,39,0.07)]"
              >
                <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-snug text-[#111827]">{point}</span>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* Qualitative metrics */}
        <BlurFade delay={0.28}>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#E5E7EB] pt-8 lg:grid-cols-4">
            {TRUST_METRICS.map((metric) => (
              <p
                key={metric}
                className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] transition-colors duration-300 hover:text-brand"
              >
                {metric}
              </p>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
