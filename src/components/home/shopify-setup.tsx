import { CreditCard, FileCheck2, Palette, ShoppingBag, Timer } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { Integrations } from "@/components/product/integrations";
import { SHOPIFY_ID } from "@/data/anchors";

/**
 * "Built for your Shopify store" — what a merchant actually has to do, and what
 * RabbitPay connects to.
 *
 * Every line below restates something the site already states elsewhere, and
 * each is traceable to a specific FAQ answer in `data/faq.ts`:
 *
 *   shopify-compatibility, setup-time, documents-required,
 *   existing-payment-gateway / multiple-payment-gateways / settlements,
 *   brand-customization
 *
 * No installation step, certification or compatibility claim is added here that
 * the FAQ does not carry — in particular the setup time is the FAQ's "within 1
 * hour", the same figure the hero chip and /what-is-rabbitpay use.
 *
 * The partner logos come from the existing Integrations strip, rendered without
 * its own heading so this section's heading is the only one.
 */
const SETUP_FACTS = [
  {
    Icon: ShoppingBag,
    title: "Built for Shopify",
    body: "RabbitPay is built specifically for Shopify stores and integrates without disrupting how the store runs today.",
  },
  {
    Icon: Timer,
    title: "The team sets it up",
    body: "Setup is handled by the RabbitPay team, and a store can be live within 1 hour.",
  },
  {
    Icon: FileCheck2,
    title: "No paperwork",
    body: "No documents, paperwork or lengthy verification process to get started.",
  },
  {
    Icon: CreditCard,
    title: "Keep your gateway",
    body: "Keep the payment gateway you already use — or more than one — and settlements carry on exactly as they are.",
  },
  {
    Icon: Palette,
    title: "Your branding",
    body: "The checkout carries your logo, colours and styling.",
  },
];

export function ShopifySetup() {
  return (
    <section
      id={SHOPIFY_ID}
      data-testid="shopify-setup"
      className="relative scroll-mt-24 pt-16 md:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Setup &amp; integrations
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tighter text-ink dark:text-white sm:text-4xl">
            Built for your Shopify store
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            RabbitPay replaces the checkout step on a Shopify store. The team installs and
            configures it, and the rest of the stack — gateway, settlements, branding — stays where
            it is.
          </p>
        </BlurFade>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SETUP_FACTS.map((fact, index) => (
            <BlurFade key={fact.title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-brand">
                  <fact.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 text-sm font-semibold text-ink dark:text-white">
                  {fact.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{fact.body}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* The existing integrations strip, minus its own heading. */}
      <Integrations headless />
    </section>
  );
}
