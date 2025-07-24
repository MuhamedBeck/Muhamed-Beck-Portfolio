import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LlmUnitTestAutomation } from "./components/projects/LlmUnitTestAutomation";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/projects/llm-unit-test-automation"
          element={<LlmUnitTestAutomation />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
