import { useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useDict, useLocale } from "../../../i18n";
import { localeConfig } from "../../../i18n/locales.js";
import { findRoute, getAlternates, getGroupRoute } from "../../../routes/registry.js";
import { CONTACT, whatsappHref } from "../../../content/site";
import { ThemeSwitcher } from "../../ThemeSwitcher";
import { Marke } from "../../icons/Marke";
import { WHATSAPP_MARKE } from "./whatsappZeichen";
import woerter from "../../../i18n/dict/dolmetscher";
import ui from "../../../i18n/dict/ui";

// Deutsch zuerst, dann Arabisch: die beiden Sprachen, um die es geht.
const REIHENFOLGE = ["de", "ar", "en"];

const KNOPF =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center text-paper-soft transition-colors duration-300 hover:text-paper";

/**
 * Schlanke Kopfzeile der Dolmetscher-Seite, ohne IT-Navigation.
 *
 * Die Sprachwahl führt mit vollen Seitenaufrufen (einfache <a>), damit
 * Leserichtung, Schrift und das Vorladen der arabischen Schrift aus dem
 * vorgerenderten HTML kommen und nicht erst nach dem ersten Bild umschalten.
 * Feststehend und 64 px hoch wie die Navigation, auf die PageShell rechnet.
 */
export const DolmetscherKopf = () => {
  const t = useDict(woerter);
  const chrome = useDict(ui);
  const locale = useLocale();
  const { pathname } = useLocation();
  const route = findRoute(pathname);
  const ziele = new Map((route ? getAlternates(route) : []).map((r) => [r.locale, r.path]));
  /* Der Name führt zur Dolmetscher-Seite der Sprache, auch von einer
     Unterseite wie dem Kosten-Ratgeber aus. */
  const startseite = getGroupRoute("dolmetscher", locale)?.path ?? pathname;

  return (
    <header className="site-nav fixed top-0 z-40 w-full border-b border-hairline bg-ink/85 backdrop-blur-lg">
      <a href="#inhalt" className="skip-link">
        {chrome.skipToContent}
      </a>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-3">
          <a href={startseite} className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-paper">{t.kopf.name}</span>
            <span className="hidden text-xs text-paper-mute md:block">{t.kopf.rolle}</span>
          </a>

          <div className="flex shrink-0 items-center">
            <nav className="sprachwahl flex items-center" aria-label={chrome.languageSwitcher}>
              {REIHENFOLGE.filter((sprache) => ziele.has(sprache)).map((sprache) => {
                const config = localeConfig(sprache);
                const aktiv = sprache === locale;
                return (
                  <a
                    key={sprache}
                    href={ziele.get(sprache)}
                    hrefLang={config.hreflang}
                    lang={config.htmlLang}
                    aria-current={aktiv ? "page" : undefined}
                    className={`h-11 items-center px-1.5 text-xs transition-colors duration-300 hover:text-paper ${
                      aktiv ? "hidden text-paper md:inline-flex" : "inline-flex text-paper-dim"
                    }`}>
                    {config.endonym}
                  </a>
                );
              })}
            </nav>
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            <a
              href={whatsappHref(t.kopf.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className={KNOPF}
              aria-label={t.kopf.whatsappAria}>
              <Marke marke={WHATSAPP_MARKE} size={20} />
            </a>
            <a href={`tel:${CONTACT.phone}`} className={KNOPF} aria-label={t.kopf.anrufAria}>
              <FaPhone className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
