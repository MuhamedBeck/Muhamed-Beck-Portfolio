import { BUCHUNG } from "../content/site";
import ui from "../i18n/dict/ui";
import { LinkArrow } from "./LinkArrow";

/**
 * Link zur Terminbuchung für das kostenlose Erstgespräch bei Cal.com.
 *
 * Ein normaler Link, damit Cal.com erst beim Klick Daten bekommt. Cal.coms
 * "Copy Prompt"-Knopf stand vom 07.11.2026 an kurz daneben; der Inhaber hat
 * ihn am selben Tag überall entfernen lassen ("das darf nicht passieren").
 * Nicht wieder einbauen.
 *
 * @param {object} props
 * @param {string} [props.label] Beschriftung; ohne Angabe die deutsche.
 * @param {string} [props.className]
 */
export const TerminBuchen = ({ label = ui.de.terminBuchen, className = "" }) => (
  <div className={className}>
    <a href={BUCHUNG.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
      {label}
      <LinkArrow />
    </a>
  </div>
);
