import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { RABBITPAY_FEE_RATES } from "@/data/pricing";

/**
 * Closing band on /calculator. States only RabbitPay's published pricing, read
 * from the same constants the fee presets use, and offers the site's existing
 * CTAs — no claim about what RabbitPay would do to anyone's numbers.
 */
export function CalculatorCTA() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.06),transparent)] px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tighter text-ink dark:text-white sm:text-3xl">
            Checkout fees are part of every margin.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            RabbitPay charges {RABBITPAY_FEE_RATES.prepaid}% on successful prepaid orders and{" "}
            {RABBITPAY_FEE_RATES.cod}% on successful COD orders, with no setup fee.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_22px_46px_rgba(25,107,245,0.36)] active:translate-y-0 sm:w-auto"
            >
              View Pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <BookDemoButton
              location="calculator_book_demo"
              intent="demo"
              testId="calculator-cta-demo"
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white sm:w-auto"
            >
              Request a Demo
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}
