import { injectClientLinkScript } from "@/lib/documentation/client-links";
import {
  decodeFlightPush,
  emptyFlightPush,
  encodeFlightPush,
  FLIGHT_PUSH,
  rewriteFlightStream,
} from "@/lib/documentation/flight";
import { DOCS_PATH, toSitePath } from "@/lib/documentation/paths";

export { DOCS_PATH } from "@/lib/documentation/paths";

/**
 * The documentation proxy — the rules that let another site's pages be served
 * from this origin under `/documentation`.
 *
 * The documentation is a Mintlify deployment published at `docs.rabbitpay.ai`,
 * and it stays exactly as it is: nothing here changes that deployment, its
 * domains or its configuration. What this module does is translate between the
 * two address spaces, so a merchant reads the same pages at
 * `rabbitpay.ai/documentation` and never sees the subdomain.
 *
 * ── Why a translation is needed at all ────────────────────────────────────
 * The documentation is served at the *root* of its own host, so every link it
 * writes is root-relative: `/getting-started/introduction`, `/integrations`. A
 * plain proxy hands those to the browser unchanged, and the first click leaves
 * `/documentation` for `rabbitpay.ai/getting-started/introduction` — a page
 * this site does not have. Worse, two of the documentation's own top-level
 * sections are `/integrations` and `/support`, which on this host *are* real pages —
 * marketing pages, not documentation — so an untranslated click would land
 * silently on the wrong content rather than on a 404. That is not a bug in the
 * proxy; it is the documentation correctly describing its own origin. So its
 * links are rewritten on the way out, and the prefix is stripped back off on
 * the way in.
 */

/**
 * Where the documentation actually lives.
 *
 * `next.config.ts` reads the same variable for the two shared-root rewrites,
 * and the two must agree. It is duplicated there rather than imported because
 * `next.config.ts` is evaluated before the module aliases exist.
 */
export const DOCS_UPSTREAM = (
  process.env.DOCS_UPSTREAM_URL ?? "https://docs.rabbitpay.ai"
).replace(/\/+$/, "");

/**
 * The attributes and payload keys whose values are addresses.
 *
 * ── Why an allowlist of names, and not simply "every quoted path" ─────────
 * The obvious transform — prefix every `"/…"` in the body — is wrong, and
 * silently so. A documentation page carries several inline bootstrap scripts
 * (the banner, navbar-transition and sidebar-scroll scripts) whose source
 * contains string literals, and rewriting those rewrites executable JavaScript
 * rather than a link. So the match is anchored to the name.
 *
 * `href` and `src` and `action` are the ordinary ones. The other two are what
 * keep the sidebar's *current page* highlighted: the documentation marks each
 * navigation row with an `id` holding that row's path and records the visited
 * page in `data-current-path`, then compares the two. Since the browser's
 * location now carries the `/documentation` prefix, both sides of that
 * comparison have to carry it as well — rewriting the links but not these
 * would leave every row looking unvisited.
 */
const ADDRESS_NAMES = "href|src|action|id|data-current-path|url|pathname";

/**
 * A root-relative path, as an HTML attribute value.
 *
 * The character class is what keeps the match inside a single attribute: no
 * quote, no angle bracket and no whitespace, so it can never run past the end
 * of the value or the tag. The negative lookahead rejects `//example.com`,
 * which is somebody else's origin rather than a path on this one.
 */
const ATTRIBUTE_PATH = new RegExp(
  `\\b(${ADDRESS_NAMES})="(\\/(?!\\/)[^"<>\\s]*)"`,
  "g",
);

/**
 * A root-relative path, as a value in the React payload.
 *
 * The payload arrives twice over in a single response — once inside a script
 * tag, where every quote is JSON-escaped, and once as the raw
 * `text/x-component` body a client-side navigation fetches, where it is a
 * plain quote. The first group captures whichever form opened the key, and
 * every backreference after it demands the same one, so one pass reads both and
 * neither can match across the other.
 */
const PAYLOAD_PATH = new RegExp(
  `(\\\\?")(${ADDRESS_NAMES})\\1\\s*:\\s*\\1(\\/(?!\\/)[^"\\\\<>\\s]*)\\1`,
  "g",
);

/**
 * A root-relative path, as written in a page's own source.
 *
 * The third and least obvious form. A documentation page is authored in MDX and
 * ships compiled, so a link a writer put in the page body — a Card component's
 * destination, an ordinary Markdown link — arrives as JavaScript, and the
 * compiler quotes it with backticks rather than with quotes. Neither of the
 * patterns above sees that, and without this one the sidebar and the chrome
 * would be translated while the links inside the prose quietly kept pointing at
 * the site root.
 */
const SOURCE_PATH = new RegExp(
  "\\b(" + ADDRESS_NAMES + "):\\s*`(\\/(?!\\/)[^`\\\\<>\\s]*)`",
  "g",
);

/**
 * The route parameter the documentation uses to answer "which page is this?".
 *
 * Not a link, and the reason it has to be rewritten anyway is the subtlest
 * thing in this file.
 *
 * The documentation does not read the address bar to work out where it is. It
 * reads its own routing parameters — `useParams().slug`, which arrives in the
 * payload as the tuple below — and then finds the current page by comparing
 * that value against the `href` of every entry in its navigation. Prefixing
 * the navigation without prefixing this leaves the two sides of that
 * comparison in different address spaces, so nothing matches and the page is
 * treated as one that is not in the navigation at all: the Previous and Next
 * links at the foot of every article disappear, and because the server had
 * already rendered them, React reports the disagreement and re-renders without
 * them.
 *
 * Prefixing it here keeps both sides in the same space. The tuple is Next's
 * own encoding of an optional catch-all segment — name, value, kind — and the
 * value is the page's path with no leading slash, empty on the front page.
 */
const ROUTE_SLUG = /\["slug","([^"]*)","oc"\]/g;

/**
 * The documentation's own front page, as its navigation names it.
 *
 * The one address in the payload that is not written as a path. The navigation
 * entry for the front page carries an empty `href`, and the documentation's
 * client expands that empty string to `/` while it runs. Left alone it is the
 * single most visible thing that can go wrong here: the logo, the tab and the
 * first sidebar row all point at it, so every "back to the start" control in
 * the documentation would drop a merchant onto the marketing site instead.
 *
 * It also has to agree with the markup. React re-renders from this payload
 * after the page arrives, so if the markup said `/documentation` and the
 * payload said `/`, React would notice the disagreement, warn about it, and
 * replace the correct links with the wrong ones.
 */
const PAYLOAD_ROOT = new RegExp('(\\\\?")href\\1\\s*:\\s*\\1\\1', "g");

/**
 * Rewrite one run of text from the documentation's address space to this site's.
 *
 * Two substitutions, in order:
 *
 * 1. Absolute self-references. The documentation states its own canonical URL,
 *    its `og:url` and its structured data as absolute links to its own host;
 *    those become absolute links to this one, which is what makes
 *    `https://rabbitpay.ai/documentation/…` the canonical address of the page
 *    rather than a second copy of it. A whole origin is an unambiguous string,
 *    so this one is a plain replacement.
 *
 * 2. Named addresses, prefixed — every link in the markup, and every link in
 *    the React payload the client router navigates by. Rewriting the payload
 *    as well as the markup is the half that matters most: a click inside the
 *    documentation is a client-side navigation, and it reads its destination
 *    from there rather than from the anchor the browser is showing.
 *
 * This is the transform, not the traversal. Applying it to a whole React
 * payload would corrupt it — see `flight.ts` — so the exported wrappers below
 * decide what to hand it.
 */
function rewriteAddresses(body: string, siteOrigin: string): string {
  return body
    .split(DOCS_UPSTREAM)
    .join(`${siteOrigin}${DOCS_PATH}`)
    .replace(ATTRIBUTE_PATH, (match, name: string, path: string) => {
      const rewritten = toSitePath(path);
      return rewritten === path ? match : `${name}="${rewritten}"`;
    })
    .replace(
      PAYLOAD_PATH,
      (match, quote: string, name: string, path: string) => {
        const rewritten = toSitePath(path);
        return rewritten === path
          ? match
          : `${quote}${name}${quote}:${quote}${rewritten}${quote}`;
      },
    )
    .replace(SOURCE_PATH, (match, name: string, path: string) => {
      const rewritten = toSitePath(path);
      return rewritten === path ? match : `${name}:\`${rewritten}\``;
    })
    .replace(
      PAYLOAD_ROOT,
      (_match, quote: string) =>
        `${quote}href${quote}:${quote}${DOCS_PATH}${quote}`,
    )
    .replace(ROUTE_SLUG, (match, slug: string) => {
      const prefix = DOCS_PATH.slice(1);
      if (slug === prefix || slug.startsWith(`${prefix}/`)) return match;
      return `["slug","${slug ? `${prefix}/${slug}` : prefix}","oc"]`;
    });
}

/**
 * A server-rendered documentation page, addressed to this site.
 *
 * Two passes over two disjoint halves of the document. The React payload is
 * lifted out and rewritten row-aware, so a length-prefixed row keeps a length
 * that matches its content; the markup around it is rewritten as plain text,
 * which it is. Neither pass can see the other's half, so nothing is translated
 * twice.
 *
 * Then the client-side script is injected, which finishes the job for the
 * addresses that never pass through here at all — see `client-links.ts`. It is
 * added last, after both passes, so neither pass can match on its contents.
 */
export function rewriteDocumentationHtml(
  html: string,
  siteOrigin: string,
): string {
  /*
    The payload is lifted out under a placeholder before the markup is touched,
    rather than rewritten in place afterwards. The other order would mean
    running the plain-text transform across the payload as well, which is
    exactly the corruption `flight.ts` exists to prevent.

    The placeholder is a token no served document contains, so the markup pass
    has nothing to match on and hands it straight back.
  */
  const placeholder = "__RABBITPAY_DOCS_FLIGHT_SLOT__";
  const stream: string[] = [];

  const markup = html.replace(FLIGHT_PUSH, (call) => {
    stream.push(decodeFlightPush(call));
    return placeholder;
  });

  if (stream.length === 0) {
    return injectClientLinkScript(rewriteAddresses(html, siteOrigin));
  }

  const rewritten = rewriteFlightStream(stream.join(""), (row) =>
    rewriteAddresses(row, siteOrigin),
  );

  let slot = 0;
  const document = rewriteAddresses(markup, siteOrigin).replaceAll(
    placeholder,
    () => (slot++ === 0 ? encodeFlightPush(rewritten) : emptyFlightPush()),
  );

  return injectClientLinkScript(document);
}

/**
 * A React payload fetched on its own, addressed to this site.
 *
 * What a client-side navigation inside the documentation asks for: the same
 * stream, without a document wrapped around it. Mintlify serves it as
 * `text/x-component` in response to a request carrying the `RSC` header.
 */
export function rewriteDocumentationFlight(
  body: string,
  siteOrigin: string,
): string {
  return rewriteFlightStream(body, (row) => rewriteAddresses(row, siteOrigin));
}

/**
 * Any other proxied text — Markdown sources, `llms.txt`, the sitemap.
 *
 * Plain text with addresses in it and no structure to respect.
 */
export function rewriteDocumentationText(
  body: string,
  siteOrigin: string,
): string {
  return rewriteAddresses(body, siteOrigin);
}

/**
 * One whole address the upstream wrote, as an address on this site.
 *
 * For the `Location` of a redirect, which is a header rather than a body and
 * so carries no quotes for the body rewriter to anchor on. This is load-bearing
 * here rather than defensive: the documentation's own root answers `/` with a
 * 308 to `/getting-started/introduction`, so `/documentation` produces a
 * redirect on the very first request. Translated, it lands on
 * `/documentation/getting-started/introduction` and never leaves this domain;
 * untranslated it would be the one response that hands a merchant straight to
 * `docs.rabbitpay.ai`.
 *
 * Both forms a redirect can take are handled: an absolute URL on the upstream
 * host, and a root-relative path. Anything else — a redirect to a genuinely
 * different site — is passed through as it was written.
 */
export function toSiteAddress(address: string, siteOrigin: string): string {
  if (address.startsWith(DOCS_UPSTREAM)) {
    return `${siteOrigin}${DOCS_PATH}${address.slice(DOCS_UPSTREAM.length)}`;
  }

  return address.startsWith("/") ? toSitePath(address) : address;
}

/**
 * The upstream URL for one incoming request under `/documentation`.
 *
 * The slug segments are re-encoded rather than pasted, and the result is
 * checked to be on the upstream origin before it is returned, so no request
 * this handler receives can be turned into a fetch of somewhere else. This is
 * the whole of the proxy's exposure: the destination is never user-supplied,
 * it is `DOCS_UPSTREAM` with a path appended, and a slug that tries to climb
 * out of it with `..` is refused rather than normalised.
 */
export function upstreamUrlFor(
  slug: readonly string[] | undefined,
  search: string,
): URL | null {
  const segments = slug ?? [];
  if (segments.some((segment) => segment === "." || segment === "..")) {
    return null;
  }

  const path = segments.map(encodeURIComponent).join("/");
  const url = new URL(`/${path}${search}`, `${DOCS_UPSTREAM}/`);

  return url.origin === new URL(DOCS_UPSTREAM).origin ? url : null;
}
