"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Magic UI — Blur Fade
 * Entrance transition: gentle translate + fade.
 * (Blur removed to avoid framer-motion filter-interpolation warnings.)
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 12,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y: yOffset };
  const animate = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={inView ? animate : undefined}
      animate={!inView ? animate : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
