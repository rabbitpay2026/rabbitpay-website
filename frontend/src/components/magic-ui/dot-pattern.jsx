"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Dot Pattern
 * Subtle SVG dot backdrop used behind sections.
 */
export function DotPattern({
  width = 22,
  height = 22,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
}) {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        glow ? "text-brand/25" : "text-foreground/[0.08]",
        "dark:text-foreground/[0.14]",
        className,
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={0}
          y={0}
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
