import { useId } from "react";
import { LuCheck } from "react-icons/lu";

/**
 * Several programs flowing into one platform, with the state of each move.
 *
 * The CRM case study tells a migration that is half done, and the picture must
 * not be more finished than the story: a solid green line is a move that has
 * happened, a dashed amber line the one in progress, a faint dotted line the
 * one still planned. The status words under each name say the same in text.
 *
 * Two layouts like the workflow canvas, because three tiles side by side at
 * phone width would shrink their names below reading size. The motion reuses
 * the canvas classes: the finished line draws, the others fade in.
 */
const TON = {
  erfolg: { linie: "stroke-success", text: "fill-success", muster: undefined, breite: 2 },
  warm: { linie: "stroke-warm", text: "fill-warm", muster: "6 5", breite: 1.75 },
  leise: { linie: "stroke-paper-mute", text: "fill-paper-mute", muster: "2 5", breite: 1.5 },
};

const Bild = ({ daten, breite, uid }) => {
  const gross = breite > 500;
  const rand = gross ? 24 : 12;
  const luecke = gross ? 28 : 10;
  const kachelB = (breite - 2 * rand - 2 * luecke) / daten.quellen.length;
  const kachelH = gross ? 82 : 86;
  const oben = gross ? 32 : 22;
  const zielB = Math.min(breite - 2 * rand, gross ? 320 : 280);
  const zielX = (breite - zielB) / 2;
  const zielY = oben + kachelH + (gross ? 104 : 92);
  const zielH = 78;
  const hoehe = zielY + zielH + oben;
  const schrift = gross ? { name: 15, klein: 11.5 } : { name: 13.5, klein: 10.5 };
  const id = `${uid}-${breite}`;

  return (
    <svg
      viewBox={`0 0 ${breite} ${hoehe}`}
      width={breite}
      height={hoehe}
      role="img"
      aria-labelledby={`${id}-titel ${id}-text`}
      className="h-auto w-full font-text">
      <title id={`${id}-titel`}>{daten.label}</title>
      <desc id={`${id}-text`}>{daten.beschreibung}</desc>
      {/* The same dotted canvas as the workflow windows, so every figure on
          the site reads as one family. */}
      <defs>
        <pattern id={`${id}-punkte`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="0.9" className="fill-hairline-strong" />
        </pattern>
      </defs>
      <rect x="0.5" y="0.5" width={breite - 1} height={hoehe - 1} rx="14" className="fill-surface" />
      <rect x="0.5" y="0.5" width={breite - 1} height={hoehe - 1} rx="14" fill={`url(#${id}-punkte)`} />
      <rect
        x="0.5"
        y="0.5"
        width={breite - 1}
        height={hoehe - 1}
        rx="14"
        fill="none"
        className="stroke-hairline-strong"
      />

      {daten.quellen.map((quelle, index) => {
        const ton = TON[quelle.ton];
        const x = rand + index * (kachelB + luecke);
        const start = { x: x + kachelB / 2, y: oben + kachelH };
        const ende = { x: zielX + (zielB * (index + 1)) / (daten.quellen.length + 1), y: zielY };
        const d = `M${start.x} ${start.y}C${start.x} ${start.y + 56} ${ende.x} ${ende.y - 56} ${ende.x} ${ende.y}`;
        const verzug = { "--wf-delay": `${0.2 + index * 0.35}s` };
        const fertig = quelle.ton === "erfolg";
        return (
          <g key={quelle.name}>
            <path d={d} fill="none" className="stroke-hairline" strokeWidth="1.5" />
            {fertig ? (
              <path
                d={d}
                fill="none"
                pathLength="1"
                strokeDasharray="1"
                className={`wf-kante ${ton.linie}`}
                strokeWidth={ton.breite}
                style={verzug}
              />
            ) : (
              <path
                d={d}
                fill="none"
                className={`wf-ein ${ton.linie}`}
                strokeWidth={ton.breite}
                strokeDasharray={ton.muster}
                style={verzug}
              />
            )}
            <rect
              x={x}
              y={oben}
              width={kachelB}
              height={kachelH}
              rx="12"
              className={`fill-ink ${fertig ? "stroke-success" : "stroke-hairline-strong"}`}
              strokeWidth="1.25"
            />
            <circle cx={start.x} cy={start.y} r="3.5" className="fill-ink stroke-hairline-strong" strokeWidth="1.25" />
            <text x={x + 14} y={oben + 28} fontSize={schrift.name} className="fill-paper">
              {quelle.name}
            </text>
            <text x={x + 14} y={oben + 46} fontSize={schrift.klein} className="fill-paper-mute">
              {quelle.bereich}
            </text>
            <g className="wf-ein" style={verzug}>
              {fertig ? (
                <LuCheck
                  x={x + 12}
                  y={oben + kachelH - 25}
                  size={13}
                  className="text-success"
                  aria-hidden="true"
                  focusable="false"
                />
              ) : null}
              <text
                x={x + (fertig ? 29 : 14)}
                y={oben + kachelH - 14}
                fontSize={schrift.klein}
                className={ton.text}>
                {quelle.status}
              </text>
            </g>
          </g>
        );
      })}

      <rect
        x={zielX}
        y={zielY}
        width={zielB}
        height={zielH}
        rx="14"
        className="fill-ink stroke-accent"
        strokeWidth="1.5"
      />
      {daten.quellen.map((quelle, index) => (
        <circle
          key={quelle.name}
          cx={zielX + (zielB * (index + 1)) / (daten.quellen.length + 1)}
          cy={zielY}
          r="3.5"
          className="fill-ink stroke-accent"
          strokeWidth="1.25"
        />
      ))}
      <text x={zielX + 20} y={zielY + 34} fontSize={schrift.name + 2} className="fill-paper">
        {daten.ziel.name}
      </text>
      <text x={zielX + 20} y={zielY + 56} fontSize={schrift.klein + 0.5} className="fill-accent">
        {daten.ziel.sub}
      </text>
    </svg>
  );
};

export const PlattformBild = ({ daten }) => {
  const uid = `pb${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <>
      <div className="mx-auto max-w-md sm:hidden">
        <Bild daten={daten} breite={360} uid={uid} />
      </div>
      <div className="mx-auto hidden max-w-3xl sm:block">
        <Bild daten={daten} breite={680} uid={uid} />
      </div>
    </>
  );
};
