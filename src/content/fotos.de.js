/* Fotos mit freier Lizenz, seit dem 07.11.2026 auf Wunsch des Inhabers.

   Alle von Unsplash unter der Unsplash-Lizenz (https://unsplash.com/de/lizenz):
   kostenlose Nutzung auch kommerziell, ohne Erlaubnis und ohne Pflicht zur
   Namensnennung. Geprüft auf der jeweiligen Fotoseite am 07.11.2026: als
   "Kostenloses Foto" markiert, keine Unsplash+-Aufnahme. Genannt werden die
   Urheber trotzdem, und jedes Bild heißt "Symbolfoto", damit niemand ein
   fremdes Foto für ein eigenes Projekt hält.

   Die Dateien liegen in public/bilder/, auf 2:1 zugeschnitten und als WebP in
   1600 und 800 px Breite. Die Versionsnummer im Namen erlaubt das lange
   Cache-Verbot in public/_headers: Ein neuer Zuschnitt bekommt einen neuen
   Namen. Ohne Bild-Import, weil die Build-Skripte diese Inhalte unter Node
   lesen. */

const foto = ({ name, alt, urheber, seite }) => ({
  art: "bild",
  src: `/bilder/${name}-v1-1600.webp`,
  srcSet: `/bilder/${name}-v1-800.webp 800w, /bilder/${name}-v1-1600.webp 1600w`,
  sizes: "(min-width: 1024px) 1100px, 100vw",
  width: 1600,
  height: 800,
  alt,
  urheber,
  seite,
  nachweis: `Symbolfoto: ${urheber}, Unsplash.`,
});

export const FOTO_KI_ASSISTENTEN = foto({
  name: "ki-assistenten",
  alt: "Hand hält ein Smartphone mit einem Ordner voller KI-Apps: Gemini, DeepSeek, Claude, ChatGPT",
  urheber: "Aerps.com",
  seite: "https://unsplash.com/de/fotos/hand-halt-ein-telefon-mit-ki-anwendungssymbolen-5Gv-6g_lu-Y",
});

export const FOTO_WORKSHOP = foto({
  name: "workshop",
  alt: "Mehrere Hände ordnen gelbe Haftnotizen auf einem Tisch",
  urheber: "FORTYTWO",
  seite: "https://unsplash.com/de/fotos/person-mit-gelben-haftnotizen-MDu-53qRVr4",
});

export const FOTO_SERVER = foto({
  name: "server",
  alt: "Server-Rack mit Netzwerkkabeln in einem Serverraum",
  urheber: "Kevin Ache",
  seite: "https://unsplash.com/de/fotos/ein-server-rack-in-einem-serverraum-2JJ3wBHu4_0",
});

export const FOTO_ENTWURF = foto({
  name: "entwurf",
  alt: "Handgezeichnete Skizzen einer Website auf Papier, daneben ein Stift",
  urheber: "Compagnons",
  seite: "https://unsplash.com/de/fotos/website-drahtgitterskizzen-auf-papier-4UGmm3WRUoQ",
});
