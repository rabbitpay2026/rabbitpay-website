"use client";
import { Headphones, MessageSquareText, Phone, Clock, Mail } from "lucide-react";
import { MagicCard } from "@/components/magic-ui/magic-card";
import { BorderBeam } from "@/components/magic-ui/border-beam";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import {
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_EMAIL,
} from "@/context/LeadFormContext";

export function CustomerSupport() {
  return (
    <section
      id="support"
      data-testid="customer-support"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <BlurFade className="lg:col-span-5">
            <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-border bg-background text-brand">
              <Headphones className="h-5 w-5" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              Support
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-5xl">
              Real humans.
              <br className="hidden sm:block" /> Ready to help.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Every RabbitPay merchant gets direct access to the team. No ticket maze, no hold
              music, no hidden handoffs.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/80 dark:text-white/80">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                Fast responses during business hours
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                Ops and tech on the same channel
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                Launch help when you need a faster rollout
              </li>
            </ul>
          </BlurFade>

          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
            <BlurFade delay={0.1}>
              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                label="Call us"
                value={SUPPORT_PHONE}
                href={SUPPORT_PHONE_HREF}
                accent
                testid="support-phone"
              />
            </BlurFade>
            <BlurFade delay={0.15}>
              <ContactCard
                icon={<MessageSquareText className="h-5 w-5" />}
                label="WhatsApp"
                value="Chat with a specialist"
                href={`https://wa.me/916295529286?text=${encodeURIComponent(
                  "Hi RabbitPay team - I'd like to know more.",
                )}`}
                testid="support-whatsapp"
              />
            </BlurFade>
            <BlurFade delay={0.2}>
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={SUPPORT_EMAIL}
                href={`mailto:${SUPPORT_EMAIL}`}
                testid="support-email"
              />
            </BlurFade>
            <BlurFade delay={0.25}>
              <ContactCard
                icon={<Clock className="h-5 w-5" />}
                label="Hours"
                value="Mon-Sat - 09:00 to 21:00 IST"
                testid="support-hours"
              />
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, value, href, accent, testid }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-testid={testid}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
    >
      <MagicCard className="rounded-2xl border-0 bg-transparent">
        <div className="relative flex items-start gap-4 p-1">
          <span
            className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-border ${
              accent ? "bg-brand text-white" : "bg-background text-brand"
            }`}
          >
            {icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 break-words text-base font-semibold text-ink dark:text-white">
              {value}
            </p>
          </div>
        </div>
        {accent ? <BorderBeam size={140} duration={9} colorFrom="#196BF5" colorTo="#4A8CFA" /> : null}
      </MagicCard>
    </Comp>
  );
}
