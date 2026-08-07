import { RatgeberPage } from "./RatgeberPage";
import { getRatgeber } from "../../../content/ratgeber.de";

// Wrapper so the article content resolves inside the lazy chunk instead of
// pulling the whole content module into the main bundle.
const RatgeberRoute = ({ path }) => <RatgeberPage data={getRatgeber(path)} />;

export default RatgeberRoute;
