"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useIsMounted } from "@/lib/use-is-mounted";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Scroll Progress.
 * Renders nothing until mounted, which keeps the SSR output and the first client
 * render identical (no hydration mismatch on the transform).
 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });
  const mounted = useIsMounted();

  if (!mounted) return null;

  return (
    <motion.div
      data-testid="scroll-progress"
      style={{ scaleX }}
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-accent to-brand-deep",
        className,
      )}
    />
  );
}
