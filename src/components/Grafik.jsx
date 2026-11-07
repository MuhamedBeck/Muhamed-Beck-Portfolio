import { WorkflowCanvas } from "./WorkflowCanvas";
import { LighthouseRinge } from "./LighthouseRinge";
import { PlattformBild } from "./PlattformBild";
import { Balken } from "./Balken";
import { Spannen } from "./Spannen";
import { Tabelle } from "./Tabelle";
import { Meilensteine } from "./Meilensteine";
import { Schritte } from "./Schritte";
import { Mustersatz } from "./Mustersatz";

/**
 * One entry point for the figures a page can carry, chosen by `bild.art`, so
 * the content files decide which picture a page gets and the page templates
 * only decide where it goes.
 *
 * `imKopf` is set beside a page headline: one type size up for workflows, the
 * smaller ring size, and a later start so the headline gets its entrance first.
 * `verzoegerung` shifts a workflow's run, so several figures in one view do not
 * all start on the same beat.
 */
export const Grafik = ({ bild, imKopf = false, verzoegerung, verhaeltnis }) => {
  switch (bild.art) {
    case "workflow":
      return (
        <WorkflowCanvas
          workflow={bild.workflow}
          ausschnitt={bild.ausschnitt}
          gross={imKopf}
          verzoegerung={verzoegerung ?? (imKopf ? 0.8 : 0.15)}
          verhaeltnis={verhaeltnis}
        />
      );
    case "lighthouse":
      return <LighthouseRinge daten={bild.daten} klein={imKopf} />;
    case "plattform":
      return <PlattformBild daten={bild.daten} verhaeltnis={verhaeltnis} />;
    case "balken":
      return <Balken daten={bild.daten} />;
    case "spannen":
      return <Spannen daten={bild.daten} />;
    case "tabelle":
      return <Tabelle daten={bild.daten} />;
    case "meilensteine":
      return <Meilensteine daten={bild.daten} />;
    case "schritte":
      return <Schritte daten={bild.daten} />;
    case "mustersatz":
      return <Mustersatz daten={bild.daten} />;
    /* A real screenshot or photo. Lazy, because no figure on the site sits
       above the fold that the LCP depends on. Photos bring a smaller second
       width in srcSet, so a phone does not download the 1600 px file. */
    case "bild":
      /* Mit festem Seitenverhältnis (Projektkarten) steht das Bild ganz im
         Rahmen, auf der Fläche der Workflow-Fenster: Beschnitten verlor der
         16:10-Screenshot im 4:3-Rahmen auf dem Telefon seinen linken Rand. */
      if (verhaeltnis) {
        return (
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-surface sm:aspect-[16/10]">
            <img
              src={bild.src}
              srcSet={bild.srcSet}
              sizes={bild.sizes}
              width={bild.width}
              height={bild.height}
              alt={bild.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        );
      }
      return (
        <img
          src={bild.src}
          srcSet={bild.srcSet}
          sizes={bild.sizes}
          width={bild.width}
          height={bild.height}
          alt={bild.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-xl border border-hairline"
        />
      );
    default:
      return null;
  }
};
