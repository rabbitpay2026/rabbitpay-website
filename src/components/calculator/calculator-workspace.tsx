"use client";
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { trackCalculatorEvent } from "@/components/calculator/calculator-analytics";
import { CalculatorExplainer } from "@/components/calculator/calculator-explainer";
import { HighProfitCalculator } from "@/components/calculator/high-profit-calculator";
import { ProfitMarginCalculator } from "@/components/calculator/profit-margin-calculator";
import { RevenueCalculator } from "@/components/calculator/revenue-calculator";
import { RoasCalculator } from "@/components/calculator/roas-calculator";
import { RoiCalculator } from "@/components/calculator/roi-calculator";
import { CALCULATORS, DEFAULT_CALCULATOR, type CalculatorId } from "@/data/calculators";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const PANELS: Record<CalculatorId, ComponentType> = {
  "profit-margin": ProfitMarginCalculator,
  roi: RoiCalculator,
  roas: RoasCalculator,
  "high-profit": HighProfitCalculator,
  revenue: RevenueCalculator,
};

const tabId = (id: CalculatorId) => `calculator-tab-${id}`;
const panelId = (id: CalculatorId) => `calculator-panel-${id}`;

/**
 * The calculator selector and the five calculators, all on /calculator.
 *
 * Switching is local state — the URL never changes and nothing navigates. The
 * selector follows the WAI-ARIA tabs pattern: one tab stop, arrow keys and
 * Home/End move between calculators, and the selected tab is marked by weight,
 * a raised surface and `aria-selected`, not by colour alone.
 *
 * Every panel stays mounted and inactive ones are `hidden`. That keeps what a
 * merchant typed into one calculator when they look at another, and puts all
 * five explanations in the server-rendered HTML for crawlers.
 *
 * `ph-no-capture` keeps the inputs and results out of PostHog autocapture and
 * session recordings: the numbers are the merchant's finances.
 */
export function CalculatorWorkspace() {
  const [active, setActive] = useState<CalculatorId>(DEFAULT_CALCULATOR);
  const tabRefs = useRef<Partial<Record<CalculatorId, HTMLButtonElement | null>>>({});

  useEffect(() => {
    /*
      Deferred by a task. On a client-side navigation to /calculator this effect
      runs before `RouteAnalytics` has pointed gtag at the new URL, and an event
      sent now would be recorded against the previous page. The cleanup also
      makes Strict Mode's double-invoked effect send it once, not twice.
    */
    const timer = window.setTimeout(() => {
      trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_VIEW, DEFAULT_CALCULATOR);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const select = (id: CalculatorId) => {
    if (id === active) return;
    setActive(id);
    trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_SELECTED, id);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = CALCULATORS.findIndex((calculator) => calculator.id === active);
    const last = CALCULATORS.length - 1;
    const nextIndex = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (nextIndex === undefined) return;

    event.preventDefault();
    const next = CALCULATORS[nextIndex].id;
    select(next);
    const tab = tabRefs.current[next];
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <section aria-label="Calculators" className="relative pb-20 pt-8 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Choose a calculator"
            className="flex min-w-max gap-1 rounded-2xl border border-border bg-muted/60 p-1.5 lg:min-w-0"
          >
            {CALCULATORS.map((calculator) => {
              const selected = calculator.id === active;
              return (
                <button
                  key={calculator.id}
                  ref={(element) => {
                    tabRefs.current[calculator.id] = element;
                  }}
                  id={tabId(calculator.id)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId(calculator.id)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(calculator.id)}
                  onKeyDown={onTabKeyDown}
                  data-testid={`calculator-tab-${calculator.id}`}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-left text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand/40 lg:flex-1 lg:px-5 lg:py-3",
                    selected
                      ? "bg-white font-semibold text-brand shadow-[0_2px_8px_rgba(15,23,42,0.08)] ring-1 ring-border dark:bg-white/10"
                      : "font-medium text-ink/70 hover:bg-white/60 hover:text-ink dark:text-white/70 dark:hover:bg-white/5",
                  )}
                >
                  <span className="block whitespace-nowrap">{calculator.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 hidden whitespace-nowrap text-xs font-normal lg:block",
                      selected ? "text-muted-foreground" : "text-muted-foreground/80",
                    )}
                  >
                    {calculator.tabHint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {CALCULATORS.map((calculator) => {
          const Panel = PANELS[calculator.id];
          return (
            <div
              key={calculator.id}
              id={panelId(calculator.id)}
              role="tabpanel"
              aria-labelledby={tabId(calculator.id)}
              hidden={calculator.id !== active}
              data-testid={`calculator-panel-${calculator.id}`}
            >
              <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
                <div className="border-b border-border px-5 py-5 sm:px-8 sm:py-6">
                  <h2 className="text-xl font-semibold tracking-tight text-ink dark:text-white sm:text-2xl">
                    {calculator.title}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {calculator.summary}
                  </p>
                </div>
                <div className="ph-no-capture">
                  <Panel />
                </div>
              </div>

              <CalculatorExplainer calculator={calculator} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
