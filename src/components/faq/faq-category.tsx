import { FaqAccordion } from "@/components/faq/faq-accordion";
import type { FaqCategory as FaqCategoryType } from "@/types";

/**
 * One FAQ category: an anchored heading plus its accordion.
 *
 * `id` is the stable slug from `data/faq.ts` — it is the sidebar anchor target
 * and the scroll-spy observation target, so it is never randomly generated.
 * `scroll-mt-*` keeps the heading clear of the fixed header when jumped to.
 */
export function FaqCategory({ category }: { category: FaqCategoryType }) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      data-testid={`faq-category-${category.id}`}
      className="scroll-mt-32 lg:scroll-mt-28"
    >
      <div className="mb-6">
        <h2
          id={`${category.id}-heading`}
          className="text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-[28px]"
        >
          {category.title}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
      </div>
      <FaqAccordion items={category.items} />
    </section>
  );
}
