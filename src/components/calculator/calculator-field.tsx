"use client";
import { useId, type ReactNode } from "react";
import { formatIndianUnits, groupDigits } from "@/lib/calculators/format";
import { parseNumber, type FieldKind, type FieldResult } from "@/lib/calculators/input";
import { cn } from "@/lib/utils";

/**
 * One numeric input on /calculator.
 *
 * A text input rather than `type="number"`, which silently drops what it cannot
 * parse, ignores digit grouping and changes value on a stray scroll. Nothing is
 * reformatted while the merchant types; Indian digit grouping is applied when
 * the field loses focus. The value is never swapped on focus, which would drop
 * the browser's select-all and make typing append to the old number.
 *
 * 16px text below `sm` stops iOS Safari zooming the page on focus.
 */
export function NumberField({
  label,
  kind,
  value,
  field,
  onChange,
  placeholder,
  hint,
  optional,
  allowNegative,
  className,
  children,
}: {
  label: string;
  kind: FieldKind;
  value: string;
  field: FieldResult;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  optional?: boolean;
  /** Mobile numeric keypads have no minus key, so these get the full keyboard. */
  allowNegative?: boolean;
  className?: string;
  /** Rendered under the input — used for rate presets. */
  children?: ReactNode;
}) {
  const id = useId();
  const messageId = `${id}-message`;
  const error = field.error;

  const units = kind === "currency" && !error ? formatIndianUnits(parseNumber(value)) : null;
  const message = error ?? hint;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink dark:text-white">
          {label}
        </label>
        {optional ? <span className="text-xs text-muted-foreground">Optional</span> : null}
      </div>

      <div className="relative mt-2">
        {kind === "currency" ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-muted-foreground sm:text-sm"
          >
            ₹
          </span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode={allowNegative ? "text" : kind === "count" ? "numeric" : "decimal"}
          autoComplete="off"
          spellCheck={false}
          maxLength={20}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => {
            const grouped = kind === "percent" ? value : groupDigits(value);
            if (grouped !== value) onChange(grouped);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "h-12 w-full rounded-xl border bg-white text-base tabular-nums text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 dark:bg-neutral-950/60 dark:text-white sm:h-11 sm:text-sm",
            kind === "currency" ? "pl-8" : "pl-3.5",
            kind === "percent" ? "pr-9" : "pr-3.5",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-border focus:border-brand focus:ring-brand/20",
          )}
        />
        {kind === "percent" ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-base text-muted-foreground sm:text-sm"
          >
            %
          </span>
        ) : null}
      </div>

      {message || units ? (
        <div className="mt-1.5 flex items-start justify-between gap-3 text-xs leading-relaxed">
          {message ? (
            <p
              id={messageId}
              className={error ? "font-medium text-red-600" : "text-muted-foreground"}
            >
              {message}
            </p>
          ) : (
            <span />
          )}
          {units ? (
            <span className="flex-shrink-0 font-medium tabular-nums text-muted-foreground">
              {units}
            </span>
          ) : null}
        </div>
      ) : null}

      {children}
    </div>
  );
}

/**
 * Small buttons that fill a field with a known value — RabbitPay's published
 * rates. They only ever write into the field, which stays editable.
 */
export function PresetButtons({
  label,
  options,
  disabledHint,
}: {
  label: string;
  options: { label: string; pressed: boolean; onSelect: () => void; disabled?: boolean }[];
  /** Shown when every option is disabled, explaining what unlocks them. */
  disabledHint?: string;
}) {
  const labelId = useId();
  const allDisabled = options.every((option) => option.disabled);

  return (
    <div role="group" aria-labelledby={labelId} className="mt-2.5 flex flex-wrap items-center gap-1.5">
      <span id={labelId} className="mr-0.5 text-xs text-muted-foreground">
        {label}
      </span>
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={option.onSelect}
          disabled={option.disabled}
          aria-pressed={option.pressed}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-50",
            option.pressed
              ? "border-brand bg-brand/10 text-brand"
              : "border-border bg-background text-ink/80 hover:border-brand hover:text-brand dark:text-white/80",
          )}
        >
          {option.label}
        </button>
      ))}
      {allDisabled && disabledHint ? (
        <span className="text-xs text-muted-foreground/80">{disabledHint}</span>
      ) : null}
    </div>
  );
}
