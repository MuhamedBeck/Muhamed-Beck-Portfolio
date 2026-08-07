// Generates public/sitemap.xml from the shared route registry.
// Runs before `vite build` (see package.json) so the sitemap is copied into dist/.
// lastmod comes from the registry per route - it changes only when a page
// actually changes, so Google keeps trusting it as a recrawl signal.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_LOCALE, ROUTES, SITE_URL, getAlternates } from "./src/routes/registry.js";
import { localeConfig } from "./src/i18n/locales.js";

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
