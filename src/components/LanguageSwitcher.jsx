import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { LIVE_LOCALES, localeConfig } from "../i18n/locales.js";
import { localeFromPath, useDict } from "../i18n";
import { findRoute, getAlternates, getHome } from "../routes/registry.js";
import { Flag } from "./icons/FlagIcons";
import ui from "../i18n/dict/ui";

/**
 * Where each locale's version of the current page lives.
 *
 * Most pages have no counterpart: the German service pages and articles target
 * German search intent and are deliberately not translated. Those fall back to
 * the target locale's homepage, which is a useful destination rather than a
 * dead end.
 */
function useSwitchTargets() {
  const { pathname } = useLocation();
  const route = findRoute(pathname);
  const current = route?.locale ?? localeFromPath(pathname);
  const twins = new Map(
    (route ? getAlternates(route) : []).map((alternate) => [alternate.locale, alternate.path])
  );

  return LIVE_LOCALES.map((locale) => ({
    locale,
    ...localeConfig(locale),
    path: twins.get(locale) ?? getHome(locale)?.path ?? "/",
    isCurrent: locale === current,
  }));
}

const FlagLink = ({ target, onNavigate, ariaCurrent }) => (
  <Link
    to={target.path}
    className="lang-switch__column lang-switch__item"
    hrefLang={target.hreflang}
    lang={target.htmlLang}
    aria-label={target.endonym}
    title={target.endonym}
    aria-current={ariaCurrent}
    onClick={onNavigate}>
    <Flag code={target.flag} />
  </Link>
);

/**
 * Desktop language switcher: a flag-only <details> dropdown.
 *
 * Deliberately uncontrolled. Driving <details open> from React state risks
 * disagreeing with the prerendered markup, and the native element already
 * provides keyboard operation and works with JavaScript disabled.
 */
export const LanguageSwitcher = ({ className = "" }) => {
  const t = useDict(ui);
  const targets = useSwitchTargets();
  const ref = useRef(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const onPointerDown = (event) => {
      if (details.open && !details.contains(event.target)) details.open = false;
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape" || !details.open) return;
      // Return focus to the trigger when it was inside the menu, otherwise it
      // lands on a collapsed element and effectively disappears.
      const focusWasInside = details.contains(document.activeElement);
      details.open = false;
      if (focusWasInside) details.querySelector("summary")?.focus();
    };

    // Scoped to this instance's ref rather than document.querySelector: the
    // navbar and the mobile drawer each render a switcher, and a document-wide
    // lookup would always act on the first one.
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (LIVE_LOCALES.length < 2) return null;

  const current = targets.find((target) => target.isCurrent) ?? targets[0];
  const others = targets.filter((target) => !target.isCurrent);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className={`lang-switch relative ${className}`}>
      <summary
        className="flex h-11 cursor-pointer list-none items-center"
        aria-label={`${t.languageSwitcher}, ${current.endonym}`}
        title={current.endonym}>
        {/* Fixed-width column: the flags in the menu line up with this one. */}
        <span className="lang-switch__column">
          <Flag code={current.flag} />
        </span>
        <svg
          className="lang-switch__chevron"
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <ul className="lang-switch__menu absolute top-full start-0 z-30">
        {others.map((target) => (
          <li key={target.locale}>
            <FlagLink target={target} onNavigate={close} />
          </li>
        ))}
      </ul>
    </details>
  );
};

/**
 * Mobile variant: every flag in a row.
 *
 * No dropdown here on purpose. Inside the slide-in drawer there is room for all
 * of them, and an overlay within an overlay is awkward to dismiss.
 */
export const LanguageSwitcherRow = ({ onNavigate }) => {
  const t = useDict(ui);
  const targets = useSwitchTargets();

  if (LIVE_LOCALES.length < 2) return null;

  return (
    <ul className="flex items-center gap-x-2" aria-label={t.languageSwitcher}>
      {targets.map((target) => (
        <li key={target.locale}>
          <FlagLink
            target={target}
            onNavigate={onNavigate}
            ariaCurrent={target.isCurrent ? "true" : undefined}
          />
        </li>
      ))}
    </ul>
  );
};
