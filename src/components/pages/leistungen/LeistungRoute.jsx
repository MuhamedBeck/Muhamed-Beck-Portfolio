import { LeistungPage } from "./LeistungPage";
import { getLeistung } from "../../../content/leistungen.de";

// Wrapper so the route content is resolved inside the lazy chunk instead of
// pulling the content module into the main bundle.
const LeistungRoute = ({ path }) => <LeistungPage data={getLeistung(path)} />;

export default LeistungRoute;
