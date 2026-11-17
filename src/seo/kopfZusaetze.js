/**
 * Zusätze im Kopf der vorgerenderten Seiten, je Route (prerender-meta.js).
 * Reines JavaScript ohne React, damit die Tests es unter bloßem Node laden
 * (tests/kopf-zusaetze.test.js).
 */
import { SITE_URL } from "../routes/registry.js";

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

/**
 * Ersetzungen für ein eigenes Vorschaubild, im Format der Liste
 * `replacements` in prerender-meta.js: Bild und Maße für Open Graph, Bild für
 * Twitter. Der Alternativtext bleibt, wie prerender-meta.js ihn setzt (der
 * Titel der Seite). Im Browser setzt usePageMeta kein Bild; für die Vorschau
 * beim Teilen zählt nur das vorgerenderte HTML.
 *
 * @param {{ src: string, width: number, height: number }} ogImage
 * @returns {Array<[RegExp, Function, string]>}
 */
export function vorschaubildErsetzungen({ src, width, height }) {
  const url = `${SITE_URL}${src}`;
  return [
    [/(<meta property="og:image" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${url}${b}`, "og:image"],
    [/(<meta property="og:image:width" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${width}${b}`, "og:image:width"],
    [/(<meta property="og:image:height" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${height}${b}`, "og:image:height"],
    [/(<meta name="twitter:image" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${url}${b}`, "twitter:image"],
  ];
}
