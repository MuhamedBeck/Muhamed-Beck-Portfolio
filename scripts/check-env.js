// Build gate for the EmailJS credentials.
//
// Vite inlines VITE_-prefixed variables at BUILD time. With none of them set,
// EMAILJS_IS_CONFIGURED in src/content/emailjs.js is false, both contact forms
// are replaced by a line saying the form is unavailable, and the build still
// exits 0. Nothing in the terminal distinguishes that build from a good one.
//
// This has now shipped twice: once for the whole time the site was first live,
// and once on 25 August 2026. Both times the site went out without a contact
// form and nobody found out from the build.
//
// So the build refuses instead. Someone who genuinely wants the fallback build
// says so with ALLOW_MISSING_EMAILJS=1.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Mirror the files Vite itself loads, in Vite's own precedence order: a value
// in .env.local beats one in .env, and a real environment variable beats both.
// Reading them here rather than importing Vite keeps this a gate that runs
// before anything else and cannot be broken by a bad config.
const readEnvFile = (name) => {
  const path = join(root, name);
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const at = line.indexOf("=");
        if (at === -1) return null;
        const value = line.slice(at + 1).trim();
        return [line.slice(0, at).trim(), value.replace(/^["']|["']$/g, "")];
      })
      .filter(Boolean)
  );
};

const env = { ...readEnvFile(".env"), ...readEnvFile(".env.local") };
const read = (key) => (process.env[key] || env[key] || "").trim();

const REQUIRED = ["VITE_SERVICE_ID", "VITE_TEMPLATE_ID", "VITE_PUBLIC_KEY"];
const missing = REQUIRED.filter((key) => !read(key));

if (!missing.length) {
  console.log(`check-env: EmailJS configured (${REQUIRED.length} of ${REQUIRED.length} values present)`);
  process.exit(0);
}

if (process.env.ALLOW_MISSING_EMAILJS === "1") {
  console.warn(
    `check-env: building WITHOUT a contact form on purpose (missing ${missing.join(", ")}).\n` +
      "check-env: /kontakt and /en/hire will show the direct contact details instead."
  );
  process.exit(0);
}

console.error(`\ncheck-env: ${missing.length} of ${REQUIRED.length} EmailJS values missing\n`);
for (const key of missing) console.error(`  - ${key}`);
console.error(
  "\nWithout these the build succeeds but both contact forms are replaced by a\n" +
    "line saying the form is unavailable, and every enquiry that would have come\n" +
    "through them is lost.\n\n" +
    "  cp .env.example .env      then fill in the three values from dashboard.emailjs.com\n\n" +
    "To build the form-less version deliberately:\n\n" +
    "  ALLOW_MISSING_EMAILJS=1 npm run build\n"
);
process.exit(1);
