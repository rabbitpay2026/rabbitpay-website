/**
 * Shared props for sections that render both inside the homepage and as their
 * own route.
 *
 * `asPage` swaps the section's normal vertical rhythm for the same top
 * clearance the hero uses (pt-28 / md:pt-32), so a dedicated route clears the
 * fixed 64px header exactly the way the homepage does. No new spacing values
 * are introduced.
 *
 * `headingLevel` promotes the section heading to the page <h1> on its own route
 * while keeping it an <h2> under the hero on the homepage.
 */
export type SectionShellProps = {
  asPage?: boolean;
  headingLevel?: "h1" | "h2";
};

export function sectionPadding(asPage: boolean | undefined, base: string) {
  return asPage ? "pb-20 pt-28 md:pb-24 md:pt-32" : base;
}
