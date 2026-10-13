// Archiviert Formular-Anfragen als Markdown-Datei im privaten Repository
// MuhamedBeck/anfragen, parallel zur E-Mail über EmailJS.
//
// Warum zusätzlich zur Mail: Die Mail landet nur im Postfach. Als Datei im
// Repository lassen sich Anfragen lesen, auswerten und mit Status versehen,
// auch von Claude über gh, und eine Anfrage geht nicht verloren, wenn EmailJS
// einmal ausfällt.
//
// Der Token liegt nur als Worker-Secret GITHUB_TOKEN vor: ein Fine-grained
// Token mit "Contents: Read and write" ausschließlich für dieses eine
// Repository. Im Browser hätte jeder ihn auslesen können.
//
// Gespeichert wird nur, was der Absender eingetippt hat. Keine IP-Adresse,
// kein User-Agent: Die Datenschutzerklärung (Ziffer 5) sagt genau das zu.

const HERKUNFT_ERLAUBT = "https://muhamedbeck.com";
const MAX_ZEICHEN_ANFRAGE = 20_000;

/* Grenzen je Feld. Großzügig für Menschen, eng genug, dass niemand das
   Repository mit einem einzelnen Aufruf füllen kann. */
const GRENZEN = {
  name: 200,
  email: 320,
  unternehmen: 200,
  leistung: 200,
  herkunft: 200,
  formular: 60,
  nachricht: 10_000,
};

const PFLICHT = ["name", "email", "nachricht"];

const EMAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const antwortJson = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

/**
 * Prüft die Eingabe des Formulars.
 *
 * @param {unknown} roh  geparstes JSON aus dem Request
 * @returns {{ daten: Record<string, string> } | { fehler: string }}
 */
export function pruefen(roh) {
  if (!roh || typeof roh !== "object" || Array.isArray(roh)) {
    return { fehler: "Erwartet wird ein JSON-Objekt." };
  }

  const daten = {};
  for (const [feld, grenze] of Object.entries(GRENZEN)) {
    const wert = roh[feld];
    if (wert === undefined || wert === null) {
      daten[feld] = "";
      continue;
    }
    if (typeof wert !== "string") return { fehler: `${feld} muss Text sein.` };
    const getrimmt = wert.trim();
    if (getrimmt.length > grenze) return { fehler: `${feld} ist länger als ${grenze} Zeichen.` };
    daten[feld] = getrimmt;
  }

  for (const feld of PFLICHT) {
    if (!daten[feld]) return { fehler: `${feld} fehlt.` };
  }
  if (!EMAIL_MUSTER.test(daten.email)) return { fehler: "email ist keine E-Mail-Adresse." };

  return { daten };
}

/* Einzeilige Werte für die Liste: Zeilenumbrüche raus, und nur die Zeichen
   entwertet, aus denen Links, Bilder und HTML entstehen. Sonst könnte eine
   Eingabe wie ![](https://…) beim Öffnen der Datei auf GitHub ein Bild von
   fremdem Server nachladen. Mehr nicht, damit die Datei auch roh lesbar
   bleibt: a_b@firma.de soll so dastehen, nicht als a\_b@firma.de. */
export const einzeilig = (text) =>
  text.replace(/\s+/g, " ").trim().replace(/([\\`[\]<>])/g, "\\$1");

/* Ein Codezaun, der länger ist als jede Folge von ~ im Text, damit die
   Nachricht ihn nicht schließen kann und unverändert dargestellt wird. */
export const zaunFuer = (text) => {
  const laengste = Math.max(0, ...(text.match(/~+/g) ?? []).map((lauf) => lauf.length));
  return "~".repeat(Math.max(4, laengste + 1));
};

const BERLIN = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  dateStyle: "medium",
  timeStyle: "short",
});

/**
 * Baut die Markdown-Datei einer Anfrage.
 *
 * Der Kopf ist YAML mit JSON-Strings als Werten; ein JSON-String ist auch ein
 * gültiger YAML-String, so braucht es keine eigene Maskierung.
 */
export function alsMarkdown(daten, eingang) {
  const angabe = (wert) => (wert ? einzeilig(wert) : "nicht angegeben");
  const zaun = zaunFuer(daten.nachricht);

  return [
    "---",
    `eingang: ${JSON.stringify(eingang.toISOString())}`,
    'status: "neu"',
    `formular: ${JSON.stringify(daten.formular || "unbekannt")}`,
    `leistung: ${JSON.stringify(daten.leistung)}`,
    `herkunft: ${JSON.stringify(daten.herkunft)}`,
    "---",
    "",
    `# Anfrage von ${einzeilig(daten.name)}`,
    "",
    `- **Name:** ${einzeilig(daten.name)}`,
    `- **E-Mail:** ${einzeilig(daten.email)}`,
    `- **Unternehmen:** ${angabe(daten.unternehmen)}`,
    `- **Leistung:** ${angabe(daten.leistung)}`,
    `- **Gefunden über:** ${angabe(daten.herkunft)}`,
    `- **Formular:** ${angabe(daten.formular)}`,
    `- **Eingang:** ${BERLIN.format(eingang)} (Berlin)`,
    "",
    "## Nachricht",
    "",
    `${zaun}text`,
    daten.nachricht,
    zaun,
    "",
  ].join("\n");
}

/** anfragen/2026/10/2026-10-13T09-15-02Z-a1b2c3.md */
export function dateiPfad(eingang, kennung) {
  const iso = eingang.toISOString();
  const stempel = `${iso.slice(0, 19).replace(/:/g, "-")}Z`;
  return `anfragen/${iso.slice(0, 4)}/${iso.slice(5, 7)}/${stempel}-${kennung}.md`;
}

/* GitHubs Contents-API erwartet den Inhalt als Base64. btoa kann nur Latin-1,
   deshalb erst als UTF-8-Bytes, sonst bricht jedes Umlaut den Aufruf. */
export function base64Utf8(text) {
  const bytes = new TextEncoder().encode(text);
  let binaer = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binaer += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binaer);
}

async function inRepositorySpeichern(env, daten, eingang) {
  const pfad = dateiPfad(eingang, crypto.randomUUID().slice(0, 8));
  const antwort = await fetch(
    `https://api.github.com/repos/${env.ANFRAGEN_REPO}/contents/${pfad}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "muhamedbeck.com-anfragen",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Anfrage: ${daten.leistung || "ohne Angabe"} (${eingang.toISOString()})`,
        content: base64Utf8(alsMarkdown(daten, eingang)),
      }),
    }
  );

  if (!antwort.ok) {
    // Nur Status und Anfang der Antwort ins Log, nie den Inhalt der Anfrage.
    const auszug = (await antwort.text()).slice(0, 300);
    console.error(`anfrage: GitHub antwortete ${antwort.status}: ${auszug}`);
    return false;
  }
  return true;
}

/**
 * POST /api/anfrage
 *
 * Antwortcodes, damit das Formular und das Log sie unterscheiden können:
 * 201 gespeichert, 400 Eingabe ungültig, 403 fremde Herkunft, 405 falsche
 * Methode, 413 zu groß, 502 GitHub hat abgelehnt, 503 Token fehlt.
 */
export async function anfrageAnnehmen(request, env) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  // Nur das eigene Formular. Gegen ein Skript, das den Header fälscht, hilft
  // das nicht; gegen fremde Seiten, die Besucher hierher posten lassen, schon.
  if (request.headers.get("Origin") !== HERKUNFT_ERLAUBT) {
    return antwortJson(403, { ok: false });
  }

  const text = await request.text();
  if (text.length > MAX_ZEICHEN_ANFRAGE) return antwortJson(413, { ok: false });

  let roh;
  try {
    roh = JSON.parse(text);
  } catch {
    return antwortJson(400, { ok: false, fehler: "Kein gültiges JSON." });
  }

  // Unsichtbares Feld im Formular, das nur Bots ausfüllen. Sie bekommen ein
  // "ok", damit sie keinen Grund haben, es anders zu versuchen.
  if (typeof roh?.zweitadresse === "string" && roh.zweitadresse.trim()) {
    return antwortJson(200, { ok: true });
  }

  const geprueft = pruefen(roh);
  if (geprueft.fehler) return antwortJson(400, { ok: false, fehler: geprueft.fehler });

  if (!env.GITHUB_TOKEN || !env.ANFRAGEN_REPO) {
    console.error("anfrage: GITHUB_TOKEN oder ANFRAGEN_REPO fehlt, nichts gespeichert");
    return antwortJson(503, { ok: false });
  }

  const gespeichert = await inRepositorySpeichern(env, geprueft.daten, new Date());
  return gespeichert ? antwortJson(201, { ok: true }) : antwortJson(502, { ok: false });
}
