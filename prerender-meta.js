// Post-build step. For every route it writes a dedicated dist/<route>/index.html
// containing:
//   1. route-specific title, description, canonical, Open Graph and Twitter tags,
//      so Google no longer sees every subpage as a duplicate of the homepage, and
//   2. the fully rendered page markup inside #root, so crawlers that do not run
//      JavaScript (GPTBot, ClaudeBot, PerplexityBot) read the actual content
//      instead of an empty container.
// routes.meta.js stays the single source of truth even if index.html drifts.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES_META, SITE_URL } from "./src/seo/routes.meta.js";
import { LEISTUNGEN } from "./src/content/leistungen.de.js";
import { render } from "./dist-ssr/entry-server.js";

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
    replacements.push([
      /(<meta property="og:image:alt" content=")[^"]*(" \/>)/,
      (m, a, b) => `${a}${title}${b}`,
      "og:image:alt",
    ]);
  }

  // The rendered markup replaces the hand-written noscript block: it carries the
  // same information and much more, for every crawler rather than only for
  // browsers with scripting disabled.
  const markup = render(route.path);
  if (!markup || markup.length < 500) {
    throw new Error(
      `prerender-meta: render("${route.path}") returned ${markup.length} chars, expected real markup`
    );
  }
  replacements.push(
    [/<noscript>[\s\S]*?<\/noscript>\s*/, () => "", "noscript"],
    [/<div id="root"><\/div>/, () => `<div id="root">${markup}</div>`, "root container"]
  );

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
