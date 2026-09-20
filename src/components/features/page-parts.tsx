import { ArrowRight, ArrowUpRight, ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { MagicCard } from "@/components/magic-ui/magic-card";
import type { PublicRoute } from "@/data/pages";
import {
  ALL_FEATURES_LINK,
  FEATURE_DESTINATIONS,
  type FeatureDestination,
} from "@/data/feature-pages";
import { DEMO_STORE_URL } from "@/data/site";
import { breadcrumbTrail } from "@/lib/json-ld";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

/**
 * The building blocks every page in the Features section is assembled from:
 * `/features`, the three feature pages, the checkout-conversion guide and
 * `/integrations`.
 *
 * All Server Components. The only client code a page pulls in is what already
 * existed — `BlurFade` for the scroll reveal, the FAQ accordion, the Book a Demo
 * button, and (on one page) the checkout simulation.
 *
 * Styling is lifted from the homepage sections these pages sit beside — the
 * eyebrow / heading scale, the bordered cards, the brand CTA band — so nothing
 * here introduces a new visual language. Pages vary in what they put beside
 * the header and which blocks they use, so they read as a set without being
 * one template with the words swapped.
 */

/* ---------------------------------- header --------------------------------- */

/**
 * Breadcrumb, eyebrow, H1, introduction and actions — with an optional visual
 * beside them from `lg` up.
 *
 * No `BlurFade` here, deliberately, for the reason the homepage hero gives: it
 * renders its children at zero opacity until hydration, which at the top of a
 * page reads as a washed-out headline.
 */
export function PageHeader({
  path,
  eyebrow,
  title,
  intro,
  actions,
  aside,
}: {
  path: PublicRoute;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-28 md:pb-16 md:pt-32">
      <DotPattern className="opacity-60 [mask-image:radial-gradient(560px_circle_at_top,white,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(25,107,245,0.16),transparent_68%)] blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs path={path} />
        <div
          className={cn(
            "mt-6",
            aside && "grid items-center gap-10 lg:grid-cols-12 lg:gap-12",
          )}
        >
          <div className={cn(aside && "lg:col-span-7")}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-5xl">
              {title}
            </h1>
            <div className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {intro}
            </div>
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
            ) : null}
          </div>
          {aside ? <div className="min-w-0 lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * The visible breadcrumb. Rendered from `breadcrumbTrail` — the same function
 * the BreadcrumbList JSON-LD uses — so the two always name the same pages.
 */
export function Breadcrumbs({ path }: { path: PublicRoute }) {
  const trail = breadcrumbTrail(path);
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {trail.map((step, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={step.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-ink dark:text-white">
                  {step.name}
                </span>
              ) : (
                <>
                  <Link
                    href={step.path}
                    className="rounded transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    {step.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* --------------------------------- buttons --------------------------------- */

const PRIMARY_BUTTON =
  "group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_22px_46px_rgba(25,107,245,0.36)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 sm:w-auto";

const SECONDARY_BUTTON =
  "inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:text-white sm:w-auto";

/** The page's primary action: the same lead-form CTA every page on the site uses. */
export function BookDemoAction({ location }: { location: string }) {
  return (
    <BookDemoButton location={location} intent="demo" testId={`${location}-hero`} className={PRIMARY_BUTTON}>
      Book a Demo
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </BookDemoButton>
  );
}

/** The live demo storefront, in a new tab — the same destination as the header's button. */
export function DemoStoreAction({ label = "Try the Checkout" }: { label?: string }) {
  return (
    <a href={DEMO_STORE_URL} target="_blank" rel="noopener noreferrer" className={SECONDARY_BUTTON}>
      {label}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

/** An internal secondary action, e.g. "See all features". */
export function SecondaryLink({
  href,
  children,
  proxied,
}: {
  href: string;
  children: ReactNode;
  /** The documentation is served by another app — see `NavLink.proxied`. */
  proxied?: boolean;
}) {
  return proxied ? (
    <a href={href} className={SECONDARY_BUTTON}>
      {children}
    </a>
  ) : (
    <Link href={href} className={SECONDARY_BUTTON}>
      {children}
    </Link>
  );
}

/** A link inside running copy. */
export function TextLink({
  href,
  children,
  proxied,
}: {
  href: string;
  children: ReactNode;
  /** The documentation is served by another app — see `NavLink.proxied`. */
  proxied?: boolean;
}) {
  const className =
    "font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded";
  return proxied ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* --------------------------------- sections -------------------------------- */

/**
 * One content section with an H2. `tone="band"` gives it the tinted band the
 * homepage walkthrough uses, to break up long pages.
 */
export function PageSection({
  id,
  eyebrow,
  title,
  intro,
  tone = "plain",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tone?: "plain" | "band";
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative scroll-mt-24 py-14 md:py-16",
        tone === "band" &&
          "border-y border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.65),rgba(255,255,255,0.9))] dark:bg-neutral-950/60",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="mt-3 max-w-3xl text-2xl font-semibold leading-[1.1] tracking-tighter text-ink dark:text-white sm:text-3xl"
          >
            {title}
          </h2>
          {intro ? (
            <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground">
              {intro}
            </div>
          ) : null}
        </BlurFade>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

/** Numbered steps, as cards — the homepage walkthrough's pattern. */
export function StepList({
  steps,
  columns = 5,
  label,
}: {
  steps: readonly { title: string; body: ReactNode }[];
  columns?: 3 | 4 | 5;
  /** Accessible name for the list when a page has more than one. */
  label?: string;
}) {
  return (
    <ol
      aria-label={label}
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        columns === 5 && "lg:grid-cols-5",
        columns === 4 && "lg:grid-cols-4",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-brand"
          >
            {index + 1}
          </span>
          <h3 className="mt-3 text-sm font-semibold text-ink dark:text-white">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export type Fact = {
  title: string;
  body: ReactNode;
  Icon?: LucideIcon;
};

/** Icon-and-text cards — the homepage "Built for your Shopify store" pattern. */
export function FactGrid({ facts, columns = 3 }: { facts: Fact[]; columns?: 2 | 3 }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {facts.map((fact) => (
        <div key={fact.title} className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
          {fact.Icon ? (
            <span className="mb-3.5 inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand">
              <fact.Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
          <h3 className="text-sm font-semibold text-ink dark:text-white">{fact.title}</h3>
          <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{fact.body}</div>
        </div>
      ))}
    </div>
  );
}

/** A bulleted list with the brand dot the feature rows use. */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/80 dark:text-white/80">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** A framed visual with a caption saying exactly what it is. */
export function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure>
      <MagicCard className="rounded-[28px] border-border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:bg-white/5 sm:p-8">
        {children}
      </MagicCard>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/* ----------------------------------- faq ----------------------------------- */

/**
 * The page's questions, in the site's FAQ accordion.
 *
 * Not marked up as FAQPage: the site keeps FAQPage schema on `/faq` alone, and
 * several of these questions are shared with it — emitting them again here
 * would describe the same Q&A as belonging to two pages.
 */
export function FeatureFaq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <PageSection
      id="faq"
      eyebrow="FAQ"
      title={title}
      intro={
        <p>
          More answers on setup, pricing and payments are on the{" "}
          <TextLink href="/faq">full FAQ</TextLink>.
        </p>
      }
    >
      <div className="max-w-[900px]">
        <FaqAccordion items={items} />
      </div>
    </PageSection>
  );
}

/* --------------------------------- related --------------------------------- */

/**
 * The other pages in the section, plus the way back to All Features. The
 * current page is left out rather than shown disabled.
 */
export function RelatedFeatures({ current }: { current?: FeatureDestination["href"] }) {
  const related = FEATURE_DESTINATIONS.filter((page) => page.href !== current);
  return (
    <PageSection id="related" eyebrow="Keep exploring" title="Related features">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
              <page.Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-3.5 text-sm font-semibold text-ink dark:text-white">{page.label}</span>
            <span className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
              {page.description}
            </span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Learn more
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href={ALL_FEATURES_LINK.href}
          data-testid="back-to-all-features"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          <ALL_FEATURES_LINK.Icon className="h-4 w-4" aria-hidden="true" />
          Back to All Features
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </PageSection>
  );
}

/* ----------------------------------- cta ----------------------------------- */

/**
 * The closing Book a Demo band, in the FAQ page's CTA treatment.
 *
 * "Book a Demo" is the site's existing `BookDemoButton`: it opens the lead form
 * on the homepage, which posts to the unchanged lead endpoint. `location` is
 * the only analytics value it sends — the page it was clicked on, never
 * anything the visitor typed.
 */
export function FeatureCTA({
  location,
  title = "See RabbitPay on your own store",
  body = "Book a demo and the team will walk you through the checkout on your store — address autofill, the UPI-first payment step, and what setup involves.",
}: {
  location: string;
  title?: string;
  body?: string;
}) {
  return (
    <section data-testid="feature-cta" className="relative pb-20 pt-6 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MagicCard className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.95),rgba(13,76,179,0.96))] px-6 py-12 shadow-[0_24px_80px_rgba(25,107,245,0.26)] sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_42%)]"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <h2 className="text-2xl font-semibold leading-[1.05] tracking-tighter sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">{body}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookDemoButton
                location={location}
                intent="demo"
                testId={`${location}-cta`}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto"
              >
                Book a Demo
              </BookDemoButton>
              <a
                href={DEMO_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto"
              >
                View Demo Store
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-sm text-white/85">Our team will contact you within 12–24 hours.</p>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}
