import { useLocation } from "react-router-dom";
import { useDict, useLocale } from "../../../i18n";
import { CONTACT, mailtoHref, whatsappHref } from "../../../content/site";
import { EMAILJS_IS_CONFIGURED } from "../../../content/emailjs";
import { Honeypot } from "../../Honeypot";
import { Bestaetigung, SendeKnopf } from "../../AnfrageStatus";
import { useAnfrageFormular } from "../../../services/useAnfrageFormular";
import {
  FELD_GRENZEN,
  FELD_IDS,
  LEERE_FELDER,
  archivObjekt,
  mailVariablen,
  zeigtTermin,
  zeigtTreffpunkt,
} from "../../../services/dolmetscherAnfrage";
import woerter from "../../../i18n/dict/dolmetscher";
import ui from "../../../i18n/dict/ui";

// Keine Platzhalter: Jedes Feld hat eine echte Beschriftung (wie /kontakt).
const FELD =
  "w-full rounded-lg border border-paper-mute/70 bg-surface px-4 py-3 text-paper transition focus:border-accent";
const BESCHRIFTUNG = "mb-2 block text-sm text-paper-mute";
const HINWEIS = "mt-2 block text-xs text-paper-mute";
// type="email" allein nimmt "name@firma" an; so eine Anfrage lässt sich nicht beantworten.
const EMAIL_MUSTER = "[^@\\s]+@[^@\\s]+\\.[^@\\s]+";

const Beschriftung = ({ name, text, pflicht, t }) => (
  <label className={BESCHRIFTUNG} htmlFor={FELD_IDS[name]}>
    {text}
    {pflicht ? (
      <span title={t.pflicht}> *</span>
    ) : (
      <span>
        {" "}
        ({t.freiwillig})
      </span>
    )}
  </label>
);

/* WhatsApp, Telefon und E-Mail hinter der Fehlermeldung und dem Hinweis für
   den Build ohne EmailJS-Werte. */
const DreiWege = () => {
  const t = useDict(woerter);
  const chrome = useDict(ui);
  const verweis = "text-accent underline-offset-4 hover:underline";
  return (
    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      <a href={whatsappHref(t.kopf.whatsappText)} target="_blank" rel="noopener noreferrer" className={verweis}>
        {t.wege.whatsapp}
      </a>
      <a href={`tel:${CONTACT.phone}`} className={verweis}>
        <bdi dir="ltr">{CONTACT.phoneDisplay}</bdi>
      </a>
      <a href={mailtoHref(chrome.mailBetreff)} className={verweis}>
        <bdi>{CONTACT.email}</bdi>
      </a>
    </span>
  );
};

/**
 * Anfrageformular der Dolmetscher-Seite, in allen drei Sprachen.
 *
 * Eine Anfrage, keine Buchung: Der Inhaber antwortet mit Termin und Preis
 * oder sagt ab. Felder, die die gewählte Art nicht braucht, werden ausgehängt
 * statt versteckt; ein unsichtbares Pflichtfeld würde das Absenden blockieren,
 * ohne dass man es sieht, und ausgehängte Werte gehen nicht mit.
 */
export const DolmetscherAnfrage = () => {
  const t = useDict(woerter).formular;
  const locale = useLocale();
  const { pathname } = useLocation();
  const { felder, setze, absenden, gesendet, laedt, fehler } = useAnfrageFormular({
    leer: LEERE_FELDER,
    zuArchiv: (werte, verdacht) => archivObjekt(werte, { locale, verdacht }),
    zuMail: (werte, verdacht) => mailVariablen(werte, { locale, pfad: pathname, verdacht }),
  });

  if (!EMAILJS_IS_CONFIGURED) {
    return (
      <p className="leading-relaxed text-paper-soft">
        {t.nichtVerfuegbar}
        <DreiWege />
      </p>
    );
  }

  if (gesendet) {
    return <Bestaetigung titel={t.bestaetigungTitel}>{t.bestaetigungText}</Bestaetigung>;
  }

  const wert = (name) => ({
    id: FELD_IDS[name],
    name,
    value: felder[name],
    onChange: (ereignis) => setze(name, ereignis.target.value),
  });

  const auswahl = (name, liste, leerText, pflicht) => (
    <div>
      <Beschriftung name={name} text={liste.label} pflicht={pflicht} t={t} />
      <select {...wert(name)} required={pflicht} className={FELD}>
        <option value="">{leerText}</option>
        {Object.entries(liste.optionen).map(([festerWert, text]) => (
          <option key={festerWert} value={festerWert}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <p className="max-w-[60ch] leading-relaxed text-paper-soft">{t.hinweis}</p>
      <form onSubmit={absenden} className="mt-8 space-y-6">
        <Honeypot />

        {auswahl("art", t.art, t.art.bitte, true)}
        {felder.art === "uebersetzung" ? (
          <p className="-mt-3 text-sm leading-relaxed text-paper-mute">{t.zwecksatz}</p>
        ) : null}
        {auswahl("sprachen", t.sprachen, t.sprachen.bitte, true)}
        {auswahl("anlass", t.anlass, t.anlass.keine, false)}

        {zeigtTermin(felder.art) ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Beschriftung name="wunschdatum" text={t.wunschdatum.label} t={t} />
              <input
                {...wert("wunschdatum")}
                type="date"
                dir="ltr"
                maxLength={FELD_GRENZEN.wunschdatum}
                className={FELD}
              />
            </div>
            <div>
              <Beschriftung name="wunschzeit" text={t.wunschzeit.label} t={t} />
              <input
                {...wert("wunschzeit")}
                type="time"
                dir="ltr"
                maxLength={FELD_GRENZEN.wunschzeit}
                aria-describedby={`${FELD_IDS.wunschzeit}-hinweis`}
                className={FELD}
              />
              <span id={`${FELD_IDS.wunschzeit}-hinweis`} className={HINWEIS}>
                {t.wunschterminHinweis}
              </span>
            </div>
          </div>
        ) : null}

        {zeigtTreffpunkt(felder.art) ? (
          <div>
            <Beschriftung name="treffpunkt" text={t.treffpunkt.label} t={t} />
            <input
              {...wert("treffpunkt")}
              type="text"
              dir="auto"
              autoComplete="off"
              maxLength={FELD_GRENZEN.treffpunkt}
              aria-describedby={`${FELD_IDS.treffpunkt}-hinweis`}
              className={FELD}
            />
            <span id={`${FELD_IDS.treffpunkt}-hinweis`} className={HINWEIS}>
              {t.treffpunkt.hinweis}
            </span>
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Beschriftung name="name" text={t.name.label} pflicht t={t} />
            <input
              {...wert("name")}
              type="text"
              dir="auto"
              required
              autoComplete="name"
              maxLength={FELD_GRENZEN.name}
              className={FELD}
            />
          </div>
          <div>
            <Beschriftung name="email" text={t.email.label} pflicht t={t} />
            <input
              {...wert("email")}
              type="email"
              dir="ltr"
              required
              autoComplete="email"
              pattern={EMAIL_MUSTER}
              title={t.email.format}
              maxLength={FELD_GRENZEN.email}
              className={FELD}
            />
          </div>
        </div>

        <div>
          <Beschriftung name="telefon" text={t.telefon.label} t={t} />
          <input
            {...wert("telefon")}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            maxLength={FELD_GRENZEN.telefon}
            aria-describedby={`${FELD_IDS.telefon}-hinweis`}
            className={FELD}
          />
          <span id={`${FELD_IDS.telefon}-hinweis`} className={HINWEIS}>
            {t.telefon.hinweis}
          </span>
        </div>

        {auswahl("herkunft", t.herkunft, t.herkunft.keine, false)}

        <div>
          <Beschriftung name="nachricht" text={t.nachricht.label} pflicht t={t} />
          <textarea
            {...wert("nachricht")}
            rows={5}
            dir="auto"
            required
            maxLength={FELD_GRENZEN.nachricht}
            aria-describedby={`${FELD_IDS.nachricht}-hinweis`}
            className={FELD}
          />
          <span id={`${FELD_IDS.nachricht}-hinweis`} className={HINWEIS}>
            {t.nachricht.hinweis}
          </span>
        </div>

        {fehler ? (
          <p role="alert" className="text-sm text-danger">
            {t.fehler}
            <DreiWege />
          </p>
        ) : null}

        <SendeKnopf laedt={laedt} ladeText={t.sendet}>
          {t.senden}
        </SendeKnopf>

        <div className="space-y-2 text-xs leading-relaxed text-paper-mute">
          <p className="font-medium text-paper-dim">{t.datenschutz.titel}</p>
          {t.datenschutz.absaetze.map((absatz) => (
            <p key={absatz}>{absatz}</p>
          ))}
          <p>
            <a href="/datenschutz" target="_blank" rel="noopener" className="text-accent hover:underline">
              {t.datenschutz.volltext}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
