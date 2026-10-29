import { Fragment } from "react";

/**
 * A sentence to take over word for word, and what each part of it does.
 *
 * Until 29.10.2026 this was a tinted box with an accent bar down one side and a
 * label in spaced capitals. The owner's verdict: that is the callout every
 * generated page carries, and it is not to appear anywhere on the site. So the
 * sentence now stands as type in the text column, without a frame, and its
 * parts are underlined and numbered the way an editor marks up a line, with
 * the note for each part beneath. The colour repeats the number and never
 * replaces it. Amber and green rather than the accent blue: a blue underline
 * is what a link looks like, and these are not links.
 */
const LINIE = {
  akzent: "decoration-accent",
  erfolg: "decoration-success",
  warm: "decoration-warm",
};

const ZIFFER = {
  akzent: "text-accent",
  erfolg: "text-success",
  warm: "text-warm",
};

export const Mustersatz = ({ daten }) => (
  <div>
    <blockquote>
      <p className="font-display text-2xl leading-[1.5] text-pretty text-paper hyphens-none sm:text-[1.75rem]">
        {/* Hanging quotation mark, so the words line up with the paragraphs
            above rather than the mark. Not hyphenated: a sentence meant to be
            copied must not come apart as "KI-As-sistenten" on a phone. */}
        <span className="-ms-[0.42em]">„</span>
        {daten.teile.map((teil, index) => (
          <Fragment key={teil.text}>
            {index > 0 ? " " : null}
            <span className={`underline decoration-2 underline-offset-[0.28em] ${LINIE[teil.ton]}`}>
              {teil.text}
            </span>
            <sup className={`ms-0.5 font-text text-[0.5em] ${ZIFFER[teil.ton]}`}>{index + 1}</sup>
          </Fragment>
        ))}
        “
      </p>
    </blockquote>
    <ol className="mt-6 space-y-2">
      {daten.teile.map((teil, index) => (
        <li key={teil.text} className="flex gap-3 text-sm leading-relaxed text-paper-soft">
          <span className={`w-3 shrink-0 tabular-nums ${ZIFFER[teil.ton]}`}>{index + 1}</span>
          <span>{teil.notiz}</span>
        </li>
      ))}
    </ol>
  </div>
);
