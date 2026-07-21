"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI - Neon Gradient Card
 */
export function NeonGradientCard({
  children,
  className,
  borderSize = 2,
  borderRadius = 20,
  neonColors = { firstColor: "#196BF5", secondColor: "#4A8CFA" },
}) {
  return (
    <div
      style={{
        "--border-size": `${borderSize}px`,
        "--border-radius": `${borderRadius}px`,
        "--neon-first": neonColors.firstColor,
        "--neon-second": neonColors.secondColor,
      }}
      className={cn(
        "relative rounded-[var(--border-radius)] p-[var(--border-size)]",
        "[background:conic-gradient(from_var(--rotate,0deg),var(--neon-first),var(--neon-second),var(--neon-first))]",
        "before:absolute before:-inset-1 before:-z-10 before:rounded-[calc(var(--border-radius)+4px)] before:opacity-30 before:blur-2xl before:[background:conic-gradient(from_var(--rotate,0deg),var(--neon-first),var(--neon-second),var(--neon-first))]",
        "animate-[gradient_10s_linear_infinite] [background-size:200%_200%]",
        className,
      )}
    >
      <div className="h-full w-full rounded-[calc(var(--border-radius)-var(--border-size))] bg-card text-card-foreground">
        {children}
      </div>
    </div>
  );
}
