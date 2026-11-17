// Tests für die Feldkennungen des Anfrageformulars der Dolmetscher-Seite.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { AUTOFILL_MUSTER } from "./autofill-muster.js";
import { FELD_IDS, LEERE_FELDER } from "../src/services/dolmetscherAnfrage.js";

test("jedes Feld hat eine Kennung mit dem Präfix dolmetscher-", () => {
  assert.deepEqual(Object.keys(FELD_IDS), Object.keys(LEERE_FELDER));
  for (const [name, id] of Object.entries(FELD_IDS)) assert.equal(id, `dolmetscher-${name}`);
});

test("Ortsfeld: Name und Kennung ziehen kein Autofill an", () => {
  assert.doesNotMatch("treffpunkt", AUTOFILL_MUSTER);
  assert.doesNotMatch(FELD_IDS.treffpunkt, AUTOFILL_MUSTER);
});

test("nur Name, E-Mail und Telefon behalten Autofill", () => {
  for (const name of Object.keys(FELD_IDS)) {
    assert.equal(AUTOFILL_MUSTER.test(name), ["name", "email", "telefon"].includes(name), name);
  }
});
