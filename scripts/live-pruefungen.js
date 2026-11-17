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

/**
 * Kontaktwege der Dolmetscher-Seite: ein WhatsApp-Verweis auf die richtige
 * Nummer (mit oder ohne vorbereiteten Text) und ein Telefon-Verweis.
 *
 * @param {string} html
 * @param {{ whatsapp: string, telefon: string }} wege  erwartete Ziele
 * @returns {string[]}
 */
export function kontaktwegeMaengel(html, { whatsapp, telefon }) {
  const maengel = [];
  if (!html.includes(`href="${whatsapp}"`) && !html.includes(`href="${whatsapp}?`)) {
    maengel.push(`kein WhatsApp-Verweis auf ${whatsapp}`);
  }
  if (!html.includes(`href="${telefon}"`)) maengel.push(`kein Telefon-Verweis ${telefon}`);
  return maengel;
}

const meldetOk = (body) => {
  try {
    return JSON.parse(body)?.ok === true;
  } catch {
    return false;
  }
};

/**
 * Antwort von GET /api/anfrage/status (worker/status.js). In Ordnung ist nur
 * Status 200 mit {"ok":true}.
 *
 * @param {{ status: number, body: string }} antwort
 * @returns {string[]}
 */
export function archivStatusMaengel({ status, body }) {
  return status === 200 && meldetOk(body)
    ? []
    : [
        `/api/anfrage/status answered HTTP ${status}: the Worker cannot reach the request archive with its token, so enquiries arrive by mail only. Renew the token with: npx wrangler secret put GITHUB_TOKEN`,
      ];
}
