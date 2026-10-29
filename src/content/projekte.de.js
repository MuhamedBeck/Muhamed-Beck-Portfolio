// German case study content. Facts and metrics come from the owner's CV; for
// the two TOPEOPLE studies they come from the systems themselves (n8n, ATS,
// app repository, read 28.10.2026) and were cleared by the owner.

// `kind` separates paid engagements from the two theses. The homepage shows
// only the engagements, because someone evaluating a supplier is asking what
// was delivered for a client; /projekte shows everything.
import maflatsHell from "../assets/projekte/maflats-hell.webp";
import maflatsDunkel from "../assets/projekte/maflats-dunkel.webp";
import maflatsMobil from "../assets/projekte/maflats-mobil.webp";
import { FESTPREIS, euro } from "./site.js";
import { WORKFLOW_PHOENIX, WORKFLOW_VORQUALIFIZIERUNG } from "./workflows.de.js";
import { LIGHTHOUSE_MAFLATS } from "./grafiken.de.js";

/* Der Umzug der TOPEOPLE Group in die eigene Plattform, als Bild in der
   Fallstudie und auf der Projektkarte der Startseite. Eine Quelle für beide,
   damit der Stand (HubSpot abgelöst, der Rest geplant) nicht auseinanderläuft. */
const UMZUG_PLATTFORM = {
  label: "Vom Nebeneinander zur eigenen Plattform",
  beschreibung:
    "HubSpot für den Vertrieb ist abgelöst und läuft in der eigenen Plattform. RecruitCRM für das Recruiting soll als Nächstes folgen, Personio für die Personalabteilung zuletzt. Die Plattform hat 54 Nutzer, Stand Oktober 2026.",
  quellen: [
    { name: "HubSpot", bereich: "Vertrieb", status: "abgelöst", ton: "erfolg" },
    { name: "RecruitCRM", bereich: "Recruiting", status: "als Nächstes", ton: "warm" },
    { name: "Personio", bereich: "Personal", status: "zuletzt", ton: "leise" },
  ],
  ziel: { name: "Eigene Plattform", sub: "54 Nutzer, Stand Oktober 2026" },
};

/* `leistung` (optional, nur Mandate): die Leistungsseite, die dieses Projekt
   belegt. Die Fallstudie verlinkt dorthin und belegt das Kontaktformular mit
   genau dieser Leistung vor. Bis Oktober 2026 verlinkte keine Fallstudie auf
   eine Leistung, obwohl sie deren stärkster Beleg ist. prerender-meta.js prüft,
   dass jeder Pfad eine echte Leistung ist. */
export const PROJEKTE = [
  {
    path: "/projekte/maflats",
    kind: "mandat",
    leistung: { path: "/leistungen/webentwicklung", label: "Firmen-Website erstellen lassen und Relaunch" },
    /* Eigener Schluss: Der allgemeine fragt nach "ähnlichen Prozessen", und
       wer gerade diese Website gesehen hat, will eine Website. */
    cta: {
      headline: "Soll Ihre Website auch so schnell sein?",
      intro: `Schreiben Sie mir, was Ihre jetzige Seite nicht leistet, oder dass es noch keine gibt. Firmen-Websites baue ich zum Festpreis ab ${euro(FESTPREIS.website)}.`,
      button: "Website anfragen",
    },
    /* Kartenbild auf der Startseite (seit dem Entwurf vom 29.10.2026): je
       Kundenprojekt etwas Echtes zum Ansehen statt nur Titel und Zahlen. */
    karte: {
      art: "bild",
      src: maflatsHell,
      width: 1600,
      height: 1000,
      alt: "Startseite von maflats.de in der hellen Ansicht",
    },
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
    bild: {
      art: "lighthouse",
      label: "Gemessen mit Lighthouse",
      daten: LIGHTHOUSE_MAFLATS,
    },
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
      "Vor dem Website-Relaunch lief die Seite auf einem Baukasten und lud auf der Startseite rund 6 MB, davon fast 5 MB Hintergrundbilder. Für eine Vermietung, deren Anfragen überwiegend vom Telefon kommen, ist das die falsche Grundlage: Wer auf dem Bau steht und eine Unterkunft sucht, wartet nicht. Dazu kam die Sprachfrage, denn ein erheblicher Teil der Monteure spricht Polnisch, Slowenisch oder Serbisch.",
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
    leistung: { path: "/leistungen/recruiting-automatisierung", label: "Recruiting-Automatisierung mit n8n und ATS-Anbindung" },
    /* Eigener Schluss: Der allgemeine stand gleichlautend unter drei
       Fallstudien, und wer diese gelesen hat, fragt nach Recruiting. */
    cta: {
      headline: "Soll Ihr Recruiting auch so laufen?",
      intro: "Diese Case Study zeigt den Aufbau bei meinem Arbeitgeber. Schreiben Sie mir, mit welchem ATS und welchen Programmen Sie arbeiten: Sie bekommen innerhalb von 24 Stunden eine Einschätzung, was sich davon auf Ihr Recruiting übertragen lässt.",
      button: "Recruiting-Automatisierung anfragen",
    },
    karte: {
      art: "workflow",
      workflow: WORKFLOW_VORQUALIFIZIERUNG,
      ausschnitt: { klein: { bis: 2 }, gross: { bis: 3 } },
    },
    title: "Recruiting-Automatisierung mit n8n und KI-Telefonie",
    subtitle:
      "Bewerbungseingang, telefonische Vorqualifizierung und Vorstellung beim Kunden für die TOPEOPLE Group GmbH, eine Personalberatung in Frankfurt am Main",
    role: "AI Automation Manager, seit 09/2025",
    /* Am 29.10.2026 neu gefasst, mit Zahlen vom 28.10.2026 aus beiden
       n8n-Instanzen und dem ATS, vom Inhaber freigegeben. Die früheren Werte
       (-80 % Durchlaufzeit, ~90 % Automatisierungsgrad) hatten keine Messung
       dahinter und sind auf der ganzen Seite ersetzt. Mengen sind Monatswerte.
       Die Ausführungen sind aus rund 17 Tagen Aufbewahrung hochgerechnet und
       deshalb abgerundet, ebenso die Zahl der aktiven Workflows. Die Plattform
       hat seitdem eine eigene Fallstudie. */
    stats: [
      { value: "1.900", label: "KI-Anrufe im Monat", note: "automatisch ausgewertet, unter 1 % fehlgeschlagene Läufe" },
      { value: "~300", label: "Vorstellungen im Monat", note: "als fertiger Entwurf, verschickt erst nach Freigabe" },
      { value: "60+", label: "aktive n8n-Workflows", note: "über 40.000 Ausführungen im Monat" },
    ],
    /* Entwurf 29.10.2026: die Fallstudie hatte kein einziges Bild. Der
       Workflow aus content/workflows.de.js, dazu der wichtigste Vorher-Heute-
       Unterschied als Grafik über der Ergebnisliste. */
    bild: {
      art: "workflow",
      label: "Der Workflow in n8n",
      workflow: WORKFLOW_VORQUALIFIZIERUNG,
      text: "Vereinfacht: Hilfsknoten zwischen den Schritten sind zusammengefasst. Mengen pro Monat, Stand Oktober 2026.",
    },
    vergleich: {
      titel: "Erster Anruf nach einer Bewerbung",
      vorher: { label: "Vorher", text: "meist am selben Tag, von Hand" },
      heute: { label: "Heute", text: "nach wenigen Minuten, automatisch, zwischen 7 und 21 Uhr" },
      achse: ["Bewerbung geht ein", "Ende des Arbeitstags"],
    },
    ausgangslage:
      "Die TOPEOPLE Group ist eine Personalberatung in Frankfurt am Main, und jeden Monat kommen rund 1.400 neue Kandidaten in ihr ATS. Vor der Automatisierung rief ein Recruiter jeden davon selbst an, meist am selben Tag, und auch die Schritte danach liefen von Hand: die Antworten ins ATS übertragen, den Lebenslauf ins Firmenlayout bringen, die Vorstellung an den Kunden schreiben, absagen. Bei diesem Volumen frisst die Routine genau die Zeit, die ein Recruiter für die Gespräche braucht, die nur ein Mensch führen kann.",
    loesung: [
      "Telefonische Vorqualifizierung durch eine KI-Assistentin: Ein n8n-Workflow prüft zwischen 7 und 21 Uhr alle vier Minuten, ob neue Kandidaten im ATS sind, und startet den Anruf über Twilio mit einer Stimme von ElevenLabs. Wer nicht abnimmt, bekommt bis zu fünf weitere Versuche.",
      "GPT wertet jedes Gespräch aus und schreibt das Ergebnis direkt zum Kandidaten ins ATS.",
      "Aus dem Qualifizierungsformular des Recruiters entstehen rund 30 Felder im ATS und daraus die Vorstellungsmail an den Kunden. GPT schreibt sie, sie liegt mit Lebenslauf als Entwurf in Outlook und geht erst hinaus, wenn ein Mensch sie freigegeben hat.",
      "Datenschutz im Prompt: Gehalt, Geburtsdatum und Kontaktdaten des Kandidaten gelangen nicht in die Vorstellung an den Kunden.",
      "Lebenslauf im Firmenlayout als PDF oder Word per Klick, dank Texterkennung auch aus eingescannten Unterlagen.",
      "Bewerbungen über die Website landen mit Dublettenprüfung im ATS und werden reihum auf die Recruiter verteilt.",
      "Absagen gehen automatisch hinaus, je nach Stellenlage 500 bis 1.500 im Monat.",
      "Fehlerbehandlung in drei Stufen: 27 Fehler-Auslöser melden sich sofort in Slack, ein nächtlicher Abgleich prüft die Daten gegen das ATS, und einmal pro Woche kommt eine Fehlerübersicht.",
    ],
    /* Ergebnisse mit Zahl als Objekt (groß und farbig im Raster), der Rest als
       Satz. Die Zahlen ergänzen die Kennzahlen oben, statt sie zu wiederholen. */
    ergebnisse: [
      { wert: "< 1 %", text: "fehlgeschlagene Läufe bei rund 1.900 ausgewerteten KI-Anrufen im Monat", ton: "erfolg" },
      { wert: "300", text: "Vorstellungsmails im Monat als fertiger Entwurf; was an den Kunden geht, entscheidet weiterhin der Recruiter", ton: "akzent" },
      { wert: "500+", text: "Absagen im Monat, je nach Stellenlage bis 1.500, ohne Handarbeit verschickt", ton: "cyan" },
      { wert: "40.000+", text: "Ausführungen im Monat in über 60 aktiven Workflows", ton: "warm" },
      "Neue Kandidaten bekommen zwischen 7 und 21 Uhr wenige Minuten nach dem Eingang ihren ersten Anruf; vorher geschah das meist am selben Tag",
      "Die eigene CRM-Plattform, deren Entwicklung ich seit 03/2026 leite, übernimmt diese Abläufe nach und nach; dazu gibt es eine eigene Fallstudie",
    ],
    stack: [
      "n8n",
      "OpenAI",
      "ElevenLabs",
      "Twilio",
      "RecruitCRM",
      "Microsoft Outlook",
      "Slack",
      "Texterkennung (OCR)",
    ],
  },
  {
    path: "/projekte/crm-plattform-personalberatung",
    kind: "mandat",
    /* Seit dem 29.10.2026 eine eigene Fallstudie. Vorher war die Plattform ein
       Punkt der Recruiting-Fallstudie, samt TypeScript und GitLab, die es in
       diesem Projekt nie gab: Die App ist JavaScript (JSX) und liegt auf
       GitHub. Zahlen vom 28.10.2026 aus dem Repository, die 54 Nutzer vom
       Inhaber. Gebaut wird im Team; was Kollegen gebaut haben, steht hier
       nicht als seine Arbeit. RecruitCRM und Personio abzulösen ist ein Plan
       und steht deshalb als Plan da, nicht als Ergebnis.

       Die Zeile darunter bleibt einzeilig, aus demselben Grund wie bei Phoenix. */
    leistung: { path: "/leistungen/web-app-entwicklung", label: "Web-App und Buchungssystem entwickeln lassen" },
    cta: {
      headline: "Arbeiten Ihre Teams auch in mehreren Programmen nebeneinander?",
      intro: `Diese Case Study zeigt eine Plattform, die ich bei meinem Arbeitgeber im Team entwickle. Schreiben Sie mir, welche Programme bei Ihnen nebeneinander laufen und wo Daten doppelt gepflegt werden. Web-Apps entwickle ich zum Festpreis ab ${euro(FESTPREIS.webApp)}, Kundenportale ab ${euro(FESTPREIS.portal)}.`,
      button: "Web-App anfragen",
    },
    karte: { art: "plattform", daten: UMZUG_PLATTFORM },
    title: "Eigene CRM-Plattform für eine Personalberatung",
    subtitle:
      "Interne Web-App der TOPEOPLE Group GmbH für Vertrieb, Account Management und Recruiting, Frankfurt am Main",
    role: "Lead-Entwickler im Team, seit 03/2026",
    stats: [
      { value: "54", label: "Nutzer im Unternehmen", note: "Stand Oktober 2026" },
      { value: "16.000", label: "Leads aus HubSpot übernommen", note: "HubSpot ist seitdem abgelöst und gekündigt" },
      /* Ohne Tilde: "~10.000" ist bei 640 px breiter als seine Spalte. */
      { value: "10.000", label: "Anrufe im Monat", note: "rund, automatisch beim Kontakt im ATS protokolliert" },
    ],
    bild: {
      art: "plattform",
      label: "Der Umzug in eine Plattform",
      text: "Stand Oktober 2026. Abgelöst ist HubSpot; RecruitCRM und Personio abzulösen ist der Plan.",
      daten: UMZUG_PLATTFORM,
    },
    ausgangslage:
      "Bei der TOPEOPLE Group arbeitete jede Abteilung in ihrem eigenen Programm: der Vertrieb in HubSpot, die Personalabteilung in Personio, die Recruiter in RecruitCRM. Jedes System kostete eigene Lizenzen, keines war mit den anderen verbunden, und Abläufe, die es so nur in diesem Unternehmen gibt, ließen sich in keinem davon abbilden. Dazu kam der Wunsch, KI direkt in die tägliche Arbeit einzubauen. Das Ziel war ein Ort für alles, statt die Daten über mehrere Systeme zu verstreuen.",
    loesung: [
      "Eine eigene Web-App für das ganze Unternehmen, seit März 2026 im Team entwickelt; die Entwicklung leite ich. React 19 und Vite im Frontend, Supabase mit PostgreSQL als Datenbank, Serverfunktionen bei Vercel in Frankfurt. Auf dem Telefon lässt sie sich wie eine App installieren.",
      "Vertrieb: Anruflisten mit Lead-Scoring und Angebote mit elektronischer Unterschrift über DocuSeal. Die 16.000 Leads aus HubSpot habe ich in die Plattform übernommen, danach wurde HubSpot gekündigt.",
      "Account Management mit einem eingebauten KI-Assistenten auf Basis von OpenAI.",
      "Telefonie im Browser über Twilio, mit Live-Transkription. Jedes Gespräch wird automatisch beim Kandidaten oder Kontakt im ATS protokolliert, über eine Warteschlange, damit bei einem Ausfall kein Eintrag verloren geht.",
      "Eine Chrome-Erweiterung im Chrome Web Store, die Kandidaten und Vertriebskontakte per Klick aus LinkedIn, XING, Firmenseiten und Stellenanzeigen in die Plattform übernimmt.",
      "Kohorte, ein eigener Bereich für das Trainee-Programm des Unternehmens.",
      "Ein Sales-Board für das 85-Zoll-Display im Büro, als App für Samsungs Signage-System Tizen.",
      "Betrieb: Rechte je Rolle direkt in der Datenbank über Row Level Security, mit 17 Rollen von der Administration bis zu Kunden und Kandidaten in ihren Portalen; dazu über 90 geplante Hintergrundjobs, eine nächtliche Datenbanksicherung und automatisierte Tests mit Vitest und Playwright.",
      "Weitere Module wie Matching, Wiki und Team-Chat sind im Team entstanden. Die Punkte oben habe ich gebaut oder als Lead-Entwickler verantwortet.",
    ],
    ergebnisse: [
      { wert: "17", text: "Rollen, jede mit eigenen Rechten direkt in der Datenbank", ton: "akzent" },
      { wert: "90+", text: "geplante Hintergrundjobs halten die Daten zwischen den Systemen gleich", ton: "cyan" },
      { wert: "1 Klick", text: "holt Kandidaten und Kontakte aus LinkedIn, XING und Stellenanzeigen in die Plattform", ton: "warm" },
      { wert: "0 €", text: "Lizenzkosten für HubSpot, seit die Plattform den Vertrieb trägt", ton: "erfolg" },
      "54 Nutzer im Unternehmen, Stand Oktober 2026; die Teams ziehen Schritt für Schritt in die Plattform um",
      "HubSpot ist abgelöst und gekündigt, die 16.000 Leads sind übernommen",
      "Rund 10.000 Anrufe im Monat stehen ohne Nacharbeit beim richtigen Kontakt im ATS",
      "Die Recruiting-Workflows aus n8n ziehen nach und nach in die Plattform um. Als Nächstes soll RecruitCRM abgelöst werden, als letzter Schritt Personio; das ist der Plan, Stand Oktober 2026",
    ],
    stack: [
      "React 19",
      "Vite",
      "JavaScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Twilio",
      "Deepgram",
      "OpenAI",
      "Microsoft Graph",
      "DocuSeal",
      "Vitest",
      "Playwright",
      "Chrome-Erweiterung",
      "Tizen",
    ],
  },
  {
    path: "/projekte/phoenix-parkservice",
    kind: "mandat",
    /* Seit dem 13.10.2026 auf die Web-App-Seite statt auf GEO und SEO: Gebaut
       wurde hier vor allem eine Plattform, und die Web-App-Seite hatte sonst
       keinen Beleg aus einem Kundenmandat. Die GEO-Seite verlinkt diese
       Fallstudie weiter unter "Weiterlesen", der Beleg mit +35 % organischem
       Traffic bleibt von dort erreichbar.

       Die Zeile darunter bleibt einzeilig: prerender-meta.js liest diese
       Datei als Text und prüft jeden Leistungspfad per Suchmuster, und das
       greift nur auf diese Form. */
    leistung: { path: "/leistungen/web-app-entwicklung", label: "Web-App und Buchungssystem entwickeln lassen" },
    cta: {
      headline: "Sollen Ihre Buchungen auch über eine eigene Plattform laufen?",
      intro: `Schreiben Sie mir, wie Buchungen und Abläufe heute bei Ihnen laufen. Web-Apps und Buchungssysteme entwickle ich zum Festpreis ab ${euro(FESTPREIS.webApp)}.`,
      button: "Web-App anfragen",
    },
    karte: {
      art: "workflow",
      workflow: WORKFLOW_PHOENIX,
      ausschnitt: { klein: { ab: 2 }, gross: { ab: 1 } },
    },
    title: "Buchungsplattform und KI-SEO für Phoenix Parkservice",
    subtitle: "Eigene Website und Buchungssystem für einen Valet-Parkservice am Frankfurter Flughafen",
    role: "Software Engineer & AI-Driven Digital Lead (Freelance), 07/2024 bis 09/2025",
    /* Inhalt am 27.10.2026 mit dem Inhaber überarbeitet. Alles bezieht sich
       auf die Projektzeit 07/2024 bis 09/2025 und steht in der Vergangenheit:
       keine heutigen Rankings, keine Screenshots der Live-Seite, kein
       Live-Link. Die 35 % vergleichen die drei Monate nach dem Start der
       SEO-Automatisierung mit den drei Monaten davor, als die neue Website
       schon lief. Die frühere Aussage "statt über Zuruf" war falsch: Vorher
       liefen die Buchungen über das Portal eines Dritten. */
    stats: [
      { value: "+35%", label: "Organischer Traffic", note: "drei Monate nach dem Start der SEO-Automatisierung gegenüber den drei Monaten davor, Google Search Console" },
      { value: "15", label: "Monate", note: "leitende Entwicklung, 07/2024 bis 09/2025" },
      { value: "3", label: "Systeme", note: "Website, Kundenkonto, Mitarbeiterbereich" },
    ],
    bild: {
      art: "workflow",
      label: "Der Buchungsablauf",
      workflow: WORKFLOW_PHOENIX,
      text: "Vereinfacht, Stand der Projektzeit 07/2024 bis 09/2025.",
    },
    ausgangslage:
      "Phoenix Parkservice bietet Valet-Parken am Frankfurter Flughafen an: Kunden geben ihr Auto am Flughafen ab und bekommen es bei der Rückkehr dort zurück. Eine eigene Website hatte das Unternehmen nicht, Buchungen kamen ausschließlich über das Portal eines Dritten. Gebraucht wurden deshalb zwei Dinge: ein eigener Buchungsweg mit eigenem Überblick über Kunden und Termine, und Sichtbarkeit bei Google, damit Kunden direkt buchen. Der Weg dorthin war eine eigene Buchungsplattform aus Website und Buchungssystem, dazu KI-SEO, also Suchmaschinenoptimierung, bei der n8n Recherche, Texte und Veröffentlichung automatisiert.",
    loesung: [
      "Website und Buchungssystem selbst entwickelt: Spring Boot im Backend, Angular im Frontend, REST-Schnittstellen und eigenes Datenbankdesign.",
      "Buchung als Gast oder mit Kundenkonto, mit Reisedaten, Telefon- und Flugnummer; der Preis ergab sich automatisch aus der Parkdauer.",
      "Online-Zahlung über Mollie mit PayPal und Kreditkarte, Erstattungen bei Stornierung eingeschlossen, dazu eine Bestätigung per E-Mail oder SMS.",
      "Kundenkonto, in dem Kunden ihre Buchung selbst ändern oder stornieren konnten.",
      "Anbindung einer Flugdaten-Schnittstelle: Zur Rückflugnummer sah das Team die aktuelle Landezeit, damit die Rückgabe zur tatsächlichen Ankunft passte.",
      "Mitarbeiterbereich mit allen Buchungen und einer Tagesübersicht, wie viele Kunden an welchem Tag kommen, für Geschäftsführung und Team.",
      "KI-gestützte SEO- und GEO-Arbeit mit n8n: Keyword-Recherche, Texte und Veröffentlichung automatisiert; dazu Google Ads, Analytics und Tag Manager eingerichtet und ausgewertet.",
      "Auslieferung und Betrieb mit Docker und CI/CD-Pipelines.",
    ],
    ergebnisse: [
      "Ein eigener Buchungsweg: Kunden buchten direkt bei Phoenix, nicht mehr nur über das Portal eines Dritten",
      "Organischer Traffic in den drei Monaten nach dem Start der SEO-Automatisierung 35 Prozent höher als in den drei Monaten davor, gemessen in der Google Search Console",
      "Geschäftsführung und Team sahen täglich, wer kommt und wann der jeweilige Rückflug landet",
      "Änderungen und Stornierungen erledigten Kunden selbst im Kundenkonto, Zahlung und Erstattung liefen über Mollie",
      "SEO-Arbeit durch n8n-Workflows systematisiert statt punktuell betrieben",
      "Auslieferung automatisiert statt von Hand gepflegter Server",
    ],
    stack: [
      "Spring Boot",
      "Angular",
      "Java",
      "REST",
      "Mollie",
      "Docker",
      "CI/CD",
      "n8n",
      "Google Ads",
      "Google Analytics",
      "Google Tag Manager",
    ],
  },
  {
    path: "/projekte/llm-unit-test-automatisierung",
    kind: "abschlussarbeit",
    title: "Unit-Tests automatisch erzeugen mit einem LLM",
    subtitle:
      "Masterarbeit bei der INFOMOTION GmbH: ein Maven-Plugin, mit dem sich Unit-Tests für Java-Spring-Boot-Projekte automatisch erzeugen lassen",
    role: "Masterarbeit und Full-Stack Developer, 02/2022 bis 10/2024",
    stats: [
      { value: "9 → 42 %", label: "Testabdeckung", note: "mit JaCoCo gemessen" },
      { value: "1.440 → 30 min", label: "Schreibaufwand", note: "je Projekt, gegenüber manueller Entwicklung" },
      { value: "2,13 €", label: "pro Testsuite", note: "statt rund 566 € Entwicklerzeit" },
    ],
    bild: {
      art: "balken",
      label: "Vorher und nachher",
      daten: {
        art: "vergleich",
        zeilen: [
          { label: "Testabdeckung", max: 100, vorher: { wert: 9, text: "9 %" }, nachher: { wert: 42, text: "42 %" } },
          { label: "Schreibaufwand je Projekt", vorher: { wert: 1440, text: "1.440 min" }, nachher: { wert: 30, text: "30 min" } },
          { label: "Kosten je Testsuite", vorher: { wert: 566, text: "rund 566 €" }, nachher: { wert: 2.13, text: "2,13 €" } },
        ],
        quelle: "Gemessen in drei Kundenprojekten: Testabdeckung mit JaCoCo, Aufwand gegenüber manueller Entwicklung, Kosten als Entwicklerzeit gegenüber API-Kosten.",
      },
    },
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
      "Die Testabdeckung stieg über die untersuchten Projekte von 9 auf 42 Prozent, gemessen mit JaCoCo",
      "Der Schreibaufwand für Tests sank je Projekt von 1.440 auf 30 Minuten gegenüber manueller Entwicklung",
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
      "Bachelorarbeit bei der INFOMOTION GmbH: SAP-BusinessObjects-Berichte als 3D-Diagramme im Browser, dazu eine Befragung von 81 Personen in deutschen Unternehmen",
    role: "Bachelorarbeit, 2022",
    stats: [
      { value: "81", label: "Befragte", note: "in deutschen Unternehmen" },
      { value: "59%", label: "fehlendes Wissen", note: "meistgenannte Hürde" },
      { value: "50+", label: "Bilder pro Sekunde", note: "im Browser gerendert" },
    ],
    bild: {
      art: "balken",
      label: "Was Unternehmen bremst",
      daten: {
        art: "liste",
        max: 100,
        titel: "Meistgenannte Hürden für AR im Reporting",
        zeilen: [
          { label: "Fehlendes Wissen", wert: 59, text: "59 %", ton: "warm" },
          { label: "Fehlende Anwendungsfälle", wert: 41, text: "41 %", ton: "akzent" },
        ],
        quelle: "Befragung von 81 Personen in deutschen Unternehmen, Bachelorarbeit 2022.",
      },
    },
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
