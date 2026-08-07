import { useState, useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import "./App.css";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { TechMarquee } from "./components/TechMarquee";
import Footer from "./components/Footer";
import { useRouteMeta } from "./seo/useRouteMeta";

function App() {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if user has visited before to determine initial state.
  // During build-time rendering there is no window, and the splash must not end
  // up in the prerendered HTML: crawlers would then read "Loading Portfolio"
  // instead of the page content.
  const isBrowser = typeof window !== "undefined";
  const hasVisitedBefore = isBrowser
    ? sessionStorage.getItem("hasVisitedPortfolio")
    : null;
  const [isLoaded, setIstLoaded] = useState(!isBrowser || !!hasVisitedBefore);
  const [showLoadingScreen] = useState(isBrowser && !hasVisitedBefore);

  useEffect(() => {
    if (!hasVisitedBefore) {
      // Mark as visited for future navigations in this session
      sessionStorage.setItem("hasVisitedPortfolio", "true");
    }
  }, [hasVisitedBefore]);

  // Control body overflow during loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoaded]);

  return (
    <>
      {showLoadingScreen && !isLoaded && (
        <LoadingScreen onComplete={() => setIstLoaded(true)}></LoadingScreen>
      )}
      {/* The splash is a fixed, full-viewport overlay, so it already hides this
          content. Fading the shell in on top of that would mean the hero paints
          at opacity 0, and Chrome never accepts a fully transparent element as a
          Largest Contentful Paint candidate, which left the page with no
          measurable LCP at all. */}
      <div
        className="safe-area-top min-h-[100dvh] text-gray-100"
        style={{ background: '#0a0a0a', overflow: isLoaded ? "visible" : "hidden" }}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Home isLoaded={isLoaded} />
          <TechMarquee />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
