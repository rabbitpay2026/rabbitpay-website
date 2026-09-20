"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

          {/*
            `forceMount` keeps the answer in the DOM at all times, hidden by
            Radix's `hidden` attribute while collapsed rather than unmounted.
            Without it the answers never reach the server-rendered HTML: a
            crawler that does not execute JavaScript — which is most AI crawlers
            — would see 35 questions and no answers, and the FAQPage structured
            data would describe content absent from the page. Presence is still
            driven by `data-state`, so the open/close animation is unchanged.
          */}
          <AccordionPrimitive.Content
            forceMount
            className="overflow-hidden [animation-duration:300ms] data-[state=closed]:h-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          >
            <div className="px-6 pb-6 sm:pr-16">
              <p className="text-[15px] leading-relaxed text-[#6B7280] sm:text-[16px]">
                {faq.answer}
              </p>
              {faq.link ? <AnswerLink link={faq.link} /> : null}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

/**
 * The optional "read more" link under an answer.
 *
 * Deliberately NOT part of `faq.answer`: the answer string is what the FAQPage
 * JSON-LD reports, and that should stay plain prose. This is navigation, and it
 * is what gives the FAQ real internal linking into the Features pages, /pricing and
 * /support rather than leaving every answer as a dead end.
 *
 * Internal hrefs use `next/link` for client navigation; the one external link
 * (the docs subdomain) renders as a plain anchor with the usual rel guard.
 */
function AnswerLink({ link }: { link: NonNullable<FaqItem["link"]> }) {
  const className =
    "group/link mt-3.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition-colors hover:text-brand-deep";
  const inner = (
    <>
      {link.label}
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5"
      />
    </>
  );

  // `proxied` is internal but not rendered by this app, so it needs a document
  // load rather than a client-side transition — see `NavLink.proxied`.
  if (link.external || link.proxied) {
    return (
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {inner}
    </Link>
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
