/**
 * Arabische Fallstudien.
 *
 * Übersetzung der englischen Fassung in `projects.en.js`, gleiche Struktur,
 * gleiche Zahlen. Die Zahlen stammen aus den Abschlussarbeiten und werden nicht
 * geschönt, genau wie in den anderen beiden Sprachen.
 *
 * Ziffern westlich (0-9). Prozentzeichen und Währungssymbol stehen so wie in
 * den anderen Sprachen, damit die Werte über alle drei Fassungen hinweg
 * identisch lesbar bleiben.
 *
 * Rückübersetzung der Titel und Kennzahlen:
 *   1 Automatisierung von Unit-Tests mit einem Sprachmodell
 *     Masterarbeit bei INFOMOTION GmbH: automatische Erzeugung von Unit-Tests
 *     für Java-Spring-Boot-Projekte
 *     +33 % Testabdeckung (mit JaCoCo gemessen) · −95 % Schreibaufwand
 *     (gegenüber manueller Entwicklung) · 2,13 € je erzeugter Testsuite
 *     (statt 566 € manuell)
 *   2 Datenvisualisierung in erweiterter Realität
 *     Bachelorarbeit bei INFOMOTION GmbH: SAP-BusinessObjects-Berichte als
 *     interaktive 3D-Darstellungen im Browser
 *     50+ Bilder je Sekunde (Darstellung im Browser) · unter 15 Sekunden
 *     Ladezeit (über alle Komponenten) · 81 Befragte (in deutschen Unternehmen)
 */

export const PROJECTS_AR = [
  {
    path: "/ar/projects/llm-maven-plugin",
    title: "أتمتة اختبارات الوحدة بنموذج لغوي",
    subtitle:
      "رسالة الماجستير لدى INFOMOTION GmbH: توليد اختبارات الوحدة تلقائيًا لمشاريع Java Spring Boot",
    role: "رسالة ماجستير، 09/2022 حتى 09/2024",
    stats: [
      { value: "+33%", label: "تغطية الاختبارات", note: "مقيسة بأداة JaCoCo" },
      { value: "-95%", label: "جهد الكتابة", note: "مقارنة بالتطوير اليدوي" },
      { value: "2,13 €", label: "لكل مجموعة اختبارات", note: "بدلًا من 566 € يدويًا" },
    ],
    ausgangslage:
      "كتابة اختبارات الوحدة لخدمات Spring Boot عمل متكرر تؤجله الفرق، فتتراجع نسبة التغطية مع الوقت. المولّدات المتاحة كانت تنتج اختبارات صحيحة بنيويًا لكنها فارغة من المعنى، ولم يكن أي منها مندمجًا مع بناء Maven الذي يستخدمه الفريق أصلًا. لم تجد مراجعة الأدبيات لأدوات الاختبار الآلي وتطبيقات النماذج اللغوية في هندسة البرمجيات أي منهج يجمع بين تحليل التغطية وتوليد الاختبارات ودورة البناء في Java Spring Boot.",
    loesung: [
      "تطبيق منهج Design Science Research بدوراته الثلاث: الصلة والدقة والتصميم، بحيث يُبنى الحل على مشكلة واقعية محددة لا على مشكلة افتراضية.",
      "تطوير استراتيجيات التوجيه ومقارنتها منهجيًا: zero-shot وone-shot وfew-shot، وتقييم أيها ينتج اختبارات JUnit 5 قابلة للترجمة وذات معنى.",
      "بناء UTestGenLLM، وهو مكوّن إضافي لـ Maven يرتبط بمراحل البناء القابلة للضبط، ويحلل أصناف المشروع ويولّد الاختبارات دون مغادرة البناء المعتاد.",
      "دمج JaCoCo بحيث يقرأ المكوّن التغطية القائمة، ويحدد الأصناف والدوال غير المختبَرة، ويرتب التوليد حسب الثغرات الفعلية بدل التوليد العشوائي.",
      "تشغيل النموذج اللغوي على نسخة GPT خاصة مستضافة على Azure، حتى لا تصل الشيفرة المملوكة إلى أي واجهة عامة.",
      "التحقق عبر عدة مشاريع بمقاييس تغطية كمية وبتقييم من خبراء.",
    ],
    ergebnisse: [
      "ارتفعت تغطية الاختبارات بنسبة 33 بالمئة في المشاريع التي جرى تقييمها",
      "انخفض جهد كتابة الاختبارات بنسبة تصل إلى 95 بالمئة مقارنة بالتطوير اليدوي",
      "انخفضت كلفة مجموعة الاختبارات الواحدة من نحو 566 € من وقت المطوّر إلى نحو 2,13 € من كلفة الواجهة البرمجية",
      "ثبت أن هندسة التوجيه تؤثر تأثيرًا قابلًا للقياس في جودة الشيفرة التقنية المولَّدة",
      "نتج عن العمل إطار قابل لإعادة الاستخدام لدمج النماذج اللغوية في سير تطوير البرمجيات داخل المؤسسات",
    ],
    stack: [
      "Java",
      "Maven",
      "Spring Boot",
      "JUnit 5",
      "JaCoCo",
      "OpenAI GPT-3.5 و GPT-4",
      "Azure OpenAI",
    ],
  },
  {
    path: "/ar/projects/ar-data-visualization",
    title: "تصوير البيانات في الواقع المعزز",
    subtitle:
      "رسالة البكالوريوس لدى INFOMOTION GmbH: تقارير SAP BusinessObjects كرسوم ثلاثية الأبعاد تفاعلية داخل المتصفح",
    role: "رسالة بكالوريوس، 2018 حتى 2022",
    stats: [
      { value: "50+", label: "إطارًا في الثانية", note: "أثناء العرض في المتصفح" },
      { value: "< 15 ث", label: "زمن التحميل", note: "لجميع المكوّنات" },
      { value: "81", label: "مشاركًا في الاستبيان", note: "في شركات ألمانية" },
    ],
    ausgangslage:
      "تُقرأ تقارير ذكاء الأعمال على شاشات مسطحة، وهو ما يحد من عدد الأبعاد التي يمكن عرضها في وقت واحد. سبق أن استُخدم الواقع المعزز في سياقات الأعمال، لكن ليس مقترنًا بنظام تقارير مؤسسي، ولم تثبت أي دراسة ما إذا كانت الشركات ستتبناه فعلًا. بقي سؤالان مفتوحان: هل الواقع المعزز عبر المتصفح ممكن تقنيًا مقابل مصدر SAP حي، وما الذي يمنع المؤسسات من استخدامه.",
    loesung: [
      "مراجعة تطبيقات الواقع المعزز القائمة في سياقات الأعمال وتحديد الثغرة: لا يوجد تصوير بيانات بالواقع المعزز مدمج مع SAP BusinessObjects.",
      "استطلاع آراء 81 مشاركًا في شركات ألمانية حول عوائق التبني وأي خصائص العرض ستكون مفيدة.",
      "تصميم بنية نظام تجمع بين تقنيات الويب وأطر الواقع المعزز ومصدر بيانات مؤسسي.",
      "بناء الواجهة الأمامية بـ Angular 14 وTypeScript، مع AR.js وA-Frame وBabiaXR للطبقة الغامرة.",
      "تنفيذ توليد العلامات والتعرف عليها عبر ARToolKit لتحديد موضع الرسوم ثلاثية الأبعاد في الفراغ بدقة.",
      "بناء خلفية Spring Boot بواجهات REST تسحب بيانات حية من SAP BusinessObjects، مع التحقق مقابل قاعدة بيانات مكتبة INFOMOTION وتحليلات الإعارة فيها.",
      "اختبار المتطلبات الوظيفية وغير الوظيفية، بما فيها أداء العرض وزمن التحميل.",
    ],
    ergebnisse: [
      "عُرضت الرسوم الشريطية والدائرية والعروض متعددة الرسوم في الواقع المعزز مع دوران وتكبير كاملين",
      "بقي العرض فوق 50 إطارًا في الثانية، وحُمّلت جميع المكوّنات في أقل من 15 ثانية",
      "عمل النظام في Chrome وFirefox دون تثبيت تطبيق، على الجهاز الذي يحمله المستخدم أصلًا",
      "حدد الاستبيان العائقين الأساسيين: نقص المعرفة (59 بالمئة) وغياب حالات الاستخدام (41 بالمئة)",
      "أثبت العمل أن الواقع المعزز عبر المتصفح ممكن لتقارير المؤسسات، وأنتج إطارًا لأعمال ذكاء الأعمال بالواقع المعزز لاحقًا",
    ],
    stack: [
      "Angular 14",
      "TypeScript",
      "AR.js",
      "A-Frame",
      "BabiaXR",
      "ARToolKit",
      "Spring Boot",
      "واجهات REST",
      "SAP BusinessObjects",
    ],
  },
];

export const getProjectAr = (path) => PROJECTS_AR.find((p) => p.path === path);
