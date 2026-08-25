import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { RevealOnScroll } from "../RevealOnScroll";
import { useRouteMeta } from "../../seo/useRouteMeta";

const Card = ({ title, children }) => (
  <div className="rounded-2xl p-6 sm:p-8 border border-hairline bg-gray-900/50 backdrop-blur-sm">
    <h2 className="text-xl font-bold text-accent mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const Impressum = () => {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] text-gray-100 bg-ink">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
      <section className="w-full py-20 pt-28 px-4 bg-ink">
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 group">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Zurück zur Startseite</span>
          </Link>
        </div>

        <RevealOnScroll legacy>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                Impressum
              </h1>
              <p className="text-gray-400">Angaben gemäß § 5 DDG</p>
            </div>

            <div className="space-y-6">
              <Card title="Diensteanbieter">
                <p>
                  Muhamed Nur Beck
                  <br />
                  Krögerstraße 4
                  <br />
                  60313 Frankfurt am Main
                  <br />
                  Deutschland
                </p>
              </Card>

              <Card title="Kontakt">
                <p>
                  Telefon:{" "}
                  <a
                    href="tel:+4917666008485"
                    className="text-accent hover:text-cyan-400 transition-colors">
                    +49 176 66008485
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:m.nur.beck@hotmail.de"
                    className="text-accent hover:text-cyan-400 transition-colors">
                    m.nur.beck@hotmail.de
                  </a>
                </p>
              </Card>

              <Card title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
                <p>
                  Muhamed Nur Beck
                  <br />
                  Krögerstraße 4
                  <br />
                  60313 Frankfurt am Main
                </p>
              </Card>

              <Card title="Verbraucherstreitbeilegung">
                <p>
                  Ich bin nicht bereit und nicht verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </Card>

              <Card title="Haftung für Inhalte">
                <p>
                  Die Inhalte dieser Website wurden mit größter Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte kann ich jedoch keine Gewähr übernehmen. Als
                  Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Zur Überwachung
                  übermittelter oder gespeicherter fremder Informationen bin
                  ich nicht verpflichtet. Verpflichtungen zur Entfernung oder
                  Sperrung der Nutzung von Informationen nach den allgemeinen
                  Gesetzen bleiben hiervon unberührt.
                </p>
              </Card>

              <Card title="Haftung für Links">
                <p>
                  Diese Website enthält Links zu externen Websites Dritter, auf
                  deren Inhalte ich keinen Einfluss habe. Für diese fremden
                  Inhalte übernehme ich keine Gewähr. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder
                  Betreiber verantwortlich. Die verlinkten Seiten wurden zum
                  Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                  überprüft. Bei Bekanntwerden von Rechtsverletzungen werde ich
                  derartige Links umgehend entfernen.
                </p>
              </Card>

              <Card title="Urheberrecht">
                <p>
                  Die durch den Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </Card>
            </div>
          </div>
        </RevealOnScroll>
      </section>
      </main>

      <Footer />
    </div>
  );
};
