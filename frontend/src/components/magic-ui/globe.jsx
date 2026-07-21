"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI - India Map (simplified from Globe)
 */
export function Globe({ className, cities = [] }) {
  const rotateRef = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let raf;
    const start = performance.now();
    const step = (t) => {
      rotateRef.current = (Math.sin((t - start) / 1600) + 1) / 2;
      const el = document.getElementById("rp-india-halo");
      if (el) el.setAttribute("r", 170 + 4 * rotateRef.current);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-md", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_45%,rgba(25,107,245,0.35),transparent_65%)]"
      />
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="rp-india-fill" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#E8F1FE" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#4A8CFA" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0D4CB3" stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id="rp-city-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A8CFA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4A8CFA" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="200" cy="200" rx="175" ry="175" fill="url(#rp-india-fill)" />
        <ellipse
          id="rp-india-halo"
          cx="200"
          cy="200"
          rx="170"
          ry="170"
          fill="none"
          stroke="rgba(25,107,245,0.35)"
          strokeWidth="1"
        />

        {cities.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <circle r="14" fill="url(#rp-city-halo)">
              <animate attributeName="r" values="8;18;8" dur="2.6s" begin={`${i * 0.28}s`} repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#196BF5" />
            <text x="10" y="4" className="font-medium" fontSize="11" fill="#0D4CB3">
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
