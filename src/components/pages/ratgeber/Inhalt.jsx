import { useEffect, useState } from "react";
import { anker } from "./anker";

/**
 * Table of contents for a guide.
 *
 * The guides run to twelve screens with nothing beside the 68-character text
 * column, so a reader who came for one answer had to scroll for it. On wide
 * screens the list stands in that empty column and stays in view, marking the
 * section being read; on narrow ones it is a collapsed list above the text.
 *
 * The marking needs the browser, so the prerendered page shows the plain list
 * and the effect adds the highlight; the links work either way.
 */
export const Inhalt = ({ abschnitte, minuten, aufklappbar = false }) => {
  const [aktiv, setAktiv] = useState(null);

  /* Current is the last heading that has passed the upper edge, measured on
     scroll. An IntersectionObserver band was tried first and missed exactly the
     case that matters: a click in this list jumps the heading to its
     scroll margin, above the band, and nothing was marked. */
  useEffect(() => {
    if (aufklappbar) return undefined;
    const ziele = abschnitte
      .map((abschnitt) => document.getElementById(anker(abschnitt.h2)))
      .filter(Boolean);
    let geplant = false;
    const messen = () => {
      geplant = false;
      const kante = 160;
      let treffer = null;
      for (const ziel of ziele) {
        if (ziel.getBoundingClientRect().top <= kante) treffer = ziel.id;
      }
      setAktiv(treffer);
    };
    const beimScrollen = () => {
      if (!geplant) {
        geplant = true;
        requestAnimationFrame(messen);
      }
    };
    messen();
    window.addEventListener("scroll", beimScrollen, { passive: true });
    return () => window.removeEventListener("scroll", beimScrollen);
  }, [abschnitte, aufklappbar]);

  const liste = (
    <ol className="mt-5 border-s border-hairline">
      {abschnitte.map((abschnitt) => {
        const id = anker(abschnitt.h2);
        const ist = aktiv === id;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={ist ? "location" : undefined}
              className={`-ms-px block border-s-2 py-1.5 ps-4 text-sm leading-snug transition-colors ${
                ist ? "border-accent text-paper" : "border-transparent text-paper-mute hover:text-paper"
              }`}>
              {abschnitt.h2}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (aufklappbar) {
    return (
      <details className="faq mt-8 rounded-lg border border-hairline bg-surface px-5">
        <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-sm text-paper">
          <span>
            Inhalt: {abschnitte.length} Abschnitte, {minuten} Minuten Lesezeit
          </span>
          <span aria-hidden="true" className="faq-zeichen text-xl leading-none font-light text-accent">
            +
          </span>
        </summary>
        <div className="pb-4">{liste}</div>
      </details>
    );
  }

  return (
    <nav aria-label="Inhalt" className="sticky top-28">
      <p className="label">Inhalt</p>
      <p className="mt-2 text-xs text-paper-mute">{minuten} Minuten Lesezeit</p>
      {liste}
    </nav>
  );
};
