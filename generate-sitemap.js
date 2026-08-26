// Generates public/sitemap.xml from the shared route registry.
// Runs before `vite build` (see package.json) so the sitemap is copied into dist/.
// lastmod comes from the registry per route - it changes only when a page
// actually changes, so Google keeps trusting it as a recrawl signal.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_LOCALE, ROUTES, SITE_URL, getAlternates } from "./src/routes/registry.js";
import { LIVE_LOCALES, localeConfig } from "./src/i18n/locales.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const escapeXml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const homepageImage = `    <image:image>
      <image:loc>${escapeXml(`${SITE_URL}/profilepicture.png`)}</image:loc>
      <image:title>${escapeXml("Muhamed Beck, AI Automation Manager and Full-Stack Developer in Frankfurt, Germany")}</image:title>
    </image:image>`;

// Alternate cluster for a route, mirroring the on-page hreflang tags emitted by
// prerender-meta.js. Emitted only where a translated twin exists: a
// single-entry cluster carries no information.
const alternateLinks = (route) => {
  const alternates = getAlternates(route);
  if (!alternates.length) return "";

  const links = alternates.map(
    (alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${localeConfig(alternate.locale).hreflang}" href="${escapeXml(`${SITE_URL}${alternate.path}`)}"/>`
  );
  const fallback =
    alternates.find((alternate) => alternate.locale === DEFAULT_LOCALE) ?? alternates[0];
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${fallback.path}`)}"/>`
  );
  return `\n${links.join("\n")}`;
};

const urlEntries = ROUTES.map((route) => {
  const image = route.sitemapImage ? `\n${homepageImage}` : "";
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${route.path}`)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${alternateLinks(route)}${image}
  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;

const outPath = join(__dirname, "public", "sitemap.xml");
writeFileSync(outPath, sitemap);
console.log(`sitemap.xml generated with ${ROUTES.length} URLs -> ${outPath}`);

// llms.txt, generated from the same array.
//
// Worth being clear about the value here: Ahrefs analysed 137,000 sites and
// found 97% of llms.txt files were never requested at all, and SE Ranking found
// no significant correlation with citation frequency. Google has said it does
// not support the format. So this is generated in a dozen lines rather than
// hand-maintained across 20 pages, which is the only reason it still exists.
/* One section per live locale, headed in that locale.
 *
 * This used to be two hardcoded calls with two hardcoded German and English
 * headings, so a third locale's pages were absent from llms.txt while sitting
 * correctly in sitemap.xml. That is the worst kind of gap: the file exists to
 * tell a language model what is here, and a silently missing section reads as
 * "there is no Arabic version". */
const sectionsPerLocale = () =>
  LIVE_LOCALES.map((locale) => {
    const { endonym } = localeConfig(locale);
    return `## ${endonym}\n\n${pageList(locale)}`;
  }).join("\n\n");

const pageList = (locale) =>
  ROUTES.filter((route) => route.locale === locale)
    .map((route) => `- [${route.h1}](${SITE_URL}${route.path}): ${route.description}`)
    .join("\n");

const llms = `# Muhamed Nur Beck: KI- und Prozessautomatisierung, Frankfurt am Main

> AI Automation Manager und Full-Stack-Entwickler in Frankfurt am Main.
> Automatisiert Geschäftsprozesse mit n8n, baut KI-Agenten, Voice-AI und
> RAG-Systeme und bindet CRM- und ATS-Systeme an (HubSpot, RecruitCRM,
> Personio). Verfügbar für Projekte remote in Deutschland, Österreich und der
> Schweiz, vor Ort im Rhein-Main-Gebiet.

## Belegte Ergebnisse

- Durchlaufzeiten im Recruiting um rund 80 Prozent gesenkt (TOPEOPLE Group GmbH, Arbeitgeber, seit 09/2025).
- Candidate Operations auf etwa 90 Prozent Automatisierungsgrad gebracht, mit GPT, RAG und LangChain.
- Organischen Traffic um 35 Prozent gesteigert (Phoenix Parkservice, Freelance-Mandat 06/2024 bis 09/2025).
- Testabdeckung von 9 auf 42 Prozent gesteigert und den manuellen Aufwand je Projekt von 1.440 auf 30 Minuten gesenkt (Masterarbeit, INFOMOTION GmbH).

## Konditionen

- Stundensatz: 90 bis 135 € nach Absprache und je nach Projektumfang. Marktkontext: Der Median für IT-Freelancer in Deutschland lag laut Freelancer-Kompass 2026 bei 95 € pro Stunde.
- Festpreise möglich für klar umrissene Workflows und Integrationen.
- Antwort auf Projektanfragen innerhalb von 24 Stunden: ${SITE_URL}/kontakt

${sectionsPerLocale()}
`;

const llmsPath = join(__dirname, "public", "llms.txt");
writeFileSync(llmsPath, llms);
console.log(`llms.txt generated with ${ROUTES.length} pages -> ${llmsPath}`);
