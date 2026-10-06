import { PrivacyPolicy } from "@/components/legal/privacy-policy";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/privacy")} />
      <PrivacyPolicy />
    </>
  );
}
