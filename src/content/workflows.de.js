/* Echte Workflows aus der Praxis, gezeichnet im Stil des n8n-Editors.

   Vereinfacht, aber nicht erfunden: Knoten, Reihenfolge und Mengen entsprechen
   dem Workflow der KI-Vorqualifizierung in der n8n-Instanz der TOPEOPLE Group,
   gelesen am 28.10.2026 und vom Inhaber freigegeben. Zusammengefasst sind nur
   Hilfsknoten (Felder setzen, Warten), die im Editor zwischen diesen Schritten
   liegen und nichts erklären.

   Positionen stehen in Rasterkoordinaten: `spalte` ist die Reihenfolge im
   Ablauf, `zeile` die Abweichung davon (Zweige einer Weiche). Die Komponente
   rechnet daraus die waagerechte Fassung für breite Bildschirme und die
   senkrechte für das Telefon, damit nichts klein gerechnet werden muss.

   Ohne JSX, mit .js-Endung: leistungen.de.js importiert diese Datei, und die
   wird von den Build-Skripten unter Node gelesen. */

export const WORKFLOW_VORQUALIFIZIERUNG = {
  titel: "KI-Vorqualifizierung",
  /* Für Screenreader: die Grafik als Satz. */
  beschreibung:
    "n8n-Workflow in sechs Schritten: Ein Zeitplan startet ihn zwischen 7 und 21 Uhr alle vier Minuten, er holt neue Kandidaten aus dem ATS, ruft sie über Twilio mit einer Stimme von ElevenLabs an und prüft, ob jemand abgenommen hat. Wenn ja, wertet GPT das Gespräch aus und das Ergebnis landet beim Kandidaten im ATS, rund 1.900 Mal im Monat. Wenn nein, folgt bis zu fünfmal ein neuer Versuch.",
  knoten: [
    { id: "zeitplan", art: "ausloeser", icon: "uhr", label: "Alle 4 Minuten", sub: "7 bis 21 Uhr", spalte: 0, zeile: 0 },
    { id: "kandidaten", icon: "personen", label: "Neue Kandidaten", sub: "aus dem ATS", spalte: 1, zeile: 0 },
    { id: "anruf", icon: "telefon", label: "KI-Anruf", sub: "Twilio, ElevenLabs", spalte: 2, zeile: 0 },
    { id: "erreicht", art: "weiche", icon: "weiche", label: "Erreicht?", spalte: 3, zeile: 0 },
    { id: "auswerten", icon: "funken", label: "Auswerten", sub: "GPT", spalte: 4, zeile: -0.6 },
    { id: "ats", icon: "datenbank", label: "Ins ATS", sub: "beim Kandidaten", spalte: 5, zeile: -0.6 },
    { id: "erneut", icon: "wiederholen", label: "Neuer Versuch", sub: "bis zu 5-mal", spalte: 4, zeile: 0.6 },
  ],
  kanten: [
    { von: "zeitplan", nach: "kandidaten" },
    { von: "kandidaten", nach: "anruf" },
    { von: "anruf", nach: "erreicht" },
    { von: "erreicht", nach: "auswerten", ausgang: "ja" },
    { von: "erreicht", nach: "erneut", ausgang: "nein" },
    { von: "auswerten", nach: "ats", menge: "1.900 / Monat" },
  ],
};

/* Bewerbungseingang über das Formular auf der Website, rund 50 im Monat. Die
   Dublettenprüfung und das reihum Verteilen sind belegt; ob der Kandidat danach
   von der KI-Vorqualifizierung angerufen wird, hängt an deren eigenen Regeln
   und steht deshalb nicht als Kante hier. */
export const WORKFLOW_BEWERBUNG = {
  titel: "Bewerbungseingang",
  beschreibung:
    "n8n-Workflow: Eine Bewerbung über das Formular auf der Website startet ihn, rund 50 Mal im Monat. Er prüft, ob es den Kandidaten im ATS schon gibt. Wenn ja, aktualisiert er das vorhandene Profil, wenn nein, legt er es neu an und verteilt die Bewerbung reihum auf die Recruiter.",
  knoten: [
    { id: "formular", art: "ausloeser", icon: "globus", label: "Bewerbung", sub: "Website-Formular", spalte: 0, zeile: 0 },
    { id: "dublette", art: "weiche", icon: "kopie", label: "Schon im ATS?", spalte: 1, zeile: 0 },
    { id: "aktualisieren", icon: "aktualisieren", label: "Aktualisieren", sub: "vorhandenes Profil", spalte: 2, zeile: -0.6 },
    { id: "anlegen", icon: "person-neu", label: "Neu anlegen", sub: "im ATS", spalte: 2, zeile: 0.6 },
    { id: "verteilen", icon: "verteilen", label: "Recruiter", sub: "reihum zuweisen", spalte: 3, zeile: 0.6 },
  ],
  kanten: [
    { von: "formular", nach: "dublette", menge: "50 / Monat" },
    { von: "dublette", nach: "aktualisieren", ausgang: "ja" },
    { von: "dublette", nach: "anlegen", ausgang: "nein" },
    { von: "anlegen", nach: "verteilen" },
  ],
};

/* Vorstellung beim Kunden: aus dem Formular des Recruiters wird mit GPT eine
   Mail, die als Entwurf wartet, bis ein Mensch sie freigibt. Die Freigabe ist
   kein n8n-Knoten, sondern ein Mensch, und so ist sie gezeichnet. */
export const WORKFLOW_VORSTELLUNG = {
  titel: "KI-Vorstellungsmail",
  beschreibung:
    "n8n-Workflow: Nach dem Gespräch füllt der Recruiter das Qualifizierungsformular aus, daraus werden rund 30 Felder im ATS. GPT schreibt die Vorstellungsmail an den Kunden, ohne Gehalt, Geburtsdatum und Kontaktdaten, der Lebenslauf wird angehängt, und die Mail liegt als Entwurf in Outlook. Verschickt wird sie erst, wenn der Recruiter sie freigibt, rund 300 Mal im Monat.",
  knoten: [
    { id: "formular", art: "ausloeser", icon: "formular", label: "Formular", sub: "nach dem Gespräch", spalte: 0, zeile: 0 },
    { id: "felder", icon: "datenbank", label: "30 Felder", sub: "ins ATS", spalte: 1, zeile: 0 },
    { id: "schreiben", icon: "funken", label: "Mail schreiben", sub: "GPT, ohne Gehalt", spalte: 2, zeile: 0 },
    { id: "anhang", icon: "anhang", label: "Lebenslauf", sub: "anhängen", spalte: 3, zeile: 0 },
    { id: "entwurf", icon: "mail", label: "Entwurf", sub: "in Outlook", spalte: 4, zeile: 0 },
    { id: "freigabe", art: "mensch", icon: "person-ok", label: "Freigabe", sub: "durch den Recruiter", spalte: 5, zeile: 0 },
  ],
  kanten: [
    { von: "formular", nach: "felder" },
    { von: "felder", nach: "schreiben" },
    { von: "schreiben", nach: "anhang" },
    { von: "anhang", nach: "entwurf" },
    { von: "entwurf", nach: "freigabe", menge: "300 / Monat" },
  ],
};

/* Lebenslauf im Firmenlayout. Gestartet über ein Häkchen am Kandidaten im ATS
   (RecruitCRM-Checkboxen lösen dort Automationen aus, gelesen am 28.10.2026).
   Kleine Menge, deshalb keine Zahl an der Kante. */
export const WORKFLOW_LEBENSLAUF = {
  titel: "Lebenslauf im Firmenlayout",
  beschreibung:
    "n8n-Workflow: Ein Häkchen am Kandidaten im ATS startet ihn. Er liest den Lebenslauf, auch eingescannte Unterlagen per Texterkennung, GPT ordnet die Angaben, daraus entsteht der Lebenslauf im Firmenlayout als PDF und Word, und der landet wieder beim Kandidaten im ATS.",
  knoten: [
    { id: "haken", art: "ausloeser", icon: "checkbox", label: "Häkchen im ATS", sub: "Lebenslauf erstellen", spalte: 0, zeile: 0 },
    { id: "lesen", icon: "scan", label: "Lesen", sub: "PDF, Word oder Scan", spalte: 1, zeile: 0 },
    { id: "ordnen", icon: "funken", label: "Angaben ordnen", sub: "GPT", spalte: 2, zeile: 0 },
    { id: "layout", icon: "vorlage", label: "Firmenlayout", sub: "PDF und Word", spalte: 3, zeile: 0 },
    { id: "ats", icon: "datenbank", label: "Zurück ins ATS", sub: "beim Kandidaten", spalte: 4, zeile: 0 },
  ],
  kanten: [
    { von: "haken", nach: "lesen" },
    { von: "lesen", nach: "ordnen" },
    { von: "ordnen", nach: "layout" },
    { von: "layout", nach: "ats" },
  ],
};

/* Der Abgleich zwischen HubSpot und RecruitCRM, wie er bis zur Ablösung von
   HubSpot lief, vereinfacht nach dem, was der Lebenslauf belegt (Rate-Limit-
   und Retry-Strategien). Ohne n8n-Schalter gezeichnet, weil nicht belegt ist,
   dass der ganze Abgleich ein einzelner n8n-Workflow war. */
export const WORKFLOW_HUBSPOT = {
  titel: "HubSpot und RecruitCRM im Abgleich",
  fenster: "app",
  beschreibung:
    "Abgleich zwischen HubSpot und RecruitCRM, bis HubSpot durch die eigene Plattform abgelöst wurde: Eine Änderung an einem Lead, Kontakt oder Deal in HubSpot startet ihn, die Felder werden auf RecruitCRM übertragen. Greift das Rate-Limit der Schnittstelle, wartet der Abgleich und versucht es erneut, sonst wird RecruitCRM aktualisiert.",
  knoten: [
    { id: "hubspot", art: "ausloeser", icon: "aktualisieren", label: "Änderung", sub: "in HubSpot", spalte: 0, zeile: 0 },
    { id: "zuordnen", icon: "tauschen", label: "Felder zuordnen", sub: "Lead, Kontakt, Deal", spalte: 1, zeile: 0 },
    { id: "limit", art: "weiche", icon: "weiche", label: "Rate-Limit?", spalte: 2, zeile: 0 },
    { id: "warten", icon: "sanduhr", label: "Warten", sub: "und erneut", spalte: 3, zeile: -0.6 },
    { id: "recruitcrm", icon: "datenbank", label: "RecruitCRM", sub: "aktualisiert", spalte: 3, zeile: 0.6 },
  ],
  kanten: [
    { von: "hubspot", nach: "zuordnen" },
    { von: "zuordnen", nach: "limit" },
    { von: "limit", nach: "warten", ausgang: "ja" },
    { von: "limit", nach: "recruitcrm", ausgang: "nein" },
  ],
};

/* Der Buchungsablauf von Phoenix Parkservice, 07/2024 bis 09/2025, aus der
   Fallstudie. Eine Anwendung, kein n8n-Workflow, deshalb ohne Schalter. Die
   Flugdaten kommen als zweiter Eingang dazu. */
export const WORKFLOW_PHOENIX = {
  titel: "Buchungsablauf Phoenix Parkservice",
  fenster: "app",
  beschreibung:
    "Ablauf der Buchungsplattform für Phoenix Parkservice: Der Kunde bucht als Gast oder mit Kundenkonto, der Preis ergibt sich aus der Parkdauer, gezahlt wird über Mollie, die Bestätigung geht per E-Mail oder SMS hinaus, und das Team sieht die Buchung in der Tagesübersicht, zusammen mit der aktuellen Landezeit des Rückflugs aus der Flugdaten-Schnittstelle.",
  knoten: [
    { id: "buchung", art: "ausloeser", icon: "kalender", label: "Buchung", sub: "Gast oder Konto", spalte: 0, zeile: 0 },
    { id: "preis", icon: "rechner", label: "Preis", sub: "aus der Parkdauer", spalte: 1, zeile: 0 },
    { id: "zahlung", icon: "karte", label: "Zahlung", sub: "Mollie", spalte: 2, zeile: 0 },
    { id: "bestaetigung", icon: "mail-ok", label: "Bestätigung", sub: "E-Mail oder SMS", spalte: 3, zeile: 0 },
    { id: "uebersicht", icon: "liste", label: "Tagesübersicht", sub: "für das Team", spalte: 4, zeile: 0 },
    /* Eine Spur tiefer als eine volle Zeile, sonst berührt der Knoten die
       zweizeilige Beschriftung von "Bestätigung" direkt darüber. */
    { id: "flug", art: "ausloeser", icon: "landung", label: "Flugdaten", sub: "aktuelle Landezeit", spalte: 3, zeile: 1.35 },
  ],
  kanten: [
    { von: "buchung", nach: "preis" },
    { von: "preis", nach: "zahlung" },
    { von: "zahlung", nach: "bestaetigung" },
    { von: "bestaetigung", nach: "uebersicht" },
    { von: "flug", nach: "uebersicht" },
  ],
};

/* LinkedIn-Automatisierung, wie sie die Leistungsseite beschreibt: je Profil
   eine Persona, ein Themenpool und ein Zeitplan; ohne Kennzeichnung wird nichts
   veröffentlicht. Ohne n8n-Schalter, weil die Seite das Werkzeug nicht nennt. */
export const WORKFLOW_LINKEDIN = {
  titel: "LinkedIn-Beiträge je Profil",
  fenster: "app",
  beschreibung:
    "Ablauf der LinkedIn-Automatisierung: Ein Zeitplan je Profil startet ihn, ein Thema kommt aus dem eigenen Pool, der Beitrag entsteht in der Stimme der Persona, ein Bild wird erzeugt und als KI-Inhalt gekennzeichnet, in den Metadaten und sichtbar im Bild. Nur gekennzeichnete Beiträge werden veröffentlicht, sonst stoppt der Lauf.",
  knoten: [
    { id: "zeitplan", art: "ausloeser", icon: "kalender", label: "Zeitplan", sub: "je Profil", spalte: 0, zeile: 0 },
    { id: "thema", icon: "liste", label: "Thema", sub: "aus dem Pool", spalte: 1, zeile: 0 },
    { id: "beitrag", icon: "stift", label: "Beitrag", sub: "Stimme der Persona", spalte: 2, zeile: 0 },
    { id: "kennzeichnen", icon: "schild", label: "Kennzeichnen", sub: "Metadaten und Bild", spalte: 3, zeile: 0 },
    { id: "geprueft", art: "weiche", icon: "weiche", label: "Gekennzeichnet?", spalte: 4, zeile: 0 },
    { id: "posten", icon: "senden", label: "Veröffentlichen", sub: "auf LinkedIn", spalte: 5, zeile: -0.6 },
    { id: "stopp", icon: "stopp", label: "Stopp", sub: "nichts geht raus", spalte: 5, zeile: 0.6 },
  ],
  kanten: [
    { von: "zeitplan", nach: "thema" },
    { von: "thema", nach: "beitrag" },
    { von: "beitrag", nach: "kennzeichnen" },
    { von: "kennzeichnen", nach: "geprueft" },
    { von: "geprueft", nach: "posten", ausgang: "ja" },
    { von: "geprueft", nach: "stopp", ausgang: "nein" },
  ],
};

/* Entscheidungsbaum zum BFSG für Websites, aus dem Ratgeber Barrierefreie
   Website (Gesetzestext am 27.10.2026 gelesen): § 1 Abs. 3 (Dienstleistungen für
   Verbraucher), § 2 Nr. 26 (Vertragsabschluss im elektronischen
   Geschäftsverkehr), § 3 Abs. 3 mit § 2 Nr. 17 (Ausnahme für Kleinstunternehmen,
   nur bei Dienstleistungen). Kein Workflow, sondern eine Prüfung, deshalb ohne
   Häkchen und ohne n8n-Schalter. Keine Rechtsberatung, der Ratgeber sagt das. */
export const ENTSCHEIDUNG_BFSG = {
  titel: "Bin ich betroffen? Websites nach dem BFSG",
  art: "entscheidung",
  fenster: "app",
  beschreibung:
    "Entscheidungsbaum nach dem Barrierefreiheitsstärkungsgesetz für Websites. Erste Frage: Richtet sich das Angebot an Verbraucher? Wenn nein, ist es nicht betroffen. Zweite Frage: Können Verbraucher über die Website einen Vertrag abschließen, etwa in einem Onlineshop oder bei einer Online-Buchung? Wenn nein, ist die Seite in der Regel nicht betroffen. Dritte Frage: Ist das Unternehmen ein Kleinstunternehmen mit weniger als zehn Beschäftigten und höchstens 2 Millionen Euro Jahresumsatz oder Jahresbilanzsumme? Wenn ja, ist es bei Dienstleistungen ausgenommen, wenn nein, ist es betroffen, seit dem 28. Juni 2025.",
  knoten: [
    { id: "website", art: "ausloeser", icon: "geraet", label: "Ihre Website", sub: "Shop, Buchung, Infoseite", spalte: 0, zeile: 0 },
    { id: "verbraucher", art: "weiche", icon: "personen", label: "An Verbraucher?", spalte: 1, zeile: 0 },
    { id: "nurb2b", icon: "firma", ton: "erfolg", label: "Nicht betroffen", sub: "nur an Unternehmen", spalte: 2, zeile: 1 },
    { id: "vertrag", art: "weiche", icon: "formular", label: "Vertrag online?", spalte: 2, zeile: 0 },
    { id: "infoseite", icon: "info", ton: "erfolg", label: "In der Regel nicht", sub: "reine Infoseite", spalte: 3, zeile: 1 },
    { id: "klein", art: "weiche", icon: "weiche", label: "Kleinstunternehmen?", spalte: 3, zeile: 0 },
    { id: "ausgenommen", icon: "schild", ton: "erfolg", label: "Ausgenommen", sub: "bei Dienstleistungen", spalte: 4, zeile: -0.6 },
    { id: "betroffen", icon: "warnung", ton: "warm", label: "Betroffen", sub: "seit 28.06.2025", spalte: 4, zeile: 0.6 },
  ],
  kanten: [
    { von: "website", nach: "verbraucher" },
    { von: "verbraucher", nach: "vertrag", ausgang: "ja" },
    { von: "verbraucher", nach: "nurb2b", ausgang: "nein" },
    { von: "vertrag", nach: "klein", ausgang: "ja" },
    { von: "vertrag", nach: "infoseite", ausgang: "nein" },
    { von: "klein", nach: "ausgenommen", ausgang: "ja" },
    { von: "klein", nach: "betroffen", ausgang: "nein" },
  ],
};

/* Entscheidungsbaum aus dem Ratgeber "n8n, Make und Zapier im Vergleich",
   vereinfacht nach dessen drei Abschnitten: n8n, wenn die Daten im Haus
   bleiben müssen oder bei komplexer Logik und hohem Volumen; Zapier, wenn zwei
   bekannte Programme schnell und ohne Entwicklung verbunden werden sollen;
   Make, wenn der visuelle Aufbau zählt und die Abläufe eher breit als tief
   sind. Kein Workflow, sondern eine Prüfung: ohne Häkchen und Schalter. Die
   Endknoten tragen das Zeichen des Werkzeugs, so wie ein Knoten im n8n-Editor
   das Zeichen seiner App trägt. */
export const ENTSCHEIDUNG_WERKZEUG = {
  titel: "Welches Werkzeug passt?",
  art: "entscheidung",
  fenster: "app",
  beschreibung:
    "Entscheidungshilfe zwischen n8n, Make und Zapier. Müssen die Daten im Haus bleiben, passt n8n, selbst gehostet. Sonst: Hat der Ablauf viele Schritte, eigene Logik oder hohes Volumen, passt n8n, in der Cloud oder selbst gehostet. Sonst: Sollen nur zwei bekannte Programme schnell und ohne Entwicklung verbunden werden, passt Zapier. Andernfalls passt Make, wenn der visuelle Aufbau zählt und die Abläufe eher breit als tief sind.",
  knoten: [
    { id: "ablauf", art: "ausloeser", icon: "liste", label: "Ihr Ablauf", spalte: 0, zeile: 0 },
    { id: "daten", art: "weiche", icon: "schild", label: "Daten im Haus?", sub: "DSGVO-sensibel", spalte: 1, zeile: 0 },
    { id: "selbst", marke: "n8n", label: "n8n", sub: "selbst gehostet", spalte: 2, zeile: -1.1 },
    { id: "umfang", art: "weiche", icon: "weiche", label: "Viel Logik?", sub: "Schritte, Volumen", spalte: 2, zeile: 0 },
    { id: "cloud", marke: "n8n", label: "n8n", sub: "Cloud oder selbst", spalte: 3, zeile: -1.1 },
    { id: "einfach", art: "weiche", icon: "tauschen", label: "Nur verbinden?", sub: "zwei Programme", spalte: 3, zeile: 0 },
    { id: "zapier", marke: "zapier", label: "Zapier", sub: "in Minuten fertig", spalte: 4, zeile: -0.6 },
    { id: "make", marke: "make", label: "Make", sub: "visuell, eher breit", spalte: 4, zeile: 0.6 },
  ],
  kanten: [
    { von: "ablauf", nach: "daten" },
    { von: "daten", nach: "selbst", ausgang: "ja" },
    { von: "daten", nach: "umfang", ausgang: "nein" },
    { von: "umfang", nach: "cloud", ausgang: "ja" },
    { von: "umfang", nach: "einfach", ausgang: "nein" },
    { von: "einfach", nach: "zapier", ausgang: "ja" },
    { von: "einfach", nach: "make", ausgang: "nein" },
  ],
};
