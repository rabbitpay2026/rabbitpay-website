// Lightweight analytics + Calendly popup helpers used across the site.
// Emits events to Plausible (baked into index.html) and to GA4 when a
// `REACT_APP_GA4_ID` is provided at build time.

const GA4_ID = (process.env.REACT_APP_GA4_ID || "").trim();

// Inject GA4 gtag.js once on first import (only when a real ID is provided).
if (typeof window !== "undefined" && GA4_ID && !window.__ga4Loaded) {
  window.__ga4Loaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { anonymize_ip: true });
}

/**
 * Fire a single event to both Plausible and GA4 (safe if either is absent).
 */
export function trackEvent(name, props = {}) {
  try {
    if (typeof window !== "undefined") {
      if (typeof window.plausible === "function") {
        window.plausible(name, { props });
      }
      if (GA4_ID && typeof window.gtag === "function") {
        window.gtag("event", name, props);
      }
    }
  } catch {
    /* silently ignore analytics failures */
  }
}

export const CALENDLY_URL = "https://calendly.com/avijeetdey-email/30min";

/**
 * Open the Calendly popup widget inline (no new tab). Falls back to a new tab
 * if the Calendly script hasn't loaded yet (or is blocked).
 */
export function openCalendly(source = "cta") {
  trackEvent("calendly_open", { source });
  if (typeof window !== "undefined" && window.Calendly && window.Calendly.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }
  // Fallback — same tab? No, keep old-tab behaviour if script blocked.
  if (typeof window !== "undefined") {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}
