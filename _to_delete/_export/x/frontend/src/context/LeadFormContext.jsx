"use client";

/**
 * Shared brand + support constants used across the landing page.
 *
 * NOTE: The old global "open lead capture modal" context has been removed.
 * Conversions now happen entirely on-page through the inline lead form
 * (see components/sections/LeadCapture.jsx) — no modal, no popup, no Calendly.
 */
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
