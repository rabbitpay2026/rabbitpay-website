import { Features } from "@/components/product/features";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product",
  description:
    "Prefilled checkout, verified COD with RTO control, and a UPI-first payment experience — plus the payment and marketing partners RabbitPay integrates with.",
  path: "/product",
  ogTitle: "RabbitPay Product - prefilled checkout, verified COD, UPI-first",
});

/**
 * `/product` — the complete Features section, which renders the Integrations
 * strip inline exactly as it does on the homepage. Same component, same content,
 * one source; only the heading level and top clearance differ.
 */
export default function ProductPage() {
  return <Features asPage headingLevel="h1" />;
}
