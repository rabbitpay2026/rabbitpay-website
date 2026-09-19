import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  BookDemoAction,
  FeatureCTA,
  FeatureFaq,
  PageHeader,
  PageSection,
  RelatedFeatures,
  SecondaryLink,
  StepList,
  TextLink,
} from "@/components/features/page-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { CHECKOUT_JOURNEY } from "@/data/checkout-journey";
import { CONVERSION_FAQS } from "@/data/feature-faqs";
import {
  ADDRESS_AUTOFILL,
  ONE_CLICK_CHECKOUT,
  UPI_CHECKOUT,
} from "@/data/feature-pages";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/solutions/checkout-conversion");

/**
 * `/solutions/checkout-conversion` — a guide, not a results page.
 *
 * The friction points are the ones the site already names as the problem
 * RabbitPay addresses (FAQ `what-problem-does-rabbitpay-solve`, the llms.txt
 * overview): typing on mobile, a multi-step form, a payment step that does not
 * lead with UPI, and unverified COD. Each maps to a feature the site documents.
 *
 * No uplift, RTO-reduction or revenue figure appears, because RabbitPay
 * publishes none. The measurement section tells a merchant how to find the
 * number on their own store instead.
 */
const FRICTION = [
  {
    problem: "Typing a full delivery address on a phone",
    why: "The address is the longest thing a mobile checkout asks for, and the most error-prone.",
    fix: "Address autofill brings a returning shopper's saved details back, prefilled and editable.",
    feature: ADDRESS_AUTOFILL,
  },
  {
    problem: "A multi-step form before payment",
    why: "Every extra screen between the cart and payment is another point to leave.",
    fix: "One-click checkout starts with a mobile number and puts details, summary and payment on one screen.",
    feature: ONE_CLICK_CHECKOUT,
  },
  {
    problem: "A payment step that does not lead with UPI",
    why: "UPI is the dominant way to pay on mobile in India, and a card-first step adds work for those shoppers.",
    fix: "UPI checkout puts UPI first, with cards, netbanking, wallets and COD alongside.",
    feature: UPI_CHECKOUT,
  },
  {
    problem: "COD orders that ship and come back",
    why: "An unverified COD order can complete checkout and still return undelivered — an RTO, not a sale.",
    fix: "Verified COD screens pending orders before dispatch; part payment and a COD fee add commitment.",
    feature: {
      href: "/faq#checkout",
      label: "Verified COD",
      Icon: ShieldCheck,
    },
  },
];

const MEASUREMENT = [
  {
    title: "Pick one metric",
    body: "Completed checkouts as a share of sessions that reached checkout. Shopify's own conversion reports show both numbers.",
  },
  {
    title: "Record a baseline",
    body: "Note the figure for a period before going live, the same length as the period you will compare it with.",
  },
  {
    title: "Compare like with like",
    body: "Similar traffic, campaigns and season on both sides. A sale week against a normal week measures the sale.",
  },
  {
    title: "Split prepaid and COD",
    body: "See how the payment mix of completed orders moves, not only the total.",
  },
  {
    title: "Follow COD to delivery",
    body: "Use your shipping data for delivered versus returned. A completed checkout that comes back is not a sale.",
  },
];

export default function CheckoutConversionPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/solutions/checkout-conversion")} />

      <PageHeader
        path="/solutions/checkout-conversion"
        eyebrow="Solution"
        title="Improve Shopify checkout conversion"
        intro={
          <>
            <p>
              Checkouts lose orders at predictable points. This guide lists the common ones for
              Indian Shopify stores, the RabbitPay feature that addresses each, and how to measure
              the result on your own store.
            </p>
            <p className="text-base">
              RabbitPay does not publish a conversion-uplift figure. What changes for your store is
              something to measure, not assume.
            </p>
          </>
        }
        actions={
          <>
            <BookDemoAction location="checkout_conversion_book_demo" />
            <SecondaryLink href="/features">See all features</SecondaryLink>
          </>
        }
      />

      <PageSection
        id="friction-points"
        tone="band"
        eyebrow="Friction points"
        title="Where checkouts lose orders, and what addresses each"
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {FRICTION.map((item) => (
            <li
              key={item.problem}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <h3 className="text-base font-semibold tracking-tight text-ink dark:text-white">
                {item.problem}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.why}</p>
              <div className="mt-4 flex flex-1 gap-3 rounded-xl border border-brand/15 bg-brand/[0.05] p-4">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <item.feature.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-ink/80 dark:text-white/80">{item.fix}</p>
              </div>
              <Link
                href={item.feature.href}
                className="group mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                {item.feature.href.startsWith("/faq") ? `${item.feature.label} in the FAQ` : item.feature.label}
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="shopper-journey"
        eyebrow="The intended journey"
        title="What the shopper does, start to finish"
        intro={
          <p>
            Five steps from the Buy button to the confirmation. A returning shopper reviews their
            details at step 3 instead of typing them.{" "}
            <TextLink href="/features/one-click-checkout">Try the checkout simulation</TextLink>
          </p>
        }
      >
        <StepList steps={CHECKOUT_JOURNEY} label="Shopper journey" />
      </PageSection>

      <PageSection
        id="measure"
        tone="band"
        eyebrow="Measure it"
        title="How to measure completed checkouts"
        intro={
          <p>
            Use your own store&apos;s data — Shopify&apos;s reports, your analytics tool and your
            shipping data — rather than a benchmark from anywhere else.
          </p>
        }
      >
        <StepList steps={MEASUREMENT} label="Measurement method" />
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          To see what a change in conversion rate would mean for revenue, enter your own sessions,
          conversion rate and order value in the{" "}
          <TextLink href="/calculator/revenue">revenue calculator</TextLink>.
        </p>
      </PageSection>

      <FeatureFaq items={CONVERSION_FAQS} />
      <RelatedFeatures current="/solutions/checkout-conversion" />
      <FeatureCTA
        location="checkout_conversion_book_demo"
        title="Walk through your checkout with the team"
        body="Book a demo to see where RabbitPay fits in your store's checkout — address autofill, the UPI-first payment step, COD verification and what setup involves."
      />
    </>
  );
}
