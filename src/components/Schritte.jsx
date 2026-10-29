/**
 * Things to do in a fixed order, as a numbered list in the text column.
 *
 * Until 29.10.2026 these were cards in a two-column grid, each under a large
 * accent numeral: the card kit generated pages are assembled from, which the
 * owner ruled out for the whole site. Now the list is set the way a printed
 * guide sets one. The numbers hang in a column of their own, a hairline parts
 * the steps, and the order reads straight down instead of zigzagging across a
 * grid. Numbered because the order matters here, which is the only case in
 * which numbers belong on a list.
 */
export const Schritte = ({ daten }) => (
  <div>
    {daten.titel ? <p className="text-sm text-paper-dim">{daten.titel}</p> : null}
    <ol className="mt-4 border-b border-hairline">
      {daten.schritte.map((schritt, index) => (
        <li
          key={schritt.titel}
          className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-3 border-t border-hairline py-4 sm:grid-cols-[2.75rem_minmax(0,1fr)]">
          <span className="font-display text-xl leading-none text-accent tabular-nums sm:text-2xl">
            {index + 1}
          </span>
          <div>
            <p className="text-base leading-snug text-paper sm:text-lg">{schritt.titel}</p>
            {schritt.text ? <p className="mt-1 leading-relaxed text-paper-soft">{schritt.text}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  </div>
);
