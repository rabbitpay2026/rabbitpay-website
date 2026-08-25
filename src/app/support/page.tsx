import { CustomerSupport } from "@/components/support/customer-support";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Support",
  description:
    "Every RabbitPay merchant gets direct access to the team - by phone, WhatsApp or email, Mon-Sat 09:00 to 21:00 IST. No ticket maze, no hold music.",
  path: "/support",
  ogTitle: "RabbitPay Support - real humans, ready to help",
});

/** `/support` — the complete support section, same component as the homepage. */
export default function SupportPage() {
  return <CustomerSupport asPage headingLevel="h1" />;
}
