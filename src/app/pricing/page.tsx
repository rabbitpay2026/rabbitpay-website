import { Pricing } from "@/components/pricing/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "1% on successful prepaid orders and 0.3% on successful COD orders. No setup fee, unlimited monthly volume, and an enterprise plan for 50k+ orders a month.",
  path: "/pricing",
  ogTitle: "RabbitPay Pricing - 1% prepaid, 0.3% COD, zero setup fee",
});

/**
 * `/pricing` — the complete pricing comparison table and CTAs, rendered from the
 * same component the homepage uses. "Talk to Sales" has no demo section on this
 * route, so it routes to the homepage one (see `cta/talk-to-sales-button.tsx`).
 */
export default function PricingPage() {
  return <Pricing asPage headingLevel="h1" />;
}
