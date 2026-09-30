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
 */

/** @type {Stimme[]} */
export const STIMMEN = [];
