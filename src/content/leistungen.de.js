// German landing page content (SEO money pages). One entry per route.
// Facts and metrics come from the owner's CV; do not invent numbers.
// The `faq` entries are also emitted as FAQPage JSON-LD by prerender-meta.js.

export const PREIS_TEXT =
  "90 bis 135 € pro Stunde, nach Absprache und je nach Projektumfang. Für klar umrissene Workflows und Integrationen sind auch Festpreise möglich. Orientierung: Der Median für IT-Freelancer liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde.";

export const LEISTUNGEN = [
  {
    path: "/leistungen/n8n-automatisierung",
    badge: "n8n & Zapier Spezialist",
    h1: "n8n Freelancer für Workflow-Automatisierung",
    intro:
      "Ich baue Automatisierungen mit n8n und Zapier, die Ihre Tools verbinden, manuelle Arbeit abschaffen und Prozesse messbar beschleunigen. Als AI Automation Manager automatisiere ich täglich Recruiting- und Vertriebsprozesse in der Praxis, nicht nur in Demos. Sie bekommen Workflows, die produktiv laufen: mit Monitoring, Fehlerbehandlung und sauberer Dokumentation.",
    szenarien: [
      {
        title: "Tools verbinden",
        text: "CRM, ATS, E-Mail, Formulare und interne Systeme tauschen Daten automatisch aus, statt per Copy-and-paste.",
      },
      {
        title: "Prozesse beschleunigen",
        text: "Wiederkehrende Abläufe wie Lead-Routing, Kandidaten-Screening oder Reporting laufen ohne manuelle Zwischenschritte.",
      },
      {
        title: "KI einbinden",
        text: "GPT-Modelle übernehmen Klassifizierung, Anreicherung und Texterstellung direkt im Workflow.",
      },
    ],
    leistungen: [
      "Entwicklung individueller n8n-Workflows (self-hosted oder Cloud)",
      "Zapier-Automatisierungen und Migration bestehender Zaps zu n8n",
      "API-Anbindungen und Webhooks (REST, OAuth2/JWT)",
      "CRM- und ATS-Automatisierung (HubSpot, RecruitCRM, Personio, Greenhouse)",
      "Web-Formulare mit Validierung, Routing und Datenmapping an n8n anbinden",
      "KI-Schritte im Workflow: GPT-Anreicherung, Klassifizierung, Textbausteine",
      "Monitoring, Fehlerbehandlung, Rate-Limit- und Retry-Strategien",
    ],
    ablauf: [
      {
        title: "Analyse",
        text: "Wir schauen uns Ihre Prozesse und Tools an und finden die Abläufe mit dem größten Automatisierungspotenzial.",
      },
      {
        title: "Konzept",
        text: "Sie erhalten einen konkreten Workflow-Entwurf mit Aufwandsschätzung, nach Absprache als Fest- oder Stundenpreis.",
      },
      {
        title: "Umsetzung",
        text: "Ich baue die Workflows, teste sie mit echten Daten und richte Monitoring und Fehlerbehandlung ein.",
      },
      {
        title: "Übergabe & Wartung",
        text: "Dokumentierte Übergabe, auf Wunsch mit laufender Wartung und Weiterentwicklung.",
      },
    ],
    caseStudy: {
      stat: "-80%",
      statLabel: "Durchlaufzeit im Recruiting",
      text: "Bei der TOPEOPLE Group GmbH in Frankfurt habe ich Recruiting- und interne Prozesse mit n8n und Zapier automatisiert. Die Durchlaufzeiten sanken um rund 80 Prozent.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Was kostet eine n8n-Automatisierung?",
        a: "Mein Stundensatz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang. Kleine Workflows sind oft in wenigen Stunden umgesetzt, komplexe Integrationen mit mehreren Systemen kalkuliere ich nach einem kostenlosen Erstgespräch transparent als Fest- oder Stundenpreis.",
      },
      {
        q: "n8n oder Zapier: was passt besser zu meinem Unternehmen?",
        a: "Zapier ist schnell eingerichtet und gut für einfache Standard-Verknüpfungen. n8n kann komplexere Logik, ist bei vielen Ausführungen deutlich günstiger und lässt sich self-hosted betreiben, womit Daten in Ihrer Infrastruktur bleiben. Das ist besonders für DSGVO-sensible Prozesse relevant. Ich arbeite täglich mit beiden und berate Sie ehrlich, welches Tool passt.",
      },
      {
        q: "Wie lange dauert ein typisches Automatisierungsprojekt?",
        a: "Ein einzelner Workflow ist meist innerhalb weniger Tage produktiv. Umfangreichere Automatisierungen mit CRM- oder ATS-Anbindung dauern je nach Umfang wenige Wochen. Den konkreten Zeitrahmen stimmen wir vorab ab.",
      },
      {
        q: "Können Sie bestehende Systeme wie HubSpot oder Personio anbinden?",
        a: "Ja. Ich habe unter anderem HubSpot, RecruitCRM, Personio und Greenhouse über REST-APIs, Webhooks und OAuth2 angebunden, inklusive Rate-Limit- und Retry-Strategien für einen stabilen Datenaustausch.",
      },
      {
        q: "Übernehmen Sie auch Wartung und Weiterentwicklung?",
        a: "Ja, nach Absprache betreue ich Workflows auch nach der Übergabe, überwache sie und entwickle sie weiter, wenn sich Ihre Prozesse ändern.",
      },
      {
        q: "Arbeiten Sie remote oder vor Ort?",
        a: "Beides. Ich sitze in Frankfurt am Main und arbeite im Rhein-Main-Gebiet auch gerne vor Ort, ansonsten remote in ganz Deutschland und international.",
      },
    ],
  },
  {
    path: "/leistungen/ki-automatisierung-frankfurt",
    badge: "KI & LLM Spezialist · Frankfurt",
    h1: "KI-Automatisierung für Unternehmen in Frankfurt",
    intro:
      "Ich entwickle KI-Lösungen, die echte Geschäftsprozesse übernehmen: GPT- und LLM-Integrationen, RAG-Systeme, Voice-AI-Agenten und automatisierte Abläufe. Als AI Automation Manager bei einem Frankfurter Unternehmen habe ich den Automatisierungsgrad der Candidate Operations auf rund 90 Prozent gehoben. Dieselbe Praxis bringe ich in Ihr Projekt, DSGVO-konform und mit sauberen Guardrails.",
    szenarien: [
      {
        title: "LLM-Lösungen mit Substanz",
        text: "GPT-Integrationen mit OpenAI, Azure und Anthropic Claude, die Dokumente verstehen, Daten anreichern und Antworten liefern (RAG, LangChain).",
      },
      {
        title: "Voice-AI am Telefon",
        text: "Sprachagenten auf Basis von Twilio und WebRTC mit Speech-to-Text und Text-to-Speech, zum Beispiel für Support- und Bewerberkommunikation.",
      },
      {
        title: "DSGVO & Guardrails",
        text: "PII-Schutz, Rollen- und Rechtekonzepte, Audit-Logging und Evaluation, damit KI-Lösungen auch in sensiblen Prozessen tragfähig sind.",
      },
    ],
    leistungen: [
      "GPT- und LLM-Integrationen (OpenAI, Azure OpenAI, Anthropic Claude)",
      "RAG-Systeme und LangChain-Pipelines für firmeneigenes Wissen",
      "Voice-AI-Agenten mit Twilio/WebRTC, Speech-to-Text und Text-to-Speech",
      "Prozessautomatisierung mit n8n und Zapier als Rückgrat der KI-Workflows",
      "Prompt Engineering, Evaluation und Qualitätssicherung von LLM-Ausgaben",
      "LLM-Guardrails: PII/DSGVO, RBAC, Audit-Logging",
      "KPI- und ROI-Tracking, damit der Nutzen messbar bleibt",
    ],
    ablauf: [
      {
        title: "Use-Case-Analyse",
        text: "Wir identifizieren die Prozesse, in denen KI wirklich Zeit oder Kosten spart, und priorisieren nach Aufwand und Nutzen.",
      },
      {
        title: "Prototyp",
        text: "Ein funktionierender Prototyp mit Ihren echten Daten zeigt schnell, was die Lösung leistet, bevor Sie groß investieren.",
      },
      {
        title: "Produktivbetrieb",
        text: "Ausbau zum stabilen System mit Guardrails, Monitoring und Evaluation, integriert in Ihre bestehenden Tools.",
      },
      {
        title: "Messen & Skalieren",
        text: "KPI-Tracking zeigt den Effekt in Zahlen. Danach skalieren wir auf weitere Prozesse, nach Absprache und Bedarf.",
      },
    ],
    caseStudy: {
      stat: "~90%",
      statLabel: "Automatisierungsgrad Candidate Operations",
      text: "Mit GPT- und LLM-Lösungen (OpenAI, Azure, RAG, LangChain) habe ich die Candidate Operations eines Frankfurter Personaldienstleisters auf rund 90 Prozent Automatisierungsgrad gebracht, inklusive Voice-AI für die Bewerberkommunikation.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Was kostet KI-Automatisierung?",
        a: "Mein Stundensatz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang. Ein Prototyp für einen klar umrissenen Use Case ist oft überschaubar; den konkreten Rahmen besprechen wir in einem kostenlosen Erstgespräch.",
      },
      {
        q: "Ist der Einsatz von GPT und Co. DSGVO-konform möglich?",
        a: "Ja, mit der richtigen Architektur: Azure OpenAI mit EU-Verarbeitung, PII-Filterung vor dem Modellaufruf, Rollen- und Rechtekonzepte und Audit-Logging. Ich habe solche Guardrails in produktiven Systemen etabliert.",
      },
      {
        q: "Was ist ein RAG-System und wann brauche ich es?",
        a: "RAG (Retrieval-Augmented Generation) verbindet ein Sprachmodell mit Ihrem eigenen Wissen, etwa Dokumenten oder Datenbanken. Das Modell antwortet dann auf Basis Ihrer Inhalte statt aus dem Allgemeinwissen. Sinnvoll ist das überall dort, wo Antworten firmenspezifisch und belegbar sein müssen.",
      },
      {
        q: "Arbeiten Sie nur mit Unternehmen in Frankfurt?",
        a: "Nein. Frankfurt und das Rhein-Main-Gebiet sind mein Standort, vor Ort bin ich dort schnell verfügbar. Remote betreue ich Projekte in ganz Deutschland und international.",
      },
      {
        q: "Wie schnell sehe ich erste Ergebnisse?",
        a: "Mit einem fokussierten Prototyp meist innerhalb weniger Wochen. Ich arbeite iterativ: erst ein Use Case produktiv, dann skalieren.",
      },
      {
        q: "Welche Modelle und Anbieter setzen Sie ein?",
        a: "OpenAI, Azure OpenAI und Anthropic Claude, je nach Anforderung an Datenschutz, Kosten und Qualität. Die Auswahl treffen wir gemeinsam anhand Ihres Use Cases, nach Absprache auch mit anderen Anbietern.",
      },
    ],
  },
  {
    path: "/leistungen/hubspot-integration",
    badge: "HubSpot & CRM Integrationen",
    h1: "HubSpot Integration und CRM-Automatisierung",
    intro:
      "Ich verbinde HubSpot mit Ihren übrigen Systemen: ATS, Recruiting-Tools, interne Datenbanken oder Websites. Leads, Kandidaten und Deals fließen automatisch dorthin, wo sie gebraucht werden, ohne Doppeleingaben und ohne veraltete Datenstände. Aus der Praxis: Ich betreue produktive HubSpot- und RecruitCRM-Integrationen mit API-Management, Workflow-Automatisierung und Daten-Synchronisation.",
    szenarien: [
      {
        title: "Daten-Synchronisation",
        text: "Leads, Kandidaten und Deals werden zwischen HubSpot, ATS und internen Tools automatisch synchron gehalten.",
      },
      {
        title: "Workflow-Automatisierung",
        text: "Follow-ups, Benachrichtigungen und Übergaben zwischen Vertrieb und Recruiting laufen automatisch an.",
      },
      {
        title: "Stabile APIs",
        text: "Saubere REST- und Webhook-Anbindungen mit OAuth2, Rate-Limit- und Retry-Strategien, die auch bei Lastspitzen halten.",
      },
    ],
    leistungen: [
      "HubSpot-Anbindung an ATS- und Recruiting-Systeme (RecruitCRM, Personio, Greenhouse)",
      "Bidirektionale Daten-Synchronisation für Leads, Kandidaten und Deals",
      "REST-API- und Webhook-Integrationen mit OAuth2/JWT",
      "Workflow-Automatisierung in und um HubSpot, auch mit n8n und Zapier",
      "Web-Formulare mit Validierung und Routing direkt in Ihr CRM",
      "Monitoring, Fehlerbehandlung, Rate-Limit- und Retry-Strategien",
      "GPT-Anreicherung von CRM-Daten, zum Beispiel Lead-Qualifizierung",
    ],
    ablauf: [
      {
        title: "System-Analyse",
        text: "Wir klären, welche Systeme welche Daten führen und wo heute manuell übertragen wird.",
      },
      {
        title: "Datenmodell & Mapping",
        text: "Festlegen, welches System die führende Quelle ist und wie Felder gemappt werden. Das verhindert Datenchaos von Anfang an.",
      },
      {
        title: "Integration",
        text: "Umsetzung der Schnittstellen mit Fehlerbehandlung und Monitoring, getestet mit echten Daten.",
      },
      {
        title: "Betrieb & Ausbau",
        text: "Dokumentierte Übergabe, nach Absprache mit Wartung und schrittweisem Ausbau weiterer Automatisierungen.",
      },
    ],
    caseStudy: {
      stat: "24/7",
      statLabel: "automatischer Datenaustausch statt Handarbeit",
      text: "Als AI Automation Manager bei der TOPEOPLE Group GmbH halte ich HubSpot und RecruitCRM permanent synchron: Leads, Kandidaten und Deals fließen automatisch, abgesichert durch Rate-Limit- und Retry-Strategien sowie Monitoring.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Was kostet eine HubSpot-Integration?",
        a: "Mein Stundensatz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang. Eine einzelne Anbindung ist oft in wenigen Tagen umgesetzt; komplexe bidirektionale Synchronisationen kalkuliere ich nach einem kostenlosen Erstgespräch.",
      },
      {
        q: "Welche Systeme haben Sie bereits an HubSpot angebunden?",
        a: "Unter anderem RecruitCRM, Personio und Greenhouse sowie eigene Web-Formulare und interne Tools, jeweils über REST-APIs, Webhooks und OAuth2.",
      },
      {
        q: "Wie stellen Sie sicher, dass keine Daten verloren gehen?",
        a: "Mit klarem Mapping, idempotenten Workflows, Retry-Strategien bei API-Fehlern und Monitoring mit Alerts. Fehlerfälle landen in einer Queue statt im Nirwana.",
      },
      {
        q: "Können Sie auch die HubSpot-Workflows selbst optimieren?",
        a: "Ja. Neben der technischen Integration richte ich auch Workflow-Automatisierung in HubSpot ein, zum Beispiel Lead-Routing, Follow-up-Sequenzen und automatische Übergaben zwischen Teams.",
      },
      {
        q: "Arbeiten Sie remote oder vor Ort?",
        a: "Beides, nach Absprache. Standort Frankfurt am Main, vor Ort im Rhein-Main-Gebiet, remote deutschlandweit und international.",
      },
    ],
  },
];

export function getLeistung(path) {
  const item = LEISTUNGEN.find((l) => l.path === path);
  if (!item) {
    throw new Error(`No Leistung content defined for "${path}"`);
  }
  return item;
}
