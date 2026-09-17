"use client";
import { NumberField, PresetButtons } from "@/components/calculator/calculator-field";
import {
  CalculatorLayout,
  HeadlineFigure,
  ResultList,
  ResultRow,
  ResultStatement,
  ResultsHeading,
  ResultsSection,
  toneFor,
} from "@/components/calculator/calculator-results";
import { useCalculatorForm } from "@/components/calculator/use-calculator-form";
import { RABBITPAY_FEE_RATES } from "@/data/pricing";
import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { calculateProfitMargin, type CostKey } from "@/lib/calculators/formulas";
import { parseNumber } from "@/lib/calculators/input";
import { cn } from "@/lib/utils";

const RULES = {
  revenue: { kind: "currency" },
  productCost: { kind: "currency" },
  adCost: { kind: "currency" },
  shippingCost: { kind: "currency" },
  paymentFees: { kind: "currency" },
  otherCosts: { kind: "currency" },
} as const;

const REQUIRED = ["revenue"] as const;

const COSTS: { key: CostKey; label: string; swatch: string }[] = [
  { key: "productCost", label: "Product cost", swatch: "bg-ink" },
  { key: "adCost", label: "Advertising", swatch: "bg-brand-deep" },
  { key: "shippingCost", label: "Shipping & fulfilment", swatch: "bg-brand" },
  { key: "paymentFees", label: "Payment fees", swatch: "bg-brand-accent" },
  { key: "otherCosts", label: "Other costs", swatch: "bg-[#A9C8FC]" },
];

/** RabbitPay's fee on `revenue` at `rate` percent, rounded to paise. */
const feeOn = (revenue: number, rate: number) => Math.round(revenue * rate) / 100;

export function ProfitMarginCalculator() {
  const form = useCalculatorForm({ calculator: "profit-margin", rules: RULES, required: REQUIRED });
  const { raw, fields, setField, ready } = form;

  const result = calculateProfitMargin({
    revenue: form.valueOf("revenue"),
    productCost: form.valueOf("productCost"),
    adCost: form.valueOf("adCost"),
    shippingCost: form.valueOf("shippingCost"),
    paymentFees: form.valueOf("paymentFees"),
    otherCosts: form.valueOf("otherCosts"),
  });

  const revenue = fields.revenue.value;
  const currentFee = parseNumber(raw.paymentFees);
  const feePreset = (label: string, rate: number) => {
    const amount = revenue === null ? null : feeOn(revenue, rate);
    return {
      label,
      disabled: amount === null,
      pressed: amount !== null && currentFee === amount,
      onSelect: () => amount !== null && setField("paymentFees", String(amount)),
    };
  };

  const loss = ready && result.netProfit < 0;
  const show = <T,>(value: T) => (ready ? value : null);

  return (
    <CalculatorLayout
      canReset={!form.isEmpty}
      onReset={form.reset}
      inputs={
        <>
          <NumberField
            className="sm:col-span-2"
            label="Selling price / revenue"
            kind="currency"
            placeholder="e.g. 5,00,000"
            hint="One order's price, or total revenue for a period. Keep every cost on the same basis."
            value={raw.revenue}
            field={fields.revenue}
            onChange={(value) => setField("revenue", value)}
          />
          <NumberField
            label="Product cost (COGS)"
            kind="currency"
            placeholder="0"
            value={raw.productCost}
            field={fields.productCost}
            onChange={(value) => setField("productCost", value)}
          />
          <NumberField
            label="Advertising cost"
            kind="currency"
            placeholder="0"
            hint="Meta, Google and other ad spend."
            value={raw.adCost}
            field={fields.adCost}
            onChange={(value) => setField("adCost", value)}
          />
          <NumberField
            label="Shipping & fulfilment"
            kind="currency"
            placeholder="0"
            hint="Shipping, packing, COD handling and RTO."
            value={raw.shippingCost}
            field={fields.shippingCost}
            onChange={(value) => setField("shippingCost", value)}
          />
          <NumberField
            label="Other costs"
            kind="currency"
            placeholder="0"
            hint="Apps, packaging, staff — anything else."
            value={raw.otherCosts}
            field={fields.otherCosts}
            onChange={(value) => setField("otherCosts", value)}
          />
          <NumberField
            className="sm:col-span-2"
            label="Payment / gateway fees"
            kind="currency"
            placeholder="0"
            hint="Gateway MDR plus checkout fees. A preset fills in RabbitPay's fee on the revenue above — add your gateway's charges to it."
            value={raw.paymentFees}
            field={fields.paymentFees}
            onChange={(value) => setField("paymentFees", value)}
          >
            <PresetButtons
              label="RabbitPay fee:"
              disabledHint="Enter revenue first"
              options={[
                feePreset(`${RABBITPAY_FEE_RATES.prepaid}% prepaid`, RABBITPAY_FEE_RATES.prepaid),
                feePreset(`${RABBITPAY_FEE_RATES.cod}% COD`, RABBITPAY_FEE_RATES.cod),
              ]}
            />
          </NumberField>
        </>
      }
      results={
        <>
          <ResultsHeading>Results</ResultsHeading>
          <div className="mt-4 space-y-5">
            <HeadlineFigure
              label={loss ? "Net loss" : "Net profit"}
              value={formatCurrency(show(result.netProfit))}
              tone={toneFor(ready, result.netProfit)}
            />
            <HeadlineFigure
              label="Net profit margin"
              value={formatPercent(show(result.netMargin))}
              tone={toneFor(ready, result.netMargin, "brand")}
            />
          </div>

          <ResultList className="mt-5 border-t border-border">
            <ResultRow label="Revenue" value={formatCurrency(show(result.revenue))} />
            <ResultRow label="Total costs" value={formatCurrency(show(result.totalCosts))} />
            <ResultRow
              label="Gross profit"
              note={
                ready
                  ? `Revenue minus product cost only · ${formatPercent(result.grossMargin)} margin`
                  : "Revenue minus product cost only"
              }
              value={formatCurrency(show(result.grossProfit))}
              negative={ready && result.grossProfit < 0}
            />
          </ResultList>

          {ready ? (
            <CostBreakdown result={result} />
          ) : (
            <div className="mt-6">
              <ResultStatement tone="muted">
                {form.hasErrors
                  ? "Fix the highlighted fields to see your results."
                  : "Enter your revenue and costs to see net profit, margin and where your revenue goes."}
              </ResultStatement>
            </div>
          )}
        </>
      }
    />
  );
}

function CostBreakdown({ result }: { result: ReturnType<typeof calculateProfitMargin> }) {
  const base = Math.max(result.revenue, result.totalCosts);
  const width = (amount: number) => (base > 0 ? `${(amount / base) * 100}%` : "0%");
  const costs = COSTS.map((cost) => ({
    ...cost,
    ...result.breakdown.find((item) => item.key === cost.key)!,
  })).filter((cost) => cost.amount > 0);
  const profit = Math.max(result.netProfit, 0);

  return (
    <ResultsSection title="Where your revenue goes">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
        {costs.map((cost) => (
          <span key={cost.key} className={cn("h-full", cost.swatch)} style={{ width: width(cost.amount) }} />
        ))}
        {profit > 0 ? (
          <span className="h-full bg-brand/20" style={{ width: width(profit) }} />
        ) : null}
      </div>

      <ul className="mt-4 space-y-2">
        {costs.map((cost) => (
          <BreakdownItem
            key={cost.key}
            swatch={cost.swatch}
            label={cost.label}
            amount={formatCurrency(cost.amount)}
            share={formatPercent(cost.shareOfRevenue)}
          />
        ))}
        {profit > 0 ? (
          <BreakdownItem
            swatch="bg-brand/20 ring-1 ring-inset ring-brand/30"
            label="Net profit"
            amount={formatCurrency(result.netProfit)}
            share={formatPercent(result.netMargin)}
          />
        ) : null}
      </ul>

      {costs.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">No costs entered yet.</p>
      ) : null}
      {result.netProfit < 0 ? (
        <p className="mt-3 text-xs font-medium text-red-600">
          Costs are {formatCurrency(-result.netProfit)} more than revenue.
        </p>
      ) : null}
    </ResultsSection>
  );
}

function BreakdownItem({
  swatch,
  label,
  amount,
  share,
}: {
  swatch: string;
  label: string;
  amount: string;
  share: string;
}) {
  return (
    <li className="flex items-center justify-between gap-3 text-sm">
      <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
        <span className={cn("h-2.5 w-2.5 flex-shrink-0 rounded-sm", swatch)} aria-hidden="true" />
        {label}
      </span>
      <span className="text-right tabular-nums text-ink dark:text-white">
        {amount}
        <span className="ml-2 inline-block min-w-[3.25rem] text-muted-foreground">{share}</span>
      </span>
    </li>
  );
}
