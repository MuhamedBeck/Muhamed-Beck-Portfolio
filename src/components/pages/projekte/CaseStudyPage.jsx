import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";

/**
 * Case study template.
 *
 * Leads with the numbers rather than the narrative. A visitor comparing
 * suppliers scans for the result first and only reads the story if the result
 * is interesting, and a figure with its unit and context in one line is also
 * the shape that survives being extracted as a quotation.
 */
export const CaseStudyPage = ({ data }) => (
  <PageShell label={data.role} headline={data.title} intro={data.subtitle}>
    <Section className="!pt-0">
      <dl className="grid gap-x-10 gap-y-8 border-t border-hairline pt-8 sm:grid-cols-3">
        {data.stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stagger"
            style={{ "--fade-delay": `${index * 80}ms` }}>
            <dd className="text-5xl font-light tabular-nums text-gray-100">
              {stat.value}
            </dd>
            <dt className="mt-4 text-sm text-gray-300">{stat.label}</dt>
            <p className="mt-1 text-sm text-paper-mute">{stat.note}</p>
          </div>
        ))}
      </dl>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">Ausgangslage</h2>
        <p className="max-w-[62ch] leading-relaxed text-gray-400">{data.ausgangslage}</p>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-4 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <h2 className="label">Lösung</h2>
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
        <h2 className="label">Ergebnisse</h2>
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
        <h2 className="label">Technologie-Stack</h2>
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
        <h2 className="headline-sub">Ähnliche Prozesse in Ihrem Unternehmen?</h2>
        <p className="intro mt-5">
          Schreiben Sie mir, welcher Ablauf bei Ihnen am meisten Zeit kostet. Den Rest
          klären wir im Gespräch.
        </p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-8">
          Projekt anfragen
        </Link>
      </div>
    </Section>
  </PageShell>
);
