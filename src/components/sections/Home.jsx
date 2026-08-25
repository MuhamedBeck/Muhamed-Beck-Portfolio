import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import profilePicture from "../../assets/profilepicture.webp";
import { useDict, useLocale } from "../../i18n";
import home from "../../i18n/dict/home";
import ui from "../../i18n/dict/ui";
import { CONTACT, SOCIAL } from "../../content/site";

// Entrance choreography, in milliseconds. One ladder rather than six pieces of
// component state driving six timers: the previous version reset and restarted
// all of them from an effect, which is what the cascading-render lint rule was
// objecting to, and it could not respect prefers-reduced-motion.
const DELAY = {
  label: 0,
  headline: 80,
  intro: 220,
  actions: 320,
  socials: 400,
  stats: 480,
};

/**
 * @param {{ isLoaded?: boolean }} props `isLoaded` gates the entrance animation
 *   until the splash screen has finished. It is true during the build-time
 *   render, so the prerendered HTML always carries `is-ready` and the page is
 *   fully visible without JavaScript.
 */
export const Home = ({ isLoaded = true }) => {
  const t = useDict(home);
  const chrome = useDict(ui);
  const locale = useLocale();
  const servicesPath = locale === "de" ? "/leistungen" : "/en/services";
  const contactPath = locale === "de" ? "/kontakt" : "/en/hire";

  return (
    <section
      id="home"
      className={`relative flex min-h-[100dvh] items-center overflow-x-hidden px-4 ${
        isLoaded ? "is-ready" : ""
      }`}>
      {/* max-w-6xl, matching Section: the hero used max-w-3xl, so its left edge
          did not line up with any section below it and the page read as two
          different layouts stacked. */}
      <div className="mx-auto w-full max-w-6xl py-28">
        {/* This was the only centred component in the editorial system, and it
            is the first thing every visitor sees in both languages: a centred
            avatar over centred copy over a three-up stat row is the shape every
            generated portfolio has. The copy is left-aligned now and the
            portrait is anchored to the right, so the hero states the same house
            rules as the seventeen pages behind it.

            The image keeps its DOM position and eager/high-priority hints; only
            its grid placement changes, so the deliberate LCP tuning survives and
            mobile still leads with the portrait. */}
        <div className="grid items-center gap-x-16 gap-y-12 md:grid-cols-[1.35fr_1fr]">
          <div className="md:order-2 md:justify-self-end">
            {/* Largest Contentful Paint element. Deliberately not staggered and
                not given a reveal class: Chrome will not accept a fully
                transparent element as an LCP candidate, which previously left
                the page with no measurable LCP at all. */}
            <img
              src={profilePicture}
              alt={t.portraitAlt}
              width="661"
              height="850"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-44 w-44 rounded-full border border-white/15 object-cover sm:h-56 sm:w-56 md:h-64 md:w-64"
              style={{ objectPosition: "center 18%" }}
            />
          </div>

          <div className="md:order-1">
            <p className="label stagger" style={{ "--fade-delay": `${DELAY.label}ms` }}>
              {t.label}
            </p>

            <h1
              className="headline-hero reveal-line mt-6 max-w-[16ch]"
              style={{ "--fade-delay": `${DELAY.headline}ms` }}>
              <span>{t.h1}</span>
            </h1>

            <p
              className="intro stagger mt-8 max-w-[48ch]"
              style={{ "--fade-delay": `${DELAY.intro}ms` }}>
              {t.intro}
            </p>

            <div
              className="stagger mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
              style={{ "--fade-delay": `${DELAY.actions}ms` }}>
              <Link to={contactPath} className="btn-ghost btn-accent">
                {t.ctaPrimary}
              </Link>
              <Link to={servicesPath} className="link-arrow">
                {t.ctaSecondary}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div
              className="stagger mt-10 flex items-center gap-7"
              style={{ "--fade-delay": `${DELAY.socials}ms` }}>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-mute transition-colors duration-300 hover:text-accent"
                aria-label={t.socials.linkedin}>
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-mute transition-colors duration-300 hover:text-accent"
                aria-label={t.socials.github}>
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-paper-mute transition-colors duration-300 hover:text-accent"
                aria-label={t.socials.email}>
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <hr className="rule mt-20" />

        <dl
          className="stagger mt-10 grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-3"
          style={{ "--fade-delay": `${DELAY.stats}ms` }}>
          {t.stats.map((stat) => (
            <div key={stat.label}>
              {/* tabular-nums keeps the row from shifting between locales, which
                  format numbers differently. */}
              <dd className="text-4xl font-light tracking-tight tabular-nums text-gray-100">
                {stat.value}
              </dd>
              <dt className="mt-3 max-w-[24ch] text-sm leading-snug text-paper-mute">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-xs text-paper-mute">{chrome.replyPromise}</p>
      </div>
    </section>
  );
};
