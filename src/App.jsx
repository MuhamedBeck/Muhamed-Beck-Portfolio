import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { useSplashGate } from "./components/useSplashGate";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { SERVICES } from "./content/services.en";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { TechMarquee } from "./components/TechMarquee";
import { Section } from "./components/Section";
import { Link } from "react-router-dom";
import { CONTACT } from "./content/site";
import Footer from "./components/Footer";
import { useRouteMeta } from "./seo/useRouteMeta";

/* Das Register im Hero. Englisch hat keine sieben Einzelseiten, sondern eine
   Sammelseite, deshalb zielt jede Zeile auf ihren Abschnitt dort statt siebenmal
   auf dieselbe URL. Die Slugs stehen an den Leistungen selbst, damit Link und
   Sprungziel nicht getrennt gepflegt werden.

   label statt einer Kennzahl als Anker: die englischen Eintraege fuehren keine
   durchgaengige Zahl, und ein erfundener Wert waere schlechter als ein ehrliches
   Stichwort. */
const HERO_SERVICES = SERVICES.map((service) => ({
  kurz: service.title,
  to: `/en/services#${service.slug}`,
  anker: service.label,
}));

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
        className="safe-area-top min-h-[100dvh] bg-ink text-paper"
        style={{ overflow: isLoaded ? "visible" : "hidden" }}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Home isLoaded={isLoaded} services={HERO_SERVICES} />
          <TechMarquee />
          <About />
          <Projects />

          {/* Closes with a call to action rather than a second form, mirroring
              the German homepage. This page used to carry an inline contact
              form while the nav CTA pointed at /en/hire, so English visitors
              met two forms and no single destination, and nothing linked to
              the inline one anyway. One enquiry page per language. */}
          <Section id="contact">
            <div className="max-w-2xl">
              <h2 className="headline">Which process costs you the most time?</h2>
              <p className="intro mt-6">
                Write a couple of sentences about it. You get a real assessment within
                24 hours of whether and how it can be automated, not a standard reply.
              </p>
              <Link to="/en/hire" className="btn-ghost btn-accent mt-10">
                Start a project
              </Link>
              <p className="mt-6 text-sm text-paper-mute">
                Or write directly:{" "}
                <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">
                  {CONTACT.email}
                </a>{" "}
                · {CONTACT.phoneDisplay}
              </p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
