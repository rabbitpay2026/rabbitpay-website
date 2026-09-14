import { Pricing } from "@/components/pricing/pricing";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/pricing");

/**
 * `/pricing` — the complete pricing comparison table and CTAs, rendered from the
 * same component the homepage uses. "Talk to Sales" has no demo section on this
 * route, so it routes to the homepage one (see `cta/talk-to-sales-button.tsx`).
 */
export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/pricing")} />
      <Pricing asPage headingLevel="h1" />
    </>
  );
}
