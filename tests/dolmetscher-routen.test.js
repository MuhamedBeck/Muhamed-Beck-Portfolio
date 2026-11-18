// Tests für die drei Routen der Dolmetscher-Seite und ihr Wörterbuch.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES, getAlternates } from "../src/routes/registry.js";
import woerter from "../src/i18n/dict/dolmetscher.js";
import { INHALT as DE } from "../src/content/dolmetscher.de.js";
import { INHALT as EN } from "../src/content/dolmetscher.en.js";
import { INHALT as AR } from "../src/content/dolmetscher.ar.js";

const GRUPPE = ROUTES.filter((route) => route.group === "dolmetscher");

test("drei Routen mit festgelegten Adressen, Titeln und Hauptüberschriften", () => {
  assert.deepEqual(
    GRUPPE.map((route) => [route.id, route.path, route.locale, route.title, route.h1]),
    [
      ["dolmetscher.de", "/dolmetscher-arabisch-frankfurt", "de",
        "Dolmetscher Arabisch Deutsch in Frankfurt | Muhamed Beck",
        "Dolmetscher und Übersetzer für Arabisch und Deutsch in Frankfurt"],
      ["dolmetscher.en", "/en/arabic-interpreter-frankfurt", "en",
        "Arabic Interpreter in Frankfurt | Muhamed Nur Beck",
        "Arabic interpreter and translator in Frankfurt"],
      ["dolmetscher.ar", "/ar/arabic-interpreter-frankfurt", "ar",
        "مترجم فوري عربي ألماني في فرانكفورت | محمد نور بيك",
        "مترجم شفوي وتحريري بين العربية والألمانية في فرانكفورت"],
    ]
  );
  assert.equal(getAlternates(GRUPPE[0]).length, 3);
  for (const route of GRUPPE) assert.equal(route.eager, undefined);
});

test("die Hauptüberschrift steht wortgleich im Inhaltsmodul, nicht nur in der Registry", () => {
  assert.deepEqual([DE, EN, AR].map((inhalt) => inhalt.kopf.h1), GRUPPE.map((route) => route.h1));
});

test("Beschreibungen nennen keine Gattungen von Einsatzorten", () => {
  for (const route of GRUPPE) {
    assert.doesNotMatch(
      route.description,
      /Polizei|Gericht|Klinik|Behörde|police|court|hospital|authorit|الشرطة|المحاكم|المستشفيات|الدوائر/i,
      route.id
    );
  }
});

test("Wörterbuch: festgelegte Sätze stehen wörtlich", () => {
  const { de, en, ar } = woerter;
  assert.equal(de.kopf.whatsappText,
    "Guten Tag Herr Beck,\n\nich möchte einen Termin anfragen.\n\nDatum und Uhrzeit: …\nOrt: …");
  assert.equal(de.formular.hinweis,
    "Das ist eine Anfrage, keine Buchung, und sie verpflichtet Sie zu nichts. Ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage. Verbindlich wird der Termin erst, wenn Sie mir das bestätigen. Wenn es schneller gehen muss: WhatsApp oder Anruf.");
  assert.equal(`${de.formular.bestaetigungTitel} ${de.formular.bestaetigungText}`,
    "Ihre Anfrage ist angekommen. Sie ist noch keine Buchung: Ich melde mich in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage. Haben Sie bis dahin nichts gehört, rufen Sie mich bitte an; ohne meine Antwort ist nichts vereinbart.");
  assert.equal(de.preise.endpreise,
    "Alle Preise sind Endpreise; als Kleinunternehmer nach § 19 UStG berechne ich keine Umsatzsteuer. Weitere Kosten fallen nicht an.");
  assert.equal(de.formular.zwecksatz,
    "Übersetzungen zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.");
  assert.equal(en.formular.zwecksatz,
    "Translations for understanding and business use, not for submission to authorities or courts.");
  assert.equal(ar.formular.zwecksatz,
    "ترجمات للفهم وللمراسلات والأعمال، وليست للتقديم إلى الدوائر الحكومية أو المحاكم.");
  assert.equal(de.formular.treffpunkt.label, "Wo findet der Termin statt?");
  assert.equal(de.formular.treffpunkt.hinweis, "Stadt oder Stadtteil genügt");
  assert.equal(de.formular.nachricht.hinweis,
    "kurz, ohne Diagnosen, Aktenzeichen, Unterlagen und ohne Namen anderer Personen");
  assert.equal(de.fuss.itVerweis, "IT und Automatisierung: muhamedbeck.com");
  assert.equal(de.kopf.rolle, "Dolmetscher und Übersetzer");
  assert.equal(ar.kopf.name, "محمد نور بيك");
  assert.equal(de.fuss.rechtstexteHinweis, "");
  assert.ok(en.fuss.rechtstexteHinweis && ar.fuss.rechtstexteHinweis);
});

test("24-Stunden-Zusage überall im selben Wortlaut, nie „jederzeit“", () => {
  const wendung = { de: "in der Regel innerhalb von 24 Stunden", en: "usually within 24 hours", ar: "عادةً خلال 24 ساعة" };
  for (const sprache of ["de", "en", "ar"]) {
    assert.ok(woerter[sprache].formular.hinweis.includes(wendung[sprache]), sprache);
    assert.ok(woerter[sprache].formular.bestaetigungText.includes(wendung[sprache]), sprache);
  }
  assert.doesNotMatch(JSON.stringify(woerter.de), /jederzeit|immer erreichbar/i);
});
