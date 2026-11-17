// Tests für die Verweise der IT-Seiten auf die Dolmetscher-Seite und den
// Abschnitt „Website auf Arabisch“. Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { findeBezeichnungen } from "../scripts/geschuetzte-bezeichnungen.js";
import { getGroupRoute } from "../src/routes/registry.js";
import nav from "../src/i18n/dict/nav.js";
import {
  DOLMETSCHER_ADRESSE, DOLMETSCHER_PFAD, LEBENSLAUF_PUNKT, LEBENSLAUF_VERWEIS,
  UEBER_MICH_VERWEIS, WEBSITE_AUF_ARABISCH,
} from "../src/content/dolmetscher.verweise.js";
import { SPRACHEN, STATIONEN } from "../src/content/lebenslauf.de.js";
import { LEISTUNGEN } from "../src/content/leistungen.de.js";

const texte = (wert) =>
  typeof wert === "string" ? [wert] : wert && typeof wert === "object" ? Object.values(wert).flatMap(texte) : [];

test("getGroupRoute findet die Fassung einer Sprache", () => {
  assert.equal(getGroupRoute("dolmetscher", "de").path, "/dolmetscher-arabisch-frankfurt");
  assert.equal(getGroupRoute("dolmetscher", "en").path, "/en/arabic-interpreter-frankfurt");
  assert.equal(getGroupRoute("dolmetscher", "ar").path, "/ar/arabic-interpreter-frankfurt");
  assert.equal(getGroupRoute("cv", "ar"), undefined);
});

test("die ausgeschriebene Adresse folgt der Registry", () => {
  assert.equal(DOLMETSCHER_PFAD, getGroupRoute("dolmetscher", "de").path);
  assert.equal(DOLMETSCHER_ADRESSE, `muhamedbeck.com${DOLMETSCHER_PFAD}`);
});

test("Lebenslauf: Punkt und Verweis an der Station Skalli, zwei Formulierungen, keine neue Station", () => {
  const skalli = STATIONEN.find((station) => station.firma === "Skalli GmbH");
  const frueh = STATIONEN.find((station) => station.firma === "Übersetzung 4U GmbH & Co. KG");
  assert.equal(LEBENSLAUF_PUNKT, "Einsätze bei Polizei und Gerichten");
  assert.ok(skalli.punkte.includes(LEBENSLAUF_PUNKT));
  assert.deepEqual(skalli.verweis, LEBENSLAUF_VERWEIS);
  assert.equal(LEBENSLAUF_VERWEIS.adresse, DOLMETSCHER_ADRESSE);
  assert.equal(LEBENSLAUF_VERWEIS.pfad, DOLMETSCHER_PFAD);
  assert.ok(frueh.punkte.includes("Übersetzung von Schriftstücken unter knappen Fristen"));
  assert.doesNotMatch(texte(STATIONEN).join("\n"), /offizieller Dokumente/);
  assert.equal(SPRACHEN.find((eintrag) => eintrag.sprache === "Englisch").niveau, "verhandlungssicher");
  assert.equal(STATIONEN.length, 11);
});

test("Webentwicklung: Abschnitt „Website auf Arabisch“ als Tabelle, Punkt und Verweis auf /ar", () => {
  const web = LEISTUNGEN.find((leistung) => leistung.path === "/leistungen/webentwicklung");
  assert.ok(web.abbildungen.includes(WEBSITE_AUF_ARABISCH.abbildung));
  assert.equal(WEBSITE_AUF_ARABISCH.abbildung.titel, "Website auf Arabisch");
  assert.equal(WEBSITE_AUF_ARABISCH.abbildung.bild.art, "tabelle");
  assert.deepEqual(WEBSITE_AUF_ARABISCH.abbildung.bild.daten.rows.map((row) => row.label),
    ["Leserichtung", "Schrift", "Zahlen und Datum", "Formulare", "Sprachverweise"]);
  assert.ok(web.leistungen.includes(WEBSITE_AUF_ARABISCH.leistung));
  assert.ok(web.weiterlesen.some((eintrag) => eintrag.path === "/ar" && eintrag === WEBSITE_AUF_ARABISCH.weiterlesen));
});

test("neue Texte der IT-Seiten: Fußzeile in drei Sprachen, keine geschützten Bezeichnungen", () => {
  assert.deepEqual(
    ["de", "en", "ar"].map((sprache) => nav[sprache].footer.dolmetscher),
    ["Dolmetscher Arabisch", "Arabic interpreter", "مترجم فوري عربي"]
  );
  const neu = [
    ...texte(UEBER_MICH_VERWEIS), LEBENSLAUF_PUNKT, ...texte(LEBENSLAUF_VERWEIS), ...texte(WEBSITE_AUF_ARABISCH),
    "Übersetzung von Schriftstücken unter knappen Fristen",
    ...["de", "en", "ar"].map((sprache) => nav[sprache].footer.dolmetscher),
  ];
  for (const text of neu) assert.deepEqual(findeBezeichnungen(text), [], text);
});
