"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Warp Background
 * A layered background with animated conic gradient orbs and grain overlay.
 * Pairs with Particles for the final CTA.
 */
export function WarpBackground({ children, className }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-[#0B0817] text-white",
        className,
      )}
    >
      {/* Warp orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl [background:conic-gradient(from_var(--rotate,180deg),#196BF5,#22D3EE,#60a5fa,#196BF5)] animate-[gradient_12s_linear_infinite] [background-size:200%_200%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-[-140px] h-[560px] w-[560px] rounded-full opacity-60 blur-3xl [background:conic-gradient(from_var(--rotate,20deg),#0D4CB3,#4A8CFA,#3B82F6,#0D4CB3)] animate-[gradient_16s_linear_infinite] [background-size:200%_200%]"
      />
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      {/* Grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 noise-overlay" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
