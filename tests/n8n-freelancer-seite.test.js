// Die n8n-Leistungsseite als Zielseite für „n8n Freelancer“: Suchbegriff in
// Titel, Überschrift und Beschreibung, in den Linktexten, die auf sie zeigen,
// und die Fragen und Bilder, die eine solche Seite beantworten muss.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES } from "../src/routes/registry.js";
import { RATGEBER } from "../src/content/ratgeber.de.js";
import { LEISTUNGEN } from "../src/content/leistungen.de.js";
import { ENTSCHEIDUNG_HOSTING, ENTSCHEIDUNG_WERKZEUG } from "../src/content/workflows.de.js";

const PFAD = "/leistungen/n8n-automatisierung";
const route = ROUTES.find((eintrag) => eintrag.path === PFAD);
const seite = LEISTUNGEN.find((eintrag) => eintrag.path === PFAD);

/* Die Seite heißt so, wie nach ihr gesucht wird: „n8n Freelancer“ zuerst. */
test("n8n-Seite: Titel, Überschrift und Beschreibung beginnen mit dem Suchbegriff", () => {
  for (const feld of ["title", "h1", "description"]) {
    assert.ok(route[feld].startsWith("n8n Freelancer"), `${feld}: ${route[feld]}`);
  }
  assert.equal(seite.h1, route.h1);
});

/* Auch nach „n8n Experte“ und „n8n Spezialist“ wird gesucht; beide Wörter
   dürfen beim Umstellen der Überschrift nicht verloren gehen. */
test("n8n-Seite: Experte und Spezialist bleiben im Titel", () => {
  assert.match(route.title, /Experte/);
  assert.match(route.title, /Spezialist/);
  assert.match(`${seite.badge} ${seite.h1} ${seite.intro}`, /Spezialist/);
});

test("n8n-Seite: jeder Verweis von einer anderen Seite nennt den Suchbegriff", () => {
  const listen = [...RATGEBER, ...LEISTUNGEN]
    .filter((eintrag) => eintrag.path !== PFAD)
    .flatMap((eintrag) => [...(eintrag.related ?? []), ...(eintrag.weiterlesen ?? [])])
    .filter((verweis) => verweis.path === PFAD);
  assert.ok(listen.length >= 4, `nur ${listen.length} Verweise`);
  for (const verweis of listen) assert.equal(verweis.label, seite.h1);

  const angebote = RATGEBER.flatMap((eintrag) => eintrag.angebot?.links ?? []).filter(
    (verweis) => verweis.to === PFAD
  );
  assert.ok(angebote.length >= 2, `nur ${angebote.length} Verweise in den Angebotszeilen`);
  for (const verweis of angebote) assert.match(verweis.label, /n8n Freelancer/, verweis.label);
});

/* Die Fragen, die vor einer Beauftragung kommen: Kosten eines Freelancers,
   Freelancer oder Agentur, was n8n ist, der Umzug von Zapier, eigene
   Änderungen und was bei einem Ausfall passiert. */
test("n8n-Seite: beantwortet die Fragen vor einer Beauftragung", () => {
  const fragen = seite.faq.map((eintrag) => eintrag.q);
  const erwartet = [
    /^Was kostet ein n8n Freelancer\?$/,
    /n8n Freelancer oder n8n Agentur/,
    /^Was ist n8n\?$/,
    /Zapier.*zu n8n/,
    /selbst (anpassen|ändern)/,
    /(ausfällt|Fehler)/,
    /n8n Freelancer .*Österreich und der Schweiz/,
  ];
  for (const muster of erwartet) {
    assert.ok(fragen.some((frage) => muster.test(frage)), `keine Frage zu ${muster}`);
  }
  assert.equal(new Set(fragen).size, fragen.length, "eine Frage steht doppelt");
});

/* Werkzeugwahl und Betrieb als Bild, nicht als weiterer Absatz: dieselben
   Entscheidungsbäume wie in den Ratgebern, damit beide Seiten dasselbe sagen. */
test("n8n-Seite: Werkzeugwahl und Betrieb stehen als Bild auf der Seite", () => {
  const bilder = (seite.abbildungen ?? []).map((abbildung) => abbildung.bild.workflow);
  assert.ok(bilder.includes(ENTSCHEIDUNG_WERKZEUG), "n8n, Make oder Zapier fehlt");
  assert.ok(bilder.includes(ENTSCHEIDUNG_HOSTING), "Cloud oder selbst hosten fehlt");
  for (const abbildung of seite.abbildungen ?? []) {
    assert.ok(abbildung.titel && abbildung.text, "Abbildung ohne Titel oder Text");
  }
});
