// Locale configuration. Imported by React components, by generate-sitemap.js
// and by prerender-meta.js, so it must stay plain JavaScript with no JSX and no
// React imports: the build scripts load it under bare `node`.

export const DEFAULT_LOCALE = "de";

/**
 * Locales that are actually shipped.
 *
 * This is the feature gate for the whole translation layer: it controls which
 * flags the language switcher offers and which hreflang alternates are
 * considered. A locale can be built out behind the scenes and switched on by
 * adding it here.
 */
export const LIVE_LOCALES = ["de", "en"];

/**
 * @property htmlLang  value for <html lang> and for the hreflang attribute
 * @property ogLocale  value for og:locale
 * @property hreflang  value for rel="alternate" hreflang
 * @property intlLocale locale tag for Intl formatters
 * @property endonym   language name in its own language, for the switcher label
 * @property flag      country code of the flag icon (gb, not us: British English
 *                     is the convention for an EU-facing site)
 */
export const LOCALES = {
  de: {
    htmlLang: "de",
    ogLocale: "de_DE",
    hreflang: "de",
    intlLocale: "de-DE",
    endonym: "Deutsch",
    flag: "de",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    hreflang: "en",
    intlLocale: "en-US",
    endonym: "English",
    flag: "gb",
  },
};

export const isLiveLocale = (locale) => LIVE_LOCALES.includes(locale);

/** Locale config, falling back to German rather than throwing. */
export const localeConfig = (locale) => LOCALES[locale] ?? LOCALES[DEFAULT_LOCALE];
