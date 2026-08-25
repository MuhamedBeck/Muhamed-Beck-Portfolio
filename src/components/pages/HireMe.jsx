import { useState } from "react";
import emailjs from "@emailjs/browser";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import { CONTACT, RATE_TEXT_EN } from "../../content/site";
import { EMAILJS, EMAILJS_IS_CONFIGURED } from "../../content/emailjs";

/**
 * English project enquiry page.
 *
 * This page previously carried almost every generic marker on the site at
 * once: a centred hero over an ambient radial glow, a pulsing "Available for
 * Freelance Projects" badge, a gradient-clipped headline, three equal hover-lift
 * cards, a centred 01-04 step row joined by connector lines, four gradient stat
 * tiles and a gradient submit button. It is the English counterpart of
 * /kontakt, so it now follows the same rules that page does.
 *
 * The form stays. It was always the better of the two on the site: real labels,
 * a visible error state, and a success message that names a response time and a
 * fallback address.
 */

// Kept as prose columns rather than cards. Three services is the right content;
// three bordered boxes in a row is the wrong container for it.
const SERVICES = [
  {
    title: "AI and workflow automation",
    text: "Workflows with n8n and Zapier that connect your tools, remove manual copy-and-paste and run with monitoring and error handling.",
    tools: "n8n, Zapier, OpenAI, Claude",
  },
  {
    title: "CRM and ATS integration",
    text: "HubSpot, RecruitCRM, Personio and Greenhouse connected over REST, webhooks and OAuth2, with rate-limit and retry strategies.",
    tools: "HubSpot, RecruitCRM, REST, OAuth2",
  },
  {
    title: "Full-stack web development",
    text: "Web applications with React, Angular, Spring Boot and Docker, from a single landing page to a microservice architecture.",
    tools: "React, Angular, Spring Boot, Docker",
  },
];

const STEPS = [
  {
    title: "You send the request",
    // Without EmailJS credentials this page shows contact details instead of a
    // form, so a fixed "the form below" would point at nothing.
    text: EMAILJS_IS_CONFIGURED
      ? "One or two sentences about the process is enough. The form below is the fastest route."
      : "One or two sentences about the process is enough. An email is the fastest route.",
  },
  {
    title: "I reply within 24 hours",
    text: "With questions, or with a straight answer on whether automation pays off in your case.",
  },
  {
    title: "We agree the scope",
    text: "Scope, timeline and whether it runs as a fixed price or at an hourly rate.",
  },
  {
    title: "I build and hand over",
    text: "Built with documented handover, and continued maintenance if you want it.",
  },
];

// Same figures as the German pages, and carrying the same provenance line. A
// bare "80%" on a freelance page is indistinguishable from an invented one.
const RESULTS = [
  { value: "80 %", label: "shorter recruiting cycle times" },
  { value: "90 %", label: "of candidate operations automated" },
  { value: "35 %", label: "more organic traffic" },
];

const SERVICE_OPTIONS = [
  "AI workflow automation (n8n / Zapier)",
  "AI agents and LLM integration",
  "HubSpot and CRM integration",
  "Full-stack web development",
  "Voice AI and telephony",
  "Other, or not sure yet",
];

export const HireMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service_type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const combinedMessage = [
      `Service: ${formData.service_type}`,
      formData.company ? `Company: ${formData.company}` : null,
      `\nProject description:\n${formData.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { name: formData.name, email: formData.email, message: combinedMessage },
        EMAILJS.publicKey
      );
      setSent(true);
      setFormData({ name: "", email: "", company: "", service_type: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // No placeholders on the text fields. Every label states what the field is,
  // and the previous placeholders were "Max Mustermann" and "ACME GmbH", which
  // is the German spelling of John Doe at Acme Corp.
  const inputClass =
    "w-full rounded-lg border border-hairline bg-white/5 px-4 py-3 text-white transition focus:border-blue-500 focus:bg-blue-500/5";
  const labelClass = "mb-2 block text-sm text-paper-mute";

  return (
    <PageShell
      label="Freelance"
      headline="Start a project"
      intro="Tell me briefly what the process looks like. You get a real assessment of whether and how it can be automated, not a standard reply and not a sales call.">
      <Section className="!pt-0">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="stagger border-t border-hairline pt-6"
              style={{ "--fade-delay": `${index * 80}ms` }}>
              <h2 className="text-lg font-normal text-gray-100">{service.title}</h2>
              <p className="mt-3 leading-relaxed text-gray-400">{service.text}</p>
              <p className="mt-4 text-sm text-paper-mute">{service.tools}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <h2 className="label">How a project runs</h2>
        <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
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
            <h2 className="label">Rate</h2>
            <p className="headline-sub mt-4">{RATE_TEXT_EN}</p>
          </div>
          <p className="leading-relaxed text-gray-400">
            Small workflows are done in a few hours, so for clearly scoped work a fixed
            price is possible after a free first call. Based in Frankfurt am Main,
            on-site in the Rhine-Main area by arrangement and remote across Germany,
            Austria and Switzerland.
          </p>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="border-t border-hairline pt-8">
          <h2 className="label">Results from real projects</h2>
          <dl className="mt-8 grid gap-x-16 gap-y-8 sm:grid-cols-3">
            {RESULTS.map((result) => (
              <div key={result.label}>
                <dd className="text-4xl font-light tracking-tight tabular-nums text-gray-100">
                  {result.value}
                </dd>
                <dt className="mt-3 max-w-[24ch] text-sm leading-snug text-paper-mute">
                  {result.label}
                </dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[68ch] text-sm leading-relaxed text-paper-mute">
            All figures come from systems running in production, not from demos.
            TOPEOPLE Group GmbH is my employer; Phoenix Parkservice was a freelance
            engagement.
          </p>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="max-w-2xl border-t border-hairline pt-12">
          <h2 className="headline-sub">Tell me about the project</h2>

          {!EMAILJS_IS_CONFIGURED ? (
            /* No EmailJS credentials in this build, so the form could only
               fail. Show the direct route instead, the way /kontakt does. */
            <div className="mt-8">
              <p className="intro">
                Tell me which process costs you the most time, which systems are
                involved and whether there is a deadline. One or two sentences is
                enough.
              </p>
              <a href={`mailto:${CONTACT.email}`} className="btn-ghost btn-accent mt-8">
                Write an email
              </a>
              <p className="mt-5 text-sm text-paper-mute">
                {CONTACT.email} · {CONTACT.phoneDisplay} · Free first call · Reply
                within 24 hours
              </p>
            </div>
          ) : sent ? (
            <div className="mt-8" role="status">
              <p className="intro">Request sent.</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                I&apos;ll get back to you within 24 hours. No reply?{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-accent hover:underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="hire-name">
                    Name *
                  </label>
                  <input
                    id="hire-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="hire-email">
                    Email *
                  </label>
                  <input
                    id="hire-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="hire-company">
                  Company (optional)
                </label>
                <input
                  id="hire-company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="hire-service">
                  What is it about? *
                </label>
                <select
                  id="hire-service"
                  name="service_type"
                  required
                  value={formData.service_type}
                  onChange={(e) =>
                    setFormData({ ...formData, service_type: e.target.value })
                  }
                  className={`${inputClass} cursor-pointer`}>
                  <option value="" disabled>
                    Please choose
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="hire-message">
                  Which process costs you the most time? *
                </label>
                <textarea
                  id="hire-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  The request could not be sent. Please email me directly:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="underline hover:text-red-300">
                    {CONTACT.email}
                  </a>
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-ghost btn-accent">
                {loading ? "Sending" : "Send request"}
              </button>

              <p className="text-sm text-paper-mute">
                Free first call · Reply within 24 hours · Frankfurt and remote
              </p>
            </form>
          )}
        </div>
      </Section>
    </PageShell>
  );
};
