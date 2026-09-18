"use client";
import { NumberField } from "@/components/calculator/calculator-field";
import {
  CalculatorLayout,
  HeadlineFigure,
  ResultList,
  ResultRow,
  ResultStatement,
  ResultsHeading,
  ResultsSection,
  StatusBadge,
} from "@/components/calculator/calculator-results";
import { useCalculatorForm } from "@/components/calculator/use-calculator-form";
import { CALCULATOR_DEFAULTS } from "@/data/calculator-defaults";
import {
  EMPTY_VALUE,
  formatCurrency,
  formatMultiple,
  formatPercent,
} from "@/lib/calculators/format";
import { calculateRoas } from "@/lib/calculators/formulas";

const RULES = {
  adSpend: { kind: "currency" },
  revenue: { kind: "currency" },
  marginBeforeAds: { kind: "percent" },
} as const;

const REQUIRED = ["adSpend", "revenue"] as const;

export function RoasCalculator() {
  const form = useCalculatorForm({
    calculator: "roas",
    rules: RULES,
    required: REQUIRED,
    defaults: CALCULATOR_DEFAULTS["roas"],
  });
  const { raw, fields, setField, ready } = form;

  const margin = fields.marginBeforeAds.value;
  const result = calculateRoas({
    adSpend: form.valueOf("adSpend"),
    revenue: form.valueOf("revenue"),
    marginBeforeAds: margin,
  });
  const show = <T,>(value: T) => (ready ? value : null);

  return (
    <CalculatorLayout
      canReset={!form.isPristine}
      onReset={form.reset}
      inputs={
        <>
          <NumberField
            label="Advertising spend"
            kind="currency"
            placeholder="e.g. 50,000"
            hint="Spend for the campaigns and dates you are measuring."
            value={raw.adSpend}
            field={fields.adSpend}
            onChange={(value) => setField("adSpend", value)}
          />
          <NumberField
            label="Revenue attributed to ads"
            kind="currency"
            placeholder="e.g. 2,00,000"
            hint="As reported by Meta, Google or your analytics."
            value={raw.revenue}
            field={fields.revenue}
            onChange={(value) => setField("revenue", value)}
          />
          <NumberField
            className="sm:col-span-2"
            label="Margin before ad spend"
            kind="percent"
            optional
            placeholder="e.g. 40"
            hint="Share of revenue left after product cost, shipping and payment fees. Adds your break-even ROAS."
            value={raw.marginBeforeAds}
            field={fields.marginBeforeAds}
            onChange={(value) => setField("marginBeforeAds", value)}
          />
        </>
      }
      results={
        <>
          <ResultsHeading>Results</ResultsHeading>
          <div className="mt-4">
            <HeadlineFigure
              label="Return on ad spend"
              value={formatMultiple(show(result.roas))}
              tone={ready && result.roas !== null ? "brand" : "empty"}
              caption={
                ready && result.roas !== null ? (
                  <>
                    ₹1 spent <span aria-hidden="true">→</span>
                    <span className="sr-only">brings in</span>{" "}
                    <span className="font-semibold text-ink dark:text-white">
                      {formatCurrency(result.roas)}
                    </span>{" "}
                    revenue
                  </>
                ) : (
                  <>₹1 spent → {EMPTY_VALUE} revenue</>
                )
              }
            />
          </div>

          <ResultList className="mt-5 border-t border-border">
            <ResultRow label="Advertising spend" value={formatCurrency(show(result.adSpend))} />
            <ResultRow label="Attributed revenue" value={formatCurrency(show(result.revenue))} />
            <ResultRow
              label="Ad spend as % of revenue"
              value={formatPercent(show(result.adSpendShare))}
            />
          </ResultList>

          {ready && margin !== null ? (
            <ResultsSection
              title={`Against a ${formatPercent(margin, 2)} margin`}
              aside={result.status ? <StatusBadge status={result.status} /> : null}
            >
              <ResultList>
                <ResultRow
                  label="Break-even ROAS"
                  value={formatMultiple(result.breakEvenRoas)}
                  emphasis
                />
                <ResultRow
                  label="Profit after ad spend"
                  note="Revenue × margin, minus ad spend"
                  value={formatCurrency(result.profitAfterAds)}
                  negative={(result.profitAfterAds ?? 0) < 0}
                  emphasis
                />
              </ResultList>
              {result.breakEvenRoas === null ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  With no margin before ad spend, no ROAS breaks even — every rupee of ads is a
                  loss.
                </p>
              ) : null}
            </ResultsSection>
          ) : (
            <div className="mt-6">
              <ResultStatement tone="muted">
                {form.hasErrors
                  ? "Fix the highlighted fields to see your results."
                  : ready
                    ? "ROAS measures revenue, not profit. Add your margin before ad spend to see the ROAS you need to break even."
                    : "Enter your ad spend and the revenue attributed to it to see your ROAS."}
              </ResultStatement>
            </div>
          )}
        </>
      }
    />
  );
}
