// Stufe 2 der Prüfung auf geschützte Bezeichnungen, nach dem Prerender.
//
// Stufe 1 (scripts/check-i18n.js) liest die Quelltexte vor dem Build. Diese
// Stufe liest, was ausgeliefert wird: den Text der vorgerenderten Seiten der
// Gruppe GEPRUEFTE_GRUPPE, ihren Kopf, ihre strukturierten Daten und ihre
// Verweisziele (texteAusHtml in geschuetzte-bezeichnungen.js). So fallen auch
// Wörter auf, die erst beim Rendern zusammenkommen.
//
//   node scripts/check-bezeichnungen.js                 die vorgerenderten Seiten
//   node scripts/check-bezeichnungen.js --dateien a b   beliebige Textdateien
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "../src/routes/registry.js";
import { GEPRUEFTE_GRUPPE, pruefeTexte, texteAusHtml } from "./geschuetzte-bezeichnungen.js";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(wurzel, "dist");

const problems = [];
const eintraege = [];
const at = process.argv.indexOf("--dateien");
const dateien = at === -1 ? null : process.argv.slice(at + 1);

if (dateien) {
  if (!dateien.length) problems.push("--dateien ohne Pfade");
  for (const pfad of dateien) {
    if (!existsSync(pfad)) {
      problems.push(`${pfad}: Datei fehlt`);
      continue;
    }
    eintraege.push({ ort: pfad, text: readFileSync(pfad, "utf8") });
  }
} else {
  for (const route of ROUTES.filter((eintrag) => eintrag.group === GEPRUEFTE_GRUPPE)) {
    const datei = join(dist, ...route.path.split("/").filter(Boolean), "index.html");
    if (!existsSync(datei)) {
      problems.push(`${route.path}: ${datei} fehlt. Ist prerender-meta.js gelaufen?`);
      continue;
    }
    for (const { ort, text } of texteAusHtml(readFileSync(datei, "utf8"))) {
      eintraege.push({ ort: `${route.path} · ${ort}`, text });
    }
  }
}

problems.push(...pruefeTexte(eintraege));

if (problems.length) {
  console.error(`\ncheck-bezeichnungen: ${problems.length} problem(s)\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("");
  process.exit(1);
}

const anzahl = dateien
  ? `${dateien.length} Dateien`
  : `${ROUTES.filter((eintrag) => eintrag.group === GEPRUEFTE_GRUPPE).length} Seiten`;
console.log(`check-bezeichnungen: ${anzahl} ohne geschützte Bezeichnungen`);
