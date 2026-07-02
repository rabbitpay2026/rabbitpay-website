"use client";
import { Rabbit } from "lucide-react";
import { DotPattern } from "@/components/magic-ui/dot-pattern";

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
      { label: "About", href: "mailto:hello@rabbitpay.in" },
      { label: "Careers", href: "mailto:hello@rabbitpay.in?subject=Careers" },
      { label: "Press", href: "mailto:hello@rabbitpay.in?subject=Press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#integrations" },
      { label: "Changelog", href: "#integrations" },
      { label: "Status", href: "#integrations" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "mailto:hello@rabbitpay.in?subject=Privacy" },
      { label: "Terms", href: "mailto:hello@rabbitpay.in?subject=Terms" },
      { label: "Security", href: "mailto:hello@rabbitpay.in?subject=Security" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@rabbitpay.in", href: "mailto:hello@rabbitpay.in" },
      { label: "Support", href: "#support" },
      { label: "Sales", href: "mailto:hello@rabbitpay.in?subject=Sales" },
    ],
  },
];

/**
 * FOOTER
 * Uses: Magic UI Dot Pattern backdrop.
 */
export function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-border bg-background"
    >
      <DotPattern className="opacity-40 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-deep text-white shadow-sm">
                <Rabbit className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <span className="text-lg font-semibold tracking-tight text-ink dark:text-white">
                rabbitpay
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A 1-Click Checkout for Shopify & D2C brands — designed to improve
              conversions, reduce RTO, and deliver a faster checkout experience.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Zero setup fee · No hidden charges · 1:1 support
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 lg:col-span-8">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
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
