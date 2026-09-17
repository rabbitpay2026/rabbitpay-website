import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { MAX_AMOUNT, parseNumber, validateField } from "./input.ts";

describe("parseNumber", () => {
  test("plain, decimal and signed numbers", () => {
    assert.equal(parseNumber("1200"), 1200);
    assert.equal(parseNumber("12.5"), 12.5);
    assert.equal(parseNumber(".5"), 0.5);
    assert.equal(parseNumber("5."), 5);
    assert.equal(parseNumber("-20"), -20);
    assert.equal(parseNumber("−20"), -20);
    assert.equal(parseNumber("+3"), 3);
  });

  test("Indian and Western grouping, rupee sign, percent and spaces", () => {
    assert.equal(parseNumber("1,24,500"), 124500);
    assert.equal(parseNumber("124,500"), 124500);
    assert.equal(parseNumber("₹ 1,24,500"), 124500);
    assert.equal(parseNumber(" 25 % "), 25);
  });

  test("rejects anything that is not a number", () => {
    for (const raw of ["", " ", "abc", "12abc", "1.2.3", "-", ".", "1e5", "Infinity", "NaN", "--5"]) {
      assert.equal(parseNumber(raw), null, `"${raw}" should not parse`);
    }
  });
});

describe("validateField", () => {
  const currency = { kind: "currency" } as const;
  const percent = { kind: "percent" } as const;
  const count = { kind: "count" } as const;

  test("empty input is valid with no value", () => {
    assert.deepEqual(validateField("", currency), { value: null, error: null });
    assert.deepEqual(validateField("   ", percent), { value: null, error: null });
  });

  test("zero and decimals are accepted", () => {
    assert.deepEqual(validateField("0", currency), { value: 0, error: null });
    assert.deepEqual(validateField("-0", currency), { value: 0, error: null });
    assert.deepEqual(validateField("99.95", currency), { value: 99.95, error: null });
  });

  test("non-numbers are rejected", () => {
    assert.equal(validateField("ten", currency).error, "Enter a number");
    assert.equal(validateField("ten", currency).value, null);
  });

  test("negative amounts are rejected", () => {
    assert.equal(validateField("-1", currency).error, "Can't be negative");
    assert.equal(validateField("-0.01", percent).error, "Can't be negative");
  });

  test("amounts above the maximum are rejected", () => {
    assert.equal(validateField(String(MAX_AMOUNT), currency).value, MAX_AMOUNT);
    assert.ok(validateField(String(MAX_AMOUNT + 1), currency).error);
    assert.ok(validateField("99999999999999999999999", currency).error);
  });

  test("percent boundaries are inclusive by default", () => {
    assert.equal(validateField("0", percent).value, 0);
    assert.equal(validateField("100", percent).value, 100);
    assert.equal(validateField("100.01", percent).error, "Enter a value from 0% to 100%");
  });

  test("exclusive upper bound", () => {
    const margin = { kind: "percent", max: 100, maxExclusive: true } as const;
    assert.equal(validateField("99.99", margin).value, 99.99);
    assert.equal(validateField("100", margin).error, "Must be at least 0% and below 100%");
  });

  test("negative ranges with an exclusive lower bound", () => {
    const growth = { kind: "percent", min: -100, minExclusive: true, max: 1000 } as const;
    assert.equal(validateField("-50", growth).value, -50);
    assert.equal(validateField("1000", growth).value, 1000);
    assert.equal(validateField("-100", growth).error, "Must be above -100% and at most 1,000%");
    assert.ok(validateField("1000.5", growth).error);
  });

  test("counts must be whole numbers", () => {
    assert.equal(validateField("25000", count).value, 25000);
    assert.equal(validateField("12.5", count).error, "Use a whole number");
  });
});
