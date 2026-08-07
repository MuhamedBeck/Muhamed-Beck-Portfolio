import { HubPage } from "./HubPage";
import { PROJEKTE } from "../../content/projekte.de";

const ProjekteHub = () => (
  <HubPage
    label="Projekte"
    headline="Was ich gebaut habe"
    intro="Zwei Projekte im Detail, mit Ausgangslage, Lösung und den Zahlen dahinter. Beide Systeme laufen produktiv."
    items={PROJEKTE.map((projekt) => ({
      path: projekt.path,
      title: projekt.title,
      text: projekt.ausgangslage,
      meta: projekt.stats[0] ? `${projekt.stats[0].value} ${projekt.stats[0].label}` : undefined,
    }))}
  />
);

export default ProjekteHub;
