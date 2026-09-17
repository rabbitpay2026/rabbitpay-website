import type { CalculatorId } from "@/data/calculators";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type CalculatorEvent =
  | typeof ANALYTICS_EVENTS.CALCULATOR_VIEW
  | typeof ANALYTICS_EVENTS.CALCULATOR_SELECTED
  | typeof ANALYTICS_EVENTS.CALCULATOR_CALCULATE
  | typeof ANALYTICS_EVENTS.CALCULATOR_RESET;

/**
 * The only way calculator code reports to analytics.
 *
 * It takes a calculator id and nothing else, so no revenue, cost, ad spend,
 * order value or fee a merchant types can be attached to an event — not by a
 * later edit, and not by accident.
 */
export function trackCalculatorEvent(event: CalculatorEvent, calculator: CalculatorId) {
  trackEvent(event, { calculator });
}
