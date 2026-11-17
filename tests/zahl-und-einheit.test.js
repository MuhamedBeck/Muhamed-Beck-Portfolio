// Zahl und Einheit stehen mit einem geschützten Leerzeichen (U+00A0)
// zusammen, damit eine Zeile nicht zwischen „50“ und „%“ oder „59,70“ und „€“
// umbricht. Ausführen mit `npm test`. Unsichtbare Zeichen stehen hier als
// \u-Folge, damit sie beim Bearbeiten nicht verloren gehen.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { euro, preisText } from "../src/content/site.js";
import { estimatePixelWidth } from "../scripts/snippet-width.js";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
// Der Parser von ESLint: So zählt nur, was angezeigt wird (Strings,
// Template-Strings, JSX-Text), nicht Kommentare.
const espree = createRequire(import.meta.url)("espree");

/* Eine Zahl oder ein Platzhalter (`${betrag}`, `{wert}`), dann ein normales
   Leerzeichen, dann eine Einheit; dazu „Mio. €“, das an beiden Leerzeichen
   umbrechen könnte. */
const EINHEIT_NACH_LEERZEICHEN = /([0-9]|\}) (€|%|km\b|يورو|Mio\.)|Mio\. €/;
/* In JSX ist `{wert} €` ein Platzhalter und danach eigener Text, der mit dem
   Leerzeichen beginnt. */
const EINHEIT_AM_ANFANG = /^ (€|%|km\b|يورو|Mio\.)/;

const funde = (datei) => {
  const quelle = readFileSync(join(wurzel, datei), "utf8");
  const { tokens } = espree.parse(quelle, {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    tokens: true,
    loc: true,
  });
  return tokens.flatMap((token, index) => {
    if (!["String", "Template", "JSXText"].includes(token.type)) return [];
    const nachPlatzhalter =
      token.type === "JSXText" && tokens[index - 1]?.value === "}" && EINHEIT_AM_ANFANG.test(token.value);
    return EINHEIT_NACH_LEERZEICHEN.test(token.value) || nachPlatzhalter ? [`${datei}:${token.loc.start.line}`] : [];
  });
};

/* Alle Dateien mit sichtbarem Text: Inhalte, Wörterbücher, Komponenten. */
const dateien = (ordner) =>
  readdirSync(join(wurzel, ordner), { recursive: true })
    .filter((name) => /\.jsx?$/.test(name))
    .map((name) => join(ordner, name));

test("Preisfunktionen setzen ein geschütztes Leerzeichen vor die Einheit", () => {
  assert.equal(euro(4900), "4.900 €");
  assert.equal(preisText(70, "de"), "70 €");
  assert.equal(preisText(1.4, "ar"), "1,40 يورو");
  assert.equal(preisText(70, "en"), "€70");
});

test("in sichtbaren Texten steht zwischen Zahl und Einheit kein normales Leerzeichen", () => {
  const alle = [...dateien("src/content"), ...dateien("src/i18n/dict"), ...dateien("src/components")];
  assert.ok(alle.length > 50, `nur ${alle.length} Dateien gelesen`);
  assert.deepEqual(alle.flatMap(funde), []);
});

test("die Breitenschätzung für Suchergebnisse misst das geschützte Leerzeichen wie ein normales", () => {
  assert.equal(estimatePixelWidth("70 €", 20), estimatePixelWidth("70 €", 20));
});
