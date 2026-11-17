// Reine Prüffunktionen auf ausgeliefertem HTML: für den Wächter im
// Prerender (prerender-meta.js) und für die Live-Prüfung
// (scripts/check-live.js). Läuft unter bloßem Node, ohne Importe.

/**
 * Ein Formular im vorgerenderten HTML muss ohne Skript ungefährlich sein:
 * jeder Sendeknopf gesperrt, und ein Hinweis mit Mail und Telefon vorhanden.
 * Sonst schickt der Browser die Felder per GET in die Adresszeile, und nichts
 * kommt an.
 *
 * @param {string} html
 * @returns {string[]} Mängel; leer, wenn alles stimmt oder kein Formular da ist
 */
export function ohneSkriptMaengel(html) {
  if (!html.includes("<form")) return [];
  const maengel = [];
  const knoepfe = [...html.matchAll(/<button\b[^>]*\btype="submit"[^>]*>/g)].map((treffer) => treffer[0]);
  if (!knoepfe.length || knoepfe.some((knopf) => !/\sdisabled(=""|\s|>)/.test(knopf))) {
    maengel.push("Sendeknopf ist im vorgerenderten HTML nicht gesperrt");
  }
  if (!/class="[^"]*\bohne-skript\b/.test(html)) {
    maengel.push("Hinweis für Besucher ohne Skript (Klasse ohne-skript) fehlt");
  }
  return maengel;
}
