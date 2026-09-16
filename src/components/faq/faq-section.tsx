import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { FAQ_ID } from "@/data/anchors";
import type { FaqItem } from "@/types";

/**
 * The homepage FAQ preview — a Server Component.
 *
 * Renders a subset of the questions (`HOMEPAGE_FAQS`) and links through to
 * `/faq`, which owns the full documentation-style page. Both read the same
 * `data/faq.ts`, so a question is never written down twice.
 */
export function FaqSection({
  items,
  showAllLink = false,
}: {
  items: FaqItem[];
  showAllLink?: boolean;
}) {
  return (
    <section id={FAQ_ID} data-testid="faq" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[900px] px-6 sm:px-8">
        <BlurFade>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Frequently asked questions
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#111827] sm:text-4xl">
              Everything merchants ask before switching to RabbitPay.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B7280]">
              Find answers about setup, pricing, integrations, payments, and support.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.12}>
          <div className="mt-12">
            <FaqAccordion items={items} />
          </div>

          {showAllLink ? (
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                data-testid="faq-see-all"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white"
              >
                See all questions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ) : null}
        </BlurFade>
      </div>
    </section>
  );
}
