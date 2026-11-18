// Tests für die Gruppen der Leistungen auf der Startseite
// (src/components/pages/Startseite.jsx). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { LEISTUNGEN } from "../src/content/leistungen.de.js";
import startseite from "../src/i18n/dict/startseite.js";

const BEREICHE = startseite.de.services.bereiche ?? [];
const IDS = BEREICHE.map((bereich) => bereich.id);

// Die Startseite zeigt nur Leistungen, deren Bereich sie kennt. Eine neue
// Leistung ohne Bereich fiele dort still heraus.
test("jede Leistung gehört genau einem Bereich der Startseite an", () => {
  assert.ok(IDS.length, "services.bereiche fehlt im Wörterbuch");
  for (const leistung of LEISTUNGEN) {
    assert.ok(IDS.includes(leistung.bereich), `${leistung.path}: bereich "${leistung.bereich}"`);
  }
});

test("jeder Bereich der Startseite hat mindestens eine Leistung", () => {
  assert.ok(IDS.length, "services.bereiche fehlt im Wörterbuch");
  for (const id of IDS) {
    assert.ok(LEISTUNGEN.some((leistung) => leistung.bereich === id), id);
  }
});

test("Zuordnung der Leistungen zu den Bereichen", () => {
  const pfade = (id) =>
    LEISTUNGEN.filter((leistung) => leistung.bereich === id).map((leistung) => leistung.path);
  assert.deepEqual(BEREICHE, [
    { id: "automatisierung", titel: "Automatisierung" },
    { id: "ki", titel: "KI" },
    { id: "web", titel: "Websites und Apps" },
  ]);
  assert.deepEqual(pfade("automatisierung"), [
    "/leistungen/n8n-automatisierung",
    "/leistungen/hubspot-integration",
    "/leistungen/recruiting-automatisierung",
    "/leistungen/linkedin-automatisierung",
    "/leistungen/n8n-automatisierung-oesterreich",
  ]);
  assert.deepEqual(pfade("ki"), [
    "/leistungen/ki-automatisierung-frankfurt",
    "/leistungen/ki-beratung",
    "/leistungen/voice-ai-agenten",
    "/leistungen/ki-agenten-entwicklung",
  ]);
  assert.deepEqual(pfade("web"), [
    "/leistungen/webentwicklung",
    "/leistungen/website-ueberarbeiten",
    "/leistungen/web-app-entwicklung",
    "/leistungen/geo-seo-optimierung",
  ]);
});
