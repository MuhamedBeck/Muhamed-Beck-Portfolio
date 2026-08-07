import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { RevealOnScroll } from "../RevealOnScroll";
import { useRouteMeta } from "../../seo/useRouteMeta";

const Card = ({ title, children }) => (
  <div className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-gray-900/50 backdrop-blur-sm">
    <h2 className="text-xl font-bold text-blue-400 mb-4">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const Datenschutz = () => {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100" style={{ background: "#0a0a0a" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
      <section className="min-h-screen w-full py-20 pt-28 px-4" style={{ background: "#0a0a0a" }}>
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group">
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
                Datenschutzerklärung
              </h1>
              <p className="text-gray-400">Stand: Juli 2026</p>
            </div>

            <div className="space-y-6">
              <Card title="1. Verantwortlicher">
                <p>
                  Verantwortlicher für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <p>
                  Muhamed Nur Beck
                  <br />
                  Krögerstraße 4
                  <br />
                  60313 Frankfurt am Main
                  <br />
                  Telefon:{" "}
                  <a
                    href="tel:+4917666008485"
                    className="text-blue-400 hover:text-cyan-400 transition-colors">
                    +49 176 66008485
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a
                    href="mailto:m.nur.beck@hotmail.de"
                    className="text-blue-400 hover:text-cyan-400 transition-colors">
                    m.nur.beck@hotmail.de
                  </a>
                </p>
              </Card>

              <Card title="2. Allgemeine Hinweise">
                <p>
                  Diese Datenschutzerklärung informiert Sie darüber, welche
                  personenbezogenen Daten bei Ihrem Besuch dieser Website
                  verarbeitet werden und welche Rechte Ihnen zustehen.
                  Personenbezogene Daten sind alle Daten, mit denen Sie
                  persönlich identifiziert werden können. Diese Website nutzt
                  keine Cookies und setzt keine Tracking-Technologien von
                  Werbenetzwerken ein.
                </p>
                <p>
                  Aus technischen Gründen speichert die Website im
                  sessionStorage Ihres Browsers ein einzelnes Merkmal ohne
                  Personenbezug, das steuert, ob der Ladebildschirm beim
                  wiederholten Aufruf innerhalb derselben Sitzung übersprungen
                  wird. Dieses Merkmal wird beim Schließen des Browser-Tabs
                  automatisch gelöscht (§ 25 Abs. 2 Nr. 2 TDDDG).
                </p>
              </Card>

              <Card title="3. Hosting und Auslieferung (Cloudflare)">
                <p>
                  Diese Website wird über die Infrastruktur der Cloudflare,
                  Inc., 101 Townsend Street, San Francisco, CA 94107, USA,
                  ausgeliefert. Dort ist auch die Domain registriert. Beim
                  Aufruf der Website verarbeitet Cloudflare automatisch
                  technische Zugriffsdaten, darunter Ihre IP-Adresse, Datum
                  und Uhrzeit des Zugriffs, die aufgerufene Adresse, Browsertyp
                  und Betriebssystem. Diese Verarbeitung ist erforderlich, um
                  die Seiteninhalte auszuliefern sowie Stabilität und
                  Sicherheit zu gewährleisten, etwa zur Abwehr von Angriffen.
                </p>
                <p>
                  Die Auslieferung an Besucher aus Deutschland erfolgt über
                  europäische Standorte des Cloudflare-Netzwerks. Eine
                  Verarbeitung in den USA lässt sich dabei nicht ausschließen.
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                  Interesse an einer sicheren und zuverlässigen Bereitstellung
                  der Website). Mit Cloudflare besteht ein Vertrag zur
                  Auftragsverarbeitung; die Übermittlung in die USA ist durch
                  die EU-Standardvertragsklauseln abgesichert. Weitere
                  Informationen finden Sie in der Datenschutzerklärung von
                  Cloudflare:{" "}
                  <a
                    href="https://www.cloudflare.com/de-de/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-cyan-400 transition-colors break-all">
                    cloudflare.com/de-de/privacypolicy
                  </a>
                </p>
              </Card>

              <Card title="4. Reichweitenmessung">
                <p>
                  Diese Website setzt keine Analyse- oder
                  Reichweitenmessungsdienste ein. Es findet keine Auswertung
                  Ihres Nutzungsverhaltens statt, weder durch eigene noch
                  durch fremde Werkzeuge. Über die unter Ziffer 3 genannten
                  technischen Zugriffsdaten hinaus werden beim bloßen Besuch
                  der Website keine Daten erhoben.
                </p>
              </Card>

              <Card title="5. Kontaktformular (EmailJS)">
                <p>
                  Wenn Sie mir über das Kontakt- oder Anfrageformular eine
                  Nachricht senden, werden die von Ihnen eingegebenen Daten
                  (Name, E-Mail-Adresse, ggf. Firma, Art der Anfrage und
                  Nachrichtentext) zur Bearbeitung Ihrer Anfrage verarbeitet.
                  Für den technischen Versand nutze ich den Dienst EmailJS
                  (emailjs.com). Ihre Angaben werden dabei über die Server von
                  EmailJS an mein E-Mail-Postfach übermittelt; dabei kann eine
                  Datenverarbeitung außerhalb der EU stattfinden.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung
                  bzw. Durchführung vorvertraglicher Maßnahmen) sowie Art. 6
                  Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
                  Bearbeitung von Anfragen). Ihre Daten werden gelöscht,
                  sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr
                  erforderlich sind und keine gesetzlichen
                  Aufbewahrungspflichten entgegenstehen. Weitere Informationen:{" "}
                  <a
                    href="https://www.emailjs.com/legal/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-cyan-400 transition-colors break-all">
                    emailjs.com/legal/privacy-policy
                  </a>
                </p>
              </Card>

              <Card title="6. Schriftarten">
                <p>
                  Diese Website verwendet die Schriftart Space Grotesk. Die
                  Schriftdateien sind lokal auf dem Webserver gespeichert.
                  Beim Laden der Schrift wird keine Verbindung zu Servern von
                  Google oder anderen Drittanbietern aufgebaut.
                </p>
              </Card>

              <Card title="7. Externe Links">
                <p>
                  Diese Website enthält Links zu externen Plattformen wie
                  LinkedIn und GitHub. Beim Anklicken dieser Links verlassen
                  Sie diese Website; es gelten dann die
                  Datenschutzbestimmungen des jeweiligen Anbieters. Eine
                  Einbindung von Inhalten dieser Plattformen (z. B. über
                  Plugins) findet auf dieser Website nicht statt.
                </p>
              </Card>

              <Card title="8. SSL- bzw. TLS-Verschlüsselung">
                <p>
                  Diese Website nutzt aus Sicherheitsgründen und zum Schutz
                  der Übertragung vertraulicher Inhalte eine SSL- bzw.
                  TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
                  Sie daran, dass die Adresszeile des Browsers mit https://
                  beginnt.
                </p>
              </Card>

              <Card title="9. Ihre Rechte">
                <p>Ihnen stehen folgende Rechte zu:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                  <li>
                    Einschränkung der Verarbeitung (Art. 18 DSGVO)
                  </li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>
                    Widerspruch gegen die Verarbeitung auf Grundlage von Art.
                    6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)
                  </li>
                </ul>
                <p>
                  Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an die
                  oben genannte Adresse. Außerdem haben Sie das Recht, sich
                  bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art.
                  77 DSGVO). Zuständig ist der Hessische Beauftragte für
                  Datenschutz und Informationsfreiheit.
                </p>
              </Card>

              <Card title="10. Aktualität dieser Datenschutzerklärung">
                <p>
                  Ich behalte mir vor, diese Datenschutzerklärung anzupassen,
                  damit sie stets den aktuellen rechtlichen Anforderungen
                  entspricht oder um Änderungen der Website abzubilden. Für
                  Ihren erneuten Besuch gilt dann die jeweils aktuelle
                  Fassung.
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
