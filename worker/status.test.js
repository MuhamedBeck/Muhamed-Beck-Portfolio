// Tests für GET /api/anfrage/status (worker/status.js). Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { STATUS_GUELTIG_MS, archivStatus } from "./status.js";

const ENV = { GITHUB_TOKEN: "test-token", ANFRAGEN_REPO: "MuhamedBeck/anfragen" };
const anfrage = (init) => new Request("https://muhamedbeck.com/api/anfrage/status", init);
const mitFetch = async (ersatz, ablauf) => {
  const original = globalThis.fetch;
  globalThis.fetch = ersatz;
  try {
    return await ablauf();
  } finally {
    globalThis.fetch = original;
  }
};
const keinAufruf = async () => assert.fail("GitHub darf nicht aufgerufen werden");

test("in Ordnung, wenn GitHub das Archiv mit dem Token zeigt", async () => {
  let aufruf;
  const github = async (url, init) => {
    aufruf = { url, init };
    return new Response('{"private":true}', { status: 200 });
  };
  const antwort = await mitFetch(github, () => archivStatus(anfrage(), ENV, { jetzt: 0, speicher: {} }));
  assert.equal(antwort.status, 200);
  assert.deepEqual(await antwort.json(), { ok: true });
  assert.equal(aufruf.url, "https://api.github.com/repos/MuhamedBeck/anfragen");
  assert.equal(aufruf.init.method ?? "GET", "GET");
  assert.equal(aufruf.init.headers.Authorization, "Bearer test-token");
});

test("nicht in Ordnung bei abgelehntem Token, ohne Text von GitHub", async () => {
  const github = async () => new Response('{"message":"Bad credentials"}', { status: 401 });
  const antwort = await mitFetch(github, () => archivStatus(anfrage(), ENV, { jetzt: 0, speicher: {} }));
  assert.equal(antwort.status, 503);
  assert.equal(await antwort.text(), '{"ok":false}');
});

test("ohne Token oder Repository kein Aufruf", async () => {
  const antwort = await mitFetch(keinAufruf, () => archivStatus(anfrage(), {}, { jetzt: 0, speicher: {} }));
  assert.equal(antwort.status, 503);
});

test("ein Netzfehler ist nicht in Ordnung und wirft nicht", async () => {
  const github = async () => { throw new TypeError("fetch failed"); };
  const antwort = await mitFetch(github, () => archivStatus(anfrage(), ENV, { jetzt: 0, speicher: {} }));
  assert.equal(antwort.status, 503);
});

test("das Ergebnis gilt fünf Minuten, auch ein schlechtes", async () => {
  for (const status of [200, 401]) {
    let zahl = 0;
    const speicher = {};
    const github = async () => { zahl += 1; return new Response("{}", { status }); };
    await mitFetch(github, async () => {
      await archivStatus(anfrage(), ENV, { jetzt: 1000, speicher });
      await archivStatus(anfrage(), ENV, { jetzt: 1000 + STATUS_GUELTIG_MS - 1, speicher });
      assert.equal(zahl, 1);
      await archivStatus(anfrage(), ENV, { jetzt: 1000 + STATUS_GUELTIG_MS, speicher });
      assert.equal(zahl, 2);
    });
  }
});

test("nur GET", async () => {
  const antwort = await mitFetch(keinAufruf, () => archivStatus(anfrage({ method: "POST" }), ENV, { speicher: {} }));
  assert.equal(antwort.status, 405);
  assert.equal(antwort.headers.get("Allow"), "GET");
});

test("der Worker leitet den neuen Pfad weiter, /api/anfrage antwortet auf GET weiter mit 405", async () => {
  const { default: worker } = await import("./index.js");
  const env = { ...ENV, ASSETS: { fetch: async () => new Response("datei") } };
  const github = async () => new Response("{}", { status: 200 });
  await mitFetch(github, async () => {
    assert.equal((await worker.fetch(new Request("https://muhamedbeck.com/api/anfrage"), env)).status, 405);
    assert.equal((await worker.fetch(anfrage(), env)).status, 200);
    assert.equal(await (await worker.fetch(new Request("https://muhamedbeck.com/api/sonstwas"), env)).text(), "datei");
  });
});
