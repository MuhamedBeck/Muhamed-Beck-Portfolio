/**
 * Market price ranges with one marker for the own fixed price.
 *
 * The cost guide states the market in ranges from named sources and the own
 * prices as "ab" amounts, and a reader comparing quotes wants to see where one
 * sits in the other. Each row runs on its own scale from zero, because a
 * website and a customer portal differ by an order of magnitude; the ends of
 * that scale are written under every track, so no row pretends to share an
 * axis with the next.
 *
 * Built from positioned elements, not SVG, for the same reason as RateScale:
 * labels at text size. Logical insets, so the scale would mirror correctly in
 * a right-to-left page. Motion: the bands grow (.bv-balken), the marker fades
 * in after them (.wf-ein).
 */
const BAND = {
  leise: "bg-paper-mute/70",
  cyan: "bg-accent-dim/70",
};

const ZEILE = 22; // px between stacked bands

export const Spannen = ({ daten }) => (
  <figure className="m-0 max-w-3xl">
    {daten.titel ? <figcaption className="text-sm text-paper-dim">{daten.titel}</figcaption> : null}
    <dl className="mt-6 space-y-10">
      {daten.zeilen.map((zeile, index) => {
        const anteil = (wert) => `${(wert / zeile.max) * 100}%`;
        const verzug = (schritt) => `${(0.15 + index * 0.25 + schritt * 0.12).toFixed(2)}s`;
        return (
          <div key={zeile.label}>
            <dt className="text-base text-paper">{zeile.label}</dt>
            <dd className="mt-4">
              <div className="relative" style={{ height: `${zeile.baender.length * ZEILE - 8}px` }}>
                {zeile.baender.map((band, b) => (
                  <div
                    key={band.text}
                    className="absolute inset-x-0 h-3.5 rounded-full bg-surface"
                    style={{ top: `${b * ZEILE}px` }}>
                    <div
                      className={`bv-balken absolute inset-y-0 rounded-full ${BAND[band.ton]}`}
                      style={{
                        insetInlineStart: anteil(band.von),
                        width: anteil(band.bis - band.von),
                        "--wf-delay": verzug(b),
                      }}
                    />
                  </div>
                ))}
                {/* The own price: a line through all bands, so it reads
                    against each of them at once. */}
                <div
                  aria-hidden="true"
                  className="wf-ein absolute -top-2 -bottom-2 w-[3px] -translate-x-1/2 rounded-full bg-accent"
                  style={{ insetInlineStart: anteil(zeile.marke.wert), "--wf-delay": verzug(zeile.baender.length + 1) }}
                />
              </div>
              <div className="mt-3 flex justify-between text-xs text-paper-mute tabular-nums">
                <span>0 €</span>
                <span>{zeile.maxText}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {zeile.baender.map((band) => (
                  <li key={band.text} className="flex items-center gap-2 text-paper-soft">
                    <span aria-hidden="true" className={`h-2.5 w-5 rounded-full ${BAND[band.ton]}`} />
                    {band.text}
                  </li>
                ))}
                <li className="flex items-center gap-2 text-accent">
                  <span aria-hidden="true" className="h-4 w-[3px] rounded-full bg-accent" />
                  {zeile.marke.text}
                </li>
              </ul>
            </dd>
          </div>
        );
      })}
    </dl>
    {daten.quelle ? <p className="mt-6 text-xs leading-relaxed text-paper-mute">{daten.quelle}</p> : null}
  </figure>
);
