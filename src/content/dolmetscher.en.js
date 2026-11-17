// Seitenkörper der englischen Kurzfassung der Dolmetscher-Seite. Sie hat nur
// die Abschnitte kopf, preise, ablauf und anfrage; die Preistabelle nennt
// dabei die Einsatzarten mit, so dass beides in einer Darstellung steht.
// Kopfzeile, Fuß und Formular stehen im Wörterbuch src/i18n/dict/dolmetscher.js.
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

/* Englische Schreibweise der Orte aus ANFAHRT_STUFEN, nur wo sie vom
   Deutschen abweicht; jeder andere Ort steht, wie er heißt. */
export const ORTE = {
  "Frankfurt (ganzes Stadtgebiet)": "Frankfurt (entire city)",
  Flughafen: "Frankfurt Airport",
};

const p = (betrag) => preisText(betrag, "en");
const halbe = `${p(DOLMETSCH_PREIS.halbeStunde)} per 30 minutes or part thereof`;
const zweck = "Translations for understanding and business use, not for submission to authorities or courts.";

const stufenBetraege = ANFAHRT_STUFEN.filter((stufe) => stufe.betrag > 0).map((stufe) => p(stufe.betrag));
const hanau = ANFAHRT_STUFEN.find((stufe) => stufe.orte.includes("Hanau"));
const ort = (name) => ORTE[name] ?? name;

const stufenLabel = (stufe) => {
  if (stufe.bisKm === null) return "further";
  if (stufe.vonKm === 0) return `up to about ${stufe.bisKm}\u00A0km`;
  return `over ${stufe.vonKm} to ${stufe.bisKm}\u00A0km`;
};

const stufenBetrag = (stufe) => {
  if (stufe.betrag === null) return "by arrangement";
  if (stufe.betrag === 0) return "included";
  return p(stufe.betrag);
};

const stufenOrte = (stufe) => {
  const orte = stufe.orte.map(ort).join(", ");
  return stufe.bisKm === null ? `for example ${orte}` : orte;
};

export const INHALT = {
  kopf: {
    h1: "Arabic interpreter and translator in Frankfurt",
    einleitung:
      "I interpret and translate between Arabic, German and English, at appointments and for written texts. On site in Frankfurt and the Rhine-Main area, appointments further away by arrangement, and by video and phone anywhere in Germany.",
    portraitAlt: `${PERSON.name}, interpreter and translator in Frankfurt`,
    belege:
      "First assignments in 2017, regularly since 2022. More than 150 assignments at police stations, courts, hospitals and public offices. German and Arabic are my native languages, and my English is business fluent.",
    belegeVerweis: "Career history in my CV (German)",
  },

  preise: {
    titel: "Services and prices",
    ersteSpalte: "Service",
    tabelle: {
      columns: ["Price", "What it covers"],
      rows: [
        {
          schluessel: "vorOrt",
          label: "Interpreting on site",
          cells: [
            `${p(DOLMETSCH_PREIS.vorOrtStunde)} per hour`,
            `Doctors and hospitals, public offices and job centres, law firms, private appointments; I interpret and do not give legal advice. Minimum 1 hour, then ${halbe}. The time runs from the agreed start to the end of the appointment, waiting time included.`,
          ],
        },
        {
          schluessel: "anfahrt",
          label: "Travel",
          cells: [
            `included in Frankfurt and the nearby area, otherwise ${stufenBetraege.slice(0, -1).join(", ")} or ${stufenBetraege.at(-1)}`,
            "Fixed amounts per distance band, see below. I do not charge for travel time.",
          ],
        },
        {
          schluessel: "videoTelefon",
          label: "Video and phone",
          cells: [halbe, "The same appointments by video or phone, at short notice, also in the evening and at weekends."],
        },
        {
          schluessel: "notarStandesamt",
          label: "Notary and registry office",
          cells: [
            `${p(DOLMETSCH_PREIS.notarStandesamt)} fixed price`,
            `By arrangement with the notary or the registry office; please tell them in advance that I will interpret. Up to 2 hours, review of the draft before the appointment and travel in the first band included; further away, the amount for the band is added. Beyond that, ${halbe}. Fees charged by the registry office or the notary are paid there.`,
          ],
        },
        {
          schluessel: "uebersetzung",
          label: "Written translation",
          cells: [
            `${p(DOLMETSCH_PREIS.normzeile)} per standard line`,
            `A line is 55 characters including spaces, counted in the German or English text, and each line begun counts; minimum order ${p(DOLMETSCH_PREIS.mindestauftrag)}; I state the total price before I start. ${zweck}`,
          ],
        },
        {
          schluessel: "messe",
          label: "Trade fair and negotiation",
          cells: [
            `${p(DOLMETSCH_PREIS.messeHalbtag)} half day, ${p(DOLMETSCH_PREIS.messeTag)} full day`,
            `Meetings, negotiations and trade fair days, including IT and business topics. Half day up to 4 hours, full day up to 8 hours; beyond that, ${halbe}.`,
          ],
        },
      ],
    },
    anfahrt: {
      titel: "Travel",
      text: `The places listed are assigned to a band. I place any other location by the driving distance from the ${ANFAHRT_START} in the city centre and state the amount in my reply with the date and price; it stays that way even if the journey takes longer.`,
      ersteSpalte: "Distance",
      tabelle: {
        columns: ["Amount", "Places"],
        rows: ANFAHRT_STUFEN.map((stufe) => ({
          label: stufenLabel(stufe),
          cells: [stufenBetrag(stufe), stufenOrte(stufe)],
        })),
      },
      beispiel: `Example: one hour in Hanau costs ${p(DOLMETSCH_PREIS.vorOrtStunde)} + ${p(hanau.betrag)} = ${p(DOLMETSCH_PREIS.vorOrtStunde + hanau.betrag)}.`,
    },
    ratgeber: {
      text: "What an interpreter costs: price comparison (in German)",
      href: "/dolmetscher-arabisch-frankfurt/kosten",
    },
  },

  ablauf: {
    titel: "How a request works",
    workflow: {
      titel: "Steps of a request",
      fenster: "app",
      beschreibung:
        "Steps of a request: you send a request, I reply usually within 24 hours with a date and price or with a decline, you confirm, and then the assignment and the invoice follow.",
      knoten: [
        { id: "anfrage", art: "ausloeser", icon: "formular", label: "Request", sub: "form, WhatsApp", spalte: 0, zeile: 0 },
        { id: "antwort", art: "mensch", icon: "person-ok", label: "Reply", sub: "date or decline", spalte: 1, zeile: 0 },
        { id: "zusage", icon: "checkbox", label: "You confirm", sub: "then it is binding", spalte: 2, zeile: 0 },
        { id: "einsatz", icon: "personen", label: "Assignment", sub: "on site or video", spalte: 3, zeile: 0 },
        { id: "rechnung", icon: "rechner", label: "Invoice", sub: "afterwards", spalte: 4, zeile: 0 },
      ],
      kanten: [
        { von: "anfrage", nach: "antwort" },
        { von: "antwort", nach: "zusage" },
        { von: "zusage", nach: "einsatz" },
        { von: "einsatz", nach: "rechnung" },
      ],
    },
    unterschrift:
      "I reply usually within 24 hours with a date and price or with a decline. The appointment only becomes binding once you confirm it.",
  },

  anfrage: {
    titel: "Send a request",
    einleitung:
      "Tell me briefly what it is about. I reply usually within 24 hours with a date and price or with a decline.",
  },
};
