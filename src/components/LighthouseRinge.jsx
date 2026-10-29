/**
 * Lighthouse scores as the gauges Lighthouse itself draws.
 *
 * Anyone who has commissioned a website has seen these rings, which is why
 * they say "fast and accessible" faster than any sentence. The values are the
 * measured ones from content/grafiken.de.js, never rounded up.
 *
 * Motion: once the section is in view, each ring fills to its score and the
 * number counts up with it, via a registered custom property in index.css. The
 * counter is drawn by CSS, so the real number also stands in the markup for
 * search engines and screen readers; the drawn one is hidden from them. Without
 * JavaScript, after the failsafe or with reduced motion, the rings simply show
 * their final state.
 */
export const LighthouseRinge = ({ daten, klein = false }) => (
  /* Kept together at full width: three rings spread across the whole column
     read as three separate figures instead of one report. */
  <figure className={`m-0 ${klein ? "" : "max-w-3xl"}`}>
    <ul className={`grid grid-cols-3 ${klein ? "gap-3 sm:gap-6" : "gap-4 sm:gap-10"}`}>
      {daten.werte.map((messung, index) => (
        <li key={messung.label} className="flex flex-col items-center text-center">
          <div className={`relative aspect-square w-full ${klein ? "max-w-[6.5rem]" : "max-w-[8.5rem]"}`}>
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="43" fill="none" strokeWidth="6" className="stroke-surface-strong" />
              <circle
                cx="50"
                cy="50"
                r="43"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                className="lh-ring stroke-success"
                style={{ "--lh-rest": 100 - messung.wert, "--wf-delay": `${0.15 + index * 0.18}s` }}
              />
            </svg>
            <span
              aria-hidden="true"
              className={`lh-zahl absolute inset-0 flex items-center justify-center font-display font-light text-success tabular-nums ${
                klein ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
              }`}
              style={{ "--lh-ziel": messung.wert, "--wf-delay": `${0.15 + index * 0.18}s` }}
            />
            <span className="sr-only">{`${messung.wert} von 100`}</span>
          </div>
          <p className="mt-3 text-sm leading-snug text-paper-soft">{messung.label}</p>
        </li>
      ))}
    </ul>
    <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-4">
      <span className="font-display text-2xl font-light text-warm tabular-nums">{daten.lcp.wert}</span>
      <span className="text-sm text-paper-soft">{daten.lcp.label}</span>
      <span className="w-full text-xs text-paper-mute">
        {daten.titel}, {daten.lcp.bedingung}, {daten.stand}
      </span>
    </figcaption>
  </figure>
);
