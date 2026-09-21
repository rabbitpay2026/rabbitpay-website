/**
 * Brand + support constants. Ported from the React project's
 * `src/context/LeadFormContext.jsx` (which was a constants module, not a React
 * context, despite the filename).
 */

export const SITE_URL = "https://rabbitpay.ai";
export const SITE_NAME = "RabbitPay";

/** Convenience constants used across CTAs. */
export const SUPPORT_PHONE = "8050493030";
export const SUPPORT_PHONE_HREF = "tel:+918050493030";
export const SUPPORT_WHATSAPP_HREF =
  "https://wa.me/918050493030?text=" +
  encodeURIComponent("Hi RabbitPay team — I'd like to know more.");
export const SUPPORT_EMAIL = "hello@rabbitpay.in";
export const SUPPORT_HOURS = "Mon-Sat - 09:00 to 21:00 IST";

/** Live RabbitPay demo storefront. */
export const DEMO_STORE_URL = "https://store.rabbitpay.ai/";

/**
 * RabbitPay branding is served from the Shopify CDN in production. These are the
 * exact URLs the live site at https://rabbitpay.ai/ uses. The React repo also
 * carries different local copies in `public/`, which the live site does NOT use —
 * keeping the CDN URLs is what preserves visual parity.
 */
export const RABBITPAY_LOGO =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-logo.svg?v=1784533882";
export const RABBITPAY_WHITE_LOGO =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-white-logo-no-bg.svg?v=1784539339";
export const RABBITPAY_ICON =
  "https://cdn.shopify.com/s/files/1/1000/8018/9762/files/rabbitpay-icon-black.svg?v=1784533881";

/** COD King — infrastructure/trust partner. Always secondary to RabbitPay branding. */
export const COD_KING_URL = "https://codking.tech";
export const COD_KING_LOGO =
  "https://cdn.shopify.com/s/files/1/0743/3119/3628/files/with_bg_logo2.png?v=1757062726";
export const COD_KING_ICON =
  "https://cdn.shopify.com/s/files/1/0743/3119/3628/files/CKlogoicon-1200px_1.png?v=1762758841";
