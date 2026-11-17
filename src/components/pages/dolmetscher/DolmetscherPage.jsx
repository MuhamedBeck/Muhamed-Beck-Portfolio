import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { Tabelle } from "../../Tabelle";
import { WorkflowCanvas } from "../../WorkflowCanvas";
import { FaqListe } from "../../FaqListe";
import { useDict, useLocale } from "../../../i18n";
import { localeConfig } from "../../../i18n/locales";
import woerter from "../../../i18n/dict/dolmetscher";
import profilePicture from "../../../assets/profilepicture.webp";
import { DolmetscherKopf } from "./DolmetscherKopf";
import { DolmetscherFuss } from "./DolmetscherFuss";
import { KontaktKnoepfe, KontaktListe } from "./Kontaktwege";
import { DolmetscherAnfrage } from "./DolmetscherAnfrage";

/* Folgeabschnitte beginnen mit Haarlinie und Abstand (Muster LeistungPage). */
const Abschnitt = ({ id, titel, children }) => (
  <Section id={id} className="!pt-0">
    <div className="border-t border-hairline pt-8">
      <h2 className="headline-sub max-w-[32ch]">{titel}</h2>
      {children}
    </div>
  </Section>
);

const TABELLE = "mt-8";
const TEXT = "mt-6 max-w-[68ch] leading-relaxed text-paper-soft";
const KLEIN = "mt-4 max-w-[68ch] text-sm leading-relaxed text-paper-mute";

/**
 * Die Dolmetscher-Seite in allen drei Sprachen: ein Template, der Inhalt kommt
 * aus dem Modul der Sprache. Jeder Abschnitt erscheint nur, wenn das Modul ihn
 * trägt; die englische Kurzfassung lässt so Abschnitte weg. Eigene Kopf- und
 * Fußzeile, keine IT-Navigation.
 */
export const DolmetscherPage = ({ inhalt }) => {
  const t = useDict(woerter);
  const richtung = localeConfig(useLocale()).dir;
  const { kopf, einsatzarten, preise, ablauf, sprachen, unternehmen, vertraulichkeit, anfrage, fragen } =
    inhalt;

  return (
    <PageShell
      headline={kopf.h1}
      intro={
        kopf.einleitung ? (
          <>
            <span className="mb-3 block md:hidden">{t.kopf.rolle}</span>
            {kopf.einleitung}
          </>
        ) : undefined
      }
      aside={
        kopf.portraitAlt ? (
          <img
            src={profilePicture}
            alt={kopf.portraitAlt}
            width="661"
            height="850"
            decoding="async"
            className="h-44 w-44 rounded-full border border-hairline-strong object-cover lg:h-64 lg:w-64"
            style={{ objectPosition: "center 18%" }}
          />
        ) : undefined
      }
      kopfzeile={<DolmetscherKopf />}
      fusszeile={<DolmetscherFuss />}>
      <Section className="!pt-0">
        <KontaktKnoepfe />
        {kopf.belege ? (
          <p className={KLEIN}>
            {kopf.belege}{" "}
            {kopf.belegeVerweis ? (
              <Link to="/lebenslauf" className="text-accent hover:underline">
                {kopf.belegeVerweis}
              </Link>
            ) : null}
          </p>
        ) : null}
      </Section>

      {einsatzarten ? (
        <Abschnitt titel={einsatzarten.titel}>
          <div className={TABELLE}>
            <Tabelle daten={einsatzarten.tabelle} ersteSpalte={einsatzarten.ersteSpalte} schreibweise="normal" />
          </div>
        </Abschnitt>
      ) : null}

      {preise ? (
        <Abschnitt titel={preise.titel}>
          <div className={TABELLE}>
            <Tabelle daten={preise.tabelle} ersteSpalte={preise.ersteSpalte} schreibweise="normal" />
          </div>
          {preise.anfahrt ? (
            <>
              <h3 className="mt-12 text-lg text-paper">{preise.anfahrt.titel}</h3>
              <p className={TEXT}>{preise.anfahrt.text}</p>
              <div className={TABELLE}>
                <Tabelle
                  daten={preise.anfahrt.tabelle}
                  ersteSpalte={preise.anfahrt.ersteSpalte}
                  schreibweise="normal"
                />
              </div>
              <p className={TEXT}>{preise.anfahrt.beispiel}</p>
            </>
          ) : null}
          <p className={KLEIN}>{t.preise.endpreise}</p>
        </Abschnitt>
      ) : null}

      {ablauf ? (
        <Section className="!pt-0">
          <figure className="m-0 border-t border-hairline pt-8">
            <h2 className="headline-sub max-w-[32ch]">{ablauf.titel}</h2>
            <div className="mt-8">
              <WorkflowCanvas workflow={ablauf.workflow} richtung={richtung} />
            </div>
            <figcaption className={KLEIN}>{ablauf.unterschrift}</figcaption>
          </figure>
        </Section>
      ) : null}

      {sprachen ? (
        <Abschnitt titel={sprachen.titel}>
          <p className={TEXT}>{sprachen.text}</p>
          <p className={KLEIN}>{sprachen.richtungen}</p>
        </Abschnitt>
      ) : null}

      {unternehmen ? (
        <Abschnitt titel={unternehmen.titel}>
          <p className={TEXT}>{unternehmen.text}</p>
          <p className="mt-6">
            <Link to={unternehmen.verweis.href} className="text-accent hover:underline">
              {unternehmen.verweis.text}
            </Link>
          </p>
        </Abschnitt>
      ) : null}

      {vertraulichkeit ? (
        <Abschnitt titel={vertraulichkeit.titel}>
          <p className={TEXT}>{vertraulichkeit.text}</p>
        </Abschnitt>
      ) : null}

      {anfrage ? (
        <Abschnitt id="anfrage" titel={anfrage.titel}>
          <p className={TEXT}>{anfrage.einleitung}</p>
          <div className="mt-10 grid gap-x-14 gap-y-16 md:grid-cols-[1.25fr_1fr]">
            <DolmetscherAnfrage />
            <KontaktListe />
          </div>
        </Abschnitt>
      ) : null}

      {fragen ? (
        <Abschnitt titel={fragen.titel}>
          <FaqListe fragen={fragen.liste} />
        </Abschnitt>
      ) : null}
    </PageShell>
  );
};
