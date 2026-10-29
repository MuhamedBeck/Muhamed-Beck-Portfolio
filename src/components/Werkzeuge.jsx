import { Marke } from "./icons/Marke";
import { MARKEN } from "./icons/marken";

/**
 * The tools someone works with, each with its mark, as one wrapping row.
 *
 * Shared by the CV and /ueber-mich, so a tool looks the same on both pages.
 * An entry is a key in MARKEN, or { marke, name } where the page needs a more
 * precise name than the brand ("React 19", "GitLab CI/CD"). `gross` matches
 * the larger body text of /ueber-mich.
 */
export const Werkzeuge = ({ werkzeuge, gross = false }) => (
  <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
    {werkzeuge.map((eintrag) => {
      const schluessel = typeof eintrag === "string" ? eintrag : eintrag.marke;
      const marke = MARKEN[schluessel];
      return (
        <li
          key={schluessel}
          className={`inline-flex items-center gap-2 text-paper-soft ${gross ? "text-base" : "text-sm"}`}>
          <Marke marke={marke} size={gross ? 20 : 18} />
          {eintrag.name ?? marke.name}
        </li>
      );
    })}
  </ul>
);
