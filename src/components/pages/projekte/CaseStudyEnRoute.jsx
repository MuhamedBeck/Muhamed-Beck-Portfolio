import { CaseStudyPage } from "./CaseStudyPage";
import { getProjectEn } from "../../../content/projects.en";

// Wrapper so the case study content is resolved inside the lazy chunk instead
// of pulling the content module into the main bundle.
const CaseStudyEnRoute = ({ path }) => (
  <CaseStudyPage data={getProjectEn(path)} locale="en" />
);

export default CaseStudyEnRoute;
