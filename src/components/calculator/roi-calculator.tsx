"use client";
import { NumberField } from "@/components/calculator/calculator-field";
import {
  CalculatorLayout,
  HeadlineFigure,
  ResultList,
  ResultRow,
  ResultStatement,
  ResultsHeading,
  toneFor,
} from "@/components/calculator/calculator-results";
import { useCalculatorForm } from "@/components/calculator/use-calculator-form";
import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { calculateRoi } from "@/lib/calculators/formulas";

const RULES = {
  investment: { kind: "currency" },
  revenue: { kind: "currency" },
  additionalCosts: { kind: "currency" },
} as const;

const REQUIRED = ["investment", "revenue"] as const;

export function RoiCalculator() {
  const form = useCalculatorForm({ calculator: "roi", rules: RULES, required: REQUIRED });
  const { raw, fields, setField, ready } = form;

  const result = calculateRoi({
    investment: form.valueOf("investment"),
    revenue: form.valueOf("revenue"),
    additionalCosts: form.valueOf("additionalCosts"),
  });
  const show = <T,>(value: T) => (ready ? value : null);

  return (
    <CalculatorLayout
      canReset={!form.isEmpty}
      onReset={form.reset}
      inputs={
        <>
          <NumberField
            label="Total investment"
            kind="currency"
            placeholder="e.g. 1,00,000"
            hint="What you spent: ad budget, stock, agency or app fees."
            value={raw.investment}
            field={fields.investment}
            onChange={(value) => setField("investment", value)}
          />
          <NumberField
            label="Revenue generated"
            kind="currency"
            placeholder="e.g. 1,60,000"
            hint="Revenue that came from this investment."
            value={raw.revenue}
            field={fields.revenue}
            onChange={(value) => setField("revenue", value)}
          />
          <NumberField
            className="sm:col-span-2"
            label="Additional costs"
            kind="currency"
            optional
            placeholder="0"
            hint="Product, shipping or payment fees for those orders, if they are not already in the investment."
            value={raw.additionalCosts}
            field={fields.additionalCosts}
            onChange={(value) => setField("additionalCosts", value)}
          />
        </>
      }
      results={
        <>
          <ResultsHeading>Results</ResultsHeading>
          <div className="mt-4">
            <HeadlineFigure
              label="Return on investment"
              value={formatPercent(show(result.roi))}
              tone={toneFor(ready, result.roi, "brand")}
            />
          </div>

          <ResultList className="mt-5 border-t border-border">
            <ResultRow label="Total investment" value={formatCurrency(show(result.totalInvestment))} />
            <ResultRow label="Revenue" value={formatCurrency(show(result.revenue))} />
            <ResultRow
              label="Net return"
              note="Revenue minus total investment"
              value={formatCurrency(show(result.netReturn))}
              negative={ready && result.netReturn < 0}
              emphasis
            />
          </ResultList>

          <div className="mt-6">
            {ready ? (
              <ResultStatement live>{roiSentence(result)}</ResultStatement>
            ) : (
              <ResultStatement tone="muted">
                {form.hasErrors
                  ? "Fix the highlighted fields to see your results."
                  : "Enter what you invested and the revenue it generated to see your ROI."}
              </ResultStatement>
            )}
          </div>
        </>
      }
    />
  );
}

function roiSentence(result: ReturnType<typeof calculateRoi>) {
  const investment = formatCurrency(result.totalInvestment);
  if (result.roi === null) {
    return "With no investment entered there is nothing to measure a return against.";
  }
  const difference = formatCurrency(Math.abs(result.netReturn));
  if (difference === "₹0") return `Your ${investment} investment broke even.`;
  return result.netReturn > 0
    ? `Your ${investment} investment returned ${difference} more than it cost.`
    : `Your ${investment} investment returned ${difference} less than it cost.`;
}
