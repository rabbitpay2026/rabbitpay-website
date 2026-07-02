"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Globe (simplified)
 * SVG-based rotating world grid with pulsing city markers.
 * Lightweight replacement for cobe with the same visual intent.
 */
export function Globe({ className, cities = [] }) {
  const rotateRef = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    let raf;
    const step = () => {
      rotateRef.current = (rotateRef.current + 0.15) % 360;
      const el = document.getElementById("rp-globe-rotor");
      if (el) el.setAttribute("transform", `rotate(${rotateRef.current} 200 200)`);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Grid of latitude/longitude ellipses for the illusion of a wireframe globe
  const lats = [-60, -30, 0, 30, 60];

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-md", className)}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.35),transparent_60%)]" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="g-fill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.24" />
            <stop offset="70%" stopColor="#4C1D95" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="170" fill="url(#g-fill)" />
        <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(109,40,217,0.35)" strokeWidth="1" />
        <g id="rp-globe-rotor" style={{ transformOrigin: "200px 200px" }}>
          {/* Longitudes */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <ellipse
              key={deg}
              cx="200"
              cy="200"
              rx={170 * Math.abs(Math.cos((deg * Math.PI) / 180))}
              ry="170"
              fill="none"
              stroke="rgba(109,40,217,0.22)"
              strokeWidth="1"
            />
          ))}
          {/* Latitudes */}
          {lats.map((l) => {
            const ry = 170 * Math.cos((l * Math.PI) / 180);
            return (
              <ellipse
                key={l}
                cx="200"
                cy={200 + 170 * Math.sin((l * Math.PI) / 180) * 0}
                rx="170"
                ry={Math.max(20, ry)}
                fill="none"
                stroke="rgba(109,40,217,0.18)"
                strokeWidth="1"
                transform={`translate(0 ${(-l / 90) * 100})`}
              />
            );
          })}
        </g>
        {/* City markers on top (India) */}
        {cities.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            <circle r="9" fill="#7C3AED" opacity="0.18">
              <animate
                attributeName="r"
                values="6;14;6"
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.5" fill="#7C3AED" />
            <text
              x="10"
              y="4"
              className="font-medium"
              fontSize="10"
              fill="currentColor"
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
