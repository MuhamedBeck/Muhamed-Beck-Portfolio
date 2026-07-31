// German case study content. Facts and metrics come from the owner's CV.

export const PROJEKTE = [
  {
    path: "/projekte/recruiting-automatisierung",
    title: "Recruiting-Automatisierung mit n8n und GPT",
    subtitle:
      "Sales- und Recruiting-Prozesse der TOPEOPLE Group GmbH, Frankfurt am Main",
    role: "AI Automation Manager, seit 09/2025",
    stats: [
      { value: "-80%", label: "Durchlaufzeit", note: "in Recruiting-Prozessen" },
      { value: "~90%", label: "Automatisierungsgrad", note: "Candidate Operations" },
      { value: "9", label: "Rollen-Modell", note: "Multi-Tenant-SaaS mit RLS" },
    ],
    ausgangslage:
      "Recruiting- und Vertriebsprozesse liefen über mehrere getrennte Systeme: CRM, ATS, E-Mail und interne Tools. Kandidaten- und Lead-Daten wurden manuell übertragen, Durchlaufzeiten waren lang und wertvolle Zeit floss in wiederkehrende Routineaufgaben statt in Gespräche mit Kandidaten und Kunden.",
    loesung: [
      "Recruiting- und interne Prozesse mit n8n und Zapier automatisiert, angebunden über Webhooks und REST-APIs.",
      "GPT- und LLM-Lösungen (OpenAI, Azure, RAG, LangChain) für die Candidate Operations entwickelt: Anreicherung, Klassifizierung und Kommunikation.",
      "Voice-AI-Agenten mit Twilio/WebRTC und Speech-to-Text/Text-to-Speech für die Support- und Bewerberkommunikation umgesetzt.",
      "ATS- und CRM-Integrationen gebaut und ausgerollt (Personio, Greenhouse, HubSpot, RecruitCRM) mit OAuth2/JWT, Monitoring und Fehlerbehandlung.",
      "HubSpot und RecruitCRM dauerhaft synchronisiert: Leads, Kandidaten und Deals, abgesichert durch Rate-Limit- und Retry-Strategien.",
      "Eine interne Sales- und Recruiting-Plattform als SaaS (PWA) end-to-end gebaut: React 19, Supabase, Vercel und Twilio, multi-tenant mit Row Level Security und einem 9-Rollen-Modell.",
      "LLM-Guardrails etabliert: PII/DSGVO-Schutz, RBAC, Audit-Logging und Evaluation, dazu KPI- und ROI-Tracking (Time-to-Hire, SLA).",
    ],
    ergebnisse: [
      "Durchlaufzeiten in den automatisierten Prozessen um rund 80 Prozent reduziert",
      "Automatisierungsgrad der Candidate Operations auf rund 90 Prozent erhöht",
      "Bewerber- und Supportkommunikation durch Voice-AI-Agenten entlastet, mit verbesserter Zufriedenheit",
      "Stabiler Datenaustausch zwischen allen Systemen ohne manuelle Doppeleingaben",
      "Messbarer Nutzen durch KPI- und ROI-Tracking statt Bauchgefühl",
    ],
    stack: [
      "n8n",
      "Zapier",
      "OpenAI",
      "Azure OpenAI",
      "LangChain",
      "React 19",
      "Supabase",
      "Twilio",
      "HubSpot",
      "RecruitCRM",
      "Personio",
      "Greenhouse",
      "GitLab CI/CD",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    path: "/projekte/phoenix-parkservice",
    title: "Microservices-Plattform und KI-SEO für Phoenix Parkservice",
    subtitle: "Buchungsplattform und digitale Sichtbarkeit für einen Parkservice-Anbieter",
    role: "Full-Stack Developer & AI Integration Lead (Freelance), 06/2024 bis 09/2025",
    stats: [
      { value: "+35%", label: "Organischer Traffic", note: "durch KI-SEO-Workflows" },
      { value: "15", label: "Monate", note: "leitende Entwicklung" },
      { value: "IaC", label: "Infrastruktur", note: "automatisiert mit CI/CD" },
    ],
    ausgangslage:
      "Phoenix Parkservice brauchte eine tragfähige technische Plattform und mehr digitale Sichtbarkeit: Buchungen und Abläufe sollten über eine moderne Web-Plattform laufen, gleichzeitig sollten mehr Kunden das Angebot über Google finden.",
    loesung: [
      "Leitende Entwicklung einer Microservices-basierten Plattform mit Spring Boot im Backend und Angular im Frontend.",
      "DevOps-Verantwortung: Docker- und Kubernetes-Deployments, CI/CD-Pipelines und Monitoring-Lösungen.",
      "Infrastruktur-Automatisierung mit Infrastructure as Code, damit Umgebungen reproduzierbar und wartbar bleiben.",
      "KI-basierte SEO-Workflows implementiert: automatisierte technische Optimierung und Content-Unterstützung für bessere Rankings.",
    ],
    ergebnisse: [
      "Organischer Traffic um 35 Prozent gesteigert",
      "Stabile, skalierbare Microservices-Plattform in leitender Verantwortung aufgebaut",
      "Deployments und Infrastruktur automatisiert, von Hand gepflegte Server abgelöst",
      "SEO-Arbeit durch KI-Workflows systematisiert statt punktuell betrieben",
    ],
    stack: [
      "Spring Boot",
      "Angular",
      "Java",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "IaC",
      "Monitoring",
      "KI-SEO-Workflows",
    ],
  },
];

export function getProjekt(path) {
  const item = PROJEKTE.find((p) => p.path === path);
  if (!item) {
    throw new Error(`No Projekt content defined for "${path}"`);
  }
  return item;
}
