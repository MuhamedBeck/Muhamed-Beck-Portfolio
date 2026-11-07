// With the .js extension: prerender-meta.js and generate-sitemap.js import
// content files under bare node.
import { FESTPREIS, UST_KURZ, euro } from "./site.js";

/* Der Automatisierungs-Pilot: der bezahlte Einstieg, seit dem 07.11.2026.

   Warum es ihn gibt: Für Automatisierung gab es nur den Stundensatz und das
   kostenlose Erstgespräch, das fast jeder Anbieter verspricht. Wer zum ersten
   Mal automatisiert, will vorher wissen, was es kostet und was er bekommt.
   Die Einzel-Freelancer, die bei "n8n freelancer" vorn stehen, verkaufen
   genau so einen Einstieg zum Festpreis (Auswertung vom 07.11.2026).

   Der Umfang ist bewusst eng: ein Workflow, bis zu zwei angebundene Systeme.
   So bleibt der Preis haltbar, und der Kunde entscheidet danach mit echten
   Zahlen statt mit einem Konzeptpapier. Preis in site.js (FESTPREIS.pilot). */
export const PILOT = {
  slug: "pilot",
  name: "Automatisierungs-Pilot",
  kontaktLabel: "Automatisierungs-Pilot zum Festpreis",
  preis: FESTPREIS.pilot,
  kurz: `Ein Workflow als Pilot, zum Festpreis von ${euro(FESTPREIS.pilot)}`,
  text: "Ein klar umrissener Ablauf, automatisiert und mit Ihren echten Daten getestet, bevor Sie mehr investieren. Danach entscheiden Sie mit Zahlen aus dem Betrieb, ob und wie es weitergeht.",
  enthalten: [
    "Aufnahme des Ablaufs: was der Workflow tut und woran Sie den Erfolg messen",
    "Ein Workflow in n8n mit bis zu zwei angebundenen Systemen, auf Wunsch mit einem KI-Schritt für eine Aufgabe, etwa eine Art von Dokument auslesen",
    "Fehlerbehandlung mit Benachrichtigung, damit nichts unbemerkt liegen bleibt",
    "Test mit Ihren echten Daten und Abnahme durch Sie",
    "Übergabe mit kurzer Dokumentation; Konten und Zugänge laufen auf Ihren Namen",
    "30 Tage Fehlerbehebung nach der Abnahme, zusätzlich zu den gesetzlichen Mängelrechten",
  ],
  nichtEnthalten: [
    "Laufende Kosten der Anbieter, die Sie direkt zahlen: n8n Cloud ab 20 € im Monat bei jährlicher Zahlung, KI-Modelle nach Verbrauch",
    "Lizenzen der angebundenen Programme, falls deren Schnittstelle einen höheren Tarif verlangt",
    "Weitere Workflows und laufende Wartung; die vereinbaren wir danach nach Aufwand oder als eigenes Angebot",
  ],
  dauer: "Dauer: meist zwei bis vier Wochen, je nachdem, wie schnell Zugänge und Testdaten da sind.",
  ust: UST_KURZ,
};
