"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Animated Circular Progress Bar
 * SVG stroke-dashoffset animation with a labelled percentage.
 */
export function AnimatedCircularProgress({
  value = 45,
  min = 0,
  max = 100,
  gaugePrimaryColor = "#6D28D9",
  gaugeSecondaryColor = "rgba(109,40,217,0.14)",
  size = 220,
  strokeWidth = 14,
  label,
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [progress, setProgress] = useState(0);
  const pct = Math.round(((value - min) / (max - min)) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setProgress(pct), 100);
      return () => clearTimeout(t);
    }
  }, [inView, pct]);

  return (
    <div
      ref={ref}
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl sm:text-5xl font-semibold tracking-tight tabular-nums text-ink dark:text-white">
          {progress}%
        </span>
        {label ? (
          <span className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
