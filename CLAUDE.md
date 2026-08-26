# CLAUDE.md — Portfolio muhamedbeck.com

Verbindliche Regeln für alle Claude-Code-Sessions in diesem Projekt.

## 1. Projekt

Persönliche Portfolio-Website von Muhamed Nur Beck, erreichbar unter
**muhamedbeck.com**.

| Aspekt   | Detail                                                        |
| -------- | ------------------------------------------------------------- |
| Stack    | React + Vite + Tailwind CSS v4 (`@tailwindcss/vite`)          |
| Routing  | `react-router-dom`, Routen aus `src/routes/registry.js`       |
| Sprachen | mehrsprachig über `src/i18n/` (Dictionaries + `locales.js`)   |
| Formular | `@emailjs/browser` (kein eigenes Backend)                     |
| Hosting  | Cloudflare Workers (`wrangler.jsonc`), Assets aus `dist/`     |
| Repo     | github.com/MuhamedBeck/Muhamed-Beck-Portfolio                 |

## 2. Der Build ist eine Kette, kein einzelner Befehl (PFLICHT)

```
npm run build
  1. node scripts/check-i18n.js     Gate: Registry + Dictionaries prüfen
  2. node generate-sitemap.js       sitemap.xml aus der Route-Registry
  3. vite build                     Client-Bundle nach dist/
  4. vite build --ssr …             SSR-Bundle nach dist-ssr/
  5. node prerender-meta.js         schreibt dist/<route>/index.html
```

**Niemals `vite build` allein aufrufen.** Ohne Schritt 5 bekommt jede Unterseite
den Titel und die Beschreibung der Startseite, und Crawler ohne JavaScript
(GPTBot, ClaudeBot, PerplexityBot) sehen einen leeren `#root`. Wer nur schnell
etwas kompilieren will, nimmt trotzdem `npm run build`.

`check-i18n` ist bewusst der erste Schritt: Das Projekt ist reines JavaScript und
hat keine strukturelle Typprüfung. Das Skript ist der Ersatz dafür. Schlägt es
fehl, ist die Ursache zu beheben, nicht der Aufruf zu überspringen.

## 3. Die Route-Registry ist die einzige Wahrheit

`src/routes/registry.js` speist Router, Sitemap, Prerender und den i18n-Check
zugleich. Eine neue Seite entsteht **dort**, nicht in einer Komponente.

Wer eine Route hinzufügt, prüft in dieser Reihenfolge:

- [ ] Eintrag in `src/routes/registry.js`
- [ ] `lastmod` **nur** bei den tatsächlich geänderten Routen hochsetzen. Das Feld
      ist die einzige Aufzeichnung darüber, wann eine Seite sich geändert hat, und
      `npm run indexnow` meldet genau diese Kohorte an Bing. Wer alle 26 Zeilen
      pauschal auf heute setzt, meldet die ganze Seite an — das Skript bricht in
      dem Fall ab und verlangt eine bewusste Entscheidung.
- [ ] Metadaten in `src/seo/routes.meta.js` (Titel, Description, Canonical, OG)
- [ ] Übersetzungen in `src/i18n/dict/` für **alle** Sprachen aus `LIVE_LOCALES`
- [ ] `npm run check:i18n` grün
- [ ] `npm run build` grün, danach `dist/<route>/index.html` gegenlesen

## 4. Deploy und Sichtbarkeit

In `wrangler.jsonc` stehen `workers_dev: false` und `preview_urls: false`
**mit Absicht**: Sonst wäre dieselbe Seite zusätzlich unter `*.workers.dev`
erreichbar und Google würde sie als Duplikat indexieren. Diese beiden Schalter
bleiben aus.

Deployt wird über die Kette, nicht über `wrangler deploy` allein:

```bash
npm run deploy
  1. npm run build          bricht ohne EmailJS-Zugangsdaten ab
  2. wrangler deploy
  3. node scripts/check-live.js   prüft die ausgelieferte Seite
```

Der Grund für Schritt 1 und 3: Ohne die drei `VITE_`-Werte ersetzt der Build
beide Kontaktformulare durch einen Hinweis mit E-Mail-Adresse und endet trotzdem
mit Code 0. Die Seite ist dann HTTP 200, sieht unauffällig aus und verliert jede
Anfrage. Das ist zweimal so live gegangen. `scripts/check-env.js` verhindert den
Build, `scripts/check-live.js` prüft danach die echte Auslieferung, und
`.github/workflows/kontaktformular.yml` wiederholt diese Prüfung alle zwei
Stunden — ein Fehlschlag dort schickt GitHub per Mail.

Nach dem Deploy neuer oder geänderter Seiten:

```bash
npm run indexnow
```

## 5. SEO

- `src/seo/routes.meta.js` ist die Quelle für Titel, Description, Canonical,
  Open Graph und Twitter Cards. `index.html` darf davon abweichen, ohne dass es
  etwas ändert: `prerender-meta.js` überschreibt die Ausgabe.
- **FAQPage-Schema ist bei Google wirkungslos.** Google hat FAQ-Rich-Results am
  07.05.2026 abgeschaltet, im Juni 2026 aus dem Rich Results Test entfernt und
  im August 2026 aus der Search-Console-API. Neues FAQPage-Markup lohnt sich
  nicht mehr. Andere Schema-Typen (`Service`, `Offer`, `WebSite`,
  `BreadcrumbList`) sind unverändert nützlich.
- Für Audits steht der Chrome-DevTools-MCP bereit (`lighthouse_audit` liefert
  Performance-, SEO- und Accessibility-Werte samt Core Web Vitals).

## 6. Zwei Farbschemata

Die Seite hat eine helle und eine dunkle Ansicht. Umgeschaltet wird über den
Sonne/Mond-Knopf in der Navigation.

**Farben gehören in Tokens, niemals fest in eine Komponente.** `src/index.css`
definiert die dunkle Palette im `@theme`-Block und die helle daneben als
`--light-*`-Werte, die an zwei Stellen zugewiesen werden. Wer eine Farbe
braucht, nimmt `text-paper`, `text-paper-soft`, `text-paper-dim`,
`text-paper-mute`, `bg-ink`, `bg-surface`, `border-hairline` oder `text-accent`.
Ein `text-gray-400` im JSX funktioniert in genau einer der beiden Ansichten und
ist deshalb ein Fehler.

Drei Zustände, nicht zwei: Eine bewusste Wahl setzt `data-theme` auf `<html>`,
keine Wahl setzt nichts, und dann entscheidet `prefers-color-scheme`. Deshalb
schließt die Medienabfrage in `index.css` eine ausdrückliche Dunkelwahl aus.
Gestempelt wird vor dem ersten Frame durch das Inline-Skript in `index.html`,
sonst malt die Seite dunkel und kippt danach sichtbar um.

Was kein Token erreicht, braucht eine eigene Regel: Die Wortmarke und die
Technologie-Logos sind Bilder beziehungsweise Markenfarben und werden im
Hellmodus per `filter` abgedunkelt, weil sie sonst auf 2,03:1 beziehungsweise
1,27:1 fallen. Der Splashscreen bleibt in beiden Ansichten dunkel.

Nach jeder Farbänderung beide Ansichten prüfen, nicht nur eine.

## 7. Sprache

Sichtbare Texte gehören in die Dictionaries unter `src/i18n/dict/`, niemals
fest in eine Komponente. Deutsche Texte tragen echte Umlaute (ä, ö, ü, ß),
keine Umschreibungen wie `ae`/`oe`/`ue`.

## 8. Vor jedem Push

- [ ] `npm run lint` ohne neue Fehler
- [ ] `npm run build` grün (die volle Kette, siehe §2)
- [ ] Nach dem Deploy `npm run check:live` grün — beide Formulare müssen rendern
- [ ] Bei neuen Routen: `dist/<route>/index.html` enthält den richtigen Titel
- [ ] Keine Secrets im Diff (EmailJS-Keys gehören in Umgebungsvariablen)
