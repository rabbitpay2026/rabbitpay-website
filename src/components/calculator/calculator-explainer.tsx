import { Info } from "lucide-react";
import type { CalculatorContent } from "@/data/calculators";

/**
 * "What is this calculator / how is it calculated / formula / why it matters"
 * for one calculator, from `data/calculators.ts`.
 */
export function CalculatorExplainer({ calculator }: { calculator: CalculatorContent }) {
  const { explainer } = calculator;

  return (
    <div className="mt-12 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-8 lg:col-span-5">
        <ExplainerBlock title="What is this calculator?">
          <p>{explainer.whatIs}</p>
        </ExplainerBlock>
        <ExplainerBlock title="Why it matters">
          <p>{explainer.whyItMatters}</p>
        </ExplainerBlock>
        {explainer.note ? (
          <aside className="flex gap-3 rounded-2xl border border-brand/15 bg-brand-soft/50 p-4 sm:p-5">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">{explainer.note.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {explainer.note.body}
              </p>
            </div>
          </aside>
        ) : null}
      </div>

      <div className="space-y-8 lg:col-span-7">
        <ExplainerBlock title="How is it calculated?">
          <ol className="space-y-3">
            {explainer.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-brand"
                >
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </ExplainerBlock>

        <ExplainerBlock title="Formula">
          <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-muted/40">
            {explainer.formulas.map((formula) => (
              <div
                key={formula.result}
                className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-4 sm:px-5"
              >
                <dt className="text-sm font-semibold text-ink dark:text-white">{formula.result}</dt>
                <dd className="font-mono text-[13px] leading-relaxed text-ink/80 [overflow-wrap:anywhere] dark:text-white/80">
                  = {formula.expression}
                </dd>
              </div>
            ))}
          </dl>
        </ExplainerBlock>
      </div>
    </div>
  );
}

function ExplainerBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-lg font-semibold tracking-tight text-ink dark:text-white">{title}</h3>
      <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
