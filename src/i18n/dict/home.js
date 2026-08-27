// Homepage hero.
//
// German is the primary market: the search demand this site is chasing
// ("n8n Experte", "n8n Spezialist", "KI-Automatisierung Frankfurt") is entirely
// German. The German copy leads with the outcome and the tools, not with a
// greeting, because the headline is the strongest on-page ranking signal there
// is and "Hi, I'm ..." spends it on nothing.
//
// Numbers are from the CV and must not be embellished. TOPEOPLE Group GmbH is
// the employer, never a client.

const de = {
  label: "n8n, KI-Agenten und Prozessautomatisierung",
  h1: "Prozesse, die ohne Sie laufen",
  intro:
    "Ich bin Muhamed Nur Beck, AI Automation Manager und Full-Stack-Entwickler in Frankfurt am Main. Ich automatisiere Geschäftsprozesse mit n8n, binde CRM- und ATS-Systeme an und bringe KI dorthin, wo sie messbar Arbeit abnimmt.",
  portraitAlt: "Muhamed Nur Beck, AI Automation Manager aus Frankfurt am Main",
  ctaPrimary: "Kostenloses Erstgespräch",
  ctaSecondary: "Alle Leistungen im Detail",
  ctaSchreiben: "Oder direkt schreiben",
  introKurz:
    "Ich bin Muhamed Nur Beck, AI Automation Manager und Full-Stack-Entwickler in Frankfurt am Main.",
  servicesHeading: "Was Sie beauftragen können",
  preisZeile: "90 bis 135 € pro Stunde nach Absprache. Jede Leistung mit Ablauf, Beispielen und Preisrahmen.",
  stats: [
    { value: "80 %", label: "kürzere Durchlaufzeiten im Recruiting" },
    { value: "90 %", label: "der Candidate Operations automatisiert" },
  ],
  statsNote:
    "Alle Werte stammen aus produktiv laufenden Systemen, nicht aus Demos. TOPEOPLE Group GmbH ist mein Arbeitgeber, Phoenix Parkservice war ein Freelance-Mandat.",
  socials: {
    linkedin: "Muhamed Nur Beck auf LinkedIn",
    github: "Muhamed Nur Beck auf GitHub",
    email: "E-Mail an Muhamed Nur Beck",
  },
};

const en = {
  label: "n8n, AI agents and process automation",
  h1: "Processes that run without you",
  intro:
    "I'm Muhamed Nur Beck, AI Automation Manager and full-stack developer in Frankfurt, Germany. I automate business processes with n8n, connect CRM and ATS systems, and put AI where it measurably takes work off people's hands.",
  portraitAlt: "Muhamed Nur Beck, AI Automation Manager based in Frankfurt, Germany",
  ctaPrimary: "Start a project",
  ctaSecondary: "All services in detail",
  ctaSchreiben: "Or just write",
  introKurz:
    "I'm Muhamed Nur Beck, AI Automation Manager and full-stack developer in Frankfurt, Germany.",
  servicesHeading: "What you can commission",
  preisZeile: "90 to 135 € per hour by agreement. Every service with process, examples and price range.",
  stats: [
    { value: "80 %", label: "shorter recruiting cycle times" },
    { value: "90 %", label: "of candidate operations automated" },
  ],
  statsNote:
    "All figures come from systems running in production, not from demos. TOPEOPLE Group GmbH is my employer; Phoenix Parkservice was a freelance engagement.",
  socials: {
    linkedin: "Muhamed Nur Beck on LinkedIn",
    github: "Muhamed Nur Beck on GitHub",
    email: "Email Muhamed Nur Beck",
  },
};

/* Arabisch. Zielgruppe sind arabischsprachige Entscheider in Europa ebenso wie
 * im Golfraum, deshalb bleibt Frankfurt als Herkunft stehen und Fernarbeit ist
 * ausdrücklich genannt. Ziffern westlich (0-9), nicht ostarabisch: im
 * geschäftlichen Gebrauch beider Regionen der Normalfall, und die Preise der
 * Seite sind in Euro.
 *
 * Der Name steht arabisch mit der lateinischen Schreibweise in Klammern. Beides
 * hat einen Grund: arabische Leser sollen ihn lesen können, und die lateinische
 * Form ist die, unter der er auffindbar ist und die in site.js sowie in jedem
 * externen Profil steht.
 *
 * Rückübersetzung:
 *   label       n8n, KI-Agenten und Prozessautomatisierung
 *   h1          Prozesse, die ohne Sie laufen
 *   intro       Ich bin Muhamed Nur Beck, AI Automation Manager und Full-Stack-
 *               Entwickler in Frankfurt, Deutschland. Ich automatisiere
 *               Geschäftsprozesse mit n8n, binde CRM- und ATS-Systeme an und
 *               setze KI dort ein, wo sie messbar Arbeit abnimmt.
 *   portraitAlt Muhamed Nur Beck, AI Automation Manager in Frankfurt
 *   ctaPrimary  Ein Projekt starten
 *   ctaSecondary Leistungen ansehen
 *   stats       80 % kürzere Durchlaufzeit im Recruiting ·
 *               90 % der Candidate Operations automatisiert ·
 *               24 Stunden bis zur Antwort auf Ihre Anfrage
 *   statsNote   Alle Zahlen stammen aus produktiv laufenden Systemen, nicht aus
 *               Demos. TOPEOPLE Group GmbH ist mein Arbeitgeber, Phoenix
 *               Parkservice war ein Freelance-Mandat.
 *   socials     Muhamed Nur Beck auf LinkedIn / auf GitHub / E-Mail an ihn */
const ar = {
  label: "n8n ووكلاء الذكاء الاصطناعي وأتمتة العمليات",
  h1: "عمليات تعمل من دونك",
  intro:
    "أنا محمد نور بيك (Muhamed Nur Beck)، مدير أتمتة الذكاء الاصطناعي ومطوّر برمجيات متكامل في فرانكفورت بألمانيا. أُتمِت عمليات الأعمال باستخدام n8n، وأربط أنظمة إدارة العملاء (CRM) وأنظمة التوظيف (ATS)، وأضع الذكاء الاصطناعي حيث يختصر العمل بصورة قابلة للقياس.",
  portraitAlt: "محمد نور بيك، مدير أتمتة الذكاء الاصطناعي في فرانكفورت بألمانيا",
  ctaPrimary: "ابدأ مشروعًا",
  ctaSecondary: "كل الخدمات بالتفصيل",
  ctaSchreiben: "أو راسلني مباشرة",
  introKurz:
    "أنا محمد نور بيك (Muhamed Nur Beck)، مدير أتمتة الذكاء الاصطناعي ومطوّر برمجيات متكامل في فرانكفورت بألمانيا.",
  servicesHeading: "ما يمكنك طلبه",
  /* Der Preis ohne Leerzeichen vor dem Prozent- beziehungsweise Eurozeichen,
     aus demselben Grund wie bei stats: neutrale Zeichen kippen im arabischen
     Lauf an die falsche Seite der Zahl. */
  preisZeile: "من 90 إلى 135 يورو للساعة حسب الاتفاق. كل خدمة مع سير العمل والأمثلة ونطاق السعر.",
  stats: [
    /* Written without the space the German and English versions use. The
       percent sign is bidi-neutral, so "80 %" renders as "% 80" in an Arabic
       run, which reads as a different number entirely to anyone scanning. */
    { value: "80%", label: "اختصار في زمن دورة التوظيف" },
    { value: "90%", label: "من عمليات المرشحين مؤتمتة" },
  ],
  statsNote:
    "جميع الأرقام مأخوذة من أنظمة تعمل في بيئة الإنتاج، لا من عروض توضيحية. شركة TOPEOPLE Group GmbH هي جهة عملي، ومشروع Phoenix Parkservice كان تكليفًا مستقلًا.",
  socials: {
    linkedin: "محمد نور بيك على لينكد إن",
    github: "محمد نور بيك على غيت هب",
    email: "مراسلة محمد نور بيك بالبريد الإلكتروني",
  },
};

export default { de, en, ar };
