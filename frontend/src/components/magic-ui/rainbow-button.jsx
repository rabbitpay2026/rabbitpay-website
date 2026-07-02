"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Rainbow Button
 * CTA with a soft rainbow gradient underline glow.
 */
export function RainbowButton({ children, className, as = "a", ...props }) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "group relative inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-semibold text-white transition-colors",
        // Base
        "[background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",
        // Before glow
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
        // Main
        "bg-[linear-gradient(#4c1d95,#4c1d95),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        "animate-rainbow",
        // Dark
        "dark:bg-[linear-gradient(#0f0f14,#0f0f14),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
        className,
      )}
      style={{ "--speed": "3s" }}
      {...props}
    >
      <span className="relative z-10 text-sm sm:text-base tracking-tight">
        {children}
      </span>
    </Comp>
  );
}
