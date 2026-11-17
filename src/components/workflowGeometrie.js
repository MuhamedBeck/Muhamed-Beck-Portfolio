/**
 * Geometrie der Workflow-Grafik (WorkflowCanvas.jsx): Lage der Knoten,
 * Anschlüsse, Verbindungen und die Form des Auslösers. Reines JavaScript ohne
 * React, damit die Tests sie unter bloßem Node laden
 * (tests/workflow-geometrie.test.js).
 *
 * `richtung` ist die Leserichtung der Seite. Mit "rtl" wird gespiegelt, in
 * derselben Breite: Waagerecht liegt Spalte 0 rechts, die Verbindungen
 * verlassen einen Knoten links und treten rechts ein, und der Halbkreis des
 * Auslösers sitzt rechts. Senkrecht läuft der Ablauf weiter von oben nach
 * unten, nur liegt die Knotenspalte rechts und der Platz für die Beschriftung
 * links. Ohne `richtung` ist jedes Ergebnis dasselbe wie vor der Spiegelung.
 */

export const N = 56; // node edge length, as in the editor
export const LEISTE = 36; // title bar of the window
export const OBEN = 40; // canvas padding above the first row
export const UNTEN = 64; // room for two lines of label under the last row

/* Across, labels sit under each node. Down, the connections leave through the
   bottom of a node, so a label underneath would be crossed by its own line:
   there the labels sit to the right, and the rows can be closer together. */
export const RASTER = {
  waagerecht: { schritt: 132, zeile: 96, rand: 48 },
  senkrecht: { schritt: 100, zeile: 150, rand: 40, beschriftung: 142 },
};

const vonRechts = (richtung) => richtung === "rtl";

const layoutVonLinks = (workflow, ausrichtung) => {
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

/**
 * Lage jedes Knotens (linke obere Ecke), dazu Breite und Höhe der Fläche.
 *
 * @param {object} workflow    { knoten: [{ id, spalte, zeile }], kanten }
 * @param {"waagerecht"|"senkrecht"} ausrichtung
 * @param {"ltr"|"rtl"} [richtung]
 */
export const layout = (workflow, ausrichtung, richtung = "ltr") => {
  const ergebnis = layoutVonLinks(workflow, ausrichtung);
  if (!vonRechts(richtung)) return ergebnis;
  const lage = new Map(
    [...ergebnis.lage].map(([id, punkt]) => [id, { x: ergebnis.breite - punkt.x - N, y: punkt.y }])
  );
  return { ...ergebnis, lage };
};

/* Port positions. An IF node has two outputs, "ja" above "nein" across, or
   "ja" left of "nein" down (mirrored from the right: "ja" right of "nein"). */
export const ausgang = (punkt, ausrichtung, welcher, richtung = "ltr") => {
  const versatz = welcher === "ja" ? -10 : welcher === "nein" ? 10 : 0;
  if (ausrichtung === "waagerecht") {
    return { x: vonRechts(richtung) ? punkt.x : punkt.x + N, y: punkt.y + N / 2 + versatz };
  }
  return { x: punkt.x + N / 2 + (vonRechts(richtung) ? -versatz : versatz), y: punkt.y + N };
};

export const eingang = (punkt, ausrichtung, richtung = "ltr") =>
  ausrichtung === "waagerecht"
    ? { x: vonRechts(richtung) ? punkt.x + N : punkt.x, y: punkt.y + N / 2 }
    : { x: punkt.x + N / 2, y: punkt.y };

export const kurve = (a, b, ausrichtung, richtung = "ltr") => {
  if (ausrichtung === "waagerecht") {
    const s = vonRechts(richtung) ? -1 : 1;
    const k = Math.max(30, (s * (b.x - a.x)) / 2);
    return `M${a.x} ${a.y}C${a.x + s * k} ${a.y} ${b.x - s * k} ${b.y} ${b.x} ${b.y}`;
  }
  const k = Math.max(30, (b.y - a.y) / 2);
  return `M${a.x} ${a.y}C${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
};

/* The trigger's half-round left side, as in the editor; from the right, the
   half-round sits on the right, where the flow enters the picture. */
export const ausloeserForm = (x, y, richtung = "ltr") =>
  vonRechts(richtung)
    ? `M${x + N / 2} ${y}H${x + 10}Q${x} ${y} ${x} ${y + 10}V${y + N - 10}Q${x} ${y + N} ${x + 10} ${y + N}H${x + N / 2}A${N / 2} ${N / 2} 0 0 0 ${x + N / 2} ${y}Z`
    : `M${x + N / 2} ${y}H${x + N - 10}Q${x + N} ${y} ${x + N} ${y + 10}V${y + N - 10}Q${x + N} ${y + N} ${x + N - 10} ${y + N}H${x + N / 2}A${N / 2} ${N / 2} 0 0 1 ${x + N / 2} ${y}Z`;
