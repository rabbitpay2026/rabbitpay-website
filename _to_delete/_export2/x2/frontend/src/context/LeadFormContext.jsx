"use client";
import { createContext, useContext, useMemo, useState, useCallback } from "react";

const LeadFormContext = createContext(null);

/**
 * Provides a single global "open lead capture modal" trigger to every CTA
 * on the landing page. Accepts a `prefill` object that seeds the modal
 * (source label, plan, etc.).
 */
export function LeadFormProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState({ source: "landing_page" });

  const openLeadForm = useCallback((next) => {
    setPrefill({ source: "landing_page", ...(next || {}) });
    setOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, prefill, openLeadForm, closeLeadForm, setOpen }),
    [open, prefill, openLeadForm, closeLeadForm],
  );

  return (
    <LeadFormContext.Provider value={value}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    // graceful noop so components rendered outside provider don't crash
    return {
      open: false,
      prefill: {},
      openLeadForm: () => {},
      closeLeadForm: () => {},
      setOpen: () => {},
    };
  }
  return ctx;
}

/** Convenience constants used across CTAs. */
export const SUPPORT_PHONE = "+91 62955 29286";
export const SUPPORT_PHONE_HREF = "tel:+916295529286";
export const SUPPORT_WHATSAPP_HREF =
  "https://wa.me/916295529286?text=" +
  encodeURIComponent("Hi RabbitPay team — I'd like to know more.");
export const SUPPORT_EMAIL = "hello@rabbitpay.in";
export const RABBITPAY_LOGO =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-logo.svg?v=1784533882";
export const RABBITPAY_WHITE_LOGO =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-white-logo-no-bg.svg?v=1784539339";
export const RABBITPAY_ICON =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-icon-black.svg?v=1784533881";
