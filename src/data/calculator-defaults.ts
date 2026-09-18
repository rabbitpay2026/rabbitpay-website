import { RABBITPAY_FEE_RATES } from "@/data/pricing";

/**
 * The example values each calculator opens with, so a visitor sees a working
 * calculation before typing anything.
 *
 * Illustrative only — they are not recommended, typical or required figures.
 * Every field stays editable, results are always recalculated from what is in
 * the fields, and Reset restores exactly these values.
 */

/** Example order value, shared by the two per-order calculators. */
const EXAMPLE_ORDER_VALUE = 1499;

/** The prepaid rate applied to the example order, in rupees. */
const EXAMPLE_PREPAID_FEE = Math.round(EXAMPLE_ORDER_VALUE * RABBITPAY_FEE_RATES.prepaid) / 100;

export const CALCULATOR_DEFAULTS = {
  "profit-margin": {
    revenue: "1,499",
    productCost: "600",
    adCost: "200",
    shippingCost: "80",
    paymentFees: String(EXAMPLE_PREPAID_FEE),
    otherCosts: "50",
  },
  roi: {
    investment: "50,000",
    revenue: "1,00,000",
    additionalCosts: "20,000",
  },
  roas: {
    adSpend: "20,000",
    revenue: "60,000",
    marginBeforeAds: "",
  },
  "high-profit": {
    sellingPrice: "1,499",
    productCost: "600",
    shippingCost: "80",
    paymentFeeRate: String(RABBITPAY_FEE_RATES.prepaid),
    adCostPerOrder: "200",
    otherCostPerOrder: "50",
    targetMargin: "25",
  },
  revenue: {
    sessions: "50,000",
    conversionRate: "2.5",
    averageOrderValue: "1,499",
    growthRate: "10",
  },
} as const;
