// Submits every URL in the route registry to IndexNow.
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
// Usage:
//   npm run indexnow           submit every route
//   npm run indexnow -- --dry  print what would be sent
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
const urlList = ROUTES.map((route) => `${SITE_URL}${route.path}`);

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
  console.log(`indexnow: submitted ${urlList.length} URLs for ${host} (HTTP ${response.status})`);
} else {
  console.error(`indexnow: HTTP ${response.status} ${body}`);
  if (response.status === 403) {
    console.error(`indexnow: check that ${payload.keyLocation} is live and contains exactly "${key}"`);
  }
  process.exit(1);
}
