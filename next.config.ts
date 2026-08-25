import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // The production site serves RabbitPay / COD King branding and the client
    // logo wall from these CDNs. Kept as-is so the migration is pixel-identical
    // to https://rabbitpay.ai/ — see docs/ASSETS.md before localising them.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "www.qwertycases.com" },
      { protocol: "https", hostname: "perlex.shop" },
      { protocol: "https", hostname: "www.airystore.in" },
      { protocol: "https", hostname: "www.rabbitrain.com" },
    ],
  },
};

export default nextConfig;
