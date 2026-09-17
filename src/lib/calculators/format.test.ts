import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  EMPTY_VALUE,
  formatCount,
  formatCurrency,
  formatCurrencyChange,
  formatIndianUnits,
  formatMultiple,
  formatPercent,
  groupDigits,
} from "./format.ts";

const UNSHOWABLE = [null, undefined, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

describe("formatters never print NaN, Infinity or undefined", () => {
  for (const format of [formatCurrency, formatCurrencyChange, formatPercent, formatMultiple, formatCount]) {
    test(format.name, () => {
      for (const value of UNSHOWABLE) assert.equal(format(value), EMPTY_VALUE);
    });
  }
  test("formatIndianUnits", () => {
    for (const value of UNSHOWABLE) assert.equal(formatIndianUnits(value), null);
  });
});

describe("formatCurrency", () => {
  test("Indian digit grouping", () => {
    assert.equal(formatCurrency(124500), "₹1,24,500");
    assert.equal(formatCurrency(1e12), "₹10,00,00,00,00,000");
  });
  test("paise only below ₹1,000", () => {
    assert.equal(formatCurrency(999.456), "₹999.46");
    assert.equal(formatCurrency(12.5), "₹12.5");
    assert.equal(formatCurrency(1234.56), "₹1,235");
  });
  test("negative values use a minus sign", () => {
    assert.equal(formatCurrency(-9000), "−₹9,000");
  });
  test("zero and values that round to zero never show −0", () => {
    assert.equal(formatCurrency(0), "₹0");
    assert.equal(formatCurrency(-0), "₹0");
    assert.equal(formatCurrency(-0.001), "₹0");
  });
});

describe("formatCurrencyChange", () => {
  test("signed differences", () => {
    assert.equal(formatCurrencyChange(90), "+₹90");
    assert.equal(formatCurrencyChange(-1500), "−₹1,500");
    assert.equal(formatCurrencyChange(0), "₹0");
    assert.equal(formatCurrencyChange(0.001), "₹0");
  });
});

describe("formatPercent", () => {
  test("one decimal by default", () => {
    assert.equal(formatPercent(18.4321), "18.4%");
    assert.equal(formatPercent(25), "25%");
    assert.equal(formatPercent(-9), "−9%");
    assert.equal(formatPercent(-0.01), "0%");
  });
});

describe("formatMultiple", () => {
  test("two decimals", () => {
    assert.equal(formatMultiple(4), "4.00×");
    assert.equal(formatMultiple(2.3333), "2.33×");
    assert.equal(formatMultiple(0), "0.00×");
  });
});

describe("formatCount", () => {
  test("whole and fractional estimates", () => {
    assert.equal(formatCount(1000), "1,000");
    assert.equal(formatCount(4.995), "5");
    assert.equal(formatCount(4.95), "5");
    assert.equal(formatCount(2.25), "2.3");
  });
});

describe("formatIndianUnits", () => {
  test("lakh and crore", () => {
    assert.equal(formatIndianUnits(99999), null);
    assert.equal(formatIndianUnits(100000), "₹1 lakh");
    assert.equal(formatIndianUnits(1245000), "₹12.45 lakh");
    assert.equal(formatIndianUnits(32000000), "₹3.2 crore");
    assert.equal(formatIndianUnits(-2500000), "−₹25 lakh");
  });
});

describe("groupDigits", () => {
  test("groups plain numbers the Indian way", () => {
    assert.equal(groupDigits("124500"), "1,24,500");
    assert.equal(groupDigits("1,24,500"), "1,24,500");
    assert.equal(groupDigits("124500.5"), "1,24,500.5");
    assert.equal(groupDigits("-1500"), "-1,500");
    assert.equal(groupDigits("999"), "999");
  });
  test("leaves anything else untouched", () => {
    assert.equal(groupDigits(""), "");
    assert.equal(groupDigits("12abc"), "12abc");
    assert.equal(groupDigits("1.2.3"), "1.2.3");
  });
});
