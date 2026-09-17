import { CalculatorCTA } from "@/components/calculator/calculator-cta";
import { CalculatorDetail } from "@/components/calculator/calculator-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { getCalculator } from "@/data/calculators";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/calculator/roi");

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/calculator/roi")} />
      <CalculatorDetail calculator={getCalculator("roi")} />
      <CalculatorCTA />
    </>
  );
}
