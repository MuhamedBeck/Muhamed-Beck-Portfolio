// Estimated width of a search-result title or description, in pixels.
//
// Google truncates snippets by pixel width, not by character count. A 64-
// character title such as "Leistungen: KI-Automatisierung und Webentwicklung |
// Muhamed Beck" measures 628 px and gets cut, while a 70-character one made of
// narrow letters fits. The character limits in check-i18n.js let twelve titles
// through that Seobility then reported as truncated (crawl of 26.10.2026).
//
// Widths are the standard Arial metrics in 1/1000 em; umlauts take the width of
// their base letter, anything not listed the width of a digit. Checked on
// 26.10.2026 against Seobility's own measurement of eleven titles and
// descriptions: within 1 %, titles slightly under, descriptions slightly over.
// Latin script only: the table knows no Arabic glyphs.

const WIDTH = {
  ...Object.fromEntries([..."abdeghnopqu0123456789äöü€$#"].map((c) => [c, 556])),
  ...Object.fromEntries([..."ckvxyzsJ?"].map((c) => [c, 500])),
  f: 278, i: 222, j: 222, l: 222, m: 833, r: 333, t: 278, w: 722,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278,
  K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667,
  T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  Ä: 667, Ö: 778, Ü: 722, ß: 611,
  " ": 278, ".": 278, ",": 278, ":": 278, ";": 278, "!": 278, "/": 278,
  "-": 333, "(": 333, ")": 333, "„": 333, "“": 333, "|": 260, "&": 667,
  "'": 191, '"': 355, "%": 889, "+": 584, "*": 389, "–": 556, "@": 1015,
};
const DEFAULT_WIDTH = 556;

/** Width of `text` set in Arial at `fontSize` px, rounded to whole pixels. */
export const estimatePixelWidth = (text, fontSize) =>
  Math.round(
    ([...text].reduce((sum, c) => sum + (WIDTH[c] ?? DEFAULT_WIDTH), 0) * fontSize) / 1000
  );

/** True when every character is Latin or common punctuation, i.e. measurable. */
export const isMeasurable = (text) => /^[\u0020-\u024F\u2000-\u20CF]*$/u.test(text);

// Titles are set at 20 px, descriptions at 14 px. Seobility cuts at 580 and
// 1000 px; the margins below absorb the estimate's error in each direction.
export const TITLE_FONT_PX = 20;
export const TITLE_MAX_PX = 575;
export const DESCRIPTION_FONT_PX = 14;
export const DESCRIPTION_MAX_PX = 1000;
