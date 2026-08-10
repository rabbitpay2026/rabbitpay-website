"use client";
import { ArrowRight } from "lucide-react";
import { WarpBackground } from "@/components/magic-ui/warp-background";
import { Particles } from "@/components/magic-ui/particles";
import { ShimmerButton } from "@/components/magic-ui/shimmer-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { useLeadForm } from "@/context/LeadFormContext";
import { trackEvent } from "@/lib/analytics";

/**
 * DEMO CTA
 * Dedicated conversion section placed directly ABOVE the footer.
 * The "Give Me a Demo" button opens the global lead-capture modal —
 * no Calendly, no redirect, everything stays on this page.
 */
export function DemoCTA() {
  const { openLeadForm } = useLeadForm();

  return (
    <section
      id="support"
      data-testid="demo-cta"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <WarpBackground className="px-6 py-14 sm:px-12 sm:py-20">
          <Particles quantity={70} color="#8BB8FF" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <BlurFade>
              <h2 className="text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-5xl md:text-6xl text-white">
                Want to see RabbitPay in action?
              </h2>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                Get a personalized walkthrough of RabbitPay's 1-Click Checkout and
                discover how leading D2C brands increase conversions, reduce RTO, and
                improve checkout completion rates.
              </p>
            </BlurFade>

            <BlurFade delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center justify-center">
                <ShimmerButton
                  as="button"
                  type="button"
                  onClick={() => {
                    trackEvent("cta_click", { location: "demo_cta", label: "Give Me a Demo" });
                    openLeadForm({ source: "demo_cta" });
                  }}
                  background="#196BF5"
                  data-testid="demo-cta-primary"
                >
                  Give Me a Demo
                  <ArrowRight className="ml-2 inline h-4 w-4" />
                </ShimmerButton>
              </div>
            </BlurFade>
          </div>
        </WarpBackground>
      </div>
    </section>
  );
}
