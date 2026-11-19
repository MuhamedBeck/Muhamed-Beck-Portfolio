// Tests für die kostenlose Einschätzung als ersten Schritt: dieselben Worte auf
// jedem Knopf, der zur Kontaktseite führt, und auf der Kontaktseite selbst.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ANFRAGE_ZUSAGE, LEISTUNGEN } from "../src/content/leistungen.de.js";
import { ANFRAGE_KNOPF } from "../src/content/site.js";
import { ROUTES } from "../src/routes/registry.js";
import home from "../src/i18n/dict/home.js";
import startseite from "../src/i18n/dict/startseite.js";
import nav from "../src/i18n/dict/nav.js";
import ui from "../src/i18n/dict/ui.js";
import { CASE_STUDY_COPY } from "../src/components/pages/projekte/caseStudyCopy.js";

test("Einschätzung: Knopftext und Zusage", () => {
  assert.equal(ANFRAGE_KNOPF, "Kostenlose Einschätzung anfordern");
  assert.equal(ANFRAGE_ZUSAGE, "Antwort per Mail innerhalb von 24 Stunden");
});

test("Einschätzung: alle deutschen Knöpfe zur Kontaktseite sagen dasselbe", () => {
  for (const leistung of LEISTUNGEN) {
    assert.equal(leistung.cta?.button, undefined, `${leistung.path} hat eigenen Knopftext`);
  }
  assert.equal(home.de.ctaPrimary, ANFRAGE_KNOPF);
  assert.equal(startseite.de.cta.button, ANFRAGE_KNOPF);
  assert.equal(ui.de.requestProject, ANFRAGE_KNOPF);
  assert.equal(CASE_STUDY_COPY.de.ctaButton, ANFRAGE_KNOPF);
  assert.equal(nav.de.cta.label, "Einschätzung");
});

test("Einschätzung: Kontaktseite heißt so, wie die Knöpfe versprechen", () => {
  const kontakt = ROUTES.find((route) => route.path === "/kontakt");
  assert.equal(kontakt.h1, "Kostenlose Einschätzung");
  assert.ok(kontakt.title.startsWith("Kostenlose Einschätzung"), kontakt.title);
  assert.ok(kontakt.description.length >= 70 && kontakt.description.length <= 165, kontakt.description);
});

test("Einschätzung: englische und arabische Knöpfe bleiben", () => {
  assert.equal(home.en.ctaPrimary, "Start a project");
  assert.equal(nav.en.cta.label, "Start a project");
  assert.equal(ui.en.requestProject, "Start a project");
  assert.equal(CASE_STUDY_COPY.en.ctaButton, "Start a project");
  assert.equal(nav.ar.cta.label, "ابدأ مشروعًا");
});

test("Einschätzung: kein Ratgeber hat einen eigenen Knopftext", async () => {
  const { RATGEBER } = await import("../src/content/ratgeber.de.js");
  for (const artikel of Array.isArray(RATGEBER) ? RATGEBER : Object.values(RATGEBER)) {
    assert.equal(artikel.cta?.button, undefined, `${artikel.path ?? artikel.slug} hat eigenen Knopftext`);
  }
});

// Die Ratgeber mit den meisten Rankings zeigten das Angebot erst nach etwa
// zehn Handy-Bildschirmen. Die Angebotszeile steht jetzt unter der Einleitung.
test("Ratgeber: Angebotszeile mit Links auf vorhandene Seiten", async () => {
  const { RATGEBER } = await import("../src/content/ratgeber.de.js");
  const { DOLMETSCH_RATGEBER } = await import("../src/content/dolmetscher.ratgeber.de.js");
  const pfade = new Set(ROUTES.map((route) => route.path));
  const artikel = [...(Array.isArray(RATGEBER) ? RATGEBER : Object.values(RATGEBER)), ...DOLMETSCH_RATGEBER];
  const finde = (pfad) => artikel.find((eintrag) => eintrag.path === pfad);
  for (const pfad of ["/ratgeber/n8n-freelancer-kosten", "/ratgeber/n8n-kosten", "/dolmetscher-arabisch-frankfurt/kosten"]) {
    const angebot = finde(pfad)?.angebot;
    assert.ok(angebot?.text && angebot.links?.length >= 2, `${pfad}: keine Angebotszeile`);
    for (const link of angebot.links) assert.ok(pfade.has(link.to.split(/[?#]/)[0]), `${pfad}: ${link.to}`);
  }
  const links = finde("/ratgeber/n8n-freelancer-kosten").angebot.links;
  assert.deepEqual(links.map((link) => link.to), [
    "/leistungen/n8n-automatisierung",
    "/ratgeber/n8n-kosten",
    "/kontakt?leistung=n8n-automatisierung",
  ]);
  assert.equal(links[0].label, "n8n Spezialist in Frankfurt");
  assert.ok(links[1].label.startsWith("n8n Kosten"), links[1].label);
  assert.equal(links[2].label, ANFRAGE_KNOPF);
});

// projekte.de.js lässt sich unter bloßem Node nicht laden (Bild-Importe), daher
// über den Quelltext: keine Fallstudie trägt einen eigenen Knopftext.
test("Einschätzung: Fallstudien ohne eigenen Knopftext, Text darüber passt", async () => {
  const { readFileSync } = await import("node:fs");
  const quelle = readFileSync(new URL("../src/content/projekte.de.js", import.meta.url), "utf8");
  assert.doesNotMatch(quelle, /^\s*button:/m);
  assert.doesNotMatch(CASE_STUDY_COPY.de.ctaIntro, /im Gespräch/);
  assert.match(CASE_STUDY_COPY.de.ctaIntro, /Einschätzung per Mail/);
});
