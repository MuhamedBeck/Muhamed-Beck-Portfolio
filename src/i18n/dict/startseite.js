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
      "Von einzelnen Workflows bis zur durchgängigen Prozesskette.",
    all: "Alle Leistungen ansehen",
  },
  cases: {
    label: "Case Studies",
    /* Keine Anzahl. Sie stand hier als "Zwei", der Abschnitt zeigte drei, und
       das war der dritte Zähler dieser Art im Bestand: Projekte-Hub,
       Routenbeschreibung und diese Überschrift wurden alle beim Anlegen einer
       Fallstudie vergessen. Eine Zahl, die von der Länge eines Arrays abhängt,
       gehört nicht in Prosa. */
    headline: "Kundenprojekte im Detail",
    all: "Alle Projekte ansehen",
  },
  approach: {
    label: "Zusammenarbeit",
    headline: "So läuft ein Projekt ab",
    steps: [
      {
        title: "Erstgespräch",
        text: "Wir schauen uns an, worum es geht, und klären, was sich lohnt und was nicht. Kostenlos und unverbindlich.",
      },
      {
        title: "Konzept",
        text: "Ein Entwurf mit Aufwandsschätzung, bevor Geld fließt. Sie sehen vorher, was gebaut wird und was es kostet.",
      },
      {
        title: "Umsetzung",
        text: "Umsetzung mit Zwischenständen statt einer großen Enthüllung am Ende. Sie sehen den Stand, solange sich noch etwas ändern lässt.",
      },
      {
        title: "Übergabe",
        text: "Dokumentation und Übergabe, auf Wunsch mit laufender Betreuung. Was ich baue, können Sie auch ohne mich betreiben.",
      },
    ],
  },
  faq: {
    label: "Häufige Fragen",
    headline: "Was Auftraggeber am häufigsten fragen",
    all: "Ausführliche Antworten im Ratgeber",
    items: [
      {
        q: "Was kostet ein n8n Freelancer?",
        a: "90 bis 135 € pro Stunde, nach Absprache und je nach Projektumfang. Bei klar umrissenem Umfang auch als Festpreis.",
      },
      {
        q: "Wie lange dauert ein Projekt?",
        a: "Ein einzelner Workflow meist wenige Tage, eine Prozesskette über mehrere Systeme wenige Wochen. Der Zeitrahmen steht vor dem Start fest.",
      },
      {
        q: "n8n, Make oder Zapier: was passt zu meinem Unternehmen?",
        a: "Zapier für einfache Verknüpfungen, Make wenn der visuelle Aufbau zählt, n8n bei komplexer Logik, hohem Volumen oder wenn die Daten das Haus nicht verlassen dürfen. Ich arbeite mit allen dreien.",
      },
      {
        q: "Arbeiten Sie remote oder vor Ort?",
        a: "Beides. Vor Ort im Rhein-Main-Gebiet, remote in ganz Deutschland, Österreich und der Schweiz.",
      },
      {
        q: "Bleiben meine Daten in der EU?",
        a: "Ja, wenn Sie das brauchen. n8n läuft self-hosted oder bei einem EU-Anbieter, KI-Schritte über Modelle mit EU-Region.",
      },
      {
        q: "Übernehmen Sie auch Wartung?",
        a: "Ja, nach Absprache. Workflows brechen, wenn sich APIs oder Prozesse ändern, und werden dann weiterentwickelt statt sich selbst überlassen.",
      },
    ],
  },
  cta: {
    headline: "Welcher Prozess kostet Sie am meisten Zeit?",
    text: "Schreiben Sie mir kurz, worum es geht. Sie bekommen innerhalb von 24 Stunden eine echte Einschätzung, keine Standardantwort.",
    button: "Kostenloses Erstgespräch",
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
        text: "A design with an effort estimate before any money moves. You see what gets built and what it costs, in advance.",
      },
      {
        title: "Build",
        text: "Built in stages you can see, rather than one reveal at the end. You watch it take shape while it can still change.",
      },
      {
        title: "Handover",
        text: "Documentation and handover, with ongoing support on request. What I build, you can also run without me.",
      },
    ],
  },
  faq: {
    label: "FAQ",
    headline: "What clients ask most often",
    all: "Detailed answers on n8n automation",
    items: [
      {
        q: "What does an n8n freelancer cost?",
        a: "90 to 135 € per hour, by agreement and depending on project scope. A fixed price is possible where the scope is clearly drawn.",
      },
      {
        q: "How long does an automation project take?",
        a: "A single workflow is usually a few days, a chain across several systems a few weeks. The timeframe is agreed before anything starts.",
      },
      {
        q: "n8n, Make or Zapier: which fits my company?",
        a: "Zapier for simple connections, Make when the visual layout matters, n8n for complex logic, high volume, or when the data may not leave the building. I work with all three.",
      },
      {
        q: "Do you work remotely or on site?",
        a: "Both. On site in the Rhine-Main area, remote across Germany, Austria and Switzerland.",
      },
      {
        q: "Does my data stay in the EU?",
        a: "Yes, where you need it to. n8n runs self-hosted or with an EU provider, and AI steps can use models in an EU region.",
      },
      {
        q: "Do you also handle maintenance?",
        a: "Yes, by agreement. Workflows break when APIs or processes change, so they get maintained rather than left to themselves.",
      },
    ],
  },
  cta: {
    headline: "Which process costs you the most time?",
    text: "Send me a short note about it. You get a real assessment within 24 hours, not a template reply.",
    button: "Start a project",
  },
};

/* Only the German homepage renders this namespace: Startseite.jsx reads it,
   and the English and Arabic homepages are structurally different pages rather
   than translations of it. Declaring that here stops check-i18n demanding
   translations that nothing would ever display. */
export const SERVES = ["de"];

export default { de, en };
