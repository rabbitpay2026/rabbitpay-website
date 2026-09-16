import { Clock, Mail, MessageSquareText, Phone } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { ContactCard } from "@/components/support/contact-card";
import {
  SUPPORT_EMAIL,
  SUPPORT_HOURS,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_WHATSAPP_HREF,
} from "@/data/site";

/**
 * The four support channels, in the order the React site listed them.
 * Shared by the homepage support section, `/support` and `/contact` — the phone
 * number, WhatsApp link, email and hours are written down once, in `data/site.ts`.
 */
export function ContactChannels() {
  return (
    <>
      <BlurFade delay={0.1}>
        <ContactCard
          icon={<Phone className="h-5 w-5" />}
          label="Call us"
          value={SUPPORT_PHONE}
          href={SUPPORT_PHONE_HREF}
          accent
          testId="support-phone"
        />
      </BlurFade>
      <BlurFade delay={0.15}>
        <ContactCard
          icon={<MessageSquareText className="h-5 w-5" />}
          label="WhatsApp us"
          value="Chat with a specialist"
          href={SUPPORT_WHATSAPP_HREF}
          testId="support-whatsapp"
        />
      </BlurFade>
      <BlurFade delay={0.2}>
        <ContactCard
          icon={<Mail className="h-5 w-5" />}
          label="Email"
          value={SUPPORT_EMAIL}
          href={`mailto:${SUPPORT_EMAIL}`}
          testId="support-email"
        />
      </BlurFade>
      <BlurFade delay={0.25}>
        <ContactCard
          icon={<Clock className="h-5 w-5" />}
          label="Hours"
          value={SUPPORT_HOURS}
          testId="support-hours"
        />
      </BlurFade>
    </>
  );
}
