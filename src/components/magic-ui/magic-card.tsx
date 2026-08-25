"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Magic UI — Magic Card. Cursor-tracking radial highlight. */
export function MagicCard({
  children,
  className,
  gradientSize = 260,
  gradientColor = "#196BF5",
  gradientOpacity = 0.15,
}: {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-gradientSize);
  const my = useMotionValue(-gradientSize);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const bg = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mx}px ${my}px, ${gradientColor}, transparent 65%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <motion.div
        style={{ background: bg, opacity: gradientOpacity }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
