import { HubPage } from "./HubPage";
import { LEISTUNGEN } from "../../content/leistungen.de";

const LeistungenHub = () => (
  <HubPage
    label="Leistungen"
    headline="KI- und Prozessautomatisierung"
    intro="Sechs Bereiche, in denen ich Unternehmen unterstütze. Jede Seite beschreibt konkret, was umgesetzt wird, wie ein Projekt abläuft und was es kostet."
    items={LEISTUNGEN.map((leistung) => ({
      path: leistung.path,
      title: leistung.h1,
      text: leistung.teaser,
      meta: leistung.badge,
    }))}
  />
);

export default LeistungenHub;
