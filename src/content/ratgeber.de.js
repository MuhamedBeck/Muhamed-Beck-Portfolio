// Ratgeber articles.
//
// These exist to be quoted. The Princeton/IIT-Delhi GEO study (Aggarwal et al.,
// KDD 2024) tested nine tactics across 10,000 queries and found adding
// statistics raised citation rate by roughly 41% and direct quotation from
// named sources by roughly 28%, while keyword stuffing actively reduced
// visibility. So every section here opens with a self-contained answer and
// carries a number with its source and date in the same sentence, because a
// retrieval system indexes passages and a chunk boundary can separate a figure
// from the sentence that qualifies it.
//
// House rules: no em dashes, real umlauts, one keyword-bearing h1, and no
// figure that cannot be traced to a source or to the owner's own CV.

export const STAND = "August 2026";

export const RATGEBER = [
  {
    path: "/ratgeber/n8n-freelancer-kosten",
    kicker: "Kosten",
    h1: "Was kostet ein n8n Freelancer?",
    published: "2026-08-07",
    modified: "2026-08-07",
    // The lede is written to be quotable on its own, with no unresolved
    // pronouns and no dependency on a preceding paragraph.
    lede: "Ein n8n Freelancer in Deutschland kostet im Jahr 2026 üblicherweise zwischen 75 und 147 € pro Stunde. Der Median für IT-Freelancer insgesamt liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde. Mein eigener Satz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang.",
    // Same four figures the prose states, so the scale and the text cannot
    // disagree. Sources are named in the copy below.
    scale: {
      caption: "Stundensätze im Vergleich (Stand: August 2026)",
      market: { from: 75, to: 147, label: "n8n-Profile bei freelancermap" },
      median: { value: 95, label: "Median IT-Freelancer, Freelancer-Kompass 2026" },
      own: { from: 90, to: 135, label: "mein Satz, nach Absprache und Projektumfang" },
    },
    sections: [
      {
        h2: "Was kostet ein n8n Freelancer pro Stunde?",
        body: [
          "Zwischen 75 und 147 € pro Stunde, mit deutlichem Ausschlag nach oben bei Spezialisierung auf KI-Integration. Diese Spanne nennt das Freelancer-Verzeichnis von freelancermap für n8n-Profile (Stand August 2026). Der Median über alle IT-Freelancer in Deutschland liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde.",
          "Die Spanne erklärt sich weniger durch das Tool als durch das, was um das Tool herum passiert. Wer ausschließlich Workflows zusammensteckt, liegt am unteren Ende. Wer zusätzlich APIs anbindet, Fehlerbehandlung und Monitoring aufsetzt und DSGVO-Fragen beantworten kann, liegt am oberen.",
        ],
      },
      {
        h2: "Stundensatz oder Festpreis: was ist sinnvoller?",
        body: [
          "Festpreis bei klar umrissenem Umfang, Stundensatz bei allem anderen. Ein einzelner Workflow mit definierten Ein- und Ausgängen lässt sich seriös als Festpreis kalkulieren. Eine Prozesskette über mehrere Systeme, bei der erst während der Umsetzung sichtbar wird, welche API sich wie verhält, lässt sich das nicht.",
          "Der ehrliche Hinweis dazu: Ein Festpreis auf unklarem Umfang ist für beide Seiten schlecht. Der Auftragnehmer kalkuliert einen Risikoaufschlag ein, den der Auftraggeber bezahlt, oder er kalkuliert ihn nicht ein und liefert unter Druck.",
        ],
      },
      {
        h2: "Was kostet ein typisches Automatisierungsprojekt insgesamt?",
        body: [
          "Ein einzelner Workflow liegt meist im Bereich weniger Arbeitstage, eine durchgängige Prozesskette mit CRM- oder ATS-Anbindung im Bereich weniger Wochen. Bei 90 bis 135 € pro Stunde ergibt das für einen abgegrenzten Workflow typischerweise einen vierstelligen Betrag, für eine mehrstufige Integration einen niedrigen fünfstelligen.",
          "Belastbarer wird die Zahl erst nach einem Blick auf die konkreten Systeme. Ob ein Zielsystem eine dokumentierte REST-API hat oder nur einen CSV-Export per E-Mail, macht beim Aufwand den Unterschied zwischen zwei Tagen und zwei Wochen.",
        ],
      },
      {
        h2: "Welche laufenden Kosten kommen zum Honorar dazu?",
        body: [
          "Die Lizenz- und Betriebskosten der Automatisierung selbst, die getrennt vom Honorar anfallen. n8n Cloud beginnt bei etwa 20 € pro Monat. Die Community Edition ist self-hosted kostenlos, verursacht dafür Hosting- und Wartungsaufwand. Kommen KI-Schritte dazu, rechnen sich Modellkosten pro Verarbeitung, nicht pro Monat.",
          "Der wichtigste Kostenhebel ist dabei das Abrechnungsmodell des Tools: n8n zählt eine Workflow-Ausführung unabhängig davon, wie viele Schritte sie durchläuft, Make zählt jede einzelne Operation. Bei vielschrittigen Workflows mit hohem Volumen ist der Unterschied erheblich.",
        ],
      },
      {
        h2: "Woran erkenne ich, ob sich die Investition lohnt?",
        body: [
          "Daran, dass Sie vor dem Start gemessen haben, wie lange der Prozess heute dauert und wie oft er anfällt. Ohne diese Ausgangsmessung ist jede Prozentzahl hinterher nicht überprüfbar.",
          "Als Größenordnung aus der eigenen Praxis: In den von mir automatisierten Recruiting-Prozessen sanken die Durchlaufzeiten um rund 80 Prozent, und die Candidate Operations erreichten etwa 90 Prozent Automatisierungsgrad. Das sind Werte aus produktiv laufenden Systemen, keine Modellrechnung. Übertragbar sind sie nur dort, wo der Prozess ähnlich stark von manueller Datenübertragung geprägt war.",
        ],
      },
      {
        h2: "Lohnt sich ein Freelancer oder eine Agentur?",
        body: [
          "Für einzelne Prozesse und mittlere Projektgrößen ist ein Freelancer meist günstiger und schneller, weil keine Zwischenebene mitfinanziert wird und die Person, die berät, auch die ist, die baut. Eine Agentur lohnt sich, wenn mehrere Gewerke parallel laufen müssen oder eine vertragliche Verfügbarkeitsgarantie über Jahre gefordert ist.",
          "Der reale Unterschied liegt seltener im Stundensatz als in der Übergabe: Bei einer Agentur wechselt oft die ausführende Person, bei einem Freelancer bleibt das Wissen an einer Stelle, was ein Risiko und ein Vorteil zugleich ist.",
        ],
      },
    ],
    faq: [
      {
        q: "Was kostet ein n8n Freelancer pro Stunde?",
        a: "Zwischen 75 und 147 € pro Stunde in Deutschland (freelancermap, Stand August 2026). Der Median für IT-Freelancer insgesamt liegt laut Freelancer-Kompass 2026 bei 95 € pro Stunde. Mein Satz liegt bei 90 bis 135 € nach Absprache und je nach Projektumfang.",
      },
      {
        q: "Gibt es Festpreise für n8n-Projekte?",
        a: "Ja, bei klar umrissenem Umfang. Ein einzelner Workflow mit definierten Ein- und Ausgängen lässt sich seriös als Festpreis kalkulieren. Bei mehrstufigen Integrationen über mehrere Systeme ist ein Stundensatz für beide Seiten fairer, weil der Aufwand erst mit der ersten API sichtbar wird.",
      },
      {
        q: "Was kostet n8n selbst?",
        a: "n8n Cloud beginnt bei etwa 20 € pro Monat. Die Community Edition ist self-hosted kostenlos, verursacht dafür Hosting- und Wartungsaufwand. Anders als Make zählt n8n eine Workflow-Ausführung unabhängig von der Zahl der Schritte, was bei vielschrittigen Workflows deutlich günstiger ist.",
      },
      {
        q: "Wie schnell amortisiert sich eine Automatisierung?",
        a: "Das lässt sich nur mit einer Ausgangsmessung beantworten: wie lange der Prozess heute dauert und wie oft er anfällt. Bei Prozessen, die stark von manueller Datenübertragung geprägt sind, liegt die Amortisation häufig im Bereich weniger Monate; ohne Vorher-Messung bleibt jede Angabe dazu eine Behauptung.",
      },
    ],
    related: [
      { path: "/leistungen/n8n-automatisierung", label: "n8n Freelancer für Workflow-Automatisierung" },
      { path: "/ratgeber/n8n-vs-make-vs-zapier", label: "n8n, Make und Zapier im Vergleich" },
    ],
  },
  {
    path: "/ratgeber/n8n-vs-make-vs-zapier",
    kicker: "Toolauswahl",
    h1: "n8n, Make und Zapier im Vergleich",
    published: "2026-08-07",
    modified: "2026-08-07",
    lede: "Zapier ist am schnellsten eingerichtet, Make ist am visuellsten, n8n ist am flexibelsten und als einziges der drei self-hosted betreibbar. Der praktisch wichtigste Unterschied ist die Abrechnung: n8n zählt eine Workflow-Ausführung, Make zählt jede einzelne Operation darin.",
    // A comparison article about three tools with no comparison table was the
    // most obvious content gap on the site. Every row below restates something
    // the prose or the FAQ on this same page already establishes, so the table
    // and the text cannot disagree. The one exception is Zapier's billing unit,
    // which the article never states outright.
    table: {
      caption: "n8n, Make und Zapier im direkten Vergleich (Stand: August 2026)",
      columns: ["n8n", "Make", "Zapier"],
      rows: [
        {
          label: "Abrechnung",
          cells: [
            "eine Ausführung pro Workflow-Durchlauf",
            "jede einzelne Operation im Workflow",
            "pro Task, also pro Aktionsschritt",
          ],
        },
        {
          label: "Self-hosted möglich",
          cells: ["ja, Community Edition", "nein", "nein"],
        },
        {
          label: "Prozessdaten bleiben im Haus",
          cells: ["ja, bei self-hosted Betrieb", "nein", "nein"],
        },
        {
          label: "Einstiegshürde",
          cells: [
            "belohnt technisches Vorwissen",
            "mittel, visuell aufgebaut",
            "niedrig, ohne Vorwissen bedienbar",
          ],
        },
        {
          label: "Eigene Logik",
          cells: [
            "Code-Node, HTTP-Request-Node",
            "begrenzt, über Szenario-Bausteine",
            "Kette von Hilfskonstruktionen",
          ],
        },
        {
          label: "Fertige Integrationen",
          cells: ["weniger, dafür selbst ergänzbar", "viele", "die größte Zahl"],
        },
        {
          label: "Stärkste Seite",
          cells: [
            "Flexibilität und hohes Volumen",
            "visuelles Szenario-Diagramm",
            "in Minuten eingerichtet",
          ],
        },
      ],
    },
    sections: [
      {
        h2: "Was ist der wichtigste Unterschied zwischen n8n, Make und Zapier?",
        body: [
          "Das Abrechnungsmodell, nicht der Funktionsumfang. n8n zählt eine Ausführung pro Workflow-Durchlauf, unabhängig davon, wie viele Schritte durchlaufen werden. Make zählt jede einzelne Operation. Bei einem Workflow mit zwanzig Schritten bedeutet derselbe Durchlauf bei n8n eine Einheit und bei Make zwanzig.",
          "Für einfache Zwei-Schritt-Verknüpfungen spielt das keine Rolle. Für vielschrittige Workflows mit hohem Volumen entscheidet es die monatliche Rechnung.",
        ],
      },
      {
        h2: "Wann ist Zapier die richtige Wahl?",
        body: [
          "Wenn zwei bekannte SaaS-Tools verbunden werden sollen und niemand im Team entwickeln möchte. Zapier hat die größte Zahl fertiger Integrationen und die niedrigste Einstiegshürde; ein einfacher Zap steht in Minuten.",
          "Die Grenze wird schnell sichtbar, sobald Verzweigungen, Schleifen oder eigene Logik gebraucht werden. Was in n8n ein Code-Node ist, wird in Zapier eine Kette von Hilfskonstruktionen.",
        ],
      },
      {
        h2: "Wann ist n8n die richtige Wahl?",
        body: [
          "Bei komplexerer Logik, hohem Ausführungsvolumen oder wenn die Daten das Unternehmen nicht verlassen dürfen. n8n ist das einzige der drei Werkzeuge, das sich self-hosted auf eigener Infrastruktur betreiben lässt, und das ist bei DSGVO-sensiblen Prozessen wie Bewerber- oder Gesundheitsdaten oft nicht verhandelbar.",
          "Der Preis dafür ist Betriebsaufwand. Self-hosted heißt: jemand kümmert sich um Updates, Backups und Verfügbarkeit. Wer das nicht leisten will, nimmt n8n Cloud und verliert das Datenhaltungs-Argument teilweise wieder.",
        ],
      },
      {
        h2: "Wann ist Make die richtige Wahl?",
        body: [
          "Wenn der visuelle Aufbau im Vordergrund steht und die Workflows eher breit als tief sind. Make zeigt Datenflüsse als Szenario-Diagramm, was das Nachvollziehen für nicht-technische Beteiligte erleichtert.",
          "Bei tiefen, vielschrittigen Workflows kehrt sich der Vorteil um: Das Diagramm wird unübersichtlich, und das Operations-basierte Abrechnungsmodell wird teuer.",
        ],
      },
      {
        h2: "Kann ich später wechseln?",
        body: [
          "Ja, aber nicht per Knopfdruck. Es gibt keinen verlustfreien Export zwischen den drei Systemen; ein Wechsel bedeutet Nachbau. Der Aufwand ist überschaubar, solange die Logik dokumentiert ist, und erheblich, wenn das Wissen nur in der Oberfläche steckt.",
          "Praktischer Rat: Wer absehbar wächst, sollte die Wechselkosten beim Start einpreisen, statt sie später zu entdecken. Migrationen von Zapier zu n8n sind der häufigste Fall, weil Volumen und Komplexität mit der Zeit steigen, selten umgekehrt.",
        ],
      },
    ],
    faq: [
      {
        q: "Ist n8n günstiger als Make?",
        a: "Bei vielschrittigen Workflows in der Regel deutlich. n8n zählt eine Ausführung pro Workflow-Durchlauf, Make zählt jede Operation darin. Bei einem Workflow mit zwanzig Schritten ist das ein Faktor zwanzig auf dieselbe Nutzung. Bei einfachen Zwei-Schritt-Verknüpfungen ist der Unterschied unerheblich.",
      },
      {
        q: "Welches Tool ist DSGVO-konform?",
        a: "Alle drei lassen sich datenschutzkonform einsetzen, aber nur n8n lässt sich self-hosted betreiben, sodass die Prozessdaten die eigene Infrastruktur nicht verlassen. Bei besonders sensiblen Daten wie Bewerber- oder Gesundheitsdaten ist das häufig das ausschlaggebende Kriterium.",
      },
      {
        q: "Kann n8n alles, was Zapier kann?",
        a: "Funktional weitgehend ja, mit weniger fertigen Integrationen, aber der Möglichkeit, fehlende über HTTP-Request-Nodes selbst anzubinden. Der Unterschied liegt in der Einstiegshürde: Zapier ist ohne technisches Vorwissen bedienbar, n8n belohnt es.",
      },
    ],
    related: [
      { path: "/leistungen/n8n-automatisierung", label: "n8n Freelancer für Workflow-Automatisierung" },
      { path: "/ratgeber/n8n-freelancer-kosten", label: "Was kostet ein n8n Freelancer?" },
    ],
  },
  {
    path: "/ratgeber/recruiting-mit-n8n-automatisieren",
    kicker: "Recruiting",
    h1: "Recruiting mit n8n automatisieren",
    published: "2026-08-07",
    modified: "2026-08-07",
    lede: "Im Recruiting lassen sich Bewerbungseingang, Datenpflege, Terminierung und Statuskommunikation automatisieren, die Auswahlentscheidung nicht. In den von mir automatisierten Prozessen sanken die Durchlaufzeiten um rund 80 Prozent, und die Candidate Operations erreichten etwa 90 Prozent Automatisierungsgrad.",
    sections: [
      {
        h2: "Welche Recruiting-Schritte lassen sich automatisieren?",
        body: [
          "Alle Schritte ohne Urteilsanteil: Bewerbungen erfassen, Lebenslaufdaten auslesen, Dubletten prüfen, der richtigen Vakanz zuordnen, Eingangsbestätigungen versenden, Termine koordinieren, Status pflegen und Absagen verschicken.",
          "Nicht automatisierbar ist die Auswahlentscheidung selbst. Ein Modell kann ein Profil gegen Anforderungen prüfen und das Ergebnis begründen; die Entscheidung, wen ein Unternehmen einstellt, bleibt eine menschliche und aus guten Gründen auch eine rechtlich heikle.",
        ],
      },
      {
        h2: "Welcher Schritt sollte zuerst automatisiert werden?",
        body: [
          "Der Bewerbungseingang, weil er täglich anfällt, immer gleich abläuft und heute fast überall aus manueller Datenübertragung besteht. Er ist damit der Schritt mit dem besten Verhältnis aus Aufwand und Wirkung.",
          "Der zweitbeste Kandidat ist meist die Terminierung. Sie kostet wenig Zeit pro Vorgang, aber viel Aufmerksamkeit, weil sie über mehrere Tage in Fragmenten stattfindet.",
        ],
      },
      {
        h2: "Wie werden ATS und CRM angebunden?",
        body: [
          "Über REST-APIs und Webhooks. Welcher der beiden Wege genutzt wird, entscheidet, wie aktuell die Daten sind: Ein Webhook meldet die Änderung in dem Moment, in dem sie passiert, eine API muss abgefragt werden und liefert deshalb nur so frisch, wie das Abfrageintervall es zulässt. Bei Bewerbungseingängen ist das der Unterschied zwischen Minuten und Stunden.",
          "Der Aufwand entscheidet sich an der Datenqualität, nicht an der Schnittstelle. Wenn im Zielsystem Dubletten, uneinheitliche Statuswerte und Freitextfelder liegen, ist die Anbindung schnell gebaut und die Bereinigung die eigentliche Arbeit.",
        ],
      },
      {
        h2: "Was ist bei Bewerberdaten und DSGVO zu beachten?",
        body: [
          "Bewerberdaten gehören zu den sensibleren Datenkategorien, und Automatisierung vervielfacht die Stellen, an denen sie fließen. Praktisch heißt das: definierte Löschfristen, ein Rollen- und Rechtekonzept, Audit-Logging und die Entscheidung, wo die Daten überhaupt verarbeitet werden.",
          "Wenn KI-Schritte im Spiel sind, kommt eine zweite Frage dazu: welche Daten das Modell überhaupt sieht. Eine PII-Filterung vor dem Modellaufruf und ein EU-Hosting, etwa über Azure OpenAI mit EU-Region, sind der übliche Weg. Seit August 2026 verlangt Artikel 50 des EU AI Act außerdem, dass Menschen erkennen können, wenn sie mit einem KI-System interagieren.",
        ],
      },
      {
        h2: "Was bringt die Automatisierung messbar?",
        body: [
          "In den Prozessen, die ich bei meinem Arbeitgeber TOPEOPLE Group GmbH automatisiert habe, sanken die Durchlaufzeiten um rund 80 Prozent, und der Automatisierungsgrad der Candidate Operations erreichte etwa 90 Prozent. Beides sind Werte aus produktiv laufenden Systemen.",
          "Diese Zahlen sind nicht beliebig übertragbar. Sie stammen aus Prozessen, die vorher stark von manueller Datenübertragung geprägt waren. Wo bereits ein gut gepflegtes ATS mit sauberen Schnittstellen läuft, fällt der Effekt kleiner aus, weil weniger Handarbeit übrig ist.",
        ],
      },
    ],
    faq: [
      {
        q: "Ersetzt Recruiting-Automatisierung Recruiter?",
        a: "Nein, und die Grenze verläuft ziemlich scharf. Automatisierbar ist alles, was kein Urteil erfordert: Datenerfassung, Dublettenprüfung, Terminkoordination, Statuspflege. Sobald ein Schritt eine Bewertung von Menschen enthält, ist er nicht nur schwer zu automatisieren, sondern nach EU AI Act auch regulatorisch heikel. Die Zeitersparnis entsteht ohnehin im ersten Bereich: dort liegt der Großteil der Minuten, nicht in der Auswahl selbst.",
      },
      {
        q: "Welche ATS-Systeme lassen sich mit n8n verbinden?",
        a: "Jedes System mit dokumentierter REST-API oder Webhooks, was im DACH-Recruiting auf die meisten zutrifft. Entscheidend ist weniger, ob eine Schnittstelle existiert, als was sie kann: Ob sie Schreibzugriff erlaubt, ob sie Ereignisse per Webhook meldet oder nur auf Abruf antwortet, und wie eng ihr Rate-Limit gesetzt ist. Fehlt eine API ganz, bleibt oft ein Export- oder E-Mail-basierter Weg, der aber vor Projektstart geprüft gehört.",
      },
      {
        q: "Dürfen Bewerberdaten durch ein KI-Modell laufen?",
        a: "Mit den richtigen Vorkehrungen ja: PII-Filterung vor dem Modellaufruf, EU-Verarbeitung etwa über Azure OpenAI mit EU-Region, definierte Löschfristen und Audit-Logging. Ohne diese Vorkehrungen sollte es nicht passieren. Seit August 2026 gilt zusätzlich die Transparenzpflicht aus Artikel 50 des EU AI Act.",
      },
      {
        q: "Wie lange dauert die Umsetzung?",
        a: "Ein einzelner Workflow wie der automatisierte Bewerbungseingang ist meist innerhalb weniger Tage produktiv. Eine durchgängige Kette über den gesamten Funnel dauert je nach Systemlandschaft einige Wochen.",
      },
    ],
    related: [
      { path: "/leistungen/recruiting-automatisierung", label: "Recruiting-Automatisierung mit n8n und ATS-Anbindung" },
      { path: "/ratgeber/ki-recruiting-ai-act", label: "KI im Recruiting und der AI Act" },
      { path: "/leistungen/hubspot-integration", label: "HubSpot- und CRM-Anbindung" },
      { path: "/projekte/recruiting-automatisierung", label: "Case Study: Recruiting-Automatisierung" },
    ],
  },
  {
    path: "/ratgeber/ki-recruiting-ai-act",
    kicker: "Recht",
    h1: "KI im Recruiting und der AI Act",
    published: "2026-08-25",
    modified: "2026-08-25",
    lede: "Die Hochrisiko-Pflichten des AI Act für KI in der Bewerberauswahl gelten erst ab dem 2. Dezember 2027. Die Verordnung (EU) 2026/1744, veröffentlicht am 24. Juli 2026, hat die ursprüngliche Frist des 2. August 2026 um sechzehn Monate verschoben. Wer daraus schließt, KI im Recruiting sei bis dahin unreguliert, irrt an der teuersten Stelle: Emotionserkennung im Bewerbungsverfahren ist seit dem 2. Februar 2025 verboten, und der Bußgeldrahmen dafür beträgt bis zu 35 Millionen Euro oder 7 Prozent des weltweiten Jahresumsatzes.",
    table: {
      caption: "Welche Norm im Recruiting wann greift (Stand: August 2026)",
      columns: ["Gilt seit oder ab", "Bußgeldrahmen"],
      rows: [
        {
          label: "Verbot der Emotionserkennung, Art. 5 Abs. 1 lit. f KI-VO",
          cells: ["2. Februar 2025", "bis 35 Mio. € oder 7 % des Jahresumsatzes (Art. 99 Abs. 3 KI-VO)"],
        },
        {
          label: "Transparenzpflicht bei KI-Kontakt, Art. 50 KI-VO",
          cells: ["2. August 2026", "bis 15 Mio. € oder 3 % des Jahresumsatzes (Art. 99 Abs. 4 KI-VO)"],
        },
        {
          label: "Erläuterung an abgelehnte Personen, Art. 86 KI-VO",
          cells: ["2. August 2026", "bis 50.000 € als Ordnungswidrigkeit (§ 15 KI-MIG)"],
        },
        {
          label: "Hochrisiko-Pflichten Recruiting, Anhang III Nr. 4 KI-VO",
          cells: ["2. Dezember 2027", "bis 15 Mio. € oder 3 % des Jahresumsatzes (Art. 99 Abs. 4 KI-VO)"],
        },
        {
          label: "Automatisierte Einzelentscheidung, Art. 22 DSGVO",
          cells: ["25. Mai 2018", "bis 20 Mio. € oder 4 % des Jahresumsatzes (Art. 83 Abs. 5 lit. b DSGVO)"],
        },
        {
          label: "Benachteiligungsverbot, §§ 3, 7 AGG",
          cells: ["18. August 2006", "Entschädigung, bei aussichtsloser Bewerbung höchstens drei Monatsgehälter (§ 15 Abs. 2 AGG)"],
        },
      ],
    },
    sections: [
      {
        h2: "Gelten die AI-Act-Pflichten für Recruiting-KI schon?",
        body: [
          "Nein, die Pflichten für eigenständige Hochrisiko-KI-Systeme nach Anhang III Nummer 4, also für KI in Beschäftigung und Personalmanagement, gelten erst ab dem 2. Dezember 2027. Rechtsgrundlage der Verschiebung ist die Verordnung (EU) 2026/1744, die Digital-Omnibus-Verordnung zur KI, veröffentlicht am 24. Juli 2026 und in Kraft seit dem 27. Juli 2026. Ursprünglich war der 2. August 2026 vorgesehen.",
          "Verschoben wurde der komplette Pflichtenkatalog für Hochrisiko-Systeme: Risikomanagement, Datenqualität, technische Dokumentation, Protokollierung, menschliche Aufsicht und Konformitätsbewertung. Das sind die Artikel 6 bis 27 der KI-Verordnung. Für die zweite Gruppe von Hochrisiko-Systemen, KI als Sicherheitsbauteil in ohnehin regulierten Produkten wie Maschinen oder Medizinprodukten, gilt sogar erst der 2. August 2028. Fürs Recruiting spielt diese Gruppe keine Rolle.",
          "Für Sie heißt das vor allem eines: Prüfen Sie bei jeder Checkliste, jedem Fachbeitrag und jeder Beraterfolie zuerst das Standdatum. Alles, was vor August 2026 entstanden ist, nennt für das Recruiting noch die alte Frist. Die vielzitierte Übersicht auf artificialintelligenceact.eu trug im Sommer 2026 noch den Stand vom 1. August 2024. Verbindlich sind ohnehin nur die im Amtsblatt veröffentlichten Fassungen; die praktische konsolidierte Fassung bei EUR-Lex trägt selbst den Hinweis, dass sie allein Informationszwecken dient.",
        ],
      },
      {
        h2: "Was ist im Bewerbungsverfahren schon heute verboten?",
        body: [
          "Emotionserkennung ist verboten, und zwar seit dem 2. Februar 2025. Artikel 5 Absatz 1 Buchstabe f der KI-Verordnung untersagt den Einsatz von KI-Systemen, die Emotionen einer natürlichen Person am Arbeitsplatz ableiten. Das steht im selben Katalog wie Social Scoring: Diese Praktiken werden nicht reguliert, sondern untersagt.",
          "Dass ein Bewerbungsverfahren als Arbeitsplatz zählt, ist nach Auffassung der Europäischen Kommission geklärt. Sie hat das in ihren Leitlinien zu verbotenen KI-Praktiken, C(2025) 5052 final vom 29. Juli 2025, ausdrücklich festgehalten: Der Arbeitsplatz umfasst auch das Auswahl- und Einstellungsverfahren, weil zwischen Unternehmen und Bewerbern dasselbe Machtungleichgewicht besteht wie im laufenden Arbeitsverhältnis (Randnummer 254). Als Standardfall nennen dieselben Leitlinien wörtlich: „Der Einsatz von Emotionserkennungssystemen während des Einstellungsverfahrens ist verboten.“ Auch die Probezeit ist genannt. Diese Leitlinien binden Gerichte nicht, das sagen sie selbst; verbindlich auslegen kann die Verordnung nur der Europäische Gerichtshof. Sie sind aber der Maßstab, an dem sich die Aufsichtsbehörden orientieren.",
          "Die beiden Ausnahmen sind eng. Medizinische Zwecke meinen nach Randnummer 257 CE-gekennzeichnete Medizinprodukte, nicht die allgemeine Erfassung von Wohlbefinden oder Stresspegeln. Sicherheitsgründe meinen nach Randnummer 258 den Schutz von Leben und Gesundheit, nicht den Schutz von Eigentum vor Diebstahl oder Betrug. Klarstellend heißt es in Erwägungsgrund 18, also in der amtlichen Begründung im Vorspann der Verordnung, dass körperliche Zustände wie Schmerz oder Müdigkeit keine Emotionen sind. Ein System, das im Video-Interview allein Sprechpausen zählt, misst deshalb noch keine Emotion; eines, das daraus auf Nervosität schließt, sehr wohl.",
        ],
      },
      {
        h2: "Fällt die Auswertung von Video-Interviews darunter?",
        body: [
          "Die Auswertung von Mimik und Stimme fällt unter das Verbot, die reine Textanalyse nicht. Die Grenze verläuft an den biometrischen Daten: Artikel 3 Nummer 39 der KI-Verordnung, anwendbar seit dem 2. Februar 2025, setzt für ein Emotionserkennungssystem biometrische Daten voraus. Die Kommission legt das Verbot entsprechend aus, obwohl der Wortlaut des Artikel 5 Absatz 1 Buchstabe f diese Definition nicht ausdrücklich in Bezug nimmt (Randnummern 244 und 245 der Leitlinien). Wer aus Gesichtsausdruck oder Stimmlage auf Motivation, Belastbarkeit oder Persönlichkeit schließt, arbeitet mit biometrischen Daten und ist erfasst.",
          "Ein System, das Stimmungen aus geschriebenem Text ableitet, also die klassische Stimmungsanalyse einer Bewerbung, arbeitet nicht mit biometrischen Daten und fällt deshalb nicht unter dieses Verbot (Randnummern 250 und 251). Unbedenklich ist es damit nicht: Sobald es Bewerber bewertet oder in eine Rangfolge bringt, greifen die übrigen Regeln dieses Artikels.",
          "Ein zweites Verbot liegt daneben und wird oft übersehen. Artikel 5 Absatz 1 Buchstabe g untersagt die biometrische Kategorisierung, mit der aus biometrischen Daten auf Ethnie, politische Einstellung, Gewerkschaftszugehörigkeit, religiöse oder weltanschauliche Überzeugung, Sexualleben oder sexuelle Orientierung geschlossen wird. Ein Video-Interview liefert genau die Datenbasis für solche Rückschlüsse. Fragen Sie Ihren Anbieter deshalb schriftlich, welche Merkmale sein System aus Bild und Ton ableitet, und lassen Sie sich bestätigen, dass keine dieser Kategorien darunter ist.",
          "Die Begründung des Gesetzgebers steht in Erwägungsgrund 44 und ist ungewöhnlich deutlich: Es bestehen ernsthafte Bedenken hinsichtlich der wissenschaftlichen Grundlage von Systemen, die Emotionen erkennen sollen, weil Emotionsausdruck zwischen Kulturen, Situationen und sogar bei derselben Person erheblich variiert. Das Verbot beruht also nicht auf einem Datenschutzargument, sondern auf dem Zweifel, dass die Technik überhaupt misst, was sie zu messen vorgibt.",
        ],
      },
      {
        h2: "Haftet der Arbeitgeber auch bei zugekaufter Software?",
        body: [
          "Ja, der Arbeitgeber haftet auch bei zugekaufter Software. Randnummer 243 der Kommissionsleitlinien C(2025) 5052 final vom 29. Juli 2025 stellt klar, dass das Verbot Anbieter und Betreiber gleichermaßen trifft, jeweils in ihrem Verantwortungsbereich. Wer ein fertiges Emotionserkennungstool im Bewerbungsverfahren einsetzt, ist selbst Adressat und kann sich nicht darauf berufen, das System nicht entwickelt zu haben.",
          "Der Bußgeldrahmen für Verstöße gegen Artikel 5 liegt nach Artikel 99 Absatz 3 bei bis zu 35 Millionen Euro oder 7 Prozent des weltweiten Jahresumsatzes, je nachdem, welcher Betrag höher ist. Das ist die höchste Stufe der Verordnung, deutlich über den bis zu 15 Millionen Euro oder 3 Prozent für Verstöße gegen Betreiber- und Transparenzpflichten.",
          "Für kleine und mittlere Unternehmen einschließlich Start-ups kehrt Artikel 99 Absatz 6 die Rechnung um: Dort gilt der jeweils niedrigere der beiden Werte, und zwar für alle drei Bußgeldstufen. Die Digital-Omnibus-Verordnung hat mit einem neuen Absatz 6a eine ähnliche, aber engere Deckelung für kleine Midcap-Unternehmen ergänzt, also für Unternehmen, die aus der KMU-Definition herausgewachsen sind. Diese Deckelung greift nur bei den Bußgeldern nach Absatz 4 und 5. Für Verstöße gegen die Verbote des Artikel 5 bleibt es dort beim höheren Wert.",
          "Unabhängig davon greift das Allgemeine Gleichbehandlungsgesetz (AGG). Auch eine diskriminierende Vorauswahl durch zugekaufte Software befreit den Arbeitgeber nicht von der Haftung gegenüber der abgelehnten Person. Die Auslagerung verlagert das Risiko technisch, nicht rechtlich.",
        ],
      },
      {
        h2: "Muss man Bewerber informieren, wenn eine KI mit ihnen spricht?",
        body: [
          "Ja, seit dem 2. August 2026 muss für die betroffene Person erkennbar sein, dass sie mit einem KI-System spricht. Das verlangt Artikel 50 der KI-Verordnung. Diese Frist wurde vom Digital Omnibus ausdrücklich nicht verschoben, wie die Europäische Kommission in ihren FAQ vom Juli 2026 bestätigt hat. Der Bußgeldrahmen liegt nach Artikel 99 Absatz 4 Buchstabe g bei bis zu 15 Millionen Euro oder 3 Prozent des weltweiten Jahresumsatzes.",
          "Normadressat des Artikel 50 Absatz 1 ist der Anbieter des Systems, nicht der Betreiber, und die Pflicht entfällt, wenn die KI-Natur ohnehin offensichtlich ist. Für Arbeitgeber ist das trotzdem kein Freibrief: Wer ein zugekauftes System unter eigenem Namen einsetzt oder es wesentlich verändert, gilt nach Artikel 25 Absatz 1 selbst als Anbieter und haftet dann unmittelbar. Praktisch heißt das, den Hinweis vertraglich vom Anbieter zu verlangen und im eigenen Gesprächsleitfaden zu verankern.",
          "Praktisch ist das der billigste Teil der ganzen Verordnung: ein Satz zu Gesprächsbeginn, vor der ersten inhaltlichen Frage. Zum Beispiel: „Sie sprechen mit einem KI-Assistenten. Auf Wunsch verbinde ich Sie mit einem Mitarbeiter.“ Teuer wird es nur, wenn er fehlt.",
        ],
      },
      {
        h2: "Was gilt im Recruiting unabhängig vom AI Act?",
        body: [
          "Das meiste gilt schon lange. Artikel 22 DSGVO verbietet seit dem 25. Mai 2018 die ausschließlich automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung. Erlaubt ist sie nur in drei Fällen: wenn sie für einen Vertrag erforderlich ist, wenn eine Rechtsvorschrift sie zulässt oder wenn die betroffene Person ausdrücklich eingewilligt hat. Eine vollautomatisch erzeugte Absage ohne menschliche Beteiligung ist damit seit Jahren angreifbar. Der Europäische Gerichtshof hat am 7. Dezember 2023 in der Sache C-634/21 zu SCHUFA entschieden, dass schon die Erstellung eines Scores eine automatisierte Entscheidung sein kann, wenn dieser Wert das Ergebnis maßgeblich bestimmt. Für ein Bewerber-Ranking ist das die entscheidende Aussage.",
          "Das Allgemeine Gleichbehandlungsgesetz gilt seit dem 18. August 2006. Zwei Vorschriften sind für algorithmische Vorauswahl entscheidend. § 3 Absatz 2 erfasst die mittelbare Benachteiligung: ein Kriterium, das neutral aussieht, eine geschützte Gruppe aber systematisch schlechter stellt. Noch wichtiger ist § 22. Trägt eine abgelehnte Person Indizien für eine Benachteiligung vor, muss der Arbeitgeber beweisen, dass keine vorlag. Wer nicht erklären kann, wie sein Modell zu seiner Reihenfolge kommt, führt diesen Beweis nicht. Die Entschädigung nach § 15 Absatz 2 ist auf drei Monatsgehälter begrenzt, wenn die Person auch bei fehlerfreier Auswahl nicht eingestellt worden wäre, sonst gibt es keine Obergrenze. Geltend zu machen ist der Anspruch nach § 15 Absatz 4 binnen zwei Monaten ab Zugang der Absage.",
          "Wo ein Betriebsrat besteht, kommen drei Pflichten zusammen. Erstens kann ein KI-gestütztes Auswahlverfahren eine technische Einrichtung nach § 87 Absatz 1 Nummer 6 BetrVG sein, dann muss der Betriebsrat zustimmen. Das folgt allerdings nicht schon daraus, dass Bewerber bewertet werden: Die Vorschrift schützt Arbeitnehmer, und Bewerber sind noch keine. Mitbestimmungspflichtig wird das System, sobald es objektiv geeignet ist, auch Verhalten oder Leistung der eigenen Beschäftigten zu erfassen, etwa weil Recruiter darin protokolliert werden. Zweitens ist der Betriebsrat nach § 90 Absatz 1 Nummer 3 über die Planung von Arbeitsverfahren zu unterrichten und zu beraten, und zwar rechtzeitig. Drittens stellt § 95 Absatz 2a ausdrücklich klar, dass Auswahlrichtlinien auch dann zustimmungspflichtig sind, wenn bei ihrer Aufstellung künstliche Intelligenz zum Einsatz kommt.",
        ],
      },
      {
        h2: "Wer beaufsichtigt das in Deutschland?",
        body: [
          "Die Bundesnetzagentur beaufsichtigt die KI-Verordnung in Deutschland. Das KI-Marktüberwachungs- und Innovationsförderungsgesetz vom 22. Juli 2026, kurz KI-MIG, ist am 29. Juli 2026 in Kraft getreten und benennt sie in § 2 Absatz 1 als allgemein zuständige Marktüberwachungsbehörde. Deutschland hat die unionsrechtliche Frist zur Benennung, den 2. August 2025, damit um knapp ein Jahr verfehlt.",
          "Für Recruiting sind zwei Vorschriften dieses Gesetzes relevant. § 8 richtet bei der Bundesnetzagentur eine zentrale Beschwerdestelle ein, an die sich auch abgelehnte Bewerberinnen und Bewerber wenden können. Und § 15 ahndet bestimmte Verstöße als Ordnungswidrigkeit mit einer Geldbuße bis zu 50.000 Euro. Dazu gehört ausdrücklich der Fall, dass ein Unternehmen einer abgelehnten Person die nach Artikel 86 Absatz 1 der KI-Verordnung geschuldete Erklärung verweigert.",
          "Die Aufsicht ist nicht vollständig zentralisiert: § 2 Absätze 2 bis 8 weisen sektorale Zuständigkeiten zu, etwa der BaFin für beaufsichtigte Finanzdienstleistungen und den Landesbehörden für öffentliche Stellen.",
        ],
      },
      {
        h2: "Was sollten Arbeitgeber bis Dezember 2027 vorbereiten?",
        body: [
          "Eine Bestandsaufnahme zuerst. In den meisten Recruiting-Prozessen laufen mehr Modelle mit, als die Beteiligten wissen: der eingebaute Abgleich im Bewerbermanagementsystem, eine automatische Rangfolge im Jobportal, eine Vorqualifizierung im Chat. Die Frage ist nicht, ob KI im Einsatz ist, sondern welche Entscheidung sie trifft und wer sie danach noch prüft.",
          "Danach gilt eine einfache Reihenfolge. Alles, was im Beschäftigungskontext Emotionen aus Gesicht oder Stimme ableitet, gehört heute abgeschaltet und nicht erst 2027; im Bewerbungsverfahren gilt das ausnahmslos. Jede Absage braucht eine menschliche Entscheidung, die diesen Namen verdient, also mit Kenntnis des Falls und der Befugnis, das Modell zu überstimmen. Wer Bewerber automatisch in eine Rangfolge bringt, sollte festhalten, welche Merkmale diese Rangfolge bestimmt haben: Genau danach fragt § 22 AGG, in Kraft seit dem 18. August 2006, sobald eine abgelehnte Person Indizien für eine Benachteiligung vorträgt. Und der Betriebsrat gehört an den Anfang des Projekts, nicht an sein Ende.",
          "Wer das bis Ende 2027 stehen hat, muss im Dezember 2027 nicht umbauen, sondern nur dokumentieren. Das ist der Unterschied zwischen einer Frist und einem Problem.",
          "Dieser Text ordnet die Rechtslage zum Stand August 2026 ein und ersetzt keine Rechtsberatung. Für die verbindliche Beurteilung eines konkreten Auswahlverfahrens ist anwaltlicher Rat einzuholen.",
        ],
      },
    ],
    faq: [
      {
        q: "Ist ein Lebenslauf-Parser Hochrisiko-KI?",
        a: "Anhang III Nummer 4 erfasst KI, die Bewerbungen analysiert, filtert oder Kandidaten bewertet. Ob ein konkretes System deshalb Hochrisiko ist, entscheidet aber Artikel 6 Absatz 3: Systeme, die nur eine eng gefasste Verfahrensaufgabe oder eine rein vorbereitende Aufgabe erfüllen und kein erhebliches Grundrechtsrisiko bergen, fallen heraus. Ein Parser, der Felder ausliest, ohne eine Rangfolge oder Eignungsaussage zu erzeugen, kann darunter fallen; ein Matching-Score kaum. Die Einstufung muss der Anbieter dokumentieren, und die daran hängenden Pflichten greifen ohnehin erst am 2. Dezember 2027.",
      },
      {
        q: "Darf ein KI-Agent Bewerber anrufen?",
        a: "Ja, mit Hinweis zu Gesprächsbeginn. Zwei Details gehen dabei oft unter: Der Hinweis muss vor der ersten inhaltlichen Frage fallen, nicht am Ende, und er gilt für Chat und Messenger genauso wie fürs Telefon. Nicht erlaubt bleibt in jedem Fall, aus Stimmlage oder Sprechweise auf Emotionen zu schließen. Das fällt unter das Verbot des Artikel 5 Absatz 1 Buchstabe f, das seit dem 2. Februar 2025 gilt.",
      },
      {
        q: "Was passiert, wenn ein abgelehnter Bewerber Auskunft verlangt?",
        a: "Er kann sich auf Artikel 15 DSGVO stützen und auf Artikel 86 der KI-Verordnung, der seit dem 2. August 2026 gilt und vom Digital Omnibus nicht verschoben wurde. In Deutschland ist das Verweigern dieser Erläuterung nach § 15 KI-MIG eine Ordnungswidrigkeit mit bis zu 50.000 Euro. Unabhängig davon kehrt § 22 AGG die Beweislast um, sobald Indizien für eine Benachteiligung vorgetragen sind.",
      },
      {
        q: "Gilt das auch für kleine Unternehmen?",
        a: "Verbote und Pflichten gelten unabhängig von der Größe. Nur beim Bußgeld wird unterschieden: Bei kleinen und mittleren Unternehmen einschließlich Start-ups gilt nach Artikel 99 Absatz 6 der niedrigere der beiden Werte, und zwar für alle Bußgeldstufen. Für kleine Midcap-Unternehmen hat die Digital-Omnibus-Verordnung mit Artikel 99 Absatz 6a eine engere Deckelung ergänzt: Sie greift nur bei den Bußgeldern nach Absatz 4 und 5, nicht bei Verstößen gegen die Verbote des Artikel 5.",
      },
    ],
    related: [
      { path: "/leistungen/recruiting-automatisierung", label: "Recruiting-Automatisierung mit n8n und ATS-Anbindung" },
      { path: "/ratgeber/recruiting-mit-n8n-automatisieren", label: "Recruiting mit n8n automatisieren" },
      { path: "/leistungen/voice-ai-agenten", label: "Voice-AI-Agenten und der Transparenzhinweis" },
    ],
  },
];

export function getRatgeber(path) {
  const item = RATGEBER.find((entry) => entry.path === path);
  if (!item) {
    throw new Error(`No Ratgeber content defined for "${path}"`);
  }
  return item;
}
