// Tests für scripts/geschuetzte-bezeichnungen.js. Ausführen mit `npm test`.
// Unsichtbare Zeichen stehen als \u-Folge, damit sie beim Bearbeiten nicht
// verloren gehen.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  findeBezeichnungen,
  istGepruefteGruppe,
  normalisieren,
  pruefeTexte,
  texteAusHtml,
} from "../scripts/geschuetzte-bezeichnungen.js";

test("istGepruefteGruppe: die Dolmetscher-Seite und ihre Unterseiten, sonst nichts", () => {
  assert.equal(istGepruefteGruppe("dolmetscher"), true);
  assert.equal(istGepruefteGruppe("dolmetscher.kosten"), true);
  assert.equal(istGepruefteGruppe("dolmetscherei"), false);
  assert.equal(istGepruefteGruppe("ratgeber.kosten"), false);
  assert.equal(istGepruefteGruppe("widerrufsbelehrung"), false);
});

const frei = (text) => assert.deepEqual(findeBezeichnungen(text), [], text);
const gesperrt = (text) => assert.notEqual(findeBezeichnungen(text).length, 0, text);

test("normalisieren: Schreibung, Leerzeichen, Trennstriche, arabische Zeichen", () => {
  assert.equal(normalisieren("Staatlich GEPRÜFT"), "staatlich geprüft");
  assert.equal(normalisieren("ver\u00ADeidigt"), "vereidigt");
  assert.equal(normalisieren("öffentlich\n   bestellt"), "öffentlich bestellt");
  assert.equal(normalisieren("Diplom‑Dolmetscher"), "diplom-dolmetscher");
  assert.equal(normalisieren("م\u064Fح\u064Eل\u0651\u064Eف"), "محلف");
  assert.equal(normalisieren("مع\u0640\u0640\u0640تمد"), "معتمد");
  assert.equal(normalisieren("أإآٱ"), "اااا");
  assert.equal(normalisieren("مح\u200Fلف"), "محلف");
});

test("deutsche Stämme und Wendungen in jeder Wortform", () => {
  for (const text of [
    "Vereidigung", "beeidigter Dolmetscher", "Ermächtigung", "beglaubigte Übersetzung",
    "Zertifikat", "zertifiziert", "akkreditiert", "lizenzierter", "autorisierte",
    "staatlich anerkannt", "gerichtlich zugelassen", "Zulassung", "gerichtsfest",
    "Gerichtsdolmetscher", "Gerichtsübersetzerin", "Justizdolmetscher", "Polizeidolmetscher",
    "Urkundenübersetzung", "öffentlich bestellt", "staatlich geprüft", "geprüfter Dolmetscher",
    "geprüfte Übersetzerin", "Diplom-Dolmetscher", "Diplom-Übersetzer", "bescheinigte Übersetzung",
    "bestätigte Übersetzung", "amtliche Übersetzung", "offizielle Übersetzungen",
    "rechtsgültig", "rechtsverbindlich", "Stempel", "Siegel", "Kassenleistung",
  ]) gesperrt(text);
});

test("englische Wörter und Wendungen", () => {
  for (const text of [
    "sworn translator", "Certified", "accredited", "licensed", "registered", "approved",
    "appointed", "attested", "notarized", "notarised", "apostille", "court interpreter",
    "court translator", "court-appointed", "police interpreter", "state-certified",
    "official translation", "official translator", "legally valid", "legally recognised",
    "legally recognized", "authorised translator", "authorized interpreter",
  ]) gesperrt(text);
});

test("arabische Stämme mit und ohne Artikel, Wendungen", () => {
  for (const text of [
    "مترجم محلف", "المترجم المحل\u0651ف", "مترجمة محلفة", "ترجمة معتمدة", "الترجمة المعتمدة",
    "مرخص", "مجاز", "مصدق", "تصديق", "معترف به", "ترجمة موثقة", "مترجم محاكم",
    "مترجم المحكمة", "مترجم قضائي", "مترجم رسمي", "ترجمة رسمية", "الترجمة الرسمية",
    "وثائق رسمية", "ترجمة قانونية", "ختم",
  ]) gesperrt(text);
});

test("erlaubte Wörter und die festgelegten Sätze bleiben frei", () => {
  for (const text of [
    "Dolmetscher", "Übersetzer", "interpreter", "translator", "appointment",
    "مترجم فوري", "مترجم شفوي", "ترجمة شفوية", "مترجم تحريري", "ترجمة تحريرية", "كاتب العدل",
    "Dolmetscher Arabisch Deutsch in Frankfurt | Muhamed Beck",
    "Dolmetscher und Übersetzer für Arabisch und Deutsch in Frankfurt",
    "مترجم فوري عربي ألماني في فرانكفورت | محمد نور بيك",
    "مترجم شفوي وتحريري بين العربية والألمانية في فرانكفورت",
    "Erste Einsätze 2017, seit 2022 regelmäßig. Über 150 Einsätze bei Polizei, Gerichten, Kliniken und Behörden.",
    "Einsätze bei Polizei und Gerichten",
    "Übersetzungen zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.",
    "Translations for understanding and business use, not for submission to authorities or courts.",
    "ترجمات للفهم وللمراسلات والأعمال، وليست للتقديم إلى الدوائر الحكومية أو المحاكم.",
    "Verbindlich wird der Termin erst, wenn Sie mir das bestätigen.",
    "Ich dolmetsche das Gespräch und übersetze Schreiben zum Verständnis; Rechtsberatung leiste ich nicht.",
    "Ein gesetzliches Widerrufsrecht bleibt unberührt.",
  ]) frei(text);
});

test("findeBezeichnungen nennt den Treffer, pruefeTexte den Ort", () => {
  assert.deepEqual(findeBezeichnungen("Zertifikat und nochmals zertifiziert"), ["zertifi"]);
  assert.deepEqual(pruefeTexte([{ ort: "a", text: "Dolmetscher" }]), []);
  assert.deepEqual(pruefeTexte([{ ort: 'route "x": title', text: "Vereidigter Dolmetscher" }]), [
    'route "x": title: geschützte Bezeichnung „vereidig“',
  ]);
});

test("texteAusHtml: Text ohne Tags, Kopf-Angaben, eigene strukturierte Daten, Verweise und Attribute", () => {
  const html = [
    "<html><head><title>Titel mit Siegel</title>",
    '<meta name="description" content="Beschreibung &amp; Zulassung" />',
    '<script type="application/ld+json">{"@graph":[{"@type":"WebSite","note":"certified"}]}</script>',
    '<script type="application/ld+json">{"@type":"Service","description":"sworn"}</script>',
    '</head><body><div id="root"><main>',
    "<p>Polizei<!-- -->dolmetscher</p><p>staatlich <em>geprüft</em></p><p>ver<span>eidigt</span></p>",
    '<a href="https://wa.me/49?text=%D9%85%D8%AD%D9%84%D9%81" aria-label="Stempel">x</a>',
    '<img alt="beglaubigt" /><script>var registered = 1;</script>',
    "</main></div></body></html>",
  ].join("\n");
  const meldungen = pruefeTexte(texteAusHtml(html)).join("\n");
  for (const treffer of [
    "siegel", "zulassung", "sworn", "polizeidolmetsch", "staatlich geprüft", "vereidig", "محلف", "stempel", "beglaubig",
  ]) assert.ok(meldungen.includes(`„${treffer}“`), treffer);
  assert.doesNotMatch(meldungen, /certified|registered/);
});

test("Varianten: Bindestrich, Umschreibung, weitere Stämme, arabische Schreibweisen", () => {
  for (const text of [
    "öffentlich-bestellter Übersetzer", "öffentlich bestellt und vereidet", "allgemein beeideter Dolmetscher",
    "Dolmetscher mit Lizenz", "Urkundsübersetzer", "Gerichtssprachmittler", "notarielle Übersetzung",
    "ermaechtigter Übersetzer", "staatlich geprueft", "oeffentlich bestellt", "Gerichtsuebersetzer",
    "مترجم قانوني", "المترجم القانوني", "الأختام", "ترجمه موثقه", "مترجم رسمى", "ترجمه رسميه",
  ]) gesperrt(text);
  for (const text of [
    "Notariat", "Notar und Standesamt", "في الختام", "ويبقى حق الانسحاب المقرر قانونًا قائمًا.",
    "ولا أقدّم استشارات قانونية.",
  ]) frei(text);
});

test("texteAusHtml: Vorlagenblock wird am Inhalt erkannt, nicht an der Stelle", () => {
  const seite = '<script type="application/ld+json">{"@graph":[{"@type":"Service","description":"sworn"}]}</script>';
  const vorlage = '<script type="application/ld+json">{"@graph":[{"@type":"WebSite","name":"certified"}]}</script>';
  const html = (...bloecke) =>
    `<html><head><title>T</title>${bloecke.join("")}</head><body><div id="root"><main>x</main></div></body></html>`;
  const melde = (h) => pruefeTexte(texteAusHtml(h)).join("\n");
  assert.match(melde(html(seite, vorlage)), /„sworn“/);
  assert.doesNotMatch(melde(html(seite, vorlage)), /certified/);
  assert.match(melde(html(seite)), /„sworn“/);
  assert.match(melde(html(vorlage, seite)), /„sworn“/);
});
