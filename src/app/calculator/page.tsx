import { CalculatorCTA } from "@/components/calculator/calculator-cta";
import { CalculatorHero } from "@/components/calculator/calculator-hero";
import { CalculatorWorkspace } from "@/components/calculator/calculator-workspace";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/calculator");

/**
 * `/calculator` — the one route for all five calculators. Choosing a calculator
 * swaps the panel in place; there are no per-calculator routes.
 *
 * Every calculation runs in the browser. Nothing a merchant types is sent
 * anywhere, and analytics events carry only the calculator's id.
 */
export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/calculator")} />
      <CalculatorHero />
      <CalculatorWorkspace />
      <CalculatorCTA />
    </>
  );
}
