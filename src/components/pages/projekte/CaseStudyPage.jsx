import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { CASE_STUDY_COPY } from "./caseStudyCopy";

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
            <dt className="order-2 mt-4 text-sm text-gray-300">{stat.label}</dt>
            <dd className="order-1 text-5xl font-light tabular-nums text-gray-100">
              {stat.value}
            </dd>
            <dd className="order-3 mt-1 text-sm text-paper-mute">{stat.note}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.situation}</h2>
        <p className="max-w-[62ch] leading-relaxed text-gray-400">{data.ausgangslage}</p>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.solution}</h2>
        <ul className="max-w-[62ch]">
          {data.loesung.map((item) => (
            <li key={item} className="flex items-start gap-3 py-2 text-gray-400">
              <span aria-hidden="true" className="mt-1.5 text-xs text-accent">
                ✓
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.results}</h2>
        <ul className="max-w-[62ch]">
          {data.ergebnisse.map((item) => (
            <li key={item} className="flex items-start gap-3 py-2 text-gray-400">
              <span aria-hidden="true" className="mt-1.5 text-xs text-accent">
                ✓
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">{copy.stack}</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {data.stack.map((tech) => (
            <li key={tech} className="text-sm text-gray-400">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">{copy.ctaHeadline}</h2>
        <p className="intro mt-5">{copy.ctaIntro}</p>
        <Link to={copy.ctaHref} className="btn-ghost btn-accent mt-8">
          {copy.ctaButton}
        </Link>
      </div>
    </Section>
  </PageShell>
  );
};
