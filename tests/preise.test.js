// Tests für die Preise der Dolmetscher-Seite in src/content/site.js.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ANFAHRT_START,
  ANFAHRT_STUFEN,
  CONTACT,
  DOLMETSCH_PREIS,
  preisText,
  whatsappHref,
} from "../src/content/site.js";

test("DOLMETSCH_PREIS trägt die festgelegten Beträge", () => {
  assert.deepEqual(DOLMETSCH_PREIS, {
    vorOrtStunde: 70,
    halbeStunde: 35,
    notarStandesamt: 240,
    normzeile: 1.4,
    mindestauftrag: 30,
    messeHalbtag: 320,
    messeTag: 590,
  });
});

test("ANFAHRT_STUFEN: fünf Stufen, feste Beträge, jeder Ort genau einmal", () => {
  assert.deepEqual(
    ANFAHRT_STUFEN.map((stufe) => [stufe.id, stufe.vonKm, stufe.bisKm, stufe.betrag]),
    [
      ["bis15", 0, 15, 0],
      ["bis25", 15, 25, 15],
      ["bis35", 25, 35, 25],
      ["bis50", 35, 50, 35],
      ["weiter", 50, null, null],
    ]
  );
  assert.deepEqual(ANFAHRT_STUFEN.map((stufe) => stufe.orte), [
    ["Frankfurt (ganzes Stadtgebiet)", "Offenbach", "Neu-Isenburg", "Bad Vilbel", "Eschborn", "Flughafen"],
    ["Bad Homburg", "Oberursel", "Kronberg", "Hofheim", "Langen", "Hanau"],
    ["Rüsselsheim", "Friedberg"],
    ["Darmstadt", "Wiesbaden", "Mainz", "Bad Nauheim", "Aschaffenburg"],
    ["Gießen"],
  ]);
  const alle = ANFAHRT_STUFEN.flatMap((stufe) => stufe.orte);
  assert.equal(new Set(alle).size, alle.length);
  assert.equal(ANFAHRT_START, "Frankfurter Hauptwache");
});

test("Beispiel der Seite: eine Stunde in Hanau kostet 85 €", () => {
  const hanau = ANFAHRT_STUFEN.find((stufe) => stufe.orte.includes("Hanau"));
  assert.equal(preisText(DOLMETSCH_PREIS.vorOrtStunde + hanau.betrag), "85 €");
});

test("preisText schreibt Beträge je Sprache", () => {
  assert.equal(preisText(70, "de"), "70 €");
  assert.equal(preisText(1.4, "de"), "1,40 €");
  assert.equal(preisText(1200, "de"), "1.200 €");
  assert.equal(preisText(70, "en"), "€70");
  assert.equal(preisText(1.4, "en"), "€1.40");
  assert.equal(preisText(1200, "en"), "€1,200");
  assert.equal(preisText(70, "ar"), "70 يورو");
  assert.equal(preisText(1.4, "ar"), "1,40 يورو");
  assert.equal(preisText(1200, "ar"), "1.200 يورو");
  assert.equal(preisText(70), "70 €");
  assert.equal(preisText(70, "fr"), "70 €");
});

// Prüfschwerpunkt 5: arabischer vorbereiteter Text.
test("whatsappHref: Nummer ohne Plus, Text vollständig kodiert", () => {
  assert.equal(whatsappHref(), `https://wa.me/${CONTACT.phone.slice(1)}`);
  assert.equal(whatsappHref(), "https://wa.me/4917666008485");
  const text = "مرحبًا، أود طلب موعد. التاريخ والوقت: … المكان: … & #1 + 2";
  const href = whatsappHref(text);
  const [, kodiert] = href.split("?text=");
  assert.ok(href.startsWith("https://wa.me/4917666008485?text="));
  assert.doesNotMatch(kodiert, /[ &#+]/);
  assert.equal(decodeURIComponent(kodiert), text);
});
