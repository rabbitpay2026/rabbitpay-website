"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Bento Grid + Card
 * Composition-friendly grid primitives for the "Why RabbitPay" section.
 */
export function BentoGrid({ children, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({ children, className, colSpan, rowSpan }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground",
        colSpan,
        rowSpan,
        className,
      )}
    >
      {children}
    </div>
  );
}
