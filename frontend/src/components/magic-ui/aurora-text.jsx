"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Aurora Text
 * Animated multi-color gradient text (respects prefers-reduced-motion).
 */
export function AuroraText({ children, className, as: Tag = "span" }) {
  return (
    <Tag
      data-testid="aurora-text"
      className={cn("aurora-text inline-block", className)}
    >
      {children}
    </Tag>
  );
}
