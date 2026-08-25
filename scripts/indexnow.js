// Submits changed URLs to IndexNow.
//
// Why this matters more here than on an established site: ChatGPT Search
// retrieves through Bing's index, so a page Bing has not crawled effectively
// cannot appear in a ChatGPT answer. For a domain with no backlinks, organic
// discovery by Bingbot is slow, and IndexNow (co-developed by Microsoft) is the
// documented way to say "these URLs changed" instead of waiting to be found.
//
// One submission reaches every participating engine: Bing, Yandex, Seznam,
// Naver. Google does not participate.
//
// Bing is explicit that this is not a "ping everything" endpoint: "you should
// publish only URLs changing (added, updated, or deleted) since the time you
// start to use IndexNow." Submitting all 24 routes on every run is the kind of
// noise that earns a 429 and teaches the engine to discount the signal.
//
// So the default is the newest lastmod cohort from the route registry. Nothing
// enforces that field: generate-sitemap.js only reads it. It stays truthful
// because whoever changes a page bumps that page's row and no others -- which
// is why the checklist in CLAUDE.md names it, and why a run where every route
// shares the newest date stops instead of submitting everything.
//
// Usage:
//   npm run indexnow                    submit routes carrying the newest lastmod
//   npm run indexnow -- --all           submit every route (use after a full rebuild)
//   npm run indexnow -- /kontakt /en    submit exactly these paths
//   npm run indexnow -- --dry           print what would be sent, send nothing
//
// The key file must already be live at https://muhamedbeck.com/<key>.txt, which
// is how the endpoint verifies you control the host. Deploy before submitting.
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_URL } from "../src/routes/registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const ENDPOINT = "https://api.indexnow.org/indexnow";

// The key is whatever <key>.txt sits in public/. Deriving it from the file
// rather than hardcoding it means the two can never disagree, which is the
// only way this call fails with a 403.
const keyFiles = readdirSync(publicDir).filter((name) => /^[0-9a-f]{8,128}\.txt$/.test(name));

if (keyFiles.length !== 1) {
  console.error(
    keyFiles.length === 0
      ? "indexnow: no <key>.txt found in public/. Create one containing its own filename (without .txt)."
      : `indexnow: expected exactly one key file in public/, found ${keyFiles.length}: ${keyFiles.join(", ")}`
  );
  process.exit(1);
}

const key = keyFiles[0].replace(/\.txt$/, "");
const host = new URL(SITE_URL).host;

const flags = process.argv.slice(2);
const explicitPaths = flags.filter((arg) => arg.startsWith("/"));

let selected;
let reason;
if (explicitPaths.length > 0) {
  const known = new Set(ROUTES.map((route) => route.path));
  const unknown = explicitPaths.filter((path) => !known.has(path));
  if (unknown.length > 0) {
    console.error(`indexnow: not in the route registry: ${unknown.join(", ")}`);
    process.exit(1);
  }
  selected = explicitPaths;
  reason = "explicitly listed";
} else if (flags.includes("--all")) {
  selected = ROUTES.map((route) => route.path);
  reason = "--all";
} else {
  const newest = ROUTES.reduce(
    (latest, route) => (route.lastmod > latest ? route.lastmod : latest),
    ""
  );
  const cohort = ROUTES.filter((route) => route.lastmod === newest);

  // If every route shares the newest date, the cohort filter has selected
  // nothing and this run would submit the whole site -- exactly what the
  // default exists to prevent. That happens when a bulk edit stamps one date
  // across the registry, which is legitimate after a site-wide change and a
  // mistake after a two-page one. The script cannot tell those apart, so it
  // refuses and makes the caller say which it was.
  if (cohort.length === ROUTES.length) {
    console.error(
      `indexnow: all ${ROUTES.length} routes carry lastmod ${newest}, so the newest cohort is the entire site.`
    );
    console.error("indexnow: after a site-wide change, confirm with:  npm run indexnow -- --all");
    console.error("indexnow: after changing a few pages, bump only their lastmod in src/routes/registry.js,");
    console.error("indexnow: or name them directly:  npm run indexnow -- /pfad-a /pfad-b");
    process.exit(1);
  }

  selected = cohort.map((route) => route.path);
  reason = `lastmod ${newest}`;
}

const urlList = selected.map((path) => `${SITE_URL}${path}`);

const payload = {
  host,
  key,
  keyLocation: `${SITE_URL}/${key}.txt`,
  urlList,
};

if (process.argv.includes("--dry")) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

// IndexNow answers 200 or 202 on success. 403 means the key file is not
// reachable at keyLocation, which on a fresh deploy usually means the site was
// submitted before it went live.
const body = await response.text();
if (response.ok) {
  console.log(
    `indexnow: submitted ${urlList.length} of ${ROUTES.length} URLs for ${host} (${reason}, HTTP ${response.status})`
  );
} else {
  console.error(`indexnow: HTTP ${response.status} ${body}`);
  if (response.status === 403) {
    console.error(`indexnow: check that ${payload.keyLocation} is live and contains exactly "${key}"`);
  }
  process.exit(1);
}
