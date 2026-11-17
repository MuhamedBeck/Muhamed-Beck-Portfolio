// Suchbegriff des Ratgebers „n8n Kosten“ in Titel, Überschrift, Navigation und
// in den Linktexten, die von anderen Seiten auf ihn zeigen. Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES } from "../src/routes/registry.js";
import { RATGEBER } from "../src/content/ratgeber.de.js";
import { LEISTUNGEN } from "../src/content/leistungen.de.js";

test("Ratgeber n8n Kosten: Suchbegriff in Titel, Überschrift, Beschreibung, Navigation und Verweisen", () => {
  const route = ROUTES.find((eintrag) => eintrag.path === "/ratgeber/n8n-kosten");
  for (const feld of ["title", "h1", "description", "navLabel"]) assert.match(route[feld], /n8n Kosten/, feld);
  const artikel = RATGEBER.find((eintrag) => eintrag.path === "/ratgeber/n8n-kosten");
  assert.equal(artikel.h1, route.h1);
  const verweise = [...RATGEBER, ...LEISTUNGEN]
    .flatMap((eintrag) => [...(eintrag.related ?? []), ...(eintrag.weiterlesen ?? [])])
    .filter((verweis) => verweis.path === "/ratgeber/n8n-kosten");
  assert.ok(verweise.length >= 4, `nur ${verweise.length} Verweise`);
  for (const verweis of verweise) assert.match(verweis.label, /n8n Kosten/, verweis.label);
});
