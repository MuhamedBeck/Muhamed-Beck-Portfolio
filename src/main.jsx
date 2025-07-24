import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArDataVisualization } from "./components/projects/ArDataVisualization";
import { LLMMavenPlugin } from "./components/projects/LLMMavenPlugin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/projects/ar-data-visualization"
          element={<ArDataVisualization />}
        />
        <Route path="/projects/llm-maven-plugin" element={<LLMMavenPlugin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
