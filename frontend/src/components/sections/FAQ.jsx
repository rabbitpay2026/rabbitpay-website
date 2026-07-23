"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * FAQ content. Edit / add / remove entries here — the component renders whatever
 * is in this array, so no JSX changes are needed to update the FAQs.
 */
const FAQS = [
  { question: "What is the rabbitpay checkout and how does it help my business?", answer: "Answer Placeholder 1" },
  { question: "How much time does it take to set up rabbitpay?", answer: "Answer Placeholder 2" },
  { question: "What are the required documents to get on-boarded?", answer: "Answer Placeholder 3" },
  { question: "How much does the checkout cost?", answer: "Answer Placeholder 4" },
  { question: "Can I bring my own PG partner?", answer: "Answer Placeholder 5" },
  { question: "Can I enable multiple payment gateways on this checkout?", answer: "Answer Placeholder 6" },
  { question: "is my data is secure?", answer: "Answer Placeholder 6" },
  { question: "What is the role of Flipkart and Juspay in rabbitpay?", answer: "Answer Placeholder 6" },
  { question: "How is rabbitpay checkout different from other checkout solutions?", answer: "Answer Placeholder 6" },
  { question: "How can I get a demo?", answer: "Answer Placeholder 6" },
  {
    question: "Is RabbitPay powered by COD King?",
    answer:
      "Yes. RabbitPay is built on top of COD King's proven checkout and COD optimization infrastructure, trusted by Indian merchants.",
  },
];


/** "+" when closed; the vertical bar rotates flat to form "−" when open. */
function PlusMinusIcon() {
  return (
    <span className="relative grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-[#E5E7EB] text-brand transition-colors duration-300 group-hover:border-brand/40 group-data-[state=open]:border-brand/40">
      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
      <span className="absolute h-[2px] w-3.5 rotate-90 rounded-full bg-current transition-transform duration-300 group-data-[state=open]:rotate-0" />
    </span>
  );
}

export function FAQ() {
  return (
    <section id="faq" data-testid="faq" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-[900px] px-6 sm:px-8">
        <BlurFade>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Frequently asked questions
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter text-[#111827] sm:text-4xl">
              Everything merchants ask before switching to RabbitPay.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B7280]">
              Find answers about setup, pricing, integrations, payments, and support.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.12}>
          {/* type="single" + collapsible => only one answer open at a time */}
          <AccordionPrimitive.Root type="single" collapsible className="mt-12 space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionPrimitive.Item
                key={faq.question || index}
                value={`faq-${index}`}
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(17,24,39,0.08)]"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
                    <span className="text-[18px] font-semibold leading-snug text-[#111827]">
                      {faq.question}
                    </span>
                    <PlusMinusIcon />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content className="overflow-hidden [animation-duration:300ms] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-6 pb-6 pr-16 text-[16px] leading-relaxed text-[#6B7280]">
                    {faq.answer}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </BlurFade>
      </div>
    </section>
  );
}
