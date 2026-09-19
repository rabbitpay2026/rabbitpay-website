import { BlurFade } from "@/components/magic-ui/blur-fade";
import { INTEGRATIONS_ID } from "@/data/anchors";
import { MARKETING_PARTNERS, PAYMENT_PARTNERS } from "@/data/integrations";
import type { PartnerLogo } from "@/types";

/**
 * Minimal integrations strip: badge, one heading, one line of subtext, and a
 * clean logo grid. No cards, borders, shadows, or hover badges.
 *
 * Logos are self-hosted in `public/logos/` so there are no external requests.
 * Ported from the React `sections/Integrations.jsx`.
 */
export function Integrations({ headless }: { headless?: boolean } = {}) {
  return (
    <section id={INTEGRATIONS_ID} data-testid="integrations" className="relative py-14 md:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/*
          `headless` drops the badge, heading and subtext so the strip can sit
          under a heading that already introduces it — the homepage's "Built for
          your Shopify store". The logo rows are untouched. `/integrations`
          renders its own per-partner detail from the same `data/integrations.ts`.
        */}
        {headless ? null : (
          <BlurFade>
            <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
              Integrations
            </span>

            <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-semibold leading-[1.15] tracking-tighter text-ink dark:text-white sm:text-3xl">
              Seamlessly connect with India&apos;s leading payment and infrastructure partners.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              RabbitPay integrates with the platforms modern D2C brands already use, making
              onboarding and checkout operations effortless.
            </p>
          </BlurFade>
        )}

        <BlurFade delay={0.12}>
          <div className={headless ? "" : "mt-11"}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
              Payment partners
            </p>
            <div className="mt-6">
              <LogoRow partners={PAYMENT_PARTNERS} />
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
              Marketing &amp; analytics partners
            </p>
            <div className="mt-6">
              <LogoRow partners={MARKETING_PARTNERS} />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function LogoRow({ partners }: { partners: PartnerLogo[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
      {partners.map((partner) => (
        <span
          key={partner.name}
          className="flex h-8 items-center justify-center gap-2.5 rounded-xl px-3 py-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(17,24,39,0.10)] sm:h-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${partner.file}`}
            alt={`${partner.name} logo`}
            loading="lazy"
            className={
              partner.mark
                ? "h-12 w-auto object-contain sm:h-14"
                : partner.withText
                  ? "h-full w-auto object-contain"
                  : "h-full w-auto max-w-[170px] object-contain"
            }
          />
          {partner.withText ? (
            <span className="text-xl font-semibold tracking-tight text-[#111827] sm:text-2xl">
              {partner.name}
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
