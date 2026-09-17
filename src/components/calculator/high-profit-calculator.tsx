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
import { CALCULATOR_DEFAULTS } from "@/data/calculator-defaults";
import { RABBITPAY_FEE_RATES } from "@/data/pricing";
import {
  formatCurrency,
  formatCurrencyChange,
  formatPercent,
} from "@/lib/calculators/format";
import { calculateHighProfit, type HighProfitTarget } from "@/lib/calculators/formulas";
import { parseNumber } from "@/lib/calculators/input";

const RULES = {
  sellingPrice: { kind: "currency" },
  productCost: { kind: "currency" },
  shippingCost: { kind: "currency" },
  paymentFeeRate: { kind: "percent" },
  adCostPerOrder: { kind: "currency" },
  otherCostPerOrder: { kind: "currency" },
  targetMargin: { kind: "percent", max: 100, maxExclusive: true },
} as const;

const REQUIRED = ["sellingPrice"] as const;

export function HighProfitCalculator() {
  const form = useCalculatorForm({
    calculator: "high-profit",
    rules: RULES,
    required: REQUIRED,
    defaults: CALCULATOR_DEFAULTS["high-profit"],
  });
  const { raw, fields, setField, ready, hasErrors } = form;

  const targetMargin = fields.targetMargin.value;
  const result = calculateHighProfit({
    sellingPrice: form.valueOf("sellingPrice"),
    productCost: form.valueOf("productCost"),
    shippingCost: form.valueOf("shippingCost"),
    paymentFeeRate: form.valueOf("paymentFeeRate"),
    adCostPerOrder: form.valueOf("adCostPerOrder"),
    otherCostPerOrder: form.valueOf("otherCostPerOrder"),
    targetMargin,
  });
  const show = <T,>(value: T) => (ready ? value : null);

  const currentRate = parseNumber(raw.paymentFeeRate);
  const ratePreset = (label: string, rate: number) => ({
    label,
    pressed: currentRate === rate,
    onSelect: () => setField("paymentFeeRate", String(rate)),
  });

  return (
    <CalculatorLayout
      canReset={!form.isPristine}
      onReset={form.reset}
      inputs={
        <>
          <NumberField
            label="Current selling price"
            kind="currency"
            placeholder="e.g. 1,499"
            hint="Per order, after any discount."
            value={raw.sellingPrice}
            field={fields.sellingPrice}
            onChange={(value) => setField("sellingPrice", value)}
          />
          <NumberField
            label="Target profit margin"
            kind="percent"
            placeholder="e.g. 25"
            hint="Net margin you want to keep per order."
            value={raw.targetMargin}
            field={fields.targetMargin}
            onChange={(value) => setField("targetMargin", value)}
          />
          <NumberField
            label="Product cost"
            kind="currency"
            placeholder="0"
            value={raw.productCost}
            field={fields.productCost}
            onChange={(value) => setField("productCost", value)}
          />
          <NumberField
            label="Shipping & fulfilment"
            kind="currency"
            placeholder="0"
            hint="Per order, including COD and RTO costs."
            value={raw.shippingCost}
            field={fields.shippingCost}
            onChange={(value) => setField("shippingCost", value)}
          />
          <NumberField
            label="Advertising cost per order"
            kind="currency"
            placeholder="0"
            hint="Ad spend ÷ orders — your cost per purchase."
            value={raw.adCostPerOrder}
            field={fields.adCostPerOrder}
            onChange={(value) => setField("adCostPerOrder", value)}
          />
          <NumberField
            label="Other cost per order"
            kind="currency"
            placeholder="0"
            value={raw.otherCostPerOrder}
            field={fields.otherCostPerOrder}
            onChange={(value) => setField("otherCostPerOrder", value)}
          />
          <NumberField
            className="sm:col-span-2"
            label="Payment / gateway fee"
            kind="percent"
            placeholder="0"
            hint="Percentage of the selling price. Add your gateway's MDR to RabbitPay's rate if you pay both."
            value={raw.paymentFeeRate}
            field={fields.paymentFeeRate}
            onChange={(value) => setField("paymentFeeRate", value)}
          >
            <PresetButtons
              label="RabbitPay fee:"
              options={[
                ratePreset(`${RABBITPAY_FEE_RATES.prepaid}% prepaid`, RABBITPAY_FEE_RATES.prepaid),
                ratePreset(`${RABBITPAY_FEE_RATES.cod}% COD`, RABBITPAY_FEE_RATES.cod),
              ]}
            />
          </NumberField>
        </>
      }
      results={
        <>
          <ResultsHeading>Per order today</ResultsHeading>
          <div className="mt-4 space-y-5">
            <HeadlineFigure
              label={ready && result.profit < 0 ? "Loss per order" : "Profit per order"}
              value={formatCurrency(show(result.profit))}
              tone={toneFor(ready, result.profit)}
            />
            <HeadlineFigure
              label="Current profit margin"
              value={formatPercent(show(result.margin))}
              tone={toneFor(ready, result.margin, "brand")}
            />
          </div>

          <ResultList className="mt-5 border-t border-border">
            <ResultRow
              label="Total cost per order"
              note={ready ? `Includes ${formatCurrency(result.paymentFee)} payment fee` : undefined}
              value={formatCurrency(show(result.totalCost))}
            />
            <ResultRow
              label="Break-even selling price"
              note="Where profit per order is zero"
              value={formatCurrency(hasErrors || form.isEmpty ? null : result.breakEvenPrice)}
            />
          </ResultList>

          {!hasErrors && result.target ? (
            <TargetResults
              target={result.target}
              sellingPrice={fields.sellingPrice.value}
              adCostPerOrder={form.valueOf("adCostPerOrder")}
              feeRate={form.valueOf("paymentFeeRate")}
            />
          ) : (
            <div className="mt-6">
              <ResultStatement tone="muted">
                {hasErrors
                  ? "Fix the highlighted fields to see your results."
                  : ready
                    ? "Add a target profit margin to see the price and maximum ad cost per order that reach it."
                    : "Enter your selling price, costs per order and a target margin."}
              </ResultStatement>
            </div>
          )}
        </>
      }
    />
  );
}

function TargetResults({
  target,
  sellingPrice,
  adCostPerOrder,
  feeRate,
}: {
  target: HighProfitTarget;
  sellingPrice: number | null;
  adCostPerOrder: number;
  feeRate: number;
}) {
  const margin = formatPercent(target.margin, 2);
  const hasPrice = sellingPrice !== null;

  if (target.requiredPrice === null) {
    return (
      <ResultsSection title={`For a ${margin} margin`}>
        <ResultStatement live>
          A {margin} margin plus a {formatPercent(feeRate, 2)} payment fee leaves nothing of the price to
          cover your costs. Lower the target margin or the fee.
        </ResultStatement>
      </ResultsSection>
    );
  }

  return (
    <ResultsSection title={`For a ${margin} margin`}>
      {hasPrice ? (
        <ResultStatement live>
          {target.maxAdCost >= 0 ? (
            <>
              To reach a {margin} margin at {formatCurrency(sellingPrice)}, your maximum advertising
              cost per order is{" "}
              <strong className="font-semibold text-brand">{formatCurrency(target.maxAdCost)}</strong>
              .
            </>
          ) : (
            <>
              A {margin} margin isn&apos;t reachable at {formatCurrency(sellingPrice)}, even with zero
              ad spend. At your current costs you need a price of at least{" "}
              <strong className="font-semibold text-brand">
                {formatCurrency(target.requiredPrice)}
              </strong>
              .
            </>
          )}
        </ResultStatement>
      ) : null}

      <ResultList className={hasPrice ? "mt-3" : undefined}>
        <ResultRow
          label="Required selling price"
          note="With your current costs, including ads"
          value={formatCurrency(target.requiredPrice)}
          emphasis
        />
        {hasPrice ? (
          <>
            <ResultRow
              label="Change from current price"
              value={
                (target.priceChange ?? 0) <= 0
                  ? "Already reached"
                  : formatCurrencyChange(target.priceChange)
              }
            />
            <ResultRow
              label="Max advertising cost per order"
              note="At your current selling price"
              value={target.maxAdCost < 0 ? "Not reachable" : formatCurrency(target.maxAdCost)}
              negative={target.maxAdCost < 0}
              emphasis
            />
            {target.maxAdCost >= 0 ? (
              <ResultRow
                label={target.adCostHeadroom >= 0 ? "Room left in ad cost" : "Ad cost to cut"}
                note={`You spend ${formatCurrency(adCostPerOrder)} per order today`}
                value={formatCurrency(Math.abs(target.adCostHeadroom))}
                negative={target.adCostHeadroom < 0}
              />
            ) : null}
          </>
        ) : null}
      </ResultList>
    </ResultsSection>
  );
}
