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

/* Oktober 2026: Die Angaben zur TOPEOPLE-Plattform am 28.10.2026 gegen das
   Repository geprüft. Sie ist JavaScript (JSX), nicht TypeScript, liegt auf
   GitHub, nicht GitLab, und hat inzwischen 17 Rollen statt neun. Die Tests
   laufen nicht bei jedem Push in einer CI, deshalb steht dort keine CI mehr.
   Die frühere Angabe von 80 % kürzerer Durchlaufzeit hatte keine Messung
   dahinter und ist ersetzt. Der Voice-AI-Punkt ist auf die zwei Teile
   aufgeteilt, die nachweislich seine sind: die KI-Telefonvorqualifizierung
   in n8n und die Telefonie im Browser. */
export const LEBENSLAUF_STAND = "Oktober 2026";

export const KURZPROFIL = [
  "Ich baue Software, die Arbeit abschafft. Bei der TOPEOPLE Group GmbH leite ich seit März 2026 die Entwicklung einer internen Sales- und Recruiting-Plattform, die HubSpot bereits abgelöst hat und als Nächstes RecruitCRM und Personio ablösen soll: 19 Fachbereiche, 17 Rollen auf Row-Level-Security, über 90 geplante Jobs für Datenkonsistenz und automatisierte Tests mit Vitest und Playwright. Heute arbeiten 54 Kolleginnen und Kollegen damit.",
  "Parallel automatisiere ich die Prozesse drumherum mit n8n und Zapier, vom Bewerbungseingang über die telefonische Vorqualifizierung durch eine KI-Assistentin bis zur Vorstellung beim Kunden. Neue Kandidaten bekommen ihren ersten Anruf jetzt wenige Minuten nach dem Eingang statt am selben Tag, und rund 1.900 dieser Anrufe im Monat wertet GPT automatisch aus.",
  "Davor die Masterarbeit bei INFOMOTION über ein LLM-basiertes Maven-Plugin, das Unit-Tests automatisch erzeugt. In drei Kundenprojekten stieg die Testabdeckung von durchschnittlich 9 auf 42 Prozent, der manuelle Aufwand sank von 1.440 auf 30 Minuten pro Projekt.",
];

export const KENNZAHLEN = [
  { wert: "1.900", label: "KI-Anrufe im Monat, automatisch ausgewertet" },
  { wert: "54", label: "Nutzer der Plattform, deren Entwicklung ich leite" },
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
      "Lead-Entwickler der internen Sales- und Recruiting-Plattform seit 03/2026, dazu die Automatisierung der Recruiting-Prozesse.",
    gruppen: [
      {
        titel: "Plattform",
        punkte: [
          "Interne SaaS-Plattform (React 19, JavaScript, Vercel Serverless, Supabase/PostgreSQL) für Vertrieb, Account Management und Recruiting: HubSpot abgelöst und gekündigt, RecruitCRM und Personio als nächste Schritte geplant; 19 Fachbereiche, 54 Nutzer, produktiv im Tagesgeschäft",
          "Mandantenfähiges Rollenmodell mit 17 Rollen auf Row-Level-Security, dazu Audit-Logging",
          "Über 90 geplante Jobs für Datenkonsistenz: Abgleich gegen Fremdsysteme, SLA-Eskalation, automatisches Zusammenführen von Dubletten",
          "Telefonie im Browser mit Twilio Voice SDK (WebRTC) und Live-Transkription über Deepgram; rund 10.000 Anrufe im Monat werden automatisch im ATS protokolliert",
          "Automatisierte Tests mit Vitest und Playwright, darunter über 200 End-to-End-Tests und Prüfungen auf Barrierefreiheit mit axe-core; Auslieferung über GitHub und Vercel",
        ],
      },
      {
        titel: "KI und Automatisierung",
        punkte: [
          "Recruiting-Prozesse mit n8n und Zapier automatisiert, vom Bewerbungseingang bis zur Vorstellung beim Kunden: über 60 aktive Workflows mit über 40.000 Ausführungen im Monat",
          "KI-Telefonvorqualifizierung neuer Bewerber mit Twilio, ElevenLabs und OpenAI: erster Anruf wenige Minuten nach dem Eingang, rund 1.900 automatisch ausgewertete Anrufe im Monat",
          "Vorstellungsmails an Kunden mit GPT, rund 300 im Monat, als Entwurf in Outlook, verschickt erst nach Freigabe durch den Recruiter",
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

/* Kenntnisse in zwei Schichten, seit dem 29.10.2026: oben die Werkzeuge mit
   ihrem Zeichen, damit man auf einen Blick sieht, womit gearbeitet wird, darunter
   die Methoden und Details, für die es kein Zeichen gibt. Ein Werkzeug ist ein
   Schlüssel in MARKEN (src/components/icons/marken.js), dort stehen Name und
   Zeichen; `{ marke, name }` überschreibt den Namen, wo der Lebenslauf mehr sagt
   als der Markenname. Jedes Werkzeug steht genau einmal, oben oder im Text. */
export const KENNTNISSE = [
  {
    titel: "Schwerpunkte",
    inhalt: "n8n, KI-Agenten und agentische Systeme, Full-Stack-Entwicklung",
  },
  {
    titel: "KI und LLM",
    werkzeuge: [
      { marke: "openai", name: "OpenAI API" },
      { marke: "anthropic", name: "Anthropic API" },
      "langchain",
      "mcp",
    ],
    inhalt:
      "Prompt Engineering, RAG, eigene MCP-Server, Multi-Agent-Workflows, Kosten- und Latenzoptimierung",
  },
  {
    titel: "Automatisierung",
    werkzeuge: ["n8n", "zapier"],
    inhalt:
      "Custom-Code-Nodes, Error-Workflows und Self-Hosting in n8n, Webhooks mit Retry- und Idempotenz-Logik",
  },
  {
    titel: "Frontend",
    werkzeuge: [{ marke: "react", name: "React 19" }, "typescript", "angular", "html", "css"],
  },
  {
    titel: "Backend",
    werkzeuge: ["java", "springboot", "nodejs"],
    inhalt: "REST, OAuth2 und JWT, Microservices",
  },
  {
    titel: "Daten und Betrieb",
    werkzeuge: [
      "supabase",
      "postgresql",
      "elasticsearch",
      "kibana",
      "docker",
      "kubernetes",
      "helm",
      { marke: "gitlab", name: "GitLab CI/CD" },
      "vercel",
      "azure",
    ],
    inhalt: "SQL und NoSQL, Monitoring",
  },
  {
    titel: "Voice-AI",
    werkzeuge: [{ marke: "twilio", name: "Twilio Voice SDK" }, "deepgram", "elevenlabs"],
    inhalt: "Telefonie im Browser über WebRTC, Transkription und Auswertung von Gesprächen",
  },
  {
    titel: "Integrationen",
    werkzeuge: ["hubspot", "recruitcrm", "personio", "stripe", "slack", "calendly", "docuseal"],
  },
  {
    titel: "SEO und Analytics",
    werkzeuge: ["googleads", "googleanalytics", "googletagmanager", "knime"],
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

/* Der Werdegang als Zeitachse (Werdegang.jsx), auf /lebenslauf und
   /ueber-mich. Aus STATIONEN und AUSBILDUNG abgeleitet statt danebengeschrieben,
   damit kein Datum zweimal gepflegt wird; nur die Einordnung kommt dazu. Die
   frühesten Nebenjobs vor 2018 und das Abitur fehlen bewusst: Sie würden die
   Achse um Jahre strecken, ohne etwas über die Arbeit von heute zu sagen. */
const ART_DER_STATION = {
  "TOPEOPLE Group GmbH": "anstellung",
  "Phoenix Parkservice": "freiberuflich",
  "INFOMOTION GmbH": "studentisch",
  "Red Reply": "studentisch",
  "Deutsche Bank": "studentisch",
  "Frankfurt University of Applied Sciences": "studentisch",
  "Skalli GmbH": "nebenher",
  "Avis Budget Group": "nebenher",
};

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const [standMonat, standJahr] = LEBENSLAUF_STAND.split(" ");

/* "heute" in der Zeitachse ist der Monat dieses Stands, nicht das Tagesdatum. */
export const WERDEGANG_STAND = { monat: MONATE.indexOf(standMonat) + 1, jahr: Number(standJahr) };

const beginn = (eintrag) => {
  const [monat, jahr] = eintrag.von.split("/").map(Number);
  return jahr * 12 + monat;
};

export const WERDEGANG = [
  ...STATIONEN.filter((station) => ART_DER_STATION[station.firma]).map((station) => ({
    ort: station.firma,
    label: station.rolle,
    von: station.von,
    bis: station.bis,
    kategorie: ART_DER_STATION[station.firma],
  })),
  ...AUSBILDUNG.filter((eintrag) => eintrag.abschluss !== "Abitur").map((eintrag) => ({
    ort: eintrag.abschluss,
    label: eintrag.ort,
    von: eintrag.von,
    bis: eintrag.bis,
    kategorie: "studium",
  })),
].sort((a, b) => beginn(b) - beginn(a));
