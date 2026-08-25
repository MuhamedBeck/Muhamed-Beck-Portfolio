import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import { CONTACT, RATE_TEXT_EN } from "../../content/site";

/**
 * English services overview.
 *
 * Previously a stack of rounded-2xl cards under a centred gradient headline,
 * each with an icon tile and a badge. Now the same content as an editorial
 * list, matching /leistungen.
 *
 * Three of the five "highlight" lines said nothing measurable ("Modern tech
 * stack, scalable solutions", "Fast response, reliable solutions", "Flexible
 * scope, tailored to you"). They are gone. The two that referenced real figures
 * stayed and now name where the figure comes from, the way the German pages do.
 */
const SERVICES = [
  {
    title: "Workflow automation",
    label: "n8n and Zapier",
    text: "Custom workflows with n8n and Zapier that connect your tools, remove repetitive steps and run with monitoring and error handling rather than as a one-off script.",
    features: [
      "Individual n8n workflows, self-hosted or cloud",
      "Zapier automation and migration of existing Zaps to n8n",
      "API connections and webhooks (REST, OAuth2, JWT)",
      "CRM and ATS automation (HubSpot, RecruitCRM, Personio, Greenhouse)",
      "Email and notification routing",
      "Data sync between platforms",
      "Monitoring, error handling, rate-limit and retry strategies",
    ],
    result: {
      value: "80 %",
      text: "shorter recruiting cycle times in the processes I automated at TOPEOPLE Group GmbH, my employer.",
    },
  },
  {
    title: "Web development",
    label: "Full-stack",
    text: "Landing page, dashboard or full web application, built with modern frameworks and deployed so it stays maintainable after handover.",
    features: [
      "React and Angular applications",
      "Spring Boot and Node.js backends",
      "TypeScript and JavaScript",
      "REST API design and implementation",
      "Responsive, mobile-first layouts",
      "E-commerce and booking systems",
      "Docker and cloud deployment",
    ],
  },
  {
    title: "Technical SEO",
    label: "Visibility",
    text: "Technical audits, structured data, page speed and local SEO for the German market, including the AI-assisted workflows that keep it running.",
    features: [
      "Technical audits and fixes",
      "On-page optimisation",
      "Meta tags and structured data (Schema.org)",
      "Page speed and Core Web Vitals",
      "Google Search Console and Analytics setup",
      "AI-supported SEO workflows",
      "Local SEO for German businesses",
    ],
    result: {
      value: "35 %",
      text: "more organic traffic for Phoenix Parkservice, a freelance engagement, through AI-supported SEO workflows.",
    },
  },
  {
    title: "AI and LLM integration",
    label: "Agents and voice",
    text: "GPT and LLM features that take over a step rather than demonstrate one, with clear boundaries, a log and a human at the points that need one.",
    features: [
      "OpenAI, Anthropic Claude and Azure OpenAI integration",
      "RAG systems over your own documents",
      "Voice AI agents (Twilio and WebRTC, speech-to-text, text-to-speech)",
      "Classification, enrichment and text generation inside workflows",
      "GDPR-compliant setups, self-hosted or EU region",
      "Custom API development and webhooks",
    ],
  },
  {
    title: "DevOps and infrastructure",
    label: "Build and run",
    text: "Pipelines and environments that are reproducible, so a deployment is a routine step rather than an event.",
    features: [
      "CI/CD pipelines (GitLab CI, GitHub Actions)",
      "Docker and Kubernetes deployment",
      "Infrastructure as code",
      "Cloud architecture (Azure, AWS)",
      "Monitoring with Prometheus",
      "Security and authentication (OAuth2, JWT)",
    ],
  },
];

export const Services = () => (
  <PageShell
    label="Services"
    headline="AI automation and web development"
    intro="Five areas I work in. Each one lists what actually gets built, not what the category is called.">
    <Section className="!pt-0">
      {SERVICES.map((service, index) => (
        <div
          key={service.title}
          className={`border-t border-hairline pt-8 ${index > 0 ? "mt-16" : ""}`}>
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="headline-sub">{service.title}</h2>
              <p className="label mt-4">{service.label}</p>
            </div>
            <div>
              <p className="leading-relaxed text-gray-400">{service.text}</p>

              <ul className="mt-8 grid gap-x-10">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border-t border-hairline py-3 text-gray-300">
                    <span aria-hidden="true" className="mt-1 text-xs text-accent">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {service.result ? (
                <p className="mt-8 flex flex-wrap items-baseline gap-x-4 text-sm leading-relaxed text-paper-mute">
                  <span className="text-3xl font-light tabular-nums text-gray-100">
                    {service.result.value}
                  </span>
                  <span className="max-w-[46ch]">{service.result.text}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </Section>

    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-6 border-t border-hairline pt-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="label">Rate</h2>
          <p className="headline-sub mt-4">{RATE_TEXT_EN}</p>
        </div>
        <p className="leading-relaxed text-gray-400">
          Fixed prices are possible for clearly scoped workflows and integrations. Based
          in Frankfurt am Main, on-site in the Rhine-Main area by arrangement and remote
          across Germany, Austria and Switzerland.
        </p>
      </div>
    </Section>

    <Section className="!pt-0">
      <div className="max-w-2xl border-t border-hairline pt-12">
        <h2 className="headline-sub">Which process costs you the most time?</h2>
        <p className="intro mt-5">
          Write a couple of sentences about it. You get a real assessment within 24 hours
          of whether and how it can be automated.
        </p>
        {/* Previously this button called navigate("/") and then tried to scroll
            to #contact, which sent an English visitor to the German homepage,
            where that anchor does not exist. */}
        <Link to="/en/hire" className="btn-ghost btn-accent mt-8">
          Start a project
        </Link>
        <p className="mt-5 text-sm text-paper-mute">
          Or email directly:{" "}
          {/* The old mailto prefilled a German salutation and body on an
              English page. */}
          <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </div>
    </Section>
  </PageShell>
);
