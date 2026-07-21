"use client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WarpBackground } from "@/components/magic-ui/warp-background";
import { Particles } from "@/components/magic-ui/particles";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { openCalendly, trackEvent } from "@/lib/analytics";

/**
 * FINAL CTA
 */
export function FinalCTA() {
  return (
    <section
      id="support"
      data-testid="final-cta"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <WarpBackground className="px-6 py-14 sm:px-12 sm:py-20">
          <Particles quantity={70} color="#8BB8FF" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <BlurFade>
              <h2 className="text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-5xl md:text-6xl">
                Ship a checkout your <br className="hidden sm:block" /> shoppers actually finish.
              </h2>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
                Zero setup fee. No hidden charges. 1:1 support from a team that has shipped checkouts
                for hundreds of Indian D2C brands.
              </p>
            </BlurFade>

            <BlurFade delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ShimmerButton
                  as="button"
                  type="button"
                  onClick={() => {
                    trackEvent("cta_click", { location: "final_cta", label: "Get started free" });
                    openCalendly("final_cta");
                  }}
                  background="#196BF5"
                  data-testid="final-cta-primary"
                >
                  Get started free
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </ShimmerButton>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("cta_click", { location: "final_cta_secondary", label: "Talk to us" });
                    openCalendly("final_cta_secondary");
                  }}
                  data-testid="final-cta-secondary"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </BlurFade>

            <BlurFade delay={0.35}>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> Zero setup fee
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> No hidden charges
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-accent" /> 1:1 support
                </li>
              </ul>
            </BlurFade>
          </div>
        </WarpBackground>
      </div>
    </section>
  );
}
