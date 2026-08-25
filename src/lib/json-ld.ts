import { ALL_FAQS } from "@/data/faq";
import { SITE_URL } from "@/data/site";

/**
 * Schema.org FAQPage structured data.
 *
 * Built by mapping over `ALL_FAQS` — the same array the page renders — so the
 * structured data cannot drift from the visible content. Adding, editing or
 * removing a question in `data/faq.ts` updates both automatically; there is no
 * hand-maintained second copy.
 *
 * Note this only makes the Q&A machine-readable. Whether Google shows a rich
 * result is entirely Google's decision — FAQ rich results are currently limited
 * to a small set of sites and markup guarantees nothing.
 */
export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faqpage`,
    url: `${SITE_URL}/faq`,
    name: "RabbitPay FAQ",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
