import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import { CONTACT, RATE_TEXT, SOCIAL } from "../../content/site";
import { EMAILJS, EMAILJS_IS_CONFIGURED } from "../../content/emailjs";
import { LEISTUNGEN } from "../../content/leistungen.de";

// The direct channels stay alongside the form rather than being replaced by it.
// Some people will always rather pick up the phone, and a page that only offers
// a form quietly loses them.
const CHANNELS = [
  {
    icon: FaEnvelope,
    label: "E-Mail",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Antwort innerhalb von 24 Stunden, werktags meist deutlich schneller.",
  },
  {
    icon: FaPhone,
    label: "Telefon",
    value: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    note: "Direkt anrufen oder eine Nachricht hinterlassen, ich rufe zurück.",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "Muhamed Nur Beck",
    href: SOCIAL.linkedin,
    note: "Für alles, was sich schneller in einer Nachricht klären lässt.",
  },
];

// Aus den Leistungen abgeleitet statt danebengepflegt. Die frueher hier
// stehende Liste war von Hand gefuehrt und hatte sechs Eintraege fuer sieben
// Leistungen: die Webentwicklung fehlte vollstaendig, wer von dieser Seite kam,
// konnte sein eigenes Anliegen nicht auswaehlen. Abgeleitet kann das nicht mehr
// passieren — eine neue Leistung erscheint hier von selbst.
const SONSTIGES = "Etwas anderes oder noch unklar";

const ARTEN = LEISTUNGEN.map((leistung) => ({
  slug: leistung.path.split("/").pop(),
  label: leistung.hero.kurz,
}));

const ANFRAGE_ARTEN = [...ARTEN.map((art) => art.label), SONSTIGES];

/** Beschriftung zu einem Slug aus dem Abfrageteil, oder leer bei Unbekanntem. */
const artZuSlug = (slug) => ARTEN.find((art) => art.slug === slug)?.label ?? "";

const Kontakt = () => {
  // useSearchParams statt window.location: waehrend des Prerenders gibt es kein
  // window, und ein direkter Zugriff darauf wuerde den Build abbrechen. Ohne
  // Abfrageteil liefert es einen leeren String, das Feld steht dann wie bisher
  // auf "Bitte auswaehlen".
  const [suchParameter] = useSearchParams();
  const vorbelegt = artZuSlug(suchParameter.get("leistung"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service_type: vorbelegt,
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Company and enquiry type ride along inside the message body, so the
    // EmailJS template keeps its three variables and does not need editing
    // every time this form gains a field.
    const combinedMessage = [
      `Art der Anfrage: ${formData.service_type}`,
      formData.company ? `Unternehmen: ${formData.company}` : null,
      `\nBeschreibung:\n${formData.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { name: formData.name, email: formData.email, message: combinedMessage },
        EMAILJS.publicKey
      );
      setSent(true);
      setFormData({ name: "", email: "", company: "", service_type: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // No placeholders: every field has a real label, and a placeholder that
  // disappears on typing is not a label.
  const inputClass =
    "w-full rounded-lg border border-hairline bg-surface px-4 py-3 text-paper transition focus:border-blue-500 focus:bg-blue-500/5";
  const labelClass = "mb-2 block text-sm text-paper-mute";

  return (
    <PageShell
      label="Kontakt"
      headline="Kostenloses Erstgespräch"
      intro="30 Minuten, unverbindlich und ohne Kosten. Beschreiben Sie kurz, worum es geht — Sie bekommen eine echte Einschätzung, ob und wie sich das lösen lässt, keine Standardantwort und kein Verkaufsgespräch.">
      <Section className="!pt-0">
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="label">Anfrage senden</h2>

            {!EMAILJS_IS_CONFIGURED ? (
              /* No EmailJS credentials in this build, so a form could only
                 fail. The direct channels beside this already cover it. */
              <p className="mt-6 leading-relaxed text-paper-soft">
                Das Formular ist gerade nicht verfügbar. Schreiben Sie mir bitte
                direkt an{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-accent hover:underline">
                  {CONTACT.email}
                </a>
                .
              </p>
            ) : sent ? (
              <div className="mt-6" role="status">
                <p className="intro">Anfrage ist raus.</p>
                <p className="mt-4 leading-relaxed text-paper-soft">
                  Sie hören innerhalb von 24 Stunden von mir. Keine Antwort erhalten?
                  Dann direkt an{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-accent hover:underline">
                    {CONTACT.email}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="kontakt-name">
                      Name *
                    </label>
                    <input
                      id="kontakt-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="kontakt-email">
                      E-Mail *
                    </label>
                    <input
                      id="kontakt-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="kontakt-firma">
                    Unternehmen (optional)
                  </label>
                  <input
                    id="kontakt-firma"
                    type="text"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="kontakt-art">
                    Worum geht es? *
                  </label>
                  <select
                    id="kontakt-art"
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={(e) =>
                      setFormData({ ...formData, service_type: e.target.value })
                    }
                    className={`${inputClass} cursor-pointer`}>
                    <option value="" disabled>
                      Bitte auswählen
                    </option>
                    {ANFRAGE_ARTEN.map((art) => (
                      <option key={art} value={art}>
                        {art}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="kontakt-nachricht">
                    Welcher Prozess kostet Sie am meisten Zeit? *
                  </label>
                  <textarea
                    id="kontakt-nachricht"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-3 text-sm leading-relaxed text-paper-mute">
                    Hilfreich, aber kein Pflichtprogramm: welche Systeme im Spiel sind
                    (CRM, ATS, ERP, Shop, interne Tools), ob es einen Zeitrahmen gibt
                    und womit Sie heute arbeiten.
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    Die Anfrage konnte nicht gesendet werden. Schreiben Sie mir bitte
                    direkt an{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline hover:text-red-300">
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn-ghost btn-accent">
                  {loading ? "Wird gesendet" : "Anfrage senden"}
                </button>

                <p className="text-sm text-paper-mute">
                  Kostenloses Erstgespräch · Antwort innerhalb von 24 Stunden ·
                  Frankfurt und remote
                </p>
              </form>
            )}
          </div>

          <div>
            <h2 className="label">Direkt erreichbar</h2>
            <ul className="mt-6">
              {CHANNELS.map((channel) => (
                <li key={channel.label} className="border-t border-hairline py-6">
                  <a href={channel.href} className="group block">
                    <span className="flex items-center gap-3">
                      <channel.icon
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span className="text-lg text-paper underline-offset-4 group-hover:underline">
                        {channel.value}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm text-paper-mute">
                      {channel.note}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-paper-mute">
              Lieber telefonieren oder kurz schreiben? Genauso gut. Das Formular ist
              ein Angebot, keine Voraussetzung.
            </p>
          </div>
        </div>

        <hr className="rule mt-20" />

        <div className="grid gap-x-12 gap-y-10 pt-10 md:grid-cols-3">
          <div>
            <h2 className="label">Konditionen</h2>
            <p className="leading-relaxed text-paper-soft">{RATE_TEXT}</p>
          </div>
          <div>
            <h2 className="label">Arbeitsweise</h2>
            <p className="leading-relaxed text-paper-soft">
              Remote in ganz Deutschland, Österreich und der Schweiz. Vor Ort im
              Rhein-Main-Gebiet nach Absprache.
            </p>
          </div>
          <div>
            <h2 className="label">Erstgespräch</h2>
            <p className="leading-relaxed text-paper-soft">
              Kostenlos und unverbindlich. Wenn sich das Vorhaben in Ihrem Fall nicht
              rechnet, sage ich das.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
};

export default Kontakt;
