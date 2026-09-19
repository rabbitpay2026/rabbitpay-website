import { Check } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { PartnerForm } from "@/components/partners/partner-form";
import { sectionPadding } from "@/components/layout/section-shell";
import {
  PARTNER_AUDIENCES,
  PARTNER_BENEFITS,
  PARTNER_REQUIREMENTS,
  PARTNER_STEPS,
} from "@/data/partners";
import { cn } from "@/lib/utils";

/** Anchor on the form, so `/partners#apply` lands on it. */
export const PARTNER_FORM_ID = "apply";

/**
 * `/partners` — the partner program page. The application form sits in the
 * hero beside the introduction so it is visible on landing; the program
 * details (benefits, who it is for, what the team looks for, how it works)
 * follow below.
 *
 * A Server Component; only the form itself is interactive.
 */
export function PartnerProgram() {
  return (
    <section
      data-testid="partner-program"
      className={cn("relative", sectionPadding(true, "py-20 md:py-24"))}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero: introduction + application form */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <BlurFade className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Partner program
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              Partner with RabbitPay
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              RabbitPay is a 1-click checkout for Indian D2C brands on Shopify — prefilled
              addresses, UPI-first payments and verified COD. If you build, advise or sell to those
              merchants, the partner program is how we work together: you bring the relationship,
              we bring the checkout and stay on the call through every launch.
            </p>
            <ul className="mt-6 space-y-2.5">
              {[
                "For agencies, technology partners and affiliates",
                "No minimum merchant count and no fee to join",
                "The team responds within 12-24 hours",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </BlurFade>

          <BlurFade delay={0.08} className="lg:col-span-7">
            <div id={PARTNER_FORM_ID} className="scroll-mt-24">
              <h2 className="sr-only">Apply to partner</h2>
              <PartnerForm />
            </div>
          </BlurFade>
        </div>

        {/* What partners get */}
        <BlurFade delay={0.08}>
          <div className="mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
              What partners get
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNER_BENEFITS.map(({ title, body, Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Who it is for, and what the team looks for */}
        <BlurFade delay={0.12}>
          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
                Who we partner with
              </h2>
              <dl className="mt-6 space-y-4">
                {PARTNER_AUDIENCES.map(({ type, label, body }) => (
                  <div key={type} className="border-l-2 border-border pl-4">
                    <dt className="text-sm font-semibold text-ink dark:text-white">{label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
                What we look for
              </h2>
              <ul className="mt-6 space-y-3">
                {PARTNER_REQUIREMENTS.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                If you are unsure whether you fit, apply anyway and say so in the message — the
                team would rather read it than guess.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* How it works */}
        <BlurFade delay={0.16}>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
              How it works
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-3">
              {PARTNER_STEPS.map(({ title, body }, index) => (
                <li key={title} className="rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-ink dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
            <a
              href={`#${PARTNER_FORM_ID}`}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
            >
              Apply to partner
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
