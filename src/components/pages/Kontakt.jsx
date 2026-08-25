import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import { PageShell } from "../PageShell";
import { Section } from "../Section";
import { CONTACT, RATE_TEXT, SOCIAL } from "../../content/site";

// A short, direct contact page rather than a long form. Every field added to a
// form costs completions, and for a freelance enquiry the only things actually
// needed are what the process is and how to reply.
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

const HELPFUL = [
  "Welcher Prozess kostet aktuell am meisten Zeit?",
  "Welche Systeme sind im Spiel (CRM, ATS, ERP, Shop, interne Tools)?",
  "Gibt es einen Zeitrahmen oder ein festes Datum?",
  "Läuft n8n oder ein anderes Automatisierungstool schon bei Ihnen?",
];

const Kontakt = () => (
  <PageShell
    label="Kontakt"
    headline="Projekt anfragen"
    intro="Beschreiben Sie kurz, worum es geht. Sie bekommen eine echte Einschätzung, ob und wie sich das automatisieren lässt, keine Standardantwort und kein Verkaufsgespräch.">
    <Section className="!pt-0">
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="label">Direkt erreichbar</h2>
          <ul className="mt-6">
            {CHANNELS.map((channel) => (
              <li key={channel.label} className="border-t border-white/10 py-6">
                <a href={channel.href} className="group block">
                  <span className="flex items-center gap-3">
                    <channel.icon
                      className="h-4 w-4 shrink-0 text-blue-400"
                      aria-hidden="true"
                    />
                    <span className="text-lg text-gray-100 underline-offset-4 group-hover:underline">
                      {channel.value}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm text-paper-mute">{channel.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="label">Das hilft mir beim Einschätzen</h2>
          <ul className="mt-6">
            {HELPFUL.map((question) => (
              <li
                key={question}
                className="border-t border-white/10 py-4 leading-relaxed text-gray-400">
                {question}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-paper-mute">
            Nichts davon ist Pflicht. Ein Satz reicht, den Rest klären wir im Gespräch.
          </p>
        </div>
      </div>

      <hr className="rule mt-16" />

      <div className="grid gap-x-12 gap-y-10 pt-10 md:grid-cols-3">
        <div>
          <h2 className="label">Konditionen</h2>
          <p className="mt-4 leading-relaxed text-gray-400">{RATE_TEXT}</p>
        </div>
        <div>
          <h2 className="label">Arbeitsweise</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            Remote in ganz Deutschland, Österreich und der Schweiz. Vor Ort im
            Rhein-Main-Gebiet nach Absprache.
          </p>
        </div>
        <div>
          <h2 className="label">Erstgespräch</h2>
          <p className="mt-4 leading-relaxed text-gray-400">
            Kostenlos und unverbindlich. Wenn Automatisierung sich in Ihrem Fall nicht
            rechnet, sage ich das.
          </p>
        </div>
      </div>
    </Section>
  </PageShell>
);

export default Kontakt;
