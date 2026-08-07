# Muhamed Beck Portfolio

German-first site for AI automation and full-stack freelance work. React 19 + Vite 8 +
Tailwind 4, prerendered to static HTML at build time and served from Cloudflare Workers.

**Production:** [https://muhamedbeck.com](https://muhamedbeck.com)

## How this project is put together

Three decisions explain most of the code, and each exists because the obvious alternative
failed in a way that was hard to see.

### 1. One route registry

`src/routes/registry.js` is the single source for every page. The client router, the
build-time renderer, the sitemap and the prerender step all derive from it.

They used to be three hand-maintained lists, and a route missing from one of them failed
**silently**: `prerender-meta.js` rendered the NotFound tree, which still passed its "did we
get real markup" length check. Adding a page is now one registry entry.

The file is imported by `generate-sitemap.js` and `prerender-meta.js` under bare `node`, so
it must stay plain JavaScript: no JSX, no static `.jsx` imports, no TypeScript. That
constraint is also why translation completeness is checked by a script rather than by types.

### 2. Everything fails at build time

`npm run build` refuses to produce output when something is structurally wrong:

- `scripts/check-i18n.js` compares dictionary key sets, enforces registry invariants (unique
  paths, no trailing slashes, one entry per locale per group, title and description lengths),
  and asserts the seven **already-indexed** German URLs still exist.
- `prerender-meta.js` throws on a missing meta tag, on markup under 500 characters, and on a
  page whose rendered HTML does not contain its own `h1`. That last check is what catches a
  page rendering an empty dictionary, which the length check cannot: navbar and footer chrome
  alone exceed 500 characters.

### 3. German is the default, unprefixed locale

`/` is German. English lives under `/en`. The search demand this site targets is German, and
the German pages previously sent visitors to an English enquiry form.

Existing German URLs (`/leistungen/*`, `/projekte/*`, `/impressum`, `/datenschutz`) are
unchanged and protected by the build check. The English URLs that moved get 301s from
`public/_redirects`.

hreflang alternates are **derived** from a shared `group` key rather than stored, so the
DE→EN and EN→DE relation is symmetric by construction. A group with one member emits nothing.

## Layout

```
src/
├── routes/registry.js      # every page: path, locale, group, meta, loader
├── i18n/
│   ├── locales.js          # locale config, LIVE_LOCALES feature gate
│   ├── index.js            # useLocale, useDict, path helpers
│   └── dict/               # one file per namespace, both locales side by side
├── seo/
│   ├── useRouteMeta.js     # resolves meta from the router
│   └── usePageMeta.js      # upserts head tags, owns [data-i18n="alt"]
├── content/                # page content as versioned JS modules
├── components/
│   ├── PageShell.jsx       # navbar + drawer + <main> + footer
│   ├── Section.jsx         # section rhythm and the label/headline/intro header
│   └── LanguageSwitcher.jsx
└── index.css               # design tokens (@theme) and the editorial type scale
scripts/check-i18n.js       # build-time validation
```

## Adding a page

1. Add an entry to `src/routes/registry.js` (give it a `group`; reuse an existing one only if
   it is the same page in the other language).
2. Add its content to the relevant module under `src/content/`.
3. `npm run build`.

Sitemap, prerendered HTML, canonical, hreflang, Open Graph, breadcrumbs and `llms.txt` all
follow automatically. The build tells you if anything is missing.

## Design

Dark editorial: `#0a0a0a` ground with blue as a single restrained accent. Hierarchy comes
from **size and letter-spacing, not weight** — display type is tight (`-0.02em`) at weight
300, micro type is wide (`+0.25em`) and uppercase. Sections are separated by hairline rules
and whitespace rather than by a border on every element.

Entrance animation is a CSS `--fade-delay` ladder. The hidden state is scoped to `.is-ready`,
which the prerendered HTML always carries, so **nothing is ever invisible without JavaScript**,
and `prefers-reduced-motion` removes the animation rather than the content.

Two rules worth not rediscovering:

- Never build a reveal with `clip-path` or scale-to-zero. An element clipped to zero height is
  invisible to `IntersectionObserver` and never un-hides.
- Hero images never get a reveal class. Chrome will not accept a fully transparent element as
  an LCP candidate, which once left the page with no measurable LCP at all.

## Scripts

| | |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | check-i18n → sitemap + llms.txt → client build → SSR build → prerender |
| `npm run check:i18n` | validation only |
| `npm run lint` | ESLint |
| `npx wrangler dev` | serve `dist/` with the real `_redirects` and trailing-slash behaviour |

## Deployment

Cloudflare Workers Static Assets, configured in `wrangler.jsonc`:

- `html_handling: "drop-trailing-slash"` so the served URL always equals the canonical
- `not_found_handling: "404-page"` so unknown paths get a real 404 rather than a soft one
- `public/_headers` carries the security headers and immutable caching
- `public/_redirects` carries the 301s

```bash
npm run build
npx wrangler deploy
```

Verify redirects with `npx wrangler dev` before deploying: a syntax error in `_redirects` is
dropped silently at upload rather than reported.

## Toolchain notes

- Vite 8 uses **Rolldown**, not Rollup. Do not set `minify: 'esbuild'`; Vite 8 does not ship
  esbuild and the build fails. The default Oxc minifier is correct.
- The SSR build sets `codeSplitting: false` so `dist-ssr` stays a single file. That is
  mutually exclusive with `manualChunks`, hence the `isSsrBuild` branch in `vite.config.js`.
- Dictionaries must be **static** imports. A dynamically imported dictionary suspends during
  `renderToString` exactly the way `React.lazy` does, and the build would silently prerender
  pages with no copy in them.
