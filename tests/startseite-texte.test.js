// Tests für die festgelegten Texte im Kopfbereich der deutschen Startseite
// (src/i18n/dict/home.js). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import home from "../src/i18n/dict/home.js";
import { FESTPREIS, RATE_MAX, RATE_MIN, euro } from "../src/content/site.js";

test("Startseite: Quellenhinweis und Preiszeile wie freigegeben", () => {
  assert.equal(
    home.de.statsNote,
    "Werte aus laufenden Systemen meines Arbeitgebers TOPEOPLE Group GmbH, Stand Oktober 2026.",
  );
  assert.equal(
    home.de.preisZeile,
    `${RATE_MIN} bis ${RATE_MAX}\u00A0€ pro Stunde, Websites zum Festpreis ab ${euro(FESTPREIS.website)}, Überarbeitungen ab ${euro(FESTPREIS.update)}.`,
  );
});

// /en und /ar zeigen keine Zahl von Phoenix Parkservice; der Halbsatz dazu fehlt.
test("Startseite EN und AR: Quellenhinweis ohne Phoenix Parkservice", () => {
  assert.equal(
    home.en.statsNote,
    "All figures come from systems running in production, not from demos, as of October 2026. TOPEOPLE Group GmbH is my employer.",
  );
  assert.equal(
    home.ar.statsNote,
    "جميع الأرقام مأخوذة من أنظمة تعمل في بيئة الإنتاج، لا من عروض توضيحية، بحسب بيانات أكتوبر 2026. شركة TOPEOPLE Group GmbH هي جهة عملي.",
  );
});
