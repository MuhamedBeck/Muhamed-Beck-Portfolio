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

// lazy() is called once, at module scope. Calling it during render would return
// a fresh component type on every navigation and remount the page each time.
const LAZY = new Map(
  ROUTES.filter((route) => !EAGER[route.id]).map((route) => [route.id, lazy(route.load)])
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
const RouteFallback = () => (
  <div className="min-h-screen" style={{ background: "#0a0a0a" }} />
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {ROUTES.map((route) => {
            const Component = EAGER[route.id] ?? LAZY.get(route.id);
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
