import { SCREEN_WIDTH } from "@/components/home/mock-checkout-data";
import { MockCheckoutUI } from "@/components/home/mock-checkout-ui";
import { IPhone15Pro } from "@/components/magic-ui/iphone-15-pro";

/**
 * The checkout simulation from the homepage hero — the same `MockCheckoutUI`
 * in the same `IPhone15Pro` frame — shown on its own, without the hero's
 * floating callouts.
 *
 * It is a local simulation, and the caption says so: it plays the five-step
 * journey with sample details, sends no code and processes no payment. The
 * real checkout is on the live demo storefront, which the page links beside it.
 *
 * Kept out of `page-parts.tsx` so the simulation's client bundle is only
 * loaded by the page that renders it.
 */
export function CheckoutDemo() {
  return (
    <figure data-testid="feature-checkout-demo">
      <div className="relative mx-auto w-[78%] max-w-[320px] sm:w-[60%] lg:w-full">
        <div
          aria-hidden="true"
          className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_30%,rgba(25,107,245,0.3),transparent_58%)] blur-2xl"
        />
        <IPhone15Pro screenWidth={SCREEN_WIDTH}>
          <MockCheckoutUI />
        </IPhone15Pro>
      </div>
      <figcaption className="mx-auto mt-4 max-w-xs text-center text-xs leading-relaxed text-muted-foreground">
        Interactive simulation of the RabbitPay checkout with sample details. It plays on its own
        and you can tap through it — no code is sent and no payment is processed.
      </figcaption>
    </figure>
  );
}
