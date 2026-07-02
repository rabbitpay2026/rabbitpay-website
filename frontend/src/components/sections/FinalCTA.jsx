"use client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WarpBackground } from "@/components/magic-ui/warp-background";
import { Particles } from "@/components/magic-ui/particles";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * FINAL CTA
 * Uses: Warp Background + Particles + Shimmer Button.
 */
export function FinalCTA() {
  return (
    <section
      id="support"
      data-testid="final-cta"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <WarpBackground className="px-8 py-16 sm:px-12 sm:py-24">
          <Particles quantity={70} color="#EDE9FE" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <BlurFade>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter leading-[1.02]">
                Ship a checkout your <br className="hidden sm:block" /> shoppers actually finish.
              </h2>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">
                Zero setup fee. No hidden charges. 1:1 support from a team that has shipped
                checkouts for hundreds of Indian D2C brands.
              </p>
            </BlurFade>

            <BlurFade delay={0.25}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ShimmerButton
                  as="a"
                  href="mailto:hello@rabbitpay.in?subject=Get%20Started"
                  background="#7C3AED"
                  data-testid="final-cta-primary"
                >
                  Get started free
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </ShimmerButton>
                <a
                  href="mailto:hello@rabbitpay.in?subject=Talk%20to%20RabbitPay"
                  data-testid="final-cta-secondary"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </BlurFade>

            <BlurFade delay={0.35}>
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Zero setup fee
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> No hidden charges
                </li>
                <li className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> 1:1 support
                </li>
              </ul>
            </BlurFade>
          </div>
        </WarpBackground>
      </div>
    </section>
  );
}
