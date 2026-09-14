import { FaqCTA } from "@/components/faq/faq-cta";
import { FaqCategory } from "@/components/faq/faq-category";
import { FaqHero } from "@/components/faq/faq-hero";
import { FaqSidebar } from "@/components/faq/faq-sidebar";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_CATEGORIES } from "@/data/faq";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/faq");

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
  return (
    <>
      {/*
        One node typed as both WebPage and FAQPage, with every question built
        from the same `FAQ_CATEGORIES` rendered below — so the schema and the
        visible content cannot diverge, and one URL does not claim to be two
        different page entities. Organization and WebSite live in the root
        layout and are referenced here by `@id`.
      */}
      <JsonLd data={buildPageJsonLd("/faq")} />

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
