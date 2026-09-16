import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Magic UI — Retro Grid. Perspective-tilted grid backdrop, pure CSS. */
export function RetroGrid({ className, angle = 65 }: { className?: string; angle?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ "--grid-angle": `${angle}deg` } as CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className,
      )}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,rgba(109,40,217,0.18)_1px,transparent_0),linear-gradient(to_bottom,rgba(109,40,217,0.18)_1px,transparent_0)] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,rgba(167,139,250,0.28)_1px,transparent_0),linear-gradient(to_bottom,rgba(167,139,250,0.28)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-70%" />
    </div>
  );
}
