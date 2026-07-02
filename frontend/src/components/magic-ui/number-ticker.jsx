"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Number Ticker
 * Animates a number into view using a tween that settles exactly at `value`.
 */
export function NumberTicker({
  value,
  className,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(direction === "down" ? value : 0);

  useEffect(() => {
    if (!inView) return;
    const from = direction === "down" ? value : 0;
    const to = direction === "down" ? 0 : value;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => setDisplay(to),
    });
    return () => controls.stop();
  }, [inView, value, direction, delay, duration]);

  return (
    <span
      ref={ref}
      data-testid="number-ticker"
      className={cn("inline-block tabular-nums tracking-tight", className)}
    >
      {prefix}
      {Number(display).toLocaleString("en-IN", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })}
      {suffix}
    </span>
  );
}
