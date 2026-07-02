"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Script Copy Button
 * Displays a shell snippet and copies to clipboard on click.
 */
export function ScriptCopyButton({ command, className }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* noop */
    }
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-3 rounded-xl border border-border bg-white/70 dark:bg-white/5 px-4 py-3 backdrop-blur",
        className,
      )}
    >
      <code className="truncate font-mono text-sm text-ink dark:text-white">
        <span className="text-brand mr-2">$</span>
        {command}
      </code>
      <button
        data-testid="script-copy-button"
        onClick={onCopy}
        aria-label="Copy command"
        className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-brand hover:border-brand"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
