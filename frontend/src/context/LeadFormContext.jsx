// Shared brand + support constants used across the landing page.
//
// The site has two conversion paths and no lead-capture modal:
//  - "Start Free"     -> Calendly popup (see lib/calendly.js).
//  - "Give me a Demo" -> inline lead-capture card (see components/LeadCaptureCard.jsx).
// This module is kept as the single source of truth for logo URLs and support
// contacts (the filename is retained to avoid churn across imports).

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

/** COD King — infrastructure/trust partner. Always secondary to RabbitPay branding. */
export const COD_KING_LOGO =
  "https://cdn.shopify.com/s/files/1/0743/3119/3628/files/with_bg_logo2.png?v=1757062726";
export const COD_KING_ICON =
  "https://cdn.shopify.com/s/files/1/0743/3119/3628/files/CKlogoicon-1200px_1.png?v=1762758841";
