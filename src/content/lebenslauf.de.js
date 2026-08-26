/**
 * Der Lebenslauf als Daten.
 *
 * Quelle ist der LinkedIn-Stand, den der Eigentümer selbst bereinigt hat. Wo er
 * dem älteren Word-Lebenslauf widerspricht, gilt er: die Datierungen von Red
 * Reply, INFOMOTION und Phoenix Parkservice sind daraufhin auch auf /ueber-mich
 * und /en korrigiert worden.
 *
 * Bewusst NICHT enthalten:
 *
 * - Die Straßenanschrift. Sie steht im Impressum, weil das Gesetz sie dort
 *   verlangt, und der Eigentümer hat sie aus seinem Lebenslauf entfernt. Eine
 *   Bewerbung braucht sie nicht, und was einmal auf einer indexierten Seite
 *   stand, holt man nicht zurück.
 * - Die Abiturschule. Schulname plus Abschlussjahr ist ein Standardbaustein von
 *   Sicherheitsfragen. Die Note bleibt, so entschieden.
 *
 * Die Zeiträume überschneiden sich an mehreren Stellen, und das ist richtig so:
 * Die Dolmetschertätigkeit läuft neben der Hauptbeschäftigung, INFOMOTION lief
 * neben dem Studium. Sortiert wird nach Enddatum, laufende Tätigkeiten zuerst.
 */

export const LEBENSLAUF_STAND = "August 2026";

export const KURZPROFIL = [
  "Ich baue Software, die Arbeit abschafft. Bei der TOPEOPLE Group GmbH habe ich eine interne Sales- und Recruiting-Plattform entwickelt, die HubSpot, RecruitCRM und Personio ablöst: 19 Fachbereiche, rund 600 Row-Level-Security-Policies über 438 Tabellen, über 80 geplante Jobs für Datenkonsistenz und knapp 600 automatisierte Tests. Heute arbeiten mehr als 50 Kolleginnen und Kollegen täglich damit.",
  "Parallel automatisiere ich die Prozesse drumherum mit n8n und Zapier, vom Lead-Eingang über die KI-gestützte Qualifizierung per Voice-Agent bis zur fertigen Kandidatenakte. Der Weg vom Lead bis zum qualifizierten Profil ist dadurch rund 80 Prozent kürzer geworden.",
  "Davor die Masterarbeit bei INFOMOTION über ein LLM-basiertes Maven-Plugin, das Unit-Tests automatisch erzeugt. In drei Kundenprojekten stieg die Testabdeckung von durchschnittlich 9 auf 42 Prozent, der manuelle Aufwand sank von 1.440 auf 30 Minuten pro Projekt.",
];

export const KENNZAHLEN = [
  { wert: "80 %", label: "kürzere Durchlaufzeit vom Lead zum qualifizierten Profil" },
  { wert: "50+", label: "tägliche Nutzer der von mir gebauten Plattform" },
  { wert: "9 → 42 %", label: "Testabdeckung durch das Maven-Plugin, mit JaCoCo gemessen" },
  { wert: "3", label: "Sprachen auf Verhandlungsniveau oder darüber" },
];

export const STATIONEN = [
  {
    von: "09/2025",
    bis: "heute",
    rolle: "AI Automation Manager",
    firma: "TOPEOPLE Group GmbH",
    ort: "Frankfurt am Main",
    art: "Festanstellung",
    zusammenfassung:
      "Entwicklung und Betrieb der internen Sales- und Recruiting-Plattform, dazu die Automatisierung der Recruiting-Prozesse.",
    gruppen: [
      {
        titel: "Plattform",
        punkte: [
          "Interne SaaS-Plattform (React 19, TypeScript, Vercel Serverless, Supabase/PostgreSQL), die HubSpot, RecruitCRM und Personio ablöst: 19 Fachbereiche, über 50 tägliche Nutzer, produktiv im Tagesgeschäft",
          "Mandantenfähiges Rollenmodell mit neun Rollen auf Row-Level-Security: rund 600 Policies über 438 Tabellen, dazu Audit-Logging",
          "Über 80 geplante Jobs für Datenkonsistenz: Abgleich gegen Fremdsysteme, SLA-Eskalation, automatisches Zusammenführen von Dubletten",
          "Rund 580 automatisierte Tests (Vitest, Playwright, axe-core) in der CI, Auslieferung über GitLab CI/CD und Vercel",
        ],
      },
      {
        titel: "KI und Automatisierung",
        punkte: [
          "Recruiting- und interne Prozesse mit n8n und Zapier automatisiert, vom Lead-Eingang bis zur fertigen Kandidatenakte; Durchlaufzeit rund 80 Prozent kürzer",
          "Voice-AI-Agent für Erstkontakt und Qualifizierung mit Twilio Voice SDK (WebRTC), Deepgram, ElevenLabs und OpenAI, samt Transkription und Auswertung",
          "Eigener MCP-Server (Model Context Protocol) für kontrollierten KI-Zugriff auf Plattformdaten",
          "Multi-Agent-Workflows für Entwicklung, Datenmigration und Betrieb",
          "LLM-gestützte Dokumentenverarbeitung: Lebenslauf-Import aus PDF und DOCX inklusive OCR, strukturierte Extraktion, automatische Profilerstellung",
          "Kosten- und Latenzoptimierung der Modellaufrufe durch Prompt-Caching, Modellauswahl je Aufgabe und Token-Budgets",
        ],
      },
      {
        titel: "Integrationen und Betrieb",
        punkte: [
          "HubSpot (bidirektionale Synchronisation), RecruitCRM, Personio, Stripe, Slack, Calendly und DocuSeal angebunden",
          "Robuste Webhook-Verarbeitung: Signaturprüfung, Idempotenz, Retry mit Backoff, Rate-Limit-Strategien",
          "Automatisierte Fehler-Triage: Produktionsfehler werden klassifiziert und als Ticket mit Lösungsvorschlag ausgespielt",
          "Datenmigration und Dublettenbereinigung im Bestands-CRM über eigene Python-Pipelines",
          "Onboarding neuer Teammitglieder, Architekturentscheidungen im Team",
        ],
      },
    ],
  },
  {
    von: "09/2022",
    bis: "heute",
    rolle: "Dolmetscher Deutsch–Arabisch",
    firma: "Skalli GmbH",
    ort: "Frankfurt am Main",
    art: "nebenberuflich",
    punkte: [
      "Dolmetschen im medizinischen und behördlichen Umfeld",
      "Übersetzung von Berichten, Schriftstücken und Einverständniserklärungen unter Zeitdruck",
      "Vertrauliche und kultursensible Kommunikation zwischen deutschsprachigem Fachpersonal und arabischsprachigen Klienten",
    ],
  },
  {
    von: "07/2024",
    bis: "09/2025",
    rolle: "Software Engineer und AI-Driven Digital Lead",
    firma: "Phoenix Parkservice",
    ort: "Frankfurt am Main",
    art: "freiberuflich",
    zusammenfassung:
      "Technische Gesamtverantwortung für Website, Kundenportal und die interne Software des Parkservice-Betriebs.",
    punkte: [
      "Buchungs- und Verwaltungssoftware für Kunden und Mitarbeitende entwickelt (Java und Spring Boot im Backend, Angular im Frontend): Buchungen, Stammdatenverwaltung, REST-APIs, Datenbankdesign",
      "Unternehmenswebsite neu aufgebaut und technisch optimiert",
      "KI-gestützte SEO-Automatisierung mit n8n: Content-Erstellung, Keyword-Recherche und Veröffentlichung automatisiert; organischer Traffic 35 Prozent höher innerhalb von drei Monaten, gemessen in der Google Search Console",
      "Google Ads, Analytics und Tag Manager eingerichtet und ausgewertet",
      "Auslieferung und Betrieb mit Docker und CI/CD-Pipelines",
    ],
  },
  {
    von: "02/2022",
    bis: "10/2024",
    rolle: "Masterand und Full-Stack-Entwickler",
    firma: "INFOMOTION GmbH",
    ort: "Frankfurt am Main",
    art: "Werkstudent, mit Vollzeitphasen",
    zusammenfassung:
      "Neben dem Studium, mit Vollzeitphasen während Bachelor- und Masterarbeit sowie in den Semesterferien.",
    punkte: [
      "Masterarbeit: LLM-basiertes Maven-Plugin zur automatischen Generierung von Unit-Tests. Aus drei Kundenprojekten: Testabdeckung im Schnitt von 9 auf 42 Prozent, Anteil fehlerfreier Testklassen von 70 auf 81 Prozent, manueller Aufwand von 1.440 auf 30 Minuten pro Projekt",
      "Bachelorarbeit: Webanwendung mit Angular und Spring Boot, die SAP-BusinessObjects-Dashboards in 3D und Augmented Reality darstellt, inklusive vollständiger DevOps-Pipeline",
      "Feature-Entwicklung in Spring-Boot- und Angular-Kundenprojekten",
      "Betrieb und Auslieferung: Docker, Kubernetes, Helm, GitLab CI/CD",
      "Mitarbeit als IT-Consultant: Anforderungsaufnahme, technische Umsetzung, Projektabstimmung",
    ],
  },
  {
    von: "10/2022",
    bis: "02/2023",
    rolle: "Projektstudent Elastic-Stack",
    firma: "Red Reply",
    ort: "Frankfurt am Main",
    punkte: [
      "Log-Analytics-Dashboard mit Elasticsearch, Logstash und Kibana konzipiert und aufgebaut, für über 25.000 Logeinträge pro Tag aus mehreren Anwendungen",
      "Architektur, Infrastruktur und Projektumfang eigenständig definiert",
      "Datenpipelines entwickelt und Echtzeit-Kennzahlen visualisiert",
      "Ergebnisse vor Mentoren und Hochschulgutachtern präsentiert",
    ],
  },
  {
    von: "05/2021",
    bis: "10/2021",
    rolle: "Praktikant Cryptography Engineering & Solutions",
    firma: "Deutsche Bank",
    ort: "Eschborn",
    punkte: [
      "Mitarbeit am Proof of Concept für einen Signature Validation Service zur automatisierten Prüfung elektronischer Signaturen",
      "Aufbau und Betrieb virtueller Maschinen im Crypto-Lab, Auslieferung und Tests",
      "Abstimmung zwischen Anbieter und Fachbereich zu Testdurchführung und Ergebnisanalyse",
      "Definition von Validierungsregeln und Trust-Lists, Gestaltung der Administrationsoberfläche",
    ],
  },
  {
    von: "11/2020",
    bis: "03/2021",
    rolle: "Tutor Objektorientierte Programmierung (Java)",
    firma: "Frankfurt University of Applied Sciences",
    ort: "Frankfurt am Main",
    punkte: [
      "Wöchentliche Übungen geleitet und über 30 Studierende zu Vererbung, Polymorphie und Entwurfsmustern betreut",
      "Kernkonzepte per Live-Coding vermittelt, dazu Code-Reviews und Debugging-Sitzungen",
      "Prüfungs-Crashkurse erstellt; Durchfallquote gegenüber dem Vorjahr um 20 Prozent gesenkt",
    ],
  },
  {
    von: "04/2018",
    bis: "04/2020",
    rolle: "Rental Sales Agent",
    firma: "Avis Budget Group",
    ort: "Frankfurt Airport",
    punkte: [
      "Kunden ganzheitlich betreut: Buchung, Vertrag, Zahlung, Fahrzeugübergabe",
      "Zusatzversicherungen und Services verkauft, Umsatzziele erreicht",
      "Reklamationen lösungsorientiert bearbeitet, Mietverträge und Bestandsdaten gepflegt",
    ],
  },
  {
    von: "04/2018",
    bis: "11/2018",
    rolle: "1st- und 2nd-Level-Support",
    firma: "Mila",
    ort: "Frankfurt am Main",
    punkte: [
      "Technischer Support per Telefon, E-Mail und Chat für Hardware-, Software- und Netzwerkprobleme",
      "Erstanalyse, Störungsbehebung und Eskalation komplexer Fälle, Tickets sauber dokumentiert",
      "Fernwartung und Software-Aktualisierungen auf Kundensystemen, Wissensdatenbank gepflegt",
    ],
  },
  {
    von: "01/2017",
    bis: "04/2018",
    rolle: "Dolmetscher Deutsch–Englisch–Arabisch",
    firma: "Übersetzung 4U GmbH & Co. KG",
    ort: "Frankfurt am Main",
    punkte: [
      "Dolmetschen vor Ort im medizinischen und behördlichen Umfeld",
      "Übersetzung offizieller Dokumente unter knappen Fristen",
      "Kulturelle Nuancen berücksichtigt, Vertraulichkeit durchgehend gewahrt",
    ],
  },
  {
    von: "02/2014",
    bis: "03/2014",
    rolle: "IT-Support und DV-Controlling",
    firma: "Stadt Frankfurt am Main",
    ort: "Frankfurt am Main",
    punkte: [
      "Hotline- und Vor-Ort-Support bei Drucker- und PC-Problemen",
      "Einblick in Netzwerkaufbau, Server- und Client-Administration, Domänenarchitektur und Gruppenrichtlinien",
      "Installation und Konfiguration von Betriebssystemen inklusive PC-Cloning",
    ],
  },
];

export const AUSBILDUNG = [
  {
    von: "10/2022",
    bis: "06/2024",
    abschluss: "M. Sc. Wirtschaftsinformatik",
    ort: "Frankfurt University of Applied Sciences",
    note: "Abschlussnote 1,4",
  },
  {
    von: "10/2018",
    bis: "08/2022",
    abschluss: "B. Sc. International Business Information Systems",
    ort: "Frankfurt University of Applied Sciences",
    note: "Abschlussnote 1,6",
  },
  {
    // Ohne Schulnamen, siehe Kopf dieser Datei.
    von: "12/2012",
    bis: "06/2017",
    abschluss: "Abitur",
    ort: "Frankfurt am Main",
    note: "Abschlussnote 1,9",
  },
];

export const KENNTNISSE = [
  {
    titel: "Schwerpunkte",
    inhalt: "n8n, KI-Agenten und agentische Systeme, Full-Stack-Entwicklung",
  },
  {
    titel: "KI und LLM",
    inhalt:
      "OpenAI und Anthropic API, Prompt Engineering, RAG, LangChain, eigene MCP-Server, Multi-Agent-Workflows, Kosten- und Latenzoptimierung",
  },
  {
    titel: "Automatisierung",
    inhalt:
      "n8n inklusive Custom-Code-Nodes, Error-Workflows und Self-Hosting, Zapier, Webhooks mit Retry- und Idempotenz-Logik",
  },
  {
    titel: "Frontend",
    inhalt: "React 19, TypeScript, Angular, HTML und CSS",
  },
  {
    titel: "Backend",
    inhalt: "Java, Spring Boot, Node.js, REST, OAuth2 und JWT, Microservices",
  },
  {
    titel: "Daten und Betrieb",
    inhalt:
      "Supabase, PostgreSQL, SQL und NoSQL, Elasticsearch und Kibana, Docker, Kubernetes und Helm, GitLab CI/CD, Vercel, Azure, Monitoring",
  },
  {
    titel: "Voice-AI",
    inhalt:
      "Twilio Voice SDK (WebRTC), Deepgram, ElevenLabs, Transkription und Auswertung von Gesprächen",
  },
  {
    titel: "Integrationen",
    inhalt: "HubSpot, RecruitCRM, Personio, Stripe, Slack, Calendly, DocuSeal",
  },
  {
    titel: "SEO und Analytics",
    inhalt: "Google Ads, Google Analytics, Google Tag Manager, KNIME",
  },
];

export const SPRACHEN = [
  { sprache: "Deutsch", niveau: "Muttersprache" },
  { sprache: "Arabisch", niveau: "Muttersprache" },
  { sprache: "Englisch", niveau: "C1, verhandlungssicher" },
];

export const ZERTIFIKATE = [
  "React.js",
  "Machine Learning Operations (MLOps) für generative KI",
  "SAP BusinessObjects Web Intelligence, Grundlagen",
];
