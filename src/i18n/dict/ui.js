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
  requestProject: "Kostenloses Erstgespräch",
  replyPromise: "Antwort innerhalb von 24 Stunden · Frankfurt und remote",
  techStack: "Tech-Stack und Werkzeuge",
  linkedinAria: "LinkedIn-Profil",
  githubAria: "GitHub-Profil",
  themeToLight: "Zur hellen Ansicht wechseln",
  themeToDark: "Zur dunklen Ansicht wechseln",
};

const en = {
  languageSwitcher: "Choose language",
  skipToContent: "Skip to content",
  backToHome: "Back to home",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  requestProject: "Start a project",
  replyPromise: "Reply within 24 hours · Frankfurt and remote",
  techStack: "Tech stack and tools",
  linkedinAria: "LinkedIn profile",
  githubAria: "GitHub profile",
  themeToLight: "Switch to the light theme",
  themeToDark: "Switch to the dark theme",
};

/* Arabisch, Hocharabisch (فصحى).
 *
 * Rückübersetzung, damit ohne Arabischkenntnisse prüfbar bleibt, was hier steht:
 *
 *   languageSwitcher  Sprache wählen
 *   skipToContent     Zum Inhalt springen
 *   backToHome        Zurück zur Startseite
 *   openMenu          Menü öffnen
 *   closeMenu         Menü schließen
 *   requestProject    Ein Projekt starten
 *   replyPromise      Antwort innerhalb von 24 Stunden · Frankfurt und remote
 *   techStack         Technologien und Werkzeuge
 *   linkedinAria      Profil auf LinkedIn
 *   githubAria        Profil auf GitHub
 *   themeToLight      Zur hellen Ansicht wechseln
 *   themeToDark       Zur dunklen Ansicht wechseln
 *
 * Der Mitteltrenner in replyPromise steht zwischen einem lateinischen und einem
 * arabischen Lauf. Er ist ein neutrales Zeichen, und der Bidi-Algorithmus
 * ordnet solche Stellen je nach Umgebung um. */
const ar = {
  languageSwitcher: "اختر اللغة",
  skipToContent: "الانتقال إلى المحتوى",
  backToHome: "العودة إلى الصفحة الرئيسية",
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  requestProject: "ابدأ مشروعًا",
  replyPromise: "رد خلال 24 ساعة · فرانكفورت وعن بُعد",
  techStack: "التقنيات والأدوات",
  linkedinAria: "الملف الشخصي على لينكد إن",
  githubAria: "الملف الشخصي على غيت هب",
  themeToLight: "التبديل إلى المظهر الفاتح",
  themeToDark: "التبديل إلى المظهر الداكن",
};

export default { de, en, ar };
