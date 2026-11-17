// Tests für Zusätze im Kopf der vorgerenderten Seiten (src/seo/kopfZusaetze.js).
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { schriftVorladen } from "../src/seo/kopfZusaetze.js";

test("schriftVorladen: nur arabische Routen laden den Schnitt 400 vor", () => {
  assert.equal(
    schriftVorladen("ar"),
    '  <link rel="preload" href="/fonts/ibm-plex-sans-arabic-400.woff2" as="font" type="font/woff2" crossorigin />\n'
  );
  assert.equal(schriftVorladen("de"), "");
  assert.equal(schriftVorladen("en"), "");
});
