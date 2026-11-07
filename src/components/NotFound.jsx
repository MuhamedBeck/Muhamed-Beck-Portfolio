import { Link } from "react-router-dom";
import { useRouteMeta } from "../seo/useRouteMeta";
import { useDict, useLocale } from "../i18n";
import { sectionsFor } from "../routes/registry.js";
import fehler from "../i18n/dict/fehler";
import { LinkArrow } from "./LinkArrow";

/* In the language of the address that was asked for, with more than one way
   on: someone who mistyped a guide's address wants the guides, not only the
   homepage. */
const NotFound = () => {
  useRouteMeta();
  const t = useDict(fehler).notFound;
  const homePath = sectionsFor(useLocale()).home;
  return (
    <div className="flex min-h-[100dvh] flex-col justify-center bg-ink px-4 text-paper">
      <div className="mx-auto w-full max-w-6xl">
        <p className="label">404</p>
        <h1 className="headline mt-6 max-w-[20ch]">{t.titel}</h1>
        <p className="intro mt-7 max-w-[52ch]">{t.text}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link to={homePath} className="btn-ghost btn-accent">
            {t.start}
          </Link>
          {t.weiter.map((ziel) => (
            <Link key={ziel.to} to={ziel.to} className="link-arrow">
              {ziel.label}
              <LinkArrow />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
