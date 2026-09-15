/**
 * The two facts every part of the documentation proxy has to agree on.
 *
 * Kept in their own module because three of them need these and two need each
 * other: `upstream.ts` translates addresses with them, and `client-links.ts`
 * compiles the same rule into a script for the browser. Importing one from the
 * other would be a cycle, and the script is built at module-evaluation time, so
 * a cycle would mean reading a value that is not initialised yet.
 *
 * Having them here rather than duplicated is what lets the server's rule and
 * the browser's rule be the same rule.
 */

/** The address the documentation answers on. */
export const DOCS_PATH = "/documentation";

/**
 * The namespaces that must keep answering at the site root, unprefixed.
 *
 * `/mintlify-assets` is the documentation's asset prefix and `/_mintlify` is
 * where its search, OG-image and assistant endpoints live. Both are compiled
 * into its JavaScript as absolute, root-relative strings, so the requests are
 * issued by the bundle at runtime rather than written into the markup — no
 * amount of rewriting a body moves them. They are proxied where they already
 * ask to be, by the `beforeFiles` rewrites in `next.config.ts`.
 *
 * `/_next` is listed for safety rather than necessity, and `/.well-known`
 * because certificate and agent-discovery paths belong to the host.
 */
export const SHARED_ROOT_NAMESPACES = [
  "/mintlify-assets",
  "/_mintlify",
  "/_next",
  "/.well-known",
];

/**
 * Whether a root-relative path is one of the namespaces that stays at root.
 *
 * Matched as a whole segment rather than as a string prefix, so the asset
 * prefix `/mintlify-assets` is caught alongside the files under it — the bare
 * form is what the documentation publishes as its `assetPrefix`, and prefixing
 * that would point every asset request at a path nothing answers.
 */
export function staysAtRoot(path: string): boolean {
  return SHARED_ROOT_NAMESPACES.some(
    (namespace) => path === namespace || path.startsWith(`${namespace}/`),
  );
}

/**
 * A root-relative path as the documentation writes it, as this site serves it.
 *
 * Idempotent: a path that already carries the prefix is returned untouched, so
 * a body somehow rewritten twice is not corrupted, and the browser-side script
 * can run over links the server already fixed without changing them.
 */
export function toSitePath(path: string): string {
  if (path === DOCS_PATH || path.startsWith(`${DOCS_PATH}/`)) return path;
  if (staysAtRoot(path)) return path;
  /*
    The documentation's own root — its logo, and the first sidebar entry — is
    `/documentation` rather than `/documentation/`, so the address a merchant
    lands on from inside the docs is the same one the site header sends them
    to, and neither has to be normalised away by a redirect.
  */
  if (path === "/") return DOCS_PATH;
  return `${DOCS_PATH}${path}`;
}
