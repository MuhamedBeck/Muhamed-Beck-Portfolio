import { StrictMode, Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Only the landing route ("/") is bundled eagerly. Every other route is a
// separate chunk, so a first-time visitor on the homepage does not download
// the code for the service, case study and legal pages.
const ArDataVisualization = lazy(() =>
  import("./components/projects/ArDataVisualization").then((m) => ({ default: m.ArDataVisualization }))
);
const LLMMavenPlugin = lazy(() =>
  import("./components/projects/LLMMavenPlugin").then((m) => ({ default: m.LLMMavenPlugin }))
);
const Services = lazy(() =>
  import("./components/pages/Services").then((m) => ({ default: m.Services }))
);
const HireMe = lazy(() =>
  import("./components/pages/HireMe").then((m) => ({ default: m.HireMe }))
);
const Impressum = lazy(() =>
  import("./components/pages/Impressum").then((m) => ({ default: m.Impressum }))
);
const Datenschutz = lazy(() =>
  import("./components/pages/Datenschutz").then((m) => ({ default: m.Datenschutz }))
);
const LeistungRoute = lazy(() => import("./components/pages/leistungen/LeistungRoute"));
const CaseStudyRoute = lazy(() => import("./components/pages/projekte/CaseStudyRoute"));
const NotFound = lazy(() => import("./components/NotFound"));

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
          <Route path="/" element={<App />} />
          <Route path="/projects/ar-data-visualization" element={<ArDataVisualization />} />
          <Route path="/projects/llm-maven-plugin" element={<LLMMavenPlugin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hire" element={<HireMe />} />
          <Route path="/leistungen/n8n-automatisierung" element={<LeistungRoute path="/leistungen/n8n-automatisierung" />} />
          <Route path="/leistungen/ki-automatisierung-frankfurt" element={<LeistungRoute path="/leistungen/ki-automatisierung-frankfurt" />} />
          <Route path="/leistungen/hubspot-integration" element={<LeistungRoute path="/leistungen/hubspot-integration" />} />
          <Route path="/projekte/recruiting-automatisierung" element={<CaseStudyRoute path="/projekte/recruiting-automatisierung" />} />
          <Route path="/projekte/phoenix-parkservice" element={<CaseStudyRoute path="/projekte/phoenix-parkservice" />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
