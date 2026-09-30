/**
 * Freigegebene Kundenstimmen.
 *
 * Das Feld `freigabe` ist kein Formalismus, sondern die Bedingung dafür, dass
 * ein Eintrag hier überhaupt stehen darf. Ein Zitat unter echtem Namen, das die
 * genannte Person so nie gesagt oder nie freigegeben hat, verletzt ihr
 * Persönlichkeitsrecht und ist zugleich eine irreführende Werbeaussage nach
 * § 5 UWG. Was hier steht, liegt schriftlich vor, mit Datum.
 *
 * Ein leeres Array ist deshalb der gültige Ausgangszustand und kein Mangel:
 * Die Komponente rendert dann nichts. Lieber keine Stimme als eine erfundene,
 * und lieber gar kein Abschnitt als ein Platzhalter, der so aussieht, als
 * fehle hier etwas.
 *
 * Bewusst ohne Review- oder AggregateRating-Auszeichnung im Schema: Google
 * untersagt strukturierte Bewertungen, die ein Anbieter über sich selbst
 * ausliefert. Die Stimme wirkt über den sichtbaren Text, nicht über Markup.
 *
 * @typedef {object} Stimme
 * @property {string} zitat    Wortlaut wie freigegeben. Nicht nachträglich glätten.
 * @property {string} name     Vollständiger Name, Schreibweise wie im Impressum
 *                             des Kunden.
 * @property {string} rolle    Funktion, damit das Zitat einer Entscheidung
 *                             zuzuordnen ist.
 * @property {string} firma    Rechtsträger oder Marke, je nachdem, worunter die
 *                             Person öffentlich auftritt.
 * @property {string} [projekt] Pfad der zugehörigen Fallstudie. Damit erscheint
 *                             die Stimme auch dort, wo das Projekt beschrieben
 *                             ist.
 * @property {string} freigabe ISO-Datum der schriftlichen Freigabe.
 * @property {{href: string, label: string}} [beleg] Wohin der Leser klicken
 *   kann, um die Aussage selbst zu prüfen. Eine Kundenstimme wirkt über
 *   Nachprüfbarkeit, nicht über Adjektive: Wer den Satz "sie ist sofort da"
 *   liest und die Seite in einem Klick aufrufen kann, glaubt ihn. Wer nur den
 *   Satz liest, glaubt ihn nicht.
 */

/** @type {Stimme[]} */
export const STIMMEN = [
  {
    zitat:
      "Ich habe selten jemanden erlebt, der so schnell versteht, worum es im Geschäft eigentlich geht. Muhamed hat nicht über Technik geredet, sondern gefragt, wer unsere Seite überhaupt benutzt: Monteure, die abends von der Baustelle aus eine Unterkunft suchen, häufig auf Polnisch oder Serbisch und selten mit gutem Netz. Für diese Leute war unsere alte Seite unbenutzbar. Die neue läuft in fünf Sprachen, deckt neun Standorte ab und ist sofort da statt nach ein paar Sekunden. Termin gehalten, nichts nachhalten müssen, keine Überraschung auf der Rechnung. Für uns ist das der Unterschied zwischen einer Anfrage und einem Abbruch, und ich würde ihn jederzeit wieder beauftragen.",
    name: "Philip Spielmann",
    /* "Gesellschafter" und nicht "Geschäftsführer": Eine eGbR hat keine
       Geschäftsführer, und das Impressum von maflats.de nennt ihn wörtlich
       "Die Gesellschafter Philip Spielmann und Edward Behrendt (jeder einzeln
       vertretungsberechtigt)". Wer das Zitat prüfen will, landet genau dort,
       und eine Bezeichnung, die von der Pflichtangabe des Kunden abweicht,
       entwertet die Stimme bei genau den Lesern, die sie überzeugen soll. */
    rolle: "Gesellschafter",
    firma: "Main-Apartments eGbR (MA-Flats)",
    projekt: "/projekte/maflats",
    beleg: { href: "https://maflats.de/", label: "maflats.de ansehen" },
    /* Wortlaut am 30.09.2026 schriftlich bestätigt, nachdem Philip die
       stärkere Fassung im Volltext vorgelegt bekommen hatte. Sein Hinweis,
       man dürfe ruhig deutlicher loben, war der Anlass dafür; freigegeben ist
       aber dieser Text und kein anderer. */
    freigabe: "2026-09-30",
  },
];
