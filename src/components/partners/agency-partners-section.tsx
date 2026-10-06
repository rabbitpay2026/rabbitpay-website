import { BlurFade } from "@/components/magic-ui/blur-fade";
import { AgencyPartnerCard } from "@/components/partners/agency-partner-card";
import { AGENCY_PARTNERS_ID } from "@/data/anchors";
import { AGENCY_PARTNERS } from "@/data/agency-partners";

export function AgencyPartnersSection() {
  if (AGENCY_PARTNERS.length === 0) return null;

  return (
    <section
      id={AGENCY_PARTNERS_ID}
      aria-labelledby="agency-partners-heading"
      data-testid="agency-partners"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Partners
            </p>
            <h2
              id="agency-partners-heading"
              className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-ink dark:text-white sm:text-4xl"
            >
              Agency Partners
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Working with Shopify-focused agencies to help merchants build
              better checkout experiences.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.12}>
          <div
            className={
              AGENCY_PARTNERS.length > 1
                ? "mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2"
                : "mx-auto mt-8 max-w-sm"
            }
          >
            {AGENCY_PARTNERS.map((partner) => (
              <AgencyPartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
