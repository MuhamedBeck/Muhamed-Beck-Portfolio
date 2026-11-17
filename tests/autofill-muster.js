// Feldarten, die Browser aus einem gespeicherten Profil befüllen. Geteilt von
// worker/anfrage.test.js (Spamfeld) und tests/dolmetscher-formular.test.js
// (Felder der Dolmetscher-Seite).
//
// Chrome füllt auch Felder aus, die aus dem Bild geschoben sind, sobald ihr
// Name nach Adresse, Name oder Kontakt klingt; autocomplete="off" hält das
// nicht auf. Der frühere Name "zweitadresse" galt als "Adresszeile 1": Wer
// den Autofill-Vorschlag annahm, wurde für einen Bot gehalten, sah die
// Bestätigung, und es ging weder Mail noch Datei hinaus (13.10. bis 14.11.2026).
// Die Liste folgt den Feldarten, die Browser aus Profilen befüllen.
export const AUTOFILL_MUSTER =
  /adress|address|addr|street|stra(ss|ß)e|haus|name|mail|tel|phone|fon|mobil|handy|fax|ort|stadt|city|plz|zip|post|land|country|state|region|firma|company|organi[sz]ation|unternehmen|nummer|number|karte|card|cvc|cvv|iban|konto|geburt|birth|url|web|homepage|user|login|pass|kennwort/i;
