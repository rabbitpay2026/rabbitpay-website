import type { ReactNode } from "react";
import {
  BookDemoAction,
  CheckList,
  FeatureCTA,
  FeatureFaq,
  PageHeader,
  PageSection,
  RelatedFeatures,
  SecondaryLink,
  TextLink,
} from "@/components/features/page-parts";
import { JsonLd } from "@/components/seo/json-ld";
import { INTEGRATIONS_FAQS } from "@/data/feature-faqs";
import { MARKETING_PARTNERS, PAYMENT_PARTNERS } from "@/data/integrations";
import { buildPageJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import type { PartnerLogo } from "@/types";

export const metadata = pageMetadata("/integrations");

/**
 * `/integrations` — what RabbitPay connects to, what each connection does, and
 * what setup needs.
 *
 * The list of partners is exactly `data/integrations.ts` — the same logos the
 * homepage strip (and `/product` before it) showed. Nothing is added because
 * it is popular or because another checkout supports it.
 *
 * Detail varies, honestly. Razorpay and Meta have published setup guides in
 * RabbitPay's documentation, so their requirements are spelled out and linked.
 * The other partners are listed on the site without a public setup guide, and
 * the page says that rather than inventing steps for them. Shopify setup
 * follows the documentation's collaborator-access guide, which agrees with the
 * site's "the team sets it up".
 */
const DOCS = "/documentation";

export default function IntegrationsPage() {
  const razorpay = PAYMENT_PARTNERS.find((partner) => partner.name === "Razorpay");
  const otherGateways = PAYMENT_PARTNERS.filter((partner) => partner.name !== "Razorpay");
  const meta = MARKETING_PARTNERS.find((partner) => partner.name === "Meta");
  const google = MARKETING_PARTNERS.filter((partner) => partner.name !== "Meta");

  return (
    <>
      <JsonLd data={buildPageJsonLd("/integrations")} />

      <PageHeader
        path="/integrations"
        eyebrow="Integrations"
        title="Shopify checkout integrations"
        intro={
          <p>
            RabbitPay runs on your Shopify store and in front of the payment gateway you already use.
            These are the platforms it lists — what each connection does, and what setup needs where
            RabbitPay has documented it.
          </p>
        }
        actions={
          <>
            <BookDemoAction location="integrations_book_demo" />
            <SecondaryLink href={DOCS} proxied>
              Read the documentation
            </SecondaryLink>
          </>
        }
      />

      <nav aria-label="Integration groups" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap gap-2">
          {[
            ["#platform", "Platform"],
            ["#payments", "Payment partners"],
            ["#marketing", "Marketing & analytics"],
            ["#limitations", "Limitations"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:text-white/80"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <PageSection
        id="platform"
        eyebrow="Platform"
        title="Shopify"
        intro={
          <p>
            RabbitPay is built specifically for Shopify stores. It replaces the checkout step; the
            store, its theme and its orders stay in Shopify.
          </p>
        }
      >
        <IntegrationCard
          title="Shopify"
          does="RabbitPay's checkout takes over the checkout step, and orders placed through it appear in Shopify admin."
          setup={[
            "Admin access to your Shopify store.",
            "In Shopify admin, open Settings → Users and permissions, copy the collaborator request code, and share it with your store URL. Never share your password.",
            "The RabbitPay team installs and configures the app — a store can be live within about an hour, with no documents required.",
            "Before going live, place a test order and check it appears in Shopify admin.",
          ]}
          guide={{
            href: `${DOCS}/getting-started/one-click-checkout`,
            label: "Shopify setup guide",
          }}
        />
      </PageSection>

      <PageSection
        id="payments"
        tone="band"
        eyebrow="Payment partners"
        title="Keep the gateway you already use"
        intro={
          <p>
            RabbitPay works with your existing payment gateway and supports running more than one.
            The gateway keeps handling settlements, so your settlement process does not change.
          </p>
        }
      >
        <div className="space-y-4">
          {razorpay ? (
            <IntegrationCard
              logo={razorpay}
              title="Razorpay"
              does={
                <>
                  Processes the checkout&apos;s payments and sends RabbitPay real-time payment
                  updates through a webhook. It also enables{" "}
                  <TextLink href="/features/upi-checkout">UPI QR payments</TextLink> inside the
                  checkout, without a redirect.
                </>
              }
              setup={[
                "A Razorpay business account, with administrator access to the Razorpay Dashboard.",
                "Razorpay API keys, generated in the Razorpay Dashboard.",
                "A webhook for RabbitPay, configured in Razorpay — required before payments can be accepted.",
                "For UPI QR at checkout: a QR code created once in Razorpay.",
              ]}
              guides={[
                { href: `${DOCS}/integrations/razorpay/generate-api-token`, label: "API keys" },
                { href: `${DOCS}/integrations/razorpay/configure-webhook`, label: "Webhook" },
                { href: `${DOCS}/integrations/razorpay/generate-qr-code`, label: "QR code" },
              ]}
            />
          ) : null}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold tracking-tight text-ink dark:text-white">
              Other payment partners
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              RabbitPay also lists these payment partners. There is no public setup guide for them
              yet: the RabbitPay team confirms and configures your gateway during onboarding.
            </p>
            <LogoGrid partners={otherGateways} />
          </div>
        </div>
      </PageSection>

      <PageSection
        id="marketing"
        eyebrow="Marketing & analytics"
        title="Meta and Google"
        intro={<p>Platforms RabbitPay lists for acquisition and reporting.</p>}
      >
        <div className="space-y-4">
          {meta ? (
            <IntegrationCard
              logo={meta}
              title="Meta"
              does="RabbitPay sends purchase, checkout and conversion events to Meta server-side through the Conversions API, on your behalf."
              setup={[
                "Access to the right Meta Business account, and permission for the dataset in Meta Events Manager.",
                "Your Meta Dataset (Pixel) ID — found in Events Manager, or in Shopify's Facebook & Instagram channel settings.",
                "A Conversions API access token, generated from the dataset's settings in Events Manager. Store it securely.",
              ]}
              guide={{
                href: `${DOCS}/integrations/meta-pixel/generate-access-token`,
                label: "Meta setup guide",
              }}
            />
          ) : null}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold tracking-tight text-ink dark:text-white">
              Google Ads and Google Analytics
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Listed as marketing and analytics partners. Which checkout events they receive and how
              they are set up is not yet published — confirm the details for your store with the
              team.
            </p>
            <LogoGrid partners={google} />
          </div>
        </div>
      </PageSection>

      <PageSection
        id="limitations"
        tone="band"
        eyebrow="Limitations"
        title="Compatibility and conditions"
      >
        <div className="max-w-2xl">
          <CheckList
            items={[
              "Shopify is the only ecommerce platform RabbitPay documents. Ask the team before planning around any other.",
              "UPI QR inside the checkout is documented for Razorpay. Ask about it for other gateways.",
              "The payment options a shopper sees depend on the gateway and payment rules you configure.",
              "For a technical issue with the gateway itself, your gateway's own support team is the right first contact.",
            ]}
          />
        </div>
      </PageSection>

      <FeatureFaq items={INTEGRATIONS_FAQS} />
      <RelatedFeatures current="/integrations" />
      <FeatureCTA
        location="integrations_book_demo"
        title="Check your stack with the team"
        body="Book a demo and tell the team which gateway and marketing tools your store runs — they will walk through what connects and what setup involves."
      />
    </>
  );
}

/**
 * One integration: what it does, what setup needs, and the published guide.
 * The logo is the partner's own mark from `public/logos/`.
 */
function IntegrationCard({
  logo,
  title,
  does,
  setup,
  guide,
  guides,
}: {
  logo?: PartnerLogo;
  title: string;
  does: ReactNode;
  setup: string[];
  guide?: { href: string; label: string };
  guides?: { href: string; label: string }[];
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        {logo ? (
          <span className="flex h-10 items-center rounded-xl border border-border bg-white px-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${logo.file}`}
              alt={`${logo.name} logo`}
              loading="lazy"
              className="h-6 w-auto max-w-[120px] object-contain"
            />
          </span>
        ) : null}
        <h3 className="text-lg font-semibold tracking-tight text-ink dark:text-white">{title}</h3>
      </div>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What it does
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/80 dark:text-white/80">{does}</p>
          {guide || guides ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Setup guides:{" "}
              {(guides ?? (guide ? [guide] : [])).map((item, index, all) => (
                <span key={item.href}>
                  <TextLink href={item.href} proxied>
                    {item.label}
                  </TextLink>
                  {index < all.length - 1 ? " · " : null}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What setup needs
          </p>
          <div className="mt-2">
            <CheckList items={setup} />
          </div>
        </div>
      </div>
    </article>
  );
}

function LogoGrid({ partners }: { partners: PartnerLogo[] }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner) => (
        <li
          key={partner.name}
          className="flex h-16 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${partner.file}`}
            alt={partner.withText ? "" : `${partner.name} logo`}
            loading="lazy"
            className={partner.mark ? "h-9 w-auto object-contain" : "max-h-7 w-auto max-w-full object-contain"}
          />
          {partner.withText ? (
            <span className="text-sm font-semibold text-[#111827]">{partner.name}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
