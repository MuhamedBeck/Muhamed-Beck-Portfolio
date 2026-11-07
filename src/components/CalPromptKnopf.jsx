import { useEffect, useRef, useState } from "react";
import { BUCHUNG } from "../content/site";

/* Cal.coms "Copy Prompt"-Knopf, so wie Cal.com ihn liefert (Einbau-Code vom
   07.11.2026, auf Entscheidung des Inhabers unverändert im Aussehen): Er
   kopiert eine Anweisung, mit der ein KI-Assistent über den MCP-Server von
   Cal.com einen Termin bucht. Die Logos lädt er von app.cal.com; das steht
   in der Datenschutzerklärung.

   Abweichungen vom Original nur, wo React oder die Seite es verlangen: eine
   Klasse statt der festen id (der Knopf steht auf einer Seite mehrfach), das
   Skript als Effekt, und loading="lazy" an den Logos, damit ein Knopf weit
   unten nichts lädt, bevor er sichtbar wird. Die Farben sind die von
   Cal.com, nicht die Tokens der Seite (index.css, .cal-copy-prompt). */
const ASSISTENTEN = [
  { name: "Cal.ai", datei: "cal-ai", mono: true },
  { name: "ChatGPT", datei: "chatgpt", mono: true },
  { name: "Claude", datei: "claude" },
  { name: "Grok", datei: "grok", mono: true },
  { name: "Perplexity", datei: "perplexity" },
  { name: "Muse", datei: "muse" },
  { name: "Instinct", datei: "instinct", mono: true },
  { name: "OpenClaw", datei: "openclaw" },
];

export const CalPromptKnopf = () => {
  const [index, setIndex] = useState(0);
  const [kopiert, setKopiert] = useState(false);
  const zeitgeber = useRef();

  useEffect(() => {
    const takt = window.setInterval(() => setIndex((i) => (i + 1) % ASSISTENTEN.length), 5000);
    return () => window.clearInterval(takt);
  }, []);
  useEffect(() => () => window.clearTimeout(zeitgeber.current), []);

  const kopieren = () => {
    navigator.clipboard?.writeText(BUCHUNG.prompt).then(() => {
      setKopiert(true);
      window.clearTimeout(zeitgeber.current);
      zeitgeber.current = window.setTimeout(() => setKopiert(false), 2500);
    });
  };

  return (
    <button
      type="button"
      className="cal-copy-prompt"
      data-cal-prompt={BUCHUNG.prompt}
      data-copied={kopiert ? "" : undefined}
      onClick={kopieren}>
      <span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <rect width="14" height="14" x="8" y="8" rx="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
        <span data-cal-label>Copy Prompt</span>
      </span>
      <span>
        <span data-cal-logos>
          {ASSISTENTEN.map((a, i) => (
            <img
              key={a.datei}
              src={`https://app.cal.com/ai-assistants/${a.datei}.svg`}
              alt=""
              loading="lazy"
              data-cal-assistant={a.name}
              data-cal-mono={a.mono ? "" : undefined}
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}
        </span>
      </span>
      <span data-cal-tooltip role="status">
        {kopiert ? "Copied. Open your assistant and paste the instructions" : ""}
      </span>
    </button>
  );
};
