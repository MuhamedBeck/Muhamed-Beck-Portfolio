import { Marke } from "./icons/Marke";
import { WERKZEUGMARKEN } from "./icons/werkzeugmarken";

/**
 * Horizontal bars for figures that belong side by side.
 *
 * Two shapes, chosen by `daten.art`:
 *
 * - "liste": one bar per row, all rows on one scale, for shares and
 *   measurements of the same unit (survey answers, response times, error
 *   rates). A row may give `von` as well, for a range instead of a value.
 * - "vergleich": a before and an after bar per row, each row on its own scale,
 *   because the rows carry different units (percent, minutes, euros) and only
 *   the change within a row means anything.
 *
 * Every track spans the full width, with label and value on the line above it.
 * Values of different length beside the bar would make each track a different
 * width, and bars on tracks of different widths are no longer on one scale.
 * Built from positioned elements like RateScale, not as an SVG, so the labels
 * stay at text size and reflow. Bars start at zero, never at a cut axis.
 *
 * Motion: once the section is in view, each bar grows from its start edge
 * (.bv-balken in index.css). Without JavaScript, after the failsafe or with
 * reduced motion, the bars simply stand at their length.
 */
const FARBE = {
  akzent: "bg-accent",
  cyan: "bg-accent-dim",
  erfolg: "bg-success",
  warm: "bg-warm",
  leise: "bg-paper-mute",
};

const SCHRIFT = {
  akzent: "text-accent",
  cyan: "text-accent-dim",
  erfolg: "text-success",
  warm: "text-warm",
  leise: "text-paper-soft",
};

const Spur = ({ von = 0, wert, max, ton, verzug }) => (
  <div className="relative mt-2 h-3.5 rounded-full bg-surface">
    <div
      className={`bv-balken absolute inset-y-0 rounded-full ${FARBE[ton]}`}
      style={{
        insetInlineStart: `${(von / max) * 100}%`,
        width: `${Math.max(1.2, ((wert - von) / max) * 100)}%`,
        "--wf-delay": verzug,
      }}
    />
  </div>
);

/* A row about a tool carries the tool's mark before its name. */
const Kopf = ({ label, text, ton, klein = false, marke }) => (
  <div className="flex items-baseline justify-between gap-4">
    <span className={klein ? "text-sm text-paper-mute" : "text-sm leading-snug text-paper-soft"}>
      {marke ? (
        <span className="inline-flex items-center gap-2">
          <Marke marke={WERKZEUGMARKEN[marke]} size={16} />
          {label}
        </span>
      ) : (
        label
      )}
    </span>
    <span className={`font-display text-lg leading-none whitespace-nowrap tabular-nums sm:text-xl ${SCHRIFT[ton]}`}>
      {text}
    </span>
  </div>
);

export const Balken = ({ daten }) => {
  const takt = (index) => `${(0.15 + index * 0.12).toFixed(2)}s`;

  if (daten.art === "vergleich") {
    return (
      <figure className="m-0 max-w-3xl">
        {daten.titel ? <figcaption className="text-sm text-paper-dim">{daten.titel}</figcaption> : null}
        <dl className="mt-6 space-y-9">
          {daten.zeilen.map((zeile, index) => {
            /* A share runs on its full scale: 42 percent drawn as a full bar
               would read as 100. Other units scale to the larger value. */
            const max = zeile.max ?? Math.max(zeile.vorher.wert, zeile.nachher.wert);
            return (
              <div key={zeile.label}>
                <dt className="text-base text-paper">{zeile.label}</dt>
                <dd className="mt-3 space-y-3">
                  <div>
                    <Kopf label="vorher" text={zeile.vorher.text} ton="leise" klein />
                    <Spur wert={zeile.vorher.wert} max={max} ton="leise" verzug={takt(2 * index)} />
                  </div>
                  <div>
                    <Kopf label="nachher" text={zeile.nachher.text} ton="erfolg" klein />
                    <Spur wert={zeile.nachher.wert} max={max} ton="erfolg" verzug={takt(2 * index + 1)} />
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
        {daten.quelle ? <p className="mt-6 text-xs leading-relaxed text-paper-mute">{daten.quelle}</p> : null}
      </figure>
    );
  }

  const max = daten.max ?? Math.max(...daten.zeilen.map((zeile) => zeile.wert));
  return (
    <figure className="m-0 max-w-3xl">
      {daten.titel ? <figcaption className="text-sm text-paper-dim">{daten.titel}</figcaption> : null}
      <ul className="mt-6 space-y-5">
        {daten.zeilen.map((zeile, index) => (
          <li key={zeile.label}>
            <Kopf label={zeile.label} text={zeile.text} ton={zeile.ton} marke={zeile.marke} />
            <Spur von={zeile.von} wert={zeile.wert} max={max} ton={zeile.ton} verzug={takt(index)} />
          </li>
        ))}
      </ul>
      {daten.quelle ? <p className="mt-6 text-xs leading-relaxed text-paper-mute">{daten.quelle}</p> : null}
    </figure>
  );
};
