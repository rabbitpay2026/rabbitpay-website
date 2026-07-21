"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Shimmer Button
 * Primary pill CTA with animated shimmer edge.
 */
export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.06em",
  borderRadius = "9999px",
  shimmerDuration = "3s",
    background = "#0D4CB3",
    as = "a",
    ...props
  }) {
    const Comp = as;
    return (
      <Comp
        style={{
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        }}
        className={cn(
          "group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
          "shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_0_0_rgba(255,255,255,0.15)_inset] transition-all duration-300 hover:shadow-[0_2px_8px_rgba(25,107,245,0.45),0_0_0_1px_rgba(255,255,255,0.2)_inset] active:translate-y-[1px]",
          className,
        )}
      {...props}
    >
      {/* Shimmer container */}
      <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      <span className="relative z-10 font-medium text-sm sm:text-base tracking-tight">
        {children}
      </span>
      {/* highlight */}
      <div className="absolute inset-0 [border-radius:var(--radius)] [background:linear-gradient(180deg,rgba(255,255,255,0.15),transparent_50%)]" />
      {/* backdrop */}
      <div className="absolute -z-20 inset-[var(--cut)] [background:var(--bg)] [border-radius:calc(var(--radius)-var(--cut))]" />
    </Comp>
  );
}
