import { Features } from "@/components/product/features";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/product");

/**
 * `/product` — the complete Features section, which renders the Integrations
 * strip inline exactly as it does on the homepage. Same component, same content,
 * one source; only the heading level and top clearance differ.
 */
export default function ProductPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/product")} />
      <Features asPage headingLevel="h1" />
    </>
  );
}
