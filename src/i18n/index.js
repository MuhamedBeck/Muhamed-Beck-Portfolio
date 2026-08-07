import { useLocation } from "react-router-dom";
import { DEFAULT_LOCALE, LIVE_LOCALES } from "./locales.js";
import { findRoute } from "../routes/registry.js";

/**
 * Locale of a path, from its URL prefix.
 *
 * German is the default and unprefixed; every other locale lives under its own
 * prefix. Used only as a fallback: the route registry is authoritative, and
 * this covers paths that are not registered (the 404 page, mostly).
 */
export function localeFromPath(pathname) {
  const match = /^\/([a-z]{2})(\/|$)/.exec(pathname);
  const candidate = match?.[1];
  return candidate && candidate !== DEFAULT_LOCALE && LIVE_LOCALES.includes(candidate)
    ? candidate
    : DEFAULT_LOCALE;
}

/** Strips the locale prefix: "/en/services" -> "/services". */
export function basePath(pathname) {
  const locale = localeFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  const stripped = pathname.slice(locale.length + 1);
  return stripped || "/";
}

/** Adds the locale prefix to a default-locale path. */
export function localizePath(locale, pathname) {
  if (locale === DEFAULT_LOCALE) return pathname;
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

/**
 * Locale of the page currently being rendered.
 *
 * Reads the route registry first because that is the source of truth and stays
 * correct regardless of URL shape. Works during the build-time render too:
 * StaticRouter provides useLocation just like BrowserRouter does.
 */
export function useLocale() {
  const { pathname } = useLocation();
  return findRoute(pathname)?.locale ?? localeFromPath(pathname);
}

/**
 * Picks a namespace's strings for a locale, falling back to German.
 *
 * The fallback means a half-finished translation renders German rather than
 * `undefined`. scripts/check-i18n.js still fails the build on a missing key, so
 * the fallback is a safety net rather than a licence to skip translations.
 */
export function pick(namespace, locale) {
  return namespace[locale] ?? namespace[DEFAULT_LOCALE];
}

/**
 * Strings for the current locale.
 *
 * @param {object} namespace a module from src/i18n/dict/, shaped { de, en }.
 *   Must be a STATIC import. A dynamically imported dictionary suspends during
 *   renderToString exactly the way React.lazy does, and the build would
 *   silently prerender pages with no copy in them.
 */
export function useDict(namespace) {
  return pick(namespace, useLocale());
}
