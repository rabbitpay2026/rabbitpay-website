"use client";
import type { ReactNode } from "react";
import { openCalendly, type SchedulerIntent } from "@/lib/calendly";

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
  intent,
  className,
  children,
  testId,
  onBeforeOpen,
}: {
  /** Analytics label for where the click came from. */
  location: string;
  /**
   * Which offer this instance presents — required rather than defaulted
   * because this one component renders both "Book a Demo" and "Start Free",
   * and a default would silently mislabel whichever call site forgot it. It
   * decides the event name: `demo_click` or `start_free_click`.
   */
  intent: SchedulerIntent;
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
        void openCalendly(location, intent);
      }}
    >
      {children}
    </button>
  );
}
