import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/data/site";

/**
 * The site-wide Open Graph / Twitter card image.
 *
 * Replaces `/og-image.svg`. Facebook, X, LinkedIn, WhatsApp and Slack do not
 * render SVG Open Graph images, so every share of rabbitpay.ai previously
 * appeared with no image at all. `next/og` renders this to a real 1200x630 PNG
 * at build time — no new dependency, and no hand-maintained binary asset.
 *
 * Next applies a root-level `opengraph-image` to every route automatically, so
 * one file covers the whole site.
 *
 * The design uses only tokens and copy the site already ships: the brand blues
 * from `tailwind.config.ts` (#196BF5 / #0D4CB3), the wordmark, the homepage
 * `<h1>` and the hero's trust chips. No new branding is invented, and the
 * remote SVG logo is not fetched — Satori's SVG support is limited, and a build
 * that depends on a CDN request is a build that can fail.
 *
 * Kept to a flat linear gradient: Satori renders radial gradients with visible
 * banding, so the hero's soft glow is deliberately not reproduced here.
 */
export const alt = "RabbitPay - 1-Click Checkout, built in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#196BF5";
const BRAND_DEEP = "#0D4CB3";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(150deg, ${BRAND} 0%, ${BRAND_DEEP} 100%)`,
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark: the brand "R" tile beside the product name. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "#FFFFFF",
              color: BRAND,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 600, letterSpacing: -0.5 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.05,
            }}
          >
            1-Click Checkout,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              color: "#D8E6FF",
            }}
          >
            built in India.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 860,
            }}
          >
            Higher conversions. Lower RTO. Prefilled addresses, UPI-first payments, and verified
            COD.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {["Zero setup fee", "Live in minutes", "Made in India"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              {chip}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            rabbitpay.ai
          </div>
        </div>
      </div>
    ),
    size,
  );
}
