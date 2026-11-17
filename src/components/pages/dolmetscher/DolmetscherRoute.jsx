import { DolmetscherPage } from "./DolmetscherPage";
import { INHALT } from "../../../content/dolmetscher.de";

// Hülle, damit das Inhaltsmodul erst im eigenen Chunk geladen wird.
const DolmetscherRoute = () => <DolmetscherPage inhalt={INHALT} />;

export default DolmetscherRoute;
