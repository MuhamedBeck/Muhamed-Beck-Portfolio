import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { TechMarquee } from "../TechMarquee";
import { Home } from "../sections/Home";
import { Section, SectionHeader } from "../Section";
import { useDict } from "../../i18n";
import { useRouteMeta } from "../../seo/useRouteMeta";
import { LEISTUNGEN } from "../../content/leistungen.de";
import { PROJEKTE } from "../../content/projekte.de";
import startseite from "../../i18n/dict/startseite";

/**
 * German homepage.
 *
 * Deliberately not a translation of the English page. Someone arriving from
 * "n8n Experte" is evaluating a supplier, so the page answers what can be
 * automated, what it costs and what it has produced before. The English page
 * keeps its portfolio shape because its audience is recruiters and remote
 * clients, who are looking for a CV.
 */
export const Startseite = () => {
  useRouteMeta();
  const t = useDict(startseite);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] text-gray-100 bg-ink">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <Home />
        <TechMarquee />

        <Section id="leistungen">
          <SectionHeader
            label={t.services.label}
            headline={t.services.headline}
            intro={t.services.intro}
          />
          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {LEISTUNGEN.map((leistung, index) => (
              <li
                key={leistung.path}
                className="stagger border-t border-hairline pt-6"
                style={{ "--fade-delay": `${(index % 2) * 80}ms` }}>
                <Link to={leistung.path} className="group block">
                  <h3 className="headline-sub underline-offset-[0.18em] group-hover:underline">
                    {leistung.h1}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {leistung.teaser}
                  </p>
                  <span className="link-arrow mt-3">
                    {leistung.badge}
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Link to="/leistungen" className="btn-ghost">
              {t.services.all}
            </Link>
          </div>
        </Section>

        <Section id="projekte">
          <SectionHeader label={t.cases.label} headline={t.cases.headline} />
          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {PROJEKTE.map((projekt, index) => (
              <li
                key={projekt.path}
                className="stagger border-t border-hairline pt-6"
                style={{ "--fade-delay": `${index * 80}ms` }}>
                <Link to={projekt.path} className="group block">
                  <h3 className="headline-sub underline-offset-[0.18em] group-hover:underline">
                    {projekt.title}
                  </h3>
                  <p className="mt-3 text-sm text-paper-mute">{projekt.subtitle}</p>
                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                    {projekt.stats.map((stat) => (
                      <div key={stat.label}>
                        <dd className="text-2xl font-light tabular-nums text-gray-100">
                          {stat.value}
                        </dd>
                        <dt className="mt-1 text-xs text-paper-mute">{stat.label}</dt>
                      </div>
                    ))}
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="ablauf">
          <SectionHeader label={t.approach.label} headline={t.approach.headline} />
          <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.approach.steps.map((step, index) => (
              <li
                key={step.title}
                className="stagger border-t border-hairline pt-6"
                style={{ "--fade-delay": `${index * 70}ms` }}>
                <span className="text-xs tracking-[0.25em] text-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-normal text-gray-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{step.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Visible FAQ and the FAQPage JSON-LD read from this same array, so the
            two cannot drift apart. */}
        <Section id="faq">
          <SectionHeader label={t.faq.label} headline={t.faq.headline} />
          <dl className="mt-14 max-w-3xl">
            {t.faq.items.map((item, index) => (
              <div
                key={item.q}
                className="stagger border-t border-hairline py-7 md:grid md:grid-cols-[1fr_1.4fr] md:gap-x-12"
                style={{ "--fade-delay": `${Math.min(index, 3) * 60}ms` }}>
                <dt className="text-lg leading-snug font-normal text-gray-100">{item.q}</dt>
                <dd className="mt-3 leading-relaxed text-gray-400 md:mt-0">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="kontakt">
          <div className="max-w-2xl">
            <h2 className="headline">{t.cta.headline}</h2>
            <p className="intro mt-6">{t.cta.text}</p>
            <Link to="/kontakt" className="btn-ghost btn-accent mt-10">
              {t.cta.button}
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default Startseite;
