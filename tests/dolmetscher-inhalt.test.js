// Tests für den Inhalt der Dolmetscher-Seite (src/content/dolmetscher.*.js).
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { INHALT as DE } from "../src/content/dolmetscher.de.js";
import { INHALT as EN, ORTE as ORTE_EN } from "../src/content/dolmetscher.en.js";
import { INHALT as AR, ORTE as ORTE_AR } from "../src/content/dolmetscher.ar.js";
import { ANFAHRT_STUFEN, DOLMETSCH_PREIS, preisText } from "../src/content/site.js";
import { ROUTES } from "../src/routes/registry.js";

const texte = (wert) =>
  typeof wert === "string" ? [wert] : wert && typeof wert === "object" ? Object.values(wert).flatMap(texte) : [];
const alles = texte(DE).join("\n");
const zeile = (tabelle, label) => tabelle.rows.find((row) => row.label === label);

test("Einsatzarten: sieben Zeilen im festgelegten Wortlaut", () => {
  const { tabelle } = DE.einsatzarten;
  assert.deepEqual(tabelle.rows.map((row) => row.label), [
    "Arzt und Klinik", "Behörde, Jobcenter, Ausländerbehörde", "Notar und Standesamt", "Kanzlei",
    "Unternehmen und Messe", "Video und Telefon", "Schriftliche Übersetzung",
  ]);
  assert.equal(zeile(tabelle, "Behörde, Jobcenter, Ausländerbehörde").cells[0],
    "Ich dolmetsche das Gespräch und übersetze Schreiben zum Verständnis; Rechtsberatung leiste ich nicht.");
  assert.equal(zeile(tabelle, "Notar und Standesamt").cells[0],
    "Nach Absprache mit dem Notariat oder dem Standesamt. Bitte nennen Sie mich dort vorab.");
  assert.equal(zeile(tabelle, "Schriftliche Übersetzung").cells[0],
    "Übersetzungen zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.");
});

test("Preise: sechs Zeilen, Beträge aus site.js, Bedingungen im Wortlaut", () => {
  const { tabelle } = DE.preise;
  assert.deepEqual(tabelle.rows.map((row) => [row.schluessel, row.label, row.cells[0]]), [
    ["vorOrt", "Dolmetschen vor Ort", "70\u00A0€ je Stunde"],
    ["anfahrt", "Anfahrt", "in Frankfurt und der nahen Umgebung inklusive, sonst 15\u00A0€, 25\u00A0€ oder 35\u00A0€"],
    ["videoTelefon", "Video und Telefon", "35\u00A0€ je angefangene 30 Minuten"],
    ["notarStandesamt", "Notar und Standesamt", "240\u00A0€ Festpreis"],
    ["uebersetzung", "Schriftliche Übersetzung", "1,40\u00A0€ je Normzeile"],
    ["messe", "Messe und Verhandlung", "320\u00A0€ Halbtag, 590\u00A0€ Tag"],
  ]);
  assert.equal(zeile(tabelle, "Dolmetschen vor Ort").cells[1],
    "Mindestdauer 1 Stunde, danach 35\u00A0€ je angefangene 30 Minuten. Die Zeit läuft vom vereinbarten Beginn bis zum Ende des Termins, Wartezeit eingeschlossen.");
  assert.equal(zeile(tabelle, "Anfahrt").cells[1],
    "Feste Beträge je Entfernungsstufe, siehe unten. Fahrzeit berechne ich nicht.");
  assert.equal(zeile(tabelle, "Notar und Standesamt").cells[1],
    "Bis 2 Stunden, Durchsicht des Entwurfs vor dem Termin und Anfahrt in der ersten Stufe enthalten; weiter entfernt kommt der Betrag der Stufe hinzu. Darüber hinaus 35\u00A0€ je angefangene 30 Minuten. Gebühren, die Standesamt oder Notariat selbst erheben, zahlen Sie dort.");
  assert.equal(zeile(tabelle, "Schriftliche Übersetzung").cells[1],
    "Je angefangene Zeile mit 55 Anschlägen einschließlich Leerzeichen, gezählt im deutschen oder englischen Text; Mindestauftrag 30\u00A0€; den Gesamtpreis nenne ich vor Beginn. Zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.");
  assert.equal(zeile(tabelle, "Messe und Verhandlung").cells[1],
    "Halbtag bis 4 Stunden, Tag bis 8 Stunden; darüber hinaus 35\u00A0€ je angefangene 30 Minuten.");
});

test("Anfahrt: fünf Stufen mit Betrag und Orten, Beispiel Hanau", () => {
  const { tabelle, beispiel, text } = DE.preise.anfahrt;
  assert.deepEqual(tabelle.rows.map((row) => [row.label, row.cells[0]]), [
    ["bis etwa 15\u00A0km", "inklusive"], ["über 15 bis 25\u00A0km", "15\u00A0€"], ["über 25 bis 35\u00A0km", "25\u00A0€"],
    ["über 35 bis 50\u00A0km", "35\u00A0€"], ["weiter", "nach Absprache"],
  ]);
  assert.equal(tabelle.rows[0].cells[1],
    "Frankfurt (ganzes Stadtgebiet), Offenbach, Neu-Isenburg, Bad Vilbel, Eschborn, Flughafen");
  assert.equal(tabelle.rows[4].cells[1], "zum Beispiel Gießen");
  assert.ok(beispiel.includes("70\u00A0€ + 15\u00A0€ = 85\u00A0€"));
  assert.ok(text.includes("Frankfurter Hauptwache"));
});

test("Belege, Vertraulichkeit und Absage im festgelegten Wortlaut", () => {
  assert.equal(DE.kopf.belege,
    "Erste Einsätze 2017, seit 2022 regelmäßig. Über 150 Einsätze bei Polizei, Gerichten, Kliniken und Behörden. Deutsch und Arabisch sind meine Muttersprachen, Englisch spreche ich verhandlungssicher.");
  assert.equal(DE.vertraulichkeit.text,
    "Was ich bei einem Einsatz erfahre, behandle ich vertraulich. Auf Wunsch unterschreibe ich eine Verschwiegenheitsvereinbarung.");
  assert.deepEqual(DE.fragen.liste.map((frage) => frage.q), [
    "Wie schnell bekomme ich Antwort?", "Was kostet es?", "Auch abends und am Wochenende?",
    "Welche Dialekte?", "Wie läuft ein Termin per Video?",
    "Wie schicke ich Unterlagen für eine Übersetzung?", "Was passiert, wenn ich absage?",
  ]);
  assert.equal(DE.fragen.liste[6].a,
    "Absagen bis 24 Stunden vor dem Termin kosten nichts. Bei späterer Absage oder wenn Sie nicht erscheinen, berechne ich 70\u00A0€, bei Video- und Telefonterminen 35\u00A0€. Sie können nachweisen, dass mir kein oder ein wesentlich geringerer Schaden entstanden ist. Ein gesetzliches Widerrufsrecht bleibt unberührt.");
  assert.ok(DE.fragen.liste[1].a.includes(
    "Bei kurzen Terminen in größerer Entfernung schlage ich oft Video oder Telefon vor."));
});

test("Ablauf: fünf Schritte, der zweite entscheidet von Hand", () => {
  const { workflow } = DE.ablauf;
  assert.equal(workflow.fenster, "app");
  assert.deepEqual(workflow.knoten.map((knoten) => [knoten.id, knoten.art, knoten.icon, knoten.spalte, knoten.zeile]), [
    ["anfrage", "ausloeser", "formular", 0, 0], ["antwort", "mensch", "person-ok", 1, 0],
    ["zusage", undefined, "checkbox", 2, 0], ["einsatz", undefined, "personen", 3, 0],
    ["rechnung", undefined, "rechner", 4, 0],
  ]);
  assert.deepEqual(workflow.kanten.map((kante) => `${kante.von}>${kante.nach}`),
    ["anfrage>antwort", "antwort>zusage", "zusage>einsatz", "einsatz>rechnung"]);
  for (const knoten of workflow.knoten) {
    assert.ok(knoten.label.length <= 18 && (knoten.sub ?? "").length <= 18, knoten.id);
  }
});

test("Wortlaut-Regeln der deutschen Seite", () => {
  for (const text of [DE.ablauf.workflow.beschreibung, DE.ablauf.unterschrift, DE.fragen.liste[0].a]) {
    assert.ok(text.includes("in der Regel innerhalb von 24 Stunden"), text);
  }
  assert.doesNotMatch(alles, /jederzeit|immer erreichbar|Urkunde|Zeugnis|Ausweis|Schweigepflicht|zur Verschwiegenheit verpflichtet/i);
  assert.match(DE.sprachen.text, /Hocharabisch, Levantinisch \(Syrien, Libanon, Palästina, Jordanien\), Ägyptisch, Irakisch und Golf-Arabisch/);
  assert.match(DE.kopf.einleitung, /Rhein-Main/);
});

// Listen werden an ihrem ersten Element gemessen, wie in scripts/check-i18n.js.
const form = (wert, pfad = "") =>
  Array.isArray(wert)
    ? [`${pfad}:liste`, ...(wert.length ? form(wert[0], `${pfad}[]`) : [])]
    : wert && typeof wert === "object"
      ? Object.keys(wert).sort().flatMap((schluessel) => form(wert[schluessel], pfad ? `${pfad}.${schluessel}` : schluessel))
      : [`${pfad}:${typeof wert}`];

test("Deutsch und Arabisch haben dieselbe Schlüsselform", () => {
  assert.deepEqual(form(AR), form(DE));
  assert.deepEqual(AR.preise.tabelle.rows.map((row) => row.schluessel), DE.preise.tabelle.rows.map((row) => row.schluessel));
  assert.deepEqual(
    AR.ablauf.workflow.knoten.map((knoten) => [knoten.id, knoten.art, knoten.icon]),
    DE.ablauf.workflow.knoten.map((knoten) => [knoten.id, knoten.art, knoten.icon])
  );
  assert.equal(AR.fragen.liste.length, 7);
});

test("Englisch ist die erklärte Teilmenge kopf, preise, ablauf, anfrage", () => {
  assert.deepEqual(Object.keys(EN), ["kopf", "preise", "ablauf", "anfrage"]);
  for (const abschnitt of Object.keys(EN)) assert.deepEqual(form(EN[abschnitt]), form(DE[abschnitt]), abschnitt);
});

test("Arabisch: festgelegte Wörter, Beträge mit dem Wort, jeder Ort übersetzt", () => {
  const text = texte(AR).join("\n");
  assert.ok(text.includes("ترجمات للفهم وللمراسلات والأعمال، وليست للتقديم إلى الدوائر الحكومية أو المحاكم."));
  assert.ok(text.includes("كاتب العدل"));
  assert.ok(text.includes(preisText(DOLMETSCH_PREIS.vorOrtStunde, "ar")));
  assert.ok(text.includes(preisText(DOLMETSCH_PREIS.normzeile, "ar")));
  assert.doesNotMatch(text, /[€٠-٩]/);
  assert.ok(AR.kopf.einleitung.includes("Muhamed Nur Beck"));
  // Das Suchwort aus dem Titel steht auch im Text.
  assert.ok(AR.kopf.einleitung.includes("مترجم فوري"));
  for (const stelle of [AR.ablauf.workflow.beschreibung, AR.ablauf.unterschrift, AR.fragen.liste[0].a]) {
    assert.ok(stelle.includes("عادةً خلال 24 ساعة"), stelle);
  }
  for (const ort of ANFAHRT_STUFEN.flatMap((stufe) => stufe.orte)) assert.ok(ORTE_AR[ort], ort);
});

test("Englisch: Zwecksatz, Zeichen vor dem Betrag, 24-Stunden-Wendung", () => {
  const text = texte(EN).join("\n");
  assert.ok(text.includes("Translations for understanding and business use, not for submission to authorities or courts."));
  assert.ok(text.includes("€70") && text.includes("€1.40") && text.includes("€240"));
  assert.doesNotMatch(text, /\d\s€|يورو/);
  assert.ok(EN.ablauf.workflow.beschreibung.includes("usually within 24 hours"));
  for (const ort of Object.keys(ORTE_EN)) {
    assert.ok(ANFAHRT_STUFEN.some((stufe) => stufe.orte.includes(ort)), ort);
  }
});

test("Preise: Verweis auf den Kosten-Ratgeber in allen drei Fassungen", () => {
  const ziel = ROUTES.find((route) => route.id === "dolmetscher.kosten").path;
  assert.deepEqual([DE, EN, AR].map((inhalt) => inhalt.preise.ratgeber?.href), [ziel, ziel, ziel]);
  assert.equal(DE.preise.ratgeber.text, "Was kostet ein Dolmetscher? Preise im Vergleich");
  assert.equal(EN.preise.ratgeber.text, "What an interpreter costs: price comparison (in German)");
  assert.equal(AR.preise.ratgeber.text, "كم يكلّف المترجم الفوري؟ مقارنة الأسعار (الصفحة بالألمانية)");
});
