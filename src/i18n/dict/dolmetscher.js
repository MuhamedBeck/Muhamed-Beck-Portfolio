// Texte der Dolmetscher-Seite, die in allen drei Fassungen gleich gebaut sind:
// Kopfzeile, Kontaktwege, Fuß, Preis-Hinweis und Anfrageformular. Der
// Seitenkörper steht je Sprache in src/content/dolmetscher.<sprache>.js.
//
// Die Werte der Auswahlfelder (Schlüssel unter `optionen`) sind fest und
// sprachneutral; in Mail und Archiv steht immer die deutsche Beschriftung
// (src/services/dolmetscherAnfrage.js).
import { PERSON } from "../../content/site.js";

const de = {
  kopf: {
    name: PERSON.name,
    rolle: "Dolmetscher und Übersetzer",
    whatsappAria: "Über WhatsApp schreiben",
    anrufAria: "Anrufen",
    whatsappText: "Guten Tag Herr Beck, ich möchte einen Termin anfragen. Datum und Uhrzeit: … Ort: …",
  },
  wege: {
    anfrage: "Anfrage stellen",
    whatsapp: "WhatsApp",
    anruf: "Anruf",
    email: "E-Mail",
    whatsappHinweis: "Für kurze Fragen und eilige Termine.",
    anrufHinweis: "Wenn es eilt oder Sie lieber sprechen.",
    emailHinweis: "Antwort in der Regel innerhalb von 24 Stunden.",
  },
  fuss: {
    kontakt: "Kontakt",
    itVerweis: "IT und Automatisierung: muhamedbeck.com",
    widerruf: "Widerrufsbelehrung",
    rechtstexteHinweis: "",
  },
  preise: {
    // Ausführliche Form von UST_HINWEIS (src/content/site.js).
    endpreise:
      "Alle Preise sind Endpreise; als Kleinunternehmer nach § 19 UStG berechne ich keine Umsatzsteuer. Weitere Kosten fallen nicht an.",
  },
  formular: {
    hinweis:
      "Das ist eine Anfrage, keine Buchung, und sie verpflichtet Sie zu nichts. Ich antworte in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage. Verbindlich wird der Termin erst, wenn Sie mir das bestätigen. Wenn es schneller gehen muss: WhatsApp oder Anruf.",
    widerruf: "Für Verbraucher: Widerrufsbelehrung",
    bestaetigungTitel: "Ihre Anfrage ist angekommen.",
    bestaetigungText:
      "Sie ist noch keine Buchung: Ich melde mich in der Regel innerhalb von 24 Stunden mit Termin und Preis oder mit einer Absage. Haben Sie bis dahin nichts gehört, rufen Sie mich bitte an; ohne meine Antwort ist nichts vereinbart.",
    zwecksatz:
      "Übersetzungen zum Verständnis und für den Geschäftsverkehr, nicht zur Vorlage bei Ämtern oder Gerichten.",
    art: {
      label: "Art der Anfrage",
      bitte: "Bitte auswählen",
      optionen: {
        "vor-ort": "Termin vor Ort",
        "video-telefon": "Video oder Telefon",
        uebersetzung: "Schriftliche Übersetzung",
      },
    },
    sprachen: {
      label: "Sprachen",
      bitte: "Bitte auswählen",
      optionen: {
        "de-ar": "Deutsch und Arabisch",
        "en-ar": "Englisch und Arabisch",
      },
    },
    anlass: {
      label: "Anlass",
      keine: "Keine Angabe",
      optionen: {
        behoerde: "Behörde",
        "notar-standesamt": "Notar oder Standesamt",
        kanzlei: "Kanzlei",
        "unternehmen-messe": "Unternehmen oder Messe",
        privat: "Privater Termin",
        sonstiges: "Sonstiges",
      },
    },
    wunschdatum: { label: "Wunschtermin: Datum" },
    wunschzeit: { label: "Uhrzeit" },
    wunschterminHinweis: "deutsche Zeit",
    treffpunkt: {
      label: "Wo findet der Termin statt?",
      hinweis: "Stadt oder Stadtteil genügt",
    },
    name: { label: "Name" },
    email: {
      label: "E-Mail",
      format: "Bitte eine vollständige E-Mail-Adresse, z. B. name@beispiel.de",
    },
    telefon: {
      label: "Telefon",
      hinweis: "für Rückfragen und kurzfristige Termine",
    },
    herkunft: {
      label: "Gefunden über",
      keine: "Keine Angabe",
      optionen: {
        google: "Google",
        kleinanzeigen: "Kleinanzeigen",
        empfehlung: "Empfehlung",
        "whatsapp-social": "WhatsApp-Gruppe oder soziale Medien",
        verzeichnis: "Verzeichnis",
        sonstiges: "Sonstiges",
      },
    },
    nachricht: {
      label: "Worum geht es?",
      hinweis: "kurz, ohne Diagnosen, Aktenzeichen, Unterlagen und ohne Namen anderer Personen",
    },
    pflicht: "Pflichtfeld",
    freiwillig: "freiwillig",
    senden: "Anfrage senden",
    sendet: "Wird gesendet",
    fehler:
      "Die Anfrage konnte gerade nicht gesendet werden. Bitte schreiben Sie mir über WhatsApp, rufen Sie an oder schicken Sie eine E-Mail:",
    nichtVerfuegbar:
      "Das Formular ist gerade nicht verfügbar. Sie erreichen mich über WhatsApp, Telefon oder E-Mail:",
    datenschutz: {
      titel: "Datenschutz in Kürze",
      absaetze: [
        `Verantwortlich ist ${PERSON.name}; Sie erreichen mich über die Kontaktwege auf dieser Seite. Ich verarbeite die Angaben aus diesem Formular, um Ihre Anfrage zu beantworten.`,
        "Die Anfrage geht über den Dienst EmailJS an mein Postfach und wird zusätzlich als Datei bei GitHub abgelegt; dabei kann eine Verarbeitung in den USA stattfinden. Ich lösche die Angaben, sobald Ihre Anfrage erledigt ist und keine Aufbewahrungspflicht besteht.",
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch; eine E-Mail an mich genügt.",
      ],
      volltext: "Datenschutzerklärung (deutsch)",
    },
  },
};

const en = {
  kopf: {
    name: PERSON.name,
    rolle: "Interpreter and translator",
    whatsappAria: "Message on WhatsApp",
    anrufAria: "Call",
    whatsappText: "Hello Mr Beck, I would like to request an appointment. Date and time: … Place: …",
  },
  wege: {
    anfrage: "Send a request",
    whatsapp: "WhatsApp",
    anruf: "Call",
    email: "Email",
    whatsappHinweis: "For short questions and urgent appointments.",
    anrufHinweis: "If it is urgent or you would rather talk.",
    emailHinweis: "Reply usually within 24 hours.",
  },
  fuss: {
    kontakt: "Contact",
    itVerweis: "IT and automation: muhamedbeck.com",
    widerruf: "Right of withdrawal (German)",
    rechtstexteHinweis: "The imprint, the privacy policy and the right of withdrawal are available in German.",
  },
  preise: {
    endpreise:
      "All prices are final prices; as a small business under § 19 UStG I do not charge VAT. There are no further costs.",
  },
  formular: {
    hinweis:
      "This is a request, not a booking, and it does not commit you to anything. I reply, usually within 24 hours, with a date and price or with a decline. The appointment only becomes binding once you confirm it to me. If it is urgent: WhatsApp or call.",
    widerruf: "For consumers: right of withdrawal (in German)",
    bestaetigungTitel: "Your request has arrived.",
    bestaetigungText:
      "It is not yet a booking: I will get back to you, usually within 24 hours, with a date and price or with a decline. If you have not heard from me by then, please call me; nothing is agreed without my reply.",
    zwecksatz:
      "Translations for understanding and business use, not for submission to authorities or courts.",
    art: {
      label: "Type of request",
      bitte: "Please select",
      optionen: {
        "vor-ort": "Appointment on site",
        "video-telefon": "Video or phone",
        uebersetzung: "Written translation",
      },
    },
    sprachen: {
      label: "Languages",
      bitte: "Please select",
      optionen: {
        "de-ar": "German and Arabic",
        "en-ar": "English and Arabic",
      },
    },
    anlass: {
      label: "Occasion",
      keine: "Not specified",
      optionen: {
        behoerde: "Public office",
        "notar-standesamt": "Notary or registry office",
        kanzlei: "Law firm",
        "unternehmen-messe": "Company or trade fair",
        privat: "Private appointment",
        sonstiges: "Other",
      },
    },
    wunschdatum: { label: "Preferred date" },
    wunschzeit: { label: "Time" },
    wunschterminHinweis: "German time",
    treffpunkt: {
      label: "Where does the appointment take place?",
      hinweis: "City or district is enough",
    },
    name: { label: "Name" },
    email: {
      label: "Email",
      format: "Please enter a complete email address, e.g. name@example.com",
    },
    telefon: {
      label: "Phone",
      hinweis: "for questions and short-notice appointments",
    },
    herkunft: {
      label: "Found via",
      keine: "Not specified",
      optionen: {
        google: "Google",
        kleinanzeigen: "Kleinanzeigen",
        empfehlung: "Recommendation",
        "whatsapp-social": "WhatsApp group or social media",
        verzeichnis: "Directory",
        sonstiges: "Other",
      },
    },
    nachricht: {
      label: "What is it about?",
      hinweis: "briefly, without diagnoses, case numbers, documents or names of other people",
    },
    pflicht: "required",
    freiwillig: "optional",
    senden: "Send request",
    sendet: "Sending",
    fehler:
      "The request could not be sent just now. Please message me on WhatsApp, call me or send an email:",
    nichtVerfuegbar:
      "The form is not available right now. You can reach me on WhatsApp, by phone or by email:",
    datenschutz: {
      titel: "Privacy in brief",
      absaetze: [
        `The controller is ${PERSON.name}; you can reach me through the contact options on this page. I process the details from this form to answer your request.`,
        "The request is sent to my mailbox via the EmailJS service and is also stored as a file on GitHub; this may involve processing in the USA. I delete the details once your request has been dealt with and no retention obligation applies.",
        "You have the right of access, rectification, erasure and objection; an email to me is enough.",
      ],
      volltext: "Privacy policy (German)",
    },
  },
};

/* Arabisch, Hocharabisch (فصحى).
 *
 * Rückübersetzung, damit ohne Arabischkenntnisse prüfbar bleibt, was hier steht:
 *
 *   kopf.name            Muhamed Nur Beck (in arabischer Schrift)
 *   kopf.rolle           Dolmetscher und Übersetzer (mündlich und schriftlich)
 *   kopf.whatsappAria    Über WhatsApp schreiben
 *   kopf.anrufAria       Anrufen
 *   kopf.whatsappText    Guten Tag Herr Beck, ich möchte einen Termin anfragen.
 *                        Datum und Uhrzeit: … Ort: …
 *   wege                 Anfrage senden · WhatsApp · Anruf · E-Mail
 *   wege.*Hinweis        Für kurze Fragen und eilige Termine. · Wenn es eilt
 *                        oder Sie lieber sprechen. · Antwort in der Regel
 *                        innerhalb von 24 Stunden.
 *   fuss                 Kontakt · IT und Automatisierung: muhamedbeck.com ·
 *                        Widerrufsrecht (auf Deutsch) · Impressum,
 *                        Datenschutzerklärung und Informationen zum
 *                        Widerrufsrecht gibt es auf Deutsch.
 *   preise.endpreise     Alle Preise sind Endpreise; als Kleinunternehmer nach
 *                        § 19 des deutschen Umsatzsteuergesetzes berechne ich
 *                        keine Mehrwertsteuer. Es gibt keine weiteren Kosten.
 *   formular.hinweis     Das ist eine Anfrage, keine Buchung, und sie
 *                        verpflichtet Sie zu nichts. Ich antworte in der Regel
 *                        innerhalb von 24 Stunden mit Termin und Preis oder mit
 *                        einer Absage. Verbindlich wird der Termin erst, wenn
 *                        Sie ihn mir bestätigen. Wenn es eilt: WhatsApp oder
 *                        Anruf.
 *   formular.widerruf    Für Verbraucher: Informationen zum Widerrufsrecht
 *                        (auf Deutsch)
 *   bestaetigung         Ihre Anfrage ist angekommen. Sie ist noch keine
 *                        Buchung: Ich melde mich in der Regel innerhalb von 24
 *                        Stunden mit Termin und Preis oder mit einer Absage.
 *                        Haben Sie bis dahin nichts gehört, rufen Sie mich bitte
 *                        an; ohne meine Antwort ist nichts vereinbart.
 *   zwecksatz            Übersetzungen zum Verständnis, für Schriftverkehr und
 *                        Geschäft, nicht zur Vorlage bei Behörden oder Gerichten.
 *   art                  Art der Anfrage: Termin vor Ort · Video oder Telefon ·
 *                        Schriftliche Übersetzung
 *   sprachen             Sprachen: Deutsch und Arabisch · Englisch und Arabisch
 *   anlass               Anlass: Behörde · Notar oder Standesamt · Kanzlei ·
 *                        Unternehmen oder Messe · Privater Termin · Sonstiges
 *   wunschtermin         Wunschtermin: Datum · Uhrzeit · deutsche Zeit
 *   treffpunkt           Wo findet der Termin statt? · Stadt oder Stadtteil genügt
 *   name, email          Name · E-Mail · Bitte eine vollständige E-Mail-Adresse
 *   telefon              Telefon · für Rückfragen und kurzfristige Termine
 *   herkunft             Gefunden über: Google · Kleinanzeigen · Empfehlung ·
 *                        WhatsApp-Gruppe oder soziale Medien · Verzeichnis ·
 *                        Sonstiges
 *   nachricht            Worum geht es? · kurz, ohne Diagnosen, Aktenzeichen,
 *                        Unterlagen und Namen anderer Personen
 *   pflicht, freiwillig  Pflichtfeld · freiwillig
 *   senden, sendet       Anfrage senden · Wird gesendet
 *   fehler               Die Anfrage konnte gerade nicht gesendet werden. Bitte
 *                        schreiben Sie mir über WhatsApp, rufen Sie an oder
 *                        schicken Sie eine E-Mail:
 *   nichtVerfuegbar      Das Formular ist gerade nicht verfügbar. Sie erreichen
 *                        mich über WhatsApp, Telefon oder E-Mail:
 *   datenschutz          Datenschutz in Kürze; drei Absätze wie im Deutschen;
 *                        Datenschutzerklärung (auf Deutsch) */
const ar = {
  kopf: {
    name: "محمد نور بيك",
    rolle: "مترجم شفوي وتحريري",
    whatsappAria: "مراسلة عبر واتساب",
    anrufAria: "اتصال هاتفي",
    whatsappText: "مرحبًا سيد بيك، أود طلب موعد. التاريخ والوقت: … المكان: …",
  },
  wege: {
    anfrage: "إرسال طلب",
    whatsapp: "واتساب",
    anruf: "اتصال",
    email: "البريد الإلكتروني",
    whatsappHinweis: "للأسئلة القصيرة والمواعيد العاجلة.",
    anrufHinweis: "إذا كان الأمر عاجلًا أو كنت تفضل التحدث.",
    emailHinweis: "الرد عادةً خلال 24 ساعة.",
  },
  fuss: {
    kontakt: "التواصل",
    itVerweis: "تقنية المعلومات والأتمتة: muhamedbeck.com",
    widerruf: "حق الانسحاب من العقد (بالألمانية)",
    rechtstexteHinweis: "بيانات الناشر وسياسة الخصوصية ومعلومات حق الانسحاب من العقد متاحة باللغة الألمانية.",
  },
  preise: {
    endpreise:
      "جميع الأسعار نهائية؛ بصفتي صاحب مشروع صغير وفق المادة 19 من قانون ضريبة المبيعات الألماني لا أحتسب ضريبة القيمة المضافة. لا توجد تكاليف إضافية.",
  },
  formular: {
    hinweis:
      "هذا طلب وليس حجزًا، ولا يُلزمك بشيء. أرد عادةً خلال 24 ساعة بموعد وسعر أو باعتذار. يصبح الموعد مُلزمًا فقط عندما تؤكده لي. إذا كان الأمر عاجلًا: واتساب أو اتصال هاتفي.",
    widerruf: "للمستهلكين: معلومات عن حق الانسحاب من العقد (بالألمانية)",
    bestaetigungTitel: "وصل طلبك.",
    bestaetigungText:
      "لم يصبح حجزًا بعد: سأتواصل معك عادةً خلال 24 ساعة بموعد وسعر أو باعتذار. إذا لم تسمع مني حتى ذلك الحين، فاتصل بي من فضلك؛ لا يُتفق على شيء دون ردي.",
    zwecksatz: "ترجمات للفهم وللمراسلات والأعمال، وليست للتقديم إلى الدوائر الحكومية أو المحاكم.",
    art: {
      label: "نوع الطلب",
      bitte: "يرجى الاختيار",
      optionen: {
        "vor-ort": "موعد حضوري",
        "video-telefon": "فيديو أو هاتف",
        uebersetzung: "ترجمة تحريرية",
      },
    },
    sprachen: {
      label: "اللغات",
      bitte: "يرجى الاختيار",
      optionen: {
        "de-ar": "الألمانية والعربية",
        "en-ar": "الإنجليزية والعربية",
      },
    },
    anlass: {
      label: "المناسبة",
      keine: "بدون تحديد",
      optionen: {
        behoerde: "دائرة حكومية",
        "notar-standesamt": "كاتب العدل أو مكتب الأحوال المدنية",
        kanzlei: "مكتب محاماة",
        "unternehmen-messe": "شركة أو معرض تجاري",
        privat: "موعد خاص",
        sonstiges: "غير ذلك",
      },
    },
    wunschdatum: { label: "الموعد المرغوب: التاريخ" },
    wunschzeit: { label: "الوقت" },
    wunschterminHinweis: "بتوقيت ألمانيا",
    treffpunkt: {
      label: "أين يُعقد الموعد؟",
      hinweis: "يكفي ذكر المدينة أو الحي",
    },
    name: { label: "الاسم" },
    email: {
      label: "البريد الإلكتروني",
      format: "يرجى إدخال عنوان بريد إلكتروني كامل، مثل name@example.com",
    },
    telefon: {
      label: "الهاتف",
      hinweis: "للاستفسارات والمواعيد القريبة",
    },
    herkunft: {
      label: "عرفتني عن طريق",
      keine: "بدون تحديد",
      optionen: {
        google: "Google",
        kleinanzeigen: "Kleinanzeigen",
        empfehlung: "توصية",
        "whatsapp-social": "مجموعة واتساب أو وسائل التواصل الاجتماعي",
        verzeichnis: "دليل",
        sonstiges: "غير ذلك",
      },
    },
    nachricht: {
      label: "ما الموضوع؟",
      hinweis: "باختصار، دون تشخيصات أو أرقام ملفات أو مستندات أو أسماء أشخاص آخرين",
    },
    pflicht: "حقل إلزامي",
    freiwillig: "اختياري",
    senden: "إرسال الطلب",
    sendet: "جارٍ الإرسال",
    fehler:
      "تعذّر إرسال الطلب الآن. يرجى مراسلتي عبر واتساب أو الاتصال بي أو إرسال بريد إلكتروني:",
    nichtVerfuegbar:
      "النموذج غير متاح حاليًا. يمكنك التواصل معي عبر واتساب أو الهاتف أو البريد الإلكتروني:",
    datenschutz: {
      titel: "الخصوصية باختصار",
      absaetze: [
        "المسؤول هو محمد نور بيك، ويمكنك التواصل معي عبر وسائل الاتصال في هذه الصفحة. أعالج البيانات الواردة في هذا النموذج للرد على طلبك.",
        "يُرسَل الطلب عبر خدمة EmailJS إلى بريدي، ويُحفظ أيضًا كملف لدى GitHub؛ وقد تتم المعالجة في الولايات المتحدة. أحذف البيانات بعد إنجاز طلبك ما لم يوجد التزام قانوني بالحفظ.",
        "لك الحق في الاطلاع والتصحيح والحذف والاعتراض؛ ويكفي إرسال بريد إلكتروني إليّ.",
      ],
      volltext: "سياسة الخصوصية (بالألمانية)",
    },
  },
};

export default { de, en, ar };
