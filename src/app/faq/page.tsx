import { FaqCTA } from "@/components/faq/faq-cta";
import { FaqCategory } from "@/components/faq/faq-category";
import { FaqHero } from "@/components/faq/faq-hero";
import { FaqSidebar } from "@/components/faq/faq-sidebar";
import { FAQ_CATEGORIES } from "@/data/faq";
import { buildFaqPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers about RabbitPay setup, pricing, COD charges, payment gateways, address prefill, part payments, Shopify integration, settlements and security.",
  path: "/faq",
  ogTitle: "RabbitPay FAQ — Frequently Asked Questions",
});

/**
 * `/faq` — the complete FAQ, in a documentation-style two-column layout.
 *
 * Every question and answer comes from `data/faq.ts`, which is also what the
 * homepage preview and the JSON-LD read from, so the three can never disagree.
 *
 * Server Component: only the accordion and the scroll-spy sidebar are client
 * components, and they sit at the leaves.
 */
export default function FaqPage() {
  const jsonLd = buildFaqPageJsonLd();

  return (
    <>
      {/*
        Next's documented way to render JSON-LD. The payload is our own typed
        object serialised with JSON.stringify — no user input reaches it — and
        `<` is escaped so the string can never terminate the script element early.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <FaqHero />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3 lg:py-14">
            <FaqSidebar categories={FAQ_CATEGORIES} />
          </aside>

          <div
            data-testid="faq-content"
            className="space-y-14 py-10 md:space-y-16 lg:col-span-9 lg:py-14"
          >
            {FAQ_CATEGORIES.map((category) => (
              <FaqCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>

      <FaqCTA />
    </>
  );
}
