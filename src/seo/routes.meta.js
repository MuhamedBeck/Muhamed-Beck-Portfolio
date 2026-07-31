// Single source of truth for per-route SEO metadata.
// Used by: generate-sitemap.js (build), prerender-meta.js (build) and usePageMeta (runtime).
// `lastmod` feeds the sitemap – update it whenever the page content actually changes.
export const SITE_URL = "https://mbeck.vercel.app";

export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const ROUTES_META = [
  {
    path: "/",
    title:
      "Muhamed Beck | AI Automation & Full-Stack Developer in Frankfurt, Germany",
    description:
      "Muhamed Beck – AI Automation Manager & Full-Stack Developer in Frankfurt. Expert in n8n, Zapier, OpenAI, Anthropic Claude, HubSpot integrations, React, Angular, Spring Boot & Docker. Available for freelance projects and collaborations.",
    h1: "Muhamed Nur Beck – AI Automation Manager & Full-Stack Developer in Frankfurt, Germany",
    lastmod: "2026-07-31",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "AI Automation & Web Development Services | Muhamed Beck",
    description:
      "AI workflow automation with n8n & Zapier, full-stack web development with React, Angular & Spring Boot, HubSpot & CRM integrations and technical SEO – services by Muhamed Beck in Frankfurt, Germany.",
    h1: "AI Automation & Web Development Services – Muhamed Beck, Frankfurt",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/hire",
    title: "Hire Muhamed Beck | AI Automation & Web Development Frankfurt",
    description:
      "Request AI automation, web development or CRM integration. Describe your project and get a personal reply from Muhamed Beck – freelance developer based in Frankfurt, Germany.",
    h1: "Hire Muhamed Beck – AI Automation & Web Development",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/projects/ar-data-visualization",
    title: "AR Data Visualization with SAP BusinessObjects | Muhamed Beck",
    description:
      "Case study: visualizing SAP BusinessObjects data in Augmented Reality – concept, architecture and implementation by Muhamed Beck.",
    h1: "AR Data Visualization – SAP BusinessObjects meets Augmented Reality",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/projects/llm-maven-plugin",
    title: "LLM Unit Test Automation for Spring Boot | Muhamed Beck",
    description:
      "Master thesis project: a Maven plugin that uses Large Language Models to automatically generate unit tests for Java Spring Boot projects.",
    h1: "LLM Unit Test Automation – AI-Powered Unit Test Generation for Spring Boot",
    lastmod: "2026-07-31",
    changefreq: "monthly",
    priority: "0.8",
  },
];

export const NOT_FOUND_META = {
  title: "404 – Page Not Found | Muhamed Beck",
  description: "This page does not exist. Return to mbeck.vercel.app.",
  robots: "noindex, follow",
};

export function getRouteMeta(path) {
  const meta = ROUTES_META.find((route) => route.path === path);
  if (!meta) {
    throw new Error(`No SEO metadata defined for route "${path}"`);
  }
  return meta;
}
