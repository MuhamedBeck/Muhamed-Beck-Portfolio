import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mnbLogo from "../assets/MNB_Logo.webp";
import { useDict, useLocale } from "../i18n";
import { sectionsFor } from "../routes/registry.js";
import { LanguageSwitcherRow } from "./LanguageSwitcher";
import { PERSON } from "../content/site";
import nav from "../i18n/dict/nav";
import ui from "../i18n/dict/ui";
import { LinkArrow } from "./LinkArrow";
import { sperreScrollen } from "./scrollSperre";

/* The button in the navbar that opens the drawer. Focus goes back to it when
   the drawer is dismissed, so a keyboard user does not land on the page start. */
export const MENUE_KNOPF_ID = "menue-knopf";
export const MENUE_ID = "menue";

const FOKUSSIERBAR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The drawer on small screens, as a modal dialog.
 *
 * Until 07.11.2026 it was only moved off screen when closed, so on every page
 * the Tab key walked through ten invisible links, Escape did nothing, focus
 * stayed behind the overlay and the page scrolled on underneath it. Closed it
 * is now inert, which takes it out of the tab order and the accessibility
 * tree while the slide-out still plays. Open, it takes focus, keeps it, and
 * hands it back to the menu button on Escape, on the close button and on a
 * tap beside it. Following a link closes it without that hand-back, because
 * focus then belongs to the new page.
 */
export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const t = useDict(nav);
  const chrome = useDict(ui);
  const homePath = sectionsFor(useLocale()).home;
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    return sperreScrollen();
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) closeButtonRef.current?.focus();
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const dismiss = () => {
    setMenuOpen(false);
    document.getElementById(MENUE_KNOPF_ID)?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById(MENUE_KNOPF_ID)?.focus();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const ziele = [...drawerRef.current.querySelectorAll(FOKUSSIERBAR)];
      if (!ziele.length) return;
      const erstes = ziele[0];
      const letztes = ziele[ziele.length - 1];
      if (event.shiftKey && document.activeElement === erstes) {
        event.preventDefault();
        letztes.focus();
      } else if (!event.shiftKey && document.activeElement === letztes) {
        event.preventDefault();
        erstes.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, setMenuOpen]);

  const links = [...t.primary, t.cta];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={dismiss}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        id={MENUE_ID}
        role="dialog"
        aria-modal="true"
        aria-label={chrome.menu}
        inert={!menuOpen}
        className={`fixed top-0 end-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-s border-hairline bg-ink transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-hairline px-5">
          {/* The home of the page's own language, as in the navbar. It pointed
              at "/" on every page, so the English and Arabic menus led to the
              German homepage. */}
          <Link
            to={homePath}
            onClick={close}
            className="flex items-center"
            aria-label={chrome.backToHome}>
            <img
              src={mnbLogo}
              alt="Muhamed Beck"
              width="500"
              height="500"
              className="site-logo h-8 w-auto"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={dismiss}
            className="flex h-11 w-11 items-center justify-center text-paper-mute transition-colors hover:text-paper"
            aria-label={chrome.closeMenu}>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* overflow-y-auto plus overscroll-contain stops the page behind the
            drawer from scrolling through on iOS. */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-6">
          <ul>
            {links.map((item, index) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={close}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-xs tracking-[0.18em] text-paper-dim uppercase transition-all duration-300 hover:bg-surface hover:text-paper ${
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 rtl:-translate-x-6 opacity-0"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : "0ms" }}>
                  {item.label}
                  <LinkArrow className="text-paper-mute" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-between border-t border-hairline px-5 py-3">
          <p className="text-xs text-paper-mute">
            © {new Date().getFullYear()} {PERSON.name}
          </p>
          {/* A row rather than a dropdown: there is room inside the drawer, and
              an overlay within an overlay is awkward to dismiss. */}
          <LanguageSwitcherRow onNavigate={close} />
        </div>
      </div>
    </>
  );
};
