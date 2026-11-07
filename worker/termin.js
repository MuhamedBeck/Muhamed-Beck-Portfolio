// Archiviert Terminbuchungen von Cal.com im privaten Repository
// MuhamedBeck/anfragen, neben den Formular-Anfragen (anfrage.js).
//
// Seit dem 07.11.2026 auf Wunsch des Inhabers: "dass du dir merkst, wer welche
// Termine gebucht hat, genau so wie du es mit den E-Mails machst, damit wir
// Insights haben."
//
// Cal.com ruft POST /api/termin bei jeder Buchung, Verschiebung und Absage auf
// (Webhook) und signiert den rohen Body mit HMAC-SHA256, hex-kodiert im Header
// x-cal-signature-256. Der Schlüssel liegt nur als Worker-Secret
// CAL_WEBHOOK_SECRET vor (Kopie in ~/.config/cal/muhamedbeck.env). Ohne
// passende Signatur wird nichts gespeichert, sonst könnte jeder Termine ins
// Archiv schreiben.
//
// Gespeichert wird, was der Gast bei Cal.com angegeben hat, und der Zeitpunkt.
// Nicht gespeichert: Video-Zugangsdaten, Kalenderdateien, Organisator-Daten.

import { antwortJson, base64Utf8, einzeilig, zaunFuer } from "./anfrage.js";

const MAX_ZEICHEN = 200_000;

const EREIGNISSE = {
  BOOKING_CREATED: "gebucht",
  BOOKING_RESCHEDULED: "verschoben",
  BOOKING_CANCELLED: "abgesagt",
};

/* Felder, die Cal.com bei jedem Termin abfragt und die schon oben in der
   Datei stehen; alles andere sind eigene Fragen des Termintyps. */
const STANDARDFELDER = new Set([
  "name",
  "email",
  "location",
  "guests",
  "rescheduleReason",
  "title",
  "attendeePhoneNumber",
  "notes",
]);

const BERLIN = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const hex = (puffer) =>
  [...new Uint8Array(puffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

/** Prüft die Signatur von Cal.com in konstanter Zeit. */
export async function signaturPruefen(geheimnis, rohtext, signatur) {
  if (!geheimnis || !signatur) return false;
  const kodierer = new TextEncoder();
  const schluessel = await crypto.subtle.importKey(
    "raw",
    kodierer.encode(geheimnis),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const erwartet = hex(await crypto.subtle.sign("HMAC", schluessel, kodierer.encode(rohtext)));
  const erhalten = signatur.trim().toLowerCase().replace(/^sha256=/, "");
  if (erhalten.length !== erwartet.length) return false;
  let unterschied = 0;
  for (let i = 0; i < erwartet.length; i += 1) {
    unterschied |= erwartet.charCodeAt(i) ^ erhalten.charCodeAt(i);
  }
  return unterschied === 0;
}

/* Antworten von Cal.com sind Text, Listen oder { value } verschachtelt. */
const alsText = (wert) => {
  if (wert === undefined || wert === null) return "";
  if (typeof wert === "string") return wert;
  if (Array.isArray(wert)) return wert.map(alsText).filter(Boolean).join(", ");
  if (typeof wert === "object") return alsText(wert.value ?? wert.optionValue ?? "");
  return String(wert);
};

/** Liest aus dem Webhook nur die Angaben, die ins Archiv gehören. */
export function buchungLesen(ereignis) {
  const p = ereignis?.payload ?? {};
  const gast = (Array.isArray(p.attendees) ? p.attendees[0] : null) ?? {};
  const antworten = p.responses && typeof p.responses === "object" ? p.responses : {};
  const weitere = Object.entries(antworten)
    .filter(([feld, antwort]) => !STANDARDFELDER.has(feld) && !antwort?.isHidden)
    .map(([feld, antwort]) => ({ frage: String(antwort?.label || feld), antwort: alsText(antwort?.value).trim() }))
    .filter((eintrag) => eintrag.antwort)
    .map((eintrag) => ({ frage: eintrag.frage.slice(0, 200), antwort: eintrag.antwort.slice(0, 2000) }));
  const datum = (wert) => {
    const d = wert ? new Date(wert) : null;
    return d && !Number.isNaN(d.getTime()) ? d : null;
  };

  return {
    status: EREIGNISSE[ereignis?.triggerEvent],
    uid: String(p.uid ?? "").slice(0, 100),
    vorherigeUid: String(p.rescheduleUid ?? "").slice(0, 100),
    titel: String(p.title ?? "").slice(0, 300),
    art: String(p.type ?? "").slice(0, 100),
    start: datum(p.startTime),
    ende: datum(p.endTime),
    name: (alsText(antworten.name) || String(gast.name ?? "")).slice(0, 200),
    email: (alsText(antworten.email) || String(gast.email ?? "")).slice(0, 320),
    zeitzone: String(gast.timeZone ?? "").slice(0, 100),
    notiz: alsText(antworten.notes ?? p.additionalNotes).slice(0, 10_000),
    grund: (String(p.cancellationReason ?? "") || alsText(antworten.rescheduleReason)).slice(0, 2000),
    weitere,
  };
}

/** termine/2026/11/2026-11-07T15-00-00Z-gebucht-abc123de.md */
export function terminPfad(eingang, status, uid) {
  const iso = eingang.toISOString();
  const stempel = `${iso.slice(0, 19).replace(/:/g, "-")}Z`;
  const kennung = (uid.replace(/[^A-Za-z0-9]/g, "") || crypto.randomUUID()).slice(0, 8);
  return `termine/${iso.slice(0, 4)}/${iso.slice(5, 7)}/${stempel}-${status}-${kennung}.md`;
}

/** Baut die Markdown-Datei einer Buchung, im selben Aufbau wie eine Anfrage. */
export function terminAlsMarkdown(b, eingang) {
  const angabe = (wert) => (wert ? einzeilig(wert) : "nicht angegeben");
  const zeit = (d) => (d ? `${BERLIN.format(d)} (Berlin)` : "nicht angegeben");
  const zeilen = [
    "---",
    `eingang: ${JSON.stringify(eingang.toISOString())}`,
    `status: ${JSON.stringify(b.status)}`,
    `termin_start: ${JSON.stringify(b.start ? b.start.toISOString() : "")}`,
    `termin_ende: ${JSON.stringify(b.ende ? b.ende.toISOString() : "")}`,
    `termintyp: ${JSON.stringify(b.art)}`,
    `buchung: ${JSON.stringify(b.uid)}`,
    ...(b.vorherigeUid ? [`vorherige_buchung: ${JSON.stringify(b.vorherigeUid)}`] : []),
    "---",
    "",
    `# Termin ${b.status} von ${angabe(b.name)}`,
    "",
    `- **Name:** ${angabe(b.name)}`,
    `- **E-Mail:** ${angabe(b.email)}`,
    `- **Termin:** ${zeit(b.start)}`,
    `- **Zeitzone des Gastes:** ${angabe(b.zeitzone)}`,
    `- **Termintyp:** ${angabe(b.titel || b.art)}`,
    `- **Eingang:** ${BERLIN.format(eingang)} (Berlin)`,
  ];
  for (const { frage, antwort } of b.weitere) zeilen.push(`- **${einzeilig(frage)}:** ${einzeilig(antwort)}`);
  if (b.grund) zeilen.push(`- **Grund:** ${einzeilig(b.grund)}`);
  if (b.notiz) {
    const zaun = zaunFuer(b.notiz);
    zeilen.push("", "## Anmerkung des Gastes", "", `${zaun}text`, b.notiz, zaun);
  }
  zeilen.push("");
  return zeilen.join("\n");
}

async function speichern(env, b, eingang) {
  const pfad = terminPfad(eingang, b.status, b.uid);
  const antwort = await fetch(`https://api.github.com/repos/${env.ANFRAGEN_REPO}/contents/${pfad}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "muhamedbeck.com-anfragen",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Termin ${b.status}: ${b.start ? b.start.toISOString() : "ohne Zeit"} (${eingang.toISOString()})`,
      content: base64Utf8(terminAlsMarkdown(b, eingang)),
    }),
  });
  if (!antwort.ok) {
    // Nur Status und Anfang der Antwort ins Log, nie die Daten des Gastes.
    console.error(`termin: GitHub antwortete ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
    return false;
  }
  return true;
}

/**
 * POST /api/termin, aufgerufen vom Webhook bei Cal.com.
 *
 * 201 gespeichert, 200 angenommen ohne Speichern (Ping, andere Ereignisse),
 * 400 kein JSON, 401 Signatur falsch, 405 falsche Methode, 413 zu groß,
 * 502 GitHub hat abgelehnt, 503 Secret oder Token fehlt.
 */
export async function terminAnnehmen(request, env) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }
  if (!env.CAL_WEBHOOK_SECRET) {
    console.error("termin: CAL_WEBHOOK_SECRET fehlt, nichts gespeichert");
    return antwortJson(503, { ok: false });
  }

  const roh = await request.text();
  if (roh.length > MAX_ZEICHEN) return antwortJson(413, { ok: false });
  const echt = await signaturPruefen(env.CAL_WEBHOOK_SECRET, roh, request.headers.get("x-cal-signature-256") ?? "");
  if (!echt) return antwortJson(401, { ok: false });

  let ereignis;
  try {
    ereignis = JSON.parse(roh);
  } catch {
    return antwortJson(400, { ok: false });
  }

  const buchung = buchungLesen(ereignis);
  // Ping vom Test-Knopf und Ereignisse, die nicht archiviert werden: annehmen,
  // damit Cal.com den Webhook nicht für defekt hält.
  if (!buchung.status) return antwortJson(200, { ok: true, gespeichert: false });

  if (!env.GITHUB_TOKEN || !env.ANFRAGEN_REPO) {
    console.error("termin: GITHUB_TOKEN oder ANFRAGEN_REPO fehlt, nichts gespeichert");
    return antwortJson(503, { ok: false });
  }
  const gespeichert = await speichern(env, buchung, new Date());
  return gespeichert ? antwortJson(201, { ok: true }) : antwortJson(502, { ok: false });
}
