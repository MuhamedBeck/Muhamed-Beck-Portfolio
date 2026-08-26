import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import profilePicture from "../../assets/profilepicture.webp";
import { PERSON, SOCIAL } from "../../content/site";
import { LinkArrow } from "../LinkArrow";

// The site had no About page in German at all, which is the single biggest
// structural gap it had. This is where the Person entity lives: an assistant
// asked "who is Muhamed Beck" needs one authoritative page stating the role,
// the employer, the city and the verifiable history. Everything here must match
// LinkedIn, GitHub and the Impressum exactly, because matching those values
// across sources is how a machine confirms they describe the same person.

const STATIONS = [
  {
    period: "seit 09/2025",
    role: "AI Automation Manager",
    org: "TOPEOPLE Group GmbH, Frankfurt am Main",
    text: "Automatisierung von Recruiting- und Vertriebsprozessen mit n8n, Zapier und GPT. Durchlaufzeiten in den automatisierten Prozessen um rund 80 Prozent gesenkt, Candidate Operations auf etwa 90 Prozent Automatisierungsgrad gebracht. Voice-AI-Agenten für Support und Bewerberkommunikation, Betrieb über GitLab CI/CD, Docker und Kubernetes mit Monitoring in Prometheus.",
  },
  {
    period: "06/2024 bis 09/2025",
    role: "Full-Stack Developer und AI Integration Lead",
    org: "Phoenix Parkservice, freiberuflich",
    text: "Microservices-Plattform mit Spring Boot und Angular, dazu DevOps und KI-gestützte SEO-Workflows. Der organische Traffic stieg um 35 Prozent.",
  },
  {
    period: "09/2022 bis 09/2024",
    role: "Full-Stack Developer und Masterarbeit",
    org: "INFOMOTION GmbH",
    text: "Masterarbeit über ein Maven-Plugin, das mit Large Language Models automatisch Unit-Tests für Java-Spring-Boot-Projekte erzeugt. Die Testabdeckung stieg um 33 Prozent, der Schreibaufwand für Tests sank um bis zu 95 Prozent.",
  },
  {
    period: "2021",
    role: "Werkstudent und Praktikant",
    org: "Deutsche Bank, Red Reply",
    text: "Kryptografie-Engineering bei der Deutschen Bank, Elastic-Stack-Projekt bei Red Reply.",
  },
];

const SKILLS = [
  {
    title: "Automatisierung",
    items: "n8n, Zapier, Make, Webhooks, REST, OAuth2, Rate-Limit- und Retry-Strategien",
  },
  {
    title: "KI und LLM",
    items: "OpenAI, Azure OpenAI, Anthropic Claude, RAG, LangChain, Prompt Engineering, Voice-AI mit Twilio und WebRTC",
  },
  {
    title: "Systeme",
    items: "HubSpot, RecruitCRM, Personio, Greenhouse, Supabase, Elasticsearch",
  },
  {
    title: "Entwicklung",
    items: "React, Angular, TypeScript, Java, Spring Boot, Python, Node.js, Docker, Kubernetes, GitLab CI/CD",
  },
];

const UeberMich = () => (
  <PageShell
    label="Über mich"
    headline="Muhamed Nur Beck"
    intro="AI Automation Manager und Full-Stack-Entwickler in Frankfurt am Main. Ich automatisiere Geschäftsprozesse mit n8n und KI, hauptberuflich bei der TOPEOPLE Group GmbH und freiberuflich für Unternehmen, die dasselbe brauchen.">
    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-[auto_1fr] md:items-start">
        <img
          src={profilePicture}
          alt={`${PERSON.name}, ${PERSON.jobTitles[0]} aus ${PERSON.city}`}
          width="661"
          height="850"
          loading="lazy"
          decoding="async"
          className="h-44 w-44 rounded-full border border-hairline-strong object-cover"
          style={{ objectPosition: "center 18%" }}
        />
        <div className="max-w-[58ch] space-y-5 leading-relaxed text-paper-soft">
          <p>
            Ich habe an der Frankfurt University of Applied Sciences Wirtschaftsinformatik
            studiert, den Bachelor 2022 und den Master 2024. Seitdem arbeite ich an der
            Stelle, an der Software und Prozesse aufeinandertreffen: nicht an Modellen,
            sondern daran, dass ein Modell im richtigen Moment das Richtige tut und die
            Daten danach im richtigen System landen.
          </p>
          <p>
            Der Grund, warum ich fast nur über Automatisierung schreibe, ist banal: Ich
            mache das jeden Tag. Die Zahlen auf dieser Seite stammen aus Systemen, die
            produktiv laufen, nicht aus Demos. Was ich nicht selbst gebaut habe, verkaufe
            ich auch nicht.
          </p>
          <p>
            Ich spreche Deutsch, Englisch und Arabisch. Anfragen beantworte ich innerhalb
            von 24 Stunden, und wenn Automatisierung sich in Ihrem Fall nicht rechnet,
            sage ich das im Erstgespräch statt hinterher.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow">
              LinkedIn <LinkArrow />
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow">
              GitHub <LinkArrow />
            </a>
          </p>
        </div>
      </div>
    </Section>

    <Section className="!pt-0">
      <h2 className="label">Stationen</h2>
      <ol className="mt-8">
        {STATIONS.map((station) => (
          <li
            key={station.period}
            className="border-t border-hairline py-8 md:grid md:grid-cols-[14rem_1fr] md:gap-x-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-accent uppercase tabular-nums">
                {station.period}
              </p>
              <h3 className="mt-3 text-lg font-normal text-paper">{station.role}</h3>
              <p className="mt-1 text-sm text-paper-mute">{station.org}</p>
            </div>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-paper-soft md:mt-0">
              {station.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>

    <Section className="!pt-0">
      <h2 className="label">Womit ich arbeite</h2>
      <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {SKILLS.map((skill) => (
          <div key={skill.title} className="border-t border-hairline pt-5">
            <dt className="text-lg font-normal text-paper">{skill.title}</dt>
            <dd className="mt-2 leading-relaxed text-paper-soft">{skill.items}</dd>
          </div>
        ))}
      </dl>

      <hr className="rule mt-16" />

      <div className="max-w-2xl pt-12">
        <h2 className="headline-sub">Klingt passend?</h2>
        <p className="intro mt-5">
          Schreiben Sie mir, welcher Prozess Sie am meisten Zeit kostet. Den Rest klären
          wir im Gespräch.
        </p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-8">
          Projekt anfragen
        </Link>
      </div>
    </Section>
  </PageShell>
);

export default UeberMich;
