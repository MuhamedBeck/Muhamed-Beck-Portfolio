// Tests für den Ratgeber „Was kostet ein Dolmetscher für Arabisch?“
// (src/content/dolmetscher.ratgeber.de.js). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES } from "../src/routes/registry.js";
import { DOLMETSCH_RATGEBER, getDolmetschRatgeber } from "../src/content/dolmetscher.ratgeber.de.js";
import { RATGEBER } from "../src/content/ratgeber.de.js";
import { ANFAHRT_STUFEN, DOLMETSCH_PREIS, preisText } from "../src/content/site.js";
import woerter from "../src/i18n/dict/dolmetscher.js";
import { findeBezeichnungen } from "../scripts/geschuetzte-bezeichnungen.js";

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
