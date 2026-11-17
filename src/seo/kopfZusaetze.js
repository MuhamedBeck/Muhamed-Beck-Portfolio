/**
 * Zusätze im Kopf der vorgerenderten Seiten, je Route (prerender-meta.js).
 * Reines JavaScript ohne Importe, damit die Tests es unter bloßem Node laden
 * (tests/kopf-zusaetze.test.js).
 */

/**
 * Vorladen des arabischen Schnitts 400 auf Seiten in arabischer Sprache.
 *
 * Ohne das findet der Browser die Schrift erst, wenn das Stylesheet geladen
 * ist und arabischer Text gezeichnet werden soll; bis dahin steht die Seite in
 * der Ersatzschrift und springt danach um. Nur der Schnitt 400: Er trägt den
 * Fließtext, 600 erscheint nur in Überschriften. Die Adresse ist dieselbe wie
 * in @font-face (src/index.css), sonst lüde der Browser die Datei zweimal.
 *
 * @param {string} locale Sprache der Route
 * @returns {string} eine Zeile für <head> oder ""
 */
export function schriftVorladen(locale) {
  if (locale !== "ar") return "";
  return '  <link rel="preload" href="/fonts/ibm-plex-sans-arabic-400.woff2" as="font" type="font/woff2" crossorigin />\n';
}
