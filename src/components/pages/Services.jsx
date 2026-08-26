import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { SERVICES } from "../../content/services.en";
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

export const Services = () => (
  <PageShell
    label="Services"
    headline="AI automation and web development"
    intro="Five areas I work in. Each one lists what actually gets built, not what the category is called.">
    <Section className="!pt-0">
      {SERVICES.map((service, index) => (
        <div
          key={service.title}
          id={service.slug}
          className={`scroll-mt-28 border-t border-hairline pt-8 ${index > 0 ? "mt-16" : ""}`}>
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="headline-sub">{service.title}</h2>
              <p className="label mt-4">{service.label}</p>
            </div>
            <div>
              <p className="leading-relaxed text-paper-soft">{service.text}</p>

              <ul className="mt-8 grid gap-x-10">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border-t border-hairline py-3 text-paper-dim">
                    <span aria-hidden="true" className="mt-1 text-xs text-accent">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {service.result ? (
                <p className="mt-8 flex flex-wrap items-baseline gap-x-4 text-sm leading-relaxed text-paper-mute">
                  <span className="text-3xl font-light tabular-nums text-paper">
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
        <p className="leading-relaxed text-paper-soft">
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
