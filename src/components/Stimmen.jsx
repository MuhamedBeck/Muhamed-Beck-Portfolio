import { STIMMEN } from "../content/stimmen.de";
import { Section, SectionHeader } from "./Section";
import { LinkArrow } from "./LinkArrow";

/**
 * Kundenstimmen, oder gar nichts.
 *
 * Gibt `null` zurück, solange keine freigegebene Stimme vorliegt. Das ist der
 * eigentliche Zweck dieser Komponente: Sie darf in die Seiten eingehängt
 * werden, bevor die erste Freigabe da ist, ohne dass jemand eine leere
 * Überschrift oder ein Platzhalterzitat sieht. Wer die Freigabe hat, trägt sie
 * in stimmen.de.js ein, und der Abschnitt erscheint überall gleichzeitig.
 *
 * Zwei Darstellungen, weil die Stimme an zwei Orten zwei verschiedene Aufgaben
 * hat. Auf der Startseite ist sie der einzige Satz auf der Seite, den nicht der
 * Anbieter selbst sagt, und trägt deshalb Zitatgröße. In der Fallstudie steht
 * sie zwischen sechs anderen Abschnitten; dort dieselbe Größe zu nehmen hieße,
 * sie gegen die Ergebnisse antreten zu lassen, die sie stützen soll.
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
  /* Die Freigabe ist die Bedingung, nicht die Notiz.
     stimmen.de.js beschreibt `freigabe` als Voraussetzung dafür, dass ein
     Eintrag überhaupt dastehen darf. Solange das nur im Kommentar steht,
     hängt die Einhaltung daran, dass niemand es eilig hat: Ein Entwurf, der
     zum Ausprobieren eingetragen und dann vergessen wird, geht beim nächsten
     Deploy unter echtem Namen online. Hier ist die Regel deshalb Code. */
  const stimmen = STIMMEN.filter(
    (stimme) => stimme.freigabe && (projekt ? stimme.projekt === projekt : true),
  );

  if (!stimmen.length) return null;

  const gross = !projekt;

  return (
    <Section id={gross ? "stimmen" : undefined} className={gross ? undefined : "!pt-0"}>
      {gross ? <SectionHeader label={label} headline={headline} /> : null}

      <ul
        className={`grid gap-x-12 gap-y-14 ${gross ? "mt-14" : ""} ${
          stimmen.length > 1 ? "md:grid-cols-2" : ""
        }`}>
        {stimmen.map((stimme) => (
          <li key={stimme.name} className="border-t border-hairline pt-8">
            {/* figure/blockquote/figcaption statt eines <p> mit Anführungszeichen:
                Der Screenreader kündigt damit ein Zitat an und liest die
                Zuordnung als zum Zitat gehörig, statt als losen Text daneben. */}
            <figure>
              <blockquote>
                {/* Das Anführungszeichen ist dekorativ und aria-hidden: Der
                    Screenreader kennt das Zitat bereits aus dem blockquote,
                    und ein vorgelesenes Sonderzeichen wäre nur Lärm. Negativer
                    Einzug, damit die erste Textzeile bündig mit allem anderen
                    steht statt um die Breite des Zeichens versetzt. */}
                <p
                  className={`text-paper-soft ${
                    gross
                      ? "max-w-[46ch] text-xl leading-relaxed md:text-2xl md:leading-[1.5]"
                      : "max-w-[58ch] text-lg leading-relaxed"
                  }`}>
                  <span
                    aria-hidden="true"
                    className="-ms-[0.42em] text-accent"
                    style={{ letterSpacing: "0.02em" }}>
                    „
                  </span>
                  {stimme.zitat}
                  <span aria-hidden="true" className="text-accent">
                    “
                  </span>
                </p>
              </blockquote>

              <figcaption
                className={`text-sm text-paper-mute ${gross ? "mt-8" : "mt-6"}`}>
                <span className="text-paper">{stimme.name}</span>
                {" · "}
                {stimme.rolle}
                {", "}
                {stimme.firma}
              </figcaption>
            </figure>

            {/* Der Beleg ist der Grund, warum diese Stimme mehr wiegt als eine
                Zeile Eigenlob: Die Behauptung "sie ist sofort da" lässt sich
                von hier aus in einem Klick nachprüfen. Steht außerhalb der
                figure, weil er nicht Teil des Zitats ist. */}
            {stimme.beleg ? (
              <a
                href={stimme.beleg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-5">
                {stimme.beleg.label}
                <LinkArrow />
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
};
