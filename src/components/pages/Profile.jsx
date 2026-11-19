import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import { LinkArrow } from "../LinkArrow";
import { ANFRAGE_KNOPF } from "../../content/site";
import { PROFIL_GRUPPEN, PROFIL_SEITE } from "../../content/profile.de";

/**
 * Die öffentlichen Profile, im Zeilenstil der Übersichtsseiten: eine Zeile je
 * Profil, der Name ist der Link und reicht über die ganze Zeile.
 *
 * Anders als dort bleibt der Pfeil immer sichtbar. Er sagt hier nicht nur, dass
 * die Zeile irgendwohin führt, sondern dass sie die Website verlässt.
 */
export const Profile = () => (
  <PageShell
    label={PROFIL_SEITE.label}
    headline={PROFIL_SEITE.headline}
    intro={PROFIL_SEITE.intro}>
    <Section className="!pt-0">
      {PROFIL_GRUPPEN.map((gruppe) => (
        <div key={gruppe.titel} className="mb-14">
          <h2 className="label">{gruppe.titel}</h2>
          <ul className="mt-6">
            {gruppe.profile.map((profil, index) => (
              <li
                key={profil.url}
                className="stagger border-t border-hairline"
                style={{ "--fade-delay": `${Math.min(index, 5) * 60}ms` }}>
                <div className="group relative py-8 transition-transform duration-300 hover:translate-x-2 md:grid md:grid-cols-[1fr_1.2fr] md:gap-x-12">
                  <h3 className="headline-sub underline-offset-[0.18em] group-hover:underline">
                    <a
                      href={profil.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="karten-link">
                      {profil.name}
                    </a>
                  </h3>
                  <div className="mt-4 flex items-start gap-4 md:mt-0">
                    <p className="flex-1 leading-relaxed text-paper-soft">{profil.text}</p>
                    <LinkArrow className="mt-1 text-paper-mute" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr className="rule" />
        </div>
      ))}

      <div className="max-w-2xl">
        <p className="intro">{PROFIL_SEITE.schluss}</p>
        <Link to="/kontakt" className="btn-ghost btn-accent mt-6">
          {ANFRAGE_KNOPF}
        </Link>
      </div>
    </Section>
  </PageShell>
);
