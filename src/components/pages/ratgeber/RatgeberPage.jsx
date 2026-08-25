import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { STAND } from "../../../content/ratgeber.de";

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
        <p className="border-t border-white/10 pt-5 text-xs tracking-[0.2em] text-paper-mute uppercase">
          Stand: {STAND}
        </p>

        {data.sections.map((section) => (
          <section key={section.h2} className="mt-14">
            <h2 className="headline-sub">{section.h2}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-gray-400">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>

    {/* Visible FAQ and the FAQPage JSON-LD read from the same array. */}
    <Section className="!pt-0">
      <h2 className="label">Häufige Fragen</h2>
      <dl className="mt-8 max-w-4xl">
        {data.faq.map((item) => (
          <div
            key={item.q}
            className="border-t border-white/10 py-7 md:grid md:grid-cols-[1fr_1.4fr] md:gap-x-12">
            <dt className="text-lg leading-snug font-normal text-gray-100">{item.q}</dt>
            <dd className="mt-3 leading-relaxed text-gray-400 md:mt-0">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section className="!pt-0">
      <div className="border-t border-white/10 pt-8">
        <h2 className="label">Weiterlesen</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {data.related.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="link-arrow">
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 max-w-2xl border-t border-white/10 pt-12">
        <h2 className="headline-sub">Konkrete Frage zu Ihrem Prozess?</h2>
        <p className="intro mt-5">
          Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden
          eine Einschätzung, ob und wie sich das automatisieren lässt.
        </p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-8">
          Projekt anfragen
        </Link>
      </div>
    </Section>
  </PageShell>
);
