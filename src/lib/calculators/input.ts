/**
 * Parsing and validation for calculator inputs.
 *
 * Every field on /calculator is a text input holding exactly what the merchant
 * typed. This turns that string into a number the formulas can use, or into a
 * message explaining why it cannot be used. Nothing here throws, and nothing
 * here ever returns NaN or Infinity.
 *
 * Dependency-free on purpose, so `node --test` can run it without a bundler.
 */

export type FieldKind = "currency" | "percent" | "count";

export type FieldRule = {
  kind: FieldKind;
  /** Inclusive lower bound. Defaults to 0 — costs and counts cannot be negative. */
  min?: number;
  /** Inclusive upper bound. Defaults per kind, see `DEFAULT_MAX`. */
  max?: number;
  /** When true, the value must be strictly below `max` (a 100% margin breaks the maths). */
  maxExclusive?: boolean;
  /** When true, the value must be strictly above `min` (a −100% growth rate is not growth). */
  minExclusive?: boolean;
};

export type FieldResult = {
  /** The parsed number, or `null` when the field is empty or invalid. */
  value: number | null;
  /** A short, human message when the input cannot be used. */
  error: string | null;
};

/** ₹1 lakh crore. Large enough for any store, small enough to stay precise. */
export const MAX_AMOUNT = 1e12;
/** Ten billion sessions a month. */
export const MAX_COUNT = 1e10;

const DEFAULT_MAX: Record<FieldKind, number> = {
  currency: MAX_AMOUNT,
  percent: 100,
  count: MAX_COUNT,
};

const NUMBER_PATTERN = /^[-+]?(\d+\.?\d*|\.\d+)$/;

/**
 * The number in a raw input string, or `null` when it holds none.
 *
 * Accepts what merchants paste: Indian or Western digit grouping, a leading ₹,
 * a trailing %, and stray spaces. Rejects anything else rather than guessing —
 * "12abc" is not 12.
 */
export function parseNumber(raw: string): number | null {
  const cleaned = raw.replace(/[₹,%\s ]/g, "").replace(/^−/, "-");
  if (!NUMBER_PATTERN.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

const formatLimit = (value: number) => value.toLocaleString("en-IN");

function rangeMessage(rule: FieldRule, min: number, max: number) {
  const unit = rule.kind === "percent" ? "%" : "";
  if (rule.kind === "currency" && min === 0) return "Enter an amount up to ₹1 lakh crore";
  if (rule.kind === "count" && min === 0) return `Enter a number up to ${formatLimit(max)}`;
  if (!rule.minExclusive && !rule.maxExclusive) {
    return `Enter a value from ${formatLimit(min)}${unit} to ${formatLimit(max)}${unit}`;
  }
  const lower = `${rule.minExclusive ? "above" : "at least"} ${formatLimit(min)}${unit}`;
  const upper = `${rule.maxExclusive ? "below" : "at most"} ${formatLimit(max)}${unit}`;
  return `Must be ${lower} and ${upper}`;
}

/** Validate one raw input against its rule. An empty field is valid and has no value. */
export function validateField(raw: string, rule: FieldRule): FieldResult {
  if (raw.trim() === "") return { value: null, error: null };

  const value = parseNumber(raw);
  if (value === null) return { value: null, error: "Enter a number" };

  const min = rule.min ?? 0;
  const max = rule.max ?? DEFAULT_MAX[rule.kind];

  if (min === 0 && value < 0 && !rule.minExclusive) {
    return { value: null, error: "Can't be negative" };
  }
  if (rule.kind === "count" && !Number.isInteger(value)) {
    return { value: null, error: "Use a whole number" };
  }

  const belowMin = rule.minExclusive ? value <= min : value < min;
  const aboveMax = rule.maxExclusive ? value >= max : value > max;
  if (belowMin || aboveMax) return { value: null, error: rangeMessage(rule, min, max) };

  return { value: value === 0 ? 0 : value, error: null };
}
