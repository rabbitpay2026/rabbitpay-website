import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { PRICING_ID } from "@/data/anchors";
import { PRICING_TRUST_POINTS } from "@/data/pricing";

const CHECKOUT_POINTS = [
  {
    title: "One-Click Checkout",
    body: "A mobile number and a one-time code, then one screen for details, order summary and payment.",
    href: "/features/one-click-checkout",
  },
  {
    title: "Address autofill",
    body: "Saved name, address, phone and email come back prefilled and editable.",
    href: "/features/address-autofill",
  },
  {
    title: "UPI-first payments",
    body: "UPI leads the payment step, with cards, netbanking, wallets and cash on delivery alongside it.",
    href: "/features/upi-checkout",
  },
  {
    title: "Built for Shopify",
    body: "The RabbitPay team sets up the checkout, and you keep the payment gateway you already use.",
    href: "/integrations",
  },
];

export function HomePricingSection() {
  return (
    <section
      id={PRICING_ID}
      data-testid="pricing"
      aria-labelledby="home-pricing-heading"
      className="relative scroll-mt-24 border-t border-border py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                Pricing that fits your store
              </p>
              <h2
                id="home-pricing-heading"
                className="mt-3 max-w-xl text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl"
              >
                Let&apos;s Find the Right Pricing for Your Store
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore a simpler checkout experience with RabbitPay and talk to our team about
                pricing for your Shopify store.
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                Get in touch and the team will discuss pricing based on your requirements.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BookDemoButton
                  location="home_pricing_get_pricing"
                  intent="demo"
                  testId="home-pricing-primary"
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_22px_46px_rgba(25,107,245,0.36)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Get Better Pricing
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </BookDemoButton>
                <Link
                  href="/pricing"
                  data-testid="home-pricing-view"
                  className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:text-white sm:w-auto"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <ul className="divide-y divide-border rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:col-span-6">
              {CHECKOUT_POINTS.map((point) => (
                <li key={point.title}>
                  <Link
                    href={point.href}
                    className="group flex items-start justify-between gap-4 px-5 py-5 transition-colors hover:bg-brand/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/40 sm:px-6"
                  >
                    <span>
                      <span className="block text-base font-semibold text-ink dark:text-white">
                        {point.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {point.body}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 flex-shrink-0 text-brand transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {PRICING_TRUST_POINTS.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
