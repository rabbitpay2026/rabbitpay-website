"use client";
import { Phone, Mail } from "lucide-react";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import {
  RABBITPAY_LOGO,
  RABBITPAY_WHITE_LOGO,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_EMAIL,
} from "@/context/LeadFormContext";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "1-Click Checkout", href: "#product" },
      { label: "Conversion Metrics", href: "#metrics" },
      { label: "Pricing", href: "#pricing" },
      { label: "Support", href: "#support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#support" },
      { label: "Careers", href: `mailto:${SUPPORT_EMAIL}?subject=Careers` },
      { label: "Press", href: `mailto:${SUPPORT_EMAIL}?subject=Press` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: `mailto:${SUPPORT_EMAIL}?subject=Privacy` },
      { label: "Terms", href: `mailto:${SUPPORT_EMAIL}?subject=Terms` },
      { label: "Security", href: `mailto:${SUPPORT_EMAIL}?subject=Security` },
    ],
  },
];

export function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-border bg-background"
    >
      <DotPattern className="opacity-40 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center">
              <img src={RABBITPAY_LOGO} alt="RabbitPay" className="h-8 w-auto dark:hidden" />
              <img src={RABBITPAY_WHITE_LOGO} alt="RabbitPay" className="hidden h-8 w-auto dark:block" />
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A premium 1-Click Checkout for Indian D2C brands, designed to improve conversions,
              reduce RTO, and deliver a faster checkout experience.
            </p>

            <div className="mt-5 space-y-2">
              <a
                href={SUPPORT_PHONE_HREF}
                data-testid="footer-phone"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand dark:text-white"
              >
                <Phone className="h-4 w-4 text-brand" />
                {SUPPORT_PHONE}
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                data-testid="footer-email"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand dark:text-white"
              >
                <Mail className="h-4 w-4 text-brand" />
                {SUPPORT_EMAIL}
              </a>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Zero setup fee - No hidden charges - 1:1 support
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink dark:text-white">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            (c) {new Date().getFullYear()} RabbitPay - Made in India
          </p>
          <p className="text-xs text-muted-foreground">
            Faster Checkout -> Lower RTO -> Higher Conversions.
          </p>
        </div>
      </div>
    </footer>
  );
}
