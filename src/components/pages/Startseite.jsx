import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { TechMarquee } from "../TechMarquee";
import { LoadingScreen } from "../LoadingScreen";
import { useSplashGate } from "../useSplashGate";
import { Home } from "../sections/Home";
import { Section, SectionHeader } from "../Section";
import { Stimmen } from "../Stimmen";
import { useDict } from "../../i18n";
import { useRouteMeta } from "../../seo/useRouteMeta";
import { LEISTUNGEN } from "../../content/leistungen.de";
import { PROJEKTE } from "../../content/projekte.de";
import { Grafik } from "../Grafik";
import { FaqListe } from "../FaqListe";
import startseite from "../../i18n/dict/startseite";
import { LinkArrow } from "../LinkArrow";

/**
 * German homepage.
 *
 * Deliberately not a translation of the English page. Someone arriving from
 * "n8n Experte" is evaluating a supplier, so the page answers what can be
 * automated, what it costs and what it has produced before. The English page
 * keeps its portfolio shape because its audience is recruiters and remote
 * clients, who are looking for a CV.
 */
/* Das Register im Hero, aus derselben Quelle wie der Leistungsabschnitt weiter
   unten und wie die sieben Leistungsseiten selbst.

   Der Anker wird aus caseStudy.stat ABGELEITET statt danebengeschrieben. Eine
   Zahl, die an zwei Stellen gepflegt wird, driftet: die Fallstudie wird
   aktualisiert, der Hero bleibt auf dem alten Wert stehen, und niemand merkt es,
   weil beide fuer sich stimmig aussehen. Voice-AI hat bewusst keine stat, dort
   traegt das Label allein.

   Das Label selbst ist NICHT abgeleitet: Wer caseStudy.stat austauscht, muss
   hero.ankerLabel derselben Leistung mit anpassen. Genau das ist am 27.10.2026
   passiert, als "Website überarbeiten" von Phoenix (+35 %) auf MA-Flats (100)
   umzog; zwei Tage stand hier "100 organischer Traffic". */
/* Wie viele Zeilen der Hero zeigt.

   Nicht willkuerlich, sondern gemessen bei 900 px Fensterhoehe: mit sechs
   Zeilen landet die Preiszeile bei 903 px, also drei Pixel unter der Falz. Eine
   Punktlandung, die bei jeder anderen Schriftgroesse kippt. Mit fuenf bleibt
   Spielraum. Enger stellen scheidet aus, die Trefferflaechen faellen dann unter
   die 44 px, die das Projekt sonst einhaelt.

   Fuenf ist zugleich die Obergrenze, die eine Erhebung ueber zwoelf
   Anbieterseiten ergeben hat: keine davon zeigt mehr gleichrangige Leistungen
   im Sichtbereich. Neun waeren eine Liste, keine Empfehlung.

   Der Rest ist nicht verloren, die Zeile darunter fuehrt auf /leistungen. */
const HERO_MAX = 5;

/* Seitenverhältnis der Projektbilder (Breite / Höhe), siehe unten. */
const KARTEN_VERHAELTNIS = { klein: 4 / 3, gross: 16 / 10 };

const HERO_LEISTUNGEN = LEISTUNGEN.map((leistung) => ({
  kurz: leistung.hero.kurz,
  to: leistung.path,
  anker: leistung.caseStudy?.stat
    ? `${leistung.caseStudy.stat} ${leistung.hero.ankerLabel}`
    : leistung.hero.ankerLabel,
  auszeichnung: leistung.hero.auszeichnung,
}));

export const Startseite = () => {
  useRouteMeta();
  const t = useDict(startseite);
  const [menuOpen, setMenuOpen] = useState(false);
  // The splash used to run only on /en, because the gate lived inside App.jsx.
  // This is the page most visitors land on, so it belongs here too.
  const { showSplash, isLoaded, onSplashDone } = useSplashGate();

  return (
    <div className="min-h-[100dvh] text-paper bg-ink">
      {showSplash && !isLoaded && <LoadingScreen onComplete={onSplashDone} />}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="inhalt" tabIndex={-1}>
        <Home isLoaded={isLoaded} services={HERO_LEISTUNGEN.slice(0, HERO_MAX)} kompakt />
        <TechMarquee />

        <Section id="leistungen">
          <SectionHeader
            label={t.services.label}
            headline={t.services.headline}
            intro={t.services.intro}
          />
          {/* Drei Gruppen, je Leistung eine Zeile mit dem kurzen Namen, auf
              dem Handy untereinander, ab lg in drei Spalten. Vorher standen
              hier 13 Karten mit der langen Seitenüberschrift und drei Zeilen
              Text, mobil 3,6 Bildschirmhöhen; auch die Kurztexte allein
              waren am Desktop noch 296 Wörter. Wer überfliegt, findet so den
              eigenen Bereich auf einen Blick; die Kurztexte stehen auf
              /leistungen. Der Link ist die ganze Zeile, vorgelesen wird nur
              der Name. */}
          <div className="mt-14 grid gap-y-12 lg:grid-cols-3 lg:gap-x-10">
            {t.services.bereiche.map((bereich, index) => (
              <div
                key={bereich.id}
                className="stagger"
                style={{ "--fade-delay": `${index * 80}ms` }}>
                <h3 className="headline-sub">{bereich.titel}</h3>
                <ul className="mt-5 border-b border-hairline">
                  {LEISTUNGEN.filter((leistung) => leistung.bereich === bereich.id).map(
                    (leistung) => (
                      <li key={leistung.path} className="border-t border-hairline">
                        <Link
                          to={leistung.path}
                          className="group flex items-baseline justify-between gap-x-4 py-3">
                          {/* Zwischen lg und xl eine Stufe kleiner: in den
                              drei schmalen Spalten bei 1024 px brach
                              „n8n- und Workflow-Automatisierung“ sonst um,
                              und die Linien der ersten Spalte standen
                              versetzt zu den anderen. */}
                          <span className="text-lg text-paper underline-offset-4 group-hover:underline lg:text-base xl:text-lg">
                            {leistung.hero.kurz}
                          </span>
                          <LinkArrow className="shrink-0 text-paper-mute" />
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/leistungen" className="btn-ghost">
              {t.services.all}
            </Link>
          </div>
        </Section>

        {/* Steht zwischen dem Angebot und den Projekten, weil genau dort die
            Frage aufkommt, ob das auch für jemand anderen funktioniert hat.
            Rendert nichts, solange keine Freigabe vorliegt. */}
        <Stimmen label={t.stimmen.label} headline={t.stimmen.headline} />

        <Section id="projekte">
          <SectionHeader label={t.cases.label} headline={t.cases.headline} />
          <ul className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-16">
            {/* Freelance engagements first, then the work in his employment;
                the subtitle of each says which it is. The theses stay on
                /projekte. */}
            {[
              ...PROJEKTE.filter((projekt) => projekt.kind === "mandat"),
              ...PROJEKTE.filter((projekt) => projekt.kind === "anstellung"),
            ].map((projekt, index) => (
              <li
                key={projekt.path}
                className="stagger group relative border-t border-hairline pt-6"
                style={{ "--fade-delay": `${index * 80}ms` }}>
                {/* Something real to look at per project: the screenshot, the
                    workflow or the migration. Every picture fills the same
                    shape, 4:3 on phones and 16:10 from sm up (the width where
                    the canvas switches its crop), so all cards are exactly the
                    same size; until 07.11.2026 each picture kept its own height
                    and the owner saw four different sizes. The runs start one
                    after another, not in unison. */}
                {projekt.karte ? (
                  <div className="mb-7">
                    <Grafik
                      bild={projekt.karte}
                      verzoegerung={0.2 + index * 0.35}
                      verhaeltnis={KARTEN_VERHAELTNIS}
                    />
                  </div>
                ) : null}
                <h3 className="headline-sub underline-offset-[0.18em] group-hover:underline">
                  <Link to={projekt.path} className="karten-link">
                    {projekt.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-paper-mute">{projekt.subtitle}</p>
                {/* Term before description, as a <dl> requires; the figure is
                    moved up visually with flex order. */}
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {projekt.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <dt className="order-2 mt-1 text-xs text-paper-mute">{stat.label}</dt>
                      <dd className="order-1 text-2xl font-light tabular-nums text-paper">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <Link to="/projekte" className="link-arrow mt-10">
            {t.cases.all}
            <LinkArrow />
          </Link>
        </Section>

        <Section id="ablauf">
          <SectionHeader label={t.approach.label} headline={t.approach.headline} />
          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.approach.steps.map((step, index) => (
              <li
                key={step.title}
                className="stagger border-t border-hairline pt-6"
                style={{ "--fade-delay": `${index * 70}ms` }}>
                {/* Nummer und Schritt in einer Zeile; die Nummer allein in
                    einer eigenen Zeile kostete mobil 36 px je Schritt. */}
                <div className="flex items-baseline gap-x-3">
                  <span className="text-xs tracking-[0.25em] text-accent tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-normal text-paper">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-paper-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Collapsed like on the service pages: fully open, the six answers
            took two screens on a phone. The answers stay in the HTML. Unlike
            the service pages, the homepage emits no FAQPage JSON-LD;
            prerender-meta.js builds it only for service and guide pages. */}
        <Section id="faq">
          <SectionHeader label={t.faq.label} headline={t.faq.headline} />
          <FaqListe fragen={t.faq.items} abstand="mt-14" />
          {/* The homepage answers short; the service page answers in full. This
              is the way from one to the other, and it stops the two versions
              from having to say the same thing at the same length. */}
          <Link to="/leistungen/n8n-automatisierung" className="link-arrow mt-10">
            {t.faq.all}
            <LinkArrow />
          </Link>
        </Section>

        <Section id="kontakt">
          <div className="max-w-2xl">
            <h2 className="headline">{t.cta.headline}</h2>
            <p className="intro mt-6">{t.cta.text}</p>
            <Link to="/kontakt" className="btn-ghost btn-accent mt-10">
              {t.cta.button}
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Startseite;
