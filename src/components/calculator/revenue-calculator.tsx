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
} from "@/components/calculator/calculator-results";
import { useCalculatorForm } from "@/components/calculator/use-calculator-form";
import {
  formatCount,
  formatCurrency,
  formatCurrencyChange,
  formatPercent,
} from "@/lib/calculators/format";
import { calculateRevenue, type RevenueResult } from "@/lib/calculators/formulas";
import { cn } from "@/lib/utils";

const RULES = {
  sessions: { kind: "count" },
  conversionRate: { kind: "percent" },
  averageOrderValue: { kind: "currency" },
  growthRate: { kind: "percent", min: -100, minExclusive: true, max: 1000 },
} as const;

const REQUIRED = ["sessions", "conversionRate", "averageOrderValue"] as const;

export function RevenueCalculator() {
  const form = useCalculatorForm({ calculator: "revenue", rules: RULES, required: REQUIRED });
  const { raw, fields, setField, ready } = form;

  const result = calculateRevenue({
    sessions: form.valueOf("sessions"),
    conversionRate: form.valueOf("conversionRate"),
    averageOrderValue: form.valueOf("averageOrderValue"),
    growthRate: fields.growthRate.value,
  });
  const show = <T,>(value: T) => (ready ? value : null);

  return (
    <CalculatorLayout
      canReset={!form.isEmpty}
      onReset={form.reset}
      inputs={
        <>
          <NumberField
            label="Monthly visitors / sessions"
            kind="count"
            placeholder="e.g. 50,000"
            hint="Online store sessions from Shopify analytics."
            value={raw.sessions}
            field={fields.sessions}
            onChange={(value) => setField("sessions", value)}
          />
          <NumberField
            label="Conversion rate"
            kind="percent"
            placeholder="e.g. 2.5"
            hint="Share of sessions that place an order."
            value={raw.conversionRate}
            field={fields.conversionRate}
            onChange={(value) => setField("conversionRate", value)}
          />
          <NumberField
            label="Average order value"
            kind="currency"
            placeholder="e.g. 1,200"
            value={raw.averageOrderValue}
            field={fields.averageOrderValue}
            onChange={(value) => setField("averageOrderValue", value)}
          />
          <NumberField
            label="Growth rate"
            kind="percent"
            optional
            allowNegative
            placeholder="e.g. 10"
            hint="Applied to monthly revenue. Use a negative number for a decline."
            value={raw.growthRate}
            field={fields.growthRate}
            onChange={(value) => setField("growthRate", value)}
          />
        </>
      }
      results={
        <>
          <div className="flex items-center justify-between gap-3">
            <ResultsHeading>Results</ResultsHeading>
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Estimate
            </span>
          </div>
          <div className="mt-4">
            <HeadlineFigure
              label="Estimated monthly revenue"
              value={formatCurrency(show(result.monthlyRevenue))}
              tone={ready ? "brand" : "empty"}
            />
          </div>

          <ResultList className="mt-5 border-t border-border">
            <ResultRow label="Estimated orders per month" value={formatCount(show(result.orders))} />
            <ResultRow
              label="Estimated annual revenue"
              note="Monthly revenue × 12"
              value={formatCurrency(show(result.annualRevenue))}
              emphasis
            />
          </ResultList>

          {ready && result.projection ? (
            <Projection result={result} />
          ) : (
            <div className="mt-6">
              <ResultStatement tone="muted">
                {form.hasErrors
                  ? "Fix the highlighted fields to see your results."
                  : ready
                    ? "Add a growth rate to compare today's estimate with a projection."
                    : "Enter monthly sessions, conversion rate and average order value to estimate revenue."}
              </ResultStatement>
            </div>
          )}

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Projections are estimates based only on the numbers you enter, not a forecast.
          </p>
        </>
      }
    />
  );
}

function Projection({ result }: { result: RevenueResult }) {
  const projection = result.projection!;
  const growth = `${projection.growthRate > 0 ? "+" : ""}${formatPercent(projection.growthRate, 2)}`;
  const decline = projection.monthlyDifference < 0;

  return (
    <ResultsSection title="Current vs projected">
      <table className="w-full text-sm">
        <caption className="sr-only">Current and projected revenue at {growth} growth</caption>
        <thead>
          <tr className="text-xs text-muted-foreground">
            <th scope="col" className="pb-2 text-left font-medium">
              <span className="sr-only">Period</span>
            </th>
            <th scope="col" className="pb-2 text-right font-medium">
              Current
            </th>
            <th scope="col" className="pb-2 pl-3 text-right font-medium">
              Projected <span className="whitespace-nowrap">({growth})</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/80 border-t border-border/80">
          <tr>
            <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
              Monthly
            </th>
            <td className="py-3 text-right tabular-nums text-ink dark:text-white">
              {formatCurrency(result.monthlyRevenue)}
            </td>
            <td className="py-3 pl-3 text-right font-semibold tabular-nums text-ink dark:text-white">
              {formatCurrency(projection.monthlyRevenue)}
            </td>
          </tr>
          <tr>
            <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
              Annual
            </th>
            <td className="py-3 text-right tabular-nums text-ink dark:text-white">
              {formatCurrency(result.annualRevenue)}
            </td>
            <td className="py-3 pl-3 text-right font-semibold tabular-nums text-ink dark:text-white">
              {formatCurrency(projection.annualRevenue)}
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className={cn(
          "mt-3 rounded-2xl border px-4 py-3 text-sm",
          decline ? "border-red-100 bg-red-50/60 text-red-700" : "border-brand/15 bg-white/80 text-ink dark:bg-white/5 dark:text-white",
        )}
      >
        <span className="font-semibold">{formatCurrencyChange(projection.monthlyDifference)}</span> a
        month, {formatCurrencyChange(projection.monthlyDifference * 12)} a year.
      </p>
    </ResultsSection>
  );
}
