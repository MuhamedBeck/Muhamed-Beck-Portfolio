// German homepage sections below the hero.
//
// Shaped for conversion rather than as a portfolio: a German visitor arriving
// from "n8n Experte" wants to know what can be automated, what it costs and
// what it has produced before, not a CV. The English homepage keeps the
// portfolio shape, because its audience is recruiters and remote clients.
//
// Answers open with the answer, in one self-contained sentence. Retrieval
// systems index passages, not pages: a paragraph that only makes sense after
// the two above it cannot be quoted.

const de = {
  services: {
    label: "Leistungen",
    headline: "Was ich für Sie automatisiere",
    intro:
      "Von einzelnen Workflows bis zur durchgängigen Prozesskette. Jede Leistung ist eine eigene Seite mit Ablauf, Beispielen und Preisrahmen.",
    all: "Alle Leistungen ansehen",
  },
  cases: {
    label: "Case Studies",
    headline: "Zwei Projekte im Detail",
    all: "Alle Projekte ansehen",
  },
  approach: {
    label: "Zusammenarbeit",
    headline: "So läuft ein Projekt ab",
    steps: [
      {
        title: "Erstgespräch",
        text: "Wir schauen uns Ihre Prozesse an und klären, wo Automatisierung sich rechnet und wo nicht. Kostenlos und unverbindlich.",
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
        title: "Übergabe",
        text: "Dokumentierte Übergabe, auf Wunsch mit laufender Wartung und Weiterentwicklung.",
      },
    ],
  },
  faq: {
    label: "Häufige Fragen",
    headline: "Was Auftraggeber am häufigsten fragen",
    items: [
      {
        q: "Was kostet ein n8n Freelancer?",
        a: "Mein Stundensatz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang. Zum Vergleich: Der Median für IT-Freelancer in Deutschland lag laut Freelancer-Kompass 2026 bei 95 € pro Stunde. Für klar umrissene Workflows und Integrationen sind auch Festpreise möglich.",
      },
      {
        q: "Wie lange dauert ein Automatisierungsprojekt?",
        a: "Ein einzelner Workflow ist meist innerhalb weniger Tage produktiv. Umfangreichere Automatisierungen mit CRM- oder ATS-Anbindung dauern je nach Umfang wenige Wochen. Den Zeitrahmen stimmen wir vor dem Start ab.",
      },
      {
        q: "n8n, Make oder Zapier: was passt zu meinem Unternehmen?",
        a: "Zapier ist am schnellsten eingerichtet und passt für einfache Standard-Verknüpfungen. n8n kann komplexere Logik, ist bei vielen Ausführungen deutlich günstiger und lässt sich self-hosted betreiben, womit Ihre Daten in Ihrer Infrastruktur bleiben. Das ist bei DSGVO-sensiblen Prozessen der entscheidende Unterschied. Ich arbeite mit allen dreien und sage Ihnen ehrlich, was passt.",
      },
      {
        q: "Arbeiten Sie remote oder vor Ort?",
        a: "Beides. Ich sitze in Frankfurt am Main und komme im Rhein-Main-Gebiet gerne vor Ort. Ansonsten arbeite ich remote in ganz Deutschland, Österreich und der Schweiz.",
      },
      {
        q: "Bleiben meine Daten in der EU?",
        a: "Ja, wenn Sie das brauchen. n8n lässt sich self-hosted auf Ihrer eigenen Infrastruktur oder bei einem EU-Anbieter betreiben, sodass keine Prozessdaten das Unternehmen verlassen. Für KI-Schritte lassen sich EU-gehostete Modelle oder Azure OpenAI mit EU-Region einsetzen.",
      },
      {
        q: "Übernehmen Sie auch Wartung?",
        a: "Ja, nach Absprache. Workflows brechen, wenn sich APIs oder Prozesse ändern. Ich überwache sie und entwickle sie weiter, statt sie nach der Übergabe sich selbst zu überlassen.",
      },
    ],
  },
  cta: {
    headline: "Welcher Prozess kostet Sie am meisten Zeit?",
    text: "Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden eine echte Einschätzung, keine Standardantwort.",
    button: "Projekt anfragen",
  },
};

// The English homepage keeps its portfolio structure, so it uses only the
// shared hero. These keys exist to satisfy the shape check and are unused
// there; they are still written properly in case the English page adopts the
// same sections later.
const en = {
  services: {
    label: "Services",
    headline: "What I automate for you",
    intro:
      "From a single workflow to an end-to-end process chain. Each service has its own page with the process, examples and a price range.",
    all: "See all services",
  },
  cases: {
    label: "Case studies",
    headline: "Two projects in detail",
    all: "See all projects",
  },
  approach: {
    label: "Working together",
    headline: "How a project runs",
    steps: [
      {
        title: "First call",
        text: "We look at your processes and work out where automation pays off and where it does not. Free and without obligation.",
      },
      {
        title: "Proposal",
        text: "You get a concrete workflow design with an effort estimate, as a fixed or hourly price by agreement.",
      },
      {
        title: "Build",
        text: "I build the workflows, test them against real data and set up monitoring and error handling.",
      },
      {
        title: "Handover",
        text: "Documented handover, with ongoing maintenance and development on request.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    headline: "What clients ask most often",
    items: [
      {
        q: "What does an n8n freelancer cost?",
        a: "My rate is 90 to 135 EUR per hour, by agreement and depending on project scope. For context, the median for German IT freelancers was 95 EUR per hour according to Freelancer-Kompass 2026. Fixed prices are possible for clearly scoped workflows and integrations.",
      },
      {
        q: "How long does an automation project take?",
        a: "A single workflow is usually in production within a few days. Larger automations with CRM or ATS integration take a few weeks depending on scope. We agree the timeline before starting.",
      },
      {
        q: "n8n, Make or Zapier: which fits my company?",
        a: "Zapier is the fastest to set up and fits simple standard connections. n8n handles more complex logic, is considerably cheaper at high execution volumes, and can be self-hosted so your data stays in your own infrastructure. For GDPR-sensitive processes that is the deciding difference. I work with all three and will tell you honestly which fits.",
      },
      {
        q: "Do you work remotely or on site?",
        a: "Both. I am based in Frankfurt am Main and am happy to come on site in the Rhine-Main area. Otherwise I work remotely across Germany, Austria and Switzerland.",
      },
      {
        q: "Does my data stay in the EU?",
        a: "Yes, if you need it to. n8n can be self-hosted on your own infrastructure or with an EU provider, so no process data leaves your company. For AI steps, EU-hosted models or Azure OpenAI in an EU region can be used.",
      },
      {
        q: "Do you handle maintenance?",
        a: "Yes, by agreement. Workflows break when APIs or processes change. I monitor them and keep developing them rather than leaving them to themselves after handover.",
      },
    ],
  },
  cta: {
    headline: "Which process costs you the most time?",
    text: "Send me a short note about it. You get a real assessment within 24 hours, not a template reply.",
    button: "Start a project",
  },
};

export default { de, en };
