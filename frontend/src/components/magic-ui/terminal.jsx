"use client";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Terminal
 * A realistic macOS-style terminal window that renders children as lines.
 */
export function Terminal({ children, className, title = "rabbitpay ~ install" }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-[#0B0B14] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.4)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="font-mono text-xs text-white/50">{title}</span>
        <div className="h-3 w-6" />
      </div>
      <div className="max-h-[420px] overflow-hidden p-5 font-mono text-[13px] leading-relaxed text-emerald-200/90">
        {children}
      </div>
    </div>
  );
}

export function TerminalLine({ children, prompt = "$", className }) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span className="text-brand">{prompt}</span>
      <span className="text-white">{children}</span>
    </div>
  );
}

export function TerminalOutput({ children, className }) {
  return (
    <div className={cn("pl-4 text-white/70", className)}>{children}</div>
  );
}
