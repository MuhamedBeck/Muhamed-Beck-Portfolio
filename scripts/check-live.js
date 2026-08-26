// Probes the deployed site for the failures that are invisible from the build.
//
// The one this exists for: both contact forms disappear when the EmailJS
// variables are missing at build time, and the resulting page is a perfectly
// valid 200 with a polite line offering an email address instead. Nothing about
// it looks broken from the outside, so it can sit there for weeks losing
// enquiries. That has happened twice.
//
// It is checkable over plain HTTP because prerender-meta.js renders the page at
// build time: dist/kontakt/index.html contains the real <form> markup, or it
// contains the fallback. No browser needed.
//
// Run after a deploy, and on a schedule from .github/workflows/kontaktformular.yml,
// where a failure mails whoever watches the repository.
//
//   node scripts/check-live.js
//   node scripts/check-live.js --base http://localhost:4173
//   node scripts/check-live.js --attempts 1        fail on the first bad result
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_URL } from "../src/routes/registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const flagValue = (name, fallback) => {
  const at = process.argv.indexOf(name);
  return at === -1 ? fallback : process.argv[at + 1];
};

const BASE = flagValue("--base", SITE_URL).replace(/\/$/, "");

// A deploy is not visible everywhere the instant wrangler returns, so a single
// bad reading proves nothing. npm run deploy calls this immediately and would
// otherwise report a failure that fixes itself seconds later. Only a result
// that survives every attempt counts.
const ATTEMPTS = Math.max(1, Number(flagValue("--attempts", "3")) || 3);
const WAIT_MS = 15_000;

const get = async (path) => {
  const url = `${BASE}${path}`;
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "muhamedbeck-live-check", "Cache-Control": "no-cache" },
    });
    return { status: response.status, body: await response.text(), url };
  } catch (error) {
    return { status: 0, body: "", url, error: error.message };
  }
};

const FORMS = [
  {
    path: "/kontakt",
    label: "Kontaktformular (deutsch)",
    fields: ["kontakt-name", "kontakt-email", "kontakt-art", "kontakt-nachricht"],
  },
  {
    path: "/en/hire",
    label: "Contact form (English)",
    fields: ["hire-name", "hire-email", "hire-service", "hire-message"],
  },
];

const probe = async () => {
  const failures = [];
  const fail = (what, detail) => failures.push({ what, detail });

  // 1. The contact forms. This is the whole reason the script exists.
  for (const form of FORMS) {
    const page = await get(form.path);

    if (page.status !== 200) {
      fail(form.label, `${form.path} answered HTTP ${page.status}${page.error ? ` (${page.error})` : ""}`);
      continue;
    }

    // Detect the state by structure, not by copy: the fields are what the page
    // promises, and prose gets rewritten. The two pages word their fallback
    // differently, which is exactly how a copy-matching check goes stale.
    const missing = form.fields.filter((id) => !page.body.includes(`id="${id}"`));

    if (missing.length === form.fields.length) {
      // Every field gone and a mailto offered instead is the signature of a
      // build that had no EmailJS credentials.
      const offersEmail = /href="mailto:/.test(page.body);
      fail(
        form.label,
        offersEmail
          ? `${form.path} shows contact details instead of a form. The deployed build had no EmailJS credentials, so every enquiry that would have come through this page is being lost. Fix with: npm run deploy`
          : `${form.path} has neither a form nor the fallback contact details, which is neither state this page has.`
      );
      continue;
    }

    if (missing.length) fail(form.label, `${form.path} renders a form but is missing: ${missing.join(", ")}`);
    else if (!page.body.includes("<form")) fail(form.label, `${form.path} has the fields but no <form> around them`);
  }

  // The Arabic contact page carries no form on purpose, so it cannot be checked
  // the same way. What must hold there is that the direct route out survives: a
  // mailto and a tel link. Losing those is the same failure as losing a form,
  // and just as quiet.
  for (const pfad of ["/ar/hire"]) {
    const page = await get(pfad);
    if (page.status !== 200) {
      fail("Kontaktseite (arabisch)", `${pfad} answered HTTP ${page.status}`);
    } else {
      if (!/href="mailto:/.test(page.body)) fail("Kontaktseite (arabisch)", `${pfad} has no mailto link`);
      if (!/href="tel:/.test(page.body)) fail("Kontaktseite (arabisch)", `${pfad} has no tel link`);
    }
  }

  // 2. Every route answers, and answers with content. A 404 or an empty render
  //    here is how a page silently leaves the index.
  const routes = await Promise.all(ROUTES.map(async (r) => ({ path: r.path, ...(await get(r.path)) })));
  for (const result of routes) {
    if (result.status !== 200) {
      fail("Route", `${result.path} answered HTTP ${result.status}${result.error ? ` (${result.error})` : ""}`);
    } else if (!/<h1[\s>]/.test(result.body)) {
      fail("Route", `${result.path} answered 200 but carries no <h1>, so it rendered empty for a crawler`);
    }
  }

  // 3. The IndexNow key file. Losing it turns every submission into a 403, and
  //    the only symptom is that Bing stops hearing about new pages.
  const keyFile = readdirSync(join(__dirname, "..", "public")).find((n) => /^[0-9a-f]{8,128}\.txt$/.test(n));
  if (!keyFile) {
    fail("IndexNow", "no <key>.txt in public/");
  } else {
    const page = await get(`/${keyFile}`);
    const key = keyFile.replace(/\.txt$/, "");
    if (page.status !== 200) fail("IndexNow", `/${keyFile} answered HTTP ${page.status}`);
    else if (page.body.trim() !== key) fail("IndexNow", `/${keyFile} does not contain exactly "${key}"`);
  }

  // 4. The sitemap lists every route. Drift here is silent by nature.
  const sitemap = await get("/sitemap.xml");
  if (sitemap.status !== 200) {
    fail("Sitemap", `/sitemap.xml answered HTTP ${sitemap.status}`);
  } else {
    const absent = ROUTES.filter((r) => !sitemap.body.includes(`<loc>${SITE_URL}${r.path}</loc>`));
    if (absent.length) fail("Sitemap", `${absent.length} route(s) missing: ${absent.map((r) => r.path).join(", ")}`);
  }

  return failures;
};

let failures = [];
for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
  failures = await probe();
  if (!failures.length) break;
  if (attempt < ATTEMPTS) {
    console.warn(
      `check-live: ${failures.length} problem(s) on attempt ${attempt} of ${ATTEMPTS}, ` +
        `retrying in ${WAIT_MS / 1000}s in case a deploy is still propagating`
    );
    await new Promise((resolve) => setTimeout(resolve, WAIT_MS));
  }
}

if (failures.length) {
  console.error(`\ncheck-live: ${failures.length} problem(s) at ${BASE}, confirmed over ${ATTEMPTS} attempt(s)\n`);
  for (const { what, detail } of failures) console.error(`  ${what}\n    ${detail}\n`);
  process.exit(1);
}

console.log(
  `check-live: ${BASE} OK - both contact forms render, ${ROUTES.length} routes answer 200, ` +
    "IndexNow key and sitemap in place"
);
