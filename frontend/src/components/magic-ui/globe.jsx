"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — India Map (simplified from Globe)
 * Renders a soft radial "India footprint" with pulsing city markers.
 * No world wireframe, no orbits — just the India blob with city dots.
 */
export function Globe({ className, cities = [] }) {
  const rotateRef = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // Subtle breathing on the halo — no rotation, no orbits.
    let raf;
    const start = performance.now();
    const step = (t) => {
      rotateRef.current = (Math.sin((t - start) / 1600) + 1) / 2; // 0..1
      const el = document.getElementById("rp-india-halo");
      if (el) el.setAttribute("r", 170 + 4 * rotateRef.current);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-md", className)}
    >
      {/* Soft ambient bloom behind the India shape */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_45%,rgba(124,58,237,0.35),transparent_65%)]"
      />
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="rp-india-fill" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#7C3AED" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.02" />
          </radialGradient>
          <radialGradient id="rp-city-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft India footprint (elliptical bloom) */}
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="175"
          fill="url(#rp-india-fill)"
        />
        <ellipse
          id="rp-india-halo"
          cx="200"
          cy="200"
          rx="170"
          ry="170"
          fill="none"
          stroke="rgba(109,40,217,0.35)"
          strokeWidth="1"
        />

        {/* City markers — India-shaped cluster (Delhi north, Chennai/Bengaluru south) */}
        {cities.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <circle r="14" fill="url(#rp-city-halo)">
              <animate
                attributeName="r"
                values="8;18;8"
                dur="2.6s"
                begin={`${i * 0.28}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="4" fill="#7C3AED" />
            <text
              x="10"
              y="4"
              className="font-medium"
              fontSize="11"
              fill="#4C1D95"
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
