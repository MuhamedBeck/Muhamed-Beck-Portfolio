// Stand der Ablösung bei der Plattform-Fallstudie: Was abgelöst ist und was
// noch Plan ist, steht an mehreren Stellen und muss überall dasselbe sagen.
// Ausführen mit `npm test`.
//
// projekte.de.js lädt Bilder und lässt sich unter bloßem node nicht
// importieren, deshalb liest der Test dort den Quelltext.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { KURZPROFIL, STATIONEN } from "../src/content/lebenslauf.de.js";

const quelltext = (pfad) => readFileSync(new URL(pfad, import.meta.url), "utf8");
const ohneKommentare = (text) => text.replace(/\/\*[\s\S]*?\*\//g, "");

test("Plattform: HubSpot und RecruitCRM sind abgelöst, Personio ist der nächste Schritt", () => {
  const projekte = quelltext("../src/content/projekte.de.js");
  assert.match(projekte, /name: "HubSpot", bereich: "Vertrieb", status: "abgelöst"/);
  assert.match(projekte, /name: "RecruitCRM", bereich: "Recruiting", status: "abgelöst"/);
  assert.match(projekte, /name: "Personio", bereich: "Personal", status: "als Nächstes"/);
});

test("Plattform: Lebenslauf und Fallstudie nennen RecruitCRM als abgelöst und gekündigt", () => {
  assert.match(KURZPROFIL[0], /die HubSpot und RecruitCRM bereits abgelöst hat/);
  const station = STATIONEN.find((eintrag) => eintrag.firma === "TOPEOPLE Group GmbH");
  assert.ok(station, "Station TOPEOPLE fehlt");
  const punkte = station.gruppen.flatMap((gruppe) => gruppe.punkte).join(" ");
  assert.match(punkte, /HubSpot und RecruitCRM abgelöst und gekündigt, Personio als nächster Schritt geplant/);
  assert.match(quelltext("../src/content/projekte.de.js"), /RecruitCRM ist ebenfalls abgelöst und gekündigt/);
});

/* Die Ablösung von RecruitCRM stand bis 19.11.2026 als Plan da. Kein Satz darf
   sie weiter ankündigen. */
test("Plattform: nirgends steht die Ablösung von RecruitCRM noch als Plan", () => {
  for (const pfad of [
    "../src/content/projekte.de.js",
    "../src/content/lebenslauf.de.js",
    "../src/components/pages/UeberMich.jsx",
    "../src/components/sections/About.jsx",
  ]) {
    const quelle = ohneKommentare(quelltext(pfad));
    for (const alterSatz of [
      /als Nächstes RecruitCRM/,
      /RecruitCRM und Personio (als nächste Schritte|abzulösen)/,
      /soll RecruitCRM abgelöst werden/,
      /RecruitCRM für das Recruiting soll/,
      /HubSpot already replaced/,
    ]) {
      assert.doesNotMatch(quelle, alterSatz, pfad);
    }
  }
});
