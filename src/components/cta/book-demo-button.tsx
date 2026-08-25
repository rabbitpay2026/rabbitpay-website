"use client";
import type { ReactNode } from "react";
import { openCalendly } from "@/lib/calendly";

/**
 * The scheduling CTA — "Book a Demo" in the navbar and FAQ page, "Start Free"
 * beneath the pricing table (which opened Calendly in the React original too).
 *
 * This is the smallest possible client boundary: every section that contains a
 * scheduling CTA stays a Server Component and only this button ships JS.
 *
 * It never navigates. There is deliberately no /book-a-demo route — `openCalendly`
 * opens the scheduler as an overlay on the current page, lazy-loading the widget
 * on first click. All Calendly logic lives in `lib/calendly.ts`; nothing is
 * duplicated here.
 *
 * Distinct from the lead form: this books a meeting, `LeadCaptureCard` posts to
 * /api/leads. The two flows never touch.
 */
export function BookDemoButton({
  location,
  className,
  children,
  testId,
  onBeforeOpen,
}: {
  /** Analytics label recorded on the existing `cta_click` event. */
  location: string;
  className?: string;
  children: ReactNode;
  testId?: string;
  /** Runs before the popup opens — used by the mobile menu to close itself. */
  onBeforeOpen?: () => void;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      className={className}
      onClick={() => {
        onBeforeOpen?.();
        // Fire-and-forget: openCalendly handles its own failures and never throws.
        void openCalendly(location);
      }}
    >
      {children}
    </button>
  );
}
