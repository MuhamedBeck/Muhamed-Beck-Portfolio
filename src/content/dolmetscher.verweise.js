// Texte der IT-Seiten, die auf die Dolmetscher-Seite verweisen, und der
// Abschnitt „Website auf Arabisch“ für /leistungen/webentwicklung.
//
// Sie stehen hier statt in den Seiten, damit die Prüfung der geschützten
// Bezeichnungen in scripts/check-i18n.js sie mitliest. Die Registry wird nicht
// importiert; tests/it-verweise.test.js hält Pfad und Registry zusammen.
import { RATE_MAX, RATE_MIN } from "./site.js";

export const DOLMETSCHER_PFAD = "/dolmetscher-arabisch-frankfurt";

/* Ausgeschrieben, damit die Adresse auch im ausgedruckten Lebenslauf steht. */
export const DOLMETSCHER_ADRESSE = `muhamedbeck.com${DOLMETSCHER_PFAD}`;

/* Schließt auf /ueber-mich an den Satz „Ich spreche Deutsch, Englisch und
   Arabisch.“ an; `link` ist der verlinkte Teil. */
export const UEBER_MICH_VERWEIS = {
  vor: " Nebenberuflich arbeite ich außerdem als ",
  link: "Dolmetscher und Übersetzer für Arabisch",
  nach: " in Frankfurt.",
};

/* Letzter Punkt der Station Skalli im Lebenslauf. */
export const LEBENSLAUF_PUNKT = "Einsätze bei Polizei und Gerichten";

/* Satz unter der Station Skalli, davor der Text, dahinter die Adresse. */
export const LEBENSLAUF_VERWEIS = {
  text: "Termine und Preise für das Dolmetschen und Übersetzen:",
  adresse: DOLMETSCHER_ADRESSE,
  pfad: DOLMETSCHER_PFAD,
};

/* Jede Zeile der Tabelle lässt sich an den arabischen Seiten dieser Website
   nachprüfen: Leserichtung am Attribut dir im ausgelieferten HTML, Schrift in
   src/index.css (@font-face und die Regeln unter :lang(ar)), Beträge über
   preisText in site.js, Felder des Anfrageformulars der arabischen
   Dolmetscher-Seite, hreflang im Kopf jeder Fassung. */
export const WEBSITE_AUF_ARABISCH = {
  abbildung: {
    titel: "Website auf Arabisch",
    bild: {
      art: "tabelle",
      daten: {
        caption: "Was sich gegenüber der deutschen Fassung ändert",
        columns: ["Deutsche Fassung", "Arabische Fassung"],
        rows: [
          {
            label: "Leserichtung",
            cells: [
              "von links nach rechts",
              "von rechts nach links, schon im ausgelieferten HTML gesetzt; der Seitenaufbau spiegelt sich mit",
            ],
          },
          {
            label: "Schrift",
            cells: [
              "IBM Plex Sans und Space Grotesk",
              "IBM Plex Sans Arabic vom eigenen Server, etwas größer und mit mehr Zeilenabstand, ohne Zeichenabstand und ohne Silbentrennung",
            ],
          },
          {
            label: "Zahlen und Datum",
            cells: [
              "Preise mit dem Zeichen €",
              "Ziffern 0 bis 9, Preise mit dem Wort für Euro statt des Zeichens; Telefonnummer, Datum und Uhrzeit stehen als eigene Einheit von links nach rechts",
            ],
          },
          {
            label: "Formulare",
            cells: [
              "alle Felder von links nach rechts",
              "E-Mail und Telefon von links nach rechts, freie Felder richten sich nach der Eingabe",
            ],
          },
          {
            label: "Sprachverweise",
            cells: [
              "eine Adresse je Sprache",
              "eigene Adresse mit hreflang, damit Suchmaschinen die arabische Fassung arabischen Suchenden zeigen",
            ],
          },
        ],
      },
    },
    text: `Jede Zeile lässt sich an den arabischen Seiten dieser Website nachprüfen. Eine weitere Sprache läuft wie jede Erweiterung über den vereinbarten Umfang zu ${RATE_MIN} bis ${RATE_MAX}\u00A0€ pro Stunde.`,
  },
  leistung: "Arabische Fassung mit Leserichtung von rechts nach links, arabischer Schrift und eigenen Sprachverweisen",
  weiterlesen: { path: "/ar", label: "Die arabische Fassung dieser Website" },
};
