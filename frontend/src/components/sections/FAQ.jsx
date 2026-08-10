"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { BlurFade } from "@/components/magic-ui/blur-fade";

/**
 * FAQ content. Edit / add / remove entries here — the component renders whatever
 * is in this array, so no JSX changes are needed to update the FAQs.
 */
const FAQS = [
  {
    question: "What is RabbitPay Checkout and how does it help my business?",
    answer:
      "RabbitPay Checkout is a fast one-click checkout built for Shopify brands. It helps improve conversions, reduce checkout abandonment, lower payment costs, and deliver a smoother buying experience.",
  },
  {
    question: "How long does it take to set up RabbitPay?",
    answer:
      "Your RabbitPay Checkout can be live on your Shopify store within 1 hour. Our team takes care of the complete setup for you.",
  },
  {
    question: "Do I need to submit any documents?",
    answer:
      "No. There are no documents, paperwork, or lengthy verification processes required to get started with RabbitPay.",
  },
  {
    question: "How much does RabbitPay cost?",
    answer:
      "Choose the pricing that suits your business. Pay just 1% per successful prepaid order with no setup fee or monthly commitment, or opt for our monthly plans starting at just ₹999.",
  },
  {
    question: "Can I continue using my existing payment gateway?",
    answer:
      "Yes. RabbitPay works with your existing payment gateway, so there's no need to switch providers.",
  },
  {
    question: "Can I enable multiple payment gateways?",
    answer:
      "Yes. RabbitPay supports multiple payment gateways, giving you the flexibility to choose how payments are processed.",
  },
  {
    question: "Can my customers get their address pre-filled during checkout?",
    answer:
      "Yes. RabbitPay intelligently pre-fills customer addresses with up to a 95% fill rate, enabling faster checkouts, fewer address errors, and higher conversion rates.",
  },
  {
    question: "Can I add a COD transaction fee?",
    answer:
      "Yes. You can easily add a COD convenience fee to encourage prepaid orders and reduce unnecessary COD purchases.",
  },
  {
    question: "Does RabbitPay support part payment or split payment?",
    answer:
      "Yes. Collect a partial payment online and the remaining amount on delivery. This helps reduce RTO, improve customer commitment, and increase prepaid conversions.",
  },
  {
    question: "Can I customize the checkout to match my brand?",
    answer:
      "Yes. RabbitPay Checkout can be customized with your brand logo, colors, and styling to provide a seamless shopping experience.",
  },
  {
    question: "Will RabbitPay work with my Shopify store?",
    answer:
      "Yes. RabbitPay is built specifically for Shopify stores and can be integrated without disrupting your existing operations.",
  },
  {
    question: "Will my payment settlements change?",
    answer:
      "No. Your existing payment gateway continues to handle settlements, so your settlement process remains exactly the same.",
  },
  {
    question: "How can I get a demo?",
    answer:
      "Book a free demo with our team, and we'll walk you through the checkout, features, pricing, and answer any questions specific to your business.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. RabbitPay follows industry-standard security practices to protect your customer and transaction data.",
  },
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
