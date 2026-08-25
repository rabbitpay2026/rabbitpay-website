import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ContactChannels } from "@/components/support/contact-channels";
import { DEMO_SECTION_ID } from "@/data/anchors";
import { sectionPadding, type SectionShellProps } from "@/components/layout/section-shell";
import { cn } from "@/lib/utils";

/**
 * `/contact` — the React site had no distinct contact page (its "Contact" nav
 * link pointed at the support anchor), so this route is assembled entirely from
 * content that already exists: the four support channel cards and the same
 * lead-capture card the hero and demo CTA use.
 *
 * The only string written for this page is the `<h1>` — a route needs a heading,
 * and every existing headline belongs to another section. No marketing copy,
 * company details or contact information were invented.
 */
export function ContactSection({ asPage }: SectionShellProps = {}) {
  return (
    <section
      id={DEMO_SECTION_ID}
      data-testid="contact-section"
      className={cn("relative scroll-mt-24", sectionPadding(asPage, "py-20 md:py-24"))}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">Contact</p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              Contact RabbitPay
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every RabbitPay merchant gets direct access to the team. No ticket maze, no hold
              music, no hidden handoffs.
            </p>
          </div>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          <ContactChannels />
        </div>

        <BlurFade delay={0.2}>
          <div className="mt-12 flex justify-center">
            <LeadCaptureCard source="contact_page" testPrefix="contact-lead" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
