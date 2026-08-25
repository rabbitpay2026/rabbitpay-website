"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { FaqItem } from "@/types";

/**
 * Reusable FAQ accordion, built on the Radix Accordion the project already
 * depends on — no second accordion library.
 *
 * Radix supplies the accessibility semantics the spec asks for: each trigger is
 * a real `<button>` inside a heading, wired to its panel with `aria-expanded`
 * and `aria-controls`, reachable by Tab, toggled with Enter/Space and moved
 * between with the arrow keys. `type="single" collapsible` keeps one answer open
 * at a time, matching the original implementation.
 *
 * Item ids come from `data/faq.ts` (stable slugs), so the accordion value and
 * the generated panel id are deterministic rather than random.
 *
 * This is the only client component in the FAQ tree — section wrappers,
 * headings, sidebar markup and data all stay on the server.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="space-y-4">
      {items.map((faq) => (
        <AccordionPrimitive.Item
          key={faq.id}
          value={faq.id}
          className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(17,24,39,0.08)] data-[state=open]:border-brand/30 data-[state=open]:shadow-[0_8px_28px_rgba(17,24,39,0.08)]"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              id={`faq-trigger-${faq.id}`}
              className="group flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
            >
              <span className="text-[17px] font-semibold leading-snug text-[#111827] sm:text-[18px]">
                {faq.question}
              </span>
              <PlusMinusIcon />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content className="overflow-hidden [animation-duration:300ms] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-[#6B7280] sm:pr-16 sm:text-[16px]">
              {faq.answer}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/** "+" when closed; the vertical bar rotates flat to form "−" when open. */
function PlusMinusIcon() {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#E5E7EB] text-brand transition-colors duration-300 group-hover:border-brand/40 group-data-[state=open]:border-brand/40 group-data-[state=open]:bg-brand/5"
    >
      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
      <span className="absolute h-[2px] w-3.5 rotate-90 rounded-full bg-current transition-transform duration-300 group-data-[state=open]:rotate-0" />
    </span>
  );
}
