// Sprachangaben in src/i18n/locales.js. Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { localeConfig } from "../src/i18n/locales.js";

test("Wort vor Grafiken in der Markdown-Fassung je Sprache", () => {
  assert.deepEqual(["de", "en", "ar"].map((sprache) => localeConfig(sprache).abbildung), ["Abbildung", "Figure", "شكل"]);
});
