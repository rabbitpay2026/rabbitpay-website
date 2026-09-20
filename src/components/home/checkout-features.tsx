import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { FeatureVisual } from "@/components/product/feature-visuals";
import { PAYMENTS_ID, PRODUCT_ID } from "@/data/anchors";
import { FEATURES } from "@/data/features";
import { cn } from "@/lib/utils";
import type { FeatureVisualKey } from "@/types";

/**
 * The homepage's first two content sections, in the shape the action plan asks
 * for: "Less typing at checkout" and "An easier way to pay".
 *
 * Both reuse what already exists — the bullets come from `data/features.ts`
 * (the same module the Features pages read) and the illustrations are the same
 * `FeatureVisual` components inside the same `MagicCard`, so nothing about the
 * look or the spacing is new. What changes is the heading each one sits under
 * and a lead line that says what the shopper gets, rather than how premium it
 * feels.
 *
 * Neither illustration is a production screenshot, and nothing here presents
 * them as one.
 */

/** Reads a feature by its visual key, so reordering `FEATURES` cannot silently
 *  swap what a homepage section shows. */
function feature(visual: FeatureVisualKey) {
  const match = FEATURES.find((item) => item.visual === visual);
  if (!match) throw new Error(`data/features.ts has no "${visual}" feature`);
  return match;
}

const PREFILL = feature("prefill");
const UPI = feature("upi");
const COD = feature("risk");

export function LessTypingSection() {
  return (
    <CheckoutFeatureSection
      id={PRODUCT_ID}
      eyebrow="Address autofill"
      heading="Less typing at checkout"
      lead="The shopper confirms their mobile number and their delivery details come back already filled in and editable, so the first checkout screen is something to check rather than a form to fill."
      bullets={PREFILL.bullets}
      visual="prefill"
      /* The content plan asks for a real product screenshot here and there
         isn't one in this repository — `public/` holds partner logos and
         nothing else. Until a genuine capture of the RabbitPay checkout
         exists, this stays the existing UI illustration and says so, rather
         than passing a mockup off as a screenshot. */
      caption="Illustration of the prefilled checkout step, shown with sample details."
    >
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Every prefilled field stays editable before payment.{" "}
        <Link
          href="/features/address-autofill"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          How address autofill works
        </Link>
      </p>
    </CheckoutFeatureSection>
  );
}

export function EasierWayToPaySection() {
  return (
    <CheckoutFeatureSection
      id={PAYMENTS_ID}
      eyebrow="UPI-first payments"
      heading="An easier way to pay"
      lead="UPI takes the primary position in the payment step, covering the apps Indian shoppers already have on their phone. Cards, netbanking, wallets and cash on delivery sit alongside it for anyone who wants them."
      bullets={UPI.bullets}
      visual="upi"
      reverse
    >
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        RabbitPay works with the payment gateway a store already uses, and supports running more
        than one.{" "}
        <Link
          href="/features/upi-checkout"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          See the payment experience
        </Link>
      </p>
    </CheckoutFeatureSection>
  );
}

/**
 * COD verification, mentioned briefly below the two main features rather than
 * carried as the headline message — one row, no figures. The full explanation
 * is in the FAQ, which is where the link goes: there is no dedicated COD page.
 */
export function CodVerificationNote() {
  return (
    <section data-testid="cod-note" className="relative pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:px-8">
            <span className="inline-grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl border border-border bg-background text-brand">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-ink dark:text-white sm:text-lg">
                Cash on delivery stays, with verification around it
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {COD.body} Pending orders are screened before dispatch and risk checks run before
                fulfillment.{" "}
                <Link
                  href="/faq#checkout"
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  How verified COD works
                </Link>
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

function CheckoutFeatureSection({
  id,
  eyebrow,
  heading,
  lead,
  bullets,
  visual,
  caption,
  reverse,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  lead: string;
  bullets: string[];
  visual: FeatureVisualKey;
  /** Line under the visual, where it needs to say what the visual is. */
  caption?: string;
  reverse?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} data-testid={`section-${id}`} className="relative scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <BlurFade className={reverse ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.08] tracking-tighter text-ink dark:text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{lead}</p>
            <ul className="mt-6 space-y-3">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm text-ink/80 dark:text-white/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                  {bullet}
                </li>
              ))}
            </ul>
            {children}
          </BlurFade>

          <BlurFade
            delay={0.12}
            className={cn(reverse ? "lg:order-1 lg:col-span-6" : "lg:col-span-6")}
          >
            <MagicCard className="rounded-[28px] border-border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:bg-white/5 sm:p-8">
              <FeatureVisual visual={visual} />
            </MagicCard>
            {caption ? (
              <p className="mt-3 text-center text-xs text-muted-foreground">{caption}</p>
            ) : null}
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
