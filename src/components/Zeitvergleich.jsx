/**
 * Before and now on one time axis, for a result without an exact measurement.
 *
 * "Meist am selben Tag" is not a number, and a bar measured in hours would
 * invent one. So "before" is a wide band across the working day that fades out
 * at both ends, and "now" is a sharp mark at the very start. The contrast
 * between blurred and sharp is the statement; no figure is implied that the
 * case study cannot back.
 */
export const Zeitvergleich = ({ data }) => (
  <figure className="m-0">
    <figcaption className="text-sm text-paper-dim">{data.titel}</figcaption>
    <div className="mt-6 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-6">
      <span className="pt-px text-sm text-paper-mute">{data.vorher.label}</span>
      <div>
        <div className="relative h-3.5 rounded-full bg-surface">
          <div className="absolute inset-y-0 start-[2%] end-[4%] rounded-full bg-gradient-to-r from-transparent via-paper-soft/60 to-transparent" />
        </div>
        <p className="mt-2 text-sm text-paper-soft">{data.vorher.text}</p>
      </div>

      <span className="pt-px text-sm text-accent">{data.heute.label}</span>
      <div>
        <div className="relative h-3.5 rounded-full bg-surface">
          <div className="absolute inset-y-0 start-0 w-5 rounded-full bg-accent" />
        </div>
        <p className="mt-2 text-sm text-paper">{data.heute.text}</p>
      </div>

      <span aria-hidden="true" />
      <div className="flex justify-between border-t border-hairline pt-2 text-xs text-paper-mute">
        <span>{data.achse[0]}</span>
        <span>{data.achse[1]}</span>
      </div>
    </div>
  </figure>
);
