import { useId } from "react";
import {
  LuArrowRightLeft,
  LuBuilding2,
  LuCircleCheck,
  LuInfo,
  LuMonitorSmartphone,
  LuTriangleAlert,
  LuCalculator,
  LuCalendar,
  LuCheck,
  LuClipboardList,
  LuClock,
  LuCopy,
  LuCreditCard,
  LuDatabase,
  LuGlobe,
  LuHourglass,
  LuLayoutTemplate,
  LuListChecks,
  LuMail,
  LuMailCheck,
  LuOctagonX,
  LuPaperclip,
  LuPenLine,
  LuPhoneCall,
  LuPlaneLanding,
  LuRefreshCw,
  LuRotateCcw,
  LuScanText,
  LuSend,
  LuShieldCheck,
  LuShuffle,
  LuSparkles,
  LuSplit,
  LuSquareCheckBig,
  LuUserCheck,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import { WERKZEUGMARKEN } from "./icons/werkzeugmarken";

/**
 * A real workflow, drawn the way the n8n editor shows it.
 *
 * The service pages and case studies described workflows in prose and in the
 * text-based WorkflowDiagram, and the owner's verdict was that the site read
 * as dry: page after page of text, no picture of the thing being sold. This is
 * that picture. It keeps the editor's vocabulary because that is what a buyer
 * of n8n work recognises: the dotted canvas, square nodes with ports, the
 * half-round trigger, the two outputs of an IF node, item counts on a
 * connection, green check marks after a run and the "Aktiv" switch in the top
 * bar. Flows that are not n8n workflows (an application, a sync of unknown
 * make-up) get the same canvas without the switch, so the picture claims no
 * more than is known.
 *
 * WorkflowDiagram stays where it is. It explains a generic flow in readable
 * text; this shows one specific workflow as an image, so it carries a <title>,
 * a <desc> with the whole flow as a sentence, and a visible caption from the
 * page that uses it.
 *
 * Nothing is scaled down on a phone. Positions come as grid coordinates, and
 * the same graph is laid out across for wide screens and down for narrow ones,
 * where the text would otherwise shrink below reading size. Where only part of
 * a workflow fits, `ausschnitt` cuts out a range of columns and fades the cut
 * edges, the way a large workflow runs off the side of the editor.
 *
 * Motion: once, when the section enters the viewport, the workflow "runs". The
 * connections draw in order and each node picks up its check mark. The resting
 * state is the finished run, which is also what anyone without JavaScript,
 * after the entrance failsafe, or with reduced motion sees. The keyframes live
 * in index.css next to the other entrance animations.
 */

const ICONS = {
  firma: LuBuilding2,
  ok: LuCircleCheck,
  geraet: LuMonitorSmartphone,
  info: LuInfo,
  warnung: LuTriangleAlert,
  aktualisieren: LuRefreshCw,
  anhang: LuPaperclip,
  checkbox: LuSquareCheckBig,
  datenbank: LuDatabase,
  formular: LuClipboardList,
  funken: LuSparkles,
  globus: LuGlobe,
  kalender: LuCalendar,
  karte: LuCreditCard,
  kopie: LuCopy,
  landung: LuPlaneLanding,
  liste: LuListChecks,
  mail: LuMail,
  "mail-ok": LuMailCheck,
  personen: LuUsers,
  "person-neu": LuUserPlus,
  "person-ok": LuUserCheck,
  rechner: LuCalculator,
  sanduhr: LuHourglass,
  scan: LuScanText,
  schild: LuShieldCheck,
  senden: LuSend,
  stift: LuPenLine,
  stopp: LuOctagonX,
  tauschen: LuArrowRightLeft,
  telefon: LuPhoneCall,
  uhr: LuClock,
  verteilen: LuShuffle,
  vorlage: LuLayoutTemplate,
  weiche: LuSplit,
  wiederholen: LuRotateCcw,
};

const N = 56; // node edge length, as in the editor
const LEISTE = 36; // title bar of the window
const OBEN = 40; // canvas padding above the first row
const UNTEN = 64; // room for two lines of label under the last row
const SCHRITT_SEKUNDEN = 0.22;

/* Across, labels sit under each node. Down, the connections leave through the
   bottom of a node, so a label underneath would be crossed by its own line:
   there the labels sit to the right, and the rows can be closer together. */
const RASTER = {
  waagerecht: { schritt: 132, zeile: 96, rand: 48 },
  senkrecht: { schritt: 100, zeile: 150, rand: 40, beschriftung: 142 },
};

/* Order of execution: how many connections lie between a trigger and a node.
   Nodes at the same depth light up together, and a connection lights up
   between the two nodes it joins. */
const tiefen = (workflow) => {
  const tiefe = new Map();
  const ziele = new Set(workflow.kanten.map((kante) => kante.nach));
  let welle = workflow.knoten.filter((knoten) => !ziele.has(knoten.id)).map((k) => k.id);
  welle.forEach((id) => tiefe.set(id, 0));
  while (welle.length) {
    const naechste = [];
    for (const kante of workflow.kanten) {
      if (welle.includes(kante.von) && !tiefe.has(kante.nach)) {
        tiefe.set(kante.nach, tiefe.get(kante.von) + 1);
        naechste.push(kante.nach);
      }
    }
    welle = naechste;
  }
  return tiefe;
};

const layout = (workflow, ausrichtung) => {
  const zeilen = workflow.knoten.map((knoten) => knoten.zeile);
  const zMin = Math.min(...zeilen);
  const zMax = Math.max(...zeilen);
  const spalten = Math.max(...workflow.knoten.map((knoten) => knoten.spalte));
  const raster = RASTER[ausrichtung];

  if (ausrichtung === "waagerecht") {
    const lage = new Map(
      workflow.knoten.map((knoten) => [
        knoten.id,
        { x: raster.rand + knoten.spalte * raster.schritt, y: OBEN + (knoten.zeile - zMin) * raster.zeile },
      ])
    );
    return {
      lage,
      raster,
      spalten,
      breite: 2 * raster.rand + spalten * raster.schritt + N,
      hoehe: OBEN + (zMax - zMin) * raster.zeile + N + UNTEN,
    };
  }

  /* Down: the main path runs in one column, branches step out to its left and
     right, and every label needs room to the right of its node. */
  const mitte = raster.rand + -zMin * raster.zeile + N / 2;
  const lage = new Map(
    workflow.knoten.map((knoten) => [
      knoten.id,
      { x: mitte + knoten.zeile * raster.zeile - N / 2, y: OBEN + knoten.spalte * raster.schritt },
    ])
  );
  return {
    lage,
    raster,
    spalten,
    breite: mitte + zMax * raster.zeile + N / 2 + 12 + raster.beschriftung,
    hoehe: OBEN + spalten * raster.schritt + N + OBEN,
  };
};

/* Port positions. An IF node has two outputs, "ja" above "nein" across, or
   "ja" left of "nein" down. */
const ausgang = (punkt, ausrichtung, welcher) => {
  const versatz = welcher === "ja" ? -10 : welcher === "nein" ? 10 : 0;
  return ausrichtung === "waagerecht"
    ? { x: punkt.x + N, y: punkt.y + N / 2 + versatz }
    : { x: punkt.x + N / 2 + versatz, y: punkt.y + N };
};

const eingang = (punkt, ausrichtung) =>
  ausrichtung === "waagerecht"
    ? { x: punkt.x, y: punkt.y + N / 2 }
    : { x: punkt.x + N / 2, y: punkt.y };

const kurve = (a, b, ausrichtung) => {
  if (ausrichtung === "waagerecht") {
    const k = Math.max(30, (b.x - a.x) / 2);
    return `M${a.x} ${a.y}C${a.x + k} ${a.y} ${b.x - k} ${b.y} ${b.x} ${b.y}`;
  }
  const k = Math.max(30, (b.y - a.y) / 2);
  return `M${a.x} ${a.y}C${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
};

/* The trigger's half-round left side, as in the editor. */
const ausloeserForm = (x, y) =>
  `M${x + N / 2} ${y}H${x + N - 10}Q${x + N} ${y} ${x + N} ${y + 10}V${y + N - 10}Q${x + N} ${y + N} ${x + N - 10} ${y + N}H${x + N / 2}A${N / 2} ${N / 2} 0 0 1 ${x + N / 2} ${y}Z`;

const Port = ({ x, y }) => (
  <circle cx={x} cy={y} r="3.5" className="fill-ink stroke-hairline-strong" strokeWidth="1.25" />
);

const Fenster = ({ workflow, ausrichtung, ab, bis, rest = 100, gross, verzoegerung, uid }) => {
  const { lage, breite, hoehe, raster, spalten } = layout(workflow, ausrichtung);
  const tiefe = tiefen(workflow);

  /* Ausschnitt: the columns from `ab` to `bis`, cut out around the main row.
     Connections running off a cut edge are faded; nodes beyond it are not
     drawn at all, because half a node with half a label reads as a mistake
     while a line leaving the frame reads as "continues". */
  const ausschnitt = ab !== undefined || bis !== undefined;
  const von = ab ?? 0;
  const bisSpalte = bis ?? spalten;
  const spalteVon = new Map(workflow.knoten.map((k) => [k.id, k.spalte]));
  const sichtbar = (id) => spalteVon.get(id) >= von && spalteVon.get(id) <= bisSpalte;
  const linksOffen = ausschnitt && von > 0;
  const rechtsOffen = ausschnitt && bisSpalte < spalten;

  /* Height follows the nodes in view: a cut through one row stays flat, a
     cut that includes a branch or a second input grows to show it. */
  const ys = workflow.knoten.filter((k) => sichtbar(k.id)).map((k) => lage.get(k.id).y);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const sicht = ausschnitt
    ? {
        x: linksOffen ? raster.rand + von * raster.schritt - rest : 0,
        y: yMin - 64,
        h: yMax - yMin + 64 + N + UNTEN + 12,
      }
    : { x: 0, y: 0, h: hoehe };
  sicht.w = ausschnitt
    ? (rechtsOffen ? raster.rand + bisSpalte * raster.schritt + N + rest : breite) - sicht.x
    : breite;

  /* The run starts at the first node that is in view. */
  const basis = Math.min(...workflow.knoten.filter((k) => sichtbar(k.id)).map((k) => tiefe.get(k.id)));
  const takt = (stufe) => `${(verzoegerung + Math.max(0, stufe) * SCHRITT_SEKUNDEN).toFixed(2)}s`;

  /* Shown smaller than the whole workflow, so a hero sets its type one size up. */
  const schrift = gross ? { label: 14, sub: 12 } : { label: 13, sub: 11 };
  const w = sicht.w;
  const h = LEISTE + sicht.h;
  /* One id per variant: two of them sit in the page at once, one hidden, and a
     mask or pattern looked up by a shared id would resolve into the hidden
     copy, which does not render. */
  const id = `${uid}-${ausrichtung}-${ausschnitt ? `${von}-${bisSpalte}` : "ganz"}`;
  const blende = rest + 20;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      role="img"
      aria-labelledby={`${id}-titel ${id}-text`}
      /* At most about 1.35 times its drawn size: a short workflow stretched
         across the full column turns into giant nodes and 22px labels. */
      style={{ maxWidth: `${Math.round(w * 1.35)}px` }}
      className="h-auto w-full font-text">
      <title id={`${id}-titel`}>
        {workflow.fenster === "app" ? workflow.titel : `n8n-Workflow: ${workflow.titel}`}
      </title>
      <desc id={`${id}-text`}>{workflow.beschreibung}</desc>
      <defs>
        <clipPath id={`${id}-fenster`}>
          <rect x="0" y="0" width={w} height={h} rx="14" />
        </clipPath>
        <pattern id={`${id}-punkte`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="0.9" className="fill-hairline-strong" />
        </pattern>
        {ausschnitt ? (
          <>
            <linearGradient id={`${id}-verlauf`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={linksOffen ? "black" : "white"} />
              <stop offset={`${(blende / w).toFixed(3)}`} stopColor="white" />
              <stop offset={`${((w - blende) / w).toFixed(3)}`} stopColor="white" />
              <stop offset="1" stopColor={rechtsOffen ? "black" : "white"} />
            </linearGradient>
            <mask id={`${id}-blende`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
              <rect x="0" y="0" width={w} height={h} fill={`url(#${id}-verlauf)`} />
            </mask>
          </>
        ) : null}
      </defs>

      <g clipPath={`url(#${id}-fenster)`}>
        <rect x="0" y="0" width={w} height={h} className="fill-surface" />
        <rect x="0" y={LEISTE} width={w} height={h - LEISTE} fill={`url(#${id}-punkte)`} />

        <g mask={ausschnitt ? `url(#${id}-blende)` : undefined}>
          <g transform={`translate(${-sicht.x} ${LEISTE - sicht.y})`}>
            {workflow.kanten
              .filter((kante) => sichtbar(kante.von) || sichtbar(kante.nach))
              .map((kante) => {
                const a = ausgang(lage.get(kante.von), ausrichtung, kante.ausgang);
                const b = eingang(lage.get(kante.nach), ausrichtung);
                const d = kurve(a, b, ausrichtung);
                const stufe = 2 * (tiefe.get(kante.von) - basis) + 1;
                const mitte = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
                return (
                  <g key={`${kante.von}-${kante.nach}`}>
                    <path d={d} fill="none" className="stroke-hairline-strong" strokeWidth="1.5" />
                    <path
                      d={d}
                      fill="none"
                      pathLength="1"
                      strokeDasharray="1"
                      className="wf-kante stroke-accent"
                      strokeWidth="1.5"
                      style={{ "--wf-delay": takt(stufe) }}
                    />
                    {/* Across, the output name sits beside its port as in the
                        editor. Down, the two ports are too close for that, so
                        each name moves out to the middle of its own branch. */}
                    {kante.ausgang ? (
                      <text
                        x={ausrichtung === "waagerecht" ? a.x + 7 : mitte.x + (kante.ausgang === "ja" ? -8 : 8)}
                        y={ausrichtung === "waagerecht" ? a.y + (kante.ausgang === "ja" ? -6 : -4) : mitte.y + 4}
                        textAnchor={ausrichtung === "senkrecht" && kante.ausgang === "ja" ? "end" : "start"}
                        fontSize="10.5"
                        className="fill-paper-mute">
                        {kante.ausgang}
                      </text>
                    ) : null}
                    {kante.menge ? (
                      <text
                        x={ausrichtung === "waagerecht" ? mitte.x : mitte.x + 10}
                        y={ausrichtung === "waagerecht" ? mitte.y - 9 : mitte.y + 4}
                        textAnchor={ausrichtung === "waagerecht" ? "middle" : "start"}
                        fontSize="10.5"
                        className="fill-accent">
                        {kante.menge}
                      </text>
                    ) : null}
                  </g>
                );
              })}

            {workflow.knoten
              .filter((knoten) => sichtbar(knoten.id))
              .map((knoten) => {
                const { x, y } = lage.get(knoten.id);
                /* A node may carry a tool's own mark instead of a glyph, in
                   the tool's colour, the way the editor draws an app node. */
                const marke = WERKZEUGMARKEN[knoten.marke];
                const Icon = marke?.Icon ?? ICONS[knoten.icon];
                const verzug = { "--wf-delay": takt(2 * (tiefe.get(knoten.id) - basis)) };
                const ausgaenge = knoten.art === "weiche" ? ["ja", "nein"] : [undefined];
                const waagerecht = ausrichtung === "waagerecht";
                return (
                  <g key={knoten.id}>
                    {knoten.art === "ausloeser" ? (
                      <path
                        d={ausloeserForm(x, y)}
                        className="wf-knoten fill-ink stroke-hairline-strong"
                        strokeWidth="1.25"
                        style={verzug}
                      />
                    ) : (
                      /* A person is not a node: dashed, so a release by hand
                         never passes for an automated step. */
                      <rect
                        x={x}
                        y={y}
                        width={N}
                        height={N}
                        rx="10"
                        className="wf-knoten fill-ink stroke-hairline-strong"
                        strokeWidth="1.25"
                        strokeDasharray={knoten.art === "mensch" ? "5 4" : undefined}
                        style={verzug}
                      />
                    )}
                    <Icon
                      x={x + N / 2 - 12}
                      y={y + N / 2 - 12}
                      size={24}
                      className={
                        marke
                          ? "tech-mark"
                          : knoten.art === "mensch" || knoten.ton === "warm"
                            ? "text-warm"
                            : knoten.ton === "erfolg"
                              ? "text-success"
                              : "text-paper-soft"
                      }
                      style={marke ? { color: marke.farbe } : undefined}
                      aria-hidden="true"
                      focusable="false"
                    />
                    {knoten.art !== "ausloeser" ? <Port {...eingang({ x, y }, ausrichtung)} /> : null}
                    {knoten.art !== "mensch" &&
                    (workflow.art !== "entscheidung" ||
                      workflow.kanten.some((kante) => kante.von === knoten.id))
                      ? ausgaenge.map((welcher) => (
                          <Port key={welcher ?? "aus"} {...ausgang({ x, y }, ausrichtung, welcher)} />
                        ))
                      : null}
                    {/* No check mark on a person: the run ends where a human
                        decides, and a green tick there would claim the
                        automation released the mail itself. */}
                    {/* A decision tree is not executed, so it carries no check
                        marks at all; its end nodes say their outcome in colour. */}
                    {knoten.art !== "mensch" && workflow.art !== "entscheidung" ? (
                      <g className="wf-haken" style={verzug}>
                        <circle cx={x + N - 4} cy={y + N - 4} r="8" className="fill-success" />
                        <LuCheck
                          x={x + N - 9.5}
                          y={y + N - 9.5}
                          size={11}
                          className="text-ink"
                          aria-hidden="true"
                          focusable="false"
                        />
                      </g>
                    ) : null}
                    <text
                      x={waagerecht ? x + N / 2 : x + N + 12}
                      y={waagerecht ? y + N + 20 : y + N / 2 + (knoten.sub ? -2 : 5)}
                      textAnchor={waagerecht ? "middle" : "start"}
                      fontSize={schrift.label}
                      className="fill-paper">
                      {knoten.label}
                    </text>
                    {knoten.sub ? (
                      <text
                        x={waagerecht ? x + N / 2 : x + N + 12}
                        y={waagerecht ? y + N + 22 + schrift.sub + 3 : y + N / 2 + schrift.sub + 3}
                        textAnchor={waagerecht ? "middle" : "start"}
                        fontSize={schrift.sub}
                        className="fill-paper-mute">
                        {knoten.sub}
                      </text>
                    ) : null}
                  </g>
                );
              })}
          </g>
        </g>

        {/* Title bar last, so nothing on the canvas runs over it. */}
        <rect x="0" y="0" width={w} height={LEISTE} className="fill-ink" />
        <rect x="0" y="0" width={w} height={LEISTE} className="fill-surface" />
        <line x1="0" x2={w} y1={LEISTE} y2={LEISTE} className="stroke-hairline" />
        <text x="16" y="23" fontSize="12" className="fill-paper-dim">
          {workflow.titel}
        </text>
        {workflow.fenster !== "app" ? (
          <>
            <text x={w - 52} y="23" fontSize="11" textAnchor="end" className="fill-paper-mute">
              Aktiv
            </text>
            <rect x={w - 44} y="11" width="28" height="15" rx="7.5" className="fill-success" />
            <circle cx={w - 23.5} cy="18.5" r="5" className="fill-ink" />
          </>
        ) : null}
      </g>
      <rect
        x="0.5"
        y="0.5"
        width={w - 1}
        height={h - 1}
        rx="13.5"
        fill="none"
        className="stroke-hairline-strong"
      />
    </svg>
  );
};

/**
 * @param {object} props
 * @param {object} props.workflow    one entry from content/workflows.de.js
 * @param {object} [props.ausschnitt]
 *   Show a range of columns instead of the whole workflow, as
 *   { klein: { ab, bis }, gross: { ab, bis } }: "klein" below sm, "gross" from
 *   sm. Without it the whole workflow is shown, across from md and down below.
 * @param {boolean} [props.gross]     one type size up, for use beside a headline
 * @param {number} [props.verzoegerung]  seconds before the run starts
 */
export const WorkflowCanvas = ({ workflow, ausschnitt, gross = false, verzoegerung = 0.15 }) => {
  /* useId is stable between the prerender and hydration, which ids inside an
     SVG need to be. React wraps it in characters that do not belong in a
     url(#...) reference, so only the safe part is kept. */
  const uid = `wf${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const gemeinsam = { workflow, gross, verzoegerung, uid };

  if (ausschnitt) {
    return (
      <>
        <div className="sm:hidden">
          <Fenster {...gemeinsam} ausrichtung="waagerecht" rest={72} {...ausschnitt.klein} />
        </div>
        <div className="hidden sm:block">
          <Fenster {...gemeinsam} ausrichtung="waagerecht" {...ausschnitt.gross} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-md md:hidden">
        <Fenster {...gemeinsam} ausrichtung="senkrecht" />
      </div>
      <div className="hidden md:block">
        <Fenster {...gemeinsam} ausrichtung="waagerecht" />
      </div>
    </>
  );
};
