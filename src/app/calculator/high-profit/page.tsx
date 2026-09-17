import { CalculatorCTA } from "@/components/calculator/calculator-cta";
import { CalculatorDetail } from "@/components/calculator/calculator-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getCalculator } from "@/data/calculators";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/calculator/high-profit");

export default function HighProfitCalculatorPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/calculator/high-profit")} />
      <CalculatorDetail calculator={getCalculator("high-profit")} />
      <CalculatorCTA />
    </>
  );
}
