import { PageShell } from "../../PageShell";
import { DolmetscherKopf } from "./DolmetscherKopf";
import { DolmetscherFuss } from "./DolmetscherFuss";

/**
 * Die Dolmetscher-Seite in allen drei Sprachen. Eigene Kopf- und Fußzeile,
 * keine IT-Navigation; der Inhalt kommt aus dem Modul der Sprache.
 */
export const DolmetscherPage = ({ inhalt }) => (
  <PageShell headline={inhalt.kopf.h1} kopfzeile={<DolmetscherKopf />} fusszeile={<DolmetscherFuss />} />
);
