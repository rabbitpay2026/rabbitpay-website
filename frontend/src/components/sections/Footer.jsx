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
      { label: "COD Verification", href: "#product" },
      { label: "UPI Payments", href: "#product" },
      { label: "WhatsApp Utility", href: "#product" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#support" },
      { label: "Careers", href: `mailto:${"hello@rabbitpay.in"}?subject=Careers` },
      { label: "Press", href: `mailto:${"hello@rabbitpay.in"}?subject=Press` },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Support", href: "#integrations" },
      { label: "Contact", href: "#support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: `mailto:${"hello@rabbitpay.in"}?subject=Privacy` },
      { label: "Terms", href: `mailto:${"hello@rabbitpay.in"}?subject=Terms` },
      { label: "Security", href: `mailto:${"hello@rabbitpay.in"}?subject=Security` },
    ],
  },
];

/**
 * FOOTER — logo + phone + email + multi-column links + Dot Pattern.
 */
export function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-border bg-background"
    >
      <DotPattern className="opacity-40 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center">
              <img
                src={RABBITPAY_LOGO}
                alt="RabbitPay"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src={RABBITPAY_WHITE_LOGO}
                alt="RabbitPay"
                className="h-8 w-auto hidden dark:block"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A 1-Click Checkout for Shopify & D2C brands — designed to improve
              conversions, reduce RTO, and deliver a faster checkout experience.
            </p>

            {/* Contact block */}
            <div className="mt-5 space-y-2">
              <a
                href={SUPPORT_PHONE_HREF}
                data-testid="footer-phone"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink dark:text-white hover:text-brand transition-colors"
              >
                <Phone className="h-4 w-4 text-brand" />
                {SUPPORT_PHONE}
              </a>
              <div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  data-testid="footer-email"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink dark:text-white hover:text-brand transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand" />
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Zero setup fee · No hidden charges · 1:1 support
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink dark:text-white">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {l.label}
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
            © {new Date().getFullYear()} RabbitPay — Made in India 🇮🇳
          </p>
          <p className="text-xs text-muted-foreground">
            Faster Checkout → Lower RTO → Higher Conversions.
          </p>
        </div>
      </div>
    </footer>
  );
}
