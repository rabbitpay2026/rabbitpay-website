import { ArrowRight } from "lucide-react";
import { CalculatorLink } from "@/components/calculator/calculator-link";
import { CALCULATORS } from "@/data/calculators";

/**
 * The hub grid on /calculator: one card per calculator, each linking to its own
 * page. No form is rendered here.
 */
export function CalculatorHub() {
  return (
    <section aria-label="Calculators" className="relative pb-20 pt-10 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calculator) => (
            <li key={calculator.id}>
              <CalculatorLink
                calculator={calculator.id}
                href={calculator.href}
                testId={`calculator-card-${calculator.id}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] outline-none transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  {calculator.hint}
                </span>
                <span className="mt-3 text-lg font-semibold tracking-tight text-ink dark:text-white">
                  {calculator.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {calculator.summary}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Open calculator
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </CalculatorLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
