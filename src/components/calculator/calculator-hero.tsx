import { CALCULATORS } from "@/data/calculators";

/**
 * /calculator page header. Same surface, clearance and type scale as the FAQ
 * hero, so the tool reads as part of the site rather than a bolted-on widget.
 */
export function CalculatorHero() {
  return (
    <section className="relative border-b border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.55),rgba(255,255,255,0))] pb-10 pt-28 md:pb-12 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
          RabbitPay Calculator
        </p>
        <h1 className="mt-4 max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-5xl md:text-[56px]">
          Know your numbers.
          <br />
          Grow your business.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Work out profit margin, ROI, ROAS and revenue for your Shopify store from your own order
          values, ad spend and fulfilment costs. Results update as you type.
        </p>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {CALCULATORS.length} calculators
          <span aria-hidden="true"> · </span>
          Built for D2C brands
          <span aria-hidden="true"> · </span>
          Runs in your browser
        </p>
      </div>
    </section>
  );
}
