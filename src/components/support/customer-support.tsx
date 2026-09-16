import { Headphones } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ContactChannels } from "@/components/support/contact-channels";
import { SUPPORT_ID } from "@/data/anchors";
import { SUPPORT_PROMISES } from "@/data/trust";
import { sectionPadding, type SectionShellProps } from "@/components/layout/section-shell";
import { cn } from "@/lib/utils";

/**
 * "Real humans. Ready to help." — ported from the React
 * `sections/CustomerSupport.jsx`. Rendered on both `/` and `/support`.
 */
export function CustomerSupport({ asPage, headingLevel = "h2" }: SectionShellProps = {}) {
  const Heading = headingLevel;
  return (
    <section
      id={SUPPORT_ID}
      data-testid="customer-support"
      className={cn("relative", sectionPadding(asPage, "py-20 md:py-24"))}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <BlurFade className="lg:col-span-5">
            <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-border bg-background text-brand">
              <Headphones className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Support
            </p>
            <Heading className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              Real humans.
              <br className="hidden sm:block" /> Ready to help.
            </Heading>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Every RabbitPay merchant gets direct access to the team. No ticket maze, no hold
              music, no hidden handoffs.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/80 dark:text-white/80">
              {SUPPORT_PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  {promise}
                </li>
              ))}
            </ul>
          </BlurFade>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <ContactChannels />
          </div>
        </div>
      </div>
    </section>
  );
}
