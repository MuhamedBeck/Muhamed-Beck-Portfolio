/**
 * Reine Funktionen des Anfrageformulars der Dolmetscher-Seite: was in die
 * Mail an den Inhaber geht, was ins Archiv, und in welcher Reihenfolge
 * beides gesendet wird. Ohne React, ohne EmailJS, ohne import.meta.env, damit
 * die Tests sie unter bloßem Node laden (tests/dolmetscher-anfrage.test.js).
 *
 * Die EmailJS-Vorlage im Konto kennt nur feste Variablen; alle Angaben der
 * Anfrage stehen deshalb als beschriftete Zeilen in `message` (und gleich in
 * `beschreibung`). Die erste Zeile erscheint in der Vorschau des Postfachs.
 */
import { SPAMVERDACHT_HINWEIS, oderNichtAngegeben } from "./anfrage.js";

/* Feste Werte der Auswahlfelder mit ihrer deutschen Beschriftung. In Mail und
   Archiv steht immer diese, gleich in welcher Sprache gefragt wurde; dieselben
   Werte stehen als `optionen` im Wörterbuch src/i18n/dict/dolmetscher.js. */
export const ARTEN = {
  "vor-ort": "Termin vor Ort",
  "video-telefon": "Video oder Telefon",
  uebersetzung: "Schriftliche Übersetzung",
};

export const SPRACHEN = {
  "de-ar": "Deutsch und Arabisch",
  "en-ar": "Englisch und Arabisch",
};

export const ANLAESSE = {
  behoerde: "Behörde",
  "notar-standesamt": "Notar oder Standesamt",
  kanzlei: "Kanzlei",
  "unternehmen-messe": "Unternehmen oder Messe",
  privat: "Privater Termin",
  sonstiges: "Sonstiges",
};

export const HERKUENFTE = {
  google: "Google",
  kleinanzeigen: "Kleinanzeigen",
  empfehlung: "Empfehlung",
  "whatsapp-social": "WhatsApp-Gruppe oder soziale Medien",
  verzeichnis: "Verzeichnis",
  sonstiges: "Sonstiges",
};

export const SEITENSPRACHEN = { de: "Deutsch", en: "Englisch", ar: "Arabisch" };

export const LEERE_FELDER = {
  art: "",
  sprachen: "",
  anlass: "",
  wunschdatum: "",
  wunschzeit: "",
  treffpunkt: "",
  name: "",
  email: "",
  telefon: "",
  herkunft: "",
  nachricht: "",
};

/* Längengrenzen der freien Felder, gleich denen des Workers (GRENZEN in
   worker/anfrage.js); ein Test hält beide zusammen. */
export const FELD_GRENZEN = {
  name: 200,
  email: 320,
  telefon: 40,
  wunschdatum: 60,
  wunschzeit: 60,
  treffpunkt: 300,
  nachricht: 10000,
};

/** Hat die Art einen Termin (Datum und Uhrzeit)? */
export const zeigtTermin = (art) => art === "vor-ort" || art === "video-telefon";

/** Hat die Art einen Ort? */
export const zeigtTreffpunkt = (art) => art === "vor-ort";

const ISO_DATUM = /^(\d{4})-(\d{2})-(\d{2})$/;
const UHRZEIT = /^\d{1,2}:\d{2}$/;

/**
 * Wunschtermin als lesbarer Text. Ein Datum JJJJ-MM-TT wird durch Umstellen
 * der Zeichenkette zu TT.MM.JJJJ (nie über Date, das würde westlich von
 * Greenwich den Vortag zeigen); jede andere Eingabe bleibt, wie sie ist.
 *
 * @param {string} [datum]
 * @param {string} [zeit]
 * @returns {string}
 */
export function wunschterminText(datum, zeit) {
  const d = String(datum ?? "").trim();
  const z = String(zeit ?? "").trim();
  const iso = ISO_DATUM.exec(d);
  const teile = [];
  if (d) teile.push(iso ? `${iso[3]}.${iso[2]}.${iso[1]}` : d);
  if (z) teile.push(UHRZEIT.test(z) ? `${z} Uhr` : z);
  return teile.join(", ");
}

/* Alle Felder getrimmt; was die gewählte Art nicht zeigt, gilt als leer. */
const bereinigt = (felder) => {
  const f = Object.fromEntries(
    Object.keys(LEERE_FELDER).map((schluessel) => [schluessel, String(felder?.[schluessel] ?? "").trim()])
  );
  if (!zeigtTermin(f.art)) {
    f.wunschdatum = "";
    f.wunschzeit = "";
  }
  if (!zeigtTreffpunkt(f.art)) f.treffpunkt = "";
  return f;
};

const beschriftung = (liste, wert) => (wert ? (liste[wert] ?? wert) : "");

const ersteZeile = (f) => {
  const art = beschriftung(ARTEN, f.art);
  if (!zeigtTermin(f.art)) return `Dolmetsch-Anfrage: ${art}`;
  const termin = wunschterminText(f.wunschdatum, f.wunschzeit);
  return `Dolmetsch-Anfrage: ${art}, ${termin || "ohne Wunschtermin"}`;
};

/**
 * Variablen für die EmailJS-Vorlage.
 *
 * @param {object} felder Werte des Formulars (Schlüssel wie LEERE_FELDER)
 * @param {{ locale: string, pfad: string, verdacht: boolean }} kontext
 */
export function mailVariablen(felder, { locale, pfad, verdacht }) {
  const f = bereinigt(felder);
  const kopf = ersteZeile(f);
  const seitensprache = SEITENSPRACHEN[locale] ?? SEITENSPRACHEN.de;
  const zeilen = [kopf];
  if (verdacht) zeilen.push(SPAMVERDACHT_HINWEIS);
  zeilen.push(
    `Sprache der Seite: ${seitensprache}`,
    `Art: ${oderNichtAngegeben(beschriftung(ARTEN, f.art))}`,
    `Sprachen: ${oderNichtAngegeben(beschriftung(SPRACHEN, f.sprachen))}`,
    `Anlass: ${oderNichtAngegeben(beschriftung(ANLAESSE, f.anlass))}`
  );
  if (zeigtTermin(f.art)) {
    zeilen.push(`Wunschtermin: ${oderNichtAngegeben(wunschterminText(f.wunschdatum, f.wunschzeit))}`);
  }
  if (zeigtTreffpunkt(f.art)) zeilen.push(`Ort: ${oderNichtAngegeben(f.treffpunkt)}`);
  zeilen.push(
    `Telefon: ${oderNichtAngegeben(f.telefon)}`,
    `Gefunden über: ${oderNichtAngegeben(beschriftung(HERKUENFTE, f.herkunft))}`,
    "",
    "Worum geht es:",
    f.nachricht
  );
  const message = zeilen.join("\n");
  const formular = `Dolmetscher-Anfrage (${seitensprache.toLowerCase()}), muhamedbeck.com${pfad}`;

  return {
    name: f.name,
    email: f.email,
    message,
    beschreibung: message,
    leistung: kopf.replace(/^Dolmetsch-Anfrage/, "Dolmetschen"),
    unternehmen: oderNichtAngegeben(""),
    herkunft: oderNichtAngegeben(beschriftung(HERKUENFTE, f.herkunft)),
    formular: verdacht ? `${formular} (${SPAMVERDACHT_HINWEIS})` : formular,
    art: oderNichtAngegeben(beschriftung(ARTEN, f.art)),
    sprachen: oderNichtAngegeben(beschriftung(SPRACHEN, f.sprachen)),
    anlass: oderNichtAngegeben(beschriftung(ANLAESSE, f.anlass)),
    wunschtermin: oderNichtAngegeben(wunschterminText(f.wunschdatum, f.wunschzeit)),
    ort: oderNichtAngegeben(f.treffpunkt),
    telefon: oderNichtAngegeben(f.telefon),
    seitensprache,
  };
}

/**
 * Felder für das Archiv (POST /api/anfrage). Kennung je Sprache, deutsche
 * Beschriftungen, Datum und Uhrzeit als eingegebene Zeichenketten.
 *
 * @param {object} felder Werte des Formulars (Schlüssel wie LEERE_FELDER)
 * @param {{ locale: string, verdacht: boolean }} kontext
 */
export function archivObjekt(felder, { locale, verdacht }) {
  const f = bereinigt(felder);
  const sprache = SEITENSPRACHEN[locale] ? locale : "de";
  return {
    formular: `dolmetscher-${sprache}`,
    name: f.name,
    email: f.email,
    telefon: f.telefon,
    art: beschriftung(ARTEN, f.art),
    sprachen: beschriftung(SPRACHEN, f.sprachen),
    anlass: beschriftung(ANLAESSE, f.anlass),
    wunschdatum: f.wunschdatum,
    wunschzeit: f.wunschzeit,
    treffpunkt: f.treffpunkt,
    herkunft: beschriftung(HERKUENFTE, f.herkunft),
    leistung: `Dolmetschen: ${beschriftung(ARTEN, f.art)}`,
    nachricht: f.nachricht,
    spamverdacht: Boolean(verdacht),
  };
}

const grundVon = (fehler) => {
  if (fehler && typeof fehler === "object" && "status" in fehler) {
    return `${fehler.status} ${fehler.text ?? ""}`.trim();
  }
  if (fehler instanceof Error) return fehler.message;
  return String(fehler);
};

/**
 * Archiv und Mail senden. Das Archiv wird zuerst angestoßen und nicht
 * abgewartet; ob es scheitert, ändert nichts an der Mail. Über Erfolg
 * entscheidet die Mail. Wirft nie.
 *
 * @param {{ archiv: object, mail: object, archivieren: Function, mailSenden: Function }} wege
 * @returns {Promise<{ ok: true } | { ok: false, grund: string }>}
 */
export async function anfrageSenden({ archiv, mail, archivieren, mailSenden }) {
  try {
    Promise.resolve(archivieren(archiv)).catch(() => {});
  } catch {
    // Ein sofortiger Fehler des Archivs darf die Mail nicht aufhalten.
  }
  try {
    await mailSenden(mail);
    return { ok: true };
  } catch (fehler) {
    return { ok: false, grund: grundVon(fehler) };
  }
}
