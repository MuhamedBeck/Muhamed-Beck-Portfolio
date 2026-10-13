/**
 * Zweiter Weg jeder Formular-Anfrage: als Datei ins private Repository
 * MuhamedBeck/anfragen, über den Worker unter /api/anfrage.
 *
 * Bewusst nicht der Weg, an dem Erfolg oder Fehler hängen. Die Mail über
 * EmailJS benachrichtigt sofort, die Datei ist Archiv und Arbeitsliste. Fällt
 * das Archiv aus, soll der Absender davon nichts merken; fällt die Mail aus,
 * sieht er wie bisher die Fehlermeldung mit der direkten Adresse, und die
 * Anfrage liegt trotzdem im Repository.
 *
 * keepalive, damit der Aufruf auch dann zu Ende läuft, wenn der Besucher die
 * Seite direkt nach dem Absenden verlässt.
 *
 * @param {object} anfrage Felder wie in worker/anfrage.js (GRENZEN).
 */
export async function anfrageArchivieren(anfrage) {
  try {
    const antwort = await fetch("/api/anfrage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anfrage),
      keepalive: true,
    });
    if (!antwort.ok) {
      console.warn(`Anfrage nicht archiviert: HTTP ${antwort.status}`);
    }
  } catch (fehler) {
    console.warn("Anfrage nicht archiviert:", fehler);
  }
}

/** Ein leeres optionales Feld steht in der Mail als "nicht angegeben", nicht als Lücke. */
export const oderNichtAngegeben = (wert) => (wert?.trim() ? wert.trim() : "nicht angegeben");

/**
 * Das unsichtbare Feld, das nur Bots ausfüllen. Aus dem Formular gelesen
 * statt aus dem React-Zustand, damit es auch greift, wenn ein Bot die Felder
 * direkt im DOM setzt.
 */
export const HONEYPOT_FELD = "zweitadresse";

export const istBot = (formular) =>
  Boolean(new FormData(formular).get(HONEYPOT_FELD)?.toString().trim());
