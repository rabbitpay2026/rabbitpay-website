import { Mail, MessageSquareText, Phone } from "lucide-react";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_WHATSAPP_HREF,
} from "@/data/site";

/**
 * Closing CTA for the FAQ page.
 *
 * Reuses RabbitPay's existing CTA language: the heading is the demo section's
 * copy, the supporting line is the support section's, the channels are the ones
 * `data/site.ts` already holds, and "Book a Demo" is the same Calendly button
 * the header uses. Nothing new is claimed here.
 */
export function FaqCTA() {
  return (
    <section data-testid="faq-cta" className="relative pb-20 pt-4 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MagicCard className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.95),rgba(13,76,179,0.96))] px-6 py-12 shadow-[0_24px_80px_rgba(25,107,245,0.26)] sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_42%)]"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <BlurFade>
              <h2 className="text-2xl font-semibold leading-[1.05] tracking-tighter sm:text-3xl md:text-4xl">
                Want to see RabbitPay in action?
              </h2>
            </BlurFade>
            <BlurFade delay={0.12}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                Every RabbitPay merchant gets direct access to the team. No ticket maze, no hold
                music, no hidden handoffs.
              </p>
            </BlurFade>
            <BlurFade delay={0.2}>
              <div className="mt-8 flex justify-center">
                <BookDemoButton
                  location="faq_book_demo"
                  intent="demo"
                  testId="faq-cta-demo"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
                >
                  Book a Demo
                </BookDemoButton>
              </div>
            </BlurFade>
            <BlurFade delay={0.28}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-white/85">
                <a
                  href={SUPPORT_PHONE_HREF}
                  data-testid="faq-cta-phone"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SUPPORT_PHONE}
                </a>
                <a
                  href={SUPPORT_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="faq-cta-whatsapp"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  data-testid="faq-cta-email"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </BlurFade>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}
