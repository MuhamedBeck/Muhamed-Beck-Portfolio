/**
 * Seitenkörper der arabischen Dolmetscher-Seite.
 *
 * Hocharabisch (فصحى), kein Dialekt; die Seite zählt die Dialekte auf, in
 * denen gedolmetscht wird, ist selbst aber in der Schriftsprache verfasst.
 *
 * Ziffern westlich (0-9), Preise mit dem Wort „يورو“ statt des Zeichens.
 * Aufbau und Schlüssel wie im deutschen Modul; jeder Betrag kommt aus
 * DOLMETSCH_PREIS oder ANFAHRT_STUFEN in site.js.
 *
 * Zu jedem Block steht die deutsche Rückübersetzung, damit ohne
 * Arabischkenntnisse prüfbar bleibt, was auf der Seite steht.
 */
import {
  ANFAHRT_START,
  ANFAHRT_STUFEN,
  DOLMETSCH_PREIS,
  preisText,
} from "./site.js";

/* Arabische Schreibweise jedes Orts aus ANFAHRT_STUFEN.
 * Rückübersetzung: Frankfurt (die ganze Stadt), Flughafen Frankfurt; alle
 * anderen sind die Ortsnamen in arabischer Schrift. */
export const ORTE = {
  "Frankfurt (ganzes Stadtgebiet)": "فرانكفورت (المدينة كلها)",
  Offenbach: "أوفنباخ",
  "Neu-Isenburg": "نوي إيزنبورغ",
  "Bad Vilbel": "باد فيلبل",
  Eschborn: "إشبورن",
  Flughafen: "مطار فرانكفورت",
  "Bad Homburg": "باد هومبورغ",
  Oberursel: "أوبرأورزل",
  Kronberg: "كرونبرغ",
  Hofheim: "هوفهايم",
  Langen: "لانغن",
  Hanau: "هاناو",
  Rüsselsheim: "روسلسهايم",
  Friedberg: "فريدبرغ",
  Darmstadt: "دارمشتات",
  Wiesbaden: "فيسبادن",
  Mainz: "ماينتس",
  "Bad Nauheim": "باد ناوهايم",
  Aschaffenburg: "أشافنبورغ",
  Gießen: "غيسن",
};

const p = (betrag) => preisText(betrag, "ar");
/* je 30 Minuten oder einen Teil davon */
const halbe = `${p(DOLMETSCH_PREIS.halbeStunde)} لكل 30 دقيقة أو جزء منها`;
/* Übersetzungen zum Verständnis, für Schriftverkehr und Geschäft, nicht zur
   Vorlage bei Behörden oder Gerichten. */
const zweck = "ترجمات للفهم وللمراسلات والأعمال، وليست للتقديم إلى الدوائر الحكومية أو المحاكم.";

const stufenBetraege = ANFAHRT_STUFEN.filter((stufe) => stufe.betrag > 0).map((stufe) => p(stufe.betrag));
const hanau = ANFAHRT_STUFEN.find((stufe) => stufe.orte.includes("Hanau"));

/* bis etwa 15 km · über 15 bis 25 km · … · weiter entfernt */
const stufenLabel = (stufe) => {
  if (stufe.bisKm === null) return "أبعد من ذلك";
  if (stufe.vonKm === 0) return `حتى ${stufe.bisKm} كم تقريبًا`;
  return `أكثر من ${stufe.vonKm} حتى ${stufe.bisKm} كم`;
};

/* inklusive · Betrag · nach Absprache */
const stufenBetrag = (stufe) => {
  if (stufe.betrag === null) return "بالاتفاق";
  if (stufe.betrag === 0) return "مشمول";
  return p(stufe.betrag);
};

/* Orte, getrennt durch das arabische Komma; in der letzten Stufe „zum Beispiel …“. */
const stufenOrte = (stufe) => {
  const orte = stufe.orte.map((ort) => ORTE[ort]).join("، ");
  return stufe.bisKm === null ? `مثل ${orte}` : orte;
};

export const INHALT = {
  /* Rückübersetzung:
   *   h1           Dolmetscher und Übersetzer (mündlich und schriftlich)
   *                zwischen Arabisch und Deutsch in Frankfurt
   *   einleitung   Ich bin Muhamed Nur Beck (in lateinischer Schrift
   *                wiederholt) und dolmetsche und übersetze zwischen Arabisch,
   *                Deutsch und Englisch, bei Terminen und für Schriftstücke.
   *                Wer einen „مترجم فوري“ (wörtlich: Sofort-Dolmetscher)
   *                für einen Termin sucht: Ich dolmetsche nacheinander, also
   *                nach jedem Satz oder Abschnitt, nicht gleichzeitig. Vor Ort in
   *                Frankfurt und im Rhein-Main-Gebiet, weiter entfernte
   *                Termine nach Absprache, per Video und Telefon in ganz
   *                Deutschland.
   *   portraitAlt  Muhamed Nur Beck, Dolmetscher und Übersetzer in Frankfurt
   *   belege       Erste Einsätze 2017, seit 2022 regelmäßig. Über 150
   *                Einsätze in Polizeidienststellen, Gerichten,
   *                Krankenhäusern und Behörden. Arabisch und Deutsch sind
   *                meine Muttersprachen, Englisch spreche ich fließend, sicher
   *                genug für Verhandlungen.
   *   belegeVerweis  Stationen im Lebenslauf (auf Deutsch) */
  kopf: {
    h1: "مترجم شفوي وتحريري بين العربية والألمانية في فرانكفورت",
    einleitung:
      "أنا محمد نور بيك (Muhamed Nur Beck)، أترجم شفويًا وتحريريًا بين العربية والألمانية والإنجليزية، في المواعيد وللنصوص المكتوبة. إذا كنت تبحث عن مترجم فوري لموعدك، فأنا أترجم الحديث بالتتابع، أي بعد كل جملة أو مقطع، لا في الوقت نفسه. حضوريًا في فرانكفورت ومنطقة الراين-ماين، والمواعيد الأبعد بالاتفاق، وعبر الفيديو والهاتف في جميع أنحاء ألمانيا.",
    portraitAlt: "محمد نور بيك، مترجم شفوي وتحريري في فرانكفورت",
    belege:
      "أولى مهامي في الترجمة كانت عام 2017، وأعمل بانتظام منذ 2022. أكثر من 150 مهمة في مراكز الشرطة والمحاكم والمستشفيات والدوائر الحكومية. العربية والألمانية لغتاي الأم، وأتحدث الإنجليزية بطلاقة تكفي للمفاوضات.",
    belegeVerweis: "المحطات في سيرتي الذاتية (بالألمانية)",
  },

  /* Rückübersetzung:
   *   titel        Wann Sie mich hinzuziehen können
   *   Spalten      Einsatz · So läuft es ab
   *   Arzt und Krankenhaus: Ich dolmetsche das Gespräch mit Ärztin, Arzt
   *     oder Pflegepersonal, vor Ort oder per Video.
   *   Behörden, Jobcenter und Ausländerbehörde: Ich dolmetsche das Gespräch
   *     und übersetze Schreiben zum Verständnis; Rechtsberatung gebe ich
   *     nicht.
   *   Notar und Standesamt: Nach Absprache mit dem Notariat oder dem
   *     Standesamt. Bitte nennen Sie dort vorab meinen Namen.
   *   Kanzlei: Mandantengespräche vor Ort, per Video oder Telefon.
   *   Unternehmen und Messen: Gespräche, Verhandlungen und Messetage, auch
   *     mit Themen aus IT und Wirtschaft.
   *   Video und Telefon: Kurzfristig möglich, auch abends und am Wochenende.
   *   Schriftliche Übersetzung: der Zwecksatz oben. */
  einsatzarten: {
    titel: "متى يمكنك الاستعانة بي",
    ersteSpalte: "المهمة",
    tabelle: {
      columns: ["كيف يجري الأمر"],
      rows: [
        { label: "الطبيب والمستشفى", cells: ["أترجم الحديث مع الطبيبة أو الطبيب أو طاقم التمريض، حضوريًا أو عبر الفيديو."] },
        {
          label: "الدوائر الحكومية ومركز التوظيف ودائرة الأجانب",
          cells: ["أترجم الحديث وأترجم الرسائل للفهم؛ ولا أقدّم استشارات قانونية."],
        },
        {
          label: "كاتب العدل ومكتب الأحوال المدنية",
          cells: ["بالاتفاق مع مكتب كاتب العدل أو مكتب الأحوال المدنية. يُرجى إبلاغهم باسمي مسبقًا."],
        },
        { label: "مكتب المحاماة", cells: ["مقابلات الموكلين حضوريًا أو عبر الفيديو أو الهاتف."] },
        {
          label: "الشركات والمعارض",
          cells: ["المحادثات والمفاوضات وأيام المعارض، بما في ذلك موضوعات تقنية المعلومات والاقتصاد."],
        },
        { label: "الفيديو والهاتف", cells: ["ممكن في وقت قريب، وكذلك مساءً وفي عطلة نهاية الأسبوع."] },
        { label: "الترجمة التحريرية", cells: [zweck] },
      ],
    },
  },

  /* Rückübersetzung:
   *   titel        Preise; Spalten: Leistung · Preis · Bedingungen
   *   Dolmetschen vor Ort: 70 Euro je Stunde. Mindestens eine Stunde, danach
   *     35 Euro je 30 Minuten oder einen Teil davon. Die Zeit zählt vom
   *     vereinbarten Beginn bis zum Ende des Termins, Wartezeit eingeschlossen.
   *   Anfahrt: inklusive in Frankfurt und der nahen Umgebung, sonst 15, 25
   *     oder 35 Euro. Feste Beträge je Entfernungsstufe, siehe unten. Fahrzeit
   *     berechne ich nicht.
   *   Video und Telefon: 35 Euro je 30 Minuten oder einen Teil davon.
   *   Notar und Standesamt: 240 Euro Festpreis. Bis zwei Stunden; enthalten
   *     sind die Durchsicht des Entwurfs vor dem Termin und die Anfahrt in der
   *     ersten Stufe; liegt der Ort weiter entfernt, kommt der Betrag der Stufe
   *     hinzu. Darüber hinaus 35 Euro je 30 Minuten oder einen Teil davon.
   *     Gebühren, die Standesamt oder Notar selbst erheben, zahlen Sie dort.
   *   Schriftliche Übersetzung: 1,40 Euro je Normzeile. Jede begonnene Zeile
   *     zählt, eine Zeile hat 55 Zeichen einschließlich Leerzeichen, gezählt
   *     im deutschen oder englischen Text; Mindestauftrag 30 Euro; den
   *     Gesamtpreis nenne ich vor Beginn. Dazu der Zwecksatz.
   *   Messe und Verhandlung: 320 Euro für einen halben Tag, 590 Euro für
   *     einen ganzen Tag. Halber Tag bis 4 Stunden, ganzer Tag bis 8 Stunden;
   *     darüber hinaus 35 Euro je 30 Minuten oder einen Teil davon.
   *
   *   anfahrt.titel  Anfahrt; Spalten: Entfernung · Betrag · Orte
   *   anfahrt.text   Die genannten Orte sind ihrer Stufe fest zugeordnet.
   *                  Andere Orte ordne ich nach der Fahrstrecke ab der
   *                  Hauptwache in der Frankfurter Innenstadt ein (Name auch
   *                  in lateinischer Schrift) und nenne den Betrag in meiner
   *                  Antwort mit Termin und Preis; dabei bleibt es, auch wenn
   *                  die Fahrt länger dauert.
   *   anfahrt.beispiel  Beispiel: Eine Stunde in Hanau kostet 70 Euro +
   *                  15 Euro = 85 Euro.
   *   ratgeber       Was kostet ein Dolmetscher? Preise im Vergleich (Seite
   *                  auf Deutsch) */
  preise: {
    titel: "الأسعار",
    ersteSpalte: "الخدمة",
    tabelle: {
      columns: ["السعر", "الشروط"],
      rows: [
        {
          schluessel: "vorOrt",
          label: "الترجمة الحضورية",
          cells: [
            `${p(DOLMETSCH_PREIS.vorOrtStunde)} للساعة`,
            `الحد الأدنى ساعة واحدة، وبعدها ${halbe}. يُحسب الوقت من بداية الموعد المتفق عليها حتى نهايته، بما في ذلك وقت الانتظار.`,
          ],
        },
        {
          schluessel: "anfahrt",
          label: "التنقل",
          cells: [
            `مشمول في فرانكفورت والمناطق القريبة منها، وإلا ${stufenBetraege.slice(0, -1).join(" أو ")} أو ${stufenBetraege.at(-1)}`,
            "مبالغ ثابتة حسب فئة المسافة، انظر أدناه. لا أحتسب وقت السفر.",
          ],
        },
        {
          schluessel: "videoTelefon",
          label: "الفيديو والهاتف",
          cells: [halbe, ""],
        },
        {
          schluessel: "notarStandesamt",
          label: "كاتب العدل ومكتب الأحوال المدنية",
          cells: [
            `${p(DOLMETSCH_PREIS.notarStandesamt)} سعر ثابت`,
            `حتى ساعتين، ويشمل ذلك مراجعة المسودة قبل الموعد والتنقل ضمن الفئة الأولى؛ وإذا كان المكان أبعد يُضاف مبلغ فئته. وما زاد على ذلك ${halbe}. الرسوم التي يفرضها مكتب الأحوال المدنية أو كاتب العدل تُدفع هناك.`,
          ],
        },
        {
          schluessel: "uebersetzung",
          label: "الترجمة التحريرية",
          cells: [
            `${p(DOLMETSCH_PREIS.normzeile)} للسطر المعياري`,
            `يُحتسب كل سطر بدأ، والسطر 55 حرفًا بما فيها المسافات، ويُعدّ في النص الألماني أو الإنجليزي؛ الحد الأدنى للطلب ${p(DOLMETSCH_PREIS.mindestauftrag)}؛ وأذكر السعر الإجمالي قبل البدء. ${zweck}`,
          ],
        },
        {
          schluessel: "messe",
          label: "المعارض والمفاوضات",
          cells: [
            `${p(DOLMETSCH_PREIS.messeHalbtag)} لنصف يوم، ${p(DOLMETSCH_PREIS.messeTag)} ليوم كامل`,
            `نصف اليوم حتى 4 ساعات، واليوم الكامل حتى 8 ساعات؛ وما زاد على ذلك ${halbe}.`,
          ],
        },
      ],
    },
    anfahrt: {
      titel: "التنقل",
      text: `الأماكن المذكورة مصنّفة مسبقًا ضمن فئاتها. أما الأماكن الأخرى فأصنّفها حسب مسافة القيادة من ساحة هاوبتفاخه في وسط فرانكفورت (${ANFAHRT_START})، وأذكر المبلغ في ردي مع الموعد والسعر؛ ويبقى كما هو حتى لو استغرقت الرحلة وقتًا أطول.`,
      ersteSpalte: "المسافة",
      tabelle: {
        columns: ["المبلغ", "الأماكن"],
        rows: ANFAHRT_STUFEN.map((stufe) => ({
          label: stufenLabel(stufe),
          cells: [stufenBetrag(stufe), stufenOrte(stufe)],
        })),
      },
      beispiel: `مثال: ساعة واحدة في هاناو تكلف ${p(DOLMETSCH_PREIS.vorOrtStunde)} + ${p(hanau.betrag)} = ${p(DOLMETSCH_PREIS.vorOrtStunde + hanau.betrag)}.`,
    },
    ratgeber: {
      text: "كم يكلّف المترجم الفوري؟ مقارنة الأسعار (الصفحة بالألمانية)",
      href: "/dolmetscher-arabisch-frankfurt/kosten",
    },
  },

  /* Rückübersetzung:
   *   titel        So läuft eine Anfrage ab
   *   workflow.titel  Ablauf einer Anfrage
   *   beschreibung Ablauf einer Anfrage: Sie senden eine Anfrage, ich
   *                antworte in der Regel innerhalb von 24 Stunden mit Termin
   *                und Preis oder mit einer Absage, dann sagen Sie zu, danach
   *                kommen der Einsatz und die Rechnung.
   *   Knoten       Anfrage (Formular oder WhatsApp) · Antwort (Termin oder
   *                Absage) · Ihre Zusage (dann verbindlich) · Termin (vor Ort
   *                oder per Video) · Rechnung (nach dem Termin)
   *   unterschrift Ich antworte in der Regel innerhalb von 24 Stunden mit
   *                Termin und Preis oder mit einer Absage. Verbindlich wird
   *                der Termin erst mit Ihrer Zusage. */
  ablauf: {
    titel: "كيف يجري الطلب",
    workflow: {
      titel: "مراحل الطلب",
      fenster: "app",
      beschreibung:
        "مراحل الطلب: ترسل طلبًا، فأرد عادةً خلال 24 ساعة بموعد وسعر أو باعتذار، ثم توافق أنت، وبعدها يأتي الموعد ثم الفاتورة.",
      knoten: [
        { id: "anfrage", art: "ausloeser", icon: "formular", label: "الطلب", sub: "نموذج أو واتساب", spalte: 0, zeile: 0 },
        { id: "antwort", art: "mensch", icon: "person-ok", label: "الرد", sub: "موعد أو اعتذار", spalte: 1, zeile: 0 },
        { id: "zusage", icon: "checkbox", label: "موافقتك", sub: "ثم يصبح مُلزمًا", spalte: 2, zeile: 0 },
        { id: "einsatz", icon: "personen", label: "الموعد", sub: "حضوريًا أو بالفيديو", spalte: 3, zeile: 0 },
        { id: "rechnung", icon: "rechner", label: "الفاتورة", sub: "بعد الموعد", spalte: 4, zeile: 0 },
      ],
      kanten: [
        { von: "anfrage", nach: "antwort" },
        { von: "antwort", nach: "zusage" },
        { von: "zusage", nach: "einsatz" },
        { von: "einsatz", nach: "rechnung" },
      ],
    },
    unterschrift:
      "أرد عادةً خلال 24 ساعة بموعد وسعر أو باعتذار. ولا يصبح الموعد مُلزمًا إلا بعد موافقتك.",
  },

  /* Rückübersetzung:
   *   titel      Sprachen und Dialekte
   *   text       Ich spreche Hocharabisch, den levantinischen Dialekt
   *              (Syrien, Libanon, Palästina, Jordanien), Ägyptisch,
   *              Irakisch und Golf-Arabisch, dazu Deutsch und Englisch.
   *   richtungen Sprachrichtungen: von Deutsch nach Arabisch und von
   *              Arabisch nach Deutsch, von Englisch nach Arabisch und von
   *              Arabisch nach Englisch */
  sprachen: {
    titel: "اللغات واللهجات",
    text: "أتحدث العربية الفصحى، واللهجة الشامية (سوريا ولبنان وفلسطين والأردن)، والمصرية، والعراقية، والخليجية، إلى جانب الألمانية والإنجليزية.",
    richtungen:
      "اتجاهات الترجمة: من الألمانية إلى العربية ومن العربية إلى الألمانية، ومن الإنجليزية إلى العربية ومن العربية إلى الإنجليزية",
  },

  /* Rückübersetzung:
   *   titel    Für Unternehmen
   *   text     Bei Messen und Verhandlungen dolmetsche ich konsekutiv, also
   *            nach jedem Redebeitrag. Fachtexte aus IT und Wirtschaft
   *            übersetze ich mit dem Hintergrund eines Masterstudiums in
   *            Wirtschaftsinformatik (M.Sc.).
   *   verweis  Ihre Website auf Arabisch, mit Leserichtung von rechts nach
   *            links (Seite auf Deutsch) */
  unternehmen: {
    titel: "للشركات",
    text: "في المعارض والمفاوضات أترجم ترجمةً تتابعية، أي بعد كل مداخلة. وأترجم النصوص المتخصصة في تقنية المعلومات والاقتصاد بخلفية دراسة الماجستير في نظم المعلومات الإدارية (M.Sc.).",
    verweis: {
      text: "موقعك الإلكتروني بالعربية، باتجاه القراءة من اليمين إلى اليسار (الصفحة بالألمانية)",
      href: "/leistungen/webentwicklung",
    },
  },

  /* Rückübersetzung:
   *   titel  Vertraulichkeit
   *   text   Was ich bei einem Einsatz erfahre, behandle ich vertraulich. Auf
   *          Wunsch unterschreibe ich eine Verschwiegenheitsvereinbarung. */
  vertraulichkeit: {
    titel: "السرية",
    text: "ما أطّلع عليه خلال أي مهمة أتعامل معه بسرية. وعند الطلب أوقّع اتفاقية عدم إفصاح.",
  },

  /* Rückübersetzung:
   *   titel       Anfrage senden
   *   einleitung  Schreiben Sie mir kurz, worum es geht. Ich antworte in der
   *               Regel innerhalb von 24 Stunden mit Termin und Preis oder
   *               mit einer Absage. */
  anfrage: {
    titel: "إرسال طلب",
    einleitung: "اكتب لي باختصار ما الموضوع. أرد عادةً خلال 24 ساعة بموعد وسعر أو باعتذار.",
  },

  /* Rückübersetzung:
   *   titel  Häufige Fragen
   *   1. Wann bekomme ich eine Antwort? Ich antworte in der Regel innerhalb
   *      von 24 Stunden, mit Termin und Preis oder mit einer Absage. Wenn es
   *      eilt, schreiben Sie mir über WhatsApp oder rufen Sie an.
   *   2. Was kostet es? Die Preise stehen oben in der Tabelle, alle als
   *      Endpreise. Sie zahlen auf Rechnung nach dem Einsatz. Bei kurzen
   *      Terminen an entfernten Orten schlage ich oft Video oder Telefon vor.
   *   3. Geht es auch abends und am Wochenende? Ja, nach Absprache. Abends
   *      und am Wochenende gilt derselbe Preis, ohne Zuschlag.
   *   4. Welche Dialekte? Hocharabisch, Levantinisch (Syrien, Libanon,
   *      Palästina, Jordanien), Ägyptisch, Irakisch und Golf-Arabisch.
   *   5. Wie läuft ein Termin per Video? Ich nehme an dem Termin teil, zu dem
   *      Sie oder die Praxis mich einladen.
   *   6. Wie schicke ich Unterlagen für eine Übersetzung? Per E-Mail, nach
   *      meiner Antwort auf Ihre Anfrage. Hängen Sie im Formular keine
   *      Unterlagen an.
   *   7. Was passiert, wenn ich absage? Absagen bis 24 Stunden vor dem
   *      Termin kosten nichts. Bei späterer Absage oder wenn Sie nicht
   *      erscheinen, berechne ich 70 Euro, bei Video- und Telefonterminen
   *      35 Euro. Sie können nachweisen, dass mir kein oder ein wesentlich
   *      geringerer Schaden entstanden ist. Ein gesetzliches Widerrufsrecht
   *      bleibt bestehen. */
  fragen: {
    titel: "أسئلة شائعة",
    liste: [
      {
        q: "متى أحصل على رد؟",
        a: "أرد عادةً خلال 24 ساعة، بموعد وسعر أو باعتذار. وإذا كان الأمر عاجلًا فراسلني عبر واتساب أو اتصل بي.",
      },
      {
        q: "كم التكلفة؟",
        a: "الأسعار مذكورة في الجدول أعلاه، وكلها أسعار نهائية. تدفع بموجب فاتورة بعد انتهاء المهمة. وفي المواعيد القصيرة في أماكن بعيدة أقترح غالبًا الفيديو أو الهاتف.",
      },
      {
        q: "هل يمكن ذلك مساءً وفي عطلة نهاية الأسبوع؟",
        a: "نعم، بالاتفاق. ويبقى السعر نفسه مساءً وفي عطلة نهاية الأسبوع، دون أي زيادة.",
      },
      {
        q: "ما اللهجات؟",
        a: "العربية الفصحى، والشامية (سوريا ولبنان وفلسطين والأردن)، والمصرية، والعراقية، والخليجية.",
      },
      {
        q: "كيف يجري الموعد عبر الفيديو؟",
        a: "أنضم إلى الموعد الذي تدعوني إليه أنت أو العيادة.",
      },
      {
        q: "كيف أرسل المستندات للترجمة؟",
        a: "بالبريد الإلكتروني، بعد ردي على طلبك. لا تُرفق أي مستندات في النموذج.",
      },
      {
        q: "ماذا يحدث إذا ألغيت الموعد؟",
        a: `الإلغاء حتى 24 ساعة قبل الموعد مجاني. أما الإلغاء بعد ذلك أو عدم الحضور فأحتسب عنه ${p(DOLMETSCH_PREIS.vorOrtStunde)}، وفي مواعيد الفيديو والهاتف ${p(DOLMETSCH_PREIS.halbeStunde)}. ويمكنك أن تثبت أنه لم يلحقني ضرر أو أن الضرر أقل بكثير. ويبقى حق الانسحاب المقرر قانونًا قائمًا.`,
      },
    ],
  },
};
