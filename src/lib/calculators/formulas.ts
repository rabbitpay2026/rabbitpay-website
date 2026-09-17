/**
 * The formulas behind /calculator.
 *
 * Pure functions: numbers in, numbers out, no React and no formatting. Any
 * ratio whose denominator is zero comes back as `null` rather than Infinity or
 * NaN, and the UI renders `null` as a dash. Inputs are assumed to have passed
 * `validateField`, but a non-finite number is still treated as 0 so a bad value
 * can never leak into a result.
 *
 * Percentages cross this boundary as percentages (25 means 25%), because that
 * is how merchants type them.
 */

const num = (value: number | null | undefined) =>
  typeof value === "number" && Number.isFinite(value) ? value : 0;

/** `numerator / denominator`, or `null` when that is not a finite number. */
export function safeDivide(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return null;
  }
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

const asPercent = (ratio: number | null) => (ratio === null ? null : ratio * 100);

/* ----------------------------- profit margin ----------------------------- */

export type CostKey = "productCost" | "adCost" | "shippingCost" | "paymentFees" | "otherCosts";

export type ProfitMarginInput = { revenue: number } & Record<CostKey, number>;

export type ProfitMarginResult = {
  revenue: number;
  totalCosts: number;
  /** Revenue minus product cost only. */
  grossProfit: number;
  grossMargin: number | null;
  /** Revenue minus every cost entered. */
  netProfit: number;
  netMargin: number | null;
  breakdown: { key: CostKey; amount: number; shareOfRevenue: number | null }[];
};

export const COST_KEYS: CostKey[] = [
  "productCost",
  "adCost",
  "shippingCost",
  "paymentFees",
  "otherCosts",
];

export function calculateProfitMargin(input: ProfitMarginInput): ProfitMarginResult {
  const revenue = num(input.revenue);
  const breakdown = COST_KEYS.map((key) => {
    const amount = num(input[key]);
    return { key, amount, shareOfRevenue: asPercent(safeDivide(amount, revenue)) };
  });
  const totalCosts = breakdown.reduce((total, cost) => total + cost.amount, 0);
  const grossProfit = revenue - num(input.productCost);
  const netProfit = revenue - totalCosts;

  return {
    revenue,
    totalCosts,
    grossProfit,
    grossMargin: asPercent(safeDivide(grossProfit, revenue)),
    netProfit,
    netMargin: asPercent(safeDivide(netProfit, revenue)),
    breakdown,
  };
}

/* ---------------------------------- ROI ---------------------------------- */

export type RoiInput = {
  investment: number;
  revenue: number;
  /** Costs tied to the revenue that are not already part of the investment. */
  additionalCosts: number;
};

export type RoiResult = {
  totalInvestment: number;
  revenue: number;
  netReturn: number;
  roi: number | null;
};

export function calculateRoi(input: RoiInput): RoiResult {
  const totalInvestment = num(input.investment) + num(input.additionalCosts);
  const revenue = num(input.revenue);
  const netReturn = revenue - totalInvestment;
  return {
    totalInvestment,
    revenue,
    netReturn,
    roi: asPercent(safeDivide(netReturn, totalInvestment)),
  };
}

/* ---------------------------------- ROAS --------------------------------- */

export type RoasInput = {
  adSpend: number;
  revenue: number;
  /** Margin left after product, shipping and fees but before ads, in percent. Optional. */
  marginBeforeAds: number | null;
};

export type BreakEvenStatus = "above" | "at" | "below";

export type RoasResult = {
  adSpend: number;
  revenue: number;
  /** Revenue per ₹1 of ad spend. */
  roas: number | null;
  /** Ad spend as a percentage of attributed revenue. */
  adSpendShare: number | null;
  breakEvenRoas: number | null;
  /** Attributed revenue × margin − ad spend. `null` without a margin. */
  profitAfterAds: number | null;
  status: BreakEvenStatus | null;
};

export function calculateRoas(input: RoasInput): RoasResult {
  const adSpend = num(input.adSpend);
  const revenue = num(input.revenue);
  const roas = safeDivide(revenue, adSpend);
  const margin = input.marginBeforeAds === null ? null : num(input.marginBeforeAds);

  const breakEvenRoas = margin !== null && margin > 0 ? safeDivide(100, margin) : null;
  const profitAfterAds = margin === null ? null : (revenue * margin) / 100 - adSpend;

  let status: BreakEvenStatus | null = null;
  if (roas !== null && breakEvenRoas !== null) {
    const tolerance = 1e-9 * Math.max(1, breakEvenRoas);
    if (Math.abs(roas - breakEvenRoas) <= tolerance) status = "at";
    else status = roas > breakEvenRoas ? "above" : "below";
  }

  return {
    adSpend,
    revenue,
    roas,
    adSpendShare: asPercent(safeDivide(adSpend, revenue)),
    breakEvenRoas,
    profitAfterAds,
    status,
  };
}

/* ------------------------------ high profit ------------------------------ */

export type HighProfitInput = {
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  /** Payment / gateway fee as a percentage of the selling price. */
  paymentFeeRate: number;
  adCostPerOrder: number;
  otherCostPerOrder: number;
  /** Target net margin in percent, or `null` when not set. */
  targetMargin: number | null;
};

export type HighProfitTarget = {
  margin: number;
  /** Price that reaches the target with today's costs, or `null` when fees + margin ≥ 100%. */
  requiredPrice: number | null;
  /** `requiredPrice − sellingPrice`. Negative means the current price already clears it. */
  priceChange: number | null;
  /** Largest ad cost per order that still reaches the target at the current price. Can be negative. */
  maxAdCost: number;
  /** `maxAdCost − adCostPerOrder`. Negative means ads must come down by that much. */
  adCostHeadroom: number;
};

export type HighProfitResult = {
  paymentFee: number;
  totalCost: number;
  profit: number;
  margin: number | null;
  /** Price at which profit is exactly zero, or `null` when fees are 100% or more. */
  breakEvenPrice: number | null;
  target: HighProfitTarget | null;
};

export function calculateHighProfit(input: HighProfitInput): HighProfitResult {
  const price = num(input.sellingPrice);
  const feeRate = num(input.paymentFeeRate) / 100;
  const nonAdCosts =
    num(input.productCost) + num(input.shippingCost) + num(input.otherCostPerOrder);
  const adCost = num(input.adCostPerOrder);
  const fixedCosts = nonAdCosts + adCost;

  const paymentFee = price * feeRate;
  const totalCost = fixedCosts + paymentFee;
  const profit = price - totalCost;
  const breakEvenPrice = feeRate < 1 ? safeDivide(fixedCosts, 1 - feeRate) : null;

  let target: HighProfitTarget | null = null;
  if (input.targetMargin !== null && Number.isFinite(input.targetMargin)) {
    const margin = input.targetMargin;
    const keep = 1 - feeRate - margin / 100;
    const requiredPrice = keep > 0 ? safeDivide(fixedCosts, keep) : null;
    const maxAdCost = price * keep - nonAdCosts;
    target = {
      margin,
      requiredPrice,
      priceChange: requiredPrice === null ? null : requiredPrice - price,
      maxAdCost,
      adCostHeadroom: maxAdCost - adCost,
    };
  }

  return {
    paymentFee,
    totalCost,
    profit,
    margin: asPercent(safeDivide(profit, price)),
    breakEvenPrice,
    target,
  };
}

/* -------------------------------- revenue -------------------------------- */

export type RevenueInput = {
  sessions: number;
  /** Percent of sessions that place an order. */
  conversionRate: number;
  averageOrderValue: number;
  /** Growth applied to monthly revenue, in percent, or `null` when not set. */
  growthRate: number | null;
};

export type RevenueProjection = {
  growthRate: number;
  monthlyRevenue: number;
  annualRevenue: number;
  /** Projected monthly revenue minus current monthly revenue. */
  monthlyDifference: number;
};

export type RevenueResult = {
  orders: number;
  monthlyRevenue: number;
  annualRevenue: number;
  projection: RevenueProjection | null;
};

export function calculateRevenue(input: RevenueInput): RevenueResult {
  const orders = num(input.sessions) * (num(input.conversionRate) / 100);
  const monthlyRevenue = orders * num(input.averageOrderValue);
  const annualRevenue = monthlyRevenue * 12;

  let projection: RevenueProjection | null = null;
  if (input.growthRate !== null && Number.isFinite(input.growthRate)) {
    const projectedMonthly = monthlyRevenue * (1 + input.growthRate / 100);
    projection = {
      growthRate: input.growthRate,
      monthlyRevenue: projectedMonthly,
      annualRevenue: projectedMonthly * 12,
      monthlyDifference: projectedMonthly - monthlyRevenue,
    };
  }

  return { orders, monthlyRevenue, annualRevenue, projection };
}
