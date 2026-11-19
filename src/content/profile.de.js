// Die öffentlichen Profile des Inhabers, für die Seite /links.
//
// Aufgenommen wird nur, was gepflegt ist: Ein Profil, das einen alten Stand
// zeigt oder ins Leere führt, schadet mehr als eine kürzere Liste. Wer ein
// Profil ergänzt, prüft es vorher ohne Anmeldung, so wie ein Besucher es sieht.
//
// Die Adressen, die auch die Fußzeile und das sameAs im Schema brauchen, stehen
// in site.js und werden hier nur gelesen. Mit .js-Endung: tests/ importiert
// diese Datei unter bloßem node.
import { SOCIAL } from "./site.js";

export const PROFIL_SEITE = {
  label: "Profile",
  headline: "Profile und Portale",
  intro: "Hier finden Sie mich außerhalb dieser Website. Es sind die Profile, die ich selbst pflege.",
  schluss: "Am schnellsten erreichen Sie mich direkt.",
};

/**
 * @typedef {object} Profil
 * @property {string} name  Name des Portals, so wie es sich selbst schreibt.
 * @property {string} url   Öffentliche Adresse des Profils, nie die Bearbeitungsansicht.
 * @property {string} text  Ein Satz dazu, was ein Besucher dort findet.
 */

/** @type {Array<{ titel: string, profile: Profil[] }>} */
export const PROFIL_GRUPPEN = [
  {
    titel: "Netzwerk und Code",
    profile: [
      {
        name: "LinkedIn",
        url: SOCIAL.linkedin,
        text: "Werdegang und berufliches Netzwerk.",
      },
      {
        name: "GitHub",
        url: SOCIAL.github,
        text: "Öffentlicher Code, darunter der Quelltext dieser Website.",
      },
      {
        name: "n8n Community",
        url: "https://community.n8n.io/u/muhamedbeck",
        text: "Mein Konto im Forum der n8n-Nutzer.",
      },
    ],
  },
  {
    titel: "Freelancer-Portale",
    profile: [
      {
        name: "freelancermap",
        url: SOCIAL.freelancermap,
        text: "Profil mit Projekthistorie, Kenntnissen und Verfügbarkeit.",
      },
      {
        name: "freelance.de",
        url: "https://www.freelance.de/freelancer/433254-n8n-Experte-KI-Automatisierung-Webentwicklung",
        text: "Profil mit Berufserfahrung, Ausbildung und Stundensatz.",
      },
    ],
  },
];
