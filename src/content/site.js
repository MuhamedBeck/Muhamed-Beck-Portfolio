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

// Wording agreed with the owner and grounded in the Freelancer-Kompass 2026
// median of 95 EUR/h for IT freelancers across the DACH region (the survey does
// not break its figures down by country). Used verbatim on landing pages, in
// llms.txt and in the ProfessionalService priceRange.
export const RATE_TEXT = "90 bis 135 € nach Absprache und je nach Projektumfang";
// English rendering of the same rate. The German string is the one that goes
// into llms.txt and the ProfessionalService priceRange; this exists so the
// English pages do not print a German sentence at a reader.
export const RATE_TEXT_EN = "90 to 135 € by agreement, depending on project scope";
// Arabic deliberately does not get a third suffix here. Its rate sentence lives
// with the rest of its page copy in src/content/ar.js, the way the Arabic case
// studies live in projects.ar.js: a suffix per locale stops scaling at three,
// and a translated sentence sitting far from the page that renders it is how
// translations drift.
export const RATE_MIN = 90;
export const RATE_MAX = 135;

/* Festpreise für Webprojekte, netto für Unternehmen, am 13.10.2026 mit dem
   Inhaber festgelegt. Marktrahmen laut Anbieterseiten, also keine neutrale
   Erhebung: kleine Firmen-Website beim Freelancer 1.500 bis 5.000 €, bei der
   Agentur 3.500 bis 12.000 €, KMU-Relaunch 6.000 bis 25.000 €, einfaches
   Buchungssystem 8.000 bis 20.000 €, Kundenportal ab 25.000 €. Die Preise
   liegen bewusst auf dem Niveau einer kleinen Agentur, nicht am unteren Rand;
   was über den Grundumfang hinausgeht, läuft zum Stundensatz. Eine Stelle,
   damit Leistungsseite, FAQ, Fallstudie und llms.txt nicht auseinanderlaufen. */
export const FESTPREIS = {
  website: 4900,
  relaunch: 6900,
  webApp: 15000,
  portal: 25000,
};

/** "4.900 €", mit deutschem Tausenderpunkt wie überall auf der Seite. */
export const euro = (betrag) => `${betrag.toLocaleString("de-DE")} €`;
