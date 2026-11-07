import { StrictMode, Suspense, lazy, useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Startseite } from "./components/pages/Startseite.jsx";
import { ROUTES } from "./routes/registry.js";
import { Fehlergrenze } from "./components/Fehlergrenze.jsx";

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

/* After a deploy the hashed chunks of the previous build are gone, so a tab
   opened before it could not load its next page and React was left with a
   blank screen. The page is then loaded afresh from the server, which serves
   the new build. Once only: a document that is itself the result of a reload
   does not reload again, so an offline phone cannot end up in a loop, and
   Fehlergrenze takes over. */
const nachDeployNeuLaden = () => {
  const navigation = performance.getEntriesByType?.("navigation")?.[0];
  if (navigation?.type === "reload") return;
  window.location.reload();
};

// One memoised loader per route, so the entry preload and lazy() cannot end up
// on two separate promise chains over the same module. A failed load is
// forgotten rather than memoised, so a later attempt can still succeed.
const LOADERS = new Map(
  ROUTES.map((route) => {
    let promise;
    const laden = () =>
      route.load().catch((fehler) => {
        promise = undefined;
        nachDeployNeuLaden();
        throw fehler;
      });
    return [route.id, () => (promise ??= laden())];
  })
);

/* Start loading a page while the pointer rests on its link or a finger
   touches it, not only after the click: on a phone the page used to appear
   only once its chunk had come down, with no sign in between. Straight
   through route.load(), not LOADERS, so that a failed preload never triggers
   the reload above; the module cache serves the later import either way. */
const vorladen = (ereignis) => {
  const link = ereignis.target?.closest?.('a[href^="/"]');
  if (!link) return;
  const pfad = new URL(link.href).pathname.replace(/(.)\/+$/, "$1");
  const route = ROUTES.find((r) => r.path === pfad);
  if (route && !EAGER[route.id]) route.load().catch(() => {});
};
document.addEventListener("pointerover", vorladen, { passive: true });
document.addEventListener("touchstart", vorladen, { passive: true });
document.addEventListener("focusin", vorladen);

// lazy() is called once, at module scope. Calling it during render would return
// a fresh component type on every navigation and remount the page each time.
const LAZY = new Map(
  ROUTES.filter((route) => !EAGER[route.id]).map((route) => [
    route.id,
    lazy(LOADERS.get(route.id)),
  ])
);

const NotFound = lazy(() => import("./components/NotFound.jsx"));

// Back and forward start at the top as well, like every other page change.
// Left to itself the browser restores the old scroll position on its own, a
// moment after React has already jumped to the top, and the two fought: on a
// phone the homepage came back at 552 px after being left at 2600 px
// (measured 07.11.2026), neither where the visitor was nor at the start. The
// owner wants the start, so the browser is told not to restore anything.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

/* html carries scroll-behavior: smooth for the in-page anchors of the guides.
   A page change must not inherit it: sliding up through the old page reads as
   a glitch, and on a phone the slide was still running when the next page
   painted. */
const ohneGleiten = (springen) => {
  const root = document.documentElement;
  const vorher = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  // Reading the computed value makes the browser apply the inline style now.
  // Without it Chrome scrolled with the stale "smooth" after a back
  // navigation, and the page visibly slid up from where it had been.
  void getComputedStyle(root).scrollBehavior;
  springen();
  root.style.scrollBehavior = vorher;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  const ersterAufruf = useRef(true);
  // Before paint, so the new page never shows for a frame at the old offset.
  useLayoutEffect(() => {
    ohneGleiten(() => window.scrollTo(0, 0));

    // After a page change, focus goes to the new page's main landmark. It
    // stayed on the link that was clicked, which no longer exists, so a
    // screen reader announced nothing and the next Tab started from the top
    // of the document. Not on the first load: there the browser decides.
    if (ersterAufruf.current) ersterAufruf.current = false;
    else document.getElementById("inhalt")?.focus({ preventScroll: true });

    // A link into a section of another page (/en/services#slug) lands on that
    // section once it exists; the page may still be loading its chunk. Read
    // from window rather than useLocation: an anchor change on the same page
    // (the table of contents) must not trigger this effect at all.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const beginn = performance.now();
    let timer;
    const suchen = () => {
      const ziel = document.getElementById(id);
      if (ziel) ohneGleiten(() => ziel.scrollIntoView({ block: "start" }));
      else if (performance.now() - beginn < 2000) timer = window.setTimeout(suchen, 50);
    };
    suchen();
    return () => window.clearTimeout(timer);
  }, [pathname]);
  return null;
}

// The error boundary forgets its error when the address changes.
const FehlergrenzeAmOrt = ({ children }) => (
  <Fehlergrenze ort={useLocation().pathname}>{children}</Fehlergrenze>
);

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
        <FehlergrenzeAmOrt>
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
        </FehlergrenzeAmOrt>
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
