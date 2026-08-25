// German landing page content (SEO money pages). One entry per route.
// Facts and metrics come from the owner's CV; do not invent numbers.
// The `faq` entries are also emitted as FAQPage JSON-LD by prerender-meta.js.

export const PREIS_TEXT =
  "90 bis 135 € pro Stunde, nach Absprache und je nach Projektumfang. Für klar umrissene Workflows und Integrationen sind auch Festpreise möglich. Orientierung: Der Median für IT-Freelancer liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde.";

export const LEISTUNGEN = [
  {
    path: "/leistungen/n8n-automatisierung",
    // Every stage below restates something the leistungen array on this same
    // entry already promises, so the diagram and the copy cannot drift apart.
    flow: {
      caption: "So läuft die Automatisierung",
      stages: [
        { kind: "Auslöser", title: "Etwas passiert",
          text: "Webhook, Web-Formular, neue E-Mail oder ein Zeitplan startet den Workflow." },
        { kind: "Schritt", title: "Daten prüfen und mappen",
          text: "Validierung, Feld-Mapping und Routing, damit im Zielsystem nichts Halbes ankommt." },
        { kind: "Schritt", title: "KI, wo sie trägt",
          text: "GPT-Anreicherung, Klassifizierung oder Textbausteine, als Schritt im Workflow." },
        { kind: "Ziel", title: "Daten landen richtig",
          text: "CRM, ATS, E-Mail und interne Tools, über REST und Webhooks mit OAuth2 oder JWT." },
      ],
      alongside: "Monitoring, Fehlerbehandlung sowie Rate-Limit- und Retry-Strategien. Ein Workflow, der nachts still ausfällt, ist keiner.",
    },
    badge: "n8n & Zapier Spezialist",
    teaser:
      "Workflows, die CRM, ATS, E-Mail und interne Tools verbinden, mit Monitoring und Fehlerbehandlung statt Bastellösung.",
    h1: "n8n Freelancer für Workflow-Automatisierung",
    intro:
      "Ich baue Automatisierungen mit n8n und Zapier, die Ihre Tools verbinden, manuelle Arbeit abschaffen und Prozesse messbar beschleunigen. Als AI Automation Manager und n8n Experte automatisiere ich täglich Recruiting- und Vertriebsprozesse in der Praxis, nicht nur in Demos. Sie bekommen Workflows, die produktiv laufen: mit Monitoring, Fehlerbehandlung und sauberer Dokumentation.",
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
      text: "Bei der TOPEOPLE Group GmbH in Frankfurt, meinem Arbeitgeber, habe ich Recruiting- und interne Prozesse mit n8n und Zapier automatisiert. Die Durchlaufzeiten sanken um rund 80 Prozent.",
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
        a: "Beides. Ich sitze in Frankfurt am Main und arbeite im Rhein-Main-Gebiet auch gerne vor Ort, ansonsten remote in ganz Deutschland, Österreich und der Schweiz.",
      },
      {
        q: "Arbeiten Sie auch für Unternehmen in Österreich und der Schweiz?",
        a: "Ja. Automatisierungsprojekte laufen ohnehin fast vollständig remote: Abstimmung per Video, Zugriff auf die Systeme über die üblichen Freigaben, Übergabe dokumentiert. Mein Standort ist Frankfurt am Main, die Zeitzone ist dieselbe, und Anfragen beantworte ich innerhalb von 24 Stunden. Vor Ort komme ich im Rhein-Main-Gebiet, für Termine in Wien oder Zürich klären wir Aufwand und Reise vorher.",
      },
      {
        q: "Bleiben unsere Prozessdaten in der EU?",
        a: "Ja, wenn Sie das brauchen. n8n lässt sich self-hosted auf Ihrer eigenen Infrastruktur oder bei einem Anbieter mit Rechenzentrum in Deutschland oder der EU betreiben, sodass keine Prozessdaten das Unternehmen verlassen. Für KI-Schritte lassen sich Modelle mit EU-Verarbeitung einsetzen, etwa Azure OpenAI mit EU-Region, mit PII-Filterung vor dem Modellaufruf. Wo KI-Systeme direkt mit Menschen sprechen, gilt seit August 2026 die Transparenzpflicht aus Artikel 50 des EU AI Act, in Deutschland und Österreich gleichermaßen.",
      },
    ],
  },
  {
    path: "/leistungen/ki-automatisierung-frankfurt",
    flow: {
      caption: "So läuft eine KI-Automatisierung",
      stages: [
        { kind: "Auslöser", title: "Eine Anfrage kommt an",
          text: "Aus einem Formular, einem Anruf oder einem System, das eine Entscheidung braucht." },
        { kind: "Schritt", title: "Kontext aus Ihren Inhalten",
          text: "RAG und LangChain holen die Passagen, auf die sich die Antwort stützen soll." },
        { kind: "Schritt", title: "Modell und Prüfung",
          text: "OpenAI, Azure OpenAI oder Claude erzeugen die Ausgabe, Guardrails prüfen sie." },
        { kind: "Ziel", title: "Ergebnis im System",
          text: "Antwort, CRM-Eintrag oder Ticket, n8n als Rückgrat dahinter." },
      ],
      alongside: "PII- und DSGVO-Schutz, RBAC, Audit-Logging und Evaluation gegen einen festen Testsatz. Dazu KPI- und ROI-Tracking, damit der Nutzen messbar bleibt.",
    },
    badge: "KI & LLM Spezialist · Frankfurt",
    teaser:
      "GPT- und LLM-Lösungen, RAG-Systeme und Voice-AI, die Prozesse übernehmen statt nur zu demonstrieren. DSGVO-konform aufgesetzt.",
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
    flow: {
      caption: "So läuft die Synchronisation",
      stages: [
        { kind: "Auslöser", title: "Ein Datensatz ändert sich",
          text: "In HubSpot oder im ATS, gemeldet per Webhook statt per nächtlichem Export." },
        { kind: "Schritt", title: "Abgleich und Dublettenprüfung",
          text: "Feld-Mapping und Datenqualitätsregeln, bevor irgendetwas geschrieben wird." },
        { kind: "Schritt", title: "Anreicherung",
          text: "GPT qualifiziert Leads oder ergänzt fehlende Felder, wo es den Vertrieb entlastet." },
        { kind: "Ziel", title: "Beide Seiten aktuell",
          text: "HubSpot, RecruitCRM, Personio und Greenhouse bidirektional, ohne Doppeleingabe." },
      ],
      alongside: "OAuth2 und JWT für die Authentifizierung, dazu Rate-Limit- und Retry-Strategien mit Monitoring. APIs antworten nicht immer, und genau dann entscheidet sich, ob Daten verloren gehen.",
    },
    badge: "HubSpot & CRM Integrationen",
    teaser:
      "HubSpot, RecruitCRM, Personio und Greenhouse sauber angebunden: REST, Webhooks, OAuth2, Rate-Limit- und Retry-Strategien.",
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
  {
    path: "/leistungen/recruiting-automatisierung",
    flow: {
      caption: "So läuft eine Bewerbung durch",
      stages: [
        { kind: "Auslöser", title: "Bewerbung geht ein",
          text: "Über Web-Formular, Jobbörse oder E-Mail, in jedem Fall an derselben Stelle." },
        { kind: "Schritt", title: "Parsen und anreichern",
          text: "Lebenslauf-Parsing mit GPT, Dublettenprüfung und Datenqualitätsregeln im ATS." },
        { kind: "Schritt", title: "Vorqualifizieren und terminieren",
          text: "Screening nach Ihren Kriterien, Kalenderanbindung, Erinnerungen und Nachfassen." },
        { kind: "Ziel", title: "Status gepflegt",
          text: "RecruitCRM, Personio, Greenhouse oder HubSpot, mit Reporting über den ganzen Funnel." },
      ],
      alongside: "Ein DSGVO-Konzept für Bewerberdaten mit Löschfristen, Rollen und Audit-Logging. Bewerberdaten sind der Fall, in dem Datenschutz nicht verhandelbar ist.",
    },
    badge: "Recruiting & ATS Automatisierung",
    teaser:
      "Bewerbungseingang, Screening, Terminierung und Statuspflege automatisiert. Der Bereich, in dem ich täglich arbeite.",
    h1: "Recruiting-Automatisierung mit n8n und ATS-Anbindung",
    intro:
      "Recruiting ist der Prozess, in dem ich täglich automatisiere. Als AI Automation Manager habe ich Durchlaufzeiten um rund 80 Prozent gesenkt und die Candidate Operations auf etwa 90 Prozent Automatisierungsgrad gebracht. Bewerbungseingang, Vorqualifizierung, Terminierung und Statuspflege laufen dabei ohne manuelle Zwischenschritte, angebunden an RecruitCRM, Personio, Greenhouse oder HubSpot.",
    szenarien: [
      {
        title: "Bewerbungen ohne Copy-and-paste",
        text: "Eingehende Bewerbungen landen automatisch im ATS, mit geparsten Lebenslaufdaten, Dublettenprüfung und passender Zuordnung zur Vakanz.",
      },
      {
        title: "Vorqualifizierung mit GPT",
        text: "Profile werden gegen die Anforderungen geprüft, angereichert und mit einer nachvollziehbaren Begründung eingestuft, statt nur nach Stichworten gefiltert.",
      },
      {
        title: "Kommunikation, die nicht liegen bleibt",
        text: "Eingangsbestätigungen, Terminvorschläge, Erinnerungen und Absagen laufen automatisch und im richtigen Ton, inklusive Voice-AI für Rückrufe.",
      },
    ],
    leistungen: [
      "Anbindung von RecruitCRM, Personio, Greenhouse und HubSpot über REST und Webhooks",
      "Lebenslauf-Parsing und Datenanreicherung mit GPT-Modellen",
      "Automatische Dublettenprüfung und Datenqualitätsregeln im ATS",
      "Terminierung mit Kalenderanbindung, Erinnerungen und Nachfassen",
      "Statuspflege und Reporting über den gesamten Funnel",
      "Voice-AI-Agenten für Erstkontakt und Rückfragen (Twilio, STT/TTS)",
      "DSGVO-Konzept für Bewerberdaten: Löschfristen, Rollen, Audit-Logging",
    ],
    ablauf: [
      {
        title: "Funnel aufnehmen",
        text: "Wir gehen Ihren Recruiting-Prozess Schritt für Schritt durch und markieren, wo Zeit verloren geht und wo Daten doppelt erfasst werden.",
      },
      {
        title: "Priorisieren",
        text: "Der Schritt mit dem größten Zeitverlust kommt zuerst. Sie bekommen eine Aufwandsschätzung, bevor gebaut wird.",
      },
      {
        title: "Umsetzen",
        text: "Aufbau in n8n mit Anbindung an Ihr ATS, getestet mit echten Bewerbungen und abgesichert gegen API-Ausfälle.",
      },
      {
        title: "Ausrollen",
        text: "Übergabe an Ihr Team mit Dokumentation, danach schrittweise Erweiterung auf die nächsten Prozessschritte.",
      },
    ],
    caseStudy: {
      stat: "80 %",
      statLabel: "kürzere Durchlaufzeiten im Recruiting",
      text: "Bei der TOPEOPLE Group GmbH in Frankfurt, meinem Arbeitgeber, habe ich Recruiting- und Vertriebsprozesse mit n8n, Zapier und GPT automatisiert. Die Durchlaufzeiten in den automatisierten Prozessen sanken um rund 80 Prozent.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Welche ATS- und CRM-Systeme können Sie anbinden?",
        a: "Produktiv angebunden habe ich RecruitCRM, Personio, Greenhouse und HubSpot. Grundsätzlich lässt sich jedes System mit einer REST-API oder Webhooks anbinden. Wenn eine API fehlt, prüfen wir vorab, ob ein Export- oder E-Mail-basierter Weg tragfähig ist.",
      },
      {
        q: "Was passiert mit Bewerberdaten im Sinne der DSGVO?",
        a: "Bewerberdaten sind besonders sensibel. n8n lässt sich self-hosted betreiben, sodass die Daten Ihre Infrastruktur nicht verlassen. Dazu kommen Löschfristen, ein Rollen- und Rechtekonzept und Audit-Logging. Für KI-Schritte lässt sich Azure OpenAI mit EU-Verarbeitung einsetzen, mit PII-Filterung vor dem Modellaufruf.",
      },
      {
        q: "Ersetzt die Automatisierung meine Recruiter?",
        a: "Nein, und das ist auch nicht das Ziel. Automatisiert werden die Schritte ohne Urteilsanteil: Daten erfassen, Dubletten prüfen, Termine koordinieren, Status pflegen. Die Entscheidung über Kandidaten bleibt beim Menschen. Der Gewinn ist, dass Recruiter wieder Zeit für Gespräche haben.",
      },
      {
        q: "Was kostet Recruiting-Automatisierung?",
        a: "Mein Stundensatz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang. Ein einzelner Workflow, etwa der automatisierte Bewerbungseingang, ist meist in wenigen Tagen produktiv. Eine durchgängige Kette über den ganzen Funnel dauert je nach Systemlandschaft einige Wochen.",
      },
      {
        q: "Wie messe ich, ob sich das gelohnt hat?",
        a: "Vor dem Start halten wir fest, wie lange die betroffenen Schritte heute dauern und wie oft sie anfallen. Nach dem Rollout stehen dieselben Kennzahlen im Reporting. Ohne diese Ausgangsmessung ist jede Prozentzahl hinterher wertlos.",
      },
    ],
  },
  {
    path: "/leistungen/voice-ai-agenten",
    flow: {
      caption: "So läuft ein Anruf",
      stages: [
        { kind: "Auslöser", title: "Das Telefon klingelt",
          text: "Twilio oder WebRTC nimmt an, auch außerhalb der Bürozeiten." },
        { kind: "Schritt", title: "Zuhören und verstehen",
          text: "Speech-to-Text, dann die Antwort aus Ihren eigenen Inhalten per RAG." },
        { kind: "Schritt", title: "Antworten oder übergeben",
          text: "Text-to-Speech mit natürlicher deutscher Aussprache, mit klaren Übergabepunkten an Menschen." },
        { kind: "Ziel", title: "Gespräch dokumentiert",
          text: "CRM, ATS oder Ticketsystem, damit kein Anruf unprotokolliert bleibt." },
      ],
      alongside: "Ein Transparenzhinweis zu Gesprächsbeginn nach EU AI Act Artikel 50, dazu Auswertung der Gesprächsverläufe zur laufenden Verbesserung.",
    },
    badge: "Voice-AI & Telefonassistenten",
    teaser:
      "Sprachagenten, die Anrufe annehmen, qualifizieren und ins CRM schreiben. Mit Twilio, Speech-to-Text und Text-to-Speech.",
    h1: "Voice-AI-Agenten für Telefon und Support",
    intro:
      "Ein KI-Telefonassistent nimmt Anrufe an, versteht das Anliegen, beantwortet wiederkehrende Fragen und übergibt an einen Menschen, sobald es nötig wird. Ich habe solche Agenten für Support- und Bewerberkommunikation produktiv gebaut, auf Basis von Twilio und WebRTC mit Speech-to-Text und Text-to-Speech. Der Anspruch dabei ist nicht, den Menschen zu imitieren, sondern die Anrufe abzufangen, die sonst niemand annimmt.",
    szenarien: [
      {
        title: "Anrufe außerhalb der Bürozeiten",
        text: "Der Agent nimmt an, erfasst Anliegen und Kontaktdaten strukturiert und legt daraus direkt einen Vorgang im CRM an.",
      },
      {
        title: "Wiederkehrende Fragen",
        text: "Öffnungszeiten, Status einer Bewerbung, Terminverschiebung: Fragen mit klarer Antwort beantwortet der Agent selbst, auf Basis Ihrer eigenen Inhalte.",
      },
      {
        title: "Saubere Übergabe",
        text: "Sobald das Anliegen unklar oder heikel wird, übergibt der Agent an einen Mitarbeiter, mit Gesprächsnotiz statt bei null.",
      },
    ],
    leistungen: [
      "Telefonie-Anbindung über Twilio und WebRTC",
      "Speech-to-Text und Text-to-Speech mit natürlicher deutscher Aussprache",
      "Gesprächslogik mit klaren Übergabepunkten an Menschen",
      "Anbindung an CRM, ATS und Ticketsystem, damit jedes Gespräch dokumentiert ist",
      "Wissensanbindung per RAG, damit Antworten aus Ihren Inhalten stammen",
      "Transparenzhinweis zu Beginn des Gesprächs (EU AI Act, Artikel 50)",
      "Auswertung der Gesprächsverläufe zur laufenden Verbesserung",
    ],
    ablauf: [
      {
        title: "Anrufgründe sortieren",
        text: "Wir schauen an, weswegen tatsächlich angerufen wird, und trennen die Fälle mit klarer Antwort von denen mit Gesprächsbedarf.",
      },
      {
        title: "Erster Anwendungsfall",
        text: "Ein einzelner, eng umrissener Anrufgrund geht zuerst live. Das zeigt schnell und günstig, ob die Qualität trägt.",
      },
      {
        title: "Integration",
        text: "Anbindung an Ihre Systeme, damit aus jedem Gespräch ein sauberer Datensatz wird statt einer Notiz im Nirgendwo.",
      },
      {
        title: "Nachschärfen",
        text: "Anhand echter Gespräche werden Formulierungen, Übergabepunkte und Erkennungsraten verbessert.",
      },
    ],
    caseStudy: {
      // No stat: customer satisfaction improved because calls that used to ring
      // out got answered, but that was never measured against a baseline, and
      // an unmeasured figure in a text-5xl slot reads as one that was.
      statLabel:
        "Anrufe außerhalb der Bürozeiten werden angenommen statt ins Leere zu laufen",
      text: "In der Support- und Bewerberkommunikation habe ich Voice-AI-Agenten mit Twilio und WebRTC produktiv gebracht. Die Kundenzufriedenheit verbesserte sich, weil Anrufe angenommen wurden, die vorher ins Leere liefen.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Merken Anrufer, dass sie mit einer KI sprechen?",
        a: "Ja, und das ist Absicht. Der Agent weist zu Gesprächsbeginn darauf hin. Seit August 2026 verlangt Artikel 50 des EU AI Act ohnehin, dass Menschen erkennen können, wenn sie mit einem KI-System interagieren. Verschleierung wäre nicht nur rechtlich heikel, sie beschädigt auch das Vertrauen, sobald sie auffliegt.",
      },
      {
        q: "Was passiert, wenn die KI nicht weiterweiß?",
        a: "Dann übergibt sie. Der Übergabepunkt wird vorher festgelegt, nicht dem Modell überlassen. Der Mitarbeiter bekommt eine Zusammenfassung des bisherigen Gesprächs, sodass der Anrufer nicht alles wiederholen muss.",
      },
      {
        q: "Funktioniert das auf Deutsch zuverlässig?",
        a: "Ja. Die Erkennungsqualität für Deutsch ist inzwischen gut genug für den Produktivbetrieb. Dialekt, starke Nebengeräusche und Fachbegriffe bleiben die Schwachstellen, weshalb wir vor dem Rollout mit echten Aufnahmen aus Ihrem Umfeld testen.",
      },
      {
        q: "Was kostet ein KI-Telefonagent?",
        a: "Die Umsetzung rechne ich mit 90 bis 135 € pro Stunde nach Absprache und je nach Projektumfang ab. Dazu kommen laufende Kosten für Telefonie und Sprachmodelle, die sich pro Gesprächsminute bemessen. Beides schätzen wir vor dem Start anhand Ihres tatsächlichen Anrufaufkommens.",
      },
      {
        q: "Bleiben die Gesprächsdaten in der EU?",
        a: "Das lässt sich so aufsetzen. Telefonie und Sprachverarbeitung können über EU-Regionen laufen, die Gesprächsdaten landen in Ihren eigenen Systemen. Wie weit das geht, hängt vom gewählten Anbieter ab; wir klären das vor der Architekturentscheidung, nicht danach.",
      },
    ],
  },
  {
    path: "/leistungen/ki-agenten-entwicklung",
    flow: {
      caption: "So arbeitet ein Agent",
      stages: [
        { kind: "Auslöser", title: "Ein Vorgang kommt herein",
          text: "Eine mehrstufige Aufgabe, die sonst jemand von Hand durchklicken müsste." },
        { kind: "Schritt", title: "Werkzeuge mit Grenzen",
          text: "Zugriff über APIs auf klar abgegrenzte Werkzeuge, Vollzugriff ist nicht der Standardfall." },
        { kind: "Schritt", title: "Mensch an der richtigen Stelle",
          text: "Freigabeschritt überall dort, wo eine Entscheidung finanzielle oder rechtliche Wirkung hat." },
        { kind: "Ziel", title: "Vorgang abgeschlossen",
          text: "Ergebnis im Zielsystem, jeder Schritt davor nachvollziehbar protokolliert." },
      ],
      alongside: "Evaluation gegen einen festen Testsatz statt Bauchgefühl, dazu Kostenkontrolle und Abbruchbedingungen gegen endlose Schleifen.",
    },
    badge: "KI-Agenten für Unternehmen",
    teaser:
      "Agenten, die mehrstufige Aufgaben übernehmen, mit klaren Grenzen, Protokoll und einem Menschen an den richtigen Stellen.",
    h1: "KI-Agenten entwickeln lassen",
    intro:
      "Ein KI-Agent ist ein System, das eine Aufgabe in mehreren Schritten selbst plant und dabei Werkzeuge benutzt, statt nur einen Text zu erzeugen. Das ist mächtig und genau deshalb heikel: Ohne klare Grenzen macht ein Agent Dinge, die niemand beauftragt hat. Ich baue Agenten mit definierten Berechtigungen, protokollierten Schritten und einem Menschen an den Stellen, an denen eine falsche Entscheidung teuer wird.",
    szenarien: [
      {
        title: "Recherche und Aufbereitung",
        text: "Der Agent sammelt Informationen aus Ihren Systemen und dem Web, prüft sie gegeneinander und liefert ein belegtes Ergebnis statt einer Behauptung.",
      },
      {
        title: "Vorgänge bearbeiten",
        text: "Anfragen werden klassifiziert, angereichert, im richtigen System angelegt und der zuständigen Person zugewiesen.",
      },
      {
        title: "Mensch an der richtigen Stelle",
        text: "Alles, was Geld kostet oder nach außen geht, läuft über eine Freigabe. Der Agent bereitet vor, ein Mensch entscheidet.",
      },
    ],
    leistungen: [
      "Agenten-Architektur mit klar abgegrenzten Werkzeugen und Berechtigungen",
      "Anbindung an Ihre Systeme über APIs, ohne Vollzugriff als Standardfall",
      "RAG-Wissensanbindung, damit Antworten aus Ihren Inhalten stammen",
      "Freigabeschritte an den Stellen mit finanzieller oder rechtlicher Wirkung",
      "Protokollierung jedes Schritts, damit Entscheidungen nachvollziehbar bleiben",
      "Evaluation gegen einen festen Testsatz statt Bauchgefühl",
      "Kostenkontrolle und Abbruchbedingungen gegen endlose Schleifen",
    ],
    ablauf: [
      {
        title: "Aufgabe abgrenzen",
        text: "Wir definieren genau, was der Agent darf und was nicht. Diese Grenze ist die wichtigste Entscheidung im ganzen Projekt.",
      },
      {
        title: "Testsatz aufbauen",
        text: "Bevor gebaut wird, sammeln wir echte Fälle mit bekanntem richtigem Ergebnis. Ohne die lässt sich Qualität später nicht beurteilen.",
      },
      {
        title: "Bauen und messen",
        text: "Umsetzung gegen den Testsatz, mit Protokollierung jedes Schritts und harten Abbruchbedingungen.",
      },
      {
        title: "Begleitet ausrollen",
        text: "Start mit Freigabe bei jedem Schritt, dann schrittweise mehr Autonomie in den Bereichen, in denen die Ergebnisse stimmen.",
      },
    ],
    caseStudy: {
      stat: "90 %",
      statLabel: "der Candidate Operations automatisiert",
      text: "In den Candidate Operations habe ich GPT-gestützte Abläufe mit RAG und LangChain produktiv gebracht und den Automatisierungsgrad auf rund 90 Prozent gehoben, mit Guardrails für personenbezogene Daten.",
      link: "/projekte/recruiting-automatisierung",
      linkText: "Zur Case Study Recruiting-Automatisierung",
    },
    faq: [
      {
        q: "Was unterscheidet einen KI-Agenten von einem n8n-Workflow?",
        a: "Ein Workflow führt festgelegte Schritte in festgelegter Reihenfolge aus. Ein Agent entscheidet selbst, welche Schritte nötig sind, und benutzt dafür Werkzeuge. Für klar definierte Abläufe ist der Workflow die bessere Wahl: er ist billiger, schneller und vorhersagbar. Ein Agent lohnt sich erst, wenn der Weg zum Ziel nicht vorab feststeht.",
      },
      {
        q: "Wie verhindern Sie, dass ein Agent Unsinn anstellt?",
        a: "Über drei Dinge: enge Werkzeugrechte, sodass der Agent technisch nicht kann, was er nicht soll; Freigabeschritte überall dort, wo eine Aktion Geld kostet oder nach außen geht; und Abbruchbedingungen gegen Schleifen. Dazu kommt Protokollierung, damit im Zweifel nachvollziehbar ist, was passiert ist.",
      },
      {
        q: "Woher weiß ich, ob der Agent gut genug ist?",
        a: "Aus einem Testsatz echter Fälle mit bekanntem richtigem Ergebnis, den wir vor dem Bauen anlegen. Jede Änderung wird dagegen gemessen. Ohne diesen Testsatz bleibt die Qualitätsfrage Meinungssache, und genau daran scheitern die meisten Agentenprojekte.",
      },
      {
        q: "Welche Frameworks setzen Sie ein?",
        a: "Je nach Anforderung n8n für die Orchestrierung, LangChain für Retrieval und Werkzeuganbindung, sowie die Modell-APIs von OpenAI, Azure OpenAI und Anthropic Claude. Die Auswahl richtet sich nach Datenschutzanforderung, Kosten und Qualität, nicht nach Mode.",
      },
      {
        q: "Was kostet die Entwicklung eines KI-Agenten?",
        a: "90 bis 135 € pro Stunde nach Absprache und je nach Projektumfang, dazu die laufenden Modellkosten. Der ehrliche Hinweis vorweg: Für viele Aufgaben ist ein normaler Workflow die günstigere und stabilere Lösung. Das prüfen wir im Erstgespräch, bevor Sie in einen Agenten investieren.",
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
