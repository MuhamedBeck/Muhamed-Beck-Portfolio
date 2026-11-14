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
 *
 * Der Name darf nach keinem Feld klingen, das Browser aus einem gespeicherten
 * Profil befüllen (Adresse, Name, Kontakt). Bis 14.11.2026 hieß es
 * "zweitadresse": Chrome hielt es für "Adresszeile 1" und trug die Straße des
 * Besuchers ein, autocomplete="off" hält das nicht auf. Wer den
 * Autofill-Vorschlag annahm, galt als Bot und seine Anfrage ging lautlos
 * verloren. worker/anfrage.test.js prüft den Namen gegen diese Muster;
 * worker/anfrage.js kennt denselben Namen.
 */
export const HONEYPOT_FELD = "kennziffer";

/**
 * War das unsichtbare Feld ausgefüllt? Das ist ein Verdacht, kein Urteil:
 * Autofill oder ein Passwortmanager können es auch bei einem Menschen füllen.
 * Die Anfrage wird deshalb trotzdem verschickt und nur gekennzeichnet
 * (mailMitVerdacht, Feld spamverdacht im Archiv). Übertragen wird nur dieses
 * Ja oder Nein, nie der Inhalt des Felds.
 */
export const hatSpamverdacht = (formular) =>
  Boolean(new FormData(formular).get(HONEYPOT_FELD)?.toString().trim());

export const SPAMVERDACHT_HINWEIS =
  "Spamverdacht: Das unsichtbare Feld des Formulars war ausgefüllt.";

/**
 * Kennzeichnet die Mail an den Inhaber, wenn Spamverdacht besteht: in der
 * Zeile "Formular" (neue Vorlage) und am Anfang von message (alte Vorlage).
 * Ohne Verdacht bleiben die Felder, wie sie sind.
 *
 * @param {{ formular: string, message: string }} felder Variablen der EmailJS-Vorlage
 * @param {boolean} verdacht Ergebnis von hatSpamverdacht
 */
export const mailMitVerdacht = (felder, verdacht) =>
  verdacht
    ? {
        ...felder,
        formular: `${felder.formular} (${SPAMVERDACHT_HINWEIS})`,
        message: `${SPAMVERDACHT_HINWEIS}\n\n${felder.message}`,
      }
    : felder;
