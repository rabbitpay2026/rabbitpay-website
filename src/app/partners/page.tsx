import { PartnerProgram } from "@/components/partners/partner-program";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/partners");

/** `/partners` — the partner program and its application form. */
export default function PartnersPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/partners")} />
      <PartnerProgram />
    </>
  );
}
