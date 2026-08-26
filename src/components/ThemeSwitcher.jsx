import { useSyncExternalStore } from "react";
import { useDict } from "../i18n";
import ui from "../i18n/dict/ui";

/**
 * Sun and moon toggle between the light and the dark palette.
 *
 * Three states, not two, and that is the whole difficulty. A visitor either
 * chose a theme, in which case data-theme is stamped on <html> and wins, or
 * chose nothing, in which case prefers-color-scheme decides and the stamp must
 * stay absent so the OS keeps control. Writing "dark" on every visit would look
 * identical on a dark system and silently break the light one.
 *
 * The stamp is applied before the first paint by the inline script in
 * index.html. This component only reads what that script decided and changes it
 * on click, which is why there is no flash: React never gets to decide the
 * initial value.
 *
 * During the build-time render there is no document, so it renders the dark
 * state. The prerendered markup is corrected on the first client frame, before
 * paint, by the same effect that syncs the label.
 */
const SPEICHER = "theme";

const systemIstHell = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

/* The theme is not React state, it is a property of the document, and two
   things outside React can change it: the visitor clicking here, and the
   operating system flipping while no explicit choice is stored.
   useSyncExternalStore is built for exactly that. Reading it into useState via
   an effect would instead cause a second render on every page load and paint
   the wrong icon for one frame. */
const abonnieren = (beiAenderung) => {
  const abfrage = window.matchMedia("(prefers-color-scheme: light)");
  const beobachter = new MutationObserver(beiAenderung);
  abfrage.addEventListener("change", beiAenderung);
  beobachter.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    abfrage.removeEventListener("change", beiAenderung);
    beobachter.disconnect();
  };
};

const lesen = () =>
  document.documentElement.dataset.theme ?? (systemIstHell() ? "light" : "dark");

// The build-time render has no document. Dark is the site's default palette,
// and the inline script corrects the markup before the first paint anyway.
const lesenImBuild = () => "dark";

export const ThemeSwitcher = ({ className = "" }) => {
  const t = useDict(ui);
  const thema = useSyncExternalStore(abonnieren, lesen, lesenImBuild);

  const umschalten = () => {
    const neu = thema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = neu;
    try {
      localStorage.setItem(SPEICHER, neu);
    } catch {
      // No storage: the choice still applies to this page view.
    }
    // The browser paints its own chrome from this, so it has to move too.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.content = getComputedStyle(document.documentElement)
        .getPropertyValue(neu === "light" ? "--light-ink" : "--color-ink")
        .trim() || (neu === "light" ? "#fafafb" : "#0a0a0a");
    }
    // No setState: the MutationObserver above sees the attribute change and
    // re-renders from the document, which is the single source of truth.
  };

  const zielIstHell = thema === "dark";

  return (
    <button
      type="button"
      onClick={umschalten}
      className={`flex h-11 w-11 items-center justify-center rounded-full text-paper-soft transition-colors duration-300 hover:text-paper ${className}`}
      aria-label={zielIstHell ? t.themeToLight : t.themeToDark}
      title={zielIstHell ? t.themeToLight : t.themeToDark}>
      {zielIstHell ? (
        /* Currently dark, so offer the sun. */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      ) : (
        /* Currently light, so offer the moon. */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z" />
        </svg>
      )}
    </button>
  );
};
