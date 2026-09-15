import type { NextConfig } from "next";

/**
 * Where the documentation is actually served from.
 *
 * The documentation is a Mintlify deployment, not a folder in this repository,
 * and it stays that way: the writers publish to it, and re-implementing its
 * chrome — sidebar, search, code blocks — inside this app would fork the
 * content on the day it was copied. What changes is its *address*. The proxy
 * in `app/documentation` puts it behind `rabbitpay.ai/documentation`, so the
 * docs are served by this origin rather than linked away to a subdomain, and
 * the URL a merchant sees never leaves the main domain.
 *
 * A proxy, deliberately, and never a redirect: a redirect would hand the
 * browser `docs.rabbitpay.ai` and the address bar would follow it, which is
 * the one outcome this is meant to prevent.
 *
 * The value is an origin *plus whatever base path the docs deployment serves
 * at* — not an origin alone. Mintlify can be told to serve a deployment under
 * a subdirectory, and if that is ever switched on for this one, the upstream
 * address gains the same prefix; keeping the whole base URL in a single value
 * makes that a one-line environment change here rather than a code edit.
 *
 * Read from the environment because the host is owned by the business, not by
 * the codebase, and a staging deployment points at a different one. The
 * trailing slash is trimmed so the path templates below can own the separator
 * and a value pasted with one cannot produce `//`.
 *
 * `lib/documentation/upstream.ts` reads the same variable and the two must
 * agree. It is duplicated there rather than imported because this file is
 * evaluated before the `@/` module aliases exist.
 */
const DOCS_UPSTREAM = (
  process.env.DOCS_UPSTREAM_URL ?? "https://docs.rabbitpay.ai"
).replace(/\/+$/, "");

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

  /**
   * The two documentation namespaces that answer at the site root.
   *
   * The documentation pages themselves are not here. They are served by
   * `app/documentation/route.ts` and `app/documentation/[...slug]/route.ts`,
   * which proxy them *and* translate their addresses — a rewrite cannot,
   * because it returns the upstream body verbatim and that body is full of
   * root-relative links.
   *
   * These two are the exception, and the reason is worth stating rather than
   * discovering. `/mintlify-assets/` is the documentation's asset prefix and
   * `/_mintlify/` holds its search, OG-image and assistant endpoints, and both
   * are compiled into its JavaScript as absolute, root-relative strings. The
   * requests are issued by the bundle at runtime rather than written into the
   * markup, so no amount of rewriting the HTML moves them — they arrive at the
   * root of whatever origin is showing the page, and they are forwarded from
   * there. Without them the documentation renders as unstyled markup and its
   * search returns nothing.
   *
   * Rewriting the compiled bundles to relocate these would work until the next
   * upstream build, which is not a thing to depend on.
   *
   * `beforeFiles` rather than the default `afterFiles`, so they answer before
   * the filesystem is consulted. No page in this app claims either path, and
   * the placement is the one that stays correct if one ever did.
   */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/mintlify-assets/:path*",
          destination: `${DOCS_UPSTREAM}/mintlify-assets/:path*`,
        },
        {
          source: "/_mintlify/:path*",
          destination: `${DOCS_UPSTREAM}/_mintlify/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
