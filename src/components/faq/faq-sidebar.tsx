"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqCategory } from "@/types";

/**
 * "On this page" category navigation.
 *
 * Desktop (lg+): a sticky column beside the content.
 * Below lg: the same list collapses into a horizontally scrollable chip row that
 * pins under the fixed header, so the categories stay reachable without a
 * permanently visible sidebar.
 *
 * The active category is tracked with an IntersectionObserver over the real
 * section headings — no scroll-position maths, and it stays correct when the
 * user jumps via an anchor. Anchors remain real `<a href="#slug">` links, so the
 * page works with JavaScript disabled and the URL stays shareable; smooth
 * scrolling comes from `html { scroll-behavior: smooth }` already in globals.css.
 */
export function FaqSidebar({ categories }: { categories: FaqCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost section currently intersecting the band below the
        // fixed header; fall back to the last one scrolled past.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Top inset clears the 64px header; bottom inset keeps the "active"
        // band near the top of the viewport rather than the middle.
        rootMargin: "-88px 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <>
      {/* Desktop: sticky column */}
      <nav
        aria-label="On this page"
        data-testid="faq-sidebar"
        className="sticky top-24 hidden lg:block"
      >
        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          On this page
        </p>
        <ul className="mt-4 space-y-1">
          {categories.map((category) => {
            const active = activeId === category.id;
            return (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  aria-current={active ? "true" : undefined}
                  data-testid={`faq-sidebar-link-${category.id}`}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-brand/[0.08] font-semibold text-brand"
                      : "font-medium text-ink/70 hover:bg-secondary hover:text-brand dark:text-white/70",
                  )}
                >
                  {category.title}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums",
                      active ? "bg-brand/10 text-brand" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {category.items.length}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Below lg: compact scrollable chip row, pinned under the header */}
      <nav
        aria-label="On this page"
        data-testid="faq-chips-nav"
        className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const active = activeId === category.id;
            return (
              <li key={category.id} className="flex-shrink-0">
                <a
                  href={`#${category.id}`}
                  aria-current={active ? "true" : undefined}
                  data-testid={`faq-chip-${category.id}`}
                  className={cn(
                    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-brand/30 bg-brand/[0.08] font-semibold text-brand"
                      : "border-border bg-background text-ink/70 dark:text-white/70",
                  )}
                >
                  {category.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
