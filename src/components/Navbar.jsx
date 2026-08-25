import { Link } from "react-router-dom";
import mnbLogo from "../assets/MNB_Logo.webp";
import { useDict, useLocale } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import nav from "../i18n/dict/nav";
import ui from "../i18n/dict/ui";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const t = useDict(nav);
  const chrome = useDict(ui);
  const locale = useLocale();
  const homePath = locale === "de" ? "/" : "/en";

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-hairline bg-[rgba(10,10,10,0.85)] backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to={homePath} className="flex items-center" aria-label={chrome.backToHome}>
            <img
              src={mnbLogo}
              alt=""
              width="500"
              height="500"
              className="h-11 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {t.primary.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs tracking-[0.18em] text-gray-400 uppercase transition-colors duration-300 hover:text-gray-100">
                {item.label}
              </Link>
            ))}
            <Link to={t.cta.to} className="btn-ghost !min-h-0 !py-2.5">
              {t.cta.label}
            </Link>
            {/* Outside the link group so it does not inherit its gap: the
                switcher supplies its own 44px touch column. */}
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-gray-300 md:hidden"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? chrome.closeMenu : chrome.openMenu}
            aria-expanded={menuOpen}>
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true">
              <path d="M0 1h20M0 7h20M0 13h20" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
