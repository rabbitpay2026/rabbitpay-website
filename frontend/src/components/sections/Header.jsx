"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  RABBITPAY_LOGO,
  RABBITPAY_WHITE_LOGO,
  RABBITPAY_ICON,
  COD_KING_ICON,
} from "@/context/LeadFormContext";
import { openCalendly } from "@/lib/calendly";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#pricing", label: "Pricing" },
  { href: "#support", label: "Support" },
  { href: "#support", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleStartFree = (e) => {
    e.preventDefault();
    openCalendly("header_start_free");
  };

  return (
    <header
      data-testid="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-border bg-background/75 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          : "bg-background/55 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" data-testid="header-logo" className="inline-flex items-center">
          <span className="inline-flex sm:hidden h-10 w-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <img src={RABBITPAY_ICON} alt="RabbitPay" className="h-6 w-6" />
          </span>
          <span className="hidden flex-col items-start gap-0.5 sm:flex">
            <span className="inline-flex items-center">
              <img src={RABBITPAY_LOGO} alt="RabbitPay" className="h-10 w-auto dark:hidden" />
              <img src={RABBITPAY_WHITE_LOGO} alt="RabbitPay" className="hidden h-10 w-auto dark:block" />
            </span>
            <span className="inline-flex items-center gap-1 pl-0.5 text-[11px] font-medium leading-none text-[#6B7280]">
              <img src={COD_KING_ICON} alt="" aria-hidden="true" className="h-3 w-3 rounded-[3px] object-contain" />
              Powered by COD King
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-brand dark:text-white/70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStartFree}
            data-testid="header-cta"
            className="group hidden items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(25,107,245,0.22)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_18px_34px_rgba(25,107,245,0.3)] active:translate-y-0 sm:inline-flex"
          >
            Book a Demo
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink dark:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-secondary hover:text-brand dark:text-white/80"
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => {
                setOpen(false);
                handleStartFree(e);
              }}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-deep"
              data-testid="mobile-header-cta"
            >
              Book a Demo
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
