import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useDict, useLocale } from "../../../i18n";
import { sectionsFor } from "../../../routes/registry.js";
import { CONTACT, mailtoHref } from "../../../content/site";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import woerter from "../../../i18n/dict/dolmetscher";
import nav from "../../../i18n/dict/nav";
import ui from "../../../i18n/dict/ui";

const VERWEIS = "-my-1.5 inline-flex items-center gap-2 py-1.5 transition-colors duration-300 hover:text-paper";

/**
 * Schlanker Fuß der Dolmetscher-Seite: Kontakt, Rechtstexte, Verweis zur
 * IT-Seite. Impressum und Datenschutz gibt es nur auf Deutsch; die englische
 * und die arabische Fassung sagen das dazu.
 */
export const DolmetscherFuss = () => {
  const t = useDict(woerter);
  const chrome = useDict(ui);
  const rechtliches = useDict(nav).footer;
  const locale = useLocale();

  return (
    <footer
      className="w-full border-t border-hairline bg-ink pt-12"
      style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 20px))" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 text-sm text-paper-soft">
        <div>
          <h2 className="text-sm font-medium text-paper">{t.fuss.kontakt}</h2>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href={`tel:${CONTACT.phone}`} className={VERWEIS}>
                <FaPhone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <bdi dir="ltr">{CONTACT.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              <a href={mailtoHref(chrome.mailBetreff)} className={VERWEIS}>
                <FaEnvelope className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <bdi>{CONTACT.email}</bdi>
              </a>
            </li>
          </ul>
        </div>

        <hr className="rule" />

        <div className="flex flex-col gap-4 text-xs text-paper-mute sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/impressum" className="-my-2 py-2 transition-colors hover:text-paper-dim">
              {rechtliches.imprint}
            </a>
            <a href="/datenschutz" className="-my-2 py-2 transition-colors hover:text-paper-dim">
              {rechtliches.privacy}
            </a>
            {t.fuss.rechtstexteHinweis ? <span>{t.fuss.rechtstexteHinweis}</span> : null}
          </div>
          <a href={sectionsFor(locale).home} className="-my-2 py-2 transition-colors hover:text-paper-dim">
            {t.fuss.itVerweis}
          </a>
          <div className="md:hidden">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
};
