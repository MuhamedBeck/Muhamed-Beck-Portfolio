import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { MobileMenu } from "../../MobileMenu";
import Footer from "../../Footer";
import { TechMarquee } from "../../TechMarquee";
import { LoadingScreen } from "../../LoadingScreen";
import { useSplashGate } from "../../useSplashGate";
import { Home } from "../../sections/Home";
import { Section, SectionHeader } from "../../Section";
import { LinkArrow } from "../../LinkArrow";
import { useRouteMeta } from "../../../seo/useRouteMeta";
import { CONTACT } from "../../../content/site";
import { AR_UEBER, AR_LEISTUNGEN, AR_CTA } from "../../../content/ar";

/**
 * Arabic homepage.
 *
 * Deliberately not App.jsx with translated strings. That page renders About and
 * Projects, both of which carry English CV and project copy hardcoded in the
 * component, so reusing it would have put English into an Arabic page. It also
 * needs a locale the shared hero can resolve, which Home.jsx does through the
 * dictionary.
 *
 * The scope mirrors the English section rather than the German one: who this
 * is, what he does, how to reach him. The German guides target German search
 * terms and German law and have no Arabic counterpart on purpose.
 */
/* Wie im Englischen eine Sammelseite mit Ankern, nicht sieben Einzelseiten.
   Ohne Anker rechts: die arabischen Eintraege tragen keine Kennzahl, und eine
   aus der deutschen Fassung uebernommene Zahl waere hier unbelegt. */
const HERO_LEISTUNGEN_AR = AR_LEISTUNGEN.map((leistung) => ({
  kurz: leistung.title,
  to: `/ar/services#${leistung.slug}`,
}));

export const ArabicHome = () => {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);
  const { showSplash, isLoaded, onSplashDone } = useSplashGate();

  return (
    <>
      {showSplash && !isLoaded && <LoadingScreen onComplete={onSplashDone} />}
      <div
        className="safe-area-top min-h-[100dvh] bg-ink text-paper"
        style={{ overflow: isLoaded ? "visible" : "hidden" }}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <main>
          <Home isLoaded={isLoaded} services={HERO_LEISTUNGEN_AR} />
          <TechMarquee />

          <Section id="about">
            <SectionHeader
              label={AR_UEBER.kicker}
              headline={AR_UEBER.headline}
              intro={AR_UEBER.intro}
            />
          </Section>

          <Section id="services">
            <h2 className="label">الخدمات</h2>
            <ul className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {AR_LEISTUNGEN.map((leistung) => (
                <li key={leistung.title} className="border-t border-hairline pt-6">
                  <h3 className="headline-sub">{leistung.title}</h3>
                  <p className="mt-4 leading-relaxed text-paper-soft">{leistung.text}</p>
                </li>
              ))}
            </ul>
            <Link to="/ar/services" className="link-arrow mt-12 inline-flex">
              تفاصيل الخدمات
              <LinkArrow />
            </Link>
          </Section>

          <Section id="contact">
            <div className="max-w-2xl">
              <h2 className="headline">{AR_CTA.headline}</h2>
              <p className="intro mt-6">{AR_CTA.intro}</p>
              <Link to="/ar/hire" className="btn-ghost btn-accent mt-10">
                ابدأ مشروعًا
              </Link>
              {/* The address and the phone number are Latin runs inside Arabic
                  text. Without isolation the bidi algorithm reorders the
                  separator and the digits unpredictably. */}
              <p className="mt-6 text-sm text-paper-mute">
                أو راسلني مباشرة:{" "}
                <bdi>
                  <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">
                    {CONTACT.email}
                  </a>
                </bdi>{" "}
                · <bdi>{CONTACT.phoneDisplay}</bdi>
              </p>
            </div>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
};
