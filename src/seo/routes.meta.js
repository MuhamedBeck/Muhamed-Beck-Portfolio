// Compatibility shim. The single source of truth moved to src/routes/registry.js
// so the client router, the build-time renderer, the sitemap and the prerender
// step all derive from one array instead of three hand-maintained lists.
//
// Kept for one step so the components importing getRouteMeta do not all have to
// change at once. New code should import from src/routes/registry.js directly.
export {
  SITE_URL,
  DEFAULT_ROBOTS,
  DEFAULT_LOCALE,
  NOT_FOUND_META,
  ROUTES,
  findRoute,
  getRouteMeta,
  getAlternates,
} from "../routes/registry.js";

export { ROUTES as ROUTES_META } from "../routes/registry.js";
