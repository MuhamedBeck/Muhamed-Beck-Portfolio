// Tests für Zusätze im Kopf der vorgerenderten Seiten (src/seo/kopfZusaetze.js).
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { schriftVorladen, vorschaubildErsetzungen } from "../src/seo/kopfZusaetze.js";
import { dolmetscherServiceKnoten } from "../src/seo/dolmetscherSchema.js";
import { ROUTES, SITE_URL } from "../src/routes/registry.js";
import { INHALT as DE } from "../src/content/dolmetscher.de.js";
import { INHALT as EN } from "../src/content/dolmetscher.en.js";
import { INHALT as AR } from "../src/content/dolmetscher.ar.js";
import { findeBezeichnungen } from "../scripts/geschuetzte-bezeichnungen.js";

test("schriftVorladen: nur arabische Routen laden den Schnitt 400 vor", () => {
  assert.equal(
    schriftVorladen("ar"),
    '  <link rel="preload" href="/fonts/ibm-plex-sans-arabic-400.woff2" as="font" type="font/woff2" crossorigin />\n'
  );
  assert.equal(schriftVorladen("de"), "");
  assert.equal(schriftVorladen("en"), "");
});

const KOPF = [
  '<meta property="og:image" content="https://muhamedbeck.com/og-image.jpg" />',
  '<meta property="og:image:width" content="1200" />',
  '<meta property="og:image:height" content="800" />',
  '<meta name="twitter:image" content="https://muhamedbeck.com/og-image.jpg" />',
].join("\n");
const gruppe = Object.fromEntries(ROUTES.filter((route) => route.group === "dolmetscher").map((route) => [route.locale, route]));
const INHALTE = { de: DE, en: EN, ar: AR };

test("Registry: die drei Routen tragen dasselbe Vorschaubild", () => {
  for (const route of Object.values(gruppe)) {
    assert.deepEqual(route.ogImage, { src: "/bilder/dolmetscher-vorschau-v1.jpg", width: 1200, height: 630 });
  }
});

test("vorschaubildErsetzungen ersetzt genau vier Stellen", () => {
  const ersetzungen = vorschaubildErsetzungen(gruppe.de.ogImage);
  assert.equal(ersetzungen.length, 4);
  const html = ersetzungen.reduce((stand, [muster, ersatz]) => stand.replace(muster, ersatz), KOPF);
  assert.equal(html.match(/https:\/\/muhamedbeck\.com\/bilder\/dolmetscher-vorschau-v1\.jpg/g).length, 2);
  assert.match(html, /og:image:width" content="1200"/);
  assert.match(html, /og:image:height" content="630"/);
  assert.doesNotMatch(html, /og-image\.jpg|content="800"/);
});

test("dolmetscherServiceKnoten: Leistung, Person, Gebiet, Kanal, Preise aus site.js", () => {
  const knoten = dolmetscherServiceKnoten(gruppe.de, DE);
  assert.equal(knoten["@type"], "Service");
  assert.equal(knoten["@id"], `${SITE_URL}/dolmetscher-arabisch-frankfurt#service`);
  assert.equal(knoten.name, gruppe.de.h1);
  assert.equal(knoten.description, gruppe.de.description);
  assert.deepEqual(knoten.provider, {
    "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Muhamed Nur Beck", url: `${SITE_URL}/ueber-mich`,
  });
  assert.deepEqual(knoten.areaServed, [
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" },
  ]);
  assert.deepEqual(knoten.availableChannel, {
    "@type": "ServiceChannel", serviceUrl: `${SITE_URL}/dolmetscher-arabisch-frankfurt`, availableLanguage: ["de", "ar", "en"],
  });
  assert.deepEqual(
    knoten.offers.map((angebot) => [
      angebot.name,
      angebot.price ?? [angebot.priceSpecification.minPrice, angebot.priceSpecification.maxPrice],
      angebot.priceCurrency ?? angebot.priceSpecification.priceCurrency,
      angebot.description,
    ]),
    [
      ["Dolmetschen vor Ort", 70, "EUR", "70\u00A0€ je Stunde"],
      ["Video und Telefon", 35, "EUR", "35\u00A0€ je angefangene 30 Minuten"],
      ["Notar und Standesamt", 240, "EUR", "240\u00A0€ Festpreis"],
      ["Schriftliche Übersetzung", 1.4, "EUR", "1,40\u00A0€ je Normzeile"],
      ["Messe und Verhandlung", [320, 590], "EUR", "320\u00A0€ Halbtag, 590\u00A0€ Tag"],
    ]
  );
  for (const feld of ["isRelatedTo", "aggregateRating", "review", "audience"]) assert.equal(knoten[feld], undefined, feld);
});

test("Service-Knoten jeder Fassung: keine Gattungen, keine geschützten Bezeichnungen", () => {
  for (const [locale, route] of Object.entries(gruppe)) {
    const json = JSON.stringify(dolmetscherServiceKnoten(route, INHALTE[locale]));
    assert.deepEqual(findeBezeichnungen(json), [], locale);
    assert.doesNotMatch(json, /Polizei|Gericht|Klinik|Behörde|police|court|hospital|الشرطة|المحاكم|المستشفيات/i, locale);
  }
});

// Seit 19.11.2026: deutsches Vorschaubild für die deutschen Seiten; /en und /ar
// behalten das bisherige englische, Seiten mit eigenem Bild ihres.
test("vorschaubildFuer: Bild je Sprache, eigenes Bild hat Vorrang", async () => {
  const { vorschaubildFuer } = await import("../src/seo/kopfZusaetze.js");
  const route = (pfad) => ROUTES.find((eintrag) => eintrag.path === pfad);
  assert.deepEqual(vorschaubildFuer(route("/")), { src: "/og-image.jpg", width: 1200, height: 630 });
  assert.deepEqual(vorschaubildFuer(route("/leistungen/n8n-automatisierung")), { src: "/og-image.jpg", width: 1200, height: 630 });
  assert.deepEqual(vorschaubildFuer(route("/en")), { src: "/og-image-en.jpg", width: 1200, height: 800 });
  assert.deepEqual(vorschaubildFuer(route("/ar")), { src: "/og-image-en.jpg", width: 1200, height: 800 });
  assert.deepEqual(vorschaubildFuer(gruppe.de), gruppe.de.ogImage);
  assert.deepEqual(vorschaubildFuer(gruppe.en), gruppe.en.ogImage);
});
