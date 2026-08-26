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
    id: "home.de",
    path: "/",
    locale: "de",
    group: "home",
    // Stays in the main client bundle so the landing page needs no extra round
    // trip. src/main.jsx must list this id in EAGER; check-i18n.js asserts it.
    eager: true,
    // Renders the profile photo, so this page gets the LCP preload and the
    // sitemap image entry.
    heroPreload: true,
    sitemapImage: true,
    load: () =>
      import("../components/pages/Startseite.jsx").then((m) => ({ default: m.Startseite })),
    title: "n8n Freelancer & KI-Automatisierung Frankfurt | Muhamed Beck",
    description:
      "n8n Experte aus Frankfurt: Workflow-Automatisierung, KI-Agenten und CRM-Anbindung für Unternehmen. 90 bis 135 € pro Stunde nach Absprache. Antwort in 24 Stunden.",
    h1: "Prozesse, die ohne Sie laufen",
    lastmod: "2026-08-25",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    id: "leistungen.hub",
    path: "/leistungen",
    locale: "de",
    group: "services",
    load: () => import("../components/pages/LeistungenHub.jsx"),
    title: "Leistungen: KI- und Prozessautomatisierung | Muhamed Beck",
    description:
      "Automatisierung mit n8n, KI-Agenten, Voice-AI, HubSpot- und ATS-Anbindung sowie Recruiting-Automatisierung. Alle Leistungen mit Ablauf und Preisrahmen.",
    h1: "KI- und Prozessautomatisierung",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "projekte.hub",
    path: "/projekte",
    locale: "de",
    group: "projects",
    load: () => import("../components/pages/ProjekteHub.jsx"),
    title: "Projekte und Case Studies | Muhamed Beck",
    description:
      "Zwei Automatisierungsprojekte im Detail: Recruiting-Automatisierung mit n8n und GPT sowie eine Microservices-Plattform mit KI-gestütztem SEO. Mit Zahlen und Stack.",
    h1: "Was ich gebaut habe",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "ueber-mich",
    path: "/ueber-mich",
    locale: "de",
    group: "about",
    load: () => import("../components/pages/UeberMich.jsx"),
    title: "Über mich: Muhamed Nur Beck, Frankfurt | Muhamed Beck",
    description:
      "AI Automation Manager und Full-Stack-Entwickler aus Frankfurt am Main: Werdegang, Stationen bei TOPEOPLE, Phoenix Parkservice und INFOMOTION, eingesetzter Stack.",
    h1: "Muhamed Nur Beck",
    ogType: "profile",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "kontakt",
    path: "/kontakt",
    locale: "de",
    group: "contact",
    load: () => import("../components/pages/Kontakt.jsx"),
    title: "Projekt anfragen | Muhamed Beck",
    description:
      "Automatisierungsprojekt anfragen: E-Mail, Telefon oder LinkedIn. Antwort innerhalb von 24 Stunden, kostenloses Erstgespräch, 90 bis 135 € pro Stunde nach Absprache.",
    h1: "Projekt anfragen",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "home.en",
    path: "/en",
    locale: "en",
    group: "home",
    heroPreload: true,
    load: () => import("../App.jsx"),
    title: "Muhamed Beck | AI Automation & Full-Stack Developer, Frankfurt",
    description:
      "AI Automation Manager & Full-Stack Developer in Frankfurt. n8n and Zapier automation, LLM & RAG solutions, React, Angular, Spring Boot. Available for freelance work.",
    h1: "Processes that run without you",
    lastmod: "2026-08-25",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    id: "services.en",
    path: "/en/services",
    locale: "en",
    group: "services",
    load: () =>
      import("../components/pages/Services.jsx").then((m) => ({ default: m.Services })),
    title: "AI Automation & Web Development Services | Muhamed Beck",
    description:
      "AI workflow automation with n8n & Zapier, web development with React, Angular & Spring Boot, CRM integrations and technical SEO. Services by Muhamed Beck, Frankfurt.",
    h1: "AI automation and web development",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "hire.en",
    path: "/en/hire",
    locale: "en",
    group: "contact",
    load: () =>
      import("../components/pages/HireMe.jsx").then((m) => ({ default: m.HireMe })),
    title: "Hire Muhamed Beck | AI Automation & Web Development Frankfurt",
    description:
      "Request AI automation, web development or CRM integration and get a personal reply within 24 hours from Muhamed Beck, freelance developer in Frankfurt.",
    h1: "Start a project",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.9",
  },

  /* Arabic. Same scope as the English section, joined to the existing groups so
     hreflang stays symmetric by construction: adding these five made the German
     and English pages advertise them without touching a single existing entry.

     Latin slugs, like the English branch. Arabic ones would be percent-encoded
     in every href, mail and message, and stop being shareable. */
  {
    id: "home.ar",
    path: "/ar",
    locale: "ar",
    group: "home",
    load: () =>
      import("../components/pages/arabisch/ArabicHome.jsx").then((m) => ({
        default: m.ArabicHome,
      })),
    title: "محمد نور بيك | أتمتة الذكاء الاصطناعي وn8n في فرانكفورت",
    description:
      "مدير أتمتة الذكاء الاصطناعي ومطوّر برمجيات متكامل في فرانكفورت. أتمتة العمليات باستخدام n8n، وربط أنظمة CRM وATS، ووكلاء ذكاء اصطناعي. الرد خلال 24 ساعة.",
    h1: "عمليات تعمل من دونك",
    lastmod: "2026-08-26",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "services.ar",
    path: "/ar/services",
    locale: "ar",
    group: "services",
    load: () =>
      import("../components/pages/arabisch/ArabicServices.jsx").then((m) => ({
        default: m.ArabicServices,
      })),
    title: "الخدمات: أتمتة العمليات والذكاء الاصطناعي | محمد بيك",
    description:
      "أتمتة سير العمل باستخدام n8n، ووكلاء الذكاء الاصطناعي، وربط أنظمة CRM وATS، ومساعدون صوتيون، وتطوير برمجي متكامل. من 90 إلى 135 يورو في الساعة.",
    h1: "الأتمتة والذكاء الاصطناعي والتطوير",
    lastmod: "2026-08-26",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "hire.ar",
    path: "/ar/hire",
    locale: "ar",
    group: "contact",
    load: () =>
      import("../components/pages/arabisch/ArabicHire.jsx").then((m) => ({
        default: m.ArabicHire,
      })),
    title: "ابدأ مشروعًا مع محمد نور بيك | فرانكفورت وعن بُعد",
    description:
      "صف العملية التي تستهلك أكبر وقت لديك، وستحصل على تقييم صريح خلال 24 ساعة. الاستشارة الأولى مجانية، والعمل عن بُعد مع عملاء في أوروبا والمنطقة العربية.",
    h1: "ابدأ مشروعًا",
    lastmod: "2026-08-26",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "project.llm.ar",
    path: "/ar/projects/llm-maven-plugin",
    locale: "ar",
    group: "project.llm",
    load: () => import("../components/pages/projekte/CaseStudyArRoute.jsx"),
    props: { path: "/ar/projects/llm-maven-plugin" },
    title: "أتمتة اختبارات الوحدة بنموذج لغوي | رسالة ماجستير",
    description:
      "مكوّن Maven إضافي يولّد اختبارات وحدة لمشاريع Spring Boot بنموذج لغوي: زيادة 33 بالمئة في التغطية مقيسة بـ JaCoCo، وكلفة 2,13 يورو بدل 566 يورو.",
    h1: "أتمتة اختبارات الوحدة بنموذج لغوي",
    ogType: "article",
    lastmod: "2026-08-26",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "project.ar.ar",
    path: "/ar/projects/ar-data-visualization",
    locale: "ar",
    group: "project.ar",
    load: () => import("../components/pages/projekte/CaseStudyArRoute.jsx"),
    props: { path: "/ar/projects/ar-data-visualization" },
    title: "تقارير SAP في الواقع المعزز | رسالة بكالوريوس",
    description:
      "عرض تقارير SAP BusinessObjects في الواقع المعزز داخل المتصفح، مع استبيان شمل 81 مشاركًا في شركات ألمانية حول عوائق التبني. أكثر من 50 إطارًا في الثانية.",
    h1: "تصوير البيانات في الواقع المعزز",
    ogType: "article",
    lastmod: "2026-08-26",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "projekt.llm",
    path: "/projekte/llm-unit-test-automatisierung",
    locale: "de",
    // Same group as the English case study, so the hreflang pair is derived
    // rather than declared. Both were English-only until now, which left the
    // hardest-sourced figures on this site off the pages that compete for
    // German search volume.
    group: "project.llm",
    load: () => import("../components/pages/projekte/CaseStudyRoute.jsx"),
    props: { path: "/projekte/llm-unit-test-automatisierung" },
    title: "Unit-Tests mit LLM erzeugen: Masterarbeit | Muhamed Beck",
    description:
      "Maven-Plugin, das Unit-Tests für Spring Boot mit einem LLM erzeugt: 33 % mehr Testabdeckung mit JaCoCo gemessen, Kosten je Testsuite von 566 € auf 2,13 €.",
    h1: "Unit-Tests automatisch erzeugen mit einem LLM",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "projekt.ar",
    path: "/projekte/ar-datenvisualisierung",
    locale: "de",
    group: "project.ar",
    load: () => import("../components/pages/projekte/CaseStudyRoute.jsx"),
    props: { path: "/projekte/ar-datenvisualisierung" },
    title: "SAP-Berichte in Augmented Reality: Bachelorarbeit | Muhamed Beck",
    description:
      "AR-Visualisierung von SAP-BusinessObjects-Berichten im Browser, mit einer Befragung von 81 Personen in deutschen Unternehmen zu den Hürden der Einführung.",
    h1: "SAP-BusinessObjects-Berichte in Augmented Reality",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "project.ar",
    path: "/en/projects/ar-data-visualization",
    locale: "en",
    group: "project.ar",
    load: () =>
      import("../components/pages/projekte/CaseStudyEnRoute.jsx").then((m) => ({
        default: () => m.default({ path: "/en/projects/ar-data-visualization" }),
      })),
    title: "AR Data Visualization with SAP BusinessObjects | Muhamed Beck",
    description:
      "Case study on visualizing SAP BusinessObjects data in Augmented Reality: concept, architecture and implementation by Muhamed Beck.",
    h1: "AR data visualisation",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "project.llm",
    path: "/en/projects/llm-maven-plugin",
    locale: "en",
    group: "project.llm",
    load: () =>
      import("../components/pages/projekte/CaseStudyEnRoute.jsx").then((m) => ({
        default: () => m.default({ path: "/en/projects/llm-maven-plugin" }),
      })),
    title: "LLM Unit Test Automation for Spring Boot | Muhamed Beck",
    description:
      "Master thesis project: a Maven plugin that uses Large Language Models to automatically generate unit tests for Java Spring Boot projects.",
    h1: "LLM unit test automation",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "ratgeber.hub",
    path: "/ratgeber",
    locale: "de",
    group: "guides",
    load: () => import("../components/pages/ratgeber/RatgeberHub.jsx"),
    title: "Ratgeber: Automatisierung und KI | Muhamed Beck",
    description:
      "Was ein n8n Freelancer kostet, wie n8n, Make und Zapier sich unterscheiden und was sich im Recruiting automatisieren lässt. Mit Zahlen und Quellen.",
    h1: "Antworten statt Marketing",
    lastmod: "2026-08-25",
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    id: "ratgeber.kosten",
    path: "/ratgeber/n8n-freelancer-kosten",
    locale: "de",
    group: "ratgeber.kosten",
    load: () => import("../components/pages/ratgeber/RatgeberRoute.jsx"),
    props: { path: "/ratgeber/n8n-freelancer-kosten" },
    title: "Was kostet ein n8n Freelancer? Stundensätze 2026",
    description:
      "n8n Freelancer kosten 75 bis 147 € pro Stunde (freelancermap, August 2026), der IT-Median liegt bei 95 €. Dazu Festpreis oder Stundensatz und laufende Kosten.",
    h1: "Was kostet ein n8n Freelancer?",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "ratgeber.vergleich",
    path: "/ratgeber/n8n-vs-make-vs-zapier",
    locale: "de",
    group: "ratgeber.vergleich",
    load: () => import("../components/pages/ratgeber/RatgeberRoute.jsx"),
    props: { path: "/ratgeber/n8n-vs-make-vs-zapier" },
    title: "n8n, Make und Zapier im Vergleich 2026",
    description:
      "Der wichtigste Unterschied ist die Abrechnung: n8n zählt eine Workflow-Ausführung, Make jede Operation. Dazu DSGVO, Self-Hosting und die passende Toolwahl.",
    h1: "n8n, Make und Zapier im Vergleich",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    id: "ratgeber.recruiting",
    path: "/ratgeber/recruiting-mit-n8n-automatisieren",
    locale: "de",
    group: "ratgeber.recruiting",
    load: () => import("../components/pages/ratgeber/RatgeberRoute.jsx"),
    props: { path: "/ratgeber/recruiting-mit-n8n-automatisieren" },
    title: "Recruiting mit n8n automatisieren: Anleitung 2026",
    description:
      "Welche Recruiting-Schritte sich automatisieren lassen, womit man anfängt, wie ATS und CRM angebunden werden und was bei Bewerberdaten und DSGVO zu beachten ist.",
    h1: "Recruiting mit n8n automatisieren",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "ratgeber.aiact",
    path: "/ratgeber/ki-recruiting-ai-act",
    locale: "de",
    group: "ratgeber.aiact",
    load: () => import("../components/pages/ratgeber/RatgeberRoute.jsx"),
    props: { path: "/ratgeber/ki-recruiting-ai-act" },
    title: "AI Act und KI im Recruiting: Was 2026 schon gilt",
    description:
      "Die Hochrisiko-Pflichten für Recruiting-KI gelten erst ab Dezember 2027. Emotionserkennung im Bewerbungsgespräch ist dagegen seit Februar 2025 verboten.",
    h1: "KI im Recruiting und der AI Act",
    ogType: "article",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "ratgeber.voiceai",
    path: "/ratgeber/ki-telefonagent-kosten-recht",
    locale: "de",
    group: "ratgeber.voiceai",
    load: () => import("../components/pages/ratgeber/RatgeberRoute.jsx"),
    props: { path: "/ratgeber/ki-telefonagent-kosten-recht" },
    title: "KI-Telefonagent: Kosten, DSGVO und Strafrecht 2026",
    description:
      "Was ein KI-Telefonagent je Minute kostet, welche Anbieter wirklich in der EU verarbeiten und warum das Mitschneiden ohne Einwilligung in Deutschland strafbar ist.",
    h1: "KI-Telefonagenten: Kosten und Rechtslage",
    ogType: "article",
    lastmod: "2026-08-26",
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
    lastmod: "2026-08-25",
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
    lastmod: "2026-08-25",
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
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "leistung.recruiting",
    path: "/leistungen/recruiting-automatisierung",
    locale: "de",
    group: "leistung.recruiting",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/recruiting-automatisierung" },
    title: "Recruiting-Automatisierung mit n8n | Muhamed Beck",
    description:
      "Bewerbungseingang, Screening, Terminierung und Statuspflege automatisieren: n8n mit RecruitCRM, Personio, Greenhouse und HubSpot. 80 % kürzere Durchlaufzeiten.",
    h1: "Recruiting-Automatisierung mit n8n und ATS-Anbindung",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    id: "leistung.voice-ai",
    path: "/leistungen/voice-ai-agenten",
    locale: "de",
    group: "leistung.voice-ai",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/voice-ai-agenten" },
    title: "KI-Telefonassistent und Voice-AI-Agenten | Muhamed Beck",
    description:
      "Voice-AI-Agenten für Telefon und Support: Twilio, Speech-to-Text und Text-to-Speech, CRM-Anbindung und Transparenzhinweis nach EU AI Act Artikel 50.",
    h1: "Voice-AI-Agenten für Telefon und Support",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    id: "leistung.ki-agenten",
    path: "/leistungen/ki-agenten-entwicklung",
    locale: "de",
    group: "leistung.ki-agenten",
    load: () => import("../components/pages/leistungen/LeistungRoute.jsx"),
    props: { path: "/leistungen/ki-agenten-entwicklung" },
    title: "KI-Agenten entwickeln lassen | Muhamed Beck",
    description:
      "KI-Agenten mit klaren Werkzeugrechten, Freigabeschritten und Protokollierung. Mit ehrlicher Einordnung, wann ein normaler Workflow die bessere Lösung ist.",
    h1: "KI-Agenten entwickeln lassen",
    lastmod: "2026-08-25",
    changefreq: "monthly",
    priority: "0.8",
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
    lastmod: "2026-08-25",
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
    lastmod: "2026-08-25",
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
    lastmod: "2026-08-25",
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
    lastmod: "2026-08-25",
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
/**
 * Where each locale keeps its sections.
 *
 * The three components that needed this each carried their own
 * `locale === "de" ? ... : ...`, which silently handed the English path to any
 * third locale: the logo linked Arabic pages to /en, the hero's two buttons
 * sent Arabic visitors to the English services and hire pages, and the footer
 * quietly rendered empty columns. None of those fail loudly.
 *
 * A table keyed by locale cannot do that: a missing locale is `undefined` and
 * shows up the first time anyone looks, rather than pointing at the wrong
 * language.
 */
export const SECTIONS = {
  de: { home: "/", services: "/leistungen", contact: "/kontakt", projects: "/projekte" },
  en: { home: "/en", services: "/en/services", contact: "/en/hire", projects: "/en/projects" },
  ar: { home: "/ar", services: "/ar/services", contact: "/ar/hire", projects: "/ar/projects" },
};

/** Section paths for a locale, falling back to the default rather than to a
 *  foreign language. */
export const sectionsFor = (locale) => SECTIONS[locale] ?? SECTIONS.de;

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
