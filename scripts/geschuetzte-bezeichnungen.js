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
