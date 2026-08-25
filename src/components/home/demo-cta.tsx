import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { DEMO_SECTION_ID } from "@/data/anchors";

/**
 * Closing conversion block. Ported from the React `sections/DemoCTA.jsx`.
 * `id="demo-section"` is the scroll target for the pricing "Talk to Sales" CTA.
 */
export function DemoCTA() {
  return (
    <section
      id={DEMO_SECTION_ID}
      data-testid="demo-cta"
      className="relative scroll-mt-24 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MagicCard className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.95),rgba(13,76,179,0.96))] px-6 py-14 shadow-[0_24px_80px_rgba(25,107,245,0.26)] sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_35%)]"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <BlurFade>
              <h2 className="text-3xl font-semibold leading-[1.02] tracking-tighter sm:text-4xl md:text-5xl">
                Want to see RabbitPay in action?
              </h2>
            </BlurFade>
            <BlurFade delay={0.12}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Get a personalized walkthrough of RabbitPay and discover how leading D2C brands
                increase conversions and reduce RTO.
              </p>
            </BlurFade>

            <BlurFade delay={0.22}>
              <div className="mt-8 flex justify-center">
                <LeadCaptureCard source="demo_cta" testPrefix="demo-lead" showHeading={false} />
              </div>
            </BlurFade>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}
