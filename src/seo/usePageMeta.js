import { useEffect } from "react";
import {
  DEFAULT_LOCALE,
  DEFAULT_ROBOTS,
  SITE_URL,
  getAlternates,
} from "../routes/registry.js";
import { LOCALES } from "../i18n/locales.js";

// Tags this hook and prerender-meta.js own between them. Marked so a
// client-side navigation can clear exactly the previous route's alternates
// without touching anything hand-written in index.html.
const OWNED = 'data-i18n="alt"';

const head = () => document.head;

const upsertMeta = (attr, key, content) => {
  let el = head().querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    head().appendChild(el);
  }
  el.setAttribute("content", content);
};

const setMetaByName = (name, content) => upsertMeta("name", name, content);
const setMetaByProperty = (property, content) => upsertMeta("property", property, content);

const upsertCanonical = (href) => {
  let el = head().querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    head().appendChild(el);
  }
  el.setAttribute("href", href);
};

const clearOwned = () => {
  head()
    .querySelectorAll(`[${OWNED}]`)
    .forEach((el) => el.remove());
};

const appendOwned = (tag, attrs) => {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  el.setAttribute("data-i18n", "alt");
  head().appendChild(el);
};

/**
 * Keeps the document head in sync with the current route on client-side
 * navigation.
 *
 * Tags are upserted rather than only mutated: hreflang alternates do not exist
 * in index.html for every page (a page without a translated twin emits none),
 * so there is nothing to mutate on the first navigation that needs them.
 *
 * Deliberately does NOT clean up on unmount. Clearing the head between routes
 * would leave a window where a crawler running a headless browser observes a
 * page with no metadata at all.
 *
 * @param {object} route a route entry from src/routes/registry.js
 */
export function usePageMeta(route) {
  const {
    path,
    title,
    description,
    robots = DEFAULT_ROBOTS,
    locale = DEFAULT_LOCALE,
    ogType = "website",
  } = route;

  useEffect(() => {
    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    const localeConfig = LOCALES[locale] ?? LOCALES[DEFAULT_LOCALE];

    document.documentElement.lang = localeConfig.htmlLang;
    // Without this, navigating from an Arabic page to a German one leaves the
    // document right-to-left, and the other way round leaves Arabic laid out
    // left-to-right. Same class of bug as the og:locale note below.
    document.documentElement.dir = localeConfig.dir ?? "ltr";
    document.title = title;

    setMetaByName("title", title);
    setMetaByName("description", description);
    setMetaByName("robots", robots);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", ogType);
    // og:locale was previously never updated on client-side navigation, so
    // moving between locales left the wrong one in the DOM.
    setMetaByProperty("og:locale", localeConfig.ogLocale);
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    upsertCanonical(url);
    setMetaByProperty("og:url", url);
    setMetaByName("twitter:url", url);

    // Replace the previous route's alternates wholesale. Remove-then-add is
    // idempotent and avoids reconciling two lists of different lengths.
    clearOwned();
    const alternates = getAlternates(route);
    for (const alternate of alternates) {
      appendOwned("link", {
        rel: "alternate",
        hreflang: (LOCALES[alternate.locale] ?? LOCALES[DEFAULT_LOCALE]).hreflang,
        href: `${SITE_URL}${alternate.path}`,
      });
    }
    if (alternates.length) {
      const fallback =
        alternates.find((alternate) => alternate.locale === DEFAULT_LOCALE) ?? alternates[0];
      appendOwned("link", {
        rel: "alternate",
        hreflang: "x-default",
        href: `${SITE_URL}${fallback.path}`,
      });
      for (const alternate of alternates) {
        if (alternate.locale === locale) continue;
        appendOwned("meta", {
          property: "og:locale:alternate",
          content: (LOCALES[alternate.locale] ?? LOCALES[DEFAULT_LOCALE]).ogLocale,
        });
      }
    }
    // `route` is a stable object from the registry, so the primitive deps below
    // fully describe it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, title, description, robots, locale, ogType]);
}
