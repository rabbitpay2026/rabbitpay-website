"use client";
import { useEffect } from "react";
import { trackCalculatorEvent } from "@/components/calculator/calculator-analytics";
import type { CalculatorId } from "@/data/calculators";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

/**
 * Reports `calculator_view` for the calculator whose page this is.
 *
 * Deferred by a task so that on a client-side navigation it runs after
 * `RouteAnalytics` has pointed gtag at the new URL; without that the event
 * would be recorded against the previous page. The cleanup also makes Strict
 * Mode's double-invoked effect send it once rather than twice.
 */
export function CalculatorViewTracker({ calculator }: { calculator: CalculatorId }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_VIEW, calculator);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [calculator]);

  return null;
}
