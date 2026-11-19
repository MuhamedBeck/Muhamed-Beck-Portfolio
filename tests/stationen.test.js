// Stationen: Ein Zeitraum, der an mehreren Stellen steht, muss überall derselbe sein.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { STATIONEN } from "../src/content/lebenslauf.de.js";

const quelltext = (pfad) => readFileSync(new URL(pfad, import.meta.url), "utf8");

/* Laut Arbeitszeugnis endete die Station am 30.09.2024. Der Zeitraum steht im
   Lebenslauf, auf "Über mich", in der englischen Kurzfassung und in der
   Fallstudie zur Masterarbeit in drei Sprachen. */
test("Stationen: INFOMOTION endet überall im September 2024", () => {
  const station = STATIONEN.find((eintrag) => eintrag.firma === "INFOMOTION GmbH");
  assert.deepEqual([station.von, station.bis], ["02/2022", "09/2024"]);

  for (const pfad of [
    "../src/content/projekte.de.js",
    "../src/content/projects.en.js",
    "../src/content/projects.ar.js",
    "../src/components/pages/UeberMich.jsx",
    "../src/components/sections/About.jsx",
  ]) {
    const quelle = quelltext(pfad);
    assert.match(quelle, /02\/2022 \S+ 09\/2024/, pfad);
    assert.doesNotMatch(quelle, /02\/2022 \S+ 10\/2024/, pfad);
  }
});
