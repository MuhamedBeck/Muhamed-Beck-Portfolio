// Build-time rendering entry. prerender-meta.js imports this to turn each
// route into real HTML, so crawlers that do not execute JavaScript (GPTBot,
// ClaudeBot, PerplexityBot) see the actual page content instead of an empty
// <div id="root">.
//
// The route table below mirrors src/main.jsx. It is intentionally eager rather
// than lazy: React.lazy would suspend during renderToString and emit the
// Suspense fallback instead of the page.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Routes, Route } from "react-router-dom";

import App from "./App.jsx";
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/projects/ar-data-visualization" element={<ArDataVisualization />} />
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
