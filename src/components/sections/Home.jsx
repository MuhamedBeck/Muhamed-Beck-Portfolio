import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import profilePicture from "../../assets/profilepicture.webp";
import { useDict, useLocale } from "../../i18n";
import home from "../../i18n/dict/home";
import ui from "../../i18n/dict/ui";
import { CONTACT, SOCIAL } from "../../content/site";
import { LinkArrow } from "../LinkArrow";
import { sectionsFor } from "../../routes/registry.js";

// Entrance choreography, in milliseconds. One ladder rather than six pieces of
// component state driving six timers: the previous version reset and restarted
// all of them from an effect, which is what the cascading-render lint rule was
// objecting to, and it could not respect prefers-reduced-motion.
const DELAY = {
  label: 0,
  headline: 80,
  intro: 220,
  actions: 320,
  services: 400,
  socials: 520,
  stats: 600,
};

/**
 * @param {object} props
 * @param {boolean} [props.isLoaded] Gates the entrance animation until the splash
 *   screen has finished. True during the build-time render, so the prerendered
 *   HTML always carries `is-ready` and the page is fully visible without JS.
 * @param {Array<{kurz: string, to: string, anker?: string, auszeichnung?: string}>} [props.services]
 *   The service register in the right column.
 *
 *   Passed in rather than imported, and that is the whole point. This component
 *   is the hero of all three homepages: German through Startseite.jsx, English
 *   through App.jsx, Arabic through ArabicHome.jsx. Importing LEISTUNGEN here
 *   would put German content and German URLs on /en and /ar, where those seven
 *   pages do not exist — dead links in the first screen, in the one place a
 *   visitor decides whether to stay. Each homepage owns its own list and points
 *   it at targets that exist in its locale.
 *
 *   Empty by default, so a caller that passes nothing simply gets no register
 *   instead of a broken one.
 */
export const Home = ({ isLoaded = true, services = [] }) => {
  const t = useDict(home);
  const chrome = useDict(ui);
  const locale = useLocale();
  const { services: servicesPath, contact: contactPath } = sectionsFor(locale);

  return (
    <section
      id="home"
      className={`relative flex min-h-[100dvh] items-center overflow-x-hidden px-4 ${
        isLoaded ? "is-ready" : ""
      }`}>
      {/* max-w-6xl, matching Section: the hero used max-w-3xl, so its left edge
          did not line up with any section below it and the page read as two
          different layouts stacked. */}
      <div className="mx-auto w-full max-w-6xl py-20">
        {/* Three children, one per job, because the mobile order and the desktop
            order disagree.

            DOM order is portrait, promise, register — which is exactly the
            mobile order, so no reordering is needed there and the portrait stays
            in first position for the LCP preload. On desktop the portrait and
            the register stack in the right column while the promise fills the
            left, which is placed explicitly by column and row rather than with
            `order`, because `order` cannot span two rows.

            The register sits beside the promise rather than beneath it for one
            measured reason: seven rows below a full-height promise block land at
            roughly y=950 on a 900px viewport, i.e. below the fold, which is the
            problem this layout exists to solve. */}
        <div className="grid items-start gap-x-16 gap-y-8 md:grid-cols-[1.15fr_1fr]">
          {/* Largest Contentful Paint element. Deliberately not staggered and
              not given a reveal class: Chrome will not accept a fully
              transparent element as an LCP candidate, which previously left the
              page with no measurable LCP at all.

              Its size is also load-bearing, not decorative. The margin over the
              h1 text rectangle is only about 1.24x, so shrinking the portrait to
              fit a tighter layout would hand LCP to the headline and quietly
              undo the preload in prerender-meta.js. That is why the register
              went into this column instead of the portrait getting smaller. */}
          <div className="md:col-start-2 md:row-start-1 md:justify-self-end">
            <img
              src={profilePicture}
              alt={t.portraitAlt}
              width="661"
              height="850"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-52 w-52 rounded-full border border-hairline-strong object-cover sm:h-64 sm:w-64 md:h-80 md:w-80"
              style={{ objectPosition: "center 18%" }}
            />
          </div>

          {/* What is promised, and the one action that follows from it. */}
          <div className="md:col-start-1 md:row-start-1">
            <p className="label stagger" style={{ "--fade-delay": `${DELAY.label}ms` }}>
              {t.label}
            </p>

            <h1
              className="headline-hero reveal-line mt-6 max-w-[16ch]"
              style={{ "--fade-delay": `${DELAY.headline}ms` }}>
              <span>{t.h1}</span>
            </h1>

            {/* One sentence, not three. The old intro listed in prose what now
                stands beside it as links, so the visitor read the same offer
                twice before reaching anything clickable. What stays is the
                entity sentence — name, role, city — which is what an assistant
                asked "who is this" matches against LinkedIn and the Impressum. */}
            <p
              className="intro stagger mt-7 max-w-[42ch]"
              style={{ "--fade-delay": `${DELAY.intro}ms` }}>
              {t.introKurz}
            </p>

            {/* One button, not two. The navigation already carries "Projekt
                anfragen" pointing at the same page, so the old hero put three
                links to /kontakt in the first screen and the secondary link
                competed with the primary one. The register on the right now does
                the job the "Leistungen ansehen" link used to do, and does it
                better, because it names the seven destinations instead of
                hiding them behind one word. */}
            <div
              className="stagger mt-9"
              style={{ "--fade-delay": `${DELAY.actions}ms` }}>
              <Link to={contactPath} className="btn-ghost btn-accent">
                {t.ctaPrimary}
              </Link>
              {/* The reply promise belongs under the button, where the decision
                  is made, not at the foot of the hero where it used to sit. */}
              <p className="mt-4 text-xs text-paper-mute">{chrome.replyPromise}</p>
            </div>

          </div>

          {/* The register: what can actually be commissioned. */}
          {services.length ? (
            <nav
              aria-labelledby="hero-leistungen"
              className="stagger md:col-start-2 md:row-start-2"
              style={{ "--fade-delay": `${DELAY.services}ms` }}>
              <h2 id="hero-leistungen" className="label">
                {t.servicesHeading}
              </h2>

              <ul className="border-b border-hairline">
                {services.map((leistung) => (
                  <li key={leistung.to} className="border-t border-hairline">
                    {/* justify-between with a result on the right is the reason
                        this is a register and not a table of contents: seven
                        names are a menu, seven names each carrying an outcome
                        are an offer. items-baseline keeps the small figure
                        sitting on the same line as the larger name. */}
                    <Link
                      to={leistung.to}
                      className="group flex items-baseline justify-between gap-x-5 py-2.5">
                      <span className="text-paper underline-offset-4 group-hover:underline">
                        {leistung.kurz}
                        {leistung.auszeichnung ? (
                          <span className="ms-2 align-[0.1em] text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                            {leistung.auszeichnung}
                          </span>
                        ) : null}
                      </span>
                      {leistung.anker ? (
                        <span className="shrink-0 text-xs text-paper-mute">
                          {leistung.anker}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* The rate over the fold. It is the number every buyer looks for
                  first, and stating it here filters the wrong enquiries before
                  they reach the form. bdi because the figure and the euro sign
                  are neutral characters that would otherwise reorder in Arabic. */}
              <p className="mt-5 text-xs leading-relaxed text-paper-mute">
                <bdi>{t.preisZeile}</bdi>
              </p>

              <Link to={servicesPath} className="link-arrow">
                {t.ctaSecondary}
                <LinkArrow />
              </Link>
            </nav>
          ) : null}

          {/* The proof sits under the promise rather than 400px below it. The
              left column ended at y=498 while the right ran to y=986, so the
              composition visibly tipped; these two figures fill that gap and
              belong next to the claim they support. */}
          <dl
            className="stagger grid grid-cols-2 gap-x-10 gap-y-8 border-t border-hairline pt-8 md:col-start-1 md:row-start-2"
            style={{ "--fade-delay": `${DELAY.stats}ms` }}>
            {t.stats.map((stat) => (
              <div key={stat.label}>
                {/* tabular-nums keeps the row from shifting between locales,
                    which format numbers differently. */}
                <dd className="text-4xl font-light tracking-tight tabular-nums text-paper">
                  {stat.value}
                </dd>
                <dt className="mt-3 max-w-[24ch] text-sm leading-snug text-paper-mute">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <hr className="rule mt-16" />

        {/* Moved out of the first screen. These are person marks, not reasons to
            commission anything, and above the fold they competed with the one
            button that is. */}
        <div
          className="stagger mt-10 flex items-center gap-7"
          style={{ "--fade-delay": `${DELAY.socials}ms` }}>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper-soft transition-colors duration-300 hover:text-accent"
            aria-label={t.socials.linkedin}>
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper-soft transition-colors duration-300 hover:text-accent"
            aria-label={t.socials.github}>
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-paper-soft transition-colors duration-300 hover:text-accent"
            aria-label={t.socials.email}>
            <FaEnvelope className="h-5 w-5" />
          </a>
        </div>


        {/* Provenance for the figures above. It was written months ago and sat
            unrendered in the dictionary; a number without its source is the one
            thing a reader cannot check, and naming employer versus freelance
            client is exactly what makes these checkable. */}
        <p className="mt-8 max-w-[72ch] text-sm leading-relaxed text-paper-mute">
          {t.statsNote}
        </p>
      </div>
    </section>
  );
};
