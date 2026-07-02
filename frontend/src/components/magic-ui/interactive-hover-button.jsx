"use client";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Interactive Hover Button
 * Compact CTA that expands a purple pill on hover.
 */
export function InteractiveHoverButton({
  children,
  className,
  as = "a",
  ...props
}) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-brand/20 bg-white/70 dark:bg-white/5 px-5 py-2 text-sm font-medium text-ink dark:text-white backdrop-blur-md transition-colors",
        "hover:border-brand",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
      <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 group-hover:text-white">
        <ArrowRight
          className="h-3.5 w-3.5 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2.25}
        />
      </span>
      {/* expanding pill */}
      <span className="absolute inset-0 z-0 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </Comp>
  );
}
