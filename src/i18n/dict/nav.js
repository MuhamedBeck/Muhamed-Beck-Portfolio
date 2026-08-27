// Navigation and footer labels.
//
// The two locales navigate to genuinely different places, not to translations
// of the same pages. German gets the full service and article structure because
// that is where the search demand is; English gets a single services page and a
// contact route, because competing for global English terms from a new domain
// with no geographic advantage is not winnable and would only dilute crawling.

const de = {
  primary: [
    { to: "/leistungen", label: "Leistungen" },
    { to: "/ratgeber", label: "Ratgeber" },
    { to: "/projekte", label: "Projekte" },
    { to: "/ueber-mich", label: "Über mich" },
  ],
  cta: { to: "/kontakt", label: "Erstgespräch" },
  footer: {
    services: "Leistungen",
    guides: "Ratgeber",
    projects: "Projekte",
    legal: "Rechtliches",
    contact: "Kontakt",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
    tagline: "KI- und Prozessautomatisierung aus Frankfurt am Main.",
  },
};

const en = {
  primary: [
    { to: "/en/services", label: "Services" },
    { to: "/en/projects/ar-data-visualization", label: "AR Visualization" },
    { to: "/en/projects/llm-maven-plugin", label: "LLM Testing" },
  ],
  cta: { to: "/en/hire", label: "Start a project" },
  footer: {
    services: "Services",
    guides: "Guides",
    projects: "Projects",
    legal: "Legal",
    contact: "Contact",
    imprint: "Imprint",
    privacy: "Privacy",
    rights: "All rights reserved.",
    tagline: "AI and process automation from Frankfurt, Germany.",
  },
};

/* Arabisch. Zuschnitt wie im englischen Zweig: eine Leistungsseite, die beiden
 * Fallstudien, eine Kontaktroute. Die deutschen Ratgeber-Artikel bleiben außen
 * vor, weil sie auf deutsche Suchbegriffe und deutsches Recht zielen.
 *
 * Rückübersetzung:
 *   primary   Leistungen · Augmented Reality · Automatisierte Tests
 *   cta       Ein Projekt starten
 *   footer    Leistungen · Artikel · Projekte · Rechtliches · Kontakt ·
 *             Impressum · Datenschutz · Alle Rechte vorbehalten. ·
 *             Prozessautomatisierung und KI aus Frankfurt am Main, Deutschland. */
const ar = {
  primary: [
    { to: "/ar/services", label: "الخدمات" },
    { to: "/ar/projects/ar-data-visualization", label: "الواقع المعزز" },
    { to: "/ar/projects/llm-maven-plugin", label: "الاختبارات الآلية" },
  ],
  cta: { to: "/ar/hire", label: "ابدأ مشروعًا" },
  footer: {
    services: "الخدمات",
    guides: "المقالات",
    projects: "المشاريع",
    legal: "الشؤون القانونية",
    contact: "التواصل",
    imprint: "بيانات الناشر",
    privacy: "الخصوصية",
    rights: "جميع الحقوق محفوظة.",
    tagline: "أتمتة العمليات والذكاء الاصطناعي من فرانكفورت، ألمانيا.",
  },
};

export default { de, en, ar };
