import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { DEMO_STORE_URL } from "@/data/site";
import { RABBITPAY_FEE_RATES } from "@/data/pricing";

/**
 * `/what-is-rabbitpay` — the page that answers the entity question directly.
 *
 * Why this page exists, since the brief was to avoid unnecessary routes: the
 * string "RabbitPay" is shared with several unrelated services (a US transit
 * fare app, a Thai wallet, a crypto processor), the site had no page that
 * defines the product in plain language, and Google's Organization guidance
 * asks for "a single page that describes your organization" as the place to
 * anchor that entity. `/product` sells the features, `/faq` answers narrow
 * questions, and neither states what RabbitPay *is* end to end. This does.
 *
 * Sourcing rule, identical to `data/faq.ts` and `app/llms.txt/route.ts`: every
 * sentence here restates something the site already publishes — the page
 * registry, `data/features.ts`, `data/pricing.ts`, `data/integrations.ts`,
 * `data/site.ts` and the FAQ. No capability, statistic, customer, integration,
 * certification, company detail or policy appears that rabbitpay.ai does not
 * already state elsewhere. Figures RabbitPay publishes about itself are
 * attributed as such rather than presented as independent benchmarks.
 *
 * Visual language is the existing one: neutral white surfaces, `border-border`
 * cards, brand blue reserved for eyebrows, bullet marks, links and the primary
 * CTA. No new colours, components or spacing values.
 */
export function WhatIsRabbitPay() {
  return (
    <>
      <section className="relative border-b border-border pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlurFade>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              RabbitPay, explained
            </p>
            <h1 className="mt-3 max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              What is RabbitPay?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 dark:text-white/80">
              RabbitPay is a 1-click checkout for Shopify stores run by Indian direct-to-consumer
              brands. It replaces the store&rsquo;s default checkout with a faster one built around
              prefilled addresses, UPI-first payments and verified cash on delivery, with the stated
              goals of higher conversion and lower return-to-origin.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              It is sold to merchants, not to shoppers: the brand installs it on its Shopify store,
              keeps its existing payment gateway and settlement process, and RabbitPay sits in front
              of those at the checkout step. RabbitPay is built on{" "}
              <span className="font-medium text-ink dark:text-white">COD King</span>&rsquo;s checkout
              and COD optimisation infrastructure, from Notifik Technologies.
            </p>
          </BlurFade>

          {/*
            A plain disambiguation line. Several unrelated services share this
            name, and a reader who arrived from a search for one of them is
            better served by one honest sentence than by scrolling a pitch. No
            competitor is named and no claim is made about them.
          */}
          <BlurFade delay={0.12}>
            <p className="mt-8 max-w-2xl rounded-2xl border border-border bg-muted/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-ink dark:text-white">A note on the name.</span>{" "}
              Several unrelated products also use the name &ldquo;RabbitPay&rdquo;, including a
              public-transport fare app and a consumer wallet. This site, rabbitpay.ai, is the
              Shopify checkout product for Indian D2C brands described on this page. It has no
              connection to the others.
            </p>
          </BlurFade>
        </div>
      </section>

      <Section
        eyebrow="Who it is for"
        heading="Indian D2C brands selling on Shopify."
        lead="RabbitPay documents one platform and one market. If a store does not sit in both, it is not the product's audience."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Fact
            title="Shopify stores"
            body="Shopify is the only ecommerce platform the product documents. The checkout is installed onto an existing store rather than replacing the storefront."
          />
          <Fact
            title="High-COD businesses"
            body="Brands where the share of cash-on-delivery orders makes return-to-origin a material cost rather than a rounding error."
          />
          <Fact
            title="Conversion-led teams"
            body="Brands that treat the checkout step as something to measure and improve, rather than accept as it ships."
          />
        </div>
      </Section>

      <Section
        eyebrow="How it works"
        heading="From install to a paid order."
        lead="Five steps, as the site and the FAQ describe them."
      >
        <ol className="space-y-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-brand"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink dark:text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          The full breakdown of each capability, with the payment, marketing and analytics partners
          RabbitPay connects to, is on the{" "}
          <TextLink href="/product">RabbitPay Checkout product page</TextLink>. Setup and
          configuration steps are in the{" "}
          {/*
            An <a>, not a <Link>, and deliberately so: /documentation is served
            by a route handler that proxies the Mintlify deployment, not by a
            page in this app, so it needs a document load rather than a
            client-side transition. Same reasoning as `NavLink.proxied` in the
            footer and the Resources menu — the lint rule just cannot see it
            through a literal href.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/documentation"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            documentation
          </a>
          .
        </p>
      </Section>

      <Section
        eyebrow="What's in the checkout"
        heading="The capabilities RabbitPay documents."
        lead="Each of these is described in more depth on the product page and in the FAQ."
      >
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                aria-hidden="true"
                strokeWidth={3}
                className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-brand"
              />
              <span className="text-[15px] leading-relaxed text-ink/80 dark:text-white/80">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="What it costs"
        heading="Charged per successful order."
        lead={`RabbitPay charges ${RABBITPAY_FEE_RATES.prepaid}% on successful prepaid orders and ${RABBITPAY_FEE_RATES.cod}% on successful COD orders, with no setup fee and no monthly commitment on the Growth plan. Brands above 50,000 orders a month are quoted custom, volume-based pricing.`}
      >
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Both rates apply to successful orders only. The full comparison of the Growth and
          Enterprise plans — support level, SLA, COD verification, MDR discounts and dedicated
          customer success — is on the <TextLink href="/pricing">pricing page</TextLink>. To see what
          checkout fees do to your own margin alongside product cost, ads and shipping, the{" "}
          <TextLink href="/calculator/profit-margin">profit margin calculator</TextLink> runs the
          numbers in your browser.
        </p>
      </Section>

      <Section
        eyebrow="The infrastructure behind it"
        heading="Built on COD King."
        lead="RabbitPay is a custom checkout platform powered by COD King, the COD verification and RTO product from Notifik Technologies."
      >
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          COD King is an established Shopify app for cash-on-delivery verification and
          return-to-origin control used by Indian merchants. RabbitPay builds its checkout on that
          infrastructure and operational experience rather than starting from scratch, which is why
          verified COD and RTO controls are part of the checkout itself rather than a separate tool
          bolted on afterwards. RabbitPay is the merchant-facing product; COD King is what it runs
          on.
        </p>
      </Section>

      <Section
        eyebrow="Getting started"
        heading="See it, then talk to the team."
        lead="Setup is handled by the RabbitPay team. The site states a store can be live within about an hour, with no documents or verification process, and that integration does not disrupt existing store operations."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookDemoButton
            location="what_is_rabbitpay_demo"
            intent="demo"
            testId="what-is-rabbitpay-demo"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0"
          >
            Request a Demo
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </BookDemoButton>
          <a
            href={DEMO_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white"
          >
            View the demo store
          </a>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Prefer to read first? The <TextLink href="/faq">FAQ</TextLink> answers the specific
          questions merchants ask about charges, gateways, settlements, part payments, address
          prefill and Shopify compatibility, and{" "}
          <TextLink href="/contact">the contact page</TextLink> lists every way to reach the team.
        </p>
      </Section>
    </>
  );
}

/** Section wrapper: eyebrow, h2 and lead, in the site's existing rhythm. */
function Section({
  eyebrow,
  heading,
  lead,
  children,
}: {
  eyebrow: string;
  heading: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-14 last:border-b-0 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold leading-[1.12] tracking-tighter text-ink dark:text-white sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>
        </BlurFade>
        <BlurFade delay={0.1}>
          <div className="mt-8">{children}</div>
        </BlurFade>
      </div>
    </section>
  );
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <h3 className="text-base font-semibold text-ink dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-medium text-brand underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}

/** How a merchant goes from install to a paid order — as the FAQ describes it. */
const STEPS = [
  {
    title: "The team installs the checkout on your Shopify store",
    body: "RabbitPay handles installation and configuration. The site states a store can be live within about an hour, with no documents, paperwork or verification process required.",
  },
  {
    title: "You keep your existing payment gateway",
    body: "RabbitPay does not take over payment processing or settlement, and supports running more than one gateway. Settlements continue to be handled by that gateway and do not change.",
  },
  {
    title: "Shoppers land on the RabbitPay checkout",
    body: "Address, phone and email can appear already filled in and editable, so the first screen reads as a confirmation rather than a form — designed as one screen on mobile instead of a multi-step flow.",
  },
  {
    title: "They pay the way Indian shoppers actually pay",
    body: "UPI takes the primary position — Google Pay, PhonePe, Paytm, BHIM UPI, Amazon Pay and CRED — with cards and netbanking as fallbacks, and verified cash on delivery alongside them.",
  },
  {
    title: "COD orders are screened before dispatch",
    body: "Pending COD orders pass through verification and risk checks before fulfilment. The stated aim is fewer fake orders and less leakage between checkout and delivery, not fewer COD orders.",
  },
];

/** Capabilities the site documents. Mirrors `data/features.ts` and the FAQ. */
const CAPABILITIES = [
  "Address, phone and email prefill, editable by the shopper",
  "UPI-first payments with card and netbanking fallback",
  "Verified cash on delivery with pre-dispatch risk checks",
  "Part payment: collect some online, the rest on delivery",
  "A merchant-set COD convenience fee to push shoppers prepaid",
  "Checkout customised to the brand's logo, colours and styling",
  "Works with your existing payment gateway, or several at once",
  "Connects to Meta, Google Ads and Google Analytics",
];
