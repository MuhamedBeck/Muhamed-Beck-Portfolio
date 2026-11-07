/* Markdown-Fassung jeder Seite, für KI-Agenten.

   Seit dem 07.11.2026. Cloudflares Prüfung "Is your site agent-ready?" fragt
   die Startseite mit "Accept: text/markdown" an und erwartet Markdown zurück.
   Cloudflares eigene Umwandlung ("Markdown for Agents") gibt es erst ab dem
   Pro-Tarif; die Zone läuft auf Free. Deshalb entsteht die Markdown-Fassung
   hier beim Build, aus derselben vorgerenderten Seite, die auch Crawler sehen:
   dist/<route>/index.md neben dist/<route>/index.html.

   Ausgeliefert wird sie zweimal:
   - direkt unter /<route>/index.md, verlinkt im <head> jeder Seite als
     <link rel="alternate" type="text/markdown">;
   - unter der normalen Adresse, wenn eine Anfrage "Accept: text/markdown"
     schickt. Das übernimmt eine Regel zum Umschreiben der Adresse in der
     Cloudflare-Zone (Rules > Transform Rules), nicht der Worker: Liefe der
     Worker vor den Dateien, gälten _headers und _redirects nicht mehr.

   public/_headers setzt für diese Dateien Content-Type und einen Canonical
   auf die HTML-Seite, damit Google die Markdown-Fassung nicht als Duplikat
   führt.

   Läuft als letzter Schritt von `npm run build`, nach prerender-meta.js. */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { ROUTES, SITE_URL } from "../src/routes/registry.js";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(wurzel, "dist");

const ordner = (pfad) => (pfad === "/" ? dist : join(dist, pfad));
export const markdownPfad = (pfad) => (pfad === "/" ? "/index.md" : `${pfad}/index.md`);

const klassen = (node) => ` ${node.getAttribute?.("class") ?? ""} `;

/* Alle Nachfahren mit einem der Namen, in Dokumentreihenfolge. Der DOM in
   turndown kennt kein querySelectorAll. */
const alle = (node, namen) => {
  const treffer = [];
  const gehe = (n) => {
    for (const kind of n.childNodes ?? []) {
      if (kind.nodeType !== 1) continue;
      if (namen.includes(kind.nodeName.toLowerCase())) treffer.push(kind);
      gehe(kind);
    }
  };
  gehe(node);
  return treffer;
};
const erstes = (node, name) => alle(node, [name])[0];

const versteckt = (node) => {
  if (node.nodeType !== 1) return false;
  if (node.getAttribute("aria-hidden") === "true") return true;
  const k = klassen(node);
  return k.includes(" lg:hidden ") || k.includes(" md:hidden ");
};

/* Sichtbarer Text ohne versteckte Teile. In den Tabellen stehen die
   Spaltennamen für die Kartenansicht auf dem Telefon noch einmal in jeder
   Zelle, für Screenreader ausgeblendet. */
const text = (node) => {
  if (node.nodeType === 3) return node.nodeValue;
  if (node.nodeType !== 1 || versteckt(node)) return "";
  return [...(node.childNodes ?? [])].map(text).join(" ");
};

const umwandler = () => {
  const td = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });

  /* Was im Markdown nur stört: das Inhaltsverzeichnis (steht als Kopie im
     Text und daneben), dekorative Symbole, die Telefon-Fassung einer
     Grafik, die es für breite Bildschirme noch einmal gibt, Knöpfe. */
  td.remove((node) => {
    const name = node.nodeName;
    if (["ASIDE", "NAV", "BUTTON", "SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"].includes(name)) return true;
    return false;
  });

  /* Eine Grafik als SVG (Workflow, Entscheidungsbaum) besteht aus vielen
     kurzen Beschriftungen. Für einen Agenten taugt ihre Beschreibung, die
     ohnehin als <title> und <desc> im SVG steht, besser. */
  td.addRule("grafik", {
    filter: (node) => node.nodeName === "svg" || node.nodeName === "SVG",
    replacement: (_inhalt, node) => {
      const titel = erstes(node, "title")?.textContent?.trim();
      const text = erstes(node, "desc")?.textContent?.trim();
      if (!titel && !text) return "";
      return `\n\n*Abbildung: ${[titel, text].filter(Boolean).join(". ")}*\n\n`;
    },
  });

  /* Tabellen als Markdown-Tabelle; turndown selbst kennt keine. */
  td.addRule("tabelle", {
    filter: "table",
    replacement: (_inhalt, node) => {
      const zeilen = alle(node, ["tr"]).map((tr) =>
        alle(tr, ["th", "td"]).map((zelle) =>
          text(zelle).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim()
        )
      );
      if (!zeilen.length) return "";
      const breite = Math.max(...zeilen.map((z) => z.length));
      const auf = (z) => [...z, ...Array(breite - z.length).fill("")];
      const [kopf, ...rest] = zeilen;
      const zeile = (z) => `| ${auf(z).join(" | ")} |`;
      const caption = erstes(node, "caption")?.textContent?.trim();
      return `\n\n${caption ? `${caption}\n\n` : ""}${zeile(kopf)}\n| ${Array(breite).fill("---").join(" | ")} |\n${rest.map(zeile).join("\n")}\n\n`;
    },
  });

  /* Aufklappbare Fragen: die Frage als Überschrift, die Antwort darunter. */
  td.addRule("frage", {
    filter: "summary",
    replacement: (inhalt) => `\n\n### ${inhalt.trim()}\n\n`,
  });

  /* Nebeneinanderstehende Textstücke (Beschriftung und Wert, Datum und
     Status) bekommen eine Lücke; im Browser trennt sie das Layout. */
  td.addRule("lueckeNachSpan", {
    filter: (node) =>
      node.nodeName === "SPAN" && !versteckt(node) && node.nextSibling?.nodeType === 1,
    replacement: (inhalt) => `${inhalt} `,
  });

  /* Links nur mit Symbol (LinkedIn, GitHub, Mail) tragen ihren Namen im
     aria-label; ohne ihn stünde im Markdown ein leerer Link. */
  td.addRule("symbolLink", {
    filter: (node) =>
      node.nodeName === "A" && !text(node).trim() && Boolean(node.getAttribute("aria-label")),
    replacement: (_inhalt, node) => ` [${node.getAttribute("aria-label")}](${node.getAttribute("href")}) `,
  });

  /* Zuletzt hinzugefügt, also zuerst geprüft: Versteckte Teile fallen weg,
     auch wenn eine Standardregel (Absatz, Listenpunkt) sonst greifen würde. */
  td.addRule("versteckt", { filter: versteckt, replacement: () => "" });

  return td;
};

const frontmatter = (route) => {
  const zeilen = [
    "---",
    `title: ${JSON.stringify(route.title)}`,
    `description: ${JSON.stringify(route.description ?? "")}`,
    `url: ${SITE_URL}${route.path === "/" ? "/" : route.path}`,
    `lang: ${route.locale ?? "de"}`,
  ];
  if (route.lastmod) zeilen.push(`updated: ${route.lastmod}`);
  zeilen.push("---", "");
  return zeilen.join("\n");
};

const td = umwandler();
let anzahl = 0;
for (const route of ROUTES) {
  const htmlDatei = join(ordner(route.path), "index.html");
  if (!existsSync(htmlDatei)) {
    throw new Error(`markdown: ${htmlDatei} fehlt. Ist prerender-meta.js gelaufen?`);
  }
  let html = readFileSync(htmlDatei, "utf8");
  const main = html.match(/<main\b[\s\S]*?<\/main>/);
  if (!main) throw new Error(`markdown: kein <main> in ${htmlDatei}`);

  const markdown = td
    .turndown(main[0])
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  writeFileSync(join(ordner(route.path), "index.md"), `${frontmatter(route)}\n${markdown}\n`);

  /* Der Hinweis im <head>, damit ein Agent die Fassung auch ohne Accept
     findet. Nur einmal, falls das Skript zweimal läuft. */
  const link = `<link rel="alternate" type="text/markdown" href="${markdownPfad(route.path)}" />`;
  if (!html.includes(link)) {
    html = html.replace("</head>", `  ${link}\n</head>`);
    writeFileSync(htmlDatei, html);
  }
  anzahl += 1;
}
console.log(`markdown: ${anzahl} Seiten als Markdown geschrieben`);
