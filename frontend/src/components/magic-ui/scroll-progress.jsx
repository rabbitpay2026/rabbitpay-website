"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Scroll Progress
 * Fixed thin bar at the top of the viewport showing scroll progress.
 */
export function ScrollProgress({ className }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  if (!visible) return null;
  return (
    <motion.div
      data-testid="scroll-progress"
      style={{ scaleX }}
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-accent to-fuchsia-400",
        className,
      )}
    />
  );
}
