import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { LinkArrow } from "../../LinkArrow";
import { CASE_STUDY_COPY } from "./caseStudyCopy";
import { Stimmen } from "../../Stimmen";
import { Grafik } from "../../Grafik";
import { Zeitvergleich } from "../../Zeitvergleich";

/* Ergebnisse mit Zahl stehen groß und farbig im Raster, der Rest als Liste
   darunter. Die Farben tragen keine Wertung, sie trennen nur die Zahlen
   voneinander, damit vier große Ziffern nicht wie eine Tabelle wirken. */
const TON_TEXT = {
  akzent: "text-accent",
  cyan: "text-accent-dim",
  erfolg: "text-success",
  warm: "text-warm",
};
const TON_BALKEN = {
  akzent: "bg-accent",
  cyan: "bg-accent-dim",
  erfolg: "bg-success",
  warm: "bg-warm",
};

/* "Stichwort: Erklärung" wird zu fettem Stichwort und normalem Rest, damit
   sich die Lösungsliste überfliegen lässt. Nur bei einem kurzen Stichwort am
   Anfang, sonst bleibt der Satz, wie er ist. */
const leitwort = (text) => {
  const stelle = text.indexOf(": ");
  return stelle > 0 && stelle <= 60 ? [text.slice(0, stelle), text.slice(stelle + 2)] : [null, text];
};

/**
 * Case study template.
 *
 * Leads with the numbers rather than the narrative. A visitor comparing
 * suppliers scans for the result first and only reads the story if the result
 * is interesting, and a figure with its unit and context in one line is also
 * the shape that survives being extracted as a quotation.
 */
export const CaseStudyPage = ({ data, locale = "de" }) => {
  const copy = CASE_STUDY_COPY[locale] ?? CASE_STUDY_COPY.de;
  /* Nur deutsche Mandate tragen eine Leistung; die englischen und arabischen
     Fallstudien verweisen weiter auf ihre eigene Anfrageseite. */
  const leistung = locale === "de" ? data.leistung : undefined;
  const ctaZiel = leistung
    ? `/kontakt?leistung=${leistung.path.split("/").pop()}`
    : copy.ctaHref;

  return (
  <PageShell label={data.role} headline={data.title} intro={data.subtitle}>
    <Section className="!pt-0">
      <dl className="grid gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-3">
        {data.stats.map((stat, index) => (
          /* A <div> inside a <dl> may hold only <dt> and <dd>, and the terms
             have to come before their descriptions. This had the note in a <p>
             and the value in a <dd> ahead of its own <dt>, so the list was
             invalid twice over on all six case studies. Flex order keeps the
             figure on top where it belongs visually. */
          <div
            key={stat.label}
            className="stagger flex flex-col"
            style={{ "--fade-delay": `${index * 80}ms` }}>
            <dt className="order-2 mt-4 text-sm text-paper-dim">{stat.label}</dt>
            <dd className="order-1 text-5xl font-light tabular-nums text-paper">
              {stat.value}
            </dd>
            <dd className="order-3 mt-1 text-sm text-paper-mute">{stat.note}</dd>
          </div>
        ))}
      </dl>
    </Section>

    {/* A picture of the work itself: the workflow, the measured scores or the
        migration, chosen by bild.art. Same slot as the screenshots below and
        for the same reason: right after the figures, before the story. */}
    {data.bild ? (
      <Section className="!pt-0">
        <figure className="m-0 border-t border-hairline pt-8">
          <h2 className="label">{data.bild.label}</h2>
          <div className="mt-8">
            <Grafik bild={data.bild} />
          </div>
          {data.bild.text ? (
            <figcaption className="mt-4 max-w-[62ch] text-sm leading-relaxed text-paper-mute">
              {data.bild.text}
            </figcaption>
          ) : null}
        </figure>
      </Section>
    ) : null}

    {/* Screenshots, for the case studies that are about something you can see.
        Guarded: most entries have no images and must not render an empty band.

        Deliberately not before the stats. A visitor comparing suppliers scans
        for the result first, and a picture at the top would push the numbers
        below the fold on a phone.

        No lightbox: this template is rendered by renderToString at build time,
        so anything needing an effect or a window object cannot live here. The
        live link underneath is the better version of that anyway. */}
    {data.screenshots?.length ? (
      <Section className="!pt-0">
        {/* The only section that does not use the label-beside-content grid the
            others share. Inside it the images came out 306px wide, which is no
            way to show somebody a website. The label sits above instead and the
            pictures get the full measure. */}
        <div className="border-t border-hairline pt-8">
          <h2 className="label">{copy.screenshots}</h2>
          <div className="mt-8">
            <ul className="grid gap-8 sm:grid-cols-2">
              {data.screenshots.map((bild, index) => (
                <li
                  key={bild.src}
                  className={`stagger ${bild.wide ? "sm:col-span-2" : ""}`}
                  style={{ "--fade-delay": `${index * 80}ms` }}>
                  <figure>
                    <img
                      src={bild.src}
                      alt={bild.alt}
                      width={bild.width}
                      height={bild.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-lg border border-hairline"
                    />
                    <figcaption className="mt-3 text-sm text-paper-mute">
                      {bild.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            {data.liveUrl ? (
              <a
                href={data.liveUrl.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-8 inline-flex">
                {data.liveUrl.label}
                <LinkArrow />
              </a>
            ) : null}
          </div>
        </div>
      </Section>
    ) : null}

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.situation}</h2>
        <p className="max-w-[62ch] leading-relaxed text-paper-soft">{data.ausgangslage}</p>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.solution}</h2>
        <ul className="max-w-[62ch]">
          {data.loesung.map((item) => {
            const [lead, rest] = leitwort(item);
            return (
              <li key={item} className="flex items-start gap-3 py-2 text-paper-soft">
                <span aria-hidden="true" className="mt-1.5 text-xs text-accent">
                  ✓
                </span>
                <span className="leading-relaxed">
                  {lead ? (
                    <>
                      <strong className="font-medium text-paper">{lead}:</strong> {rest}
                    </>
                  ) : (
                    rest
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.results}</h2>
        <div className="max-w-[62ch]">
          {/* A picture of the main result before the list that spells it out. */}
          {data.vergleich ? (
            <div className="mb-10">
              <Zeitvergleich data={data.vergleich} />
            </div>
          ) : null}
          {data.ergebnisse.some((item) => typeof item === "object") ? (
            <dl className="mb-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {data.ergebnisse
                .filter((item) => typeof item === "object")
                .map((item, index) => (
                  <div
                    key={item.text}
                    className="stagger flex flex-col"
                    style={{ "--fade-delay": `${index * 90}ms` }}>
                    {/* Only <dt> and <dd> may sit in a <dl> group, so the
                        coloured bar lives inside the <dd> it belongs to. */}
                    <dt className="order-2 mt-3 max-w-[32ch] text-sm leading-relaxed text-paper-soft">
                      {item.text}
                    </dt>
                    <dd
                      className={`order-1 font-display text-5xl font-light tracking-tight tabular-nums ${TON_TEXT[item.ton]}`}>
                      <span
                        aria-hidden="true"
                        className={`mb-4 block h-1 w-10 rounded-full ${TON_BALKEN[item.ton]}`}
                      />
                      {item.wert}
                    </dd>
                  </div>
                ))}
            </dl>
          ) : null}
          <ul>
            {data.ergebnisse
              .filter((item) => typeof item === "string")
              .map((item) => (
                <li key={item} className="flex items-start gap-3 py-2 text-paper-soft">
                  <span aria-hidden="true" className="mt-1.5 text-xs text-accent">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
          </ul>
        </div>
        {/* Von der Fallstudie zur Leistung, die sie belegt. Steht unter den
            Ergebnissen, weil der Leser genau dort entscheidet, ob er das auch
            für sich will. */}
        {leistung ? (
          <Link to={leistung.path} className="link-arrow mt-6 justify-self-start md:col-start-2">
            Zur Leistung: {leistung.label}
            <LinkArrow />
          </Link>
        ) : null}
      </div>
    </Section>

    {/* Die Stimme des Auftraggebers steht direkt hinter den Ergebnissen: Dort
        hat der Leser gerade gelesen, was gemessen wurde, und die naheliegende
        Frage ist, wie das für den Kunden war.

        Nur auf Deutsch. stimmen.de.js ist eine deutsche Quelle, und ein
        deutsches Zitat auf /en oder /ar wäre derselbe Fehler, den Home.jsx mit
        dem Leistungsregister vermeidet. Ohne Freigabe rendert die Komponente
        ohnehin nichts. */}
    {locale === "de" ? <Stimmen projekt={data.path} /> : null}

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.stack}</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {data.stack.map((tech) => (
            <li key={tech} className="text-sm text-paper-soft">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Section>

    {/* Eigener Schluss je Fallstudie, wo der allgemeine nicht passt: Unter
        einem Website-Relaunch fragte er nach "ähnlichen Prozessen", und wer
        gerade eine schnelle Website gesehen hat, will keine Prozesse
        automatisieren lassen, sondern eine solche Website. */}
    <Section className="!pt-0">
      <div className="max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">{data.cta?.headline ?? copy.ctaHeadline}</h2>
        <p className="intro mt-5">{data.cta?.intro ?? copy.ctaIntro}</p>
        <Link to={ctaZiel} className="btn-ghost btn-accent mt-8">
          {data.cta?.button ?? copy.ctaButton}
        </Link>
      </div>
    </Section>
  </PageShell>
  );
};
