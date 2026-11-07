import { Link } from "react-router-dom";
import { TerminBuchen } from "./TerminBuchen";
import { Grafik } from "./Grafik";
import { PILOT } from "../content/pilot.de";
import { WORKFLOW_PILOT } from "../content/workflows.de";

/**
 * The paid entry offer, shown on the pages where someone decides whether to
 * start automating: what it costs, what is in it, what is not, and how it
 * runs. The run is drawn like the other workflows on the site; the client's
 * acceptance is a person, so it stays dashed and gets no tick.
 *
 * The "not included" column is there on purpose. A fixed price is only
 * believable next to its limits, and the running costs a client pays the
 * providers directly are the first question after the price.
 */
const BILD = { art: "workflow", workflow: WORKFLOW_PILOT };

export const PilotAngebot = () => (
  <div className="border-t border-hairline pt-8">
    <h2 className="label">Der Einstieg</h2>
    <p className="headline-sub mt-4 max-w-[28ch]">{PILOT.kurz}</p>
    <p className="mt-5 max-w-[62ch] leading-relaxed text-paper-soft">{PILOT.text}</p>

    <div className="mt-10">
      <Grafik bild={BILD} />
    </div>

    <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
      <div>
        <h3 className="text-lg font-normal text-paper">Enthalten</h3>
        <ul className="mt-4">
          {PILOT.enthalten.map((punkt) => (
            <li key={punkt} className="flex items-start gap-3 border-t border-hairline py-3.5 text-paper-dim">
              <span aria-hidden="true" className="mt-1 text-xs text-success">
                ✓
              </span>
              <span className="leading-relaxed">{punkt}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-normal text-paper">Nicht enthalten</h3>
        <ul className="mt-4">
          {PILOT.nichtEnthalten.map((punkt) => (
            <li key={punkt} className="border-t border-hairline py-3.5 leading-relaxed text-paper-soft">
              {punkt}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-paper-mute">
          {PILOT.dauer} {PILOT.zahlung} {PILOT.ust}.
        </p>
      </div>
    </div>

    <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
      <Link to={`/kontakt?leistung=${PILOT.slug}`} className="btn-ghost btn-accent">
        Pilot anfragen
      </Link>
      <TerminBuchen />
    </div>
  </div>
);
