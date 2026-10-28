import { HubPage } from "./HubPage";
import { PROJEKTE } from "../../content/projekte.de";

const ProjekteHub = () => (
  <HubPage
    label="Projekte"
    headline="Projekte und Case Studies"
    /* Keine Anzahl im Text. Sie stand hier als "Zwei" und die Liste zeigte
       vier, weil der Satz beim Anlegen jeder weiteren Fallstudie vergessen
       wurde. Eine Zahl, die von der Länge eines Arrays abhängt, gehört
       nicht in Prosa. */
    intro="Case Studies aus Praxisprojekten und Abschlussarbeiten, jeweils mit Ausgangslage, Lösung und den Zahlen dahinter."
    items={PROJEKTE.map((projekt) => ({
      path: projekt.path,
      title: projekt.title,
      text: projekt.ausgangslage,
      meta: projekt.stats[0] ? `${projekt.stats[0].value} ${projekt.stats[0].label}` : undefined,
    }))}
  />
);

export default ProjekteHub;
