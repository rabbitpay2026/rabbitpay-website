"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { InteractiveHoverButton } from "@/components/magic-ui/interactive-hover-button";
import { ThemeToggle } from "@/components/magic-ui/theme-toggle";
import {
  RABBITPAY_LOGO,
  RABBITPAY_WHITE_LOGO,
  RABBITPAY_ICON,
} from "@/context/LeadFormContext";
import { scrollToLeadForm, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#integrations", label: "Support" },
  { href: "#lead-capture", label: "Contact" },
];

/**
 * Sticky header — logo image, in-page anchor nav, theme toggle, primary CTA
 * smooth-scrolls to the inline homepage lead-capture form (no popups / redirects).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    trackEvent("cta_click", { location: "header_cta", label: "Start Free" });
    scrollToLeadForm("header_cta");
  };

  return (
    <header
      data-testid="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          : "backdrop-blur-md bg-background/40",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#top"
          data-testid="header-logo"
          className="group inline-flex items-center"
        >
          <span className="inline-flex sm:hidden h-9 w-9 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <img
              src={RABBITPAY_ICON}
              alt="RabbitPay"
              className="h-5 w-5"
            />
          </span>
          <span className="hidden items-center sm:inline-flex">
            <img
              src={RABBITPAY_LOGO}
              alt="RabbitPay"
              className="h-7 w-auto dark:hidden"
            />
            <img
              src={RABBITPAY_WHITE_LOGO}
              alt="RabbitPay"
              className="hidden h-7 w-auto dark:block"
            />
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink/70 dark:text-white/70 transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:inline-flex">
            <button
              type="button"
              onClick={handleGetStarted}
              data-testid="header-cta"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-deep hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free
            </button>
          </div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink dark:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open ? (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 dark:text-white/80 hover:text-brand hover:bg-secondary"
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => {
                setOpen(false);
                handleGetStarted(e);
              }}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-deep"
              data-testid="mobile-header-cta"
            >
              Start Free
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
