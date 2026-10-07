import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RATE_MAX, RATE_MIN } from "../../../content/site";
import { ANFRAGE_ZUSAGE } from "../../../content/leistungen.de";

/* Anker, an denen sich die mobile Leiste orientiert. Als ids statt Refs, weil
   Start und Schluss in verschiedenen Abschnitten von LeistungPage stehen und
   die Leiste sonst zwei Refs quer durch die Seite gereicht bekäme. */
export const ANKER_START = "anfrage-start";
export const ANKER_SCHLUSS = "anfrage-schluss";

/**
 * Der erste Anfrage-Weg, direkt unter der Einleitung.
 *
 * Gemessen am 07.10.2026 auf 390 × 844: Die n8n-Seite war elf Bildschirme lang,
 * der erste zeigte nur Überschrift und einen neunzeiligen Absatz, und ihr
 * eigener Anfrage-Knopf kam auf Bildschirm 9,5. Mobil klicken Besucher laut
 * Search Console fünfmal häufiger als am Desktop; genau dort fehlte der Weg.
 *
 * @param {object} props
 * @param {string} props.to    Ziel mit vorbelegter Leistung.
 * @param {string} props.label Beschriftung, dieselbe wie im Schluss-CTA.
 */
export const AnfrageStart = ({ to, label }) => (
  <div
    id={ANKER_START}
    className="flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-hairline pt-8">
    <Link to={to} className="btn-ghost btn-accent">
      {label}
    </Link>
    <p className="text-sm leading-relaxed text-paper-mute">
      {RATE_MIN} bis {RATE_MAX} € pro Stunde · {ANFRAGE_ZUSAGE}
    </p>
  </div>
);

/**
 * Feststehende Anfrage-Leiste am unteren Rand, nur mobil.
 *
 * Erscheint erst, wenn der Knopf unter der Einleitung aus dem Bild gescrollt
 * ist, und verschwindet, sobald der Schluss-CTA erreicht ist, und für alles
 * darunter. Sonst stünde derselbe Knopf zweimal im Bild, oder die Leiste läge
 * über dem Footer.
 *
 * Im vorgerenderten HTML und ohne JavaScript bleibt sie unsichtbar: Der
 * Ausgangszustand ist "verborgen", und nur der Beobachter schaltet sie frei.
 * Verborgen ist sie zusätzlich `inert`, damit die Tabulatortaste nicht auf
 * einem Knopf landet, der außerhalb des Bildes liegt.
 *
 * @param {object} props
 * @param {string} props.to
 * @param {string} props.label
 */
export const AnfrageLeiste = ({ to, label }) => {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const start = document.getElementById(ANKER_START);
    const schluss = document.getElementById(ANKER_SCHLUSS);
    if (!start || !schluss || !("IntersectionObserver" in window)) return undefined;

    let startVorbei = false;
    let schlussErreicht = false;

    const beobachter = new IntersectionObserver((eintraege) => {
      for (const eintrag of eintraege) {
        const oben = eintrag.boundingClientRect.top;
        if (eintrag.target === start) {
          // Erst sichtbar, wenn der Knopf nach OBEN hinausgescrollt ist. Steht er
          // noch unterhalb des Bildes, hat der Leser ihn nicht verpasst.
          startVorbei = !eintrag.isIntersecting && oben < 0;
        } else {
          // Ab dem Schluss-CTA abwärts verborgen, auch wenn er schon wieder
          // oberhalb des Bildes liegt und der Footer zu sehen ist.
          schlussErreicht = eintrag.isIntersecting || oben < 0;
        }
      }
      setSichtbar(startVorbei && !schlussErreicht);
    });

    beobachter.observe(start);
    beobachter.observe(schluss);
    return () => beobachter.disconnect();
  }, []);

  return (
    <div
      className="anfrage-leiste fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/85 px-4 pt-3 backdrop-blur-lg md:hidden"
      data-sichtbar={sichtbar}
      inert={!sichtbar}>
      <Link to={to} className="btn-ghost btn-accent w-full">
        {label}
      </Link>
    </div>
  );
};
