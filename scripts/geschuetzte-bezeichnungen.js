// Geschützte Bezeichnungen, die auf den Seiten der Gruppe `dolmetscher` und
// ihrer Untergruppen `dolmetscher.*` nicht stehen. Geprüft wird nach Stämmen
// und Mustern auf normalisiertem Text.
//
// Läuft unter bloßem Node (check-i18n, Tests, Prüfung nach dem Prerender):
// reines JavaScript, keine Importe.

export const GEPRUEFTE_GRUPPE = "dolmetscher";

/* Die Dolmetscher-Seite und ihre Unterseiten, etwa der Ratgeber zu den
   Kosten in der Gruppe `dolmetscher.kosten`. Nur der Punkt trennt, damit
   eine fremde Gruppe, die zufällig mit denselben Buchstaben beginnt, nicht
   mitgeprüft wird. */
export const istGepruefteGruppe = (gruppe) =>
  gruppe === GEPRUEFTE_GRUPPE || String(gruppe ?? "").startsWith(`${GEPRUEFTE_GRUPPE}.`);

const STAEMME = [
  // Deutsch
  "vereidig", "beeidig", "vereidet", "beeidet", "ermächtig", "beglaubig", "zertifi", "akkrediti",
  "lizenz", "autorisi", "anerkannt", "zugelassen", "zulassung", "gerichtlich", "gerichtsfest",
  "gerichtsdolmetsch", "gerichtsübersetz", "gerichtssprachmittl", "justizdolmetsch",
  "polizeidolmetsch", "urkundenübersetz", "urkundsübersetz", "notariell",
  "öffentlich bestellt", "staatlich geprüft", "rechtsgültig", "rechtsverbindlich",
  "stempel", "siegel", "kassenleistung",
  // Deutsch, mit ae, oe, ue statt der Umlaute geschrieben
  "ermaechtig", "gerichtsuebersetz", "urkundenuebersetz", "urkundsuebersetz",
  "oeffentlich bestellt", "staatlich geprueft",
  // Englisch
  "sworn", "certified", "accredited", "licensed", "registered", "approved", "appointed",
  "attested", "notarized", "notarised", "apostille", "court interpreter", "court translator",
  "court-appointed", "police interpreter", "state-certified", "official translation",
  "official translator", "legally valid", "legally recognised", "legally recognized",
  // Arabisch
  "محلف", "معتمد", "مرخص", "مجاز", "مصدق", "تصديق", "معترف", "ختم", "اختام",
];

const MUSTER = [
  /geprüfte[rn]? (dolmetscher|übersetzer)/,
  /diplom[- ]?(dolmetscher|übersetzer)/,
  /(bescheinigte|bestätigte|amtliche|offizielle)[nrs]? übersetzung/,
  /authori[sz]ed (translator|interpreter)/,
  // Arabische Wendungen, das zweite Wort mit oder ohne Artikel. Geschrieben in
  // der Form nach normalisieren: Ta marbuta als Ha, Alif maqsura als Ya.
  /ترجمه (ال)?موثقه/, /مترجم (ال)?محاكم/, /مترجم (ال)?محكمه/, /مترجم (ال)?قضائي/,
  /مترجم (ال)?رسمي/, /ترجمه (ال)?رسميه/, /وثائق (ال)?رسميه/, /ترجمه (ال)?قانونيه/,
  /مترجم (ال)?قانوني/,
];

/* Zeichen, die beim Abgleich nicht zählen: weicher Trennstrich, Breiten- und
   Richtungsmarken, Wortverbinder, BOM, arabische Vokalzeichen, Dehnungsstrich. */
const UNSICHTBAR = new RegExp(
  "\\u00AD|[\\u200B-\\u200F]|[\\u202A-\\u202E]|[\\u2060-\\u2064]|[\\u2066-\\u2069]|\\uFEFF|[\\u064B-\\u065F]|\\u0670|\\u0640",
  "g"
);

/**
 * Text in die Form bringen, in der gesucht wird: NFKC, klein, gleiche
 * Bindestriche, ohne unsichtbare Zeichen und Vokalzeichen, Alif-Formen
 * vereinheitlicht, Ta marbuta als Ha und Alif maqsura als Ya (beides wird im
 * Netz oft so geschrieben), Leerraum zusammengefasst.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalisieren(text) {
  return String(text)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‐‑]/g, "-")
    .replace(UNSICHTBAR, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Alle geschützten Bezeichnungen im Text: für Stämme der Stamm, für Muster
 * die gefundene Stelle, in Listenreihenfolge und ohne Dopplungen.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function findeBezeichnungen(text) {
  const normal = normalisieren(text);
  /* Dieselbe Wendung mit Bindestrich statt Leerzeichen („öffentlich-bestellt“)
     zählt genauso. */
  const ohneBindestrich = normal.replace(/-/g, " ");
  const treffer = [];
  for (const stamm of STAEMME) {
    if (normal.includes(stamm) || ohneBindestrich.includes(stamm.replace(/-/g, " "))) treffer.push(stamm);
  }
  for (const muster of MUSTER) {
    const fund = normal.match(muster) ?? ohneBindestrich.match(muster);
    if (fund) treffer.push(fund[0]);
  }
  return [...new Set(treffer)];
}

/**
 * Je Treffer eine Meldung „<ort>: geschützte Bezeichnung „<treffer>““.
 *
 * @param {Array<{ ort: string, text: string }>} eintraege
 * @returns {string[]}
 */
export function pruefeTexte(eintraege) {
  return eintraege.flatMap(({ ort, text }) =>
    findeBezeichnungen(text).map((treffer) => `${ort}: geschützte Bezeichnung „${treffer}“`)
  );
}

/* Zeichenentitäten, wie sie React und prerender-meta.js schreiben. */
const BENANNT = { amp: "&", lt: "<", gt: ">", quot: '"', nbsp: String.fromCharCode(160) };

const entitaetenAufloesen = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (ganz, name) => {
    if (name[0] !== "#") return BENANNT[name.toLowerCase()] ?? ganz;
    const zahl = name[1] === "x" || name[1] === "X" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    return Number.isInteger(zahl) && zahl >= 0 && zahl <= 0x10ffff ? String.fromCodePoint(zahl) : ganz;
  });

const prozentDekodiert = (wert) => {
  try {
    return decodeURIComponent(wert);
  } catch {
    return wert;
  }
};

const WURZEL = '<div id="root">';

/* Der Block der Vorlage (index.html) beschreibt die IT-Seite: Person, Website,
   Unternehmen. Er ist der einzige mit einem Knoten vom Typ WebSite; die Blöcke
   der Seite (Brotkrumen, Service) haben keinen. Erkannt wird er deshalb am
   Inhalt, nicht an seiner Stelle; was sich nicht lesen lässt, wird geprüft. */
const istVorlagenBlock = (block) => {
  try {
    const daten = JSON.parse(block);
    const knoten = Array.isArray(daten?.["@graph"]) ? daten["@graph"] : [daten];
    return knoten.some((eintrag) => eintrag?.["@type"] === "WebSite");
  } catch {
    return false;
  }
};

/**
 * Prüfbare Texte einer vorgerenderten Seite, für Stufe 2 der Sperre
 * (scripts/check-bezeichnungen.js): sichtbarer Text, einmal mit Lücke an
 * jedem Tag und einmal zusammengezogen (ein Wort kann über ein Tag laufen),
 * Titel und Meta-Angaben im Kopf, die strukturierten Daten der Seite ohne
 * den Block der Vorlage (istVorlagenBlock: der IT-Teil mit WebSite), dazu
 * Verweisziele und lesbare Attribute.
 *
 * @param {string} html
 * @returns {Array<{ ort: string, text: string }>}
 */
export function texteAusHtml(html) {
  const anfang = html.indexOf(WURZEL);
  const ende = html.lastIndexOf("</div>");
  const wurzel =
    anfang === -1 ? "" : html.slice(anfang + WURZEL.length, ende > anfang ? ende : undefined);
  const inhalt = wurzel
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  const kopfStart = html.indexOf("<head");
  const kopfEnde = html.indexOf("</head>");
  const kopf = kopfStart === -1 ? "" : html.slice(kopfStart, kopfEnde === -1 ? undefined : kopfEnde);
  const titel = [...kopf.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((treffer) => treffer[1]);
  const meta = [...kopf.matchAll(/<meta\b[^>]*\scontent="([^"]*)"/gi)].map((treffer) => treffer[1]);

  const daten = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((treffer) => treffer[1])
    .filter((block) => !istVorlagenBlock(block));

  const attribute = [...inhalt.matchAll(/\s(href|alt|title|aria-label|placeholder)="([^"]*)"/gi)].map(
    ([, name, wert]) => {
      const klar = entitaetenAufloesen(wert);
      return name.toLowerCase() === "href" ? `${klar} ${prozentDekodiert(klar)}` : klar;
    }
  );

  return [
    { ort: "Text", text: entitaetenAufloesen(inhalt.replace(/<[^>]*>/g, " ")) },
    { ort: "Text (zusammengezogen)", text: entitaetenAufloesen(inhalt.replace(/<[^>]*>/g, "")) },
    { ort: "Kopf", text: entitaetenAufloesen([...titel, ...meta].join("\n")) },
    { ort: "Strukturierte Daten", text: entitaetenAufloesen(daten.join("\n")) },
    { ort: "Verweise und Attribute", text: attribute.join("\n") },
  ];
}
