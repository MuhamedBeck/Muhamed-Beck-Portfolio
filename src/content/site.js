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
  email: "m.nur.beck@hotmail.de",
  // E.164 for tel: hrefs and schema; the display form is separate so the
  // markup and the structured data cannot drift apart.
  phone: "+4917666008485",
  phoneDisplay: "+49 176 66008485",
};

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/muhamed-nur-beck",
  github: "https://www.github.com/MuhamedBeck",
};

/** Everything a search engine should be able to confirm is the same person. */
export const SAME_AS = [SOCIAL.linkedin, SOCIAL.github];

// Wording agreed with the owner and grounded in the Freelancer-Kompass 2026
// median of 95 EUR/h for German IT freelancers. Used verbatim on landing pages,
// in llms.txt and in the ProfessionalService priceRange.
export const RATE_TEXT = "90 bis 135 € nach Absprache und je nach Projektumfang";
export const RATE_MIN = 90;
export const RATE_MAX = 135;
