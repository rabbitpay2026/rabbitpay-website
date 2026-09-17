"use client";
import { useRef, useState } from "react";
import { trackCalculatorEvent } from "@/components/calculator/calculator-analytics";
import type { CalculatorId } from "@/data/calculators";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { validateField, type FieldResult, type FieldRule } from "@/lib/calculators/input";

type Rules<K extends string> = Record<K, FieldRule>;

function validateAll<K extends string>(rules: Rules<K>, raw: Record<K, string>) {
  const fields = {} as Record<K, FieldResult>;
  for (const key of Object.keys(rules) as K[]) fields[key] = validateField(raw[key], rules[key]);
  return fields;
}

function isReady<K extends string>(fields: Record<K, FieldResult>, required: readonly K[]) {
  return (
    Object.values<FieldResult>(fields).every((field) => field.error === null) &&
    required.every((key) => fields[key].value !== null)
  );
}

/**
 * Input state for one calculator: the raw text of every field, each field's
 * validation, and Reset.
 *
 * Results are computed live on every render, so there is no Calculate button.
 * `calculator_calculate` is therefore sent the first time the required fields
 * all hold valid numbers — the moment a result first appears — and again only
 * after a Reset, rather than on every keystroke.
 *
 * `rules` must be a module-level constant: its keys define the form.
 */
export function useCalculatorForm<K extends string>({
  calculator,
  rules,
  required,
}: {
  calculator: CalculatorId;
  rules: Rules<K>;
  required: readonly NoInfer<K>[];
}) {
  const empty = Object.fromEntries(Object.keys(rules).map((key) => [key, ""])) as Record<K, string>;
  const [raw, setRaw] = useState(empty);
  const reported = useRef(false);

  const fields = validateAll(rules, raw);

  const setField = (key: K, value: string) => {
    const next = { ...raw, [key]: value };
    setRaw(next);
    if (!reported.current && isReady(validateAll(rules, next), required)) {
      reported.current = true;
      trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_CALCULATE, calculator);
    }
  };

  const reset = () => {
    setRaw(empty);
    reported.current = false;
    trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_RESET, calculator);
  };

  return {
    raw,
    fields,
    setField,
    reset,
    /** Every required field holds a valid number and no field has an error. */
    ready: isReady(fields, required),
    hasErrors: Object.values<FieldResult>(fields).some((field) => field.error !== null),
    isEmpty: Object.values<string>(raw).every((value) => value.trim() === ""),
    /** A field's number, with an empty or invalid field counting as 0. */
    valueOf: (key: K) => fields[key].value ?? 0,
  };
}
