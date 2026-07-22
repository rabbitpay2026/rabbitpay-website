// Calendly popup-widget helper.
//
// "Start Free" must open Calendly ON THE SAME PAGE — no redirect, no new tab.
// Calendly's popup widget renders an overlay iframe on top of the current page,
// which is exactly that behaviour. The widget assets are loaded lazily the first
// time a CTA is clicked, so they never slow the initial page load.
//
// Set the scheduling link at build time via REACT_APP_CALENDLY_URL. Until it is
// provided, `openCalendly()` resolves to `false` so callers can gracefully fall
// back to the lead-capture modal.

import { trackEvent } from "@/lib/analytics";

export const CALENDLY_URL = (process.env.REACT_APP_CALENDLY_URL || "").trim();

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

let loaderPromise = null;

function loadWidget() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  if (window.Calendly) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
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
 * Never redirects and never opens a new tab. Pass an optional location label to
 * record a `cta_click` analytics event. Shared by every "Start Free" CTA.
 * @param {string} [location] - analytics label for where the click came from.
 * @returns {Promise<boolean>} true if the popup opened, false if no URL is set.
 */
export async function openCalendly(location) {
  if (typeof location === "string" && location) {
    trackEvent("cta_click", { location, label: "Start Free" });
  }
  if (!CALENDLY_URL) return false;
  try {
    await loadWidget();
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      return true;
    }
  } catch {
    /* swallow — nothing to open if the widget fails to load */
  }
  return false;
}
