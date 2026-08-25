import { useState } from "react";
import { Section } from "../Section";

/**
 * About block on the English homepage.
 *
 * Was four skill cards distinguished only by accent colour (blue, cyan, indigo,
 * purple, carrying no meaning), a two-column grid of bordered education and
 * experience boxes, and a three-up certificate row -- the only genuine
 * card-overkill instances left on the site, each combining border, background,
 * shadow-lg, a hover lift and a scale.
 *
 * Now built like UeberMich, its German counterpart: a period column, hairlines
 * and whitespace. Every fact, date and grade is unchanged.
 */
const SKILLS = [
  {
    title: "Automation and AI",
    items: "n8n, Zapier, OpenAI and Azure OpenAI, Anthropic Claude, OpenClaw, RAG, LangChain, Voice AI, prompt engineering",
  },
  {
    title: "Frontend",
    items: "Angular, React, TypeScript, HTML and CSS, Tailwind",
  },
  {
    title: "Backend",
    items: "Java, Spring Boot, Python, Node.js, REST APIs",
  },
  {
    title: "Infrastructure",
    items: "Docker, Kubernetes, Helm, GitLab CI/CD, Git, Prometheus",
  },
];

const EXPERIENCE = [
  {
    period: "Since 09/2025",
    role: "AI Automation Manager",
    org: "TOPEOPLE Group GmbH, Frankfurt am Main",
    highlights: [
      "Automated recruiting and internal workflows with n8n and Zapier, cutting cycle time by 80 percent",
      "Built GPT applications (OpenAI and Azure, LangChain and RAG) for candidate operations, reaching roughly 90 percent automation",
      "Deployed Voice AI agents over Twilio and WebRTC with speech-to-text and text-to-speech",
      "Shipped ATS and CRM integrations over REST and webhooks with OAuth2 and JWT, including Personio, Greenhouse and HubSpot",
      "Ran CI/CD and operations on GitLab, Docker and Kubernetes with Prometheus monitoring",
      "Set LLM guardrails covering PII and GDPR, evaluation tests, audit and RBAC, plus ROI tracking on time-to-hire and SLA",
    ],
  },
  {
    period: "06/2024 to 09/2025",
    role: "Full-Stack Developer and AI Integration Lead",
    org: "Phoenix Parkservice, freelance",
    highlights: [
      "Architected a microservices platform with Spring Boot, Angular and REST APIs",
      "Implemented the full DevOps pipeline with Docker and CI/CD",
      "Increased organic traffic by 35 percent through AI-supported SEO workflows",
    ],
  },
  {
    period: "09/2022 to 09/2024",
    role: "Full-Stack Developer and Master Thesis",
    org: "INFOMOTION GmbH",
    highlights: [
      "Developed an LLM-based Maven plugin that raised test coverage by 33 percent",
      "Created an AR and 3D visualisation app for SAP BusinessObjects dashboards",
      "Managed Kubernetes deployments and Azure cloud integration",
    ],
  },
  {
    period: "05/2021 to 10/2021",
    role: "Cryptography Engineering Intern",
    org: "Deutsche Bank",
    highlights: [
      "Supported the proof of concept and deployment of a digital signature validation service",
    ],
  },
];

const EARLIER_EXPERIENCE = [
  {
    period: "11/2020 to 03/2021",
    role: "Java Tutor",
    org: "Frankfurt University of Applied Sciences",
    highlights: ["Led tutorials for over 30 students and improved pass rates by 20 percent"],
  },
  {
    period: "04/2018 to 11/2018",
    role: "1st and 2nd Level Support",
    org: "Mila IT-Services",
    highlights: ["Resolved over 60 hardware and software issues"],
  },
];

const EDUCATION = [
  {
    period: "2022 to 2024",
    role: "M.Sc. Business Informatics",
    org: "Frankfurt University of Applied Sciences",
    note: "Final grade 1.4 (German scale)",
  },
  {
    period: "2018 to 2022",
    role: "B.Sc. International Business Information Systems",
    org: "Frankfurt University of Applied Sciences",
    note: "Final grade 1.6 (German scale)",
  },
  {
    period: "2012 to 2017",
    role: "Abitur",
    org: "Ernst-Reuter-Schule 1, Frankfurt",
    note: "Grade 1.9 (German scale)",
  },
];

const CERTIFICATES = [
  {
    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    issuer: "Google",
    date: "Jan 2026",
  },
  { title: "React.js", issuer: "Great Learning", date: "Jul 2025" },
  { title: "Advanced Proficiency in KNIME Analytics Platform", issuer: "KNIME", date: "Apr 2023" },
  { title: "Basic Proficiency in KNIME Analytics Platform", issuer: "KNIME", date: "Apr 2023" },
  {
    title: "SAP BusinessObjects Web Intelligence Grundlagen",
    issuer: "INFOMOTION GmbH",
    date: "Feb 2022",
  },
];

const Station = ({ entry }) => (
  <li className="border-t border-hairline py-8 md:grid md:grid-cols-[14rem_1fr] md:gap-x-12">
    <div>
      <p className="text-xs tracking-[0.2em] text-accent uppercase tabular-nums">
        {entry.period}
      </p>
      <h3 className="mt-3 text-lg font-normal text-gray-100">{entry.role}</h3>
      <p className="mt-1 text-sm text-paper-mute">{entry.org}</p>
    </div>
    <div className="mt-4 max-w-[62ch] md:mt-0">
      {entry.note ? <p className="leading-relaxed text-gray-400">{entry.note}</p> : null}
      {entry.highlights ? (
        <ul className="space-y-2">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-gray-400">
              <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </li>
);

export const About = () => {
  const [showEarlier, setShowEarlier] = useState(false);

  return (
    <div id="about">
      <Section>
        <h2 className="label">Experience</h2>
        <ol className="mt-8">
          {EXPERIENCE.map((entry) => (
            <Station key={entry.period} entry={entry} />
          ))}
          {showEarlier
            ? EARLIER_EXPERIENCE.map((entry) => (
                <Station key={entry.period} entry={entry} />
              ))
            : null}
        </ol>
        <button
          type="button"
          onClick={() => setShowEarlier(!showEarlier)}
          className="link-arrow mt-2"
          aria-expanded={showEarlier}>
          {showEarlier ? "Show less" : "Earlier positions"}
          <span aria-hidden="true">{showEarlier ? "↑" : "↓"}</span>
        </button>
      </Section>

      <Section className="!pt-0">
        <h2 className="label">Education</h2>
        <ol className="mt-8">
          {EDUCATION.map((entry) => (
            <Station key={entry.period} entry={entry} />
          ))}
        </ol>
      </Section>

      <Section className="!pt-0">
        <h2 className="label">What I work with</h2>
        <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {SKILLS.map((skill) => (
            <div key={skill.title} className="border-t border-hairline pt-5">
              <dt className="text-lg font-normal text-gray-100">{skill.title}</dt>
              <dd className="mt-2 leading-relaxed text-gray-400">{skill.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="!pt-0">
        <h2 className="label">Certificates</h2>
        <ul className="mt-8">
          {CERTIFICATES.map((cert) => (
            <li
              key={cert.title}
              className="border-t border-hairline py-5 md:grid md:grid-cols-[1fr_14rem] md:gap-x-12">
              <p className="leading-snug text-gray-100">{cert.title}</p>
              <p className="mt-1 text-sm text-paper-mute md:mt-0 md:text-right">
                {cert.issuer} · {cert.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
