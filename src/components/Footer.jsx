import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDict, useLocale } from "../i18n";
import { ROUTES } from "../routes/registry.js";
import { CONTACT, PERSON, SOCIAL } from "../content/site";
import nav from "../i18n/dict/nav";
import ui from "../i18n/dict/ui";

// Columns are built from the route registry rather than a hand-written list, so
// a new landing page is linked from every page on the site the moment it is
// registered. That internal link is what keeps crawl depth at one hop, and it
// is the cheapest distribution any new page gets.
const columnFor = (locale, prefix) =>
  ROUTES.filter(
    (route) => route.locale === locale && route.path.startsWith(prefix)
  ).map((route) => ({ to: route.path, label: route.h1 }));

const FooterColumn = ({ title, links }) =>
  links.length ? (
    <div>
      <h2 className="label !text-paper-mute">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm leading-snug text-gray-400 transition-colors duration-300 hover:text-gray-100">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

const Footer = () => {
  const t = useDict(nav).footer;
  const chrome = useDict(ui);
  const locale = useLocale();

  const services = columnFor(locale, locale === "de" ? "/leistungen/" : "/en/services/");
  const guides = columnFor(locale, "/ratgeber/");
  const projects = columnFor(locale, locale === "de" ? "/projekte/" : "/en/projects/");

  return (
    <footer
      className="w-full border-t border-white/10 bg-[#0a0a0a] pt-16"
      style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 20px))" }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          <FooterColumn title={t.services} links={services} />
          <FooterColumn title={t.guides} links={guides} />
          <FooterColumn title={t.projects} links={projects} />

          <div>
            <h2 className="label !text-paper-mute">{t.contact}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-100"
                  aria-label={chrome.emailAria}>
                  <FaEnvelope className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-100"
                  aria-label={chrome.phoneAria}>
                  <FaPhone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-4">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-mute transition-colors duration-300 hover:text-gray-100"
                aria-label={chrome.linkedinAria}>
                <FaLinkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-mute transition-colors duration-300 hover:text-gray-100"
                aria-label={chrome.githubAria}>
                <FaGithub className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <hr className="rule mt-14" />

        <div className="flex flex-col items-center gap-3 pt-6 text-xs text-paper-mute sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {PERSON.name}. {t.rights}
          </p>
          <p className="hidden sm:block">{t.tagline}</p>
          <div className="flex items-center gap-5">
            {/* Legal pages stay German regardless of interface language: they
                are the legally binding text and a translation would only add
                exposure. */}
            <Link to="/impressum" className="transition-colors hover:text-gray-300">
              {t.imprint}
            </Link>
            <Link to="/datenschutz" className="transition-colors hover:text-gray-300">
              {t.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
