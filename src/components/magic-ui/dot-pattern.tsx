"use client";
import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Dot Pattern
 * Subtle SVG dot backdrop used behind sections. Client-side for `useId`, which
 * keeps the <pattern> id stable and unique between server and client renders.
 */
export function DotPattern({
  width = 22,
  height = 22,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
}: {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
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
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={0} y={0}>
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
