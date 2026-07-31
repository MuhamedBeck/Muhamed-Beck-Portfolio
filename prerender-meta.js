// Post-build step: writes a dedicated dist/<route>/index.html per route with
// route-specific <title>, meta description, canonical and Open Graph/Twitter tags.
// Without this, every route serves the homepage HTML whose canonical points to "/",
// which tells Google all subpages are duplicates of the homepage.
// The homepage itself is also rewritten so routes.meta.js stays the single source
// of truth even if index.html drifts. Subpages additionally get their own
// <noscript> fallback so non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot, ...)
// don't see five URLs with identical homepage body content.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES_META, SITE_URL } from "./src/seo/routes.meta.js";
import { LEISTUNGEN } from "./src/content/leistungen.de.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");

// The hero image is referenced only from inside the JS bundle, so the browser
// cannot discover it until React has rendered. Preloading the hashed file makes
// the LCP request start alongside the HTML instead of after script execution.
const heroImage = readdirSync(join(distDir, "assets")).find(
  (f) => f.startsWith("profilepicture-") && f.endsWith(".webp")
);
if (!heroImage) {
  throw new Error("prerender-meta: hero image (profilepicture-*.webp) not found in dist/assets");
}
const heroPreload = `  <link rel="preload" as="image" href="/assets/${heroImage}" fetchpriority="high" />\n`;

const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const replaceRequired = (html, pattern, replacement, label, path) => {
  if (!pattern.test(html)) {
    throw new Error(`prerender-meta: tag "${label}" not found while rendering ${path}`);
  }
  return html.replace(pattern, replacement);
};

// FAQPage JSON-LD for landing pages whose visible content includes the same FAQ.
const faqJsonLd = (path) => {
  const leistung = LEISTUNGEN.find((l) => l.path === path);
  if (!leistung?.faq?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: leistung.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return `  <script type="application/ld+json">\n  ${JSON.stringify(schema)}\n  </script>\n`;
};

const subpageNoscript = (route) => `<noscript>
    <div style="padding: 40px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.description)}</p>
      <p><a href="${SITE_URL}/">Muhamed Beck, AI Automation &amp; Full-Stack Development in Frankfurt</a></p>
    </div>
  </noscript>`;

for (const route of ROUTES_META) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const lang = route.lang ?? "en";
  const ogLocale = lang === "de" ? "de_DE" : "en_US";

  const replacements = [
    [/(<html lang=")[^"]*(">)/, (m, a, b) => `${a}${lang}${b}`, "html lang"],
    [/(<meta property="og:locale" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${ogLocale}${b}`, "og:locale"],
    [/<title>[^<]*<\/title>/, () => `<title>${title}</title>`, "title"],
    [/(<meta name="title" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${title}${b}`, "meta title"],
    [/(<meta name="description" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${description}${b}`, "meta description"],
    [/(<link rel="canonical" href=")[^"]*(" \/>)/, (m, a, b) => `${a}${url}${b}`, "canonical"],
    [/(<meta property="og:url" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${url}${b}`, "og:url"],
    [/(<meta property="og:title" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${title}${b}`, "og:title"],
    [/(<meta property="og:description" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${description}${b}`, "og:description"],
    [/(<meta name="twitter:url" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${url}${b}`, "twitter:url"],
    [/(<meta name="twitter:title" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${title}${b}`, "twitter:title"],
    [/(<meta name="twitter:description" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${description}${b}`, "twitter:description"],
  ];

  if (route.path !== "/") {
    replacements.push(
      [/(<meta property="og:image:alt" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${title}${b}`, "og:image:alt"],
      [/<noscript>[\s\S]*?<\/noscript>/, () => subpageNoscript(route), "noscript"]
    );
  }

  let html = replacements.reduce(
    (current, [pattern, replacement, label]) =>
      replaceRequired(current, pattern, replacement, label, route.path),
    template
  );

  const faqScript = faqJsonLd(route.path);
  if (faqScript) {
    html = replaceRequired(html, /<\/head>/, () => `${faqScript}</head>`, "head end", route.path);
  }

  // Only the homepage renders the hero image, so only it gets the preload.
  if (route.path === "/") {
    html = replaceRequired(html, /<\/head>/, () => `${heroPreload}</head>`, "head end", route.path);
  }

  const outDir =
    route.path === "/"
      ? distDir
      : join(distDir, ...route.path.split("/").filter(Boolean));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  console.log(`prerendered ${route.path} -> ${join(outDir, "index.html")}`);
}

// Vite copies everything in public/ verbatim, including editor/tooling metadata
// directories (e.g. ".claude" write-tracking). Strip them from the deployable output.
const removeTrackingDirs = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const entryPath = join(dir, entry.name);
    if (entry.name === ".claude") {
      rmSync(entryPath, { recursive: true, force: true });
      console.log(`removed tooling metadata ${entryPath}`);
    } else {
      removeTrackingDirs(entryPath);
    }
  }
};
removeTrackingDirs(distDir);
