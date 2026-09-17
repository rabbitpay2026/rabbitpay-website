/**
 * Display formatting for /calculator results and inputs, in Indian notation.
 *
 * `null` (a ratio with nothing to divide by) renders as an em dash, and every
 * function here returns a string that is safe to show — never "NaN",
 * "Infinity", "undefined" or "-0".
 */

export const EMPTY_VALUE = "—";
const MINUS = "−";

const isShowable = (value: number | null | undefined): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** Round to `digits`, and fold a result that rounds to zero into a plain 0. */
function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  const rounded = Math.round(Math.abs(value) * factor) / factor;
  return rounded === 0 ? 0 : Math.sign(value) * rounded;
}

function group(value: number, maxDigits: number, minDigits = 0) {
  return Math.abs(value).toLocaleString("en-IN", {
    maximumFractionDigits: maxDigits,
    minimumFractionDigits: minDigits,
  });
}

/** ₹1,24,500 — paise shown only below ₹1,000, where they are still meaningful. */
export function formatCurrency(value: number | null | undefined): string {
  if (!isShowable(value)) return EMPTY_VALUE;
  const digits = Math.abs(value) < 1000 ? 2 : 0;
  const rounded = roundTo(value, digits);
  return `${rounded < 0 ? MINUS : ""}₹${group(rounded, digits)}`;
}

/** A difference: +₹90, −₹90, or ₹0 when there is none. */
export function formatCurrencyChange(value: number | null | undefined): string {
  const formatted = formatCurrency(value);
  if (!isShowable(value) || formatted.startsWith(MINUS) || formatted === "₹0") return formatted;
  return `+${formatted}`;
}

/** 18.4% */
export function formatPercent(value: number | null | undefined, digits = 1): string {
  if (!isShowable(value)) return EMPTY_VALUE;
  const rounded = roundTo(value, digits);
  return `${rounded < 0 ? MINUS : ""}${group(rounded, digits)}%`;
}

/** 3.25× */
export function formatMultiple(value: number | null | undefined): string {
  if (!isShowable(value)) return EMPTY_VALUE;
  const rounded = roundTo(value, 2);
  return `${rounded < 0 ? MINUS : ""}${group(rounded, 2, 2)}×`;
}

/** Order counts: whole numbers, with one decimal kept for small fractional estimates. */
export function formatCount(value: number | null | undefined): string {
  if (!isShowable(value)) return EMPTY_VALUE;
  const rounded = roundTo(value, 1);
  return `${rounded < 0 ? MINUS : ""}${group(rounded, 1)}`;
}

/**
 * "₹12.45 lakh" / "₹3.2 crore" — the way Indian merchants say large amounts.
 * `null` below one lakh, where the digits already read naturally.
 */
export function formatIndianUnits(value: number | null | undefined): string | null {
  if (!isShowable(value)) return null;
  const abs = Math.abs(value);
  const sign = value < 0 ? MINUS : "";
  if (abs >= 1e7) return `${sign}₹${group(roundTo(abs / 1e7, 2), 2)} crore`;
  if (abs >= 1e5) return `${sign}₹${group(roundTo(abs / 1e5, 2), 2)} lakh`;
  return null;
}

/**
 * An input's raw text with Indian digit grouping, for display while the field
 * is not being edited. Text that is not a plain number is returned untouched,
 * so an invalid entry stays visible next to its error message.
 */
export function groupDigits(raw: string): string {
  const cleaned = raw.replace(/[,\s ]/g, "");
  const match = /^(-?)(\d+)(\.\d*)?$/.exec(cleaned);
  if (!match) return raw;
  const [, sign, integer, fraction = ""] = match;
  const grouped = BigInt(integer).toLocaleString("en-IN");
  return `${sign}${grouped}${fraction}`;
}
