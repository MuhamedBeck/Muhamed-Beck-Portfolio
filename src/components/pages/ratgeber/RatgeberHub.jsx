import { HubPage } from "../HubPage";
import { RATGEBER } from "../../../content/ratgeber.de";

const RatgeberHub = () => (
  <HubPage
    label="Ratgeber"
    headline="Antworten statt Marketing"
    intro="Was Auftraggeber vor einem Automatisierungsprojekt wissen wollen: Kosten, Toolauswahl und was sich tatsächlich automatisieren lässt. Mit Zahlen und Quellen, nicht mit Versprechen."
    items={RATGEBER.map((article) => ({
      path: article.path,
      title: article.h1,
      text: article.lede,
      meta: article.kicker,
    }))}
  />
);

export default RatgeberHub;
