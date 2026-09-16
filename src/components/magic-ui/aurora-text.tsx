import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Aurora Text
 * Animated multi-color gradient text (respects prefers-reduced-motion via the
 * `.aurora-text` utility in globals.css). Pure CSS — no client boundary needed.
 */
export function AuroraText({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-testid="aurora-text" className={cn("aurora-text inline-block", className)}>
      {children}
    </Tag>
  );
}
