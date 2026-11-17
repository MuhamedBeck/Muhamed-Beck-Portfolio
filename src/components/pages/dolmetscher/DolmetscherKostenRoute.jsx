import { RatgeberPage } from "../ratgeber/RatgeberPage";
import { getDolmetschRatgeber } from "../../../content/dolmetscher.ratgeber.de";
import { getGroupRoute } from "../../../routes/registry.js";
import { DolmetscherKopf } from "./DolmetscherKopf";
import { DolmetscherFuss } from "./DolmetscherFuss";
import { KontaktKnoepfe } from "./Kontaktwege";

// Der Ratgeber hat kein eigenes Formular: „Anfrage stellen“ führt zu dem der
// deutschen Dolmetscher-Seite.
const ANFRAGE = `${getGroupRoute("dolmetscher", "de").path}#anfrage`;

// Ratgeber im Rahmen der Dolmetscher-Seite: eigene Kopf- und Fußzeile, keine
// IT-Navigation, zum Schluss Anfrage, WhatsApp und Anruf.
const DolmetscherKostenRoute = ({ path }) => (
  <RatgeberPage
    data={getDolmetschRatgeber(path)}
    kopfzeile={<DolmetscherKopf />}
    fusszeile={<DolmetscherFuss />}
    knoepfe={<KontaktKnoepfe anfrageZiel={ANFRAGE} />}
  />
);

export default DolmetscherKostenRoute;
