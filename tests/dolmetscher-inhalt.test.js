// Tests für den Inhalt der Dolmetscher-Seite (src/content/dolmetscher.*.js).
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { INHALT as DE } from "../src/content/dolmetscher.de.js";

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
    ["vorOrt", "Dolmetschen vor Ort", "70 € je Stunde"],
    ["anfahrt", "Anfahrt", "in Frankfurt und der nahen Umgebung inklusive, sonst 15 €, 25 € oder 35 €"],
    ["videoTelefon", "Video und Telefon", "35 € je angefangene 30 Minuten"],
    ["notarStandesamt", "Notar und Standesamt", "240 € Festpreis"],
    ["uebersetzung", "Schriftliche Übersetzung", "1,40 € je Normzeile"],
    ["messe", "Messe und Verhandlung", "320 € Halbtag, 590 € Tag"],
  ]);
  assert.equal(zeile(tabelle, "Dolmetschen vor Ort").cells[1],
    "Mindestdauer 1 Stunde, danach 35 € je angefangene 30 Minuten. Die Zeit läuft vom vereinbarten Beginn bis zum Ende des Termins, Wartezeit eingeschlossen.");
  assert.equal(zeile(tabelle, "Anfahrt").cells[1],
    "Feste Beträge je Entfernungsstufe, siehe unten. Fahrzeit berechne ich nicht.");
  assert.equal(zeile(tabelle, "Notar und Standesamt").cells[1],
    "Bis 2 Stunden, Durchsicht des Entwurfs vor dem Termin und Anfahrt in der ersten Stufe enthalten; weiter entfernt kommt der Betrag der Stufe hinzu. Darüber hinaus 35 € je angefangene 30 Minuten. Gebühren, die Standesamt oder Notariat selbst erheben, zahlen Sie dort.");
  assert.equal(zeile(tabelle, "Schriftliche Übersetzung").cells[1],
    "Je angefangene Zeile mit 55 Anschlägen einschließlich Leerzeichen, gezählt im deutschen oder englischen Text; Mindestauftrag 30 €; den Gesamtpreis nenne ich vor Beginn. Zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.");
  assert.equal(zeile(tabelle, "Messe und Verhandlung").cells[1],
    "Halbtag bis 4 Stunden, Tag bis 8 Stunden; darüber hinaus 35 € je angefangene 30 Minuten.");
});

test("Anfahrt: fünf Stufen mit Betrag und Orten, Beispiel Hanau", () => {
  const { tabelle, beispiel, text } = DE.preise.anfahrt;
  assert.deepEqual(tabelle.rows.map((row) => [row.label, row.cells[0]]), [
    ["bis etwa 15 km", "inklusive"], ["über 15 bis 25 km", "15 €"], ["über 25 bis 35 km", "25 €"],
    ["über 35 bis 50 km", "35 €"], ["weiter", "nach Absprache"],
  ]);
  assert.equal(tabelle.rows[0].cells[1],
    "Frankfurt (ganzes Stadtgebiet), Offenbach, Neu-Isenburg, Bad Vilbel, Eschborn, Flughafen");
  assert.equal(tabelle.rows[4].cells[1], "zum Beispiel Gießen");
  assert.ok(beispiel.includes("70 € + 15 € = 85 €"));
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
    "Absagen bis 24 Stunden vor dem Termin kosten nichts. Bei späterer Absage oder wenn Sie nicht erscheinen, berechne ich 70 €, bei Video- und Telefonterminen 35 €. Sie können nachweisen, dass mir kein oder ein wesentlich geringerer Schaden entstanden ist. Ein gesetzliches Widerrufsrecht bleibt unberührt.");
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
