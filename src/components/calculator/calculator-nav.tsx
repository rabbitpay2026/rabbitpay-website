import { CalculatorLink } from "@/components/calculator/calculator-link";
import { CALCULATORS, type CalculatorId } from "@/data/calculators";
import { cn } from "@/lib/utils";

/**
 * The switcher on every calculator page: all five calculators, one link each,
 * with the current one raised and marked `aria-current` rather than told apart
 * by colour alone. Scrolls sideways on narrow screens.
 */
export function CalculatorNav({ active }: { active: CalculatorId }) {
  return (
    <nav
      aria-label="Calculators"
      data-testid="calculator-nav"
      className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex min-w-max gap-1 rounded-2xl border border-border bg-muted/60 p-1.5 lg:min-w-0">
        {CALCULATORS.map((calculator) => {
          const current = calculator.id === active;
          return (
            <li key={calculator.id} className="lg:flex-1">
              <CalculatorLink
                calculator={calculator.id}
                href={calculator.href}
                current={current}
                testId={`calculator-nav-${calculator.id}`}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-left text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand/40 lg:px-5 lg:py-3",
                  current
                    ? "bg-white font-semibold text-brand shadow-[0_2px_8px_rgba(15,23,42,0.08)] ring-1 ring-border dark:bg-white/10"
                    : "font-medium text-ink/70 hover:bg-white/60 hover:text-ink dark:text-white/70 dark:hover:bg-white/5",
                )}
              >
                <span className="block whitespace-nowrap">{calculator.label}</span>
                <span
                  className={cn(
                    "mt-0.5 hidden whitespace-nowrap text-xs font-normal lg:block",
                    current ? "text-muted-foreground" : "text-muted-foreground/80",
                  )}
                >
                  {calculator.hint}
                </span>
              </CalculatorLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
