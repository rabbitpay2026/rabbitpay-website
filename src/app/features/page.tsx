import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  BookDemoAction,
  FeatureCTA,
  PageHeader,
  SecondaryLink,
  TextLink,
} from "@/components/features/page-parts";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CHECKOUT_CONVERSION,
  FEATURE_GROUPS,
  INTEGRATIONS,
  type FeatureCard,
} from "@/data/feature-pages";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/features");

/**
 * `/features` — every RabbitPay capability, grouped, each card linking onward.
 *
 * Replaces `/product`. What `/product` carried is all still reachable from
 * here: the three product pillars (prefilled checkout, verified COD, UPI-first)
 * are cards in the groups below, their illustrations now sit on the feature
 * pages they belong to, and the partner logo strip moved to `/integrations`.
 *
 * The cards are read from `data/feature-pages.ts`, which the header menu, the
 * footer and the related-feature links read too.
 */
export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/features")} />

      <PageHeader
        path="/features"
        eyebrow="Features"
        title="Everything the RabbitPay checkout does"
        intro={
          <p>
            RabbitPay replaces the checkout step on a Shopify store with a shorter one, built for
            how Indian shoppers buy: a mobile number instead of a long form, saved details that come
            back prefilled, UPI first in the payment step, and cash on delivery with checks around
            it. <TextLink href="/what-is-rabbitpay">What is RabbitPay?</TextLink>
          </p>
        }
        actions={
          <>
            <BookDemoAction location="features_book_demo" />
            <SecondaryLink href={CHECKOUT_CONVERSION.href}>Improve checkout conversion</SecondaryLink>
          </>
        }
      />

      {/* Jump links to each group — useful on a phone, where the page is long. */}
      <nav aria-label="Feature groups" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap gap-2">
          {FEATURE_GROUPS.map((group) => (
            <li key={group.id}>
              <a
                href={`#${group.id}`}
                className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:text-white/80"
              >
                {group.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#solutions"
              className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:text-white/80"
            >
              Solutions &amp; setup
            </a>
          </li>
        </ul>
      </nav>

      {FEATURE_GROUPS.map((group) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-24 py-12 md:py-14"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <BlurFade>
              <h2
                id={`${group.id}-heading`}
                className="text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-3xl"
              >
                {group.title}
              </h2>
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">{group.intro}</p>
            </BlurFade>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.cards.map((card) => (
                <li key={card.name}>
                  <FeatureCardView card={card} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* The solution guide and the integrations page: not features in
          themselves, so they sit apart from the cards above. */}
      <section
        id="solutions"
        aria-labelledby="solutions-heading"
        className="scroll-mt-24 border-y border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.65),rgba(255,255,255,0.9))] py-14 dark:bg-neutral-950/60 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlurFade>
            <h2
              id="solutions-heading"
              className="text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-3xl"
            >
              Solutions &amp; setup
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              How the features work together, and what RabbitPay connects to.
            </p>
          </BlurFade>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                page: CHECKOUT_CONVERSION,
                body: "Where shoppers drop out of a checkout, which RabbitPay feature addresses each point, and how to measure completed checkouts with your own data.",
                cta: "Read the guide",
              },
              {
                page: INTEGRATIONS,
                body: "Shopify, the payment partners RabbitPay works with, and the Meta and Google marketing and analytics platforms — with setup requirements where they are documented.",
                cta: "See integrations",
              },
            ].map(({ page, body, cta }) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:p-7"
              >
                <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-brand/15 bg-brand/10 text-brand">
                  <page.Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 text-lg font-semibold tracking-tight text-ink dark:text-white">
                  {page.label}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{body}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-14 md:h-16" aria-hidden="true" />
      <FeatureCTA location="features_book_demo" />
    </>
  );
}

/**
 * One capability. Fixed anatomy — icon, name, description, benefit, link — and
 * `h-full` so every card in a row is the same height whatever its copy length.
 * The whole card is the link target; the visible link text says where it goes.
 */
function FeatureCardView({ card }: { card: FeatureCard }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:p-6"
    >
      <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
        <card.Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-ink dark:text-white">
        {card.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
      <p className="mt-3 flex-1 border-t border-border pt-3 text-sm font-medium leading-relaxed text-ink/80 dark:text-white/80">
        {card.benefit}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        {card.linkLabel}
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
