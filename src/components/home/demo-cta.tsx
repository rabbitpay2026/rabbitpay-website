import { ArrowUpRight, MessageSquareText } from "lucide-react";
import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { DEMO_SECTION_ID } from "@/data/anchors";
import { DEMO_STORE_URL, SUPPORT_WHATSAPP_HREF } from "@/data/site";

/**
 * Closing conversion block. Ported from the React `sections/DemoCTA.jsx`.
 * `id="demo-section"` is the scroll target for the "Request a Demo", "Start
 * Free" and "Talk to Sales" CTAs.
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
                Ready to improve your checkout
              </h2>
            </BlurFade>
            <BlurFade delay={0.12}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Leave your details and the team will walk you through the checkout on your own
                store — address autofill, the UPI-first payment step, and what setup involves.
              </p>
              <p
                data-testid="demo-cta-response-time"
                className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-white sm:text-base"
              >
                Apply now and our team will contact you within 12–24 hours.
              </p>
            </BlurFade>

            <BlurFade delay={0.22}>
              <div className="mt-8 flex justify-center">
                {/* The same form, endpoint, validation and states as before —
                    only the button says what it does: the team follows up. */}
                <LeadCaptureCard
                  source="demo_cta"
                  testPrefix="demo-lead"
                  showHeading={false}
                  submitLabel="Book a Demo"
                />
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={DEMO_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="demo-cta-demo-store"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 sm:w-auto"
                >
                  View Demo Store
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={SUPPORT_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="demo-cta-whatsapp"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 sm:w-auto"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              </div>
            </BlurFade>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}
