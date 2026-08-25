import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Startseite } from "./components/pages/Startseite.jsx";
import { ROUTES } from "./routes/registry.js";

// Routes come from src/routes/registry.js so this file and src/entry-server.jsx
// can never disagree about which pages exist.

// Only the German homepage stays in the main bundle: it is "/", the page most
// visitors land on, and an extra round trip there is worth avoiding. The
// English homepage is lazy like every other route, otherwise every German
// visitor would download the English page's code as well. Registry ids listed
// here must set `eager: true`; scripts/check-i18n.js asserts the two stay in
// sync.
const EAGER = {
  "home.de": Startseite,
};

// One memoised loader per route, so the entry preload and lazy() cannot end up
// on two separate promise chains over the same module.
const LOADERS = new Map(
  ROUTES.map((route) => {
    let promise;
    return [route.id, () => (promise ??= route.load())];
  })
);

// lazy() is called once, at module scope. Calling it during render would return
// a fresh component type on every navigation and remount the page each time.
const LAZY = new Map(
  ROUTES.filter((route) => !EAGER[route.id]).map((route) => [
    route.id,
    lazy(LOADERS.get(route.id)),
  ])
);

const NotFound = lazy(() => import("./components/NotFound.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Matches the page background so a chunk load never flashes white.
const RouteFallback = () => <div className="min-h-[100dvh] bg-ink" />;

/**
 * Resolve the component for the entry URL before the first render.
 *
 * createRoot discards the prerendered DOM and rebuilds the tree, and 23 of the
 * 24 routes are lazy. So on every page except the German homepage the sequence
 * was: browser paints the prerendered content, React clears #root, Suspense
 * shows the empty RouteFallback, and about 300ms later the content reappears.
 * That blank window is what made the contact form look like it was sometimes
 * missing. Measured on /en: content at 110ms, empty root at 130ms, content back
 * at 436ms. The eager German homepage never showed it, which is what pinned the
 * cause on the lazy boundary.
 *
 * Awaiting the chunk is not enough on its own. React's lazy() only skips
 * suspending when its own internal status is already resolved, and that status
 * is set when React first renders the component and attaches its handler, not
 * when the module finished downloading. So it still rendered the fallback once
 * and scheduled a retry. The entry route therefore bypasses lazy() entirely and
 * is handed the real component.
 *
 * Every path in the registry is a literal, so an exact match is enough. If the
 * lookup or the import fails we fall through to the lazy component, which is
 * the previous behaviour.
 */
const resolveEntryRoute = async () => {
  const path = window.location.pathname.replace(/(.)\/+$/, "$1");
  const route = ROUTES.find((r) => r.path === path);
  if (!route || EAGER[route.id]) return null;
  try {
    const module = await LOADERS.get(route.id)();
    return { id: route.id, Component: module.default };
  } catch {
    return null;
  }
};

const boot = async () => {
  const entry = await resolveEntryRoute();

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {ROUTES.map((route) => {
              const Component =
                EAGER[route.id] ??
                (entry?.id === route.id ? entry.Component : null) ??
                LAZY.get(route.id);
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<Component {...(route.props ?? {})} />}
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  );

  // Tells the inline script in index.html that the app is alive. Without this
  // its 2.5s failsafe fires on every visit and reveals the whole page at once,
  // which would silently kill the scroll reveal for anyone who scrolls later
  // than that, meaning nearly everyone.
  document.documentElement.classList.add("hydrated");
};

boot();
