import { ContactSection } from "@/components/contact/contact-section";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact");

/**
 * `/contact` — assembled from the existing support channel cards and the
 * existing lead-capture card. See `components/contact/contact-section.tsx`.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/contact")} />
      <ContactSection asPage />
    </>
  );
}
