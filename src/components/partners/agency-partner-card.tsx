import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { AgencyPartner } from "@/data/agency-partners";

export function AgencyPartnerCard({ partner }: { partner: AgencyPartner }) {
  const slug = partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      data-testid={`agency-partner-${slug}`}
      className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
    >
      <div className="grid aspect-video place-items-center bg-[#090A0C] md:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo}
          alt={partner.name}
          width={1600}
          height={1200}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <h3 className="text-2xl font-semibold tracking-tighter text-ink dark:text-white">
          {partner.name}
        </h3>

        <address className="mt-5 flex items-start gap-3 text-sm not-italic leading-relaxed text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
          <span>{partner.addressLines.join(" ")}</span>
        </address>

        <a
          href={`mailto:${partner.email}`}
          data-testid={`agency-partner-${slug}-email`}
          className="mt-3 inline-flex min-w-0 items-center gap-3 self-start text-sm font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white"
        >
          <Mail className="h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
          <span className="break-all">{partner.email}</span>
        </a>

        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${partner.name} website (opens in a new tab)`}
          data-testid={`agency-partner-${slug}-website`}
          className="group mt-7 inline-flex w-full items-center justify-center gap-2 self-start rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-white sm:w-auto"
        >
          Visit Website
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}
