// Lightweight analytics helpers used across the site.
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

/** The single on-page conversion target — the inline homepage lead form. */
export const LEAD_FORM_ID = "lead-capture";

/**
 * Smoothly scroll the visitor to the inline homepage lead-capture section.
 * This is the ONLY primary CTA behaviour on the site — no popups, no
 * redirects, no Calendly. Falls back to a hash update if the element
 * is not present yet.
 */
export function scrollToLeadForm(source = "cta") {
  trackEvent("scroll_to_lead_form", { source });
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const el = document.getElementById(LEAD_FORM_ID);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move focus to the first field for accessibility, without jumping.
    const firstInput = el.querySelector("input");
    if (firstInput) {
      window.setTimeout(() => firstInput.focus({ preventScroll: true }), 600);
    }
  } else {
    window.location.hash = `#${LEAD_FORM_ID}`;
  }
}
