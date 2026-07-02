"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Marquee
 * Horizontally scrolling row with pause on hover.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 4,
  duration,
}) {
  return (
    <div
      style={
        duration
          ? { "--duration": `${duration}s`, "--gap": "1rem" }
          : { "--gap": "1rem" }
      }
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
