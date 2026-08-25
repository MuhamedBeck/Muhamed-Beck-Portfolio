import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { PREIS_TEXT } from "../../../content/leistungen.de";
import { RATE_TEXT } from "../../../content/site";

/**
 * Landing page template for a service.
 *
 * Section order follows how someone actually evaluates a supplier: what this
 * is, what it looks like in practice, what is included, how a project runs,
 * what it costs, what it produced before, and the objections they are about to
 * raise. Price sits before proof on purpose, because it is the question people
 * leave over.
 */
export const LeistungPage = ({ data }) => (
  <PageShell label={data.badge} headline={data.h1} intro={data.intro}>
    <Section className="!pt-0">
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
        {data.szenarien.map((szenario, index) => (
          <div
            key={szenario.title}
            className="stagger border-t border-hairline pt-6"
            style={{ "--fade-delay": `${index * 80}ms` }}>
            <h2 className="text-lg font-normal text-gray-100">{szenario.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-400">{szenario.text}</p>
          </div>
        ))}
      </div>
    </Section>

    {data.flow ? (
      <Section className="!pt-0">
        <WorkflowDiagram data={data.flow} />
      </Section>
    ) : null}

    <Section className="!pt-0">
      <h2 className="label">Leistungen im Überblick</h2>
      <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
        {data.leistungen.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-t border-hairline py-4 text-gray-300">
            <span aria-hidden="true" className="mt-1 text-xs text-accent">
              ✓
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section className="!pt-0">
      <h2 className="label">So läuft ein Projekt ab</h2>
      <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {data.ablauf.map((step, index) => (
          <li
            key={step.title}
            className="stagger border-t border-hairline pt-6"
            style={{ "--fade-delay": `${index * 70}ms` }}>
            <span className="text-xs tracking-[0.25em] text-accent tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-normal text-gray-100">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-gray-400">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-6 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="label">Stundensatz</h2>
          {/* One source for the rate wording, so this page, the FAQ, llms.txt
              and the ProfessionalService priceRange cannot drift apart. */}
          <p className="headline-sub mt-4">{RATE_TEXT}</p>
        </div>
        <p className="leading-relaxed text-gray-400">{PREIS_TEXT}</p>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-8 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="label">Ergebnis aus der Praxis</h2>
          <p className="mt-5 text-5xl font-light tabular-nums text-gray-100">
            {data.caseStudy.stat}
          </p>
          <p className="mt-3 max-w-[26ch] text-sm text-paper-mute">
            {data.caseStudy.statLabel}
          </p>
        </div>
        <div>
          <p className="leading-relaxed text-gray-400">{data.caseStudy.text}</p>
          <Link to={data.caseStudy.link} className="link-arrow mt-4">
            {data.caseStudy.linkText}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </Section>

    {/* Visible text and the FAQPage JSON-LD read from this same array, so the
        two can never disagree. */}
    <Section className="!pt-0">
      <h2 className="label">Häufige Fragen</h2>
      <dl className="mt-8 max-w-4xl">
        {data.faq.map((item) => (
          <div
            key={item.q}
            className="border-t border-hairline py-7 md:grid md:grid-cols-[1fr_1.4fr] md:gap-x-12">
            <dt className="text-lg leading-snug font-normal text-gray-100">{item.q}</dt>
            <dd className="mt-3 leading-relaxed text-gray-400 md:mt-0">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section className="!pt-0">
      <div className="max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">Passt das zu Ihrem Prozess?</h2>
        <p className="intro mt-5">
          Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden
          eine echte Einschätzung, ob und wie sich das automatisieren lässt.
        </p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-8">
          Projekt anfragen
        </Link>
        <p className="mt-5 text-sm text-paper-mute">
          Kostenloses Erstgespräch · Frankfurt und remote in Deutschland, Österreich und
          der Schweiz
        </p>
      </div>
    </Section>
  </PageShell>
);
