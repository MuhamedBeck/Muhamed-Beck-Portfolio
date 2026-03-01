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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>
);
