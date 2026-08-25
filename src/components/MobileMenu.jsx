import { useEffect } from "react";
import { Link } from "react-router-dom";
import mnbLogo from "../assets/MNB_Logo.webp";
import { useDict } from "../i18n";
import { LanguageSwitcherRow } from "./LanguageSwitcher";
import { PERSON } from "../content/site";
import nav from "../i18n/dict/nav";
import ui from "../i18n/dict/ui";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const t = useDict(nav);
  const chrome = useDict(ui);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const links = [...t.primary, t.cta];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-hairline bg-ink transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-hairline px-5">
          <Link
            to="/"
            onClick={close}
            className="flex items-center"
            aria-label={chrome.backToHome}>
            <img src={mnbLogo} alt="" width="500" height="500" className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="flex h-11 w-11 items-center justify-center text-paper-mute transition-colors hover:text-white"
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
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-xs tracking-[0.18em] text-gray-300 uppercase transition-all duration-300 hover:bg-white/5 hover:text-white ${
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                  style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : "0ms" }}>
                  {item.label}
                  <span aria-hidden="true" className="text-paper-mute">
                    ↗
                  </span>
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
