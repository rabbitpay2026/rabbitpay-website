import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Marquee
 * Horizontally scrolling row with pause on hover. Pure CSS animation, so this
 * stays a Server Component.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 4,
  duration,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
}) {
  const style = {
    "--gap": "1rem",
    ...(duration ? { "--duration": `${duration}s` } : {}),
  } as CSSProperties;

  return (
    <div
      style={style}
      className={cn(
        "group flex overflow-hidden [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee flex-col" : "flex-row",
            !vertical && !reverse && "animate-marquee",
            !vertical && reverse && "animate-marquee-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
