// Cloudflare Worker der Website.
//
// Die Seite selbst sind statische Dateien aus dist/. wrangler.jsonc lässt
// diesen Worker per run_worker_first nur für /api/* zuerst laufen; alles
// andere liefert die Asset-Schicht wie bisher direkt aus, mit _headers,
// _redirects und der 404-Seite. Die letzte Zeile reicht verirrte Anfragen an
// genau diese Schicht zurück, statt selbst etwas zu antworten.
import { anfrageAnnehmen } from "./anfrage.js";
import { terminAnnehmen } from "./termin.js";
import { archivStatus } from "./status.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/anfrage") return anfrageAnnehmen(request, env);
    // Ob das Archiv gerade beschreibbar ist, für die Prüfung nach dem Deploy.
    if (pathname === "/api/anfrage/status") return archivStatus(request, env);
    // Webhook von Cal.com für Buchungen, Verschiebungen und Absagen.
    if (pathname === "/api/termin") return terminAnnehmen(request, env);
    return env.ASSETS.fetch(request);
  },
};
