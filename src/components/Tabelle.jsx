import { Marke } from "./icons/Marke";
import { WERKZEUGMARKEN } from "./icons/werkzeugmarken";

/**
 * A comparison table, lifted out of RatgeberPage so a guide section can carry
 * one as well as the article itself.
 *
 * From md up it is a real table whose wrapper scrolls on its own, so a wide
 * table never makes the page scroll sideways. Below md every row becomes a card
 * with the column name above each value: at 390 px the 42rem table used to hide
 * its second column until the reader swiped each row sideways. The explicit
 * roles keep the table semantics for screen readers once display: block
 * dissolves them, and the visible column names in the cards are aria-hidden
 * because the column headers are announced anyway.
 *
 * A cell may be a string or { text, ton }: the second carries a coloured dot,
 * so a verdict ("verboten", "richtig") is seen before it is read. The colour
 * repeats what the words say and never replaces them.
 */
const PUNKT = {
  erfolg: "bg-success",
  warm: "bg-warm",
  akzent: "bg-accent",
  leise: "bg-paper-mute",
};

const SCHRIFT = {
  erfolg: "text-success",
  warm: "text-warm",
  akzent: "text-accent",
  leise: "text-paper-dim",
};

/* A column is a name, or { text, marke } for a column about a tool, which
   then carries the tool's mark in its header. */
const spalte = (column) => (typeof column === "string" ? { text: column } : column);

const Spaltenkopf = ({ column, size }) => {
  const { text, marke } = spalte(column);
  return marke ? (
    <span className="inline-flex items-center gap-2">
      <Marke marke={WERKZEUGMARKEN[marke]} size={size} />
      {text}
    </span>
  ) : (
    text
  );
};

const Zelle = ({ inhalt }) =>
  typeof inhalt === "object" && inhalt !== null ? (
    <span className={`inline-flex items-baseline gap-2 ${SCHRIFT[inhalt.ton]}`}>
      <span aria-hidden="true" className={`h-2 w-2 shrink-0 translate-y-[-1px] rounded-full ${PUNKT[inhalt.ton]}`} />
      {inhalt.text}
    </span>
  ) : (
    inhalt
  );

export const Tabelle = ({ daten, ersteSpalte = "Kriterium" }) => (
  <div className="md:-mx-4 md:overflow-x-auto md:px-4">
    <table role="table" className="w-full border-collapse text-start max-md:block md:min-w-[42rem]">
      <caption className="label mb-6 text-start max-md:block">{daten.caption}</caption>
      <thead role="rowgroup" className="max-md:sr-only">
        <tr role="row">
          <th
            role="columnheader"
            scope="col"
            className="w-[13rem] pb-4 text-start text-sm font-normal text-paper-mute">
            <span className="sr-only">{ersteSpalte}</span>
          </th>
          {daten.columns.map((column) => (
            <th
              key={spalte(column).text}
              role="columnheader"
              scope="col"
              className="pb-4 ps-6 text-start text-lg font-normal text-paper">
              <Spaltenkopf column={column} size={20} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="max-md:block">
        {daten.rows.map((row) => (
          <tr
            key={row.label}
            role="row"
            className="border-t border-hairline align-top max-md:mt-4 max-md:block max-md:rounded-lg max-md:border max-md:bg-surface max-md:p-5">
            <th
              role="rowheader"
              scope="row"
              className="py-5 pe-6 text-start text-sm font-normal leading-snug text-paper-dim max-md:block max-md:p-0 max-md:text-base max-md:text-paper">
              {row.label}
            </th>
            {row.cells.map((cell, index) => (
              <td
                key={spalte(daten.columns[index]).text}
                role="cell"
                className="py-5 ps-6 leading-relaxed text-paper-soft max-md:mt-4 max-md:block max-md:p-0">
                <span
                  aria-hidden="true"
                  className="mb-1 block text-[0.7rem] tracking-[0.18em] text-paper-mute uppercase md:hidden">
                  <Spaltenkopf column={daten.columns[index]} size={12} />
                </span>
                <Zelle inhalt={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
