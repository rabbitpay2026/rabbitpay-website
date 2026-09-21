import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { CHECKOUT_DEMO_ID } from "@/data/anchors";
import { CHECKOUT_JOURNEY as STEPS } from "@/data/checkout-journey";
import { DEMO_STORE_URL } from "@/data/site";

/**
 * "See how RabbitPay checkout works" — the walkthrough of the mobile demo that
 * runs in the hero.
 *
 * The demo itself is deliberately not repeated here. There is one checkout demo
 * on this page — the interactive phone in the hero — and both CTAs below point
 * at it, so a visitor reads the five steps and then watches (or drives) the
 * same flow rather than meeting a second copy of it.
 *
 * Every step describes what the demo actually does, ending at the order
 * confirmation screen. The note says plainly that it is a simulation: no code
 * is sent and no payment is processed.
 *
 * The steps live in `data/checkout-journey.ts`, shared with the feature pages.
 */

export function CheckoutWalkthrough() {
  return (
    <section
      data-testid="checkout-walkthrough"
      className="relative border-y border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.65),rgba(255,255,255,0.9))] py-16 dark:bg-neutral-950/60 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand">
            Checkout demo
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tighter text-ink dark:text-white sm:text-4xl">
            See how RabbitPay checkout works
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A short mobile flow, from the shopper&apos;s details through to the order confirmation.
            The demo at the top of this page runs the same five steps — open it and try it yourself.{" "}
            <Link
              href="/features/one-click-checkout"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              See the full one-click checkout flow
            </Link>
          </p>
        </BlurFade>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <BlurFade key={step.title} delay={index * 0.07}>
              <li className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-brand"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink dark:text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            </BlurFade>
          ))}
        </ol>

        <BlurFade delay={0.2}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Same label, same destination as the hero's "Try the Checkout"
                and the header's "View Demo Store" — the live demo storefront,
                in a new tab. The secondary link stays on this page and goes to
                the interactive demo in the hero. */}
            <a
              href={DEMO_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="walkthrough-try-checkout"
              className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,107,245,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0 sm:w-auto"
            >
              Try the Checkout
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`#${CHECKOUT_DEMO_ID}`}
              data-testid="walkthrough-watch-demo"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white sm:w-auto"
            >
              Watch the demo
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            &quot;Try the Checkout&quot; opens the live demo storefront in a new tab.
            &quot;Watch the demo&quot; plays the simulation at the top of this page — no
            verification code is sent and no payment is processed there.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            For the friction points a checkout loses orders to, and the feature that addresses each,
            read the{" "}
            <Link
              href="/solutions/checkout-conversion"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              checkout conversion guide
            </Link>
            .
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
