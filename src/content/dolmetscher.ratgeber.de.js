// Ratgeber im Dolmetscher-Bereich: „Was kostet ein Dolmetscher für Arabisch?“
//
// Dieselbe Form wie ein Eintrag in ratgeber.de.js, damit RatgeberPage ihn
// rendert und prerender-meta.js Artikel und häufige Fragen daraus schreibt.
// Eine eigene Liste, weil die IT-Übersicht /ratgeber jeden Eintrag von
// RATGEBER zeigt, und dieser Ratgeber gehört zur Dolmetscher-Seite.
//
// Hausregeln wie in ratgeber.de.js: Antwort im ersten Satz jedes Abschnitts,
// jede fremde Zahl mit Art der Quelle und Stand im selben Satz, keine
// Geviertstriche, echte Umlaute. Die Marktzahlen wurden am 17.11.2026 an den
// Quellen geprüft und stehen nach Art und Ort der Quelle da, nicht nach Namen.
// Eigene Beträge kommen aus DOLMETSCH_PREIS und ANFAHRT_STUFEN in site.js,
// eigene Sätze aus dem Wörterbuch und dem Inhalt der Dolmetscher-Seite.
//
// Die Wortprüfung in scripts/check-i18n.js liest diese Datei samt Kommentaren.

// With the .js extension: prerender-meta.js imports this file under bare node.
import { ANFAHRT_START, ANFAHRT_STUFEN, DOLMETSCH_PREIS, preisText } from "./site.js";
import { INHALT as DOLMETSCHER_SEITE } from "./dolmetscher.de.js";
import woerter from "../i18n/dict/dolmetscher.js";

const p = (betrag) => preisText(betrag, "de");
const stunde = p(DOLMETSCH_PREIS.vorOrtStunde);
const halbe = p(DOLMETSCH_PREIS.halbeStunde);
const notar = p(DOLMETSCH_PREIS.notarStandesamt);
const { zwecksatz } = woerter.de.formular;
const { endpreise } = woerter.de.preise;

const stufen = ANFAHRT_STUFEN.filter((stufe) => stufe.betrag > 0).map((stufe) => p(stufe.betrag));
const stufenText = `${stufen.slice(0, -1).join(", ")} oder ${stufen.at(-1)}`;

/* Die Absage-Regel im Wortlaut der Dolmetscher-Seite, damit beide Seiten
   dasselbe sagen. Fehlt die Frage dort, bricht der Build hier ab. */
const absageFrage = DOLMETSCHER_SEITE.fragen.liste.find((frage) => frage.q === "Was passiert, wenn ich absage?");
if (!absageFrage) throw new Error("dolmetscher.ratgeber.de.js: Absage-Frage der Dolmetscher-Seite fehlt");
const absage = absageFrage.a;

export const DOLMETSCH_RATGEBER = [
  {
    path: "/dolmetscher-arabisch-frankfurt/kosten",
    kicker: "Kosten",
    h1: "Was kostet ein Dolmetscher für Arabisch?",
    published: "2026-11-17",
    modified: "2026-11-17",
    autorPfad: "/lebenslauf",
    lede: `Ein Dolmetscher kostet oft etwa 70 bis 120 € je Stunde, so die Richtwerte eines Vermittlungsportals für Frankfurt (2026). Gerichte und Staatsanwaltschaften zahlen nach § 9 Abs. 5 JVEG 93 € je Stunde. Ich dolmetsche Arabisch und Deutsch vor Ort für ${stunde} je Stunde und per Video oder Telefon für ${halbe} je angefangene 30 Minuten, abends und am Wochenende ohne Zuschlag.`,
    table: {
      caption: "Was Dolmetschen kostet (Stand: November 2026; meine Preise sind Endpreise)",
      columns: ["Gerichte nach JVEG", "Markt laut Anbietern", "Mein Preis"],
      rows: [
        {
          label: "Eine Stunde vor Ort",
          cells: ["93 €", "oft etwa 70 bis 120 € (Richtwerte eines Vermittlungsportals, Frankfurt)", stunde],
        },
        {
          label: "Mindestdauer",
          cells: [
            "keine; die letzte angefangene Stunde zählt halb oder ganz",
            "oft 2 bis 3 Stunden (Vermittlungsportal, Frankfurt)",
            `1 Stunde, danach ${halbe} je angefangene 30 Minuten`,
          ],
        },
        {
          label: "Fahrzeit und Wartezeit",
          cells: [
            "zählen wie Arbeitszeit",
            "Fahrzeit zum Beispiel 60 € je Stunde zuzüglich Mehrwertsteuer (Einzelanbieter bei Berlin)",
            "Fahrzeit berechne ich nicht, Wartezeit ist in der Zeit enthalten",
          ],
        },
        {
          label: "Fahrtkosten",
          cells: [
            "0,42 € je Kilometer",
            "zum Beispiel 0,42 € je Kilometer zuzüglich Mehrwertsteuer (Einzelanbieter bei Berlin)",
            `in Frankfurt und der nahen Umgebung inklusive, sonst ${stufenText}`,
          ],
        },
        {
          label: "Abends und am Wochenende",
          cells: [
            "plus 20 % von 23 bis 6 Uhr und an Sonn- und Feiertagen",
            "plus 25 % nachts und samstags, 50 % sonntags, 100 % an Feiertagen (Empfehlung eines Dolmetschdienstes, Berlin)",
            "kein Zuschlag",
          ],
        },
        {
          label: "Absage",
          cells: [
            "bis 2 Stunden, wenn erst am Termintag oder an einem der zwei Tage davor abgesagt wird",
            "je nach Anbieter",
            `bis 24 Stunden vorher kostenlos, danach ${stunde}, bei Video und Telefon ${halbe}`,
          ],
        },
        {
          label: "Notartermin",
          cells: [
            "gilt nicht",
            "ab 390 €, meist 420 bis 530 € einschließlich Mehrwertsteuer, für Englisch (Agentur in Bayern, meist München)",
            `${notar} Festpreis bis 2 Stunden`,
          ],
        },
        {
          label: "30 Minuten per Video oder Telefon",
          cells: [
            "93 € je Stunde",
            "25 € (Empfehlung eines Dolmetschdienstes, Berlin); Hotline 1,99 € je Minute, also 59,70 €",
            halbe,
          ],
        },
        {
          label: "Halber und ganzer Tag",
          cells: [
            "93 € je Stunde",
            "350 bis 600 € und 600 bis 1.000 € oder mehr (Vermittlungsportal, Frankfurt)",
            `${p(DOLMETSCH_PREIS.messeHalbtag)} bis 4 Stunden, ${p(DOLMETSCH_PREIS.messeTag)} bis 8 Stunden (Messe und Verhandlung)`,
          ],
        },
        {
          label: "Übersetzung je Normzeile",
          cells: [
            "1,95 € bis 2,30 €",
            "1,20 bis 2,05 € zuzüglich Mehrwertsteuer (Übersetzungsbüro, Frankfurt)",
            p(DOLMETSCH_PREIS.normzeile),
          ],
        },
      ],
    },
    sections: [
      {
        h2: "Was kostet ein Dolmetscher pro Stunde?",
        body: [
          "Oft etwa 70 bis 120 €: So beziffert ein Vermittlungsportal für Frankfurt typische Preise für Begleit- und Verhandlungsdolmetschen (Richtwerte für 2026, abgerufen im November 2026). Gerichte und Staatsanwaltschaften zahlen Dolmetschern nach § 9 Abs. 5 JVEG 93 € je Stunde.",
          "Dieser Satz gilt nur, wenn Gerichte, Staatsanwaltschaften oder Behörden in bestimmten Verfahren einen Dolmetscher heranziehen, etwa im Bußgeldverfahren oder wenn die Polizei im Auftrag der Staatsanwaltschaft handelt (§ 1 JVEG). Für private Aufträge gibt es keinen festen Satz; jeder Dolmetscher legt seinen Preis selbst fest.",
          "Häufig gilt eine Mindestbuchung von 2 bis 3 Stunden; für einen halben Tag nennt dasselbe Portal 350 bis 600 €, für einen ganzen Tag 600 bis 1.000 € oder mehr. Für Einsätze in Gesundheit, Bildung und Sozialem empfiehlt ein vom Berliner Senat geförderter Dolmetschdienst den Einrichtungen 50 € für die erste Stunde vor Ort und danach 25 € je 30 Minuten (abgerufen im November 2026).",
          `Ich dolmetsche vor Ort für ${stunde} je Stunde, mit einer Mindestdauer von 1 Stunde; danach rechne ich ${halbe} je angefangene 30 Minuten ab. Für Messen und Verhandlungen kostet bei mir ein halber Tag (bis 4 Stunden) ${p(DOLMETSCH_PREIS.messeHalbtag)} und ein ganzer (bis 8 Stunden) ${p(DOLMETSCH_PREIS.messeTag)}.`,
          "Die Marktzahlen in diesem Ratgeber stammen von Anbietern, die Dolmetschen selbst verkaufen oder vermitteln. Sie taugen zur Einordnung eines Angebots, nicht als fester Marktpreis.",
        ],
        bildNach: 2,
        bild: {
          art: "balken",
          daten: {
            art: "liste",
            titel: "Eine Stunde Dolmetschen vor Ort",
            zeilen: [
              { label: "Richtwerte eines Vermittlungsportals für Frankfurt", von: 70, wert: 120, text: "70 bis 120 €", ton: "leise" },
              { label: "Gerichte und Staatsanwaltschaften nach § 9 JVEG", wert: 93, text: "93 €", ton: "cyan" },
              { label: "Mein Preis", wert: DOLMETSCH_PREIS.vorOrtStunde, text: stunde, ton: "akzent" },
            ],
            quelle: "Richtwerte für Frankfurt laut Vermittlungsportal (2026) und JVEG, beides abgerufen am 17.11.2026.",
          },
        },
      },
      {
        h2: "Was kostet ein Dolmetscher beim Notar?",
        body: [
          "Ab 390 €, meist 420 bis 530 € als Pauschale: So nennt es eine Agentur für Notartermine in Bayern, die vor allem in München arbeitet, für Termine auf Englisch und einschließlich Mehrwertsteuer; andere Sprachen kosten dort meist mehr (abgerufen im November 2026).",
          "Eine Dolmetscherin für Italienisch in Leipzig berechnet 400 € pauschal für Vorbereitung, Anreise und die ganze Zeit beim Notar (abgerufen im November 2026). Eine vollständige schriftliche Übersetzung des Vertrags ist bei beiden Anbietern nicht enthalten.",
          `Mein Festpreis beim Notar beträgt ${notar} für bis zu 2 Stunden. Enthalten sind die Durchsicht des Entwurfs vor dem Termin und die Anfahrt in Frankfurt und der nahen Umgebung; weiter entfernt kommt der Betrag der Entfernungsstufe hinzu. Dauert der Termin länger, berechne ich ${halbe} je angefangene 30 Minuten. Die Gebühren des Notariats zahlen Sie dort.`,
        ],
        bild: {
          art: "balken",
          daten: {
            art: "liste",
            titel: "Ein Notartermin als Pauschale",
            zeilen: [
              { label: "Agentur in Bayern, Englisch, meist", von: 420, wert: 530, text: "420 bis 530 €", ton: "leise" },
              { label: "Dolmetscherin in Leipzig, Italienisch", wert: 400, text: "400 €", ton: "leise" },
              { label: "Mein Festpreis, Arabisch, bis 2 Stunden", wert: DOLMETSCH_PREIS.notarStandesamt, text: notar, ton: "akzent" },
            ],
            quelle: "Anbieterangaben, abgerufen am 17.11.2026; Agentur einschließlich Mehrwertsteuer, Leipzig ohne Angabe dazu. Mein Preis ist ein Endpreis.",
          },
        },
      },
      {
        h2: "Was kostet Dolmetschen per Video oder Telefon?",
        body: [
          "Ab 25 € für 30 Minuten: Ein vom Berliner Senat geförderter Dolmetschdienst für Gesundheit, Bildung und Soziales empfiehlt 25 € bis 30 Minuten und danach 1 € je Minute (abgerufen im November 2026). Eine Dolmetscher-Hotline berechnet 1,99 € je Minute einschließlich Mehrwertsteuer, ohne Vertrag und über die Telefonrechnung; aus dem Mobilfunk kann der Preis abweichen. 30 Minuten kosten dort also 59,70 €.",
          `Ich dolmetsche per Video oder Telefon für ${halbe} je angefangene 30 Minuten. Bei Video trete ich dem Termin bei, zu dem Sie mich einladen. Kurzfristig ist das oft möglich, auch abends und am Wochenende.`,
        ],
      },
      {
        h2: "Welche Kosten kommen zum Stundensatz dazu?",
        body: [
          "Vor allem Fahrzeit, Kilometer, Wartezeit und Zuschläge. Bei Gerichten zählen Reise- und Wartezeit nach § 8 Abs. 2 JVEG wie Arbeitszeit, dazu kommen 0,42 € je gefahrenen Kilometer (§ 5 Abs. 2 JVEG). Ein Einzelanbieter für Chinesisch bei Berlin berechnet Privatkunden die Fahrzeit mit 60 € je Stunde und 0,42 € je Kilometer für Hin- und Rückweg, jeweils zuzüglich Mehrwertsteuer (abgerufen im November 2026).",
          "Zwischen 23 und 6 Uhr und an Sonn- und Feiertagen erhöht sich der gesetzliche Satz um 20 %, wenn die Stelle die Zeit für nötig erklärt (§ 9 Abs. 6 JVEG). Der Berliner Dolmetschdienst empfiehlt nachts und samstags 25 %, sonntags 50 % und an Feiertagen 100 % Zuschlag. Sagt ein Gericht erst am Termintag oder an einem der zwei Tage davor ab, zahlt es bis zu 2 Stunden als Ausfall (§ 9 Abs. 5 JVEG).",
          `Bei mir ist die Anfahrt in Frankfurt und der nahen Umgebung inklusive. Weiter entfernt berechne ich einen festen Betrag je Entfernungsstufe ab der ${ANFAHRT_START}, ${stufenText}, und keine Fahrzeit. Die Zeit läuft vom vereinbarten Beginn bis zum Ende des Termins, Wartezeit eingeschlossen. Abends und am Wochenende gilt derselbe Preis, ohne Zuschlag.`,
          absage,
        ],
      },
      {
        h2: "Was kostet eine schriftliche Übersetzung?",
        body: [
          "Zwischen 1,20 und 2,05 € je Normzeile, so die Preisliste eines Frankfurter Übersetzungsbüros: 1,20 bis 1,55 € für allgemeine Texte und 1,50 bis 2,05 € für Fachtexte, jeweils zuzüglich Mehrwertsteuer, mit einem Mindestauftrag von 30 € und 50 % Zuschlag für Eilaufträge (abgerufen im November 2026). Ein Übersetzer in Berlin nennt für Arabisch 1,85 € je Normzeile.",
          "Gerichte zahlen nach § 11 JVEG 1,95 € je angefangene 55 Anschläge, bei schwierigen Texten oder wenn der Text nicht als bearbeitbare Datei vorliegt bis 2,30 €, mindestens 20 € je Auftrag.",
          `Ich übersetze für ${p(DOLMETSCH_PREIS.normzeile)} je Normzeile, gezählt im deutschen oder englischen Text, mit einem Mindestauftrag von ${p(DOLMETSCH_PREIS.mindestauftrag)}; den Gesamtpreis nenne ich vor Beginn. ${zwecksatz}`,
        ],
      },
      {
        h2: "Wer bezahlt den Dolmetscher?",
        body: [
          "Wer ihn beauftragt. Zieht ein Gericht, eine Staatsanwaltschaft oder eine Behörde im Bußgeldverfahren einen Dolmetscher heran, bezahlt die Stelle ihn nach dem JVEG (§ 1 JVEG); das gilt auch, wenn die Polizei im Auftrag der Staatsanwaltschaft handelt.",
          "Andere Behörden regeln selbst, ob und welche Dolmetscher sie bezahlen. Fragen Sie deshalb vor dem Termin bei der Stelle nach, ob sie die Kosten übernimmt, bevor Sie jemanden beauftragen.",
          "Private Termine, etwa beim Notar, in einer Kanzlei, bei einem Kauf oder in einem Unternehmen, bezahlt, wer den Dolmetscher beauftragt. Ich stelle die Rechnung nach dem Einsatz.",
        ],
      },
    ],
    faq: [
      {
        q: "Was kostet ein Dolmetscher für Arabisch pro Stunde?",
        a: `Oft etwa 70 bis 120 € je Stunde, so die Richtwerte eines Vermittlungsportals für Frankfurt (2026); Gerichte zahlen nach § 9 Abs. 5 JVEG 93 €. Ich dolmetsche Arabisch und Deutsch vor Ort für ${stunde} je Stunde.`,
      },
      {
        q: "Gibt es abends oder am Wochenende einen Zuschlag?",
        a: "Bei mir nicht: Abends und am Wochenende gilt derselbe Preis. Nach dem JVEG erhöht sich der Satz zwischen 23 und 6 Uhr und an Sonn- und Feiertagen um 20 %; ein Berliner Dolmetschdienst empfiehlt 25 bis 100 % Zuschlag.",
      },
      {
        q: "Was kostet es, wenn ich den Termin absage?",
        a: absage,
      },
      {
        q: "Muss ich die Anfahrt extra bezahlen?",
        a: `In Frankfurt und der nahen Umgebung nicht. Weiter entfernt berechne ich einen festen Betrag je Entfernungsstufe, ${stufenText}; Fahrzeit berechne ich nicht.`,
      },
      {
        q: "Kommt Umsatzsteuer dazu?",
        a: `Nein. ${endpreise}`,
      },
    ],
    related: [
      {
        path: "/dolmetscher-arabisch-frankfurt",
        label: "Dolmetscher für Arabisch und Deutsch in Frankfurt: Leistungen, Preise, Anfrage",
      },
      { path: "/lebenslauf", label: "Lebenslauf von Muhamed Nur Beck" },
    ],
    cta: {
      headline: "Sie brauchen einen Dolmetscher für Arabisch?",
      intro:
        "Schreiben Sie mir kurz, worum es geht. Ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage.",
    },
  },
];

export function getDolmetschRatgeber(path) {
  const item = DOLMETSCH_RATGEBER.find((entry) => entry.path === path);
  if (!item) {
    throw new Error(`Kein Dolmetscher-Ratgeber für "${path}"`);
  }
  return item;
}
