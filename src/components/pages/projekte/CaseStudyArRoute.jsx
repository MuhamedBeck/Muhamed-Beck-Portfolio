import { CaseStudyPage } from "./CaseStudyPage";
import { getProjectAr } from "../../../content/projects.ar";

// Wrapper so the case study content is resolved inside the lazy chunk instead
// of pulling the content module into the main bundle.
const CaseStudyArRoute = ({ path }) => (
  <CaseStudyPage data={getProjectAr(path)} locale="ar" />
);

export default CaseStudyArRoute;
