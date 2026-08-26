import { Link } from "react-router-dom";
import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { LinkArrow } from "../../LinkArrow";
import { AR_SEITEN, AR_LEISTUNGEN, AR_KONDITIONEN, AR_CTA } from "../../../content/ar";

/** Arabic services page. Mirrors /en/services in scope. */
export const ArabicServices = () => (
  <PageShell
    label={AR_SEITEN.services.label}
    headline={AR_SEITEN.services.headline}
    intro={AR_SEITEN.services.intro}>
    <Section className="!pt-0">
      <ul className="grid gap-x-14 gap-y-14 md:grid-cols-2">
        {AR_LEISTUNGEN.map((leistung, index) => (
          <li
            key={leistung.title}
            id={leistung.slug}
            className="scroll-mt-28 border-t border-hairline pt-6">
            {/* tabular-nums keeps the two-digit counters on one optical column.
                Western digits throughout, as decided for both target regions. */}
            <span className="label tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="headline-sub mt-4">{leistung.title}</h2>
            <p className="mt-4 leading-relaxed text-paper-soft">{leistung.text}</p>
          </li>
        ))}
      </ul>
    </Section>

    <Section className="!pt-0">
      <hr className="rule" />
      <div className="grid gap-x-12 gap-y-10 pt-10 md:grid-cols-2">
        <div>
          <h2 className="label">الأتعاب</h2>
          <p className="headline-sub mt-4">{AR_KONDITIONEN.rate}</p>
          <p className="mt-4 text-sm leading-relaxed text-paper-mute">
            {AR_KONDITIONEN.rateNote}
          </p>
        </div>
        <div>
          <h2 className="label">طريقة العمل</h2>
          <p className="mt-4 leading-relaxed text-paper-soft">
            عن بُعد مع عملاء في أوروبا والمنطقة العربية. حضور شخصي في منطقة
            راين ماين بالاتفاق.
          </p>
        </div>
      </div>
    </Section>

    <Section className="!pt-0">
      <hr className="rule" />
      <div className="max-w-2xl pt-10">
        <h2 className="headline-sub">{AR_CTA.headline}</h2>
        <p className="mt-6 leading-relaxed text-paper-soft">{AR_CTA.intro}</p>
        <Link to="/ar/hire" className="link-arrow mt-8 inline-flex">
          ابدأ مشروعًا
          <LinkArrow />
        </Link>
      </div>
    </Section>
  </PageShell>
);
