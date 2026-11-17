// Wortlaut der Datenschutzerklärung zu Anfrageformular, unsichtbarem Feld,
// WhatsApp und Aufträgen (src/components/pages/Datenschutz.jsx). Ausführen mit
// `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const quelle = readFileSync(new URL("../src/components/pages/Datenschutz.jsx", import.meta.url), "utf8");
// JSX auf Lesetext zurückführen: Leerzeichen-Ausdrücke, Tags, Umbrüche.
const text = quelle.replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const FELDER =
  "Im Anfrageformular für Dolmetsch- und Übersetzungsleistungen kommen hinzu: Art der Anfrage, Sprachen, Anlass, Wunschtermin, Ort des Termins, die Sprache der Seite, von der Sie anfragen, und, wenn Sie sie angeben, Ihre Telefonnummer. Bitte tragen Sie dort keine Gesundheitsdaten, Aktenzeichen, Unterlagen oder Namen anderer Personen ein.";
const SPAMFELD =
  /Zum Schutz vor automatisierten Einsendungen enthält das Formular ein für Menschen unsichtbares Feld\. War es beim Absenden ausgefüllt, wird die Anfrage in der E-Mail und in der Datei mit dem Vermerk „Spamverdacht[“"] gekennzeichnet; der Inhalt dieses Felds wird weder übertragen noch gespeichert\./;
const WHATSAPP =
  "Auf der Seite für Dolmetsch- und Übersetzungsleistungen können Sie mich über WhatsApp erreichen. Schon beim Öffnen des Verweises erhält WhatsApp technische Daten wie Ihre IP-Adresse. Anbieter ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland; sie verarbeitet diese Daten in eigener Verantwortung, auch in den USA (EU-US Data Privacy Framework, Standardvertragsklauseln). Wenn Sie mir dort schreiben, erhalte ich Ihre Telefonnummer, Ihren Profilnamen und den Inhalt der Nachricht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, bei Anfragen für andere Personen Art. 6 Abs. 1 lit. f DSGVO. Bitte senden Sie über WhatsApp keine Unterlagen und keine Angaben zur Gesundheit. Den Chatverlauf lösche ich, sobald Ihre Anfrage erledigt ist und keine Aufbewahrungspflicht besteht. Wenn Sie WhatsApp nicht nutzen möchten, erreichen Sie mich über das Formular, das Telefon oder die E-Mail-Adresse. Weitere Informationen: whatsapp.com/legal/privacy-policy-eea";
const AUFTRAEGE =
  "Unterlagen für eine Übersetzung schicken Sie mir bitte per E-Mail. Ich verwende sie nur für diesen Auftrag und lösche sie nach Abschluss, soweit keine gesetzliche Aufbewahrungspflicht besteht. An einem Videotermin nehme ich über den Dienst teil, zu dem Sie oder die Praxis einladen.";

test("die vier Passagen stehen im Wortlaut des Entwurfs", () => {
  assert.ok(text.includes(FELDER));
  assert.match(text, SPAMFELD);
  assert.ok(text.includes(WHATSAPP));
  assert.ok(text.includes(AUFTRAEGE));
});

test("jede Passage steht an ihrer Stelle", () => {
  assert.ok(text.includes(`zur Bearbeitung Ihrer Anfrage verarbeitet. ${FELDER} Für den technischen Versand`));
  assert.match(text, /nicht aber Ihre IP-Adresse\. Zum Schutz vor automatisierten Einsendungen/);
  const stelle = (teil) => text.indexOf(teil);
  assert.ok(stelle("keine gesetzlichen Aufbewahrungspflichten entgegenstehen.") < stelle(AUFTRAEGE));
  assert.ok(stelle(AUFTRAEGE) < stelle("6. Terminbuchung (Cal.com)"));
  assert.ok(stelle("7. Kontakt über WhatsApp") < stelle(WHATSAPP));
  assert.ok(stelle(WHATSAPP) < stelle("8. Schriftarten"));
});

test("Ziffern 1 bis 12, Verweise auf Ziffer 3 und 5 bleiben", () => {
  for (const titel of [
    "5. Kontaktformular (EmailJS und GitHub)", "6. Terminbuchung (Cal.com)", "7. Kontakt über WhatsApp",
    "8. Schriftarten", "9. Externe Links", "10. SSL- bzw. TLS-Verschlüsselung", "11. Ihre Rechte",
    "12. Aktualität dieser Datenschutzerklärung",
  ]) assert.ok(quelle.includes(`title: "${titel}"`), titel);
  assert.ok(!quelle.includes('title: "7. Schriftarten"'));
  assert.ok(text.includes("(Ziffer 5)") && text.includes("(Ziffer 3)"));
});
