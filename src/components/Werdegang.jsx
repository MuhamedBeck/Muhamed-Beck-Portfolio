/**
 * The career as bars on one time axis.
 *
 * The CV listed eleven stations and three degrees as text, so the shape of the
 * path, which jobs ran side by side and how study and work overlapped, had to
 * be pieced together from the dates. Here every station is a bar from start to
 * end on a shared axis of years, coloured by kind, with the legend saying in
 * words what the colours mean.
 *
 * "heute" is the month of the CV's own stand, not the current date: the page
 * is prerendered, and a bar that grew by a day between build and visit would
 * not match its hydrated twin. The bars grow in once (.bv-balken).
 */
const FARBE = {
  anstellung: "bg-accent",
  freiberuflich: "bg-warm",
  studium: "bg-success",
  studentisch: "bg-accent-dim",
  nebenher: "bg-paper-mute",
};

const NAME = {
  anstellung: "Anstellung",
  freiberuflich: "freiberuflich",
  studium: "Studium",
  studentisch: "Werkstudent, Praktikum, Tutor",
  nebenher: "nebenher",
};

const monatszahl = (text, stand) => {
  if (text === "heute") return stand.jahr * 12 + stand.monat - 1;
  const [monat, jahr] = text.split("/").map(Number);
  return jahr * 12 + monat - 1;
};

export const Werdegang = ({ eintraege, stand }) => {
  const ende = monatszahl("heute", stand) + 1;
  const anfang = Math.floor(Math.min(...eintraege.map((e) => monatszahl(e.von, stand))) / 12) * 12;
  const anteil = (m) => ((m - anfang) / (ende - anfang)) * 100;
  const jahre = [];
  for (let jahr = anfang / 12; jahr * 12 <= ende; jahr += 2) jahre.push(jahr);
  const arten = [...new Set(eintraege.map((e) => e.kategorie))];

  return (
    <figure className="m-0">
      <ul className="space-y-3.5">
        {eintraege.map((eintrag, index) => {
          const von = monatszahl(eintrag.von, stand);
          const bis = monatszahl(eintrag.bis, stand) + 1;
          return (
            <li
              key={eintrag.label + eintrag.von}
              className="grid gap-x-6 gap-y-1.5 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-center">
              <p className="text-sm leading-snug">
                <span className="text-paper">{eintrag.ort}</span>
                <span className="block text-xs text-paper-mute">{eintrag.label}</span>
              </p>
              <div className="relative h-3 rounded-full bg-surface">
                <div
                  className={`bv-balken absolute inset-y-0 rounded-full ${FARBE[eintrag.kategorie]}`}
                  style={{
                    insetInlineStart: `${anteil(von)}%`,
                    width: `${Math.max(0.8, anteil(bis) - anteil(von))}%`,
                    "--wf-delay": `${(0.1 + index * 0.06).toFixed(2)}s`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* The axis sits under the bar column only, so each year label stands
          exactly under its place on the bars. */}
      <div className="mt-3 md:grid md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:gap-x-6">
        <span aria-hidden="true" className="hidden md:block" />
        <div className="relative h-5 border-t border-hairline text-xs text-paper-mute tabular-nums">
          {jahre.map((jahr) => {
            const stelle = anteil(jahr * 12);
            /* Centred under its tick, except at the two ends, where a centred
               label would hang half outside the axis. */
            const ausrichtung = stelle < 3 ? "" : stelle > 97 ? "-translate-x-full" : "-translate-x-1/2";
            return (
              <span
                key={jahr}
                className={`absolute top-1.5 ${ausrichtung}`}
                style={{ insetInlineStart: `${stelle}%` }}>
                {jahr}
              </span>
            );
          })}
        </div>
      </div>

      <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-soft">
        {arten.map((art) => (
          <span key={art} className="flex items-center gap-2">
            <span aria-hidden="true" className={`h-2.5 w-5 rounded-full ${FARBE[art]}`} />
            {NAME[art]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
};
