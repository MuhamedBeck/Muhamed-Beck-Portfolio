// Generates public/sitemap.xml from the shared route metadata.
// Runs before `vite build` (see package.json) so the sitemap is copied into dist/.
// lastmod comes from routes.meta.js per route – it changes only when a page
// actually changes, so Google keeps trusting it as a recrawl signal.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES_META, SITE_URL } from "./src/seo/routes.meta.js";

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
      <image:title>${escapeXml("Muhamed Beck – AI Automation Manager and Full-Stack Developer in Frankfurt, Germany")}</image:title>
    </image:image>`;

const urlEntries = ROUTES_META.map((route) => {
  const image = route.path === "/" ? `\n${homepageImage}` : "";
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${route.path}`)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${image}
  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;

const outPath = join(__dirname, "public", "sitemap.xml");
writeFileSync(outPath, sitemap);
console.log(`sitemap.xml generated with ${ROUTES_META.length} URLs -> ${outPath}`);
