// Rechtsseite /widerrufsbelehrung und ihre Verweise von der Dolmetscher-Seite.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ROUTES } from "../src/routes/registry.js";
import woerter from "../src/i18n/dict/dolmetscher.js";

test("Rechtsseite /widerrufsbelehrung steht in der Registry wie Impressum und Datenschutz", () => {
  const route = ROUTES.find((eintrag) => eintrag.id === "widerrufsbelehrung");
  assert.deepEqual(
    [route.path, route.locale, route.group, route.h1, route.changefreq, route.priority],
    ["/widerrufsbelehrung", "de", "widerrufsbelehrung", "Widerrufsbelehrung", "yearly", "0.3"]
  );
});

test("Fuß und Formular der Dolmetscher-Seite verweisen in drei Sprachen darauf", () => {
  for (const sprache of ["de", "en", "ar"]) {
    assert.ok(woerter[sprache].fuss.widerruf, sprache);
    assert.ok(woerter[sprache].formular.widerruf, sprache);
  }
  assert.equal(woerter.de.fuss.rechtstexteHinweis, "");
});
