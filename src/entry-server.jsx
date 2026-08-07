// Build-time rendering entry. prerender-meta.js imports this to turn each
// route into real HTML, so crawlers that do not execute JavaScript (GPTBot,
// ClaudeBot, PerplexityBot) see the actual page content instead of an empty
// <div id="root">.
//
// Routes come from src/routes/registry.js, the same array the client router
// uses, so the two can never drift apart.
//
// Components are resolved eagerly by prepare() before any render. React.lazy
// would suspend during renderToString and emit the Suspense fallback instead of
// the page, which is why this file cannot simply reuse the client's lazy map.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Routes, Route } from "react-router-dom";

import NotFound from "./components/NotFound.jsx";
import { ROUTES } from "./routes/registry.js";

const RESOLVED = new Map();

/**
 * Loads every route component up front. Must be awaited once before render().
 */
export async function prepare() {
  await Promise.all(
    ROUTES.map(async (route) => {
      const mod = await route.load();
      if (!mod.default) {
        throw new Error(
          `entry-server: load() for route "${route.id}" resolved without a default export. ` +
            `Every registry load must resolve to { default: Component }.`
        );
      }
      RESOLVED.set(route.id, mod.default);
    })
  );
}

const AppRoutes = () => (
  <Routes>
    {ROUTES.map((route) => {
      const Component = RESOLVED.get(route.id);
      if (!Component) {
        throw new Error(
          `entry-server: route "${route.id}" is not resolved. Call and await prepare() before render().`
        );
      }
      return (
        <Route
          key={route.id}
          path={route.path}
          element={<Component {...(route.props ?? {})} />}
        />
      );
    })}
    {/* Rendered into dist/404.html, which Cloudflare serves with a real 404. */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

/**
 * Renders one route to an HTML string.
 * @param {string} path route path, e.g. "/leistungen/n8n-automatisierung"
 * @returns {string} markup for the contents of <div id="root">
 */
export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  );
}
