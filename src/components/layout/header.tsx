"use client";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookDemoButton } from "@/components/cta/book-demo-button";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { BrandLockup } from "@/components/layout/brand-lockup";
import { ResourceRow, ResourcesMenu } from "@/components/navigation/resources-menu";
import { getAnnouncement } from "@/data/announcement";
import { PRIMARY_NAV, RESOURCES_ROUTES } from "@/data/navigation";
import { DEMO_STORE_URL } from "@/data/site";
import { cn } from "@/lib/utils";
import type { ResourceLink } from "@/types";

/**
 * Site header. Ported from the React `sections/Header.jsx` — same height, blur,
 * scroll behaviour, breakpoints, typography, spacing and CTA styling.
 *
 * Navbar order comes from `PRIMARY_NAV` in `data/navigation.ts`:
 *
 *   Product | Pricing | Calculator | Resources ▾ | Contact | View Demo Store | Request a Demo
 *
 * Desktop and mobile iterate that same array — Resources is a floating dropdown
 * on desktop and a collapsible submenu on mobile, both fed by `RESOURCES_NAV`.
 *
 * Client-side for the scroll listener and the menu toggles.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever navigation completes — including browser
  // back/forward. Adjusting state during render (rather than in an effect) is
  // React's documented pattern for "reset state when a value changes".
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
    setMobileResourcesOpen(false);
  }

  const announcement = getAnnouncement(pathname);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const resourcesActive = RESOURCES_ROUTES.some((href) => isActive(href));

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileResourcesOpen(false);
  };

  return (
    <header
      data-testid="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-border bg-background/75 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "bg-background/55 backdrop-blur-md",
      )}
    >
      {announcement ? (
        <AnnouncementBar announcement={announcement} collapsed={scrolled} />
      ) : null}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLockup variant="header" />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) =>
            item.kind === "menu" ? (
              <ResourcesMenu key={item.label} isActive={resourcesActive} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-brand"
                    : "text-ink/70 hover:text-brand dark:text-white/70",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={DEMO_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="header-demo-store"
            className="hidden items-center justify-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white xl:inline-flex"
          >
            View Demo Store
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <BookDemoButton
            location="header_book_demo"
            intent="demo"
            testId="header-cta"
            className="group hidden items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(25,107,245,0.22)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_18px_34px_rgba(25,107,245,0.3)] active:translate-y-0 sm:inline-flex"
          >
            Request a Demo
          </BookDemoButton>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink dark:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            data-testid="mobile-menu-toggle"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — same PRIMARY_NAV array, same order */}
      {open ? (
        <div
          id="mobile-nav"
          className={cn(
            "overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl md:hidden",
            announcement && !scrolled ? "max-h-[calc(100vh-6.25rem)]" : "max-h-[calc(100vh-4rem)]",
          )}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {PRIMARY_NAV.map((item) =>
              item.kind === "menu" ? (
                <MobileResources
                  key={item.label}
                  label={item.label}
                  items={item.items}
                  isActive={resourcesActive}
                  open={mobileResourcesOpen}
                  onToggle={() => setMobileResourcesOpen((value) => !value)}
                  onNavigate={closeMobileMenu}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary hover:text-brand",
                    isActive(item.href)
                      ? "bg-secondary text-brand"
                      : "text-ink/80 dark:text-white/80",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}

            <BookDemoButton
              location="header_book_demo"
              intent="demo"
              testId="mobile-header-cta"
              onNavigate={closeMobileMenu}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-3 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-deep"
            >
              Request a Demo
            </BookDemoButton>
            <a
              href={DEMO_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              data-testid="mobile-header-demo-store"
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand dark:text-white"
            >
              View Demo Store
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Resources inside the mobile menu: a collapsible submenu rather than the
 * desktop floating dropdown, so it never overflows a narrow viewport. It reuses
 * `ResourceRow`, so the icons, titles and descriptions are defined once.
 */
function MobileResources({
  label,
  items,
  isActive,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: ResourceLink[];
  isActive: boolean;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = "mobile-resources-panel";

  return (
    <div data-testid="mobile-resources-group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        data-testid="mobile-resources-trigger"
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary hover:text-brand",
          isActive || open ? "text-brand" : "text-ink/80 dark:text-white/80",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          id={panelId}
          data-testid="mobile-resources-panel"
          className="mt-1 animate-in fade-in-0 slide-in-from-top-1 duration-200 space-y-0.5 border-l border-border pl-2"
        >
          {items.map((item) => (
            <ResourceRow key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
