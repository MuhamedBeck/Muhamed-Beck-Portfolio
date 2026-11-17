import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useDict } from "../../../i18n";
import { CONTACT, mailtoHref, whatsappHref } from "../../../content/site";
import { Marke } from "../../icons/Marke";
import { WHATSAPP_MARKE } from "./whatsappZeichen";
import woerter from "../../../i18n/dict/dolmetscher";
import ui from "../../../i18n/dict/ui";

/**
 * Die drei Wege zur Anfrage als Knöpfe: der gefüllte springt zum Formular
 * auf derselben Seite, WhatsApp und Anruf daneben. Auf einer Seite ohne
 * Formular, etwa dem Kosten-Ratgeber, führt `anfrageZiel` zum Formular der
 * Dolmetscher-Seite.
 */
export const KontaktKnoepfe = ({ anfrageZiel = "#anfrage" }) => {
  const t = useDict(woerter);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={anfrageZiel} className="btn-ghost btn-accent">
        {t.wege.anfrage}
      </a>
      <a
        href={whatsappHref(t.kopf.whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost">
        <Marke marke={WHATSAPP_MARKE} size={16} />
        {t.wege.whatsapp}
      </a>
      <a href={`tel:${CONTACT.phone}`} className="btn-ghost">
        <FaPhone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t.wege.anruf}
      </a>
    </div>
  );
};

/**
 * WhatsApp, Telefon und E-Mail als Liste mit Haarlinien neben dem Formular
 * (Muster: Kontakt.jsx). Nummer und Adresse sind lateinische Inseln und
 * stehen deshalb in <bdi dir="ltr">.
 */
export const KontaktListe = () => {
  const t = useDict(woerter);
  const chrome = useDict(ui);
  const wege = [
    {
      key: "whatsapp",
      href: whatsappHref(t.kopf.whatsappText),
      extern: true,
      zeichen: <Marke marke={WHATSAPP_MARKE} size={16} />,
      titel: t.wege.whatsapp,
      wert: CONTACT.phoneDisplay,
      hinweis: t.wege.whatsappHinweis,
    },
    {
      key: "anruf",
      href: `tel:${CONTACT.phone}`,
      zeichen: <FaPhone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />,
      titel: t.wege.anruf,
      wert: CONTACT.phoneDisplay,
      hinweis: t.wege.anrufHinweis,
    },
    {
      key: "email",
      href: mailtoHref(chrome.mailBetreff),
      zeichen: <FaEnvelope className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />,
      titel: t.wege.email,
      wert: CONTACT.email,
      hinweis: t.wege.emailHinweis,
    },
  ];

  return (
    <ul>
      {wege.map((weg) => (
        <li key={weg.key} className="border-t border-hairline py-6">
          <a
            href={weg.href}
            className="group block"
            {...(weg.extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <span className="flex items-center gap-3">
              {weg.zeichen}
              <span className="text-sm text-paper-dim">{weg.titel}</span>
            </span>
            <span className="mt-2 block text-lg text-paper underline-offset-4 group-hover:underline">
              <bdi dir="ltr">{weg.wert}</bdi>
            </span>
            <span className="mt-2 block text-sm text-paper-mute">{weg.hinweis}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
