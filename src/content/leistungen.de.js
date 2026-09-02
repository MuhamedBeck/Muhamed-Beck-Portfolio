// German landing page content (SEO money pages). One entry per route.
// Facts and metrics come from the owner's CV; do not invent numbers.
// The `faq` entries are also emitted as FAQPage JSON-LD by prerender-meta.js.

export const PREIS_TEXT =
  "90 bis 135 € pro Stunde, nach Absprache und je nach Projektumfang. Für klar umrissene Workflows und Integrationen sind auch Festpreise möglich. Orientierung: Der Median für IT-Freelancer liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde.";

export const LEISTUNGEN = [
  {
    path: "/leistungen/n8n-automatisierung",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Welcher Ablauf frisst bei Ihnen die meiste Zeit?",
      intro:
        "Beschreiben Sie ihn in zwei Sätzen, mit den Systemen, die daran hängen. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, ob n8n dafür das richtige Werkzeug ist oder ob es einfacher geht.",
      button: "Workflow anfragen",
    },
    weiterlesen: [
      { path: "/ratgeber/n8n-vs-make-vs-zapier", label: "n8n, Make und Zapier im Vergleich" },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
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
    hero: {
      kurz: "n8n- und Workflow-Automatisierung",
      ankerLabel: "Durchlaufzeit",
      auszeichnung: "Schwerpunkt",
    },
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
      "CRM- und ATS-Automatisierung (HubSpot, RecruitCRM, Personio)",
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
        a: "Ja. Ich habe unter anderem HubSpot, RecruitCRM und Personio über REST-APIs, Webhooks und OAuth2 angebunden, inklusive Rate-Limit- und Retry-Strategien für einen stabilen Datenaustausch.",
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
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Wo soll KI bei Ihnen wirklich Arbeit abnehmen?",
      intro:
        "Schreiben Sie mir den Anwendungsfall, nicht die Technik. Wenn KI sich dafür nicht rechnet, sage ich das, bevor wir anfangen.",
      button: "Kostenloses Erstgespräch",
    },
    weiterlesen: [
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
      { path: "/ratgeber/n8n-vs-make-vs-zapier", label: "n8n, Make und Zapier im Vergleich" },
    ],
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
    hero: {
      kurz: "KI-Automatisierung",
      ankerLabel: "Automatisierungsgrad",
    },
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
    path: "/leistungen/voice-ai-agenten",
    preisText:
      "90 bis 135 € pro Stunde für die Umsetzung. Anders als bei den übrigen Leistungen kommen laufende Kosten dazu: Sprachagenten werden je Gesprächsminute abgerechnet, dazu Telefonie und Rufnummer. Was das konkret bedeutet, steht im Ratgeber zu KI-Telefonagenten.",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Wie viele Anrufe gehen bei Ihnen verloren?",
      intro:
        "Sagen Sie mir, wann das Telefon klingelt und niemand rangeht. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, ob ein Sprachassistent das auffängt und was er im Monat wirklich kostet.",
      button: "Telefonassistent anfragen",
    },
    weiterlesen: [
      { path: "/ratgeber/ki-recruiting-ai-act", label: "Was der AI Act für KI-Telefonie verlangt" },
      {
        path: "/ratgeber/recruiting-mit-n8n-automatisieren",
        label: "Recruiting mit n8n automatisieren",
      },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
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
    hero: {
      kurz: "Voice-AI-Telefonassistenten",
      ankerLabel: "auch außerhalb der Bürozeiten",
    },
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
    preisText:
      "90 bis 135 € pro Stunde für die Entwicklung. Dazu kommen laufende Modellkosten je Anfrage, die vom eingesetzten Modell und vom Umfang der Eingaben abhängen. Beides wird vorher abgeschätzt, damit der Betrieb später keine Überraschung ist.",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Welche Aufgabe soll ein Agent für Sie übernehmen?",
      intro:
        "Beschreiben Sie sie so genau wie möglich, samt der Stelle, an der ein Mensch übernehmen muss. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, ob ein Agent dafür trägt.",
      button: "KI-Agenten anfragen",
    },
    weiterlesen: [
      { path: "/ratgeber/n8n-vs-make-vs-zapier", label: "n8n, Make und Zapier im Vergleich" },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
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
    hero: {
      kurz: "KI-Agenten entwickeln lassen",
      ankerLabel: "Candidate Operations",
    },
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
  {
    path: "/leistungen/hubspot-integration",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Welche Systeme sprechen bei Ihnen nicht miteinander?",
      intro:
        "Nennen Sie mir die beiden Enden und was dazwischen heute von Hand passiert. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, wie die Anbindung aussehen würde.",
      button: "Integration anfragen",
    },
    weiterlesen: [
      {
        path: "/ratgeber/recruiting-mit-n8n-automatisieren",
        label: "Recruiting mit n8n automatisieren",
      },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
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
          text: "HubSpot, RecruitCRM und Personio bidirektional, ohne Doppeleingabe." },
      ],
      alongside: "OAuth2 und JWT für die Authentifizierung, dazu Rate-Limit- und Retry-Strategien mit Monitoring. APIs antworten nicht immer, und genau dann entscheidet sich, ob Daten verloren gehen.",
    },
    badge: "HubSpot & CRM Integrationen",
    hero: {
      kurz: "HubSpot- und CRM-Integration",
      ankerLabel: "Datenaustausch",
    },
    teaser:
      "HubSpot, RecruitCRM und Personio sauber angebunden: REST, Webhooks, OAuth2, Rate-Limit- und Retry-Strategien.",
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
      "HubSpot-Anbindung an ATS- und Recruiting-Systeme (RecruitCRM, Personio)",
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
        a: "Unter anderem RecruitCRM und Personio sowie eigene Web-Formulare und interne Tools, jeweils über REST-APIs, Webhooks und OAuth2.",
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
    path: "/leistungen/webentwicklung",
    preisText:
      "90 bis 135 € pro Stunde nach Absprache. Für eine Webseite steht der Umfang meist vorher fest, deshalb ist hier häufiger ein Festpreis sinnvoll als bei laufenden Automatisierungen. Laufende Kosten entstehen nur für Domain und Hosting, nicht für die Seite selbst.",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Brauchen Sie eine Webseite, die schnell ist und gefunden wird?",
      intro:
        "Schreiben Sie mir, was die jetzige Seite nicht leistet, oder dass es noch keine gibt. Sie bekommen innerhalb von 24 Stunden eine ehrliche Einschätzung, ob sich ein Neubau lohnt und was er kosten würde.",
      button: "Webseite anfragen",
    },
    weiterlesen: [
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
    flow: {
      caption: "So entsteht eine Seite",
      stages: [
        {
          kind: "Auslöser",
          title: "Die alte Seite bremst",
          text: "Zu langsam, nicht auffindbar, nicht pflegbar, oder alles zusammen. Meist merkt man es an den ausbleibenden Anfragen, nicht an der Technik.",
        },
        {
          kind: "Schritt",
          title: "Struktur vor Gestaltung",
          text: "Welche Seiten es gibt, wonach gesucht wird und was auf jeder Seite passieren soll. Erst danach wird etwas gebaut.",
        },
        {
          kind: "Schritt",
          title: "Bauen und messen",
          text: "Statisch erzeugtes HTML statt eines Frameworks, das im Browser mitläuft. Gemessen wird während des Bauens, nicht danach.",
        },
        {
          kind: "Ziel",
          title: "Übergabe mit Dokumentation",
          text: "Sie bekommen den Quelltext, die Zugänge und eine Anleitung. Weiterbetreuung ist ein Angebot, keine Abhängigkeit.",
        },
      ],
      alongside:
        "Mehrsprachigkeit, strukturierte Daten für Suchmaschinen und ein Kontaktweg, der auch ohne Formular funktioniert.",
    },
    badge: "Webentwicklung & Relaunch",
    hero: {
      kurz: "Webentwicklung und Relaunch",
      ankerLabel: "ausgelieferte JS-Dateien",
    },
    teaser:
      "Schnelle, auffindbare Webseiten ohne Baukasten. Statisch erzeugt, mehrsprachig wenn nötig, und mit Messwerten statt Versprechen.",
    h1: "Webentwicklung und Website-Relaunch",
    intro:
      "Eine Webseite ist kein Selbstzweck: Sie soll gefunden werden, schnell laden und Anfragen erzeugen. Ich baue sie so, dass diese drei Dinge messbar sind, und übergebe sie so, dass Sie nicht an mir hängen.",
    szenarien: [
      {
        title: "Relaunch statt Baukasten",
        text: "Bestehende Seiten aus Baukästen laden häufig mehrere Megabyte und sind auf dem Telefon kaum benutzbar. Ein Neubau als statisch erzeugte Seite bringt dieselben Inhalte auf einen Bruchteil der Datenmenge.",
      },
      {
        title: "Mehrsprachige Seiten",
        text: "Eine Sprache mehr ist kein Kopieren, sondern eine Struktur. Übersetzungen werden so geprüft, dass eine fehlende Zeile den Build bricht statt still deutschen Text auszuliefern.",
      },
      {
        title: "Auffindbarkeit von Anfang an",
        text: "Titel, Beschreibungen, strukturierte Daten, saubere Adressen und ein hreflang-Verbund, der in beide Richtungen stimmt. Nachträglich ist das teurer als beim Bauen.",
      },
    ],
    leistungen: [
      "Neubau und Relaunch von Unternehmensseiten, statisch erzeugt",
      "Mehrsprachigkeit mit geprüfter Vollständigkeit der Übersetzungen",
      "Technisches SEO: Titel, Beschreibungen, strukturierte Daten, Sitemap, hreflang",
      "Barrierefreiheit: Tastaturbedienung, Kontraste, reduzierte Bewegung",
      "Kernwerte im Blick: Ladezeit, Layoutstabilität, Reaktionszeit",
      "Anbindung an bestehende Systeme, Formulare und Terminbuchung",
      "Übergabe mit Quelltext, Zugängen und Dokumentation",
    ],
    ablauf: [
      {
        title: "Bestandsaufnahme",
        text: "Was ist da, was wird gesucht, was fehlt. Bei einem Relaunch wird die alte Seite vorher gemessen, damit der Vergleich hinterher belastbar ist.",
      },
      {
        title: "Struktur und Inhalte",
        text: "Seitenstruktur, Adressen und Texte. Die Inhalte kommen von Ihnen oder entstehen gemeinsam, aber sie stehen vor der Gestaltung.",
      },
      {
        title: "Bauen",
        text: "In sichtbaren Schritten, mit einer Vorschauadresse, die Sie jederzeit ansehen können.",
      },
      {
        title: "Umstellung und Übergabe",
        text: "Alte Adressen werden weitergeleitet, damit nichts verloren geht. Danach Quelltext, Zugänge und Dokumentation.",
      },
    ],
    caseStudy: {
      stat: "0",
      statLabel: "ausgelieferte JavaScript-Dateien bei maflats.de",
      text: "Für MA-Flats habe ich maflats.de vollständig neu gebaut: fünf Sprachen, neun Standorte, 1,35 Sekunden LCP unter gedrosselter Verbindung und 100 Punkte für Barrierefreiheit.",
      link: "/projekte/maflats",
      linkText: "Zur Case Study MA-Flats",
    },
    faq: [
      {
        q: "Was kostet eine neue Webseite?",
        a: "Das hängt am Umfang, nicht an der Seitenzahl. Eine einsprachige Unternehmensseite mit klarer Struktur liegt meist im Bereich weniger Wochen, eine mehrsprachige Seite mit vielen Standortseiten darüber. Abgerechnet wird zu 90 bis 135 € pro Stunde oder als Festpreis, wenn der Umfang vorher steht.",
      },
      {
        q: "Warum keine Baukastenlösung oder WordPress?",
        a: "Beides kann richtig sein, wenn Sie täglich selbst Inhalte pflegen. Für eine Unternehmensseite, die sich selten ändert, zahlen Sie damit dauerhaft mit Ladezeit und Wartungsaufwand für Flexibilität, die Sie nicht nutzen. Statisch erzeugtes HTML hat keine Datenbank, kein Plugin-Update und keine Angriffsfläche dieser Art.",
      },
      {
        q: "Kann ich die Inhalte danach selbst ändern?",
        a: "Ja. Texte liegen in klar benannten Dateien, nicht im Quelltext der Seiten. Für Änderungen, die über Text hinausgehen, gibt es die Dokumentation, und Sie können jederzeit jemand anderen damit beauftragen.",
      },
      {
        q: "Was passiert mit meinen alten Adressen?",
        a: "Sie werden auf die neuen weitergeleitet. Das ist der Punkt, an dem Relaunches am häufigsten Sichtbarkeit verlieren: Wer alte Adressen ins Leere laufen lässt, verliert die Platzierungen, die daran hängen.",
      },
      {
        q: "Arbeiten Sie remote oder vor Ort?",
        a: "Überwiegend remote, in ganz Deutschland, Österreich und der Schweiz. Vor Ort im Rhein-Main-Gebiet nach Absprache.",
      },
    ],
  },
  {
    path: "/leistungen/geo-seo-optimierung",
    cta: {
      headline: "Werden Sie gefunden, wenn jemand Ihr Problem beschreibt?",
      intro:
        "Schreiben Sie mir, wonach Ihre Kunden suchen und was sie stattdessen finden. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, ob das eine Frage der Inhalte, der Technik oder der Auffindbarkeit für KI-Assistenten ist.",
      button: "Sichtbarkeit prüfen lassen",
    },
    weiterlesen: [
      { path: "/leistungen/webentwicklung", label: "Webentwicklung und Relaunch" },
      { path: "/projekte/maflats", label: "Website-Relaunch für MA-Flats" },
    ],
    flow: {
      caption: "So entsteht Sichtbarkeit",
      stages: [
        { kind: "Befund", title: "Messen statt raten",
          text: "Search Console, Ladezeiten unter Drosselung, Indexierungsstatus und die Frage, welche Seiten überhaupt ausgeliefert werden." },
        { kind: "Schritt", title: "Technik in Ordnung bringen",
          text: "Serverseitiges Rendern, saubere Weiterleitungen, Sitemap, strukturierte Daten und Ladezeiten, die auch mobil halten." },
        { kind: "Schritt", title: "Für KI-Systeme lesbar machen",
          text: "llms.txt, zitierfähige Zahlen mit Quelle, eindeutige Entitätsangaben und Inhalte, die eine Frage wirklich beantworten." },
        { kind: "Ziel", title: "In beiden Welten auffindbar",
          text: "In Google und Bing über klassische Suchergebnisse, in ChatGPT, Perplexity und Claude über zitierte Passagen." },
      ],
      alongside: "Gemessen wird vorher und nachher, mit denselben Werkzeugen unter denselben Bedingungen. Eine Zahl ohne Messbedingung ist keine.",
    },
    badge: "GEO & SEO Optimierung",
    hero: {
      kurz: "GEO- und SEO-Optimierung",
      ankerLabel: "SEO-Wertung bei maflats.de",
    },
    teaser:
      "Gefunden werden in Google und in KI-Assistenten. Technik, Inhalte und Auffindbarkeit, gemessen vor und nach der Arbeit.",
    h1: "GEO und SEO: in Google und KI-Assistenten gefunden werden",
    intro:
      "Suchmaschinen sind nicht mehr der einzige Weg, auf dem Kunden Sie finden. Immer häufiger fragen Menschen ChatGPT, Perplexity oder Claude nach einem Anbieter und bekommen drei Namen genannt. Ob Sie dabei sind, entscheidet sich an anderen Stellen als beim klassischen Ranking. Ich bringe beides in Ordnung: die technische Grundlage, damit Google Ihre Seiten überhaupt sauber lesen kann, und die inhaltliche, damit ein Sprachmodell Sie zitieren kann statt Ihre Wettbewerber.",
    szenarien: [
      { title: "Die Seite rankt nicht, obwohl der Inhalt gut ist",
        text: "Häufig liegt es nicht am Text, sondern daran, dass Crawler ohne JavaScript eine leere Seite sehen, Weiterleitungen im Kreis laufen oder jede Unterseite denselben Titel trägt." },
      { title: "KI-Assistenten nennen Wettbewerber, nicht Sie",
        text: "Sprachmodelle zitieren, was sie eindeutig zuordnen können. Dafür braucht es belegte Zahlen, konsistente Angaben zur Firma und Inhalte, die eine Frage vollständig beantworten." },
      { title: "Der Relaunch hat die Sichtbarkeit gekostet",
        text: "Neue Seite, alte Rankings weg. Meist fehlen Weiterleitungen der alten Adressen oder die Sitemap meldet URLs, die weiterleiten statt zu antworten." },
    ],
    leistungen: [
      "Technisches Audit: Indexierung, Weiterleitungen, Sitemap, Ladezeiten mobil unter Drosselung",
      "Serverseitiges Rendern oder Vorab-Erzeugung, damit Crawler ohne JavaScript Inhalte sehen",
      "Strukturierte Daten für Person, Dienstleistung, Artikel und Navigationspfade",
      "llms.txt und zitierfähige Inhalte für ChatGPT, Perplexity und Claude",
      "Mehrsprachigkeit mit hreflang, sauber und symmetrisch statt halb gepflegt",
      "Inhaltsarbeit: Ratgeber, die eine Suchfrage vollständig beantworten statt sie anzureißen",
      "Messung vorher und nachher mit Search Console und Lighthouse, dieselben Bedingungen",
    ],
    ablauf: [
      { title: "Befund", text: "Ich messe den Ist-Zustand: Was ist indexiert, was wird ausgeliefert, wie schnell lädt es mobil, was steht in der Search Console." },
      { title: "Prioritäten", text: "Nicht alles lohnt sich. Sie bekommen eine Liste nach Wirkung geteilt durch Aufwand, mit ehrlicher Einschätzung, was nichts bringt." },
      { title: "Umsetzung", text: "Technik zuerst, dann Inhalte. Jede Änderung einzeln, damit sich die Wirkung zuordnen lässt." },
      { title: "Nachmessung", text: "Dieselben Werkzeuge, dieselben Bedingungen, sechs bis zwölf Wochen später. Ohne Vergleich ist jede Verbesserung eine Behauptung." },
    ],
    caseStudy: {
      stat: "100",
      statLabel: "SEO-Wertung bei maflats.de, mobil mit Lighthouse gemessen",
      text: "Für MA-Flats habe ich maflats.de neu gebaut: fünf Sprachen, 90 indexierbare Adressen, vollständig statisch erzeugt und damit auch ohne JavaScript lesbar. Barrierefreiheit 100, SEO 100.",
      link: "/projekte/maflats",
      linkText: "Die Fallstudie im Detail",
    },
    preisText:
      "90 bis 135 € pro Stunde nach Absprache. Ein Audit hat einen absehbaren Umfang und lässt sich deshalb gut als Festpreis abbilden; die anschließende Umsetzung hängt davon ab, was der Befund ergibt. Laufende Kosten entstehen keine.",
    faq: [
      { q: "Was ist GEO und wie unterscheidet es sich von SEO?",
        a: "SEO zielt auf Platzierungen in Suchergebnissen, GEO darauf, in den Antworten von KI-Assistenten vorzukommen. Die technischen Grundlagen überschneiden sich stark, die inhaltlichen weniger: Sprachmodelle zitieren belegte, eindeutig zuordenbare Aussagen, während Suchmaschinen auch Seiten belohnen, die eine Frage nur anreißen." },
      { q: "Wie lange dauert es, bis man etwas sieht?",
        a: "Technische Korrekturen wirken innerhalb weniger Wochen, sobald Google neu gecrawlt hat. Inhaltliche Arbeit braucht zwei bis drei Monate, bis sich Platzierungen stabilisieren. Wer schnellere Ergebnisse verspricht, verkauft etwas anderes." },
      { q: "Bringt llms.txt überhaupt etwas?",
        a: "Ehrlich: gemessen ist der Effekt bisher gering, und mehrere Untersuchungen zeigen, dass die Datei selten abgerufen wird. Sie kostet aber fast nichts und schadet nicht. Wichtiger sind belegte Zahlen im Fließtext und konsistente Angaben zur Person oder Firma." },
      { q: "Muss die Seite dafür neu gebaut werden?",
        a: "Meistens nicht. Vieles lässt sich an einer bestehenden Seite beheben. Nur wenn die Grundlage das Rendern für Crawler unmöglich macht, ist ein Neubau der günstigere Weg, und das sage ich vorher." },
      { q: "Arbeiten Sie auch außerhalb Deutschlands?",
        a: "Ja. Überwiegend remote, in ganz Deutschland, Österreich und der Schweiz. Mehrsprachige Auftritte mit hreflang sind ein regelmäßiger Teil der Arbeit." },
    ],
  },
  {
    path: "/leistungen/recruiting-automatisierung",
    /* Eigener Schluss statt der allgemeinen Frage nach dem Prozess.
       Wer diese Seite zu Ende liest, hat eine bestimmte Frage im Kopf,
       und die ist auf jeder der sieben Seiten eine andere. */
    cta: {
      headline: "Wie viele Stunden kostet Sie eine Stelle bis zum Vertrag?",
      intro:
        "Beschreiben Sie kurz Ihren Ablauf und welches Bewerbermanagement Sie nutzen. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, was sich davon automatisieren lässt und was beim Menschen bleiben muss.",
      button: "Recruiting-Projekt anfragen",
    },
    weiterlesen: [
      { path: "/ratgeber/ki-recruiting-ai-act", label: "KI im Recruiting und der AI Act" },
      {
        path: "/ratgeber/recruiting-mit-n8n-automatisieren",
        label: "Recruiting mit n8n automatisieren",
      },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
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
          text: "RecruitCRM, Personio oder HubSpot, mit Reporting über den ganzen Funnel." },
      ],
      alongside: "Ein DSGVO-Konzept für Bewerberdaten mit Löschfristen, Rollen und Audit-Logging. Bewerberdaten sind der Fall, in dem Datenschutz nicht verhandelbar ist.",
    },
    badge: "Recruiting & ATS Automatisierung",
    hero: {
      kurz: "Recruiting-Automatisierung",
      ankerLabel: "kürzere Durchlaufzeit",
    },
    teaser:
      "Bewerbungseingang, Screening, Terminierung und Statuspflege automatisiert. Der Bereich, in dem ich täglich arbeite.",
    h1: "Recruiting-Automatisierung mit n8n und ATS-Anbindung",
    intro:
      "Recruiting ist der Prozess, in dem ich täglich automatisiere. Als AI Automation Manager habe ich Durchlaufzeiten um rund 80 Prozent gesenkt und die Candidate Operations auf etwa 90 Prozent Automatisierungsgrad gebracht. Bewerbungseingang, Vorqualifizierung, Terminierung und Statuspflege laufen dabei ohne manuelle Zwischenschritte, angebunden an RecruitCRM, Personio oder HubSpot.",
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
      "Anbindung von RecruitCRM, Personio und HubSpot über REST und Webhooks",
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
        a: "Produktiv angebunden habe ich RecruitCRM, Personio und HubSpot, dazu Stripe, Slack, Calendly und DocuSeal. Grundsätzlich lässt sich jedes System mit einer REST-API oder Webhooks anbinden. Wenn eine API fehlt, prüfen wir vorab, ob ein Export- oder E-Mail-basierter Weg tragfähig ist.",
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
    path: "/leistungen/linkedin-automatisierung",
    cta: {
      headline: "Wie viel Zeit kostet Sie LinkedIn im Monat?",
      intro:
        "Schreiben Sie mir, wie viele Profile Sie betreuen und was daran heute Handarbeit ist. Sie bekommen innerhalb von 24 Stunden eine Einschätzung, was sich davon sinnvoll automatisieren lässt und was besser bei Menschen bleibt.",
      button: "LinkedIn-Setup besprechen",
    },
    weiterlesen: [
      { path: "/ratgeber/ki-recruiting-ai-act", label: "KI im Recruiting und die KI-Verordnung" },
      { path: "/leistungen/ki-agenten-entwicklung", label: "KI-Agenten entwickeln lassen" },
    ],
    flow: {
      caption: "So läuft ein betreutes Profil",
      stages: [
        { kind: "Grundlage", title: "Persona festlegen",
          text: "Rolle, Fachgebiet, Tonfall und Zielgruppe je Profil, dazu klare Tabuthemen. Ohne das klingt jeder Beitrag gleich." },
        { kind: "Schritt", title: "Themen planen",
          text: "Themenpools je Zielgruppe und Wochentag, damit über Wochen Abwechslung entsteht statt derselben drei Botschaften." },
        { kind: "Schritt", title: "Beiträge erzeugen und kennzeichnen",
          text: "KI schreibt aus dem Thema, Bilder werden maschinenlesbar und sichtbar als KI-generiert gekennzeichnet." },
        { kind: "Ziel", title: "Terminiert und protokolliert",
          text: "Veröffentlichung nach Zeitplan, dazu ein Bericht je Lauf: was lief, was nicht, und warum." },
      ],
      alongside: "Grenzen sind Teil des Aufbaus: Tageslimits, Themenfilter und Sperrlisten. Ein System ohne Bremse produziert früher oder später etwas, das niemand so gesagt hätte.",
    },
    badge: "LinkedIn-Automatisierung",
    hero: {
      kurz: "LinkedIn-Automatisierung",
      ankerLabel: "Kennzeichnung nach IPTC-Standard",
    },
    teaser:
      "Mehrere Profile mit eigener Persona, geplanten Themen und KI-Beiträgen, die als solche gekennzeichnet sind.",
    h1: "LinkedIn-Automatisierung für Unternehmen und Teams",
    intro:
      "Wer mehrere LinkedIn-Profile bespielt, verbringt damit schnell mehrere Stunden pro Woche, und trotzdem klingen am Ende alle gleich. Ich baue Systeme, die das tragen: je Profil eine eigene Persona mit Tonfall und Zielgruppe, Themen nach Redaktionsplan statt aus dem Bauch, Beiträge und Bilder mit ordentlicher KI-Kennzeichnung, dazu ein Protokoll über jeden Lauf. Kontrolle bleibt bei Ihnen, das System schlägt vor und dokumentiert.",
    szenarien: [
      { title: "Mehrere Profile, eine Handschrift",
        text: "Wenn Vertrieb, Recruiting und Geschäftsführung dasselbe posten, merkt es die Zielgruppe. Je Profil eine eigene Persona löst das, ohne dass jemand dreimal schreibt." },
      { title: "Der Redaktionsplan reißt nach drei Wochen ab",
        text: "Themenpools nach Zielgruppe und Wochentag halten die Abwechslung, auch wenn niemand Zeit hat, sich etwas auszudenken." },
      { title: "KI-Inhalte ohne Kennzeichnung",
        text: "Die KI-Verordnung verlangt für synthetische Inhalte eine erkennbare Kennzeichnung. Handarbeit vergisst das zuverlässig, ein System nicht." },
    ],
    leistungen: [
      "Persona je Profil: Rolle, Fachgebiet, Tonfall, Zielgruppe und ausdrückliche Tabuthemen",
      "Redaktionsplanung mit Themenpools nach Zielgruppe und Wochentag",
      "KI-geschriebene Beiträge aus dem jeweiligen Thema, in der Sprache der Zielgruppe",
      "Kennzeichnung erzeugter Bilder: maschinenlesbar in den Metadaten nach IPTC-Standard und sichtbar im Bild",
      "Bildverwaltung mit Benachrichtigung, bevor der Vorrat ausgeht",
      "Zeitplanung mit Streuung, damit nichts im Takt einer Maschine erscheint",
      "Themenfilter und Sperrlisten, damit unpassende Inhalte gar nicht erst in die Auswahl geraten",
      "Bericht je Lauf: was passiert ist, was übersprungen wurde und warum",
    ],
    ablauf: [
      { title: "Persona schärfen", text: "Wir legen je Profil fest, wer da spricht, worüber, in welchem Ton und worüber ausdrücklich nicht." },
      { title: "Aufbau", text: "Themenpools, Zeitplan, Kennzeichnung und Berichte werden eingerichtet und an einem Profil erprobt." },
      { title: "Probelauf", text: "Zunächst mit Freigabe vor jeder Veröffentlichung. Sie sehen, was das System vorschlägt, bevor irgendetwas online geht." },
      { title: "Betrieb", text: "Erst wenn die Vorschläge sitzen, läuft es nach Plan. Berichte bleiben, damit Sie jederzeit sehen, was geschehen ist." },
    ],
    caseStudy: {
      statLabel: "Jedes erzeugte Bild wird maschinenlesbar und sichtbar als KI-Inhalt gekennzeichnet",
      text: "In einem laufenden Aufbau betreue ich mehrere Profile mit je eigener Persona, getrennten Themenpools und eigenem Zeitplan. Die Kennzeichnung erzeugter Bilder passiert automatisch beim Veröffentlichen, in den Metadaten und sichtbar im Bild. Ohne Kennzeichnung wird nichts veröffentlicht.",
      link: "/ratgeber/ki-recruiting-ai-act",
      linkText: "Was die KI-Verordnung verlangt",
    },
    preisText:
      "90 bis 135 € pro Stunde für den Aufbau. Der Umfang hängt vor allem an der Zahl der Profile und daran, wie klar die Personas schon sind. Laufende Kosten entstehen für die eingesetzten Sprachmodelle, abgerechnet je Beitrag; das lässt sich vorher abschätzen.",
    faq: [
      { q: "Ist das mit den Regeln von LinkedIn vereinbar?",
        a: "Das hängt davon ab, was automatisiert wird. Inhalte vorbereiten, planen und veröffentlichen ist unkritisch, dafür gibt es offizielle Schnittstellen. Alles, was darüber hinaus im Namen eines Kontos handelt, sollte man bewusst entscheiden und eng begrenzen. Wir klären das vor dem Aufbau, nicht danach." },
      { q: "Merkt man den Beiträgen an, dass sie von einer KI stammen?",
        a: "Wenn man nichts dagegen tut, ja. Deshalb gehören Persona, Tonfall und eine Liste verbotener Floskeln zum Aufbau. Und die Kennzeichnung ist ohnehin Pflicht: erzeugte Bilder werden als solche markiert." },
      { q: "Wer entscheidet, was veröffentlicht wird?",
        a: "Sie. Der Probelauf verlangt Freigabe vor jeder Veröffentlichung, und auch danach lässt sich das jederzeit wieder einschalten. Jeder Lauf wird protokolliert." },
      { q: "Wie viele Profile lassen sich betreuen?",
        a: "Technisch beliebig viele, praktisch begrenzt die Persona-Arbeit. Jedes zusätzliche Profil braucht eine eigene Stimme, sonst entsteht genau der Einheitsbrei, den das System vermeiden soll." },
      { q: "Was passiert, wenn ein Lauf ausfällt?",
        a: "Der Zustand wird über Läufe hinweg mitgeführt, ausgefallene Läufe sind eingeplant. Das Tagesziel bleibt auch dann erreichbar, wenn nur ein Teil der Termine zustande kommt." },
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
