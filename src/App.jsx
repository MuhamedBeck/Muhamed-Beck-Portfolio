import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { useSplashGate } from "./components/useSplashGate";
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
  const { showSplash, isLoaded, onSplashDone } = useSplashGate();

  return (
    <>
      {showSplash && !isLoaded && <LoadingScreen onComplete={onSplashDone} />}
      {/* The splash is a fixed, full-viewport overlay, so it already hides this
          content. Fading the shell in on top of that would mean the hero paints
          at opacity 0, and Chrome never accepts a fully transparent element as a
          Largest Contentful Paint candidate, which left the page with no
          measurable LCP at all. */}
      <div
        className="safe-area-top min-h-[100dvh] bg-ink text-gray-100"
        style={{ overflow: isLoaded ? "visible" : "hidden" }}>
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
