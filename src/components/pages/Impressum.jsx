import { LegalPage } from "./LegalPage";
import { CONTACT, PERSON } from "../../content/site";

// The postal address is the one identity string that is not in site.js, because
// nothing else on the site renders it. Everything else reads from there, so the
// Impressum and the JSON-LD cannot drift apart -- which for this page is a
// legal problem, not a tidiness one.
const ADDRESS = (
  <>
    {PERSON.name}
    <br />
    Krögerstraße 4
    <br />
    60313 {PERSON.city}
  </>
);

const SECTIONS = [
  {
    title: "Diensteanbieter",
    body: (
      <p>
        {ADDRESS}
        <br />
        Deutschland
      </p>
    ),
  },
  {
    title: "Kontakt",
    body: (
      <p>
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
    ),
  },
  {
    title: "Umsatzsteuer",
    body: (
      <>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          <br />
          DE354877279
        </p>
        <p className="mt-4">
          Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine
          Umsatzsteuer berechnet. Alle genannten Preise sind Endpreise.
        </p>
      </>
    ),
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    body: <p>{ADDRESS}</p>,
  },
  {
    title: "Verbraucherstreitbeilegung",
    body: (
      <p>
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    ),
  },
  {
    title: "Haftung für Inhalte",
    body: (
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine
        Gewähr übernehmen. Als Diensteanbieter bin ich für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Zur Überwachung
        übermittelter oder gespeicherter fremder Informationen bin ich nicht
        verpflichtet. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
      </p>
    ),
  },
  {
    title: "Haftung für Links",
    body: (
      <p>
        Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich
        keinen Einfluss habe. Für diese fremden Inhalte übernehme ich keine Gewähr. Für
        die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Bei Bekanntwerden von
        Rechtsverletzungen werde ich derartige Links umgehend entfernen.
      </p>
    ),
  },
  {
    title: "Urheberrecht",
    body: (
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    ),
  },
];

export const Impressum = () => (
  <LegalPage
    label="Rechtliches"
    headline="Impressum"
    intro="Angaben gemäß § 5 DDG."
    sections={SECTIONS}
  />
);
