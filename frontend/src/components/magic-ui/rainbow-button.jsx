"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI - Rainbow Button
 */
export function RainbowButton({ children, className, as = "a", ...props }) {
  const Comp = as;
  return (
    <Comp
      className={cn(
        "group relative inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-semibold text-white transition-colors",
        "[background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
        "bg-[linear-gradient(#196BF5,#196BF5),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-2)))]",
        "animate-rainbow",
        "dark:bg-[linear-gradient(#020617,#020617),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-2)))]",
        className,
      )}
      style={{ "--speed": "3s" }}
      {...props}
    >
      <span className="relative z-10 text-sm tracking-tight sm:text-base">
        {children}
      </span>
    </Comp>
  );
}
