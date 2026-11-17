// Tests für den Ratgeber „Was kostet ein Dolmetscher für Arabisch?“
// (src/content/dolmetscher.ratgeber.de.js). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES } from "../src/routes/registry.js";
import { DOLMETSCH_RATGEBER, getDolmetschRatgeber } from "../src/content/dolmetscher.ratgeber.de.js";
import { RATGEBER } from "../src/content/ratgeber.de.js";
import { ANFAHRT_STUFEN, DOLMETSCH_PREIS, preisText } from "../src/content/site.js";
import woerter from "../src/i18n/dict/dolmetscher.js";
import { findeBezeichnungen, istGepruefteGruppe } from "../scripts/geschuetzte-bezeichnungen.js";

const PFAD = "/dolmetscher-arabisch-frankfurt/kosten";
const texte = (wert) =>
  typeof wert === "string" ? [wert] : wert && typeof wert === "object" ? Object.values(wert).flatMap(texte) : [];
const artikel = getDolmetschRatgeber(PFAD);
const alles = texte(artikel).join("\n");

test("Artikel: Form der IT-Ratgeber, aber nicht in deren Liste", () => {
  for (const feld of ["path", "kicker", "h1", "published", "modified", "lede", "table", "sections", "faq", "related", "cta"]) {
    assert.ok(feld in artikel, feld);
  }
  assert.equal(artikel.h1, "Was kostet ein Dolmetscher für Arabisch?");
  assert.equal(artikel.autorPfad, "/lebenslauf");
  assert.equal(RATGEBER.find((eintrag) => eintrag.path === PFAD), undefined);
  assert.equal(DOLMETSCH_RATGEBER.length, 1);
  assert.throws(() => getDolmetschRatgeber("/gibt-es-nicht"));
});

test("sechs Abschnitte als Fragen, jeder beginnt mit einer Zahl im ersten Absatz", () => {
  assert.deepEqual(artikel.sections.map((abschnitt) => abschnitt.h2), [
    "Was kostet ein Dolmetscher pro Stunde?",
    "Was kostet ein Dolmetscher beim Notar?",
    "Was kostet Dolmetschen per Video oder Telefon?",
    "Welche Kosten kommen zum Stundensatz dazu?",
    "Was kostet eine schriftliche Übersetzung?",
    "Wer bezahlt den Dolmetscher?",
  ]);
  for (const abschnitt of artikel.sections) assert.match(abschnitt.body[0], /\d/, abschnitt.h2);
});

test("eigene Beträge aus site.js, gesetzlicher Satz im Einstieg", () => {
  const p = (betrag) => preisText(betrag, "de");
  const eigene = [
    DOLMETSCH_PREIS.vorOrtStunde,
    DOLMETSCH_PREIS.halbeStunde,
    DOLMETSCH_PREIS.notarStandesamt,
    DOLMETSCH_PREIS.normzeile,
    DOLMETSCH_PREIS.mindestauftrag,
    DOLMETSCH_PREIS.messeHalbtag,
    DOLMETSCH_PREIS.messeTag,
    ...ANFAHRT_STUFEN.filter((stufe) => stufe.betrag > 0).map((stufe) => stufe.betrag),
  ];
  for (const betrag of eigene) assert.ok(alles.includes(p(betrag)), p(betrag));
  assert.match(artikel.lede, /93 €/);
  assert.ok(artikel.lede.includes(p(DOLMETSCH_PREIS.vorOrtStunde)));
  assert.ok(artikel.sections[4].body.join(" ").includes(woerter.de.formular.zwecksatz));
  assert.ok(artikel.faq.some((frage) => frage.a.includes(woerter.de.preise.endpreise)));
});

test("Tabelle: drei Spalten, zehn Zeilen, erste Zeile Gesetz, Markt, eigener Preis", () => {
  assert.deepEqual(artikel.table.columns, ["Gerichte nach JVEG", "Markt laut Anbietern", "Mein Preis"]);
  assert.equal(artikel.table.rows.length, 10);
  assert.equal(artikel.table.rows[0].label, "Eine Stunde vor Ort");
  assert.equal(artikel.table.rows[0].cells[0], "93 €");
  assert.equal(artikel.table.rows[0].cells[2], preisText(DOLMETSCH_PREIS.vorOrtStunde, "de"));
});

test("keine geschützten Bezeichnungen, keine Anbieternamen, keine Urkunden", () => {
  assert.deepEqual(findeBezeichnungen(alles), []);
  assert.doesNotMatch(alles, /listando|lingatel|translando|algazel|windga|gesundheitbb|gemeindedolmetsch|vasco/i);
  assert.doesNotMatch(alles, /Urkunde|Zeugnis|Ausweis|Krankenkasse|jederzeit|Standesamt|—/i);
});

test("Weiterlesen und Abschluss bleiben im Dolmetscher-Bereich", () => {
  const pfade = new Set(ROUTES.map((route) => route.path));
  for (const verweis of artikel.related) assert.ok(pfade.has(verweis.path), verweis.path);
  assert.ok(artikel.related.some((verweis) => verweis.path === "/dolmetscher-arabisch-frankfurt"));
  assert.ok(artikel.related.every((verweis) => !/^\/(ratgeber|leistungen|kontakt)/.test(verweis.path)));
  assert.ok(artikel.cta.intro.includes("in der Regel innerhalb von 24 Stunden"));
});

test("Route: Adresse, Gruppe unter der Sperre, Titel, Vorschaubild, Datum wie der Artikel", () => {
  const route = ROUTES.find((eintrag) => eintrag.id === "dolmetscher.kosten");
  assert.ok(route, "Route dolmetscher.kosten fehlt");
  assert.equal(route.path, PFAD);
  assert.equal(route.locale, "de");
  assert.equal(route.group, "dolmetscher.kosten");
  assert.ok(istGepruefteGruppe(route.group));
  assert.equal(route.title, "Dolmetscher Kosten pro Stunde 2026: Preise für Arabisch");
  assert.equal(route.h1, artikel.h1);
  assert.equal(route.ogType, "article");
  assert.equal(route.ogImage.src, "/bilder/dolmetscher-vorschau-v1.jpg");
  assert.equal(route.lastmod, artikel.modified);
  assert.equal(route.navLabel, undefined);
  assert.equal(route.eager, undefined);
  assert.match(route.description, /93 €/);
});

test("jede Seite unter der Dolmetscher-Adresse steht unter der Wortsperre", () => {
  const unter = ROUTES.filter((route) => route.path.startsWith("/dolmetscher-arabisch-frankfurt"));
  assert.ok(unter.length >= 2);
  for (const route of unter) assert.ok(istGepruefteGruppe(route.group), route.path);
});

// Befunde der Abschlussprüfung vom 17.11.2026: Marktzahlen so eng wie die Quellen
// in .claude/recherche/2026-11-17/kosten-quellen.md (privat, nicht im Repository).
test("Quellentreue: die Spanne 70 bis 120 € steht nur mit dem Portal und nur als „oft“", () => {
  const route = ROUTES.find((eintrag) => eintrag.id === "dolmetscher.kosten");
  const stellen = [...texte(artikel), route.description].filter(
    (text) => text.includes("70 bis 120") && text !== "70 bis 120 €"
  );
  assert.ok(stellen.length >= 4, `nur ${stellen.length} Stellen`);
  for (const text of stellen) {
    assert.match(text, /Vermittlungsportal/, text);
    assert.doesNotMatch(text, /meist (etwa )?70 bis 120|direkt beauftragt/i, text);
  }
  const balken = artikel.sections[0].bild.daten.zeilen.find((zeile) => zeile.text === "70 bis 120 €");
  assert.match(balken.label, /Vermittlungsportal/);
  assert.doesNotMatch(balken.label, /direkt beauftragt/i);
});

test("Quellentreue Notar: ab 390 €, meist 420 bis 530 €, Agentur in Bayern, für Englisch", () => {
  const notar = artikel.sections[1];
  assert.match(notar.body[0], /^Ab 390 €, meist 420 bis 530 €/);
  assert.doesNotMatch(alles, /zwischen 390 und 530/);
  const zelle = artikel.table.rows.find((zeile) => zeile.label === "Notartermin").cells[1];
  for (const muster of [/ab 390 €, meist 420 bis 530 €/, /Englisch/, /Bayern/]) assert.match(zelle, muster);
  const balken = notar.bild.daten.zeilen[0];
  for (const muster of [/Bayern/, /Englisch/]) assert.match(balken.label, muster);
});

test("Quellentreue: keine Angabe, die die Quellen nicht tragen", () => {
  assert.doesNotMatch(alles, /bundesweit/i);
  const hotline = artikel.sections[2].body[0];
  assert.match(hotline, /1,99 € je Minute/);
  assert.match(hotline, /Mobilfunk/);
  assert.doesNotMatch(artikel.sections[4].body[0], /55 Anschläg/);
  const video = artikel.table.rows.find((zeile) => zeile.label === "30 Minuten per Video oder Telefon");
  assert.equal(video.cells[0], "93 € je Stunde");
});
