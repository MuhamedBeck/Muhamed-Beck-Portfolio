import { CaseStudyPage } from "./CaseStudyPage";
import { getProjekt } from "../../../content/projekte.de";

// Wrapper so the case study content is resolved inside the lazy chunk instead
// of pulling the content module into the main bundle.
const CaseStudyRoute = ({ path }) => <CaseStudyPage data={getProjekt(path)} />;

export default CaseStudyRoute;
