// Identity and contact details, in one place.
//
// These strings were previously repeated across the navbar, footer, hero,
// contact section, hire form, legal pages and three JSON-LD blocks. That is a
// problem beyond tidiness: an LLM or a search engine confirms that a person,
// a profile and a business are the same entity by matching these values against
// each other and against LinkedIn, GitHub and directory listings. Inconsistent
// spellings are the usual reason an assistant cannot answer "who is X".
//
// Keep byte-identical with the Impressum and with every external profile.

export const PERSON = {
  name: "Muhamed Nur Beck",
  shortName: "Muhamed Beck",
  jobTitles: ["AI Automation Manager", "Full-Stack Developer"],
  employer: "TOPEOPLE Group GmbH",
  city: "Frankfurt am Main",
  region: "Hessen",
  countryCode: "DE",
};

export const CONTACT = {
  email: "muhamed@muhamedbeck.com",
  // E.164 for tel: hrefs and schema; the display form is separate so the
  // markup and the structured data cannot drift apart.
  phone: "+4917666008485",
  phoneDisplay: "+49 176 66008485",
};

/**
 * mailto-Verweis mit Betreff.
 *
 * Der Betreff ist die einzige Herkunftsangabe, die eine Mail von dieser Seite
 * mitbringt. Die Adresse steht auch auf LinkedIn und in den Verzeichnissen,
 * und Mails von dort tragen ihn nicht. So lässt sich im Posteingang ohne jedes
 * Tracking unterscheiden, woher eine Anfrage kam. Im Oktober 2026 kamen die
 * ersten beiden Anfragen per Mail, und niemand konnte das sagen.
 *
 * Bewusst nicht im Impressum und in der Datenschutzerklärung verwendet: Eine
 * rechtliche Mitteilung ist keine Anfrage.
 *
 * @param {string} [betreff] Aus ui.mailBetreff der jeweiligen Sprache.
 */
export const mailtoHref = (betreff) =>
  `mailto:${CONTACT.email}${betreff ? `?subject=${encodeURIComponent(betreff)}` : ""}`;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/muhamed-nur-beck",
  // Without www: github.com answers www.github.com with a 301, which Ahrefs
  // reported as a link to a redirect on every page.
  github: "https://github.com/MuhamedBeck",
};

/** Everything a search engine should be able to confirm is the same person. */
export const SAME_AS = [
  SOCIAL.linkedin,
  SOCIAL.github,
  /* Öffentliches Profil, am 07.10.2026 geprüft: erreichbar ohne Anmeldung und
     index,follow. Nicht /profile/307578/form, das ist die Bearbeitungsansicht
     und leitet Fremde zum Login.

     GULP fehlt hier bewusst. Das Profil dort ist öffentlich, zeigt aber keinen
     Namen (GULP anonymisiert für Nicht-Kunden) und trägt noindex. Ein sameAs
     soll belegen, dass dort dieselbe Person steht; eine Seite ohne Namen kann
     das nicht. */
  "https://www.freelancermap.de/profil/muhamed-nur-beck",
];

// The hourly rate, in one place. Every page, FAQ, guide, llms.txt and the
// ProfessionalService priceRange (injected by prerender-meta.js) reads these
// two numbers; before 26.10.2026 the range stood as text in some thirty places.
// 90 to 135 € until 26.10.2026, lowered at the owner's request. The
// Freelancer-Kompass 2026 puts the DACH median for IT freelancers at 95 € and
// for software and web at 90 €; 80 to 120 € sits around both.
export const RATE_MIN = 80;
export const RATE_MAX = 120;

export const RATE_TEXT = `${RATE_MIN} bis ${RATE_MAX} € nach Absprache und je nach Projektumfang`;
// English rendering of the same rate, so the English pages do not print a
// German sentence at a reader.
export const RATE_TEXT_EN = `${RATE_MIN} to ${RATE_MAX} € by agreement, depending on project scope`;
// Arabic deliberately does not get a third suffix here. Its rate sentence lives
// with the rest of its page copy in src/content/ar.js, the way the Arabic case
// studies live in projects.ar.js: a suffix per locale stops scaling at three,
// and a translated sentence sitting far from the page that renders it is how
// translations drift.

/* Festpreise für Webprojekte, netto für Unternehmen, am 13.10.2026 mit dem
   Inhaber festgelegt. Marktrahmen laut Anbieterseiten, also keine neutrale
   Erhebung, am selben Tag an den Quellen geprüft:
   - Firmen-Website: Freelancer 800 bis 5.000 €, Agentur 3.600 bis 18.000 €
     (RHEINSPACE, Stand 06/2026); Agentur mit 5 bis 10 Seiten 5.000 bis
     12.000 € (Adfera, Stand 10/2026).
   - Relaunch mit SEO-Migration: 8.000 bis 20.000 € (Adfera, Stand 10/2026).
   - Buchungssystem: erste Version ab 10.000 €, mit Schnittstellen ab
     20.000 € (Shopboostr, 02/2026).
   - Kundenportal: 25.000 bis 150.000 € (CodeGuides, abgerufen 10/2026).
   Seitdem zweimal auf Wunsch des Inhabers gesenkt: am 13.10.2026 von 4.900,
   6.900, 15.000 und 25.000 € um rund 25 %, am 26.10.2026 noch einmal um rund
   20 % auf die Werte unten. Dazu kam die Überarbeitung einer bestehenden
   Website als günstiger Einstieg. Die Preise liegen damit im Bereich der
   Freelancer, über Baukasten-Angeboten und unter Agenturen; was über den
   Grundumfang hinausgeht, läuft zum Stundensatz. Die Quellen stehen
   ausführlich im Ratgeber /ratgeber/website-kosten. Eine Stelle, damit
   Leistungsseiten, FAQ, Fallstudien, Ratgeber und llms.txt nicht
   auseinanderlaufen. */
export const FESTPREIS = {
  update: 990,
  website: 2900,
  relaunch: 3900,
  webApp: 7900,
  portal: 14900,
};

/** "4.900 €", mit deutschem Tausenderpunkt wie überall auf der Seite. */
export const euro = (betrag) => `${betrag.toLocaleString("de-DE")} €`;
