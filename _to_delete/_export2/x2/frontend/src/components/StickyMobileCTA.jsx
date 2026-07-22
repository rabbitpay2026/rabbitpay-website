"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLeadForm } from "@/context/LeadFormContext";
import { cn } from "@/lib/utils";

/**
 * Sticky mobile CTA bar.
 * - Mobile only (< md).
 * - Slides in once the user has scrolled past the hero.
 * - Auto-hides when the Demo CTA section or footer enters the viewport, so it
 *   never competes with the on-screen closing CTA.
 * - Safe-area padded for iOS home indicator.
 * - "Start Free" opens the global lead-capture modal.
 */
export function StickyMobileCTA() {
  const { openLeadForm } = useLeadForm();
  const [scrolled, setScrolled] = useState(false);
  const [reachedCTA, setReachedCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // 1) show after first viewport
      const past = y > vh * 0.7;
      // 2) hide once the demo CTA or footer top enters the viewport
      const demoCTA = document.querySelector('[data-testid="demo-cta"]');
      const footer = document.querySelector('[data-testid="footer"]');
      let reached = false;
      if (demoCTA) {
        const r = demoCTA.getBoundingClientRect();
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
    trackEvent("cta_click", { location: "sticky_mobile", label: "Start Free" });
    openLeadForm({ source: "sticky_mobile" });
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
      <div className="mx-auto flex max-w-2xl items-center px-4 py-3">
        <button
          type="button"
          onClick={onStart}
          data-testid="sticky-cta-start"
          tabIndex={visible ? 0 : -1}
          className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:translate-y-[1px]"
        >
          Start Free
          <ArrowRight className="h-4 w-4 transition-transform group-active:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
