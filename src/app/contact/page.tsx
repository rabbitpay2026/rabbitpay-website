import { ContactSection } from "@/components/contact/contact-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Reach the RabbitPay team by phone, WhatsApp or email, or leave your details and we will get back to you.",
  path: "/contact",
  ogTitle: "Contact RabbitPay",
});

/**
 * `/contact` — assembled from the existing support channel cards and the
 * existing lead-capture card. See `components/contact/contact-section.tsx`.
 */
export default function ContactPage() {
  return <ContactSection asPage />;
}
