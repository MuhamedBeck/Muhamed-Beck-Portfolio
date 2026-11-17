// Tests für die Geometrie der Workflow-Grafik (src/components/workflowGeometrie.js),
// in beiden Leserichtungen. Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ausgang, eingang, kurve, layout } from "../src/components/workflowGeometrie.js";

const GERADE = { knoten: [0, 1, 2, 3, 4].map((spalte) => ({ id: `k${spalte}`, spalte, zeile: 0 })), kanten: [] };
const xs = (lage) => [...lage.values()].map((punkt) => punkt.x);
const ys = (lage) => [...lage.values()].map((punkt) => punkt.y);

test("waagerecht von links: Lage und Anschlüsse wie bisher", () => {
  const { lage, breite, hoehe } = layout(GERADE, "waagerecht");
  assert.deepEqual(xs(lage), [48, 180, 312, 444, 576]);
  assert.deepEqual([breite, hoehe], [680, 160]);
  assert.deepEqual(ausgang({ x: 48, y: 40 }, "waagerecht"), { x: 104, y: 68 });
  assert.deepEqual(eingang({ x: 180, y: 40 }, "waagerecht"), { x: 180, y: 68 });
  assert.equal(kurve({ x: 104, y: 68 }, { x: 180, y: 68 }, "waagerecht"), "M104 68C142 68 142 68 180 68");
});

test("waagerecht von rechts: gespiegelt, der Ablauf beginnt rechts", () => {
  const { lage, breite } = layout(GERADE, "waagerecht", "rtl");
  assert.deepEqual(xs(lage), [576, 444, 312, 180, 48]);
  assert.equal(breite, 680);
  assert.deepEqual(ausgang({ x: 576, y: 40 }, "waagerecht", undefined, "rtl"), { x: 576, y: 68 });
  assert.deepEqual(eingang({ x: 444, y: 40 }, "waagerecht", "rtl"), { x: 500, y: 68 });
  assert.equal(kurve({ x: 576, y: 68 }, { x: 500, y: 68 }, "waagerecht", "rtl"), "M576 68C538 68 538 68 500 68");
});

test("senkrecht: in beiden Richtungen von oben nach unten, Knoten auf der Leseseite", () => {
  const links = layout(GERADE, "senkrecht");
  const rechts = layout(GERADE, "senkrecht", "rtl");
  assert.deepEqual(ys(links.lage), [40, 140, 240, 340, 440]);
  assert.deepEqual(ys(rechts.lage), [40, 140, 240, 340, 440]);
  assert.deepEqual([links.breite, rechts.breite], [250, 250]);
  assert.equal(links.lage.get("k0").x, 40);
  assert.equal(rechts.lage.get("k0").x, 250 - 40 - 56);
});
