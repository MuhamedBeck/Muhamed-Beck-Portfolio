// Tests für die reinen Prüffunktionen in scripts/live-pruefungen.js.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { archivStatusMaengel, kontaktwegeMaengel, ohneSkriptMaengel } from "../scripts/live-pruefungen.js";

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

const WEGE = { whatsapp: "https://wa.me/4917666008485", telefon: "tel:+4917666008485" };
const GUT = '<a href="https://wa.me/4917666008485?text=Hallo">W</a><a href="tel:+4917666008485">T</a>';

test("kontaktwegeMaengel: WhatsApp mit der richtigen Nummer und ein Telefon-Verweis", () => {
  assert.deepEqual(kontaktwegeMaengel(GUT, WEGE), []);
  assert.equal(kontaktwegeMaengel(GUT.replace("4917666008485?", "4917666008486?"), WEGE).length, 1);
  assert.equal(kontaktwegeMaengel("<p>nichts</p>", WEGE).length, 2);
});

test("archivStatusMaengel: nur 200 mit ok gilt", () => {
  assert.deepEqual(archivStatusMaengel({ status: 200, body: '{"ok":true}' }), []);
  for (const antwort of [
    { status: 503, body: '{"ok":false}' }, { status: 404, body: "" }, { status: 200, body: "<html>" },
  ]) assert.equal(archivStatusMaengel(antwort).length, 1);
});
