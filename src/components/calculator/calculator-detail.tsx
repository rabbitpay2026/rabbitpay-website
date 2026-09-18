import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { CalculatorExplainer } from "@/components/calculator/calculator-explainer";
import { CalculatorNav } from "@/components/calculator/calculator-nav";
import { CalculatorViewTracker } from "@/components/calculator/calculator-view-tracker";
import { HighProfitCalculator } from "@/components/calculator/high-profit-calculator";
import { ProfitMarginCalculator } from "@/components/calculator/profit-margin-calculator";
import { RevenueCalculator } from "@/components/calculator/revenue-calculator";
import { RoasCalculator } from "@/components/calculator/roas-calculator";
import { RoiCalculator } from "@/components/calculator/roi-calculator";
import type { CalculatorContent, CalculatorId } from "@/data/calculators";

const FORMS: Record<CalculatorId, ComponentType> = {
  "profit-margin": ProfitMarginCalculator,
  roi: RoiCalculator,
  roas: RoasCalculator,
  "high-profit": HighProfitCalculator,
  revenue: RevenueCalculator,
};

/**
 * One calculator's page: heading, the switcher to the other four, the form and
 * its results, and the explanation of the formulas beneath.
 *
 * Shared by all five routes so they differ only by their entry in
 * `data/calculators.ts`.
 *
 * `ph-no-capture` keeps the inputs and results out of PostHog autocapture and
 * session recordings: the numbers are the merchant's finances.
 */
export function CalculatorDetail({ calculator }: { calculator: CalculatorContent }) {
  const Form = FORMS[calculator.id];

  return (
    <>
      <CalculatorViewTracker calculator={calculator.id} />

      <section className="relative border-b border-border bg-[linear-gradient(180deg,rgba(232,241,254,0.55),rgba(255,255,255,0))] pb-8 pt-28 md:pb-10 md:pt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <li>
                <Link href="/calculator" className="transition-colors hover:text-brand">
                  Calculator
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <span className="text-brand" aria-current="page">
                  {calculator.label}
                </span>
              </li>
            </ol>
          </nav>

          <h1 className="mt-5 max-w-3xl text-[30px] font-semibold leading-[1.08] tracking-tighter text-ink dark:text-white sm:text-4xl md:text-[44px]">
            {calculator.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {calculator.summary}
          </p>
        </div>
      </section>

      <section className="relative pb-20 pt-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CalculatorNav active={calculator.id} />

          <div className="ph-no-capture mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <Form />
          </div>

          <CalculatorExplainer calculator={calculator} />
        </div>
      </section>
    </>
  );
}
