/* Messwerte, die als Grafik auf mehreren Seiten stehen.

   Lighthouse für maflats.de: am 26.08.2026 an der Live-Seite gemessen, mobil,
   dieselben Werte wie in der Fallstudie MA-Flats. Performance als Gesamtwert
   fehlt bewusst: gemessen und belegt ist der LCP, und der steht daneben mit
   seiner Messbedingung. Ohne .jsx und mit .js-Endung, weil leistungen.de.js
   diese Datei importiert und unter Node gelesen wird. */
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
