import type { JsonLdDocument } from "@/types";

/**
 * Renders a JSON-LD document into a `<script type="application/ld+json">`.
 *
 * This is Next's documented way to ship structured data from a Server
 * Component. The payload is always one of our own typed builders in
 * `lib/json-ld.ts` — no user input reaches it — and `<` is escaped so the
 * serialised string can never terminate the `<script>` element early.
 *
 * One component rather than an inline `dangerouslySetInnerHTML` per page, so
 * the escaping rule lives in exactly one place.
 */
export function JsonLd({ data }: { data: JsonLdDocument }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
