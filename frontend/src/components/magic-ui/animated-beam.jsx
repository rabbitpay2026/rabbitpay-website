"use client";
import { forwardRef, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI - Animated Beam
 */
export const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "rgba(15,23,42,0.12)",
  pathWidth = 2,
  pathOpacity = 0.6,
  gradientStartColor = "#196BF5",
  gradientStopColor = "#4A8CFA",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  className,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDim, setSvgDim] = useState({ w: 0, h: 0 });

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef?.current || !fromRef?.current || !toRef?.current) return;
      const cont = containerRef.current.getBoundingClientRect();
      const from = fromRef.current.getBoundingClientRect();
      const to = toRef.current.getBoundingClientRect();
      const svgW = cont.width;
      const svgH = cont.height;
      if (svgW === 0 || svgH === 0) return;
      setSvgDim({ w: svgW, h: svgH });
      const startX = from.left - cont.left + from.width / 2 + startXOffset;
      const startY = from.top - cont.top + from.height / 2 + startYOffset;
      const endX = to.left - cont.left + to.width / 2 + endXOffset;
      const endY = to.top - cont.top + to.height / 2 + endYOffset;
      const controlY = startY - curvature;
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(updatePath);
      updatePath._raf2 = raf2;
    });
    const ro = new ResizeObserver(updatePath);
    if (containerRef?.current) ro.observe(containerRef.current);
    if (fromRef?.current) ro.observe(fromRef.current);
    if (toRef?.current) ro.observe(toRef.current);
    window.addEventListener("resize", updatePath);

    return () => {
      cancelAnimationFrame(raf1);
      if (updatePath._raf2) cancelAnimationFrame(updatePath._raf2);
      ro.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute inset-0 h-full w-full transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDim.w || 100} ${svgDim.h || 100}`}
      preserveAspectRatio="none"
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity={1} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0 }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

export const BeamNode = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-14 items-center justify-center rounded-2xl border border-border bg-card shadow-sm sm:size-16",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
BeamNode.displayName = "BeamNode";
