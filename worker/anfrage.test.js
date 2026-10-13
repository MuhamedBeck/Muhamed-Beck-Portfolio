// Tests für worker/anfrage.js, ohne Netz: GitHub wird über ein ersetztes
// fetch simuliert. Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import {
  alsMarkdown,
  anfrageAnnehmen,
  base64Utf8,
  dateiPfad,
  einzeilig,
  pruefen,
  zaunFuer,
} from "./anfrage.js";

const GUELTIG = {
  formular: "kontakt",
  name: "  Erika Muster ",
  email: "erika_muster@firma.de",
  unternehmen: "",
  leistung: "Website erstellen lassen",
  herkunft: "Google-Suche",
  nachricht: "Zeile eins\nZeile zwei mit Ümlaut",
};

const ENV = { GITHUB_TOKEN: "test-token", ANFRAGEN_REPO: "MuhamedBeck/anfragen" };

const post = (body, origin = "https://muhamedbeck.com") =>
  new Request("https://muhamedbeck.com/api/anfrage", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(origin ? { Origin: origin } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const mitFetch = async (ersatz, ablauf) => {
  const original = globalThis.fetch;
  globalThis.fetch = ersatz;
  try {
    return await ablauf();
  } finally {
    globalThis.fetch = original;
  }
};

test("pruefen nimmt eine gültige Anfrage an und trimmt", () => {
  const { daten, fehler } = pruefen(GUELTIG);
  assert.equal(fehler, undefined);
  assert.equal(daten.name, "Erika Muster");
  assert.equal(daten.unternehmen, "");
});

test("pruefen lehnt fehlende, falsche und zu lange Angaben ab", () => {
  assert.match(pruefen({ ...GUELTIG, name: " " }).fehler, /name fehlt/);
  assert.match(pruefen({ ...GUELTIG, email: "keine-adresse" }).fehler, /email/);
  assert.match(pruefen({ ...GUELTIG, nachricht: "x".repeat(10_001) }).fehler, /länger/);
  assert.match(pruefen({ ...GUELTIG, name: 42 }).fehler, /Text/);
  assert.match(pruefen([]).fehler, /JSON-Objekt/);
});

test("einzeilig entwertet Links und HTML, lässt Adressen lesbar", () => {
  assert.equal(einzeilig("a\n b"), "a b");
  assert.equal(einzeilig("![x](https://evil.example/p.png)"), "!\\[x\\](https://evil.example/p.png)");
  assert.equal(einzeilig("<img src=x>"), "\\<img src=x\\>");
  assert.equal(einzeilig("erika_muster@firma.de"), "erika_muster@firma.de");
});

test("zaunFuer ist länger als jede Tilde-Folge im Text", () => {
  assert.equal(zaunFuer("ohne"), "~~~~");
  assert.equal(zaunFuer("a ~~~~~ b"), "~~~~~~");
});

test("alsMarkdown enthält Kopf, Angaben und die Nachricht unverändert", () => {
  const { daten } = pruefen(GUELTIG);
  const md = alsMarkdown(daten, new Date("2026-10-13T09:15:02Z"));
  assert.match(md, /^---\neingang: "2026-10-13T09:15:02.000Z"\nstatus: "neu"/);
  assert.match(md, /- \*\*Unternehmen:\*\* nicht angegeben/);
  assert.match(md, /~~~~text\nZeile eins\nZeile zwei mit Ümlaut\n~~~~/);
  assert.match(md, /13\.10\.2026, 11:15 \(Berlin\)/);
});

test("dateiPfad ordnet nach Jahr und Monat", () => {
  assert.equal(
    dateiPfad(new Date("2026-10-13T09:15:02.456Z"), "a1b2c3d4"),
    "anfragen/2026/10/2026-10-13T09-15-02Z-a1b2c3d4.md"
  );
});

test("base64Utf8 übersteht Umlaute", () => {
  const text = "Grüße aus Frankfurt – ß";
  assert.equal(Buffer.from(base64Utf8(text), "base64").toString("utf8"), text);
});

test("anfrageAnnehmen: Methode, Herkunft, JSON und Honeypot", async () => {
  const keinAufruf = async () => assert.fail("GitHub darf nicht aufgerufen werden");
  await mitFetch(keinAufruf, async () => {
    const get = await anfrageAnnehmen(new Request("https://muhamedbeck.com/api/anfrage"), ENV);
    assert.equal(get.status, 405);
    assert.equal((await anfrageAnnehmen(post(GUELTIG, null), ENV)).status, 403);
    assert.equal((await anfrageAnnehmen(post(GUELTIG, "https://evil.example"), ENV)).status, 403);
    assert.equal((await anfrageAnnehmen(post("{kaputt"), ENV)).status, 400);
    assert.equal((await anfrageAnnehmen(post({ ...GUELTIG, email: "x" }), ENV)).status, 400);
    assert.equal((await anfrageAnnehmen(post({ ...GUELTIG, zweitadresse: "spam" }), ENV)).status, 200);
    assert.equal((await anfrageAnnehmen(post(GUELTIG), {})).status, 503);
  });
});

test("anfrageAnnehmen legt die Datei per Contents-API an", async () => {
  let aufruf;
  const github = async (url, init) => {
    aufruf = { url, init };
    return new Response("{}", { status: 201 });
  };
  const antwort = await mitFetch(github, () => anfrageAnnehmen(post(GUELTIG), ENV));

  assert.equal(antwort.status, 201);
  assert.match(aufruf.url, /^https:\/\/api\.github\.com\/repos\/MuhamedBeck\/anfragen\/contents\/anfragen\/\d{4}\/\d{2}\/.+\.md$/);
  assert.equal(aufruf.init.method, "PUT");
  assert.equal(aufruf.init.headers.Authorization, "Bearer test-token");
  const body = JSON.parse(aufruf.init.body);
  assert.match(Buffer.from(body.content, "base64").toString("utf8"), /# Anfrage von Erika Muster/);
});

test("anfrageAnnehmen meldet 502, wenn GitHub ablehnt", async () => {
  const github = async () => new Response('{"message":"Bad credentials"}', { status: 401 });
  const fehlerLog = console.error;
  console.error = () => {};
  try {
    const antwort = await mitFetch(github, () => anfrageAnnehmen(post(GUELTIG), ENV));
    assert.equal(antwort.status, 502);
  } finally {
    console.error = fehlerLog;
  }
});
