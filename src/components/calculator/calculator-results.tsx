import { Minus, RotateCcw, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The building blocks every calculator on /calculator is assembled from, so
 * five different sets of inputs and results still read as one tool.
 */

/** Inputs on the left, results on the right; stacked on smaller screens. */
export function CalculatorLayout({
  inputs,
  results,
  onReset,
  canReset,
}: {
  inputs: ReactNode;
  results: ReactNode;
  onReset: () => void;
  canReset: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-12">
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="p-5 sm:p-8 lg:col-span-7"
      >
        <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">{inputs}</div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">Results update as you type.</p>
          <button
            type="button"
            onClick={onReset}
            disabled={!canReset}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-ink outline-none transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:text-ink dark:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>
      </form>

      <div
        data-testid="calculator-results"
        className="border-t border-border bg-[linear-gradient(180deg,rgba(25,107,245,0.05),rgba(25,107,245,0.015))] p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0"
      >
        {results}
      </div>
    </div>
  );
}

export function ResultsHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

type Tone = "default" | "brand" | "negative" | "empty";

const TONE_CLASS: Record<Tone, string> = {
  default: "text-ink dark:text-white",
  brand: "text-brand",
  negative: "text-red-600",
  empty: "text-muted-foreground/50",
};

/** A large figure with its label — the answer the merchant came for. */
export function HeadlineFigure({
  label,
  value,
  tone = "default",
  caption,
}: {
  label: string;
  value: string;
  tone?: Tone;
  caption?: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-[34px] font-semibold leading-tight tracking-tighter tabular-nums [overflow-wrap:anywhere] sm:text-[40px]",
          TONE_CLASS[tone],
        )}
      >
        {value}
      </p>
      {caption ? <p className="mt-0.5 text-sm text-muted-foreground">{caption}</p> : null}
    </div>
  );
}

/** Picks a tone from a signed number, or "empty" before there is a result. */
export function toneFor(ready: boolean, value: number | null, positive: Tone = "default"): Tone {
  if (!ready || value === null) return "empty";
  return value < 0 ? "negative" : positive;
}

export function ResultList({ children, className }: { children: ReactNode; className?: string }) {
  return <dl className={cn("divide-y divide-border/80", className)}>{children}</dl>;
}

export function ResultRow({
  label,
  value,
  note,
  negative,
  emphasis,
}: {
  label: string;
  value: string;
  note?: string;
  negative?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="min-w-0 text-sm text-muted-foreground">
        {label}
        {note ? <span className="mt-0.5 block text-xs text-muted-foreground/80">{note}</span> : null}
      </dt>
      <dd
        className={cn(
          "flex-shrink-0 whitespace-nowrap text-right text-sm tabular-nums",
          emphasis ? "font-semibold" : "font-medium",
          negative ? "text-red-600" : "text-ink dark:text-white",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/** A plain-language sentence summarising the result, announced to screen readers as it changes. */
export function ResultStatement({
  children,
  tone = "brand",
  live,
}: {
  children: ReactNode;
  tone?: "brand" | "muted";
  live?: boolean;
}) {
  return (
    <p
      aria-live={live ? "polite" : undefined}
      aria-atomic={live ? true : undefined}
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
        tone === "brand"
          ? "border-brand/15 bg-white/80 text-ink dark:bg-white/5 dark:text-white"
          : "border-border bg-muted/50 text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

/** Above / at / below break-even, told by icon and words as well as colour. */
export function StatusBadge({ status }: { status: "above" | "at" | "below" }) {
  const config = {
    above: { label: "Above break-even", Icon: TrendingUp, className: "bg-brand/10 text-brand" },
    at: { label: "At break-even", Icon: Minus, className: "bg-muted text-ink dark:text-white" },
    below: { label: "Below break-even", Icon: TrendingDown, className: "bg-red-50 text-red-700" },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      <config.Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {config.label}
    </span>
  );
}

export function ResultsSection({
  title,
  aside,
  children,
  className,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-7 border-t border-border pt-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-ink dark:text-white">{title}</h3>
        {aside}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
