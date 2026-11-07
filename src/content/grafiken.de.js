/* Messwerte, die als Grafik auf mehreren Seiten stehen.

   Lighthouse für maflats.de: am 26.08.2026 an der Live-Seite gemessen, mobil,
   dieselben Werte wie in der Fallstudie MA-Flats. Performance als Gesamtwert
   fehlt bewusst: gemessen und belegt ist der LCP, und der steht daneben mit
   seiner Messbedingung. Ohne .jsx und mit .js-Endung, weil leistungen.de.js
   diese Datei importiert und unter Node gelesen wird. */
import { FESTPREIS, euro } from "./site.js";

export const LIGHTHOUSE_MAFLATS = {
  titel: "maflats.de in Lighthouse, mobil",
  werte: [
    { label: "Barrierefreiheit", wert: 100 },
    { label: "SEO", wert: 100 },
    { label: "Best Practices", wert: 96 },
  ],
  lcp: { wert: "1,35 s", label: "bis der größte Inhalt steht", bedingung: "Slow 4G, vierfache CPU-Drosselung" },
  stand: "gemessen am 26.08.2026",
};

/* Marktspannen für Websites neben den eigenen Festpreisen, als Zeilen für die
   Grafik "Spannen". Eine Stelle für den Ratgeber Website-Kosten und die
   Leistungsseite Webentwicklung, damit beide dieselben Zahlen zeigen. Die
   Quellen sind am 13.10.2026 geprüft, Einzelheiten in site.js bei FESTPREIS. */
export const SPANNE_FIRMENWEBSITE = {
  label: "Firmen-Website",
  max: 20000,
  maxText: euro(20000),
  baender: [
    { von: 800, bis: 5000, text: "Freelancer 800 bis 5.000 €", ton: "leise" },
    { von: 3600, bis: 18000, text: "Agentur 3.600 bis 18.000 €", ton: "cyan" },
  ],
  marke: { wert: FESTPREIS.website, text: `mein Festpreis ab ${euro(FESTPREIS.website)}` },
};

export const SPANNE_RELAUNCH = {
  label: "Relaunch mit SEO-Migration",
  max: 20000,
  maxText: euro(20000),
  baender: [{ von: 8000, bis: 20000, text: "Markt 8.000 bis 20.000 €", ton: "leise" }],
  marke: { wert: FESTPREIS.relaunch, text: `mein Festpreis ab ${euro(FESTPREIS.relaunch)}` },
};
