// Build-time validation of the route registry and the translation dictionaries.
// Runs as the first step of `npm run build`, so a structural mistake fails fast
// instead of shipping a page with `undefined` in it.
//
// This exists because the project is plain JavaScript and cannot use
// TypeScript's structural checking: generate-sitemap.js and prerender-meta.js
// import the registry under bare `node`, and Node cannot load .ts. The checks
// below are the parts of that safety net which actually matter here.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, getHome } from "../src/routes/registry.js";
import { DEFAULT_LOCALE, LIVE_LOCALES, LOCALES } from "../src/i18n/locales.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const problems = [];

const fail = (message) => problems.push(message);

// ---------------------------------------------------------------------------
// Registry invariants
// ---------------------------------------------------------------------------

const seenIds = new Set();
const seenPaths = new Set();

for (const route of ROUTES) {
  const where = `route "${route.id ?? route.path}"`;

  if (!route.id) fail(`${where}: missing id`);
  else if (seenIds.has(route.id)) fail(`${where}: duplicate id`);
  else seenIds.add(route.id);

  if (!route.path) fail(`${where}: missing path`);
  else if (seenPaths.has(route.path)) fail(`${where}: duplicate path "${route.path}"`);
  else seenPaths.add(route.path);

  // wrangler.jsonc serves with html_handling "drop-trailing-slash", so a
  // trailing slash would make the served URL disagree with the canonical, and
  // would produce a malformed output directory in prerender-meta.js.
  if (route.path !== "/" && route.path.endsWith("/")) {
    fail(`${where}: path must not end with a trailing slash`);
  }
  if (route.path && !route.path.startsWith("/")) {
    fail(`${where}: path must start with "/"`);
  }

  if (!LIVE_LOCALES.includes(route.locale)) {
    fail(`${where}: locale ${JSON.stringify(route.locale)} is not in LIVE_LOCALES`);
  }
  if (!route.group) fail(`${where}: missing group`);
  if (typeof route.load !== "function") fail(`${where}: load must be a function`);

  for (const field of ["title", "description", "h1", "lastmod", "changefreq", "priority"]) {
    if (!route[field]) fail(`${where}: missing ${field}`);
  }

  // Long titles get truncated in results, which wastes the strongest on-page
  // signal there is. Warn-level, so it is a failure only while it is cheap to fix.
  if (route.title && route.title.length > 65) {
    fail(`${where}: title is ${route.title.length} chars, keep it under 65`);
  }
  if (route.description && (route.description.length < 70 || route.description.length > 165)) {
    fail(
      `${where}: description is ${route.description.length} chars, aim for 70 to 165`
    );
  }

  // House rule: no em dashes in copy that ships.
  for (const field of ["title", "description", "h1"]) {
    if (route[field]?.includes("—")) {
      fail(`${where}: ${field} contains an em dash; use a colon, comma or a separate sentence`);
    }
  }
}

// A group may hold at most one entry per locale, otherwise hreflang would
// advertise two competing URLs for the same language.
const byGroup = new Map();
for (const route of ROUTES) {
  const locales = byGroup.get(route.group) ?? new Set();
  if (locales.has(route.locale)) {
    fail(`group "${route.group}" has more than one ${route.locale} entry`);
  }
  locales.add(route.locale);
  byGroup.set(route.group, locales);
}

// The language switcher falls back to a locale's homepage whenever the current
// page has no twin, which is the common case. Without one it would dead-end.
for (const locale of LIVE_LOCALES) {
  if (!getHome(locale)) fail(`no route with group "home" for locale "${locale}"`);
}

// These URLs are already indexed. Renaming one silently drops its ranking, so
// the build refuses rather than letting it happen quietly.
const INDEXED_PATHS = [
  "/leistungen/n8n-automatisierung",
  "/leistungen/ki-automatisierung-frankfurt",
  "/leistungen/hubspot-integration",
  "/projekte/recruiting-automatisierung",
  "/projekte/phoenix-parkservice",
  "/impressum",
  "/datenschutz",
];
for (const path of INDEXED_PATHS) {
  if (!seenPaths.has(path)) {
    fail(
      `indexed path "${path}" is no longer in the registry. ` +
        `If the move is intentional, add a 301 to public/_redirects and update this list.`
    );
  }
}

// Routes flagged `eager` stay in the main client bundle, which main.jsx has to
// arrange with a static import. Keep the two lists in step.
const mainSource = readFileSync(join(root, "src", "main.jsx"), "utf8");
const eagerBlock = /const EAGER = \{([\s\S]*?)\}/.exec(mainSource)?.[1] ?? "";
for (const route of ROUTES) {
  const listed = eagerBlock.includes(`"${route.id}"`);
  if (route.eager && !listed) {
    fail(`route "${route.id}" is eager but is not in the EAGER map in src/main.jsx`);
  }
  if (!route.eager && listed) {
    fail(`route "${route.id}" is in the EAGER map in src/main.jsx but is not marked eager`);
  }
}

// ---------------------------------------------------------------------------
// Dictionary completeness
// ---------------------------------------------------------------------------

/** Every leaf path in an object, as dotted strings, with the leaf's type. */
function shapeOf(value, prefix = "") {
  if (Array.isArray(value)) {
    return new Map([[prefix, `array[${value.length}]`]]);
  }
  if (value && typeof value === "object") {
    const shape = new Map();
    for (const [key, child] of Object.entries(value)) {
      for (const [path, type] of shapeOf(child, prefix ? `${prefix}.${key}` : key)) {
        shape.set(path, type);
      }
    }
    return shape;
  }
  return new Map([[prefix, typeof value]]);
}

const dictDir = join(root, "src", "i18n", "dict");
const dictFiles = readdirSync(dictDir).filter((name) => name.endsWith(".js"));

if (!dictFiles.length) fail("no dictionaries found in src/i18n/dict");

for (const file of dictFiles) {
  const namespace = (await import(join(dictDir, file))).default;
  const label = `dict/${file}`;

  if (!namespace || typeof namespace !== "object") {
    fail(`${label}: default export must be an object shaped { de, en }`);
    continue;
  }

  const reference = namespace[DEFAULT_LOCALE];
  if (!reference) {
    fail(`${label}: missing the "${DEFAULT_LOCALE}" reference object`);
    continue;
  }
  const referenceShape = shapeOf(reference);

  for (const locale of LIVE_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const translation = namespace[locale];
    if (!translation) {
      fail(`${label}: missing "${locale}"`);
      continue;
    }

    const translationShape = shapeOf(translation);
    for (const [path, type] of referenceShape) {
      if (!translationShape.has(path)) {
        fail(`${label} [${locale}]: missing key "${path}"`);
      } else if (translationShape.get(path) !== type) {
        fail(
          `${label} [${locale}]: key "${path}" is ${translationShape.get(path)}, ` +
            `expected ${type} to match ${DEFAULT_LOCALE}`
        );
      }
    }
    for (const path of translationShape.keys()) {
      if (!referenceShape.has(path)) {
        fail(`${label} [${locale}]: key "${path}" does not exist in ${DEFAULT_LOCALE}`);
      }
    }
  }

  for (const locale of Object.keys(namespace)) {
    if (!LOCALES[locale]) fail(`${label}: "${locale}" is not a known locale`);
  }
}

// ---------------------------------------------------------------------------

if (problems.length) {
  console.error(`\ncheck-i18n: ${problems.length} problem(s)\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error("");
  process.exit(1);
}

console.log(
  `check-i18n: ${ROUTES.length} routes and ${dictFiles.length} dictionaries OK ` +
    `(${LIVE_LOCALES.join(", ")})`
);
