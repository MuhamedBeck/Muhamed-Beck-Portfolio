import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { PERSON } from "../../../content/site";
import { RateScale } from "./RateScale";
import { LinkArrow } from "../../LinkArrow";

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/* "2026-09-30" wird zu "30. September 2026".

   Zerlegt statt über new Date(...).toLocaleDateString: Ein reines Datum wird
   dort als Mitternacht UTC gelesen und rutscht westlich von Greenwich auf den
   Vortag, und Server und Browser können je nach ICU-Ausstattung verschieden
   formatieren. Beides ergäbe eine Hydration-Abweichung im sichtbaren Text. */
const datumLang = (iso) => {
  const [jahr, monat, tag] = iso.split("-").map(Number);
  return `${tag}. ${MONATE[monat - 1]} ${jahr}`;
};

/* Die erste Leistung unter den weiterführenden Links gibt die Vorbelegung des
   Formulars vor. Jeder Artikel nennt dort bereits die Leistung, zu der er
   gehört, es braucht also keine zweite Angabe, die auseinanderlaufen kann. */
const anfrageZiel = (related) => {
  const leistung = related.find((item) => item.path.startsWith("/leistungen/"));
  return leistung ? `/kontakt?leistung=${leistung.path.split("/").pop()}` : "/kontakt";
};

/**
 * Article template.
 *
 * Answer-first by construction: each h2 is written as the question a reader
 * actually types, and the first paragraph beneath it is the complete answer.
 * Retrieval systems index passages rather than whole documents, so a paragraph
 * that only makes sense after the two above it cannot be quoted, and an
 * unquotable page does not get cited.
 *
 * Measure is capped at ~68 characters. Long lines are harder to read and this
 * is the one page type people actually read rather than scan.
 */
export const RatgeberPage = ({ data }) => (
  <PageShell label={data.kicker} headline={data.h1} intro={data.lede}>
    <Section className="!pt-0">
      <div className="max-w-[68ch]">
        {/* A visible date, matching dateModified in the schema. Freshness is a
            real ranking and citation input, so it is stated rather than implied,
            and never faked.

            Per article, not one shared value. Until October 2026 every article
            showed "Stand: August 2026" from a single constant, so the cost
            guide, updated on 30.09., contradicted its own dateModified. */}
        {/* Byline. /ueber-mich carries the CV that every figure in these
            articles traces back to, and had no inbound link from any body text
            at all -- only the navbar. An article that cites its own numbers
            should say whose numbers they are and let the reader check. */}
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-5 text-xs tracking-[0.2em] text-paper-mute uppercase">
          <span>Stand: {datumLang(data.modified)}</span>
          <span aria-hidden="true">·</span>
          <span>
            Von{" "}
            <Link to="/ueber-mich" className="text-accent underline-offset-4 hover:underline">
              {PERSON.name}
            </Link>
          </span>
        </p>

        {data.sections.map((section) => (
          <section key={section.h2} className="mt-14">
            <h2 className="headline-sub">{section.h2}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-paper-soft">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>

    {data.scale ? (
      <Section className="!pt-0">
        <RateScale data={data.scale} />
      </Section>
    ) : null}

    <Section className="!pt-0">
      {/* Optional comparison table. A comparison article without one makes the
          reader rebuild the table in their head from the prose.

          From md up it is a real table whose wrapper scrolls on its own, so a
          wide table never makes the page scroll sideways. Below md every row
          becomes a card with the column name above each value: at 390 px the
          42rem table used to hide its second column until the reader swiped
          each row sideways. The explicit roles keep the table semantics for
          screen readers once display: block dissolves them, and the visible
          column names in the cards are aria-hidden because the column headers
          are announced anyway. */}
      {data.table ? (
        <figure className="mt-14">
          <div className="md:-mx-4 md:overflow-x-auto md:px-4">
            <table
              role="table"
              className="w-full border-collapse text-start max-md:block md:min-w-[42rem]">
              <caption className="label mb-6 text-start max-md:block">{data.table.caption}</caption>
              <thead role="rowgroup" className="max-md:sr-only">
                <tr role="row">
                  <th
                    role="columnheader"
                    scope="col"
                    className="w-[13rem] pb-4 text-start text-sm font-normal text-paper-mute">
                    <span className="sr-only">Kriterium</span>
                  </th>
                  {data.table.columns.map((column) => (
                    <th
                      key={column}
                      role="columnheader"
                      scope="col"
                      className="pb-4 ps-6 text-start text-lg font-normal text-paper">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody role="rowgroup" className="max-md:block">
                {data.table.rows.map((row) => (
                  <tr
                    key={row.label}
                    role="row"
                    className="border-t border-hairline align-top max-md:mt-4 max-md:block max-md:rounded-lg max-md:border max-md:bg-surface max-md:p-5">
                    <th
                      role="rowheader"
                      scope="row"
                      className="py-5 pe-6 text-start text-sm font-normal leading-snug text-paper-dim max-md:block max-md:p-0 max-md:text-base max-md:text-paper">
                      {row.label}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={data.table.columns[index]}
                        role="cell"
                        className="py-5 ps-6 leading-relaxed text-paper-soft max-md:mt-4 max-md:block max-md:p-0">
                        <span
                          aria-hidden="true"
                          className="mb-1 block text-[0.7rem] tracking-[0.18em] text-paper-mute uppercase md:hidden">
                          {data.table.columns[index]}
                        </span>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      ) : null}
    </Section>

    {/* Visible FAQ and the FAQPage JSON-LD read from the same array. */}
    <Section className="!pt-0">
      <h2 className="label">Häufige Fragen</h2>
      <dl className="mt-8 max-w-4xl">
        {data.faq.map((item) => (
          <div
            key={item.q}
            className="border-t border-hairline py-7 md:grid md:grid-cols-[1fr_1.4fr] md:gap-x-12">
            <dt className="text-lg leading-snug font-normal text-paper">{item.q}</dt>
            <dd className="mt-3 leading-relaxed text-paper-soft md:mt-0">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section className="!pt-0">
      <div className="border-t border-hairline pt-8">
        <h2 className="label">Weiterlesen</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {data.related.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="link-arrow">
                {item.label}
                <LinkArrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Eigener Schluss je Artikel, wo der allgemeine nicht passt: Er fragt,
          ob sich etwas automatisieren lässt, und unter einem Artikel über
          Website-Kosten will das niemand wissen. */}
      <div className="mt-16 max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">
          {data.cta?.headline ?? "Konkrete Frage zu Ihrem Prozess?"}
        </h2>
        <p className="intro mt-5">
          {data.cta?.intro ??
            "Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, ob und wie sich das automatisieren lässt."}
        </p>
        <Link to={anfrageZiel(data.related)} className="btn-ghost btn-accent mt-8">
          {data.cta?.button ?? "Kostenloses Erstgespräch"}
        </Link>
      </div>
    </Section>
  </PageShell>
);
