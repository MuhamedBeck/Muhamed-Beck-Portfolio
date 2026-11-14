import { HONEYPOT_FELD } from "../services/anfrage";

/**
 * Ein Feld, das Menschen nie sehen und Bots ausfüllen.
 *
 * Aus dem Bild geschoben statt display:none, weil manche Bots unsichtbar
 * geschaltete Felder auslassen. aria-hidden und tabIndex -1, damit weder ein
 * Screenreader noch die Tabulatortaste darauf landet. Ausgewertet wird es in
 * hatSpamverdacht (services/anfrage.js): Ist es ausgefüllt, geht die Anfrage
 * trotzdem hinaus, nur gekennzeichnet. Der Name des Felds ist mit Bedacht
 * gewählt, siehe HONEYPOT_FELD.
 */
export const Honeypot = () => (
  <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
    <label htmlFor={HONEYPOT_FELD}>Bitte leer lassen</label>
    <input
      id={HONEYPOT_FELD}
      name={HONEYPOT_FELD}
      type="text"
      tabIndex={-1}
      autoComplete="off"
      defaultValue=""
    />
  </div>
);
