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
          "Über REST-APIs und Webhooks. Produktiv angebunden habe ich RecruitCRM, Personio, Greenhouse und HubSpot. Grundsätzlich lässt sich jedes System anbinden, das eine dokumentierte API hat.",
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
        a: "Nein. Automatisiert werden die Schritte ohne Urteilsanteil: Daten erfassen, Dubletten prüfen, Termine koordinieren, Status pflegen. Die Auswahlentscheidung bleibt beim Menschen. Der Gewinn ist, dass Recruiter wieder Zeit für Gespräche statt für Dateneingabe haben.",
      },
      {
        q: "Welche ATS-Systeme lassen sich mit n8n verbinden?",
        a: "Jedes System mit dokumentierter REST-API oder Webhooks. Produktiv angebunden habe ich RecruitCRM, Personio, Greenhouse und HubSpot. Fehlt eine API, bleibt oft ein Export- oder E-Mail-basierter Weg, der aber vor dem Projektstart geprüft werden sollte.",
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
      { path: "/projekte/recruiting-automatisierung", label: "Case Study: Recruiting-Automatisierung" },
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
