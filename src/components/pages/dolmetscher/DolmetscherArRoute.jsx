import { DolmetscherPage } from "./DolmetscherPage";
import { INHALT } from "../../../content/dolmetscher.ar";

// Hülle, damit das Inhaltsmodul erst im eigenen Chunk geladen wird.
const DolmetscherArRoute = () => <DolmetscherPage inhalt={INHALT} />;

export default DolmetscherArRoute;
