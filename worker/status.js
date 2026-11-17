// GET /api/anfrage/status: Kann der Worker gerade ins Anfrage-Archiv schreiben?
//
// Für die Live-Prüfung nach dem Deploy (scripts/check-live.js) und den
// regelmäßigen Wächter. Die Antwort sagt nur ja oder nein: 200 {"ok":true},
// wenn GitHub das private Repository mit dem Token des Workers zeigt, sonst
// 503 {"ok":false}. Kein Text von GitHub geht hinaus oder ins Log, nur der
// Status. Das Ergebnis gilt fünf Minuten, auch ein schlechtes, damit dieser
// Pfad GitHub nicht bei jedem Aufruf fragt.
import { antwortJson } from "./anfrage.js";

export const STATUS_GUELTIG_MS = 300000;

/* Ergebnis der letzten Abfrage, je Isolate des Workers. */
const MODUL_SPEICHER = {};

async function githubZeigtArchiv(env) {
  if (!env.GITHUB_TOKEN || !env.ANFRAGEN_REPO) return false;
  try {
    const antwort = await fetch(`https://api.github.com/repos/${env.ANFRAGEN_REPO}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "muhamedbeck.com-anfragen",
      },
    });
    if (antwort.status !== 200) console.error(`anfrage/status: GitHub antwortete ${antwort.status}`);
    return antwort.status === 200;
  } catch (fehler) {
    console.error(`anfrage/status: GitHub nicht erreichbar (${fehler?.name ?? "Fehler"})`);
    return false;
  }
}

/**
 * @param {Request} request
 * @param {{ GITHUB_TOKEN?: string, ANFRAGEN_REPO?: string }} env
 * @param {{ jetzt?: number, speicher?: { ok?: boolean, bis?: number } }} [optionen]
 *   jetzt und speicher nur für Tests; im Betrieb die Uhr und der Speicher des Moduls.
 * @returns {Promise<Response>}
 */
export async function archivStatus(request, env, { jetzt = Date.now(), speicher = MODUL_SPEICHER } = {}) {
  if (request.method !== "GET") {
    return new Response(null, { status: 405, headers: { Allow: "GET" } });
  }
  if (!(speicher.bis > jetzt)) {
    speicher.ok = await githubZeigtArchiv(env);
    speicher.bis = jetzt + STATUS_GUELTIG_MS;
  }
  return speicher.ok ? antwortJson(200, { ok: true }) : antwortJson(503, { ok: false });
}
