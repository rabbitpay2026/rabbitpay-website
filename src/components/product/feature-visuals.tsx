import { UPI_APPS } from "@/data/integrations";
import { PREFILL_FIELDS, RISK_CARDS } from "@/data/features";
import type { FeatureVisualKey } from "@/types";

/**
 * The three illustrations that sit beside each product feature row.
 * Ported from the React `sections/Features.jsx` (PrefillVisual / RiskVisual /
 * UpiVisual). All static — Server Components.
 */
export function FeatureVisual({ visual }: { visual: FeatureVisualKey }) {
  if (visual === "prefill") return <PrefillVisual />;
  if (visual === "risk") return <RiskVisual />;
  return <UpiVisual />;
}

function PrefillVisual() {
  return (
    <div className="mx-auto max-w-md space-y-3">
      {PREFILL_FIELDS.map((field) => (
        <FieldRow key={field.label} {...field} />
      ))}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-sm">
        <span className="font-medium text-brand">Address prefilled</span>
        <span className="font-mono text-xs text-muted-foreground">3 fields - 220 ms</span>
      </div>
    </div>
  );
}

function RiskVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {RISK_CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-border bg-white p-4 shadow-sm dark:bg-neutral-900/70"
        >
          <p className="text-sm font-semibold text-ink dark:text-white">{card.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{card.text}</p>
        </div>
      ))}
    </div>
  );
}

function UpiVisual() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {UPI_APPS.map((app) => (
        <div
          key={app.name}
          className="flex h-[72px] items-center justify-center rounded-2xl border border-border bg-white px-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-md dark:bg-neutral-900/70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/${app.file}`}
            alt={`${app.name} logo`}
            loading="lazy"
            className="max-h-8 w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function FieldRow({ label, value, fill }: { label: string; value: string; fill: number }) {
  return (
    <div className="rounded-2xl border border-border bg-background/75 p-4 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-success">Auto-filled</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-ink dark:text-white">{value}</p>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand transition-all duration-1000"
          style={{ width: `${fill}%` }}
        />
      </div>
    </div>
  );
}
