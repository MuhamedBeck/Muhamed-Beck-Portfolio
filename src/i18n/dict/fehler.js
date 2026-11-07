// Texts for the two pages nobody wants to see: an address that does not exist
// and a page that failed to load. Until 07.11.2026 the 404 page was English
// only, marked as German, with a single way out; the load failure had no page
// at all and left a blank screen.

const de = {
  notFound: {
    titel: "Diese Seite gibt es nicht",
    text: "Die Adresse hat sich vielleicht geändert, oder der Link, über den Sie gekommen sind, ist veraltet.",
    start: "Zur Startseite",
    weiter: [
      { to: "/leistungen", label: "Leistungen" },
      { to: "/ratgeber", label: "Ratgeber" },
      { to: "/kontakt", label: "Kontakt" },
    ],
  },
  ladefehler: {
    titel: "Diese Seite konnte nicht geladen werden",
    text: "Vermutlich ist die Website gerade aktualisiert worden, oder die Verbindung war kurz weg. Neu laden hilft in fast allen Fällen.",
    neuLaden: "Seite neu laden",
  },
};

const en = {
  notFound: {
    titel: "This page does not exist",
    text: "The address may have changed, or the link that brought you here is out of date.",
    start: "Go to the homepage",
    weiter: [
      { to: "/en/services", label: "Services" },
      { to: "/en/hire", label: "Start a project" },
    ],
  },
  ladefehler: {
    titel: "This page could not be loaded",
    text: "The site has probably just been updated, or the connection dropped for a moment. Reloading fixes it in almost every case.",
    neuLaden: "Reload the page",
  },
};

/* Rückübersetzung:
 *   notFound.titel   Diese Seite gibt es nicht
 *   notFound.text    Die Adresse hat sich vielleicht geändert, oder der Link,
 *                    über den Sie gekommen sind, ist veraltet.
 *   notFound.start   Zur Startseite
 *   notFound.weiter  Leistungen · Ein Projekt starten
 *   ladefehler       Diese Seite konnte nicht geladen werden. Vermutlich ist
 *                    die Website gerade aktualisiert worden, oder die
 *                    Verbindung war kurz weg. Neu laden hilft fast immer.
 *                    Knopf: Seite neu laden */
const ar = {
  notFound: {
    titel: "هذه الصفحة غير موجودة",
    text: "ربما تغيّر العنوان، أو أن الرابط الذي أوصلك إلى هنا قديم.",
    start: "إلى الصفحة الرئيسية",
    weiter: [
      { to: "/ar/services", label: "الخدمات" },
      { to: "/ar/hire", label: "ابدأ مشروعًا" },
    ],
  },
  ladefehler: {
    titel: "تعذّر تحميل هذه الصفحة",
    text: "على الأرجح تم تحديث الموقع للتو، أو انقطع الاتصال لحظة. إعادة التحميل تحل المشكلة في أغلب الحالات.",
    neuLaden: "إعادة تحميل الصفحة",
  },
};

export default { de, en, ar };
