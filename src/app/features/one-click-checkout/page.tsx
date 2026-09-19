import {
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  KeyRound,
  Layers,
  MapPin,
  ShoppingBag,
  Smartphone,
  Timer,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import { CheckoutDemo } from "@/components/features/checkout-demo";
import {
  BookDemoAction,
  DemoStoreAction,
  FactGrid,
  FeatureCTA,
  FeatureFaq,
  PageHeader,
  PageSection,
  RelatedFeatures,
  StepList,
  TextLink,
} from "@/components/features/page-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { CHECKOUT_JOURNEY } from "@/data/checkout-journey";
import { ONE_CLICK_FAQS } from "@/data/feature-faqs";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/features/one-click-checkout");

/**
 * `/features/one-click-checkout`.
 *
 * Sources: the checkout journey (`data/checkout-journey.ts`, the same steps
 * the homepage walkthrough lists and the simulation plays), FAQ answers
 * `how-does-checkout-work`, `setup-time`, `documents-required`,
 * `shopify-compatibility` and `existing-payment-gateway`, and RabbitPay's
 * documentation for the Shopify collaborator-access step and the test order
 * before launch.
 *
 * Deliberately absent: any completion time. The documentation quotes seconds
 * figures that nothing on this site supports, so none is repeated here.
 */
const RETURNING = [
  "Enters their mobile number.",
  "Confirms it with the one-time code.",
  "Finds their name, address, phone and email already filled in — and edits anything that has changed.",
  "Chooses how to pay, with UPI first.",
  "Places the order and lands on the confirmation.",
];

const FIRST_TIME = [
  "Enters their mobile number.",
  "Confirms it with the one-time code.",
  "Enters their delivery details, since nothing is saved for the number yet.",
  "Chooses how to pay, with UPI first.",
  "Places the order and lands on the confirmation.",
];

export default function OneClickCheckoutPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/features/one-click-checkout")} />

      <PageHeader
        path="/features/one-click-checkout"
        eyebrow="One-click checkout"
        title="One-click checkout for Shopify"
        intro={
          <>
            <p>
              RabbitPay replaces the default multi-step Shopify checkout with one short flow. The
              shopper enters a mobile number, confirms it with a one-time code, and reaches a single
              screen with their details, the order summary and the payment options.
            </p>
            <p className="text-base">
              The phone on this page runs the flow with sample details. To use the real checkout,
              open the demo store.
            </p>
          </>
        }
        actions={
          <>
            <BookDemoAction location="one_click_checkout_book_demo" />
            <DemoStoreAction />
          </>
        }
        aside={<CheckoutDemo />}
      />

      <PageSection
        id="how-it-works"
        tone="band"
        eyebrow="How it works"
        title="Five steps, from mobile number to order"
        intro={<p>The same steps the simulation above plays, in order.</p>}
      >
        <StepList steps={CHECKOUT_JOURNEY} label="Checkout steps" />
      </PageSection>

      <PageSection
        id="shoppers"
        eyebrow="New and returning shoppers"
        title="What changes for a returning shopper"
        intro={
          <p>
            Only one step. A returning shopper whose details are saved against their number gets
            them back prefilled; a first-time shopper types them once.{" "}
            <TextLink href="/features/address-autofill">How address autofill works</TextLink>
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Returning shopper", Icon: UserRoundCheck, steps: RETURNING },
            { title: "First-time shopper", Icon: UserPlus, steps: FIRST_TIME },
          ].map((path) => (
            <div key={path.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h3 className="flex items-center gap-2.5 text-base font-semibold text-ink dark:text-white">
                <span className="inline-grid h-9 w-9 place-items-center rounded-xl border border-brand/15 bg-brand/10 text-brand">
                  <path.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {path.title}
              </h3>
              <ol className="mt-4 space-y-3">
                {path.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className={
                        index === 2
                          ? "grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-brand text-[11px] font-semibold text-white"
                          : "grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-border bg-background text-[11px] font-semibold text-brand"
                      }
                    >
                      {index + 1}
                    </span>
                    <span className={index === 2 ? "font-medium text-ink dark:text-white" : undefined}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="benefits" eyebrow="Why it helps" title="Less to do before the order is placed">
        <FactGrid
          columns={2}
          facts={[
            {
              Icon: Smartphone,
              title: "Starts with a mobile number",
              body: "The first screen asks for one thing, not a full form.",
            },
            {
              Icon: Layers,
              title: "One screen, not a form",
              body: "Details, order summary and payment sit together, designed to read as a single screen on mobile.",
            },
            {
              Icon: MapPin,
              title: "Saved details come back",
              body: "Returning shoppers review their details instead of typing them again.",
            },
            {
              Icon: CreditCard,
              title: "Payment shoppers already use",
              body: (
                <>
                  UPI first, with cards, netbanking, wallets and cash on delivery alongside.{" "}
                  <TextLink href="/features/upi-checkout">About UPI checkout</TextLink>
                </>
              ),
            },
          ]}
        />
      </PageSection>

      <PageSection
        id="setup"
        tone="band"
        eyebrow="Setup"
        title="What you need to go live"
        intro={
          <p>
            The RabbitPay team installs and configures the checkout. The{" "}
            <TextLink href="/documentation/getting-started/one-click-checkout" proxied>
              step-by-step setup guide
            </TextLink>{" "}
            is in the documentation.
          </p>
        }
      >
        <FactGrid
          facts={[
            {
              Icon: ShoppingBag,
              title: "A Shopify store",
              body: "RabbitPay is built specifically for Shopify stores.",
            },
            {
              Icon: KeyRound,
              title: "Collaborator access",
              body: "Share the collaborator request code from Shopify admin (Settings → Users and permissions) and your store URL. Never your password.",
            },
            {
              Icon: CreditCard,
              title: "Your payment gateway",
              body: (
                <>
                  Keep the gateway you use today, or more than one.{" "}
                  <TextLink href="/integrations">Gateway setup</TextLink>
                </>
              ),
            },
            {
              Icon: FileCheck2,
              title: "No paperwork",
              body: "No documents, paperwork or lengthy verification process.",
            },
            {
              Icon: Timer,
              title: "Live in about an hour",
              body: "The team handles setup, and a store can be live within 1 hour.",
            },
            {
              Icon: ClipboardCheck,
              title: "A test order first",
              body: "Before going live, place a test order and check it appears in Shopify admin.",
            },
          ]}
        />
      </PageSection>

      <FeatureFaq items={ONE_CLICK_FAQS} />
      <RelatedFeatures current="/features/one-click-checkout" />
      <FeatureCTA location="one_click_checkout_book_demo" />
    </>
  );
}
