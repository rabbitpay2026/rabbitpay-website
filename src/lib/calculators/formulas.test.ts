import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  calculateHighProfit,
  calculateProfitMargin,
  calculateRevenue,
  calculateRoas,
  calculateRoi,
  safeDivide,
} from "./formulas.ts";

const close = (actual: number | null, expected: number, epsilon = 1e-9) => {
  assert.ok(actual !== null, `expected ${expected}, got null`);
  assert.ok(
    Math.abs(actual - expected) <= epsilon * Math.max(1, Math.abs(expected)),
    `expected ${expected}, got ${actual}`,
  );
};

/** Walks any result object and fails on NaN, Infinity or undefined. */
const assertAllFinite = (value: unknown, path = "result"): void => {
  assert.notEqual(value, undefined, `${path} is undefined`);
  if (typeof value === "number") assert.ok(Number.isFinite(value), `${path} is ${value}`);
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) assertAllFinite(child, `${path}.${key}`);
  }
};

describe("safeDivide", () => {
  test("divides finite numbers", () => close(safeDivide(10, 4), 2.5));
  test("returns null for zero denominators", () => {
    assert.equal(safeDivide(10, 0), null);
    assert.equal(safeDivide(0, 0), null);
    assert.equal(safeDivide(-5, -0), null);
  });
  test("returns null for non-finite operands", () => {
    assert.equal(safeDivide(Number.NaN, 2), null);
    assert.equal(safeDivide(2, Number.POSITIVE_INFINITY), null);
    assert.equal(safeDivide(Number.MAX_VALUE, Number.MIN_VALUE), null);
  });
});

describe("calculateProfitMargin", () => {
  const base = {
    revenue: 100000,
    productCost: 35000,
    adCost: 20000,
    shippingCost: 8000,
    paymentFees: 1000,
    otherCosts: 5000,
  };

  test("normal values", () => {
    const result = calculateProfitMargin(base);
    assert.equal(result.totalCosts, 69000);
    assert.equal(result.netProfit, 31000);
    close(result.netMargin, 31);
    assert.equal(result.grossProfit, 65000);
    close(result.grossMargin, 65);
    close(result.breakdown.find((cost) => cost.key === "adCost")!.shareOfRevenue, 20);
  });

  test("gross and net profit differ once non-product costs exist", () => {
    const result = calculateProfitMargin(base);
    assert.ok(result.grossProfit > result.netProfit);
  });

  test("zero revenue gives null margins instead of Infinity", () => {
    const result = calculateProfitMargin({ ...base, revenue: 0 });
    assert.equal(result.netMargin, null);
    assert.equal(result.grossMargin, null);
    assert.equal(result.netProfit, -69000);
    assert.ok(result.breakdown.every((cost) => cost.shareOfRevenue === null));
  });

  test("all zeros", () => {
    const zeros = { revenue: 0, productCost: 0, adCost: 0, shippingCost: 0, paymentFees: 0, otherCosts: 0 };
    const result = calculateProfitMargin(zeros);
    assert.equal(result.totalCosts, 0);
    assert.equal(result.netProfit, 0);
    assert.equal(result.netMargin, null);
  });

  test("decimals", () => {
    const result = calculateProfitMargin({
      revenue: 999.99,
      productCost: 333.33,
      adCost: 0.1,
      shippingCost: 0.2,
      paymentFees: 9.9999,
      otherCosts: 0,
    });
    close(result.totalCosts, 343.6299);
    close(result.netProfit, 656.3601);
    close(result.netMargin, (656.3601 / 999.99) * 100);
  });

  test("costs above revenue give a negative margin", () => {
    const result = calculateProfitMargin({ ...base, adCost: 60000 });
    assert.equal(result.netProfit, -9000);
    close(result.netMargin, -9);
  });

  test("100% margin when there are no costs", () => {
    const result = calculateProfitMargin({ ...base, productCost: 0, adCost: 0, shippingCost: 0, paymentFees: 0, otherCosts: 0 });
    close(result.netMargin, 100);
  });

  test("large values stay precise", () => {
    const result = calculateProfitMargin({ ...base, revenue: 1e12, productCost: 4e11 });
    assert.equal(result.netProfit, 1e12 - 4e11 - 34000);
    close(result.netMargin, ((1e12 - 4e11 - 34000) / 1e12) * 100);
  });

  test("invalid numbers are treated as zero, never NaN", () => {
    const result = calculateProfitMargin({ ...base, adCost: Number.NaN, otherCosts: Number.POSITIVE_INFINITY });
    assertAllFinite(result);
    assert.equal(result.totalCosts, 44000);
  });
});

describe("calculateRoi", () => {
  test("normal values", () => {
    const result = calculateRoi({ investment: 50000, revenue: 80000, additionalCosts: 0 });
    assert.equal(result.netReturn, 30000);
    close(result.roi, 60);
  });

  test("additional costs are part of the total investment", () => {
    const result = calculateRoi({ investment: 50000, revenue: 80000, additionalCosts: 10000 });
    assert.equal(result.totalInvestment, 60000);
    assert.equal(result.netReturn, 20000);
    close(result.roi, (20000 / 60000) * 100);
  });

  test("loss gives negative ROI, total loss gives −100%", () => {
    close(calculateRoi({ investment: 50000, revenue: 25000, additionalCosts: 0 }).roi, -50);
    close(calculateRoi({ investment: 50000, revenue: 0, additionalCosts: 0 }).roi, -100);
  });

  test("zero investment gives null ROI", () => {
    const result = calculateRoi({ investment: 0, revenue: 1000, additionalCosts: 0 });
    assert.equal(result.roi, null);
    assert.equal(result.netReturn, 1000);
  });

  test("decimals and large values", () => {
    close(calculateRoi({ investment: 0.3, revenue: 0.6, additionalCosts: 0 }).roi, 100);
    close(calculateRoi({ investment: 1e12, revenue: 3e12, additionalCosts: 0 }).roi, 200);
  });

  test("invalid numbers never produce NaN", () => {
    assertAllFinite(calculateRoi({ investment: Number.NaN, revenue: 100, additionalCosts: 50 }));
  });
});

describe("calculateRoas", () => {
  test("normal values", () => {
    const result = calculateRoas({ adSpend: 25000, revenue: 100000, marginBeforeAds: null });
    close(result.roas, 4);
    close(result.adSpendShare, 25);
    assert.equal(result.breakEvenRoas, null);
    assert.equal(result.profitAfterAds, null);
    assert.equal(result.status, null);
  });

  test("break-even ROAS from margin", () => {
    const result = calculateRoas({ adSpend: 25000, revenue: 100000, marginBeforeAds: 40 });
    close(result.breakEvenRoas, 2.5);
    close(result.profitAfterAds, 15000);
    assert.equal(result.status, "above");
  });

  test("below and exactly at break-even", () => {
    assert.equal(calculateRoas({ adSpend: 50000, revenue: 100000, marginBeforeAds: 40 }).status, "below");
    const at = calculateRoas({ adSpend: 40000, revenue: 100000, marginBeforeAds: 40 });
    assert.equal(at.status, "at");
    close(at.profitAfterAds, 0);
  });

  test("floating point near break-even is still 'at'", () => {
    // 0.3 / 0.1 is 2.9999999999999996 in IEEE 754.
    const result = calculateRoas({ adSpend: 0.1, revenue: 0.3, marginBeforeAds: 100 / 3 });
    assert.equal(result.status, "at");
  });

  test("zero ad spend gives null ROAS", () => {
    const result = calculateRoas({ adSpend: 0, revenue: 1000, marginBeforeAds: 30 });
    assert.equal(result.roas, null);
    assert.equal(result.status, null);
    close(result.profitAfterAds, 300);
  });

  test("zero revenue gives zero ROAS and null spend share", () => {
    const result = calculateRoas({ adSpend: 1000, revenue: 0, marginBeforeAds: null });
    assert.equal(result.roas, 0);
    assert.equal(result.adSpendShare, null);
  });

  test("zero margin has no break-even ROAS", () => {
    const result = calculateRoas({ adSpend: 1000, revenue: 5000, marginBeforeAds: 0 });
    assert.equal(result.breakEvenRoas, null);
    assert.equal(result.profitAfterAds, -1000);
  });

  test("100% margin breaks even at 1×", () => {
    close(calculateRoas({ adSpend: 1, revenue: 1, marginBeforeAds: 100 }).breakEvenRoas, 1);
  });

  test("large values", () => {
    close(calculateRoas({ adSpend: 1e11, revenue: 1e12, marginBeforeAds: null }).roas, 10);
  });
});

describe("calculateHighProfit", () => {
  const base = {
    sellingPrice: 1000,
    productCost: 300,
    shippingCost: 80,
    paymentFeeRate: 1,
    adCostPerOrder: 250,
    otherCostPerOrder: 20,
    targetMargin: 25,
  };

  test("current profit and margin", () => {
    const result = calculateHighProfit(base);
    close(result.paymentFee, 10);
    close(result.totalCost, 660);
    close(result.profit, 340);
    close(result.margin, 34);
  });

  test("required price hits the target margin exactly", () => {
    const result = calculateHighProfit({ ...base, adCostPerOrder: 500 });
    const required = result.target!.requiredPrice!;
    close(required, 900 / (1 - 0.01 - 0.25));
    const check = calculateHighProfit({ ...base, adCostPerOrder: 500, sellingPrice: required });
    close(check.margin, 25);
  });

  test("max ad cost reaches the target at the current price", () => {
    const result = calculateHighProfit(base);
    // 1000 × (1 − 0.01 − 0.25) − (300 + 80 + 20)
    close(result.target!.maxAdCost, 340);
    close(result.target!.adCostHeadroom, 90);
    const check = calculateHighProfit({ ...base, adCostPerOrder: result.target!.maxAdCost });
    close(check.margin, 25);
  });

  test("break-even price gives zero profit", () => {
    const result = calculateHighProfit(base);
    close(result.breakEvenPrice, 650 / 0.99);
    const check = calculateHighProfit({ ...base, sellingPrice: result.breakEvenPrice! });
    close(check.profit, 0, 1e-9);
  });

  test("unreachable target at current price gives negative max ad cost", () => {
    const result = calculateHighProfit({ ...base, sellingPrice: 500 });
    assert.ok(result.target!.maxAdCost < 0);
    assert.ok(result.target!.priceChange! > 0);
  });

  test("fees plus target of 100% or more has no required price", () => {
    const result = calculateHighProfit({ ...base, paymentFeeRate: 30, targetMargin: 70 });
    assert.equal(result.target!.requiredPrice, null);
    assert.equal(result.target!.priceChange, null);
    assertAllFinite({ ...result, target: { ...result.target, requiredPrice: 0, priceChange: 0 } });
  });

  test("100% fee has no break-even price", () => {
    assert.equal(calculateHighProfit({ ...base, paymentFeeRate: 100 }).breakEvenPrice, null);
  });

  test("zero selling price gives a null margin", () => {
    const result = calculateHighProfit({ ...base, sellingPrice: 0 });
    assert.equal(result.margin, null);
    close(result.profit, -650);
  });

  test("no target leaves target results empty", () => {
    assert.equal(calculateHighProfit({ ...base, targetMargin: null }).target, null);
  });

  test("zero target margin equals the break-even price", () => {
    const result = calculateHighProfit({ ...base, targetMargin: 0 });
    close(result.target!.requiredPrice, result.breakEvenPrice!);
  });

  test("decimals and zero costs", () => {
    const result = calculateHighProfit({
      sellingPrice: 199.5,
      productCost: 0,
      shippingCost: 0,
      paymentFeeRate: 0.3,
      adCostPerOrder: 0,
      otherCostPerOrder: 0,
      targetMargin: 12.5,
    });
    close(result.paymentFee, 0.5985);
    close(result.target!.requiredPrice, 0);
    close(result.margin, 99.7);
  });

  test("invalid numbers never produce NaN", () => {
    assertAllFinite(
      calculateHighProfit({ ...base, productCost: Number.NaN, paymentFeeRate: Number.NaN }),
    );
  });
});

describe("calculateRevenue", () => {
  test("normal values", () => {
    const result = calculateRevenue({ sessions: 50000, conversionRate: 2, averageOrderValue: 1200, growthRate: null });
    close(result.orders, 1000);
    close(result.monthlyRevenue, 1200000);
    close(result.annualRevenue, 14400000);
    assert.equal(result.projection, null);
  });

  test("growth projection", () => {
    const result = calculateRevenue({ sessions: 50000, conversionRate: 2, averageOrderValue: 1200, growthRate: 15 });
    close(result.projection!.monthlyRevenue, 1380000);
    close(result.projection!.annualRevenue, 16560000);
    close(result.projection!.monthlyDifference, 180000);
  });

  test("negative growth", () => {
    const result = calculateRevenue({ sessions: 1000, conversionRate: 10, averageOrderValue: 100, growthRate: -20 });
    close(result.projection!.monthlyRevenue, 8000);
    close(result.projection!.monthlyDifference, -2000);
  });

  test("zero growth is still a projection", () => {
    const result = calculateRevenue({ sessions: 1000, conversionRate: 10, averageOrderValue: 100, growthRate: 0 });
    close(result.projection!.monthlyDifference, 0);
  });

  test("boundary conversion rates", () => {
    assert.equal(calculateRevenue({ sessions: 1000, conversionRate: 0, averageOrderValue: 500, growthRate: null }).monthlyRevenue, 0);
    close(calculateRevenue({ sessions: 1000, conversionRate: 100, averageOrderValue: 500, growthRate: null }).orders, 1000);
  });

  test("decimal conversion rates produce fractional order estimates", () => {
    const result = calculateRevenue({ sessions: 333, conversionRate: 1.5, averageOrderValue: 999.99, growthRate: null });
    close(result.orders, 4.995);
    close(result.monthlyRevenue, 4.995 * 999.99);
  });

  test("large values", () => {
    const result = calculateRevenue({ sessions: 1e10, conversionRate: 100, averageOrderValue: 1e12, growthRate: 1000 });
    assertAllFinite(result);
  });

  test("invalid numbers never produce NaN", () => {
    assertAllFinite(calculateRevenue({ sessions: Number.NaN, conversionRate: 2, averageOrderValue: 100, growthRate: Number.NaN }));
  });
});
