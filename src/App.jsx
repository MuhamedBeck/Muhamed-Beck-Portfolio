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
import Footer from "./components/Footer";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if user has visited before to determine initial state
  const hasVisitedBefore =
    typeof window !== "undefined"
      ? sessionStorage.getItem("hasVisitedPortfolio")
      : null;
  const [isLoaded, setIstLoaded] = useState(!!hasVisitedBefore);
  const [showLoadingScreen, setShowLoadingScreen] = useState(!hasVisitedBefore);

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
      <div
        className={`safe-area-full min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
        style={{ overflow: isLoaded ? "visible" : "hidden" }}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home isLoaded={isLoaded} />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
