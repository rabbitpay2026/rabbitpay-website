/**
 * Calendly popup-widget helper. Ported from the React project's
 * `src/lib/calendly.js` — behaviour is unchanged, only the env var name moved
 * from REACT_APP_CALENDLY_URL to NEXT_PUBLIC_CALENDLY_URL.
 *
 * "Book a Demo" must open Calendly ON THE SAME PAGE — no redirect, no new tab,
 * and no /book-a-demo route. Calendly's popup widget renders an overlay iframe
 * on top of the current page, which is exactly that behaviour. The widget assets
 * are loaded lazily on the first CTA click, so they never slow the initial load.
 *
 * If NEXT_PUBLIC_CALENDLY_URL is unset, `openCalendly()` warns and resolves to
 * `false` — the same behaviour the production React build shipped with. No
 * fallback is invented.
 */

import { trackEvent } from "@/lib/analytics";

export const CALENDLY_URL = (process.env.NEXT_PUBLIC_CALENDLY_URL ?? "").trim();

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyGlobal = {
  initPopupWidget: (opts: { url: string }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

let loaderPromise: Promise<void> | null = null;

function loadWidget(): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.Calendly) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector("link[data-calendly]")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      link.setAttribute("data-calendly", "true");
      document.head.appendChild(link);
    }

    const existing = document.querySelector("script[data-calendly]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("calendly load failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.setAttribute("data-calendly", "true");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      loaderPromise = null; // allow a retry on the next click
      reject(new Error("calendly load failed"));
    });
    document.head.appendChild(script);
  });

  return loaderPromise;
}

/**
 * Open the Calendly scheduling popup as an overlay on the CURRENT page.
 * Never redirects and never opens a new tab.
 * @param location analytics label for where the click came from.
 * @returns true if the popup opened, false if no URL is configured.
 */
export async function openCalendly(location?: string): Promise<boolean> {
  if (location) {
    trackEvent("cta_click", { location, label: "Start Free" });
  }
  if (!CALENDLY_URL) {
    // Loud, actionable message instead of a button that silently does nothing.
    console.warn(
      "[RabbitPay] Calendly link is not configured — the CTA cannot open. " +
        "Set NEXT_PUBLIC_CALENDLY_URL in the environment and rebuild.",
    );
    return false;
  }
  try {
    await loadWidget();
    if (typeof window.Calendly?.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return true;
    }
  } catch {
    /* swallow — nothing to open if the widget fails to load */
  }
  return false;
}
