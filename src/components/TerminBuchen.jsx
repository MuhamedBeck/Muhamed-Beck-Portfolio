import { BUCHUNG } from "../content/site";
import ui from "../i18n/dict/ui";
import { CalPromptKnopf } from "./CalPromptKnopf";
import { LinkArrow } from "./LinkArrow";

/**
 * Terminbuchung für das kostenlose Erstgespräch: der Link zur Buchungsseite
 * bei Cal.com für Menschen, daneben Cal.coms Knopf für KI-Assistenten.
 *
 * Der Link ist nötig, weil der Knopf nur eine Anweisung kopiert; ohne ihn
 * könnte niemand ohne KI-Assistent einen Termin buchen. Ein normaler Link,
 * damit Cal.com erst beim Klick Daten bekommt.
 *
 * @param {object} props
 * @param {string} [props.label] Beschriftung; ohne Angabe die deutsche.
 * @param {string} [props.className]
 */
export const TerminBuchen = ({ label = ui.de.terminBuchen, className = "" }) => (
  <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
    <a href={BUCHUNG.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
      {label}
      <LinkArrow />
    </a>
    <CalPromptKnopf />
  </div>
);
