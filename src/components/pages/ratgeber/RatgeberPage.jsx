import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { STAND } from "../../../content/ratgeber.de";
import { PERSON } from "../../../content/site";
import { RateScale } from "./RateScale";
import { LinkArrow } from "../../LinkArrow";

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
        {/* A visible date, matching datePublished/dateModified in the schema.
            Freshness is a real ranking and citation input, so it is stated
            rather than implied, and never faked. */}
        {/* Byline. /ueber-mich carries the CV that every figure in these
            articles traces back to, and had no inbound link from any body text
            at all -- only the navbar. An article that cites its own numbers
            should say whose numbers they are and let the reader check. */}
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-5 text-xs tracking-[0.2em] text-paper-mute uppercase">
          <span>Stand: {STAND}</span>
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
          reader rebuild the table in their head from the prose. The wrapper
          scrolls on its own so a wide table never makes the page scroll
          sideways. */}
      {data.table ? (
        <figure className="mt-14">
          <div className="-mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[42rem] border-collapse text-start">
              <caption className="label mb-6 text-start">{data.table.caption}</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[13rem] pb-4 text-sm font-normal text-paper-mute">
                    <span className="sr-only">Kriterium</span>
                  </th>
                  {data.table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="pb-4 ps-6 text-lg font-normal text-paper">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row) => (
                  <tr key={row.label} className="border-t border-hairline align-top">
                    <th
                      scope="row"
                      className="py-5 pe-6 text-sm font-normal leading-snug text-paper-dim">
                      {row.label}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={data.table.columns[index]}
                        className="py-5 ps-6 leading-relaxed text-paper-soft">
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

      <div className="mt-16 max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">Konkrete Frage zu Ihrem Prozess?</h2>
        <p className="intro mt-5">
          Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden
          eine Einschätzung, ob und wie sich das automatisieren lässt.
        </p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-8">
          Kostenloses Erstgespräch
        </Link>
      </div>
    </Section>
  </PageShell>
);
