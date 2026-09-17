import { Fragment } from "react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { FeatureVisual } from "@/components/product/feature-visuals";
import { Integrations } from "@/components/product/integrations";
import { PRODUCT_ID } from "@/data/anchors";
import { FEATURES } from "@/data/features";
import { sectionPadding, type SectionShellProps } from "@/components/layout/section-shell";
import { cn } from "@/lib/utils";
import type { FeatureItem } from "@/types";

/**
 * Product highlights. Ported from the React `sections/Features.jsx`, including
 * the Integrations strip that renders immediately above the UPI-first row.
 *
 * Rendered on both `/` and `/product` from this one component, so the content
 * exists in exactly one place.
 */
export function Features({ asPage, headingLevel = "h2" }: SectionShellProps = {}) {
  const Heading = headingLevel;
  return (
    <section
      id={PRODUCT_ID}
      data-testid="features"
      className={cn("relative", sectionPadding(asPage, "py-20 md:py-24"))}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Product highlights
          </p>
          <Heading className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
            Everything needed to make the checkout feel premium, fast, and trustworthy.
          </Heading>
        </BlurFade>

        <div className="mt-12 space-y-6">
          {FEATURES.map((feature, index) => (
            <Fragment key={feature.eyebrow}>
              {/* Integrations strip sits immediately above the UPI-first feature. */}
              {feature.eyebrow === "UPI-first" ? <Integrations /> : null}
              <FeatureRow
                feature={feature}
                reverse={index % 2 === 1}
                /* One level below the section heading: h2 under the <h1> on
                   /product, h3 under the <h2> on the homepage. Without this
                   /product jumped straight from h1 to h3. */
                headingLevel={headingLevel === "h1" ? "h2" : "h3"}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  reverse,
  headingLevel,
}: {
  feature: FeatureItem;
  reverse: boolean;
  headingLevel: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <div className="grid items-center gap-6 lg:grid-cols-12">
      <BlurFade className={reverse ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
        <span className="inline-grid h-11 w-11 place-items-center rounded-2xl border border-border bg-background text-brand shadow-sm">
          <feature.Icon className="h-5 w-5" />
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
          {feature.eyebrow}
        </p>
        <Heading className="mt-3 text-2xl font-semibold leading-[1.08] tracking-tight text-ink dark:text-white sm:text-3xl">
          {feature.title}
        </Heading>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {feature.body}
        </p>
        <ul className="mt-6 space-y-3">
          {feature.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              {bullet}
            </li>
          ))}
        </ul>
      </BlurFade>
      <BlurFade delay={0.12} className={reverse ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"}>
        <MagicCard className="rounded-[28px] border-border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:bg-white/5 sm:p-8">
          <FeatureVisual visual={feature.visual} />
        </MagicCard>
      </BlurFade>
    </div>
  );
}
