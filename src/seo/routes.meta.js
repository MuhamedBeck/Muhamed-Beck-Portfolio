// Single source of truth for per-route SEO metadata.
// Used by: generate-sitemap.js (build), prerender-meta.js (build) and usePageMeta (runtime).
// `lastmod` feeds the sitemap; update it whenever the page content actually changes.
// `lang` (default "en") sets the html lang attribute of the prerendered page.
export const SITE_URL = "https://muhamedbeck.com";

export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const ROUTES_META = [
  {
    path: "/",
    title:
      "Muhamed Beck | AI Automation & Full-Stack Developer in Frankfurt, Germany",
    description:
      "AI Automation Manager & Full-Stack Developer in Frankfurt. n8n and Zapier automation, LLM & RAG solutions, React, Angular, Spring Boot. Available for freelance work.",
    h1: "Muhamed Nur Beck, AI Automation Manager & Full-Stack Developer in Frankfurt, Germany",
    lastmod: "2026-07-31",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "AI Automation & Web Development Services | Muhamed Beck",
    description:
      "AI workflow automation with n8n & Zapier, web development with React, Angular & Spring Boot, CRM integrations and technical SEO. Services by Muhamed Beck, Frankfurt.",
    h1: "AI Automation & Web Development Services by Muhamed Beck, Frankfurt",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/hire",
    title: "Hire Muhamed Beck | AI Automation & Web Development Frankfurt",
    description:
      "Request AI automation, web development or CRM integration and get a personal reply within 24 hours from Muhamed Beck, freelance developer in Frankfurt.",
    h1: "Hire Muhamed Beck for AI Automation & Web Development",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/projects/ar-data-visualization",
    title: "AR Data Visualization with SAP BusinessObjects | Muhamed Beck",
    description:
      "Case study on visualizing SAP BusinessObjects data in Augmented Reality: concept, architecture and implementation by Muhamed Beck.",
    h1: "AR Data Visualization: SAP BusinessObjects meets Augmented Reality",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/projects/llm-maven-plugin",
    title: "LLM Unit Test Automation for Spring Boot | Muhamed Beck",
    description:
      "Master thesis project: a Maven plugin that uses Large Language Models to automatically generate unit tests for Java Spring Boot projects.",
    h1: "LLM Unit Test Automation: AI-Powered Unit Test Generation for Spring Boot",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/leistungen/n8n-automatisierung",
    title: "n8n Freelancer für Workflow-Automatisierung | Muhamed Beck",
    description:
      "n8n und Zapier Workflows vom Freelancer aus Frankfurt: Prozessautomatisierung, API- und CRM-Anbindung, KI-Integration. 90 bis 135 € pro Stunde nach Absprache.",
    h1: "n8n Freelancer für Workflow-Automatisierung",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/leistungen/ki-automatisierung-frankfurt",
    title: "KI-Automatisierung in Frankfurt | Muhamed Beck",
    description:
      "KI- und Prozessautomatisierung für Unternehmen in Frankfurt und Rhein-Main: GPT/LLM-Lösungen, RAG, Voice-AI und DSGVO-konforme Guardrails. Remote deutschlandweit.",
    h1: "KI-Automatisierung für Unternehmen in Frankfurt",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/leistungen/hubspot-integration",
    title: "HubSpot Integration & CRM-Automatisierung | Muhamed Beck",
    description:
      "HubSpot und CRM-Integrationen vom Freelancer: REST-APIs, Webhooks, OAuth2 und Datensynchronisation zwischen ATS, CRM und internen Tools. Aus Frankfurt, auch remote.",
    h1: "HubSpot Integration und CRM-Automatisierung",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/projekte/recruiting-automatisierung",
    title: "Case Study: Recruiting-Automatisierung mit n8n | Muhamed Beck",
    description:
      "Wie n8n, Zapier und GPT die Recruiting-Prozesse der TOPEOPLE Group automatisiert haben: 80 % kürzere Durchlaufzeiten und rund 90 % Automatisierungsgrad.",
    h1: "Recruiting-Automatisierung mit n8n und GPT",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/projekte/phoenix-parkservice",
    title: "Case Study Phoenix Parkservice: Microservices & SEO | Muhamed Beck",
    description:
      "Microservices-Plattform mit Spring Boot und Angular, DevOps und KI-gestützte SEO-Workflows: 35 % mehr organischer Traffic für Phoenix Parkservice.",
    h1: "Microservices-Plattform und KI-SEO für Phoenix Parkservice",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/impressum",
    title: "Impressum | Muhamed Beck",
    description:
      "Impressum von Muhamed Nur Beck, AI Automation & Full-Stack Developer aus Frankfurt am Main. Angaben gemäß § 5 DDG.",
    h1: "Impressum",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    path: "/datenschutz",
    title: "Datenschutzerklärung | Muhamed Beck",
    description:
      "Datenschutzerklärung für muhamedbeck.com: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
    h1: "Datenschutzerklärung",
    lang: "de",
    lastmod: "2026-07-31",
    changefreq: "yearly",
    priority: "0.3",
  },
];

export const NOT_FOUND_META = {
  title: "404 Page Not Found | Muhamed Beck",
  description: "This page does not exist. Return to muhamedbeck.com.",
  robots: "noindex, follow",
};

export function getRouteMeta(path) {
  const meta = ROUTES_META.find((route) => route.path === path);
  if (!meta) {
    throw new Error(`No SEO metadata defined for route "${path}"`);
  }
  return meta;
}
