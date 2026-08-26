/**
 * Hourly-rate scale.
 *
 * The cost article carried four sourced figures in prose (a 75 to 147 € market
 * range, a 95 € median, and the owner's own 90 to 135 €) and no way to see how
 * they relate. A reader comparing quotes wants to know where a number sits in
 * the band, which is a question a sentence answers slowly and a scale answers
 * at a glance.
 *
 * Built from the same values the text states, so the two cannot disagree, and
 * as positioned elements rather than an SVG so the labels stay at text size and
 * reflow instead of scaling with the drawing.
 */
const AXIS = { min: 60, max: 160 };
const pct = (value) => ((value - AXIS.min) / (AXIS.max - AXIS.min)) * 100;

/* Positioned from the inline start, not from the left.
 *
 * This is the one component on the site where a naive right-to-left rendering
 * produces confidently wrong information rather than visibly broken layout. The
 * axis underneath is a flex row, so it mirrors on its own and 60 EUR moves to
 * the right. The bars were positioned with `left`, which does not mirror, so
 * they would have been measured from the 160 EUR end while labelled as if
 * measured from 60. Every value on the scale would read inverted.
 *
 * inset-inline-start follows the direction the axis already follows. */
const von = (value) => ({ insetInlineStart: `${pct(value)}%` });

export const RateScale = ({ data }) => (
  <figure className="mt-14">
    <figcaption className="label">{data.caption}</figcaption>

    <div className="mt-10 max-w-3xl">
      <div className="relative h-24">
        {/* Market range */}
        <div
          className="absolute top-6 h-2 rounded-full bg-surface-strong"
          style={{ ...von(data.market.from), width: `${pct(data.market.to) - pct(data.market.from)}%` }}
        />
        {/* Own rate, the one thing on the page that is a commitment */}
        <div
          className="absolute top-6 h-2 rounded-full bg-accent"
          style={{ ...von(data.own.from), width: `${pct(data.own.to) - pct(data.own.from)}%` }}
        />
        {/* Median tick */}
        <div
          className="absolute top-2 h-10 w-px bg-paper-soft"
          style={von(data.median.value)}
        />
        <p
          className="absolute top-14 -translate-x-1/2 text-center text-xs leading-snug text-paper-mute"
          style={von(data.median.value)}>
          <span className="block text-sm text-paper tabular-nums">
            {data.median.value} €
          </span>
          {data.median.label}
        </p>
      </div>

      {/* Axis */}
      <div className="flex justify-between border-t border-hairline pt-3 text-xs text-paper-mute tabular-nums">
        <span>{AXIS.min} €</span>
        <span>{AXIS.max} €</span>
      </div>

      {/* A <dl> may contain <div> wrappers, but <dt> and <dd> have to be that
          div's direct children. The first version nested them one level deeper
          behind the swatch, which is invalid and which Lighthouse flagged on
          this page. The swatch now lives inside the <dt> it marks, and the <dd>
          is indented to match by the swatch's width plus its gap. */}
      <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        <div>
          <dt className="flex items-baseline gap-3 text-sm text-paper tabular-nums">
            <span
              aria-hidden="true"
              className="h-2 w-6 shrink-0 rounded-full bg-surface-strong"
            />
            {data.market.from} bis {data.market.to} €
          </dt>
          <dd className="mt-1 ps-9 text-sm text-paper-mute">{data.market.label}</dd>
        </div>
        <div>
          <dt className="flex items-baseline gap-3 text-sm text-paper tabular-nums">
            <span aria-hidden="true" className="h-2 w-6 shrink-0 rounded-full bg-accent" />
            {data.own.from} bis {data.own.to} €
          </dt>
          <dd className="mt-1 ps-9 text-sm text-paper-mute">{data.own.label}</dd>
        </div>
      </dl>
    </div>
  </figure>
);
