// Seitenkörper der deutschen Dolmetscher-Seite. Kopfzeile, Fuß und Formular
// stehen im Wörterbuch src/i18n/dict/dolmetscher.js.
//
// Jeder Betrag kommt aus DOLMETSCH_PREIS oder ANFAHRT_STUFEN in site.js, die
// Ortslisten ebenso; hier steht kein Betrag als Zahl.
import {
  ANFAHRT_START,
  ANFAHRT_STUFEN,
  DOLMETSCH_PREIS,
  PERSON,
  preisText,
} from "./site.js";

const p = (betrag) => preisText(betrag, "de");
const halbe = p(DOLMETSCH_PREIS.halbeStunde);
const zweck =
  "Übersetzungen zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.";

const stufenBetraege = ANFAHRT_STUFEN.filter((stufe) => stufe.betrag > 0).map((stufe) => p(stufe.betrag));
const hanau = ANFAHRT_STUFEN.find((stufe) => stufe.orte.includes("Hanau"));

const stufenLabel = (stufe) => {
  if (stufe.bisKm === null) return "weiter";
  if (stufe.vonKm === 0) return `bis etwa ${stufe.bisKm}\u00A0km`;
  return `über ${stufe.vonKm} bis ${stufe.bisKm}\u00A0km`;
};

const stufenBetrag = (stufe) => {
  if (stufe.betrag === null) return "nach Absprache";
  if (stufe.betrag === 0) return "inklusive";
  return p(stufe.betrag);
};

const stufenOrte = (stufe) =>
  stufe.bisKm === null ? `zum Beispiel ${stufe.orte.join(", ")}` : stufe.orte.join(", ");

export const INHALT = {
  kopf: {
    h1: "Dolmetscher und Übersetzer für Arabisch und Deutsch in Frankfurt",
    einleitung:
      "Ich dolmetsche und übersetze zwischen Arabisch, Deutsch und Englisch, bei Terminen und für Schriftstücke. Vor Ort in Frankfurt und im Rhein-Main-Gebiet, weiter entfernte Termine nach Absprache, per Video und Telefon bundesweit.",
    portraitAlt: `${PERSON.name}, Dolmetscher und Übersetzer in Frankfurt`,
    belege:
      "Erste Einsätze 2017, seit 2022 regelmäßig. Über 150 Einsätze bei Polizei, Gerichten, Kliniken und Behörden. Deutsch und Arabisch sind meine Muttersprachen, Englisch spreche ich verhandlungssicher.",
    belegeVerweis: "Stationen im Lebenslauf",
  },

  einsatzarten: {
    titel: "Wofür Sie mich buchen können",
    ersteSpalte: "Einsatz",
    tabelle: {
      columns: ["So läuft es ab"],
      rows: [
        { label: "Arzt und Klinik", cells: ["Ich dolmetsche das Gespräch mit Ärztin, Arzt oder Pflege, vor Ort oder per Video."] },
        {
          label: "Behörde, Jobcenter, Ausländerbehörde",
          cells: ["Ich dolmetsche das Gespräch und übersetze Schreiben zum Verständnis; Rechtsberatung leiste ich nicht."],
        },
        {
          label: "Notar und Standesamt",
          cells: ["Nach Absprache mit dem Notariat oder dem Standesamt. Bitte nennen Sie mich dort vorab."],
        },
        { label: "Kanzlei", cells: ["Mandantengespräche vor Ort, per Video oder Telefon."] },
        {
          label: "Unternehmen und Messe",
          cells: ["Gespräche, Verhandlungen und Messetage, auch mit IT- und Wirtschaftsthemen."],
        },
        { label: "Video und Telefon", cells: ["Kurzfristig möglich, auch abends und am Wochenende."] },
        { label: "Schriftliche Übersetzung", cells: [zweck] },
      ],
    },
  },

  preise: {
    titel: "Preise",
    ersteSpalte: "Leistung",
    tabelle: {
      columns: ["Preis", "Bedingung"],
      rows: [
        {
          schluessel: "vorOrt",
          label: "Dolmetschen vor Ort",
          cells: [
            `${p(DOLMETSCH_PREIS.vorOrtStunde)} je Stunde`,
            `Mindestdauer 1 Stunde, danach ${halbe} je angefangene 30 Minuten. Die Zeit läuft vom vereinbarten Beginn bis zum Ende des Termins, Wartezeit eingeschlossen.`,
          ],
        },
        {
          schluessel: "anfahrt",
          label: "Anfahrt",
          cells: [
            `in Frankfurt und der nahen Umgebung inklusive, sonst ${stufenBetraege.slice(0, -1).join(", ")} oder ${stufenBetraege.at(-1)}`,
            "Feste Beträge je Entfernungsstufe, siehe unten. Fahrzeit berechne ich nicht.",
          ],
        },
        {
          schluessel: "videoTelefon",
          label: "Video und Telefon",
          cells: [`${halbe} je angefangene 30 Minuten`, ""],
        },
        {
          schluessel: "notarStandesamt",
          label: "Notar und Standesamt",
          cells: [
            `${p(DOLMETSCH_PREIS.notarStandesamt)} Festpreis`,
            `Bis 2 Stunden, Durchsicht des Entwurfs vor dem Termin und Anfahrt in der ersten Stufe enthalten; weiter entfernt kommt der Betrag der Stufe hinzu. Darüber hinaus ${halbe} je angefangene 30 Minuten. Gebühren, die Standesamt oder Notariat selbst erheben, zahlen Sie dort.`,
          ],
        },
        {
          schluessel: "uebersetzung",
          label: "Schriftliche Übersetzung",
          cells: [
            `${p(DOLMETSCH_PREIS.normzeile)} je Normzeile`,
            `Je angefangene Zeile mit 55 Anschlägen einschließlich Leerzeichen, gezählt im deutschen oder englischen Text; Mindestauftrag ${p(DOLMETSCH_PREIS.mindestauftrag)}; den Gesamtpreis nenne ich vor Beginn. Zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.`,
          ],
        },
        {
          schluessel: "messe",
          label: "Messe und Verhandlung",
          cells: [
            `${p(DOLMETSCH_PREIS.messeHalbtag)} Halbtag, ${p(DOLMETSCH_PREIS.messeTag)} Tag`,
            `Halbtag bis 4 Stunden, Tag bis 8 Stunden; darüber hinaus ${halbe} je angefangene 30 Minuten.`,
          ],
        },
      ],
    },
    anfahrt: {
      titel: "Anfahrt",
      text: `Die genannten Orte sind fest zugeordnet. Andere Orte ordne ich nach der Fahrstrecke ab der ${ANFAHRT_START} ein und nenne den Betrag in meiner Antwort mit Termin und Preis; dabei bleibt es, auch wenn die Fahrt länger dauert.`,
      ersteSpalte: "Entfernung",
      tabelle: {
        columns: ["Betrag", "Orte"],
        rows: ANFAHRT_STUFEN.map((stufe) => ({
          label: stufenLabel(stufe),
          cells: [stufenBetrag(stufe), stufenOrte(stufe)],
        })),
      },
      beispiel: `Beispiel: Eine Stunde in Hanau kostet ${p(DOLMETSCH_PREIS.vorOrtStunde)} + ${p(hanau.betrag)} = ${p(DOLMETSCH_PREIS.vorOrtStunde + hanau.betrag)}.`,
    },
    ratgeber: {
      text: "Was kostet ein Dolmetscher? Preise im Vergleich",
      href: "/dolmetscher-arabisch-frankfurt/kosten",
    },
  },

  ablauf: {
    titel: "So läuft eine Anfrage ab",
    workflow: {
      titel: "Ablauf einer Anfrage",
      fenster: "app",
      beschreibung:
        "Ablauf einer Anfrage: Sie stellen eine Anfrage, ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage, Sie sagen zu, dann folgen der Einsatz und die Rechnung.",
      knoten: [
        { id: "anfrage", art: "ausloeser", icon: "formular", label: "Anfrage", sub: "Formular, WhatsApp", spalte: 0, zeile: 0 },
        { id: "antwort", art: "mensch", icon: "person-ok", label: "Antwort", sub: "Termin oder Absage", spalte: 1, zeile: 0 },
        { id: "zusage", icon: "checkbox", label: "Ihre Zusage", sub: "dann verbindlich", spalte: 2, zeile: 0 },
        { id: "einsatz", icon: "personen", label: "Einsatz", sub: "vor Ort oder Video", spalte: 3, zeile: 0 },
        { id: "rechnung", icon: "rechner", label: "Rechnung", sub: "nach dem Einsatz", spalte: 4, zeile: 0 },
      ],
      kanten: [
        { von: "anfrage", nach: "antwort" },
        { von: "antwort", nach: "zusage" },
        { von: "zusage", nach: "einsatz" },
        { von: "einsatz", nach: "rechnung" },
      ],
    },
    unterschrift:
      "Ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage. Verbindlich wird der Termin erst mit Ihrer Zusage.",
  },

  sprachen: {
    titel: "Sprachen und Dialekte",
    text: "Ich spreche Hocharabisch, Levantinisch (Syrien, Libanon, Palästina, Jordanien), Ägyptisch, Irakisch und Golf-Arabisch, dazu Deutsch und Englisch.",
    richtungen: "Sprachrichtungen: Deutsch und Arabisch, Englisch und Arabisch",
  },

  unternehmen: {
    titel: "Für Unternehmen",
    text: "Bei Messen und Verhandlungen dolmetsche ich Gespräch für Gespräch. Fachtexte aus IT und Wirtschaft übersetze ich mit dem Hintergrund eines Masterstudiums in Wirtschaftsinformatik (M.Sc.).",
    verweis: {
      text: "Ihre Website auf Arabisch, mit Leserichtung von rechts nach links",
      href: "/leistungen/webentwicklung",
    },
  },

  vertraulichkeit: {
    titel: "Vertraulichkeit",
    text: "Was ich bei einem Einsatz erfahre, behandle ich vertraulich. Auf Wunsch unterschreibe ich eine Verschwiegenheitsvereinbarung.",
  },

  anfrage: {
    titel: "Anfrage stellen",
    einleitung:
      "Schreiben Sie mir kurz, worum es geht. Ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage.",
  },

  fragen: {
    titel: "Häufige Fragen",
    liste: [
      {
        q: "Wie schnell bekomme ich Antwort?",
        a: "Ich antworte in der Regel innerhalb von 24 Stunden, mit Termin und Preis oder mit einer Absage. Wenn es eilt, schreiben Sie mir über WhatsApp oder rufen Sie an.",
      },
      {
        q: "Was kostet es?",
        a: "Die Preise stehen oben in der Tabelle, alle als Endpreise. Sie zahlen auf Rechnung nach dem Einsatz. Bei kurzen Terminen in größerer Entfernung schlage ich oft Video oder Telefon vor.",
      },
      {
        q: "Auch abends und am Wochenende?",
        a: "Ja, nach Absprache. Abends und am Wochenende gilt derselbe Preis, ohne Zuschlag.",
      },
      {
        q: "Welche Dialekte?",
        a: "Hocharabisch, Levantinisch (Syrien, Libanon, Palästina, Jordanien), Ägyptisch, Irakisch und Golf-Arabisch.",
      },
      {
        q: "Wie läuft ein Termin per Video?",
        a: "Ich nehme an dem Termin teil, zu dem Sie oder die Praxis einladen.",
      },
      {
        q: "Wie schicke ich Unterlagen für eine Übersetzung?",
        a: "Per E-Mail, nach meiner Antwort auf Ihre Anfrage. In das Formular gehören keine Unterlagen.",
      },
      {
        q: "Was passiert, wenn ich absage?",
        a: `Absagen bis 24 Stunden vor dem Termin kosten nichts. Bei späterer Absage oder wenn Sie nicht erscheinen, berechne ich ${p(DOLMETSCH_PREIS.vorOrtStunde)}, bei Video- und Telefonterminen ${halbe}. Sie können nachweisen, dass mir kein oder ein wesentlich geringerer Schaden entstanden ist. Ein gesetzliches Widerrufsrecht bleibt unberührt.`,
      },
    ],
  },
};
