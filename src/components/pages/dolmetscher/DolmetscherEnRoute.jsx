import { DolmetscherPage } from "./DolmetscherPage";
import { INHALT } from "../../../content/dolmetscher.en";

// Hülle, damit das Inhaltsmodul erst im eigenen Chunk geladen wird.
const DolmetscherEnRoute = () => <DolmetscherPage inhalt={INHALT} />;

export default DolmetscherEnRoute;
