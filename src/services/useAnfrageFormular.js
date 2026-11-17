import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "../content/emailjs";
import { anfrageArchivieren, hatSpamverdacht } from "./anfrage";
import { anfrageSenden } from "./dolmetscherAnfrage";

/**
 * Zustand und Absenden eines Anfrageformulars: Archiv und Mail über
 * anfrageSenden (src/services/dolmetscherAnfrage.js), Mail über EmailJS.
 *
 * Eine .js-Datei, weil ein Hook nicht aus einer .jsx-Datei neben Komponenten
 * exportiert werden darf. Kein Entwurfsspeicher: Die Angaben bleiben nur bis
 * zum Verlassen der Seite.
 *
 * @param {object} optionen
 * @param {object}   optionen.leer      Startwerte aller Felder
 * @param {Function} optionen.zuArchiv  (felder, verdacht) => Objekt für das Archiv
 * @param {Function} optionen.zuMail    (felder, verdacht) => Variablen der Mail
 */
export function useAnfrageFormular({ leer, zuArchiv, zuMail }) {
  const [felder, setFelder] = useState(leer);
  const [gesendet, setGesendet] = useState(false);
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState(false);

  const setze = (name, wert) => setFelder((vorher) => ({ ...vorher, [name]: wert }));

  const absenden = async (ereignis) => {
    ereignis.preventDefault();
    // Vor dem ersten await: danach ist currentTarget leer.
    const verdacht = hatSpamverdacht(ereignis.currentTarget);
    setLaedt(true);
    setFehler(false);
    const ergebnis = await anfrageSenden({
      archiv: zuArchiv(felder, verdacht),
      mail: zuMail(felder, verdacht),
      archivieren: anfrageArchivieren,
      mailSenden: (variablen) =>
        emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, variablen, EMAILJS.publicKey),
    });
    if (ergebnis.ok) {
      setGesendet(true);
      setFelder(leer);
    } else {
      console.error("Anfrage nicht gesendet:", ergebnis.grund);
      setFehler(true);
    }
    setLaedt(false);
  };

  return { felder, setze, absenden, gesendet, laedt, fehler };
}
