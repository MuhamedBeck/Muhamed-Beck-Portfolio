// Tests für die reinen Funktionen des Anfrageformulars der Dolmetscher-Seite
// (src/services/dolmetscherAnfrage.js). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ANLAESSE, ARTEN, HERKUENFTE, LEERE_FELDER, SPRACHEN,
  anfrageSenden, archivObjekt, mailVariablen, wunschterminText,
} from "../src/services/dolmetscherAnfrage.js";
import woerter from "../src/i18n/dict/dolmetscher.js";

const FELDER = {
  ...LEERE_FELDER,
  art: "vor-ort", sprachen: "de-ar", anlass: "behoerde",
  wunschdatum: "2026-12-03", wunschzeit: "10:30", treffpunkt: "  Offenbach ",
  name: "Erika Muster", email: "erika@example.com", telefon: "+49 170 0000000",
  herkunft: "empfehlung", nachricht: "Termin bei der Ausländerbehörde.",
};
const ORT = { locale: "ar", pfad: "/ar/arabic-interpreter-frankfurt", verdacht: false };

test("feste Werte tragen die deutschen Beschriftungen des Wörterbuchs", () => {
  const { formular } = woerter.de;
  assert.deepEqual(ARTEN, formular.art.optionen);
  assert.deepEqual(SPRACHEN, formular.sprachen.optionen);
  assert.deepEqual(ANLAESSE, formular.anlass.optionen);
  assert.deepEqual(HERKUENFTE, formular.herkunft.optionen);
  assert.equal(ANLAESSE.arzt, undefined);
});

// Prüfschwerpunkt 4.
test("wunschterminText: vollständig, halb, leer, Freitext, kurz nach Mitternacht", () => {
  assert.equal(wunschterminText("2026-12-03", "10:30"), "03.12.2026, 10:30 Uhr");
  assert.equal(wunschterminText("2026-12-03", "00:15"), "03.12.2026, 00:15 Uhr");
  assert.equal(wunschterminText("2026-12-03", ""), "03.12.2026");
  assert.equal(wunschterminText("", "10:30"), "10:30 Uhr");
  assert.equal(wunschterminText("", ""), "");
  assert.equal(wunschterminText("3.12.", "vormittags"), "3.12., vormittags");
  assert.equal(wunschterminText(undefined, undefined), "");
});

test("mailVariablen: erste Zeile, beschriftete Zeilen, Sprache der Seite", () => {
  const mail = mailVariablen(FELDER, ORT);
  assert.equal(mail.message.split("\n")[0], "Dolmetsch-Anfrage: Termin vor Ort, 03.12.2026, 10:30 Uhr");
  assert.equal(mail.beschreibung, mail.message);
  for (const zeile of [
    "Sprache der Seite: Arabisch", "Art: Termin vor Ort", "Sprachen: Deutsch und Arabisch",
    "Anlass: Behörde", "Wunschtermin: 03.12.2026, 10:30 Uhr", "Ort: Offenbach",
    "Telefon: +49 170 0000000", "Gefunden über: Empfehlung",
  ]) assert.ok(mail.message.includes(`\n${zeile}\n`), zeile);
  assert.ok(mail.message.endsWith("\n\nWorum geht es:\nTermin bei der Ausländerbehörde."));
  assert.equal(mail.name, "Erika Muster");
  assert.equal(mail.email, "erika@example.com");
  assert.equal(mail.leistung, "Dolmetschen: Termin vor Ort, 03.12.2026, 10:30 Uhr");
  assert.equal(mail.unternehmen, "nicht angegeben");
  assert.equal(mail.herkunft, "Empfehlung");
  assert.equal(mail.seitensprache, "Arabisch");
  assert.equal(mail.formular, "Dolmetscher-Anfrage (arabisch), muhamedbeck.com/ar/arabic-interpreter-frankfurt");
  const karg = mailVariablen({ ...LEERE_FELDER, art: "video-telefon", sprachen: "en-ar", name: "A", email: "a@b.de", nachricht: "x" }, ORT);
  assert.equal(karg.message.split("\n")[0], "Dolmetsch-Anfrage: Video oder Telefon, ohne Wunschtermin");
  assert.ok(karg.message.includes("\nAnlass: nicht angegeben\n"));
  assert.doesNotMatch(karg.message, /undefined|Ort:/);
});

// Prüfschwerpunkt 1.
test("Art-Wechsel: ausgehängte Felder gehen nicht mit", () => {
  const gewechselt = { ...FELDER, art: "uebersetzung" };
  const mail = mailVariablen(gewechselt, ORT);
  assert.equal(mail.message.split("\n")[0], "Dolmetsch-Anfrage: Schriftliche Übersetzung");
  assert.doesNotMatch(mail.message, /Wunschtermin|Ort:|Offenbach|03\.12\.2026/);
  const archiv = archivObjekt(gewechselt, ORT);
  assert.deepEqual([archiv.wunschdatum, archiv.wunschzeit, archiv.treffpunkt], ["", "", ""]);
  const video = archivObjekt({ ...FELDER, art: "video-telefon" }, ORT);
  assert.deepEqual([video.wunschdatum, video.wunschzeit, video.treffpunkt], ["2026-12-03", "10:30", ""]);
});

// Prüfschwerpunkt 3.
test("Spamverdacht: erste Zeile bleibt, Vermerk in Zeile zwei", () => {
  const mail = mailVariablen(FELDER, { ...ORT, verdacht: true });
  const [eins, zwei] = mail.message.split("\n");
  assert.match(eins, /^Dolmetsch-Anfrage: Termin vor Ort/);
  assert.match(zwei, /^Spamverdacht: /);
  assert.match(mail.formular, / \(Spamverdacht: .+\)$/);
  assert.equal(archivObjekt(FELDER, { ...ORT, verdacht: true }).spamverdacht, true);
});

test("archivObjekt: Kennung je Sprache, deutsche Beschriftungen, Rohwerte des Termins", () => {
  assert.deepEqual(archivObjekt(FELDER, ORT), {
    formular: "dolmetscher-ar", name: "Erika Muster", email: "erika@example.com",
    telefon: "+49 170 0000000", art: "Termin vor Ort", sprachen: "Deutsch und Arabisch",
    anlass: "Behörde", wunschdatum: "2026-12-03", wunschzeit: "10:30", treffpunkt: "Offenbach",
    herkunft: "Empfehlung", leistung: "Dolmetschen: Termin vor Ort",
    nachricht: "Termin bei der Ausländerbehörde.", spamverdacht: false,
  });
  assert.equal(archivObjekt(FELDER, { ...ORT, locale: "de" }).formular, "dolmetscher-de");
  assert.equal(archivObjekt(FELDER, { ...ORT, locale: "en" }).formular, "dolmetscher-en");
});

test("anfrageSenden: Erfolg, das Archiv wird zuerst angestoßen", async () => {
  const aufrufe = [];
  const ergebnis = await anfrageSenden({
    archiv: { a: 1 }, mail: { m: 1 },
    archivieren: async (daten) => { aufrufe.push(["archiv", daten]); },
    mailSenden: async (variablen) => { aufrufe.push(["mail", variablen]); },
  });
  assert.deepEqual(aufrufe, [["archiv", { a: 1 }], ["mail", { m: 1 }]]);
  assert.deepEqual(ergebnis, { ok: true });
});

// Prüfschwerpunkt 2.
test("anfrageSenden: Mail scheitert, Archiv geht trotzdem hinaus, nichts wirft", async () => {
  const aufrufe = [];
  const ergebnis = await anfrageSenden({
    archiv: { a: 1 }, mail: { m: 1 },
    archivieren: async (daten) => { aufrufe.push(["archiv", daten]); },
    mailSenden: async () => { throw { status: 429, text: "Quota exceeded" }; },
  });
  assert.deepEqual(aufrufe, [["archiv", { a: 1 }]]);
  assert.deepEqual(ergebnis, { ok: false, grund: "429 Quota exceeded" });
  const netz = await anfrageSenden({
    archiv: {}, mail: {}, archivieren: async () => {},
    mailSenden: async () => { throw new TypeError("Failed to fetch"); },
  });
  assert.deepEqual(netz, { ok: false, grund: "Failed to fetch" });
});

test("anfrageSenden: Archiv wirft, Mail geht trotzdem hinaus", async () => {
  for (const archivieren of [() => { throw new Error("sofort"); }, async () => { throw new Error("später"); }]) {
    let gesendet = false;
    const ergebnis = await anfrageSenden({
      archiv: {}, mail: {}, archivieren,
      mailSenden: async () => { gesendet = true; },
    });
    assert.equal(gesendet, true);
    assert.deepEqual(ergebnis, { ok: true });
  }
});
