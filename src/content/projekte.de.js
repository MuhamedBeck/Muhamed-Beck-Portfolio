// German case study content. Facts and metrics come from the owner's CV.

// `kind` separates paid engagements from the two theses. The homepage shows
// only the engagements, because someone evaluating a supplier is asking what
// was delivered for a client; /projekte shows everything.
import maflatsHell from "../assets/projekte/maflats-hell.webp";
import maflatsDunkel from "../assets/projekte/maflats-dunkel.webp";
import maflatsMobil from "../assets/projekte/maflats-mobil.webp";

export const PROJEKTE = [
  {
    path: "/projekte/maflats",
    kind: "mandat",
    title: "Website-Relaunch für MA-Flats",
    subtitle:
      "Neubau von maflats.de: fünf Sprachen, neun Standorte, ohne eine Zeile ausgeliefertes JavaScript",
    role: "Web Development (Freelance), 07/2026 bis 08/2026",
    /* Alle drei Werte am 26.08.2026 an der Live-Seite gemessen, nicht aus dem
       Projekt übernommen. Der LCP-Wert steht bewusst mit seiner Messbedingung
       da: ungedrosselt wären es 132 ms, aber eine Zahl, die ein Kunde nicht
       reproduzieren kann, ist schlimmer als keine. */
    stats: [
      { value: "0", label: "JavaScript-Dateien", note: "ausgeliefert, nicht minimiert" },
      { value: "1,35 s", label: "LCP", note: "Slow 4G, vierfache CPU-Drosselung" },
      { value: "100", label: "Barrierefreiheit", note: "Lighthouse, mobil" },
    ],
    screenshots: [
      {
        src: maflatsHell,
        width: 1600,
        height: 1000,
        alt: "Startseite von maflats.de in der hellen Ansicht, mit Navigation, Überschrift und Apartmentfoto",
        caption: "Startseite, helle Ansicht",
        wide: true,
      },
      {
        src: maflatsDunkel,
        width: 1600,
        height: 1000,
        alt: "Dieselbe Startseite in der dunklen Ansicht",
        caption: "Dieselbe Seite, dunkle Ansicht. Umschaltbar, ohne Aufblitzen beim Laden.",
        wide: true,
      },
      {
        src: maflatsMobil,
        width: 720,
        height: 1559,
        alt: "maflats.de auf dem Smartphone, mit fest stehender Aktionsleiste am unteren Rand",
        caption: "Auf dem Telefon rückt die Kontaktaufnahme an den unteren Rand.",
      },
    ],
    liveUrl: { href: "https://maflats.de/", label: "maflats.de ansehen" },
    ausgangslage:
      "Die bestehende Seite lief auf einem Baukasten und lud auf der Startseite rund 6 MB, davon fast 5 MB Hintergrundbilder. Für eine Vermietung, deren Anfragen überwiegend vom Telefon kommen, ist das die falsche Grundlage: Wer auf dem Bau steht und eine Unterkunft sucht, wartet nicht. Dazu kam die Sprachfrage, denn ein erheblicher Teil der Monteure spricht Polnisch, Slowenisch oder Serbisch.",
    loesung: [
      "Vollständiger Neubau als statisch erzeugte Seite mit Astro und Tailwind. Jede Seite ist fertiges HTML, es läuft kein Framework im Browser mit.",
      "Fünf Sprachen mit typgeprüfter Vollständigkeit: Die deutsche Fassung ist der Vertrag, jedes fehlende Feld in einer Übersetzung bricht den Build statt still deutschen Text auszuliefern.",
      "Neun Standortseiten aus einer Datenquelle, damit eine neue Stadt ein Eintrag ist und keine neue Seite.",
      "Datum der letzten Änderung je Seite aus der Git-Historie statt aus dem Build-Datum: Ein pauschales Datum behauptet bei jedem Deploy, jede Seite habe sich geändert, und entwertet damit das Signal.",
      "Meldung geänderter Seiten an Bing über IndexNow, mit einer Normalisierung, die den gemeinsamen CSS-Hash ausklammert. Ohne sie hätte jeder Deploy alle 86 Seiten als geändert gemeldet statt der tatsächlich geänderten fünf.",
      "Bewegung ausschließlich über CSS, scrollgesteuert, doppelt abgesichert gegen fehlende Browserunterstützung und gegen die Einstellung für reduzierte Bewegung.",
    ],
    ergebnisse: [
      "Keine einzige JavaScript-Datei im Auslieferungsverzeichnis. Alles Interaktive liegt in Schnipseln, die klein genug sind, um im HTML zu stehen",
      "LCP 1,35 Sekunden unter Slow-4G mit vierfacher CPU-Drosselung, CLS 0,00, gemessen am 26.08.2026",
      "Lighthouse mobil: 100 für Barrierefreiheit, 100 für SEO, 96 für Best Practices",
      "HTML der Startseite 17 KB komprimiert, das gesamte CSS 8 KB in einer einzigen Datei",
      "90 indexierbare Adressen mit wechselseitig vollständigem hreflang-Verbund über alle fünf Sprachen",
    ],
    stack: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "Statische Erzeugung",
      "Mehrsprachigkeit",
      "IndexNow",
      "GitHub Actions",
      "IONOS Deploy Now",
    ],
  },
  {
    path: "/projekte/recruiting-automatisierung",
    kind: "mandat",
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
    kind: "mandat",
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
  {
    path: "/projekte/llm-unit-test-automatisierung",
    kind: "abschlussarbeit",
    title: "Unit-Tests automatisch erzeugen mit einem LLM",
    subtitle:
      "Masterarbeit bei der INFOMOTION GmbH: ein Maven-Plugin, das Unit-Tests für Java-Spring-Boot-Projekte schreibt",
    role: "Masterarbeit und Full-Stack Developer, 09/2022 bis 09/2024",
    stats: [
      { value: "+33%", label: "Testabdeckung", note: "mit JaCoCo gemessen" },
      { value: "-95%", label: "Schreibaufwand", note: "gegenüber manueller Entwicklung" },
      { value: "2,13 €", label: "pro Testsuite", note: "statt rund 566 € Entwicklerzeit" },
    ],
    ausgangslage:
      "Unit-Tests für Spring-Boot-Services zu schreiben ist wiederkehrende Arbeit, die Teams aufschieben, weshalb die Abdeckung über die Zeit sinkt. Vorhandene Generatoren erzeugten strukturell gültige, inhaltlich aber leere Tests, und keiner davon griff in den Maven-Build ein, den das Team ohnehin ausführte. Eine Literaturrecherche zu Testwerkzeugen und LLM-Anwendungen in der Softwaretechnik fand keinen Ansatz, der Abdeckungsanalyse, Testerzeugung und Build-Lebenszyklus für Java Spring Boot zusammenbringt.",
    loesung: [
      "Nach Design Science Research gearbeitet, mit Relevanz-, Rigorositäts- und Designzyklus, damit das Artefakt gegen ein benanntes reales Problem entsteht und nicht gegen ein gedachtes.",
      "Prompt-Strategien systematisch entwickelt und verglichen: Zero-Shot, One-Shot und Few-Shot, jeweils daraufhin bewertet, ob kompilierbare und inhaltlich sinnvolle JUnit-5-Tests entstehen.",
      "UTestGenLLM gebaut, ein Maven-Plugin, das sich in konfigurierbare Build-Phasen einhängt, die Klassen des Projekts analysiert und Tests erzeugt, ohne den normalen Build zu verlassen.",
      "JaCoCo eingebunden, damit das Plugin die vorhandene Abdeckung liest, ungetestete Klassen und Methoden erkennt und die Erzeugung nach den tatsächlichen Lücken priorisiert statt blind zu generieren.",
      "Das Modell gegen eine privat in Azure gehostete GPT-Instanz laufen lassen, damit firmeneigener Quellcode keinen öffentlichen Endpunkt erreicht.",
      "Über mehrere Projekte validiert, mit quantitativen Abdeckungskennzahlen und einer Expertenbewertung.",
    ],
    ergebnisse: [
      "Die Testabdeckung stieg über die untersuchten Projekte um 33 Prozent, gemessen mit JaCoCo",
      "Der Schreibaufwand für Tests sank um bis zu 95 Prozent gegenüber manueller Entwicklung",
      "Die Kosten pro erzeugter Testsuite fielen von rund 566 € Entwicklerzeit auf etwa 2,13 € API-Kosten",
      "Prompt Engineering beeinflusst die Qualität erzeugten Fachcodes messbar, nicht nur gefühlt",
      "Ein wiederverwendbarer Rahmen für die Einbindung von LLMs in Entwicklungsprozesse im Unternehmen",
    ],
    stack: [
      "Java",
      "Maven",
      "Spring Boot",
      "JUnit 5",
      "JaCoCo",
      "OpenAI GPT-3.5 und GPT-4",
      "Azure OpenAI",
    ],
  },
  {
    path: "/projekte/ar-datenvisualisierung",
    kind: "abschlussarbeit",
    title: "SAP-BusinessObjects-Berichte in Augmented Reality",
    subtitle:
      "Bachelorarbeit bei der INFOMOTION GmbH, mit einer Befragung von 81 Personen in deutschen Unternehmen",
    role: "Bachelorarbeit, 2018 bis 2022",
    stats: [
      { value: "81", label: "Befragte", note: "in deutschen Unternehmen" },
      { value: "59%", label: "fehlendes Wissen", note: "meistgenannte Hürde" },
      { value: "50+", label: "Bilder pro Sekunde", note: "im Browser gerendert" },
    ],
    ausgangslage:
      "Business-Intelligence-Berichte werden auf flachen Bildschirmen gelesen, was begrenzt, wie viele Dimensionen gleichzeitig darstellbar sind. Augmented Reality war im Unternehmenskontext schon erprobt, aber nicht in Verbindung mit einem Reporting-System, und es gab keine Erhebung dazu, ob Unternehmen so etwas überhaupt einsetzen würden. Offen waren also zwei Fragen: ob browserbasierte AR gegen eine Live-SAP-Quelle technisch trägt, und was Organisationen davon abhält.",
    loesung: [
      "Bestehende AR-Anwendungen im Unternehmenskontext ausgewertet und die Lücke benannt: keine AR-Datenvisualisierung mit Anbindung an SAP BusinessObjects.",
      "81 Personen in deutschen Unternehmen befragt, zu Einführungshürden und dazu, welche Visualisierungsfunktionen nützlich wären.",
      "Eine Systemarchitektur entworfen, die Web-Technologien, AR-Frameworks und eine Unternehmensdatenquelle verbindet.",
      "Frontend mit Angular 14 und TypeScript gebaut, die immersive Ebene mit AR.js, A-Frame und BabiaXR.",
      "Markererzeugung und -erkennung mit ARToolKit umgesetzt, für die räumlich genaue Platzierung der 3D-Diagramme.",
      "Spring-Boot-Backend mit REST-APIs gebaut, das Live-Daten aus SAP BusinessObjects zieht, validiert an der Bibliotheksdatenbank der INFOMOTION mit ihren Ausleihdaten.",
      "Funktionale und nicht-funktionale Anforderungen geprüft, darunter Renderleistung und Ladezeit.",
    ],
    ergebnisse: [
      "Balken-, Kreis- und Mehrfachdiagramme in AR dargestellt, frei drehbar und skalierbar",
      "Die Darstellung hielt über 50 Bilder pro Sekunde, alle Komponenten luden in unter 15 Sekunden",
      "Lief in Chrome und Firefox ohne App-Installation, auf dem Gerät, das ohnehin in der Tasche steckt",
      "Die Befragung benannte die zwei Haupthürden: fehlendes Wissen (59 Prozent) und fehlende Anwendungsfälle (41 Prozent)",
      "Nachgewiesen, dass browserbasierte AR für Unternehmensreporting tragfähig ist, samt Rahmen für spätere Arbeiten",
    ],
    stack: [
      "Angular 14",
      "TypeScript",
      "AR.js",
      "A-Frame",
      "BabiaXR",
      "ARToolKit",
      "Spring Boot",
      "REST-APIs",
      "SAP BusinessObjects",
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
