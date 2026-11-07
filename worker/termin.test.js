// Tests für worker/termin.js, ohne Netz: GitHub wird über ein ersetztes fetch
// simuliert, die Signatur mit demselben Verfahren berechnet wie bei Cal.com.
import { test } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { createHmac } from "node:crypto";
import { buchungLesen, signaturPruefen, terminAlsMarkdown, terminAnnehmen, terminPfad } from "./termin.js";

const GEHEIM = "test-geheimnis";
const ENV = { GITHUB_TOKEN: "test-token", ANFRAGEN_REPO: "MuhamedBeck/anfragen", CAL_WEBHOOK_SECRET: GEHEIM };

// Auszug aus dem Beispiel der Cal.com-Doku (Version 2021-10-20), mit den
// Feldern, die nicht ins Archiv gehören dürfen.
const BUCHUNG = {
  triggerEvent: "BOOKING_CREATED",
  createdAt: "2026-11-07T15:00:00.000Z",
  payload: {
    title: "30 Minuten Termin zwischen Muhamed Nur Beck und Erika Muster",
    type: "30min",
    startTime: "2026-11-10T17:00:00Z",
    endTime: "2026-11-10T17:30:00Z",
    organizer: { name: "Muhamed Nur Beck", email: "privat@example.com" },
    attendees: [{ name: "Erika Muster", email: "erika_muster@firma.de", timeZone: "Europe/Berlin" }],
    responses: {
      name: { label: "your_name", value: "Erika Muster", isHidden: false },
      email: { label: "email_address", value: "erika_muster@firma.de", isHidden: false },
      notes: { label: "additional_notes", value: "Wir wollen Rechnungen automatisch prüfen.", isHidden: false },
      worum: { label: "Worum geht es?", value: "n8n-Automatisierung", isHidden: false },
      location: { label: "location", value: { optionValue: "", value: "integrations:daily" }, isHidden: false },
    },
    uid: "abc123def456",
    videoCallData: { type: "daily_video", id: "raum", password: "GEHEIMES-PASSWORT", url: "https://cal.video/raum" },
    attendeeIcsContent: "BEGIN:VCALENDAR",
  },
};

const signiert = (body, geheim = GEHEIM) => createHmac("sha256", geheim).update(body).digest("hex");

const post = (objekt, { signatur, roh } = {}) => {
  const body = roh ?? JSON.stringify(objekt);
  return new Request("https://muhamedbeck.com/api/termin", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-cal-signature-256": signatur ?? signiert(body) },
    body,
  });
};

const mitFetch = async (ersatz, ablauf) => {
  const original = globalThis.fetch;
  globalThis.fetch = ersatz;
  try {
    return await ablauf();
  } finally {
    globalThis.fetch = original;
  }
};

test("signaturPruefen akzeptiert nur die passende HMAC-Signatur", async () => {
  const body = JSON.stringify(BUCHUNG);
  assert.equal(await signaturPruefen(GEHEIM, body, signiert(body)), true);
  assert.equal(await signaturPruefen(GEHEIM, body, `sha256=${signiert(body)}`), true);
  assert.equal(await signaturPruefen(GEHEIM, body, signiert(body, "falsch")), false);
  assert.equal(await signaturPruefen(GEHEIM, `${body} `, signiert(body)), false);
  assert.equal(await signaturPruefen(GEHEIM, body, ""), false);
  assert.equal(await signaturPruefen("", body, signiert(body)), false);
});

test("buchungLesen holt Gast, Zeit, Notiz und eigene Fragen", () => {
  const b = buchungLesen(BUCHUNG);
  assert.equal(b.status, "gebucht");
  assert.equal(b.name, "Erika Muster");
  assert.equal(b.email, "erika_muster@firma.de");
  assert.equal(b.zeitzone, "Europe/Berlin");
  assert.equal(b.notiz, "Wir wollen Rechnungen automatisch prüfen.");
  assert.deepEqual(b.weitere, [{ frage: "Worum geht es?", antwort: "n8n-Automatisierung" }]);
  assert.equal(b.start.toISOString(), "2026-11-10T17:00:00.000Z");
});

test("terminAlsMarkdown enthält kein Video-Passwort und keine Organisator-Adresse", () => {
  const md = terminAlsMarkdown(buchungLesen(BUCHUNG), new Date("2026-11-07T15:00:00Z"));
  assert.match(md, /status: "gebucht"/);
  assert.match(md, /Erika Muster/);
  assert.match(md, /Di\., 10\.11\.2026, 18:00/);
  assert.doesNotMatch(md, /GEHEIMES-PASSWORT|cal\.video|privat@example\.com|VCALENDAR/);
});

test("terminPfad ordnet nach Jahr und Monat unter termine/", () => {
  assert.equal(
    terminPfad(new Date("2026-11-07T15:00:00.123Z"), "gebucht", "abc123def456"),
    "termine/2026/11/2026-11-07T15-00-00Z-gebucht-abc123de.md"
  );
});

test("terminAnnehmen: Methode, Signatur, Ping und unbekannte Ereignisse", async () => {
  const get = new Request("https://muhamedbeck.com/api/termin");
  assert.equal((await terminAnnehmen(get, ENV)).status, 405);
  assert.equal((await terminAnnehmen(post(BUCHUNG, { signatur: "00" }), ENV)).status, 401);
  assert.equal((await terminAnnehmen(post(BUCHUNG), { ...ENV, CAL_WEBHOOK_SECRET: "" })).status, 503);
  // Der Test-Knopf von Cal.com schickt PING: annehmen, nichts speichern.
  const ohneNetz = () => assert.fail("darf GitHub nicht aufrufen");
  await mitFetch(ohneNetz, async () => {
    assert.equal((await terminAnnehmen(post({ triggerEvent: "PING", payload: {} }), ENV)).status, 200);
    assert.equal((await terminAnnehmen(post({ triggerEvent: "MEETING_ENDED" }), ENV)).status, 200);
  });
});

test("terminAnnehmen legt die Buchung per Contents-API an", async () => {
  let aufruf;
  const antwort = await mitFetch(
    async (url, optionen) => {
      aufruf = { url, optionen };
      return new Response("{}", { status: 201 });
    },
    () => terminAnnehmen(post(BUCHUNG), ENV)
  );
  assert.equal(antwort.status, 201);
  assert.match(aufruf.url, /repos\/MuhamedBeck\/anfragen\/contents\/termine\/2026\/\d\d\/.+-gebucht-abc123de\.md$/);
  const inhalt = Buffer.from(JSON.parse(aufruf.optionen.body).content, "base64").toString("utf8");
  assert.match(inhalt, /Erika Muster/);
  assert.doesNotMatch(inhalt, /GEHEIMES-PASSWORT/);
});

test("terminAnnehmen meldet 502, wenn GitHub ablehnt", async () => {
  const antwort = await mitFetch(
    async () => new Response("nein", { status: 403 }),
    () => terminAnnehmen(post(BUCHUNG), ENV)
  );
  assert.equal(antwort.status, 502);
});
