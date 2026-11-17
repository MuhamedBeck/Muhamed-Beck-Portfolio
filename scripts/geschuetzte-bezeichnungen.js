// Geschützte Bezeichnungen, die auf den Seiten der Gruppe `dolmetscher`
// nicht stehen. Geprüft wird nach Stämmen und Mustern auf normalisiertem
// Text.
//
// Läuft unter bloßem Node (check-i18n, Tests, Prüfung nach dem Prerender):
// reines JavaScript, keine Importe.

export const GEPRUEFTE_GRUPPE = "dolmetscher";

const STAEMME = [
  // Deutsch
  "vereidig", "beeidig", "ermächtig", "beglaubig", "zertifi", "akkrediti", "lizenzi", "autorisi",
  "anerkannt", "zugelassen", "zulassung", "gerichtlich", "gerichtsfest", "gerichtsdolmetsch",
  "gerichtsübersetz", "justizdolmetsch", "polizeidolmetsch", "urkundenübersetz",
  "öffentlich bestellt", "staatlich geprüft", "rechtsgültig", "rechtsverbindlich",
  "stempel", "siegel", "kassenleistung",
  // Englisch
  "sworn", "certified", "accredited", "licensed", "registered", "approved", "appointed",
  "attested", "notarized", "notarised", "apostille", "court interpreter", "court translator",
  "court-appointed", "police interpreter", "state-certified", "official translation",
  "official translator", "legally valid", "legally recognised", "legally recognized",
  // Arabisch
  "محلف", "معتمد", "مرخص", "مجاز", "مصدق", "تصديق", "معترف", "ختم",
];

const MUSTER = [
  /geprüfte[rn]? (dolmetscher|übersetzer)/,
  /diplom[- ]?(dolmetscher|übersetzer)/,
  /(bescheinigte|bestätigte|amtliche|offizielle)[nrs]? übersetzung/,
  /authori[sz]ed (translator|interpreter)/,
  // Arabische Wendungen, das zweite Wort mit oder ohne Artikel.
  /ترجمة (ال)?موثقة/, /مترجم (ال)?محاكم/, /مترجم (ال)?محكمة/, /مترجم (ال)?قضائي/,
  /مترجم (ال)?رسمي/, /ترجمة (ال)?رسمية/, /وثائق (ال)?رسمية/, /ترجمة (ال)?قانونية/,
];

/* Zeichen, die beim Abgleich nicht zählen: weicher Trennstrich, Breiten- und
   Richtungsmarken, Wortverbinder, BOM, arabische Vokalzeichen, Dehnungsstrich. */
const UNSICHTBAR = new RegExp(
  "\\u00AD|[\\u200B-\\u200F]|[\\u202A-\\u202E]|[\\u2060-\\u2064]|[\\u2066-\\u2069]|\\uFEFF|[\\u064B-\\u065F]|\\u0670|\\u0640",
  "g"
);

/**
 * Text in die Form bringen, in der gesucht wird: NFKC, klein, gleiche
 * Bindestriche, ohne unsichtbare Zeichen und Vokalzeichen, Alif-Formen
 * vereinheitlicht, Leerraum zusammengefasst.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalisieren(text) {
  return String(text)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‐‑]/g, "-")
    .replace(UNSICHTBAR, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Alle geschützten Bezeichnungen im Text: für Stämme der Stamm, für Muster
 * die gefundene Stelle, in Listenreihenfolge und ohne Dopplungen.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function findeBezeichnungen(text) {
  const normal = normalisieren(text);
  const treffer = [];
  for (const stamm of STAEMME) {
    if (normal.includes(stamm)) treffer.push(stamm);
  }
  for (const muster of MUSTER) {
    const fund = normal.match(muster);
    if (fund) treffer.push(fund[0]);
  }
  return [...new Set(treffer)];
}

/**
 * Je Treffer eine Meldung „<ort>: geschützte Bezeichnung „<treffer>““.
 *
 * @param {Array<{ ort: string, text: string }>} eintraege
 * @returns {string[]}
 */
export function pruefeTexte(eintraege) {
  return eintraege.flatMap(({ ort, text }) =>
    findeBezeichnungen(text).map((treffer) => `${ort}: geschützte Bezeichnung „${treffer}“`)
  );
}

/* Zeichenentitäten, wie sie React und prerender-meta.js schreiben. */
const BENANNT = { amp: "&", lt: "<", gt: ">", quot: '"', nbsp: String.fromCharCode(160) };

const entitaetenAufloesen = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (ganz, name) => {
    if (name[0] !== "#") return BENANNT[name.toLowerCase()] ?? ganz;
    const zahl = name[1] === "x" || name[1] === "X" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    return Number.isInteger(zahl) && zahl >= 0 && zahl <= 0x10ffff ? String.fromCodePoint(zahl) : ganz;
  });

const prozentDekodiert = (wert) => {
  try {
    return decodeURIComponent(wert);
  } catch {
    return wert;
  }
};

const WURZEL = '<div id="root">';

/**
 * Prüfbare Texte einer vorgerenderten Seite, für Stufe 2 der Sperre
 * (scripts/check-bezeichnungen.js): sichtbarer Text, einmal mit Lücke an
 * jedem Tag und einmal zusammengezogen (ein Wort kann über ein Tag laufen),
 * Titel und Meta-Angaben im Kopf, die strukturierten Daten der Seite ohne
 * den ersten Block (der stammt aus der Vorlage und gehört der IT), dazu
 * Verweisziele und lesbare Attribute.
 *
 * @param {string} html
 * @returns {Array<{ ort: string, text: string }>}
 */
export function texteAusHtml(html) {
  const anfang = html.indexOf(WURZEL);
  const ende = html.lastIndexOf("</div>");
  const wurzel =
    anfang === -1 ? "" : html.slice(anfang + WURZEL.length, ende > anfang ? ende : undefined);
  const inhalt = wurzel
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const kopfStart = html.indexOf("<head");
  const kopfEnde = html.indexOf("</head>");
  const kopf = kopfStart === -1 ? "" : html.slice(kopfStart, kopfEnde === -1 ? undefined : kopfEnde);
  const titel = [...kopf.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((treffer) => treffer[1]);
  const meta = [...kopf.matchAll(/<meta\b[^>]*\scontent="([^"]*)"/gi)].map((treffer) => treffer[1]);

  const daten = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .slice(1)
    .map((treffer) => treffer[1]);

  const attribute = [...inhalt.matchAll(/\s(href|alt|title|aria-label|placeholder)="([^"]*)"/gi)].map(
    ([, name, wert]) => {
      const klar = entitaetenAufloesen(wert);
      return name.toLowerCase() === "href" ? `${klar} ${prozentDekodiert(klar)}` : klar;
    }
  );

  return [
    { ort: "Text", text: entitaetenAufloesen(inhalt.replace(/<[^>]*>/g, " ")) },
    { ort: "Text (zusammengezogen)", text: entitaetenAufloesen(inhalt.replace(/<[^>]*>/g, "")) },
    { ort: "Kopf", text: entitaetenAufloesen([...titel, ...meta].join("\n")) },
    { ort: "Strukturierte Daten", text: entitaetenAufloesen(daten.join("\n")) },
    { ort: "Verweise und Attribute", text: attribute.join("\n") },
  ];
}
