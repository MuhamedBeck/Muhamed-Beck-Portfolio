// Single source of truth for every route on the site.
//
// Four consumers derive from this one array, which is why it exists: the client
// router (src/main.jsx), the build-time renderer (src/entry-server.jsx),
// generate-sitemap.js and prerender-meta.js. They used to keep three separate
// hand-maintained lists, and a route missing from one of them failed silently:
// prerender-meta.js would render the NotFound tree, which still passes its
// "did we get real markup" guard.
//
// IMPORTANT: this file is imported by generate-sitemap.js and prerender-meta.js
// under bare `node`, so it must stay plain JavaScript. No JSX, no static imports
// of .jsx files, no TypeScript. The `load` thunks are never called by those
// scripts, so a dynamic import() of a .jsx file inside one is fine: Node parses
// the expression but never evaluates it.
//
// Every `load` resolves to a module shaped `{ default: Component }`, so the
// client can hand it straight to React.lazy and the SSR pass can read `.default`.

export const SITE_URL = "https://muhamedbeck.com";

export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const DEFAULT_LOCALE = "de";

/**
 * A route entry.
 *
 * @typedef {object} RouteEntry
 * @property {string}  id        stable, locale-independent identifier
 * @property {string}  path      served path. No trailing slash, ever, except "/".
 *                               html_handling: "drop-trailing-slash" in wrangler.jsonc
 *                               means the served URL must equal the canonical.
 * @property {string}  locale    "de" | "en"
 * @property {string}  group     links a page to its twin in the other locale.
 *                               A group with a single member emits no hreflang.
 * @property {Function} load     () => Promise<{ default: Component }>
 * @property {boolean} [eager]   keep in the main client bundle instead of a lazy chunk
 * @property {object}  [props]   static props spread into the element
 * @property {string}  title
 * @property {string}  description
 * @property {string}  h1        asserted against the rendered markup at build time,
 *                               so a missing translation fails the build
 * @property {string}  [ogType]  defaults to "website"
 * @property {string}  lastmod
 * @property {string}  changefreq
 * @property {string}  priority
 */

/** @type {RouteEntry[]} */
export const ROUTES = [
  {
    id: "home.en",
    path: "/",
    locale: "en",
    group: "home",
    // Stays in the main bundle so the landing page needs no extra round trip.
    // src/main.jsx must list this id in EAGER; check-i18n.js asserts it does.
    eager: true,
    // Renders the profile photo, so this page gets the LCP preload and the
    // sitemap image entry. Flags rather than a path comparison, because there
    // will shortly be a home page per locale.
    heroPreload: true,
    sitemapImage: true,
    load: () => import("../App.jsx"),
    title: "Muhamed Beck | AI Automation & Full-Stack Developer, Frankfurt",
    description:
      "AI Automation Manager & Full-Stack Developer in Frankfurt. n8n and Zapier automation, LLM & RAG solutions, React, Angular, Spring Boot. Available for freelance work.",
    h1: "Hi, I'm Muhamed Nur Beck",
    lastmod: "2026-07-31",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    id: "services.en",
    path: "/services",
    locale: "en",
    group: "services",
    load: () =>
      import("../components/pages/Services.jsx").then((m) => ({ default: m.Services })),
    title: "AI Automation & Web Development Services | Muhamed Beck",
    description:
      "AI workflow automation with n8n & Zapier, web development with React, Angular & Spring Boot, CRM integrations and technical SEO. Services by Muhamed Beck, Frankfurt.",
    h1: "Services",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "hire.en",
    path: "/hire",
    locale: "en",
    group: "hire",
    load: () =>
      import("../components/pages/HireMe.jsx").then((m) => ({ default: m.HireMe })),
    title: "Hire Muhamed Beck | AI Automation & Web Development Frankfurt",
    description:
      "Request AI automation, web development or CRM integration and get a personal reply within 24 hours from Muhamed Beck, freelance developer in Frankfurt.",
    h1: "Let's Work Together",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "project.ar",
    path: "/projects/ar-data-visualization",
    locale: "en",
    group: "project.ar",
    load: () =>
      import("../components/projects/ArDataVisualization.jsx").then((m) => ({
        default: m.ArDataVisualization,
      })),
    title: "AR Data Visualization with SAP BusinessObjects | Muhamed Beck",
    description:
      "Case study on visualizing SAP BusinessObjects data in Augmented Reality: concept, architecture and implementation by Muhamed Beck.",
    h1: "AR Data Visualization",
    ogType: "article",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "project.llm",
    path: "/projects/llm-maven-plugin",
    locale: "en",
    group: "project.llm",
    load: () =>
      import("../components/projects/LLMMavenPlugin.jsx").then((m) => ({
        default: m.LLMMavenPlugin,
      })),
    title: "LLM Unit Test Automation for Spring Boot | Muhamed Beck",
    description:
      "Master thesis project: a Maven plugin that uses Large Language Models to automatically generate unit tests for Java Spring Boot projects.",
    h1: "LLM Unit Test Automation",
    ogType: "article",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "leistung.n8n",
    path: "/leistungen/n8n-automatisierung",
    locale: "de",
    group: "leistung.n8n",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/n8n-automatisierung" },
    title: "n8n Freelancer für Workflow-Automatisierung | Muhamed Beck",
    description:
      "n8n und Zapier Workflows vom Freelancer aus Frankfurt: Prozessautomatisierung, API- und CRM-Anbindung, KI-Integration. 90 bis 135 € pro Stunde nach Absprache.",
    h1: "n8n Freelancer für Workflow-Automatisierung",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "leistung.ki-frankfurt",
    path: "/leistungen/ki-automatisierung-frankfurt",
    locale: "de",
    group: "leistung.ki-frankfurt",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/ki-automatisierung-frankfurt" },
    title: "KI-Automatisierung in Frankfurt | Muhamed Beck",
    description:
      "KI- und Prozessautomatisierung für Unternehmen in Frankfurt und Rhein-Main: GPT/LLM-Lösungen, RAG, Voice-AI und DSGVO-konforme Guardrails. Remote deutschlandweit.",
    h1: "KI-Automatisierung für Unternehmen in Frankfurt",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "leistung.hubspot",
    path: "/leistungen/hubspot-integration",
    locale: "de",
    group: "leistung.hubspot",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/hubspot-integration" },
    title: "HubSpot Integration & CRM-Automatisierung | Muhamed Beck",
    description:
      "HubSpot und CRM-Integrationen vom Freelancer: REST-APIs, Webhooks, OAuth2 und Datensynchronisation zwischen ATS, CRM und internen Tools. Aus Frankfurt, auch remote.",
    h1: "HubSpot Integration und CRM-Automatisierung",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "projekt.recruiting",
    path: "/projekte/recruiting-automatisierung",
    locale: "de",
    group: "projekt.recruiting",
    load: () => import("../components/pages/projekte/CaseStudyRoute.jsx"),
    props: { path: "/projekte/recruiting-automatisierung" },
    title: "Case Study: Recruiting-Automatisierung mit n8n | Muhamed Beck",
    description:
      "Wie n8n, Zapier und GPT die Recruiting-Prozesse der TOPEOPLE Group automatisiert haben: 80 % kürzere Durchlaufzeiten und rund 90 % Automatisierungsgrad.",
    h1: "Recruiting-Automatisierung mit n8n und GPT",
    ogType: "article",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "projekt.phoenix",
    path: "/projekte/phoenix-parkservice",
    locale: "de",
    group: "projekt.phoenix",
    load: () => import("../components/pages/projekte/CaseStudyRoute.jsx"),
    props: { path: "/projekte/phoenix-parkservice" },
    title: "Phoenix Parkservice: Microservices und KI-SEO | Muhamed Beck",
    description:
      "Microservices-Plattform mit Spring Boot und Angular, DevOps und KI-gestützte SEO-Workflows: 35 % mehr organischer Traffic für Phoenix Parkservice.",
    h1: "Microservices-Plattform und KI-SEO für Phoenix Parkservice",
    ogType: "article",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "impressum",
    path: "/impressum",
    locale: "de",
    group: "impressum",
    load: () =>
      import("../components/pages/Impressum.jsx").then((m) => ({ default: m.Impressum })),
    title: "Impressum | Muhamed Beck",
    description:
      "Impressum von Muhamed Nur Beck, AI Automation & Full-Stack Developer aus Frankfurt am Main. Angaben gemäß § 5 DDG.",
    h1: "Impressum",
    lastmod: "2026-07-31",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    id: "datenschutz",
    path: "/datenschutz",
    locale: "de",
    group: "datenschutz",
    load: () =>
      import("../components/pages/Datenschutz.jsx").then((m) => ({
        default: m.Datenschutz,
      })),
    title: "Datenschutzerklärung | Muhamed Beck",
    description:
      "Datenschutzerklärung für muhamedbeck.com: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
    h1: "Datenschutzerklärung",
    lastmod: "2026-07-31",
    changefreq: "yearly",
    priority: "0.3",
  },
];

// Deliberately has no `path`: usePageMeta then falls back to the pathname the
// visitor actually requested, so the 404 is self-canonical instead of claiming
// to be some fixed URL. RENDER_PATH is only the location StaticRouter is given
// to make the "*" route match at build time.
export const NOT_FOUND_META = {
  id: "not-found",
  locale: DEFAULT_LOCALE,
  group: "not-found",
  title: "404 Page Not Found | Muhamed Beck",
  description: "This page does not exist. Return to muhamedbeck.com.",
  h1: "404",
  robots: "noindex, follow",
};

export const NOT_FOUND_RENDER_PATH = "/__not-found__";

const BY_PATH = new Map(ROUTES.map((route) => [route.path, route]));

/** Route entry for a path, or undefined. Use this at runtime. */
export function findRoute(path) {
  return BY_PATH.get(path);
}

/**
 * Route entry for a path. Throws on an unknown path.
 * Build scripts rely on this: a page without metadata should fail the build
 * rather than ship with the homepage's tags.
 */
export function getRouteMeta(path) {
  const meta = BY_PATH.get(path);
  if (!meta) {
    throw new Error(`No route registered for "${path}"`);
  }
  return meta;
}

/**
 * Every entry sharing this entry's `group`, i.e. the same page in each locale.
 *
 * Derived rather than stored on purpose. A hand-maintained `alternates` field
 * invites the classic bug where the German page points at the English one but
 * not the reverse; deriving from a shared key makes the relation symmetric by
 * construction.
 *
 * Returns [] for a group with a single member: a one-element hreflang cluster
 * is noise that search engines ignore.
 */
export function getAlternates(entry) {
  const peers = ROUTES.filter((route) => route.group === entry.group);
  return peers.length < 2 ? [] : peers;
}

/**
 * Landing page for a locale. The language switcher falls back to this when the
 * current page has no counterpart in the target locale, which is the common
 * case: the German service pages and articles are deliberately not translated.
 */
export function getHome(locale) {
  return ROUTES.find((route) => route.group === "home" && route.locale === locale);
}
