import {
  Banknote,
  CreditCard,
  Landmark,
  QrCode,
  RefreshCcw,
  Smartphone,
  SplitSquareHorizontal,
  Wallet,
} from "lucide-react";
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
import { UPI_FAQS } from "@/data/feature-faqs";
import { PAYMENT_PARTNERS, UPI_APPS } from "@/data/integrations";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/features/upi-checkout");

/**
 * `/features/upi-checkout`.
 *
 * Sources: FAQ `what-payment-methods`, `existing-payment-gateway`,
 * `multiple-payment-gateways`, `settlements`, `part-payment` and
 * `when-am-i-charged`; the UPI-first feature and its bullets in
 * `data/features.ts` ("fast fallback to other payment methods"); `UPI_APPS`
 * and `PAYMENT_PARTNERS` in `data/integrations.ts`; the payment rows of the
 * checkout simulation; and RabbitPay's documentation for UPI QR payments
 * through Razorpay.
 *
 * On unsuccessful payments the page states only what is published — the
 * other methods stay in the same payment step, and the transaction fee applies
 * to successful orders only. Retry, timeout and refund behaviour is not
 * documented on the site, so none is described.
 */
const UPI_APP_NAMES = UPI_APPS.map((app) => app.name);
const UPI_APP_LIST = `${UPI_APP_NAMES.slice(0, -1).join(", ")} and ${UPI_APP_NAMES[UPI_APP_NAMES.length - 1]}`;

export default function UpiCheckoutPage() {
  return (
    <>
      <JsonLd data={buildPageJsonLd("/features/upi-checkout")} />

      <PageHeader
        path="/features/upi-checkout"
        eyebrow="UPI checkout"
        title="UPI checkout for Shopify stores"
        intro={
          <p>
            UPI takes the first position in the RabbitPay payment step, covering the apps Indian
            shoppers already have on their phone — {UPI_APP_LIST}. Cards, netbanking, wallets and
            cash on delivery sit alongside it for anyone who wants them.
          </p>
        }
        actions={
          <>
            <BookDemoAction location="upi_checkout_book_demo" />
            <DemoStoreAction label="Try it on the demo store" />
          </>
        }
        aside={
          <Figure caption="The UPI apps the payment step covers, shown with each app's own logo. Not a screenshot of the checkout.">
            <FeatureVisual visual="upi" />
          </Figure>
        }
      />

      <PageSection
        id="how-it-works"
        tone="band"
        eyebrow="How it works"
        title="The payment step, on a phone"
        intro={
          <p>
            Payment is the fourth step of the checkout, on the same screen as the order summary. The{" "}
            <TextLink href="/features/one-click-checkout">
              checkout simulation on the one-click checkout page
            </TextLink>{" "}
            plays it with sample details, and the live demo store runs the real one.
          </p>
        }
      >
        <StepList
          columns={4}
          label="Paying with UPI"
          steps={[
            {
              title: "Details confirmed",
              body: "The shopper reaches payment with their delivery details already on screen.",
            },
            {
              title: "UPI comes first",
              body: "UPI sits at the top of the payment options, ahead of the other methods.",
            },
            {
              title: "Pay in the app",
              body: "The shopper completes the payment in the UPI app they already use.",
            },
            {
              title: "Order confirmed",
              body: "The order is placed and the shopper lands on the confirmation.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        id="payment-methods"
        eyebrow="Payment methods"
        title="UPI first, with the rest alongside"
        intro={
          <p>
            The payment options a shopper can be offered. Which ones your store shows depends on the
            gateway and rules you set up.
          </p>
        }
      >
        <FactGrid
          facts={[
            { Icon: Smartphone, title: "UPI", body: `Through ${UPI_APP_LIST}.` },
            { Icon: CreditCard, title: "Debit and credit cards", body: "For shoppers who prefer to pay by card." },
            { Icon: Landmark, title: "Netbanking", body: "Direct from the shopper's bank account." },
            { Icon: Wallet, title: "Wallets", body: "Listed alongside the other prepaid options." },
            {
              Icon: Banknote,
              title: "Cash on delivery",
              body: "Verified COD, with orders screened before dispatch.",
            },
            {
              Icon: SplitSquareHorizontal,
              title: "Part payment",
              body: "Part of the order value online, the rest on delivery.",
            },
          ]}
        />
      </PageSection>

      <PageSection
        id="gateways"
        tone="band"
        eyebrow="Gateways"
        title="Your gateway stays"
        intro={
          <>
            <p>
              RabbitPay works with the payment gateway your store already uses and supports running
              more than one. That gateway keeps handling settlements, so your settlement process
              does not change.
            </p>
            <p>
              Payment partners RabbitPay lists:{" "}
              {PAYMENT_PARTNERS.map((partner) => partner.name).join(", ")}.{" "}
              <TextLink href="/integrations">See setup requirements</TextLink>
            </p>
          </>
        }
      >
        <FactGrid
          columns={2}
          facts={[
            {
              Icon: QrCode,
              title: "UPI QR inside the checkout (Razorpay)",
              body: (
                <>
                  For stores on Razorpay, a shopper who picks UPI can show a QR code in the checkout
                  and scan it with their UPI app, without a redirect to a separate payment page.
                  The QR code is created once in Razorpay.{" "}
                  <TextLink href="/documentation/product/upi-qr-payments" proxied>
                    Setup guide
                  </TextLink>
                </>
              ),
            },
            {
              Icon: RefreshCcw,
              title: "Payment option order",
              body: (
                <>
                  Payment rules in the RabbitPay Dashboard decide which option shoppers see first —
                  for example, full prepaid payment above cash on delivery.{" "}
                  <TextLink href="/documentation/dashboard-handbook/payment-option-priority" proxied>
                    How to set it
                  </TextLink>
                </>
              ),
            },
          ]}
        />
      </PageSection>

      <PageSection
        id="unsuccessful-payments"
        eyebrow="If a payment does not go through"
        title="What is published about incomplete payments"
      >
        <div className="max-w-2xl">
          <CheckList
            items={[
              "The other payment methods stay available in the same payment step, so a shopper whose UPI payment does not complete can choose another way to pay.",
              "RabbitPay's transaction fee applies to successful orders only. An order that does not complete is not charged.",
              <>
                Retry, timeout and refund handling for a specific gateway is not described on this
                site — <TextLink href="/contact">ask the team</TextLink> to walk through it for
                yours.
              </>,
            ]}
          />
        </div>
      </PageSection>

      <FeatureFaq items={UPI_FAQS} />
      <RelatedFeatures current="/features/upi-checkout" />
      <FeatureCTA location="upi_checkout_book_demo" />
    </>
  );
}
