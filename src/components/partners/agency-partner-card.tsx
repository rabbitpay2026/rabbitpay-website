import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { AgencyPartner } from "@/data/agency-partners";

export function AgencyPartnerCard({ partner }: { partner: AgencyPartner }) {
  const slug = partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      data-testid={`agency-partner-${slug}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
    >
      <div className="relative h-28 flex-shrink-0 bg-[#090A0C] sm:h-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo}
          alt={partner.name}
          width={1600}
          height={1200}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-3"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tighter text-ink dark:text-white">
          {partner.name}
        </h3>

        <address className="mt-2.5 flex items-start gap-2.5 text-sm not-italic leading-snug text-muted-foreground">
          <MapPin
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
            aria-hidden="true"
          />
          <span>{partner.addressLines.join(" ")}</span>
        </address>

        {partner.email ? (
          <a
            href={`mailto:${partner.email}`}
            data-testid={`agency-partner-${slug}-email`}
            className="mt-2 inline-flex min-w-0 items-center gap-2.5 self-start text-sm font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white"
          >
            <Mail
              className="h-4 w-4 flex-shrink-0 text-brand"
              aria-hidden="true"
            />
            <span className="break-all">{partner.email}</span>
          </a>
        ) : null}

        <div className="mt-auto pt-4">
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${partner.name} website (opens in a new tab)`}
            data-testid={`agency-partner-${slug}-website`}
            className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white"
          >
            Visit Website
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
