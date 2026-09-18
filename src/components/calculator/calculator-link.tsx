"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { trackCalculatorEvent } from "@/components/calculator/calculator-analytics";
import type { CalculatorId } from "@/data/calculators";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

/**
 * A link to one calculator's page that reports `calculator_selected`.
 *
 * Every route into a calculator — the hub cards and the switcher on each page —
 * goes through this, so choosing a calculator is counted in one place.
 */
export function CalculatorLink({
  calculator,
  href,
  current,
  className,
  testId,
  children,
}: {
  calculator: CalculatorId;
  href: string;
  /** True on the page this link points at. */
  current?: boolean;
  className?: string;
  testId?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      data-testid={testId}
      className={className}
      onClick={() => {
        if (!current) trackCalculatorEvent(ANALYTICS_EVENTS.CALCULATOR_SELECTED, calculator);
      }}
    >
      {children}
    </Link>
  );
}
