import { useLocation } from "react-router-dom";
import { NOT_FOUND_META, findRoute } from "../routes/registry.js";
import { usePageMeta } from "./usePageMeta.js";

/**
 * Resolves the current route's registry entry from the router and syncs the
 * document head with it.
 *
 * This replaces per-page `usePageMeta(getRouteMeta("/services"))` calls. A
 * hardcoded path breaks as soon as one component serves more than one URL,
 * which is exactly what happens when the same page exists per locale: the
 * English page would emit the German page's canonical and hreflang.
 *
 * Falls back to the 404 metadata instead of throwing. getRouteMeta throws on an
 * unknown path on purpose, but that is a build-time guarantee; at render time
 * an unknown path is the 404 page, and throwing there would break the
 * prerender of dist/404.html.
 *
 * @returns {object} the resolved route entry
 */
export function useRouteMeta() {
  const { pathname } = useLocation();
  const route = findRoute(pathname) ?? NOT_FOUND_META;
  usePageMeta(route);
  return route;
}
