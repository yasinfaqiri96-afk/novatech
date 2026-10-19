export type Crumb = { name: string; path: string };

/**
 * Pages pass their breadcrumb trail here next to their BreadcrumbList JSON-LD.
 * The visible trail is drawn once for every route by `SiteBreadcrumbBar` under
 * the header (which is what Google asks for: markup that describes something a
 * visitor can see and use), so drawing it again inside the page only repeated
 * the same links. This renders nothing; the prop keeps call sites and JSON-LD
 * paired so a page cannot drop one without noticing the other.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return null;
}
