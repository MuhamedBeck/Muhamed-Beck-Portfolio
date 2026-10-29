/**
 * Dated milestones on a line: what applies already and what is still coming.
 *
 * Legal guides list deadlines in prose, and a reader skimming for "does this
 * apply to me yet?" has to find and order them in their head. On a line the
 * order is the layout. A filled green dot means "gilt", an amber ring "folgt",
 * and the words say the same, so nothing rests on colour alone.
 *
 * Built from list elements rather than SVG, so the dates and texts stay at
 * reading size on every screen. The entries fade in one after the other with
 * the section (.stagger).
 */
export const Meilensteine = ({ daten }) => (
  <figure className="m-0">
    {daten.titel ? <figcaption className="text-sm text-paper-dim">{daten.titel}</figcaption> : null}
    <ol className="relative mt-6 border-s border-hairline-strong">
      {daten.punkte.map((punkt, index) => {
        const gilt = punkt.status === "gilt";
        return (
          <li
            key={punkt.datum + punkt.titel}
            className="stagger relative ps-7 pb-7 last:pb-0"
            style={{ "--fade-delay": `${index * 90}ms` }}>
            <span
              aria-hidden="true"
              className={`absolute -start-[7px] top-1.5 block h-3.5 w-3.5 rounded-full border-2 ${
                gilt ? "border-success bg-success" : "border-warm bg-ink"
              }`}
            />
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-lg text-paper tabular-nums">{punkt.datum}</span>
              <span className={`text-xs tracking-[0.15em] uppercase ${gilt ? "text-success" : "text-warm"}`}>
                {gilt ? "gilt" : "folgt"}
              </span>
            </p>
            <p className="mt-1 text-base text-paper">{punkt.titel}</p>
            {punkt.text ? <p className="mt-1 text-sm leading-relaxed text-paper-soft">{punkt.text}</p> : null}
          </li>
        );
      })}
    </ol>
    {daten.quelle ? <p className="mt-6 text-xs leading-relaxed text-paper-mute">{daten.quelle}</p> : null}
  </figure>
);
