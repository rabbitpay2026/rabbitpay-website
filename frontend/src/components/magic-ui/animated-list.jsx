"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Animated List
 * Cycles items with entrance/exit animations, used for "live order events".
 */
export function AnimatedList({
  items = [],
  delay = 2200,
  className,
  visibleCount = 4,
  renderItem,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, delay);
    return () => clearInterval(t);
  }, [items.length, delay]);

  const visible = useMemo(() => {
    if (items.length === 0) return [];
    const out = [];
    for (let i = 0; i < Math.min(visibleCount, items.length); i++) {
      out.push(items[(index + i) % items.length]);
    }
    return out;
  }, [items, index, visibleCount]);

  return (
    <div className={cn("flex flex-col gap-2 relative", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((item, i) => (
          <motion.div
            key={`${index}-${i}`}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1 - i * 0.15, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            {renderItem ? renderItem(item, i) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
