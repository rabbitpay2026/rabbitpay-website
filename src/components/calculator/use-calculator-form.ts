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
 * The form opens on `defaults`, and Reset puts those exact values back.
 *
 * Results are computed live on every render, so there is no Calculate button.
 * `calculator_calculate` is sent the first time an edit leaves the form with a
 * complete, valid set of inputs, and again after a Reset — never on load, where
 * the merchant has not calculated anything yet, and never on every keystroke.
 *
 * `rules` must be a module-level constant: its keys define the form.
 */
export function useCalculatorForm<K extends string>({
  calculator,
  rules,
  required,
  defaults,
}: {
  calculator: CalculatorId;
  rules: Rules<K>;
  required: readonly NoInfer<K>[];
  defaults: Readonly<Record<NoInfer<K>, string>>;
}) {
  const [raw, setRaw] = useState<Record<K, string>>(defaults);
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
    setRaw(defaults);
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
    /** Nothing has been changed from the defaults, so there is nothing to reset. */
    isPristine: (Object.keys(rules) as K[]).every((key) => raw[key] === defaults[key]),
    /** A field's number, with an empty or invalid field counting as 0. */
    valueOf: (key: K) => fields[key].value ?? 0,
  };
}
