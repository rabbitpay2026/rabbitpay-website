import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { DotPattern } from "@/components/magic-ui/dot-pattern";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { FOOTER_COLUMNS } from "@/data/navigation";
import { SUPPORT_EMAIL, SUPPORT_PHONE, SUPPORT_PHONE_HREF } from "@/data/site";

/**
 * Site footer. Ported from the React `sections/Footer.jsx`.
 *
 * Stays a Server Component: the copyright year is now evaluated during the
 * server render instead of in the browser, which removes the `new Date()`
 * hydration-mismatch risk the original carried.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-border bg-background"
    >
      <DotPattern className="opacity-40 [mask-image:linear-gradient(to_top,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLockup variant="footer" />
            {/*
              Was "A premium 1-Click Checkout ... designed to improve
              conversions, reduce RTO, and deliver a faster checkout
              experience." Replaced because "premium" says nothing a merchant
              can act on, and the three outcomes it promised are results this
              site has no merchant data for. This names what the product does
              instead. Copy only — the footer's layout is untouched.
            */}
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              One-click checkout for Indian Shopify brands: address autofill, UPI-first payments
              and verified cash on delivery, in fewer steps than the default checkout.
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

          {/* Four columns — Features, Product, Company, Legal — as two rows
              of two on phones. */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink dark:text-white">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {/* `proxied` is internal but not rendered by this app,
                          so it needs a document load — see `NavLink.proxied`. */}
                      {link.external || link.proxied ? (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-brand"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-brand"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">(c) {year} RabbitPay - Made in India</p>
          <p className="text-xs text-muted-foreground">
            Faster Checkout -&gt; Lower RTO -&gt; Higher Conversions.
          </p>
        </div>
      </div>
    </footer>
  );
}
