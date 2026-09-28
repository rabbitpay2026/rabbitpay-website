import { ArrowRight, Info, Landmark, MessageCircle, Phone, Receipt, Store, Tag } from "lucide-react";
import Link from "next/link";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { TalkToSalesButton } from "@/components/cta/talk-to-sales-button";
import { CheckoutDemo } from "@/components/features/checkout-demo";
import {
  CheckList,
  FactGrid,
  FeatureCTA,
  FeatureFaq,
  PageHeader,
  PageSection,
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  TextLink,
} from "@/components/features/page-parts";
import { LeadCaptureCard } from "@/components/forms/lead-capture-card";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { JsonLd } from "@/components/seo/json-ld";
import { DEMO_SECTION_ID } from "@/data/anchors";
import { PRICING_FAQS, SHOPIFY_PRICING_URL } from "@/data/feature-faqs";
import {
  SUPPORT_HOURS,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_WHATSAPP_HREF,
} from "@/data/site";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/pricing");

const NEXT_STEPS = [
  {
    title: "Tell us about your store",
    body: "Email, mobile number and store URL. Monthly GMV is optional.",
  },
  {
    title: "The team gets back to you",
    body: "Within 12–24 hours, to discuss pricing for your requirements.",
  },
  {
    title: "See it on your store",
    body: "A walkthrough of the checkout, address autofill and the UPI-first payment step.",
  },
];

const CONVERSATION = [
  {
    title: "Pricing based on your store",
    body: "Talk through pricing against your store's requirements, not a generic table.",
  },
  {
    title: "The checkout cost structure",
    body: "Go through Shopify, gateway and RabbitPay charges side by side, using your own numbers.",
  },
  {
    title: "Less friction for your shoppers",
    body: "See how one-click checkout, address autofill and a UPI-first payment step fit your store.",
    link: { href: "/features", label: "See all features" },
  },
  {
    title: "Supported integrations",
    body: "Which payment gateways and marketing tools RabbitPay works with, and how they connect.",
    link: { href: "/integrations", label: "See integrations" },
  },
  {
    title: "Your gateway stays",
    body: "Keep the payment gateway you use today. Settlements continue to be handled by that gateway.",
  },
  {
    title: "Help with Shopify setup",
    body: "The team installs and configures the checkout. You share collaborator access and your store URL, never your password.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/pricing")} />

      <PageHeader
        path="/pricing"
        eyebrow="Better pricing for your Shopify store"
        title="Let's Find the Right Pricing for Your Store"
        intro={
          <>
            <p>
              RabbitPay pairs a simpler Shopify checkout with a pricing discussion built around your
              store. The team looks at what you need and goes through the costs with you, instead of
              handing you a one-size-fits-all table.
            </p>
            <p className="text-base">
              Tell us about your store and we will get back to you within 12–24 hours.
            </p>
          </>
        }
        actions={
          <>
            <BookDemoButton
              location="pricing_hero_get_pricing"
              intent="demo"
              testId="pricing-hero-primary"
              className={PRIMARY_BUTTON}
            >
              Get Better Pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </BookDemoButton>
            <TalkToSalesButton
              location="pricing_hero_talk_to_team"
              testId="pricing-hero-secondary"
              className={SECONDARY_BUTTON}
            >
              Talk to Our Team
            </TalkToSalesButton>
          </>
        }
        aside={
          <div
            data-testid="pricing-next-steps"
            className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What happens next
            </p>
            <ol className="mt-5 space-y-5">
              {NEXT_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-brand/20 bg-brand/10 text-sm font-semibold text-brand"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <PageSection
        id="checkout-costs"
        eyebrow="Know your costs"
        title="Compare your current checkout costs with RabbitPay"
        intro={
          <p>
            An order on a Shopify store can carry several separate charges. Before comparing
            anything, it helps to see which of them apply to your store.
          </p>
        }
      >
        <FactGrid
          columns={2}
          facts={[
            {
              Icon: Store,
              title: "Shopify subscription",
              body: "What you pay Shopify to run your store on your plan. It is a separate cost from anything charged per order.",
            },
            {
              Icon: Receipt,
              title: "Shopify transaction fees",
              body: (
                <>
                  Shopify&apos;s pricing page lists a fee on orders paid through a third-party
                  payment provider, and the rate varies by Shopify plan. What applies to you depends
                  on your plan and how your customers pay.{" "}
                  <a
                    href={SHOPIFY_PRICING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    Check Shopify&apos;s current rates
                  </a>
                </>
              ),
            },
            {
              Icon: Landmark,
              title: "Payment gateway fees",
              body: (
                <>
                  Your gateway charges its own processing fees under your own arrangement with it.
                  RabbitPay works with the gateway you already use, and settlements stay with that
                  gateway. <TextLink href="/integrations">See supported gateways</TextLink>
                </>
              ),
            },
            {
              Icon: Tag,
              title: "RabbitPay fees",
              body: "Discussed with the team based on your store and requirements, rather than set out in a table on this page.",
            },
          ]}
        />

        <div className="mt-6 flex gap-3.5 rounded-2xl border border-brand/20 bg-brand/5 p-5">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden="true" />
          <div className="space-y-2 text-sm leading-relaxed text-ink/80 dark:text-white/80">
            <p>
              RabbitPay does not promise a saving, and this page does not claim that RabbitPay
              removes any Shopify charge. Whether your overall checkout cost changes depends on your
              Shopify plan, your gateway and how your orders are paid. The team will go through it
              with you using your own numbers.
            </p>
            <p>
              To see what checkout fees do to your margin alongside product cost, ads and shipping,
              use the{" "}
              <TextLink href="/calculator/profit-margin">profit margin calculator</TextLink>.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection
        id="one-click-checkout"
        tone="band"
        eyebrow="One-Click Checkout"
        title="Fewer steps between the cart and the order"
        intro={
          <p>
            RabbitPay replaces the default multi-step Shopify checkout with one short flow. The
            shopper enters a mobile number, confirms it with a one-time code, and reaches a single
            screen with their details, the order summary and the payment options.
          </p>
        }
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <CheckList
              items={[
                <>
                  <strong className="font-semibold text-ink dark:text-white">Less typing.</strong>{" "}
                  The first screen asks for a mobile number, not a full form.
                </>,
                <>
                  <strong className="font-semibold text-ink dark:text-white">
                    Address autofill.
                  </strong>{" "}
                  Once the number is confirmed, a returning shopper&apos;s saved name, address, phone
                  and email come back prefilled and editable.{" "}
                  <TextLink href="/features/address-autofill">How autofill works</TextLink>
                </>,
                <>
                  <strong className="font-semibold text-ink dark:text-white">UPI first.</strong>{" "}
                  UPI leads the payment step, with cards, netbanking, wallets and cash on delivery
                  alongside it.{" "}
                  <TextLink href="/features/upi-checkout">About UPI checkout</TextLink>
                </>,
                <>
                  <strong className="font-semibold text-ink dark:text-white">
                    A smoother path to the order.
                  </strong>{" "}
                  Details, order summary and payment sit together, designed to read as a single
                  screen on mobile.
                </>,
              ]}
            />
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              RabbitPay does not publish a conversion-uplift figure. What changes for your store is
              something to measure, and the{" "}
              <TextLink href="/solutions/checkout-conversion">checkout conversion guide</TextLink>{" "}
              shows how.
            </p>
            <div className="mt-8">
              <Link
                href="/features/one-click-checkout"
                data-testid="pricing-explore-one-click"
                className={PRIMARY_BUTTON}
              >
                Explore One-Click Checkout
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <CheckoutDemo />
          </div>
        </div>
      </PageSection>

      <PageSection
        id="why-talk-to-rabbitpay"
        eyebrow="Why talk to RabbitPay"
        title="What the pricing conversation covers"
        intro={
          <p>
            A short call or reply, focused on your store. Here is what the team can go through with
            you.
          </p>
        }
      >
        <dl className="grid gap-x-12 md:grid-cols-2">
          {CONVERSATION.map((item) => (
            <div key={item.title} className="border-t border-border py-5">
              <dt className="text-base font-semibold text-ink dark:text-white">{item.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.body}
                {item.link ? (
                  <>
                    {" "}
                    <TextLink href={item.link.href}>{item.link.label}</TextLink>
                  </>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <section
        id={DEMO_SECTION_ID}
        aria-labelledby="pricing-enquiry-heading"
        data-testid="pricing-enquiry"
        className="relative scroll-mt-24 py-14 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlurFade>
            <div className="grid items-center gap-10 rounded-3xl border border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.06),transparent)] px-5 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
                  Pricing enquiry
                </p>
                <h2
                  id="pricing-enquiry-heading"
                  className="mt-3 text-2xl font-semibold leading-[1.1] tracking-tighter text-ink dark:text-white sm:text-3xl"
                >
                  Looking for Better Pricing?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  Tell us about your store and our team will discuss the right pricing option for
                  your requirements.
                </p>
                <p className="mt-3 max-w-md text-sm font-semibold text-ink dark:text-white">
                  Apply now and our team will contact you within 12–24 hours.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  Prefer to talk first? {SUPPORT_HOURS}.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-5">
                  <a
                    href={SUPPORT_PHONE_HREF}
                    className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {SUPPORT_PHONE}
                  </a>
                  <a
                    href={SUPPORT_WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp us
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <LeadCaptureCard
                  source="pricing_page"
                  testPrefix="pricing-lead"
                  showHeading={false}
                  submitLabel="Get Better Pricing"
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <FeatureFaq items={PRICING_FAQS} title="Pricing questions" />

      <FeatureCTA
        location="pricing_final"
        title="Get pricing for your Shopify store"
        body="Share your store details and the team will go through pricing and the checkout with you."
      />
    </>
  );
}
