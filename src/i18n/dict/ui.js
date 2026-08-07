// Shared chrome strings: things that appear on more than one page.
//
// German is the reference object. scripts/check-i18n.js fails the build when
// the two key sets diverge, so a new German key without an English one is a
// build error rather than an `undefined` in the markup.
//
// Both locales live in one file on purpose: with two languages, seeing them
// side by side makes a missing or drifting translation obvious in review.

const de = {
  languageSwitcher: "Sprache wählen",
  skipToContent: "Zum Inhalt springen",
  backToHome: "Zurück zur Startseite",
  openMenu: "Menü öffnen",
  closeMenu: "Menü schließen",
  requestProject: "Projekt anfragen",
  replyPromise: "Antwort innerhalb von 24 Stunden · Frankfurt und remote",
  emailAria: "E-Mail schreiben",
  phoneAria: "Anrufen",
  linkedinAria: "LinkedIn-Profil",
  githubAria: "GitHub-Profil",
};

const en = {
  languageSwitcher: "Choose language",
  skipToContent: "Skip to content",
  backToHome: "Back to home",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  requestProject: "Start a project",
  replyPromise: "Reply within 24 hours · Frankfurt and remote",
  emailAria: "Send email",
  phoneAria: "Call",
  linkedinAria: "LinkedIn profile",
  githubAria: "GitHub profile",
};

export default { de, en };
