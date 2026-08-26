/**
 * Section labels and closing call to action, per locale.
 *
 * The template was German-only, which is why the two English case studies each
 * carried their own 460-line copy of the whole page. Parameterising six strings
 * was all that stood between them.
 */
export const CASE_STUDY_COPY = {
  de: {
    situation: "Ausgangslage",
    solution: "Lösung",
    results: "Ergebnisse",
    stack: "Technologie-Stack",
    ctaHeadline: "Ähnliche Prozesse in Ihrem Unternehmen?",
    ctaIntro:
      "Schreiben Sie mir, welcher Ablauf bei Ihnen am meisten Zeit kostet. Den Rest klären wir im Gespräch.",
    ctaButton: "Projekt anfragen",
    ctaHref: "/kontakt",
  },
  en: {
    situation: "Background",
    solution: "Approach",
    results: "Results",
    stack: "Technology stack",
    ctaHeadline: "Similar processes in your company?",
    ctaIntro:
      "Tell me which process costs you the most time. We can work out the rest in a call.",
    ctaButton: "Start a project",
    ctaHref: "/en/hire",
  },
  /* Rückübersetzung: Ausgangslage · Lösung · Ergebnisse · Technologie-Stack ·
     Ähnliche Prozesse in Ihrem Unternehmen? · Schreiben Sie mir, welcher Ablauf
     bei Ihnen am meisten Zeit kostet. Den Rest klären wir im Gespräch. ·
     Ein Projekt starten

     Dieses Objekt liegt außerhalb von src/i18n/dict/, wird von check-i18n also
     nicht geprüft. Eine fehlende Sprache fiele hier auf den deutschen Zweig
     zurück, ohne dass irgendetwas fehlschlägt. */
  ar: {
    situation: "الوضع القائم",
    solution: "الحل",
    results: "النتائج",
    stack: "التقنيات المستخدمة",
    ctaHeadline: "هل لديك عمليات مشابهة في شركتك؟",
    ctaIntro:
      "اكتب لي أي سير عمل يستهلك أكبر وقت لديك. أما الباقي فنوضحه في المحادثة.",
    ctaButton: "ابدأ مشروعًا",
    ctaHref: "/ar/hire",
  },
};
