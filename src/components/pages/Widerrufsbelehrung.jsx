import { LegalPage } from "./LegalPage";
import { CONTACT, PERSON } from "../../content/site";

/* Angaben wie im Impressum. */
const ANSCHRIFT = `${PERSON.name}, Krögerstraße 4, 60313 ${PERSON.city}, Deutschland`;

const absaetze = (liste) => (
  <>
    {liste.map((text) => (
      <p key={text}>{text}</p>
    ))}
  </>
);

/*
 * Widerrufsrecht und Folgen des Widerrufs sind das gesetzliche Muster aus
 * Anlage 1 zu Art. 246a § 1 Abs. 2 Satz 2 EGBGB, für Dienstleistungen
 * ausgefüllt (Gestaltungshinweise 1 a, 2 und 6), das Formular ist Anlage 2.
 * Am Wortlaut des Musters wird nichts geändert, auch nicht an der Wir-Form
 * oder den Lieferkosten: Nur das unveränderte Muster gilt als ordnungsgemäße
 * Belehrung. Vorsatz und Hinweis zum vorzeitigen Erlöschen stehen außerhalb
 * des Musters, mit eigener Überschrift.
 */
const SECTIONS = [
  {
    title: "Für wen diese Belehrung gilt",
    body: absaetze([
      "Verbrauchern steht ein Widerrufsrecht nach folgender Maßgabe zu, wobei Verbraucher jede natürliche Person ist, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Für Unternehmen, Behörden und andere Auftraggeber, die nicht Verbraucher sind, gilt diese Belehrung nicht.",
    ]),
  },
  {
    title: "Widerrufsrecht",
    body: absaetze([
      "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.",
      "Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.",
      `Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (${ANSCHRIFT}, Telefon: ${CONTACT.phoneDisplay}, E-Mail: ${CONTACT.email}) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.`,
      "Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",
    ]),
  },
  {
    title: "Folgen des Widerrufs",
    body: absaetze([
      "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.",
      "Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.",
    ]),
  },
  {
    title: "Vorzeitiges Erlöschen des Widerrufsrechts",
    body: absaetze([
      "Das Widerrufsrecht erlischt vorzeitig, wenn wir die Dienstleistung vollständig erbracht haben und wir mit der Ausführung der Dienstleistung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.",
      "Liegt Ihr Termin oder die Lieferung Ihrer Übersetzung innerhalb der Widerrufsfrist, bitte ich Sie in meiner Antwort mit Termin und Preis, den früheren Beginn ausdrücklich zu verlangen und zu bestätigen, dass Ihnen das Erlöschen des Widerrufsrechts bekannt ist.",
    ]),
  },
  {
    title: "Muster-Widerrufsformular",
    body: absaetze([
      "(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)",
      `– An ${ANSCHRIFT}, E-Mail: ${CONTACT.email}:`,
      "– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)",
      "– Bestellt am (*)/erhalten am (*)",
      "– Name des/der Verbraucher(s)",
      "– Anschrift des/der Verbraucher(s)",
      "– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)",
      "– Datum",
      "(*) Unzutreffendes streichen.",
    ]),
  },
];

export const Widerrufsbelehrung = () => (
  <LegalPage label="Rechtliches" headline="Widerrufsbelehrung" intro="Stand: November 2026" sections={SECTIONS} />
);
