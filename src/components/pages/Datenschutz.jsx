import { LegalPage } from "./LegalPage";
import { CONTACT, PERSON } from "../../content/site";

const EXT_LINK = "text-accent break-all hover:underline";

// Wording unchanged from the previous version: this is a legal document, and
// the migration here is presentational only.
const SECTIONS = [
  {
    title: "1. Verantwortlicher",
    body: (
      <>
        <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
        <p>
          {PERSON.name}
          <br />
          Krögerstraße 4
          <br />
          60313 {PERSON.city}
          <br />
          Telefon:{" "}
          <a href={`tel:${CONTACT.phone}`} className="text-accent hover:underline">
            {CONTACT.phoneDisplay}
          </a>
          <br />
          E-Mail:{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </>
    ),
  },
  {
    title: "2. Allgemeine Hinweise",
    body: (
      <>
        <p>
          Diese Datenschutzerklärung informiert Sie darüber, welche personenbezogenen
          Daten bei Ihrem Besuch dieser Website verarbeitet werden und welche Rechte
          Ihnen zustehen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können. Diese Website nutzt keine Cookies und
          setzt keine Tracking-Technologien von Werbenetzwerken ein.
        </p>
        <p>
          Aus technischen Gründen speichert die Website im sessionStorage Ihres Browsers
          ein einzelnes Merkmal ohne Personenbezug, das steuert, ob der Ladebildschirm
          beim wiederholten Aufruf innerhalb derselben Sitzung übersprungen wird. Dieses
          Merkmal wird beim Schließen des Browser-Tabs automatisch gelöscht (§ 25 Abs. 2
          Nr. 2 TDDDG).
        </p>
      </>
    ),
  },
  {
    title: "3. Hosting und Auslieferung (Cloudflare)",
    body: (
      <>
        <p>
          Diese Website wird über die Infrastruktur der Cloudflare, Inc., 101 Townsend
          Street, San Francisco, CA 94107, USA, ausgeliefert. Dort ist auch die Domain
          registriert. Beim Aufruf der Website verarbeitet Cloudflare automatisch
          technische Zugriffsdaten, darunter Ihre IP-Adresse, Datum und Uhrzeit des
          Zugriffs, die aufgerufene Adresse, Browsertyp und Betriebssystem. Diese
          Verarbeitung ist erforderlich, um die Seiteninhalte auszuliefern sowie
          Stabilität und Sicherheit zu gewährleisten, etwa zur Abwehr von Angriffen.
        </p>
        <p>
          Die Auslieferung an Besucher aus Deutschland erfolgt über europäische
          Standorte des Cloudflare-Netzwerks. Eine Verarbeitung in den USA lässt sich
          dabei nicht ausschließen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einer sicheren und zuverlässigen Bereitstellung der
          Website). Mit Cloudflare besteht ein Vertrag zur Auftragsverarbeitung; die
          Übermittlung in die USA ist durch die EU-Standardvertragsklauseln abgesichert.
          Weitere Informationen finden Sie in der Datenschutzerklärung von Cloudflare:{" "}
          <a
            href="https://www.cloudflare.com/de-de/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXT_LINK}>
            cloudflare.com/de-de/privacypolicy
          </a>
        </p>
      </>
    ),
  },
  {
    title: "4. Reichweitenmessung",
    body: (
      <p>
        Diese Website setzt keine Analyse- oder Reichweitenmessungsdienste ein. Es
        findet keine Auswertung Ihres Nutzungsverhaltens statt, weder durch eigene noch
        durch fremde Werkzeuge. Über die unter Ziffer 3 genannten technischen
        Zugriffsdaten hinaus werden beim bloßen Besuch der Website keine Daten erhoben.
      </p>
    ),
  },
  {
    title: "5. Kontaktformular (EmailJS)",
    body: (
      <>
        <p>
          Wenn Sie mir über das Kontakt- oder Anfrageformular eine Nachricht senden,
          werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, ggf. Firma, Art
          der Anfrage und Nachrichtentext) zur Bearbeitung Ihrer Anfrage verarbeitet.
          Für den technischen Versand nutze ich den Dienst EmailJS (emailjs.com). Ihre
          Angaben werden dabei über die Server von EmailJS an mein E-Mail-Postfach
          übermittelt; dabei kann eine Datenverarbeitung außerhalb der EU stattfinden.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung bzw. Durchführung
          vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse an der Bearbeitung von Anfragen). Ihre Daten werden gelöscht, sobald
          sie für die Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen. Weitere Informationen:{" "}
          <a
            href="https://www.emailjs.com/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={EXT_LINK}>
            emailjs.com/legal/privacy-policy
          </a>
        </p>
      </>
    ),
  },
  {
    title: "6. Schriftarten",
    body: (
      <p>
        Diese Website verwendet die Schriftart Space Grotesk. Die Schriftdateien sind
        lokal auf dem Webserver gespeichert. Beim Laden der Schrift wird keine
        Verbindung zu Servern von Google oder anderen Drittanbietern aufgebaut.
      </p>
    ),
  },
  {
    title: "7. Externe Links",
    body: (
      <p>
        Diese Website enthält Links zu externen Plattformen wie LinkedIn und GitHub.
        Beim Anklicken dieser Links verlassen Sie diese Website; es gelten dann die
        Datenschutzbestimmungen des jeweiligen Anbieters. Eine Einbindung von Inhalten
        dieser Plattformen (z. B. über Plugins) findet auf dieser Website nicht statt.
      </p>
    ),
  },
  {
    title: "8. SSL- bzw. TLS-Verschlüsselung",
    body: (
      <p>
        Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
        vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
        Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit https://
        beginnt.
      </p>
    ),
  },
  {
    title: "9. Ihre Rechte",
    body: (
      <>
        <p>Ihnen stehen folgende Rechte zu:</p>
        <ul className="list-disc space-y-1 ps-5">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            Widerspruch gegen die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO (Art. 21 DSGVO)
          </li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an die oben genannte
          Adresse. Außerdem haben Sie das Recht, sich bei einer
          Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig ist der
          Hessische Beauftragte für Datenschutz und Informationsfreiheit.
        </p>
      </>
    ),
  },
  {
    title: "10. Aktualität dieser Datenschutzerklärung",
    body: (
      <p>
        Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie stets den
        aktuellen rechtlichen Anforderungen entspricht oder um Änderungen der Website
        abzubilden. Für Ihren erneuten Besuch gilt dann die jeweils aktuelle Fassung.
      </p>
    ),
  },
];

export const Datenschutz = () => (
  <LegalPage
    label="Rechtliches"
    headline="Datenschutzerklärung"
    intro="Stand: Juli 2026"
    sections={SECTIONS}
  />
);
