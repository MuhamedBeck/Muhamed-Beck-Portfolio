// Tests für die reinen Prüffunktionen in scripts/live-pruefungen.js.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { ohneSkriptMaengel } from "../scripts/live-pruefungen.js";

const HINWEIS = '<p class="ohne-skript text-sm">Hinweis <a href="mailto:a@b.de">a@b.de</a></p>';
const formular = (attribut, hinweis = HINWEIS) =>
  `<form class="x">${hinweis}<button type="submit" ${attribut}class="btn-ghost btn-accent btn-senden">Senden</button></form>`;

test("ohneSkriptMaengel: gesperrter Knopf und Hinweis, sobald ein Formular da ist", () => {
  assert.deepEqual(ohneSkriptMaengel("<main><p>kein Formular</p></main>"), []);
  assert.deepEqual(ohneSkriptMaengel(formular('disabled="" ')), []);
  assert.equal(ohneSkriptMaengel(formular("")).length, 1);
  assert.equal(ohneSkriptMaengel(formular('disabled="" ', "")).length, 1);
  assert.equal(ohneSkriptMaengel("<form><input /></form>").length, 2);
});
