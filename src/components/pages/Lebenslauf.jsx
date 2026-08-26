import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import profilePicture from "../../assets/profilepicture.webp";
import { CONTACT, PERSON, SOCIAL } from "../../content/site";
import { LinkArrow } from "../LinkArrow";
import {
  AUSBILDUNG,
  KENNTNISSE,
  KENNZAHLEN,
  KURZPROFIL,
  LEBENSLAUF_STAND,
  SPRACHEN,
  STATIONEN,
  ZERTIFIKATE,
} from "../../content/lebenslauf.de";

/**
 * Der Lebenslauf als eigene Seite.
 *
 * Zweck in den Worten des Eigentümers: bei einer Bewerbung einen Link statt
 * eines Anhangs schicken können. Deshalb ein Dokument, das zufällig eine
 * Webseite ist, und nicht der Essay, der auf /ueber-mich steht. Beide bleiben
 * nebeneinander: /ueber-mich erzählt, diese Seite belegt.
 *
 * Alles steht offen auf einer Seite, ohne Aufklappen, Reiter oder Nachladen.
 * Ein Lebenslauf wird überflogen und gedruckt, und beides scheitert an
 * versteckten Abschnitten. Genau daran krankt der englische Werdegang heute:
 * seine frühen Stationen hängen an useState und stehen deshalb weder im
 * vorgerenderten HTML noch auf dem Papier.
 *
 * Das Raster ist dasselbe wie bei den Stationen auf /ueber-mich: links der
 * Zeitraum in einer schmalen Spalte, rechts der Inhalt. Für ein Dokument, das
 * chronologisch gelesen wird, ist die Jahreszahl der Ankerpunkt.
 */

/** Eine Zeile im Kontaktblock. Als <dl>, weil es Paare aus Art und Wert sind. */
const Kontaktzeile = ({ begriff, children }) => (
  <div className="flex flex-wrap gap-x-3 border-t border-hairline py-2.5">
    <dt className="w-28 shrink-0 text-sm text-paper-mute">{begriff}</dt>
    <dd className="text-sm text-paper-soft">{children}</dd>
  </div>
);

/** Ein Abschnitt des Dokuments, mit der Überschrift in der schmalen Spalte. */
const Block = ({ titel, children }) => (
  <section className="lebenslauf-block border-t border-hairline pt-8">
    <div className="grid gap-x-10 gap-y-6 md:grid-cols-[14rem_1fr]">
      <h2 className="label !mb-0">{titel}</h2>
      <div>{children}</div>
    </div>
  </section>
);

const Punktliste = ({ punkte }) => (
  <ul className="mt-3 max-w-[78ch] space-y-2">
    {punkte.map((punkt) => (
      /* Der Aufzählungspunkt ist ein eigenes, aria-hidden Element statt eines
         list-style-Markers: so bleibt der Einzug bei umbrechenden Zeilen exakt
         unter dem Text statt unter dem Punkt, und der Screenreader liest die
         Liste als Liste statt als Text mit Sonderzeichen. */
      <li key={punkt} className="flex gap-x-3 text-sm leading-relaxed text-paper-soft">
        <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-paper-mute" />
        <span>{punkt}</span>
      </li>
    ))}
  </ul>
);

const Lebenslauf = () => (
  <PageShell
    label={`Lebenslauf · Stand ${LEBENSLAUF_STAND}`}
    headline={PERSON.name}
    intro="AI Automation Manager und Full-Stack-Entwickler in Frankfurt am Main. Vollständiger Werdegang, Ausbildung und Kenntnisse auf einer Seite.">
    <Section className="!pt-0">
      {/* Kopf: Kontaktdaten und Porträt. Das Bild trägt hier bewusst kein
          fetchPriority — das LCP-Element dieser Seite ist die Überschrift, und
          ein zweites Preload-Signal würde nur mit ihr konkurrieren. */}
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-[1fr_auto] md:items-start">
        <dl className="lebenslauf-kontakt max-w-lg border-b border-hairline">
          <Kontaktzeile begriff="E-Mail">
            <a href={`mailto:${CONTACT.email}`} className="underline-offset-4 hover:underline">
              {CONTACT.email}
            </a>
          </Kontaktzeile>
          <Kontaktzeile begriff="Telefon">
            <a href={`tel:${CONTACT.phone}`} className="underline-offset-4 hover:underline">
              {CONTACT.phoneDisplay}
            </a>
          </Kontaktzeile>
          <Kontaktzeile begriff="Standort">
            {PERSON.city}, {PERSON.region} · remote möglich
          </Kontaktzeile>
          <Kontaktzeile begriff="LinkedIn">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline">
              linkedin.com/in/muhamed-nur-beck
            </a>
          </Kontaktzeile>
          <Kontaktzeile begriff="GitHub">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline">
              github.com/MuhamedBeck
            </a>
          </Kontaktzeile>
          <Kontaktzeile begriff="Portfolio">muhamedbeck.com</Kontaktzeile>
        </dl>

        <img
          src={profilePicture}
          alt={`${PERSON.name}, ${PERSON.jobTitles[0]} aus ${PERSON.city}`}
          width="661"
          height="850"
          loading="lazy"
          decoding="async"
          className="h-40 w-40 rounded-full border border-hairline-strong object-cover md:justify-self-end"
          style={{ objectPosition: "center 18%" }}
        />
      </div>

      <div className="mt-16 space-y-16">
        <Block titel="Kurzprofil">
          <div className="max-w-[68ch] space-y-4 leading-relaxed text-paper-soft">
            {KURZPROFIL.map((absatz) => (
              <p key={absatz.slice(0, 40)}>{absatz}</p>
            ))}
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {KENNZAHLEN.map((zahl) => (
              <div key={zahl.label}>
                <dd className="text-3xl font-light tabular-nums text-paper">{zahl.wert}</dd>
                <dt className="mt-2 text-sm leading-snug text-paper-mute">{zahl.label}</dt>
              </div>
            ))}
          </dl>
        </Block>

        <Block titel="Berufserfahrung">
          {/* Sortiert nach Enddatum, laufende Tätigkeiten zuerst. Die Zeiträume
              überschneiden sich an mehreren Stellen, weil die Dolmetschertätigkeit
              neben der Hauptbeschäftigung läuft und INFOMOTION neben dem Studium
              lief; die Spalte "Art" sagt deshalb bei jeder Station, worum es sich
              handelt, statt es dem Leser als Widerspruch zu überlassen. */}
          <ol className="space-y-10">
            {STATIONEN.map((station) => (
              <li key={`${station.firma}-${station.von}`} className="lebenslauf-station">
                <p className="text-sm tabular-nums text-paper-mute">
                  {station.von} – {station.bis}
                  {station.art ? (
                    <span className="text-paper-dim"> · {station.art}</span>
                  ) : null}
                </p>
                <h3 className="mt-1 text-lg text-paper">{station.rolle}</h3>
                <p className="mt-1 text-sm text-paper-soft">
                  {station.firma}
                  {station.ort ? `, ${station.ort}` : ""}
                </p>

                {station.zusammenfassung ? (
                  <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-paper-soft">
                    {station.zusammenfassung}
                  </p>
                ) : null}

                {station.punkte ? <Punktliste punkte={station.punkte} /> : null}

                {station.gruppen
                  ? station.gruppen.map((gruppe) => (
                      <div key={gruppe.titel} className="mt-5">
                        <h4 className="text-xs uppercase tracking-[0.2em] text-paper-mute">
                          {gruppe.titel}
                        </h4>
                        <Punktliste punkte={gruppe.punkte} />
                      </div>
                    ))
                  : null}
              </li>
            ))}
          </ol>
        </Block>

        <Block titel="Ausbildung">
          <ol className="space-y-6">
            {AUSBILDUNG.map((eintrag) => (
              <li key={eintrag.abschluss}>
                <p className="text-sm tabular-nums text-paper-mute">
                  {eintrag.von} – {eintrag.bis}
                </p>
                <h3 className="mt-1 text-lg text-paper">{eintrag.abschluss}</h3>
                <p className="mt-1 text-sm text-paper-soft">
                  {eintrag.ort}
                  {eintrag.note ? ` · ${eintrag.note}` : ""}
                </p>
              </li>
            ))}
          </ol>
        </Block>

        <Block titel="Kenntnisse">
          <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {KENNTNISSE.map((feld) => (
              <div key={feld.titel}>
                <dt className="text-sm text-paper">{feld.titel}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-paper-mute">{feld.inhalt}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block titel="Sprachen und Zertifikate">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            <dl>
              {SPRACHEN.map((eintrag) => (
                <div
                  key={eintrag.sprache}
                  className="flex justify-between gap-x-4 border-t border-hairline py-2.5">
                  <dt className="text-sm text-paper">{eintrag.sprache}</dt>
                  <dd className="text-sm text-paper-mute">{eintrag.niveau}</dd>
                </div>
              ))}
            </dl>
            <ul className="space-y-2">
              {ZERTIFIKATE.map((zertifikat) => (
                <li
                  key={zertifikat}
                  className="border-t border-hairline py-2.5 text-sm text-paper-soft">
                  {zertifikat}
                </li>
              ))}
            </ul>
          </div>
        </Block>
      </div>

      {/* Auf dem Bildschirm die Wege weiter, auf dem Papier stattdessen die
          Adresse der Seite: ein ausgedrucktes Blatt kann man nicht anklicken,
          und wer es weiterreicht, soll wiederfinden, woher es stammt. */}
      <div className="lebenslauf-nur-bildschirm mt-20 border-t border-hairline pt-8">
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <Link to="/ueber-mich" className="link-arrow">
            Über mich
            <LinkArrow />
          </Link>
          <Link to="/projekte" className="link-arrow">
            Projekte im Detail
            <LinkArrow />
          </Link>
          <Link to="/kontakt" className="link-arrow">
            Kontakt aufnehmen
            <LinkArrow />
          </Link>
        </div>
        <p className="mt-6 text-sm text-paper-mute">
          Diese Seite lässt sich über die Druckfunktion des Browsers als PDF sichern.
        </p>
      </div>

      <p className="lebenslauf-nur-druck mt-12 border-t border-hairline pt-6 text-sm text-paper-mute">
        muhamedbeck.com/lebenslauf · Stand {LEBENSLAUF_STAND}
      </p>
    </Section>
  </PageShell>
);

export default Lebenslauf;
