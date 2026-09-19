import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import {
  BookDemoAction,
  CheckList,
  DemoStoreAction,
  FactGrid,
  FeatureCTA,
  FeatureFaq,
  Figure,
  PageHeader,
  PageSection,
  RelatedFeatures,
  StepList,
  TextLink,
} from "@/components/features/page-parts";
import { FeatureVisual } from "@/components/product/feature-visuals";
import { JsonLd } from "@/components/seo/json-ld";
import { ADDRESS_AUTOFILL_FAQS } from "@/data/feature-faqs";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/features/address-autofill");

/**
 * `/features/address-autofill`.
 *
 * Sources: FAQ `address-prefill` and `how-does-checkout-work`, the prefill
 * bullets in `data/features.ts`, and the checkout journey — step 2, "a one-time
 * code confirms the number, which is what lets the saved details come back",
 * and step 3, "name, address, phone and email appear already filled in and
 * editable". The Edit control is on the delivery card in the checkout
 * simulation.
 *
 * The visual is the existing prefill illustration from the homepage, with the
 * same honest caption: sample details, not a screenshot of a live checkout.
 *
 * Not stated, because the site does not publish it: where saved details come
 * from, how long they are kept, or what share of shoppers get them. No fill-rate
 * figure appears — the one the site used to carry was withdrawn for lack of data.
 */
export default function AddressAutofillPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/features/address-autofill")} />

      <PageHeader
        path="/features/address-autofill"
        eyebrow="Address autofill"
        title="Address autofill for Shopify checkout"
        intro={
          <p>
            Once a shopper confirms their mobile number, the details saved against it come back
            already filled in: name, delivery address, phone and email. The first checkout screen
            becomes something to check, not a form to fill — and every field stays editable.
          </p>
        }
        actions={
          <>
            <BookDemoAction location="address_autofill_book_demo" />
            <DemoStoreAction />
          </>
        }
        aside={
          <Figure caption="Illustration of the prefilled checkout step with sample details — not a screenshot of a live store.">
            <FeatureVisual visual="prefill" />
          </Figure>
        }
      />

      <PageSection
        id="prefilled-details"
        tone="band"
        eyebrow="What is prefilled"
        title="Four details the shopper does not retype"
      >
        <FactGrid
          columns={2}
          facts={[
            { Icon: UserRound, title: "Name", body: "The name the order is delivered to." },
            { Icon: MapPin, title: "Delivery address", body: "The full address, shown next to the order summary." },
            { Icon: Phone, title: "Phone number", body: "The mobile number the shopper just confirmed." },
            { Icon: Mail, title: "Email", body: "The shopper's email address." },
          ]}
        />
      </PageSection>

      <PageSection
        id="eligibility"
        eyebrow="When it applies"
        title="Conditions for autofill"
        intro={<p>Details are prefilled when both of these are true:</p>}
      >
        <div className="max-w-2xl">
          <CheckList
            items={[
              <>
                <strong className="font-semibold text-ink dark:text-white">
                  The mobile number is verified.
                </strong>{" "}
                The shopper enters it and confirms it with a one-time code. That confirmation is
                what lets saved details come back, so nothing is shown before it.
              </>,
              <>
                <strong className="font-semibold text-ink dark:text-white">
                  Details are saved for that number.
                </strong>{" "}
                A returning shopper&apos;s details come back; a number with nothing saved gets an
                empty form instead.
              </>,
            ]}
          />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            For how customer data is stored and protected, see the{" "}
            <TextLink href="/faq#platform-security">security answers in the FAQ</TextLink>, or{" "}
            <TextLink href="/contact">ask the team</TextLink> for specifics.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="review-and-edit"
        tone="band"
        eyebrow="Review and edit"
        title="The shopper stays in control of their details"
        intro={
          <p>
            Prefilled is not locked. Anything that has changed — a new flat, a different recipient —
            is edited in place before payment.
          </p>
        }
      >
        <StepList
          columns={4}
          label="Reviewing prefilled details"
          steps={[
            { title: "Details appear", body: "Name, address, phone and email show next to the order summary." },
            { title: "Shopper checks them", body: "Nothing is submitted until they continue." },
            { title: "Edit if needed", body: "The Edit control on the delivery details opens them for changes." },
            { title: "Continue to payment", body: "The confirmed details go with the order." },
          ]}
        />
      </PageSection>

      <PageSection
        id="manual-entry"
        eyebrow="Fallback"
        title="When nothing is prefilled"
        intro={
          <>
            <p>
              A first-time shopper, or a number with no saved details, gets the delivery details
              form instead. They type it once, and the rest of the checkout is unchanged: the same
              order summary, the same UPI-first payment step and the same confirmation.
            </p>
            <p>
              <TextLink href="/features/one-click-checkout">
                See both paths through the checkout
              </TextLink>
            </p>
          </>
        }
      />

      <FeatureFaq items={ADDRESS_AUTOFILL_FAQS} />
      <RelatedFeatures current="/features/address-autofill" />
      <FeatureCTA location="address_autofill_book_demo" />
    </>
  );
}
