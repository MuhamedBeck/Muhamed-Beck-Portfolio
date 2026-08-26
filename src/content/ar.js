/**
 * Arabische Seiteninhalte.
 *
 * Hocharabisch (فصحى), kein Dialekt. Zielgruppe sind arabischsprachige
 * Entscheider in Europa ebenso wie im Golfraum, deshalb steht Frankfurt als
 * Herkunft und Fernarbeit als Arbeitsmodell nebeneinander, und die Preise
 * bleiben in Euro.
 *
 * Bewusst kurze, faktische Sätze ohne Redewendungen: Der Text wird nicht
 * gegengelesen, und was einfach gebaut ist, kann im Register nicht kippen.
 *
 * Fachbegriffe tragen beim ersten Auftreten den englischen Begriff in Klammern,
 * so wie es im arabischen IT-Sprachgebrauch üblich ist.
 *
 * Ziffern westlich (0-9). Zahlen stammen aus dem Lebenslauf und werden nicht
 * geschönt, genau wie in der deutschen und englischen Fassung.
 *
 * Zu jedem Block steht die deutsche Rückübersetzung, damit ohne
 * Arabischkenntnisse prüfbar bleibt, was auf der Seite steht.
 */

/* Rückübersetzung:
 *   kicker    Was ich mache
 *   headline  Automatisierung, die Arbeit wirklich abnimmt
 *   intro     Ich baue Prozessketten, die ohne tägliches Zutun laufen. Der
 *             Schwerpunkt liegt auf n8n, auf der Anbindung bestehender Systeme
 *             und auf KI an den Stellen, an denen sie ein messbares Ergebnis
 *             liefert. Ich arbeite von Frankfurt aus, remote mit Kunden in
 *             Europa und im arabischen Raum. */
export const AR_UEBER = {
  kicker: "ما الذي أقوم به",
  headline: "أتمتة تختصر العمل فعلًا",
  intro:
    "أبني سلاسل عمل تعمل من دون متابعة يومية. التركيز على n8n، وعلى ربط الأنظمة القائمة، وعلى استخدام الذكاء الاصطناعي في المواضع التي يعطي فيها نتيجة قابلة للقياس. أعمل من فرانكفورت، وعن بُعد مع عملاء في أوروبا والمنطقة العربية.",
};

/* Rückübersetzung der sechs Leistungen, in dieser Reihenfolge:
 *   1 Workflow-Automatisierung mit n8n — Wiederkehrende Abläufe zwischen Ihren
 *     Systemen. Auslöser, Bedingungen, Fehlerbehandlung und Protokollierung,
 *     damit ein Fehlschlag sichtbar wird statt still zu bleiben.
 *   2 KI-Agenten — Agenten, die einen abgegrenzten Auftrag erledigen: Anliegen
 *     sortieren, Dokumente zusammenfassen, aus Ihren eigenen Inhalten
 *     antworten. Der Übergabepunkt an einen Menschen wird vorher festgelegt.
 *   3 CRM- und ATS-Anbindung — HubSpot, Salesforce, Personio und ähnliche
 *     Systeme über ihre Schnittstellen verbinden, damit Daten nicht von Hand
 *     übertragen werden.
 *   4 Recruiting-Automatisierung — Von der Bewerbung bis zur Terminvereinbarung.
 *     Die Bewertung von Menschen bleibt beim Menschen, aus fachlichen und aus
 *     rechtlichen Gründen.
 *   5 Sprachassistenten am Telefon — Anrufe außerhalb der Bürozeiten annehmen,
 *     Anliegen sortieren, weiterleiten. Der Anrufer erfährt zu Beginn, dass er
 *     mit einem KI-System spricht.
 *   6 Full-Stack-Entwicklung — Webanwendungen mit React, Angular und Spring
 *     Boot, von der einzelnen Seite bis zur Microservice-Architektur. */
export const AR_LEISTUNGEN = [
  {
    title: "أتمتة سير العمل باستخدام n8n",
    slug: "n8n",
    text: "المهام المتكررة بين أنظمتك. المشغّلات والشروط ومعالجة الأخطاء والتسجيل، بحيث يظهر الفشل بدل أن يمر بصمت.",
  },
  {
    title: "وكلاء الذكاء الاصطناعي",
    slug: "ki-agenten",
    text: "وكلاء ينفذون مهمة محددة: فرز الطلبات، تلخيص المستندات، الإجابة من محتواك أنت. نقطة التسليم إلى موظف بشري تُحدَّد مسبقًا.",
  },
  {
    title: "ربط أنظمة CRM وATS",
    slug: "crm-ats",
    text: "ربط HubSpot وSalesforce وPersonio وما شابهها عبر واجهاتها البرمجية، حتى لا تُنقل البيانات يدويًا.",
  },
  {
    title: "أتمتة التوظيف",
    slug: "recruiting",
    text: "من وصول الطلب حتى تحديد الموعد. تقييم الأشخاص يبقى بيد الإنسان، لأسباب مهنية وقانونية.",
  },
  {
    title: "مساعدون صوتيون على الهاتف",
    slug: "voice-ai",
    text: "الرد على المكالمات خارج ساعات العمل، وفرز الطلب، والتحويل. يعرف المتصل منذ البداية أنه يتحدث إلى نظام ذكاء اصطناعي.",
  },
  {
    title: "تطوير برمجي متكامل",
    slug: "full-stack",
    text: "تطبيقات ويب باستخدام React وAngular وSpring Boot، من صفحة واحدة إلى بنية خدمات مصغّرة.",
  },
];

/* Rückübersetzung:
 *   rate      90 bis 135 € pro Stunde nach Absprache und je nach Projektumfang
 *   rateNote  Abrechnung in Euro. Für Kunden außerhalb der Eurozone remote und
 *             per Fernzugriff.
 *   ablauf    1 Sie beschreiben den Prozess — Zwei oder drei Sätze genügen.
 *               Welcher Ablauf kostet die meiste Zeit, welche Systeme sind im
 *               Spiel.
 *             2 Eine ehrliche Einschätzung — Innerhalb von 24 Stunden. Wenn
 *               Automatisierung sich nicht rechnet, sage ich das.
 *             3 Umfang und Preis — Fester Preis oder Stundensatz, mit
 *               Zeitrahmen.
 *             4 Bauen und übergeben — Mit Dokumentation, und mit Wartung, wenn
 *               Sie sie wollen. */
export const AR_KONDITIONEN = {
  rate: "من 90 إلى 135 يورو في الساعة، بحسب الاتفاق وحجم المشروع",
  rateNote:
    "الفوترة باليورو. للعملاء خارج منطقة اليورو يتم العمل عن بُعد وعبر وصول آمن إلى الأنظمة.",
};

export const AR_ABLAUF = [
  {
    title: "تصف العملية",
    text: "جملتان أو ثلاث تكفي: أي سير عمل يستهلك أكبر وقت، وما الأنظمة الداخلة فيه.",
  },
  {
    title: "تقييم صريح",
    text: "خلال 24 ساعة. وإذا كانت الأتمتة غير مجدية في حالتك، أقول ذلك.",
  },
  {
    title: "النطاق والسعر",
    text: "سعر ثابت أو بالساعة، مع إطار زمني واضح.",
  },
  {
    title: "التنفيذ والتسليم",
    text: "مع توثيق، ومع صيانة لاحقة إن رغبت بها.",
  },
];

/* Rückübersetzung:
 *   headline  Welcher Prozess kostet Sie am meisten Zeit?
 *   intro     Beschreiben Sie ihn in zwei oder drei Sätzen. Sie bekommen
 *             innerhalb von 24 Stunden eine ehrliche Einschätzung, ob und wie
 *             er sich automatisieren lässt.
 *   cta       Per E-Mail schreiben
 *   note      Erstgespräch kostenlos. Frankfurt und remote. */
export const AR_CTA = {
  headline: "أي عملية تستهلك أكبر وقت لديك؟",
  intro:
    "صِفها في جملتين أو ثلاث. ستحصل خلال 24 ساعة على تقييم صريح لما إذا كان بالإمكان أتمتتها وكيف.",
  cta: "راسلني بالبريد الإلكتروني",
  note: "الاستشارة الأولى مجانية. فرانكفورت وعن بُعد.",
};

/* Rückübersetzung der Seitenköpfe:
 *   services  Leistungen / Automatisierung, KI und Entwicklung
 *   hire      Zusammenarbeit / Ein Projekt starten */
export const AR_SEITEN = {
  services: {
    label: "الخدمات",
    headline: "الأتمتة والذكاء الاصطناعي والتطوير",
    intro:
      "ست مجالات عمل. الأولى ثلاث هي الأكثر طلبًا، والباقي يأتي عادة مكمّلًا لها ضمن المشروع نفسه.",
  },
  hire: {
    label: "التعاون",
    headline: "ابدأ مشروعًا",
    intro:
      "لا يوجد نموذج طويل. اكتب لي بالبريد الإلكتروني وصفًا موجزًا، وستصلك إجابة خلال 24 ساعة.",
  },
};
