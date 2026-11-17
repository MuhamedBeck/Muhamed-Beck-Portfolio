/**
 * Service-Knoten der Dolmetscher-Seite, je Sprachfassung einer, für das
 * JSON-LD im Kopf (prerender-meta.js, pageJsonLd).
 *
 * Bewusst getrennt vom Service-Knoten der IT-Leistungen: kein Verweis auf das
 * Unternehmen, keine Zielgruppe, keine Bewertungen. Die Sprachen stehen am
 * Kanal, weil schema.org sie am Service selbst nicht vorsieht. Name und
 * Beschreibung kommen aus der Registry, die Angebote aus der Preistabelle der
 * Sprache und die Beträge aus DOLMETSCH_PREIS in site.js, damit Tabelle und
 * strukturierte Daten nichts Verschiedenes sagen können.
 */
import { SITE_URL } from "../routes/registry.js";
import { DOLMETSCH_PREIS, PERSON } from "../content/site.js";

/* Zeile der Preistabelle (schluessel) zu ihrem Betrag in DOLMETSCH_PREIS. Die
   Zeile messe trägt zwei Beträge und steht deshalb nicht hier. */
const BETRAG = {
  vorOrt: "vorOrtStunde",
  videoTelefon: "halbeStunde",
  notarStandesamt: "notarStandesamt",
  uebersetzung: "normzeile",
};

const angebot = (row) => {
  const grund = { "@type": "Offer", name: row.label, description: row.cells[0] };
  if (row.schluessel === "messe") {
    return {
      ...grund,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: DOLMETSCH_PREIS.messeHalbtag,
        maxPrice: DOLMETSCH_PREIS.messeTag,
        priceCurrency: "EUR",
      },
    };
  }
  const betrag = DOLMETSCH_PREIS[BETRAG[row.schluessel]];
  if (typeof betrag !== "number") {
    throw new Error(`dolmetscherServiceKnoten: kein Betrag für die Zeile "${row.schluessel}"`);
  }
  return { ...grund, price: betrag, priceCurrency: "EUR" };
};

/**
 * @param {object} route   Eintrag der Registry aus der Gruppe dolmetscher
 * @param {object} inhalt  INHALT der Sprache (src/content/dolmetscher.<sprache>.js)
 * @returns {object} Service-Knoten für @graph
 */
export function dolmetscherServiceKnoten(route, inhalt) {
  const url = `${SITE_URL}${route.path}`;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: route.h1,
    description: route.description,
    provider: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PERSON.name, url: `${SITE_URL}/ueber-mich` },
    areaServed: [
      { "@type": "City", name: "Frankfurt am Main" },
      { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" },
    ],
    availableChannel: { "@type": "ServiceChannel", serviceUrl: url, availableLanguage: ["de", "ar", "en"] },
    // Die Anfahrt ist kein eigenes Angebot, sie gehört zu den Terminen vor Ort.
    offers: inhalt.preise.tabelle.rows.filter((row) => row.schluessel !== "anfahrt").map(angebot),
  };
}
