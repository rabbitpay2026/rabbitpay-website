import { CustomerSupport } from "@/components/support/customer-support";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/support");

/** `/support` — the complete support section, same component as the homepage. */
export default function SupportPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/support")} />
      <CustomerSupport asPage headingLevel="h1" />
    </>
  );
}
