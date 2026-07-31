import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { ArDataVisualization } from "./components/projects/ArDataVisualization";
import { LLMMavenPlugin } from "./components/projects/LLMMavenPlugin";
import { Services } from "./components/pages/Services";
import { HireMe } from "./components/pages/HireMe";
import { Impressum } from "./components/pages/Impressum";
import { Datenschutz } from "./components/pages/Datenschutz";
import { LeistungPage } from "./components/pages/leistungen/LeistungPage";
import { CaseStudyPage } from "./components/pages/projekte/CaseStudyPage";
import { getLeistung } from "./content/leistungen.de";
import { getProjekt } from "./content/projekte.de";
import NotFound from "./components/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/projects/ar-data-visualization"
          element={<ArDataVisualization />}
        />
        <Route path="/projects/llm-maven-plugin" element={<LLMMavenPlugin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hire" element={<HireMe />} />
        <Route
          path="/leistungen/n8n-automatisierung"
          element={<LeistungPage data={getLeistung("/leistungen/n8n-automatisierung")} />}
        />
        <Route
          path="/leistungen/ki-automatisierung-frankfurt"
          element={<LeistungPage data={getLeistung("/leistungen/ki-automatisierung-frankfurt")} />}
        />
        <Route
          path="/leistungen/hubspot-integration"
          element={<LeistungPage data={getLeistung("/leistungen/hubspot-integration")} />}
        />
        <Route
          path="/projekte/recruiting-automatisierung"
          element={<CaseStudyPage data={getProjekt("/projekte/recruiting-automatisierung")} />}
        />
        <Route
          path="/projekte/phoenix-parkservice"
          element={<CaseStudyPage data={getProjekt("/projekte/phoenix-parkservice")} />}
        />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>
);
