"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Border Beam
 * A conic-gradient beam that traces the border of the parent.
 */
export function BorderBeam({
  size = 200,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#7C3AED",
  colorTo = "#22D3EE",
  className,
  delay = 0,
}) {
  return (
    <div
      style={{
        "--size": `${size}px`,
        "--duration": duration,
        "--anchor": `${anchor}%`,
        "--border-width": `${borderWidth}px`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent]",
        // mask so the beam only shows on the border
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // Beam
        "after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--size))]",
        className,
      )}
    />
  );
}
