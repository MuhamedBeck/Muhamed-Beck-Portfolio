import { useEffect, useRef, useSyncExternalStore } from "react";
import { useDict } from "../i18n";
import ui from "../i18n/dict/ui";
import { CONTACT, mailtoHref } from "../content/site";

/* Nichts zu abonnieren: Der Wert wechselt nur einmal, vom vorgerenderten HTML
   (false) zum Browser, in dem React läuft (true). */
const abonnieren = () => () => {};
const imBrowser = () => true;
const imVorrendern = () => false;

/**
 * Sendeknopf der Anfrageformulare der Seite.
 *
 * Während des Sendens läuft unten im Knopf eine schmale Linie durch. Vorher
 * wechselte nur der Text, und der Knopf sah sonst genauso aus wie davor, so
 * dass man nicht sah, ob überhaupt etwas passiert. Bewegung und Farben stehen
 * in index.css (.btn-senden, .sende-linie), samt reduzierter Bewegung.
 *
 * Im vorgerenderten HTML ist der Knopf gesperrt: Ohne Skript schickte er das
 * Formular als GET an dieselbe Adresse, die Angaben landeten in der
 * Adresszeile und keine Anfrage käme an. Davor steht dann ein Hinweis auf Mail
 * und Telefon, den index.css nur zeigt, wenn kein Skript läuft oder das Bundle
 * ausbleibt (.ohne-skript). Sobald React rendert, sind beide fort.
 * prerender-meta.js bricht den Build ab, wenn eins davon fehlt.
 *
 * @param {object} props
 * @param {boolean} props.laedt     true, solange gesendet wird
 * @param {string}  props.ladeText  Beschriftung während des Sendens
 */
export const SendeKnopf = ({ laedt, ladeText, children }) => {
  const bereit = useSyncExternalStore(abonnieren, imBrowser, imVorrendern);
  const t = useDict(ui);

  return (
    <>
      {bereit ? null : (
        <p className="ohne-skript text-sm leading-relaxed text-paper-soft">
          {t.formularOhneSkript}{" "}
          <a href={mailtoHref(t.mailBetreff)} className="text-accent underline-offset-4 hover:underline">
            <bdi>{CONTACT.email}</bdi>
          </a>
          {" · "}
          <a href={`tel:${CONTACT.phone}`} className="text-accent underline-offset-4 hover:underline">
            <bdi dir="ltr">{CONTACT.phoneDisplay}</bdi>
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={!bereit || laedt}
        aria-busy={laedt || undefined}
        className="btn-ghost btn-accent btn-senden">
        {laedt ? ladeText : children}
        {laedt ? <span aria-hidden="true" className="sende-linie" /> : null}
      </button>
    </>
  );
};

/**
 * Bestätigung nach dem Senden, an der Stelle des Formulars.
 *
 * Der Fokus springt auf die Überschrift: Der Knopf, auf dem er lag, ist mit
 * dem Formular verschwunden, und ohne das landete er am Seitenanfang. So hört
 * ein Screenreader die Bestätigung, und auf dem Telefon rückt die Karte ins
 * Bild, statt oberhalb des Bildschirms zu erscheinen.
 *
 * @param {object} props
 * @param {string} props.titel  eine kurze Zeile, z. B. "Ihre Anfrage ist angekommen."
 */
export const Bestaetigung = ({ titel, children }) => {
  const ueberschrift = useRef(null);

  useEffect(() => {
    ueberschrift.current?.focus();
  }, []);

  return (
    <div
      className="bestaetigung mt-6 rounded-lg border border-hairline bg-surface p-6 sm:p-8"
      role="status">
      <svg
        className="bestaetigung-haken h-10 w-10 text-accent"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        {/* pathLength="1" lässt die Zeichen-Animation mit dasharray 1 arbeiten,
            unabhängig von der echten Länge der Linien. */}
        <circle cx="20" cy="20" r="18.5" pathLength="1" />
        <path d="M12.5 20.5l5 5 10-11" pathLength="1" />
      </svg>
      <h3
        ref={ueberschrift}
        tabIndex={-1}
        className="headline-sub mt-6 outline-none">
        {titel}
      </h3>
      <p className="bestaetigung-text mt-4 leading-relaxed text-paper-soft">{children}</p>
    </div>
  );
};
