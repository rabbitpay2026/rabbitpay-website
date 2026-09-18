import { CalculatorCTA } from "@/components/calculator/calculator-cta";
import { CalculatorHero } from "@/components/calculator/calculator-hero";
import { CalculatorHub } from "@/components/calculator/calculator-hub";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/calculator");

/**
 * `/calculator` — the hub. Each calculator has its own page under this one and
 * is linked from here; no calculator form is rendered on this route.
 */
export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/calculator")} />
      <CalculatorHero />
      <CalculatorHub />
      <CalculatorCTA />
    </>
  );
}
