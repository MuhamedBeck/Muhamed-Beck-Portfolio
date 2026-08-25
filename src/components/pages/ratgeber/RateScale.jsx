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

export const RateScale = ({ data }) => (
  <figure className="mt-14">
    <figcaption className="label">{data.caption}</figcaption>

    <div className="mt-10 max-w-3xl">
      <div className="relative h-24">
        {/* Market range */}
        <div
          className="absolute top-6 h-2 rounded-full bg-white/10"
          style={{ left: `${pct(data.market.from)}%`, width: `${pct(data.market.to) - pct(data.market.from)}%` }}
        />
        {/* Own rate, the one thing on the page that is a commitment */}
        <div
          className="absolute top-6 h-2 rounded-full bg-accent"
          style={{ left: `${pct(data.own.from)}%`, width: `${pct(data.own.to) - pct(data.own.from)}%` }}
        />
        {/* Median tick */}
        <div
          className="absolute top-2 h-10 w-px bg-paper-soft"
          style={{ left: `${pct(data.median.value)}%` }}
        />
        <p
          className="absolute top-14 -translate-x-1/2 text-center text-xs leading-snug text-paper-mute"
          style={{ left: `${pct(data.median.value)}%` }}>
          <span className="block text-sm text-gray-100 tabular-nums">
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

      <dl className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        <div className="flex items-baseline gap-3">
          <span aria-hidden="true" className="h-2 w-6 shrink-0 rounded-full bg-white/10" />
          <div>
            <dt className="text-sm text-gray-100 tabular-nums">
              {data.market.from} bis {data.market.to} €
            </dt>
            <dd className="mt-1 text-sm text-paper-mute">{data.market.label}</dd>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span aria-hidden="true" className="h-2 w-6 shrink-0 rounded-full bg-accent" />
          <div>
            <dt className="text-sm text-gray-100 tabular-nums">
              {data.own.from} bis {data.own.to} €
            </dt>
            <dd className="mt-1 text-sm text-paper-mute">{data.own.label}</dd>
          </div>
        </div>
      </dl>
    </div>
  </figure>
);
