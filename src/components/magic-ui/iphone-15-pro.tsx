import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — iPhone 15 Pro
 * Realistic CSS-only device frame that renders any React children as the screen.
 */
export function IPhone15Pro({
  children,
  className,
  width = 380,
}: {
  children?: ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <div className={cn("relative mx-auto", className)} style={{ width, aspectRatio: "9 / 19" }}>
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-[3.2rem] bg-[linear-gradient(160deg,#1f2937_0%,#0f172a_45%,#1f2937_100%)] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)_inset]" />
      {/* Inner bezel */}
      <div className="absolute inset-[6px] rounded-[3rem] bg-black" />
      {/* Side buttons */}
      <div className="absolute left-[-2px] top-[22%] h-14 w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute left-[-2px] top-[36%] h-20 w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute left-[-2px] top-[54%] h-20 w-[3px] rounded-l bg-neutral-700" />
      <div className="absolute right-[-2px] top-[30%] h-24 w-[3px] rounded-r bg-neutral-700" />
      {/* Screen */}
      <div className="absolute inset-[14px] overflow-hidden rounded-[2.6rem] bg-white dark:bg-neutral-950">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2 z-30 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
        {/* Status bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-[10px] text-[10px] font-semibold text-black dark:text-white">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-black dark:bg-white" />
            <span className="h-[7px] w-[7px] rounded-full bg-black/50 dark:bg-white/50" />
            <span className="h-[7px] w-[10px] rounded-[2px] bg-black dark:bg-white" />
          </span>
        </div>
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
}
