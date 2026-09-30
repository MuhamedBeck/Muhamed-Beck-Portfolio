import { STIMMEN } from "../content/stimmen.de";
import { Section, SectionHeader } from "./Section";

/**
 * Kundenstimmen, oder gar nichts.
 *
 * Gibt `null` zurück, solange keine freigegebene Stimme vorliegt. Das ist der
 * eigentliche Zweck dieser Komponente: Sie darf in die Seiten eingehängt
 * werden, bevor die erste Freigabe da ist, ohne dass jemand eine leere
 * Überschrift oder ein Platzhalterzitat sieht. Wer die Freigabe hat, trägt sie
 * in stimmen.de.js ein, und der Abschnitt erscheint überall gleichzeitig.
 *
 * @param {object} props
 * @param {string} [props.label]    Kleine Zeile über der Überschrift.
 * @param {string} [props.headline] Überschrift des Abschnitts.
 * @param {string} [props.projekt]  Pfad einer Fallstudie. Gesetzt zeigt die
 *   Komponente nur die Stimmen zu genau diesem Projekt und lässt die
 *   Überschrift weg, weil sie dort mitten in einer laufenden Darstellung steht
 *   und keinen eigenen Abschnitt eröffnet.
 */
export const Stimmen = ({ label, headline, projekt }) => {
  const stimmen = projekt ? STIMMEN.filter((stimme) => stimme.projekt === projekt) : STIMMEN;

  if (!stimmen.length) return null;

  return (
    <Section id={projekt ? undefined : "stimmen"} className={projekt ? "!pt-0" : undefined}>
      {projekt ? null : <SectionHeader label={label} headline={headline} />}

      <ul className={`grid gap-x-12 gap-y-12 ${projekt ? "" : "mt-14"} ${stimmen.length > 1 ? "md:grid-cols-2" : ""}`}>
        {stimmen.map((stimme) => (
          <li key={stimme.name} className="border-t border-hairline pt-8">
            {/* figure/blockquote/figcaption statt eines <p> mit Anführungszeichen:
                Der Screenreader kündigt damit ein Zitat an und liest die
                Zuordnung als zum Zitat gehörig, statt als losen Text daneben. */}
            <figure>
              <blockquote>
                <p className="max-w-[58ch] text-lg leading-relaxed text-paper-soft">
                  {stimme.zitat}
                </p>
              </blockquote>
              <figcaption className="mt-6 text-sm text-paper-mute">
                <span className="text-paper">{stimme.name}</span>
                {" · "}
                {stimme.rolle}
                {", "}
                {stimme.firma}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
};
