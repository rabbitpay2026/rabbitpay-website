import { JsonLd } from "@/components/seo/json-ld";
import { WhatIsRabbitPay } from "@/components/what-is-rabbitpay/what-is-rabbitpay";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/what-is-rabbitpay");

/**
 * `/what-is-rabbitpay` — the definitional page for the entity.
 *
 * Its WebPage node is `about` both the Organization and the SoftwareApplication
 * (see `pageSubject` in `lib/json-ld.ts`), which is what marks this URL as the
 * place both entities are defined rather than leaving a crawler to guess.
 */
export default function WhatIsRabbitPayPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/what-is-rabbitpay")} />
      <WhatIsRabbitPay />
    </>
  );
}
