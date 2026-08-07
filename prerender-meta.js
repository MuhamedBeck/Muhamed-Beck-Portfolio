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
import {
  DEFAULT_LOCALE,
  NOT_FOUND_META,
  NOT_FOUND_RENDER_PATH,
  ROUTES,
  SITE_URL,
  getAlternates,
} from "./src/routes/registry.js";
import { localeConfig } from "./src/i18n/locales.js";
import { LEISTUNGEN } from "./src/content/leistungen.de.js";
import { prepare, render } from "./dist-ssr/entry-server.js";

// Route components are loaded through dynamic import() so one registry entry can
// serve both the lazy client router and this eager build-time pass. They have to
// be resolved before the first render: React.lazy suspends during
// renderToString and would emit the Suspense fallback instead of the page.
await prepare();

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

// Mirrors react-dom/server's text escaping exactly, so a headline can be looked
// up in the rendered markup. Note it escapes the apostrophe as &#x27;, which the
// attribute escape above does not do.
const escapeText = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");

const replaceRequired = (html, pattern, replacement, label, path) => {
  if (!pattern.test(html)) {
    throw new Error(`prerender-meta: tag "${label}" not found while rendering ${path}`);
  }
  return html.replace(pattern, replacement);
};

// hreflang cluster for a route, replacing the <!--i18n-alternates--> anchor in
// index.html.
//
// Injected rather than pre-seeded as placeholder tags, because the number of
// alternates varies per page: most pages have no translated twin and must emit
// none at all. Pre-seeded placeholders would leave those pages pointing at
// whatever the template happened to contain.
//
// Each tag carries data-i18n="alt" so usePageMeta can identify and replace
// exactly these on client-side navigation without touching hand-written tags.
const alternatesBlock = (route) => {
  const alternates = getAlternates(route);
  if (!alternates.length) return "";

  const lines = alternates.map(
    (alternate) =>
      `  <link rel="alternate" hreflang="${localeConfig(alternate.locale).hreflang}" href="${SITE_URL}${alternate.path}" data-i18n="alt" />`
  );

  // x-default points at the German URL: German is the default, unprefixed
  // locale and the primary market. There is no language-selector landing page.
  const fallback =
    alternates.find((alternate) => alternate.locale === DEFAULT_LOCALE) ?? alternates[0];
  lines.push(
    `  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${fallback.path}" data-i18n="alt" />`
  );

  for (const alternate of alternates) {
    if (alternate.locale === route.locale) continue;
    lines.push(
      `  <meta property="og:locale:alternate" content="${localeConfig(alternate.locale).ogLocale}" data-i18n="alt" />`
    );
  }

  return lines.join("\n");
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

for (const route of ROUTES) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const { htmlLang, ogLocale } = localeConfig(route.locale);
  const ogType = route.ogType ?? "website";

  const replacements = [
    [/(<html lang=")[^"]*(">)/, (m, a, b) => `${a}${htmlLang}${b}`, "html lang"],
    [/(<meta property="og:locale" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${ogLocale}${b}`, "og:locale"],
    [/(<meta property="og:type" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${ogType}${b}`, "og:type"],
    [/<!--i18n-alternates-->/, () => alternatesBlock(route), "i18n alternates anchor"],
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
      `prerender-meta: render("${route.path}") returned ${markup?.length ?? 0} chars, expected real markup`
    );
  }
  // The length check alone is too weak: a page whose copy failed to resolve
  // still emits several kB of navbar and footer chrome. Asserting the route's
  // own headline turns a missing or mistyped translation key into a build
  // failure instead of a silently empty page in production.
  if (!markup.includes(escapeText(route.h1))) {
    throw new Error(
      `prerender-meta: render("${route.path}") does not contain its h1 ${JSON.stringify(route.h1)}. ` +
        `Either the page failed to render its content, or the h1 in the route registry is out of date.`
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

  // Only pages that actually render the hero image get its preload.
  if (route.heroPreload) {
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

// dist/404.html is what Cloudflare serves, with a real 404 status, for paths
// that match no asset (see not_found_handling in wrangler.jsonc). Without it an
// unknown URL would answer 200 with the homepage, which Search Console reports
// as a soft 404.
{
  const title = escapeHtml(NOT_FOUND_META.title);
  const description = escapeHtml(NOT_FOUND_META.description);
  let html = [
    [/<title>[^<]*<\/title>/, () => `<title>${title}</title>`, "title"],
    [/(<meta name="title" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${title}${b}`, "meta title"],
    [/(<meta name="description" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${description}${b}`, "meta description"],
    [/(<meta name="robots" content=")[^"]*(" \/>)/, (m, a, b) => `${a}${NOT_FOUND_META.robots}${b}`, "robots"],
    // A noindex page gets no hreflang: alternates on an excluded URL are
    // ignored at best and confuse the cluster at worst.
    [/<!--i18n-alternates-->/, () => "", "i18n alternates anchor"],
    [/<noscript>[\s\S]*?<\/noscript>\s*/, () => "", "noscript"],
    [
      /<div id="root"><\/div>/,
      () => `<div id="root">${render(NOT_FOUND_RENDER_PATH)}</div>`,
      "root container",
    ],
  ].reduce(
    (current, [pattern, replacement, label]) =>
      replaceRequired(current, pattern, replacement, label, "404"),
    template
  );
  writeFileSync(join(distDir, "404.html"), html);
  console.log(`prerendered 404 -> ${join(distDir, "404.html")}`);
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
