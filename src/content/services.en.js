/**
 * The five service areas of the English page.
 *
 * Lifted out of Services.jsx because the English homepage hero now shows the
 * same list. Two hand-maintained copies of one offer is the reliable way to let
 * them drift, and the lint rule against exporting constants from component
 * files says the same thing in its own words.
 *
 * `slug` is the anchor on /en/services. English has one collective page rather
 * than seven individual ones, so each hero row targets its section there instead
 * of pointing seven links at the same URL.
 */
export const SERVICES = [
  {
    title: "Workflow automation",
    slug: "workflow-automation",
    label: "n8n and Zapier",
    text: "Custom workflows with n8n and Zapier that connect your tools, remove repetitive steps and run with monitoring and error handling rather than as a one-off script.",
    features: [
      "Individual n8n workflows, self-hosted or cloud",
      "Zapier automation and migration of existing Zaps to n8n",
      "API connections and webhooks (REST, OAuth2, JWT)",
      "CRM and ATS automation (HubSpot, RecruitCRM, Personio)",
      "Email and notification routing",
      "Data sync between platforms",
      "Monitoring, error handling, rate-limit and retry strategies",
    ],
    result: {
      value: "80 %",
      text: "shorter recruiting cycle times in the processes I automated at TOPEOPLE Group GmbH, my employer.",
    },
  },
  {
    title: "Web development",
    slug: "web-development",
    label: "Full-stack",
    text: "Landing page, dashboard or full web application, built with modern frameworks and deployed so it stays maintainable after handover.",
    features: [
      "React and Angular applications",
      "Spring Boot and Node.js backends",
      "TypeScript and JavaScript",
      "REST API design and implementation",
      "Responsive, mobile-first layouts",
      "E-commerce and booking systems",
      "Docker and cloud deployment",
    ],
  },
  {
    title: "Technical SEO",
    slug: "technical-seo",
    label: "Visibility",
    text: "Technical audits, structured data, page speed and local SEO for the German market, including the AI-assisted workflows that keep it running.",
    features: [
      "Technical audits and fixes",
      "On-page optimisation",
      "Meta tags and structured data (Schema.org)",
      "Page speed and Core Web Vitals",
      "Google Search Console and Analytics setup",
      "AI-supported SEO workflows",
      "Local SEO for German businesses",
    ],
    result: {
      value: "35 %",
      text: "more organic traffic for Phoenix Parkservice, a freelance engagement, through AI-supported SEO workflows.",
    },
  },
  {
    title: "AI and LLM integration",
    slug: "ai-llm-integration",
    label: "Agents and voice",
    text: "GPT and LLM features that take over a step rather than demonstrate one, with clear boundaries, a log and a human at the points that need one.",
    features: [
      "OpenAI, Anthropic Claude and Azure OpenAI integration",
      "RAG systems over your own documents",
      "Voice AI agents (Twilio and WebRTC, speech-to-text, text-to-speech)",
      "Classification, enrichment and text generation inside workflows",
      "GDPR-compliant setups, self-hosted or EU region",
      "Custom API development and webhooks",
    ],
  },
  {
    title: "DevOps and infrastructure",
    slug: "devops-infrastructure",
    label: "Build and run",
    text: "Pipelines and environments that are reproducible, so a deployment is a routine step rather than an event.",
    features: [
      "CI/CD pipelines (GitLab CI, GitHub Actions)",
      "Docker and Kubernetes deployment",
      "Infrastructure as code",
      "Cloud architecture (Azure, AWS)",
      "Monitoring with Prometheus",
      "Security and authentication (OAuth2, JWT)",
    ],
  },
];
