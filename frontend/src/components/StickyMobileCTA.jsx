"use client";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { openCalendly, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Sticky mobile CTA bar.
 * - Mobile only (< md).
 * - Slides in once the user has scrolled past the hero.
 * - Auto-hides when the Final CTA section (or footer) enters the viewport, so
 *   it never competes with the on-screen closing CTAs.
 * - Safe-area padded for iOS home indicator.
 */
export function StickyMobileCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [reachedCTA, setReachedCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // 1) show after first viewport
      const past = y > vh * 0.7;
      // 2) hide once the final CTA or footer top enters the viewport
      const finalCTA = document.querySelector('[data-testid="final-cta"]');
      const footer = document.querySelector('[data-testid="footer"]');
      let reached = false;
      if (finalCTA) {
        const r = finalCTA.getBoundingClientRect();
        if (r.top <= vh * 0.85) reached = true;
      }
      if (!reached && footer) {
        const r = footer.getBoundingClientRect();
        if (r.top <= vh) reached = true;
      }
      setScrolled(past);
      setReachedCTA(reached);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = scrolled && !reachedCTA;

  const onStart = () => {
    trackEvent("cta_click", { location: "sticky_mobile", label: "Start free" });
    openCalendly("sticky_mobile_start");
  };
  const onDemo = () => {
    trackEvent("cta_click", { location: "sticky_mobile", label: "Book a demo" });
    openCalendly("sticky_mobile_demo");
  };

  return (
    <div
      aria-hidden={!visible}
      data-testid="sticky-mobile-cta"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300",
        "border-t border-border bg-background/90 backdrop-blur-xl",
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onStart}
          data-testid="sticky-cta-start"
          className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm active:translate-y-[1px]"
        >
          Start free
          <ArrowRight className="h-4 w-4 transition-transform group-active:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={onDemo}
          data-testid="sticky-cta-demo"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-white/70 dark:bg-white/5 px-4 py-3 text-sm font-medium text-ink dark:text-white backdrop-blur active:translate-y-[1px]"
        >
          <CalendarCheck2 className="h-4 w-4 text-brand" />
          Book a demo
        </button>
      </div>
    </div>
  );
}
