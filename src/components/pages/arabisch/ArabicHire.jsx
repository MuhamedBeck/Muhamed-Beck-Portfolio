import { PageShell } from "../../PageShell";
import { Section } from "../../Section";
import { CONTACT, SOCIAL } from "../../../content/site";
import { AR_SEITEN, AR_ABLAUF, AR_KONDITIONEN, AR_CTA } from "../../../content/ar";

/**
 * Arabic contact page.
 *
 * No form, on purpose. The German and English forms run through EmailJS, whose
 * template carries three fixed variables and whose labels are written per
 * locale; a third form would be a third thing that can silently stop sending,
 * and the site has already lost enquiries that way twice. Direct contact is
 * also what a first enquiry from a new market actually looks like.
 */
export const ArabicHire = () => (
  <PageShell
    label={AR_SEITEN.hire.label}
    headline={AR_SEITEN.hire.headline}
    intro={AR_SEITEN.hire.intro}>
    <Section className="!pt-0">
      <div className="grid gap-x-14 gap-y-14 md:grid-cols-[1.15fr_1fr]">
        <div>
          <h2 className="label">كيف تسير الأمور</h2>
          <ol className="mt-8">
            {AR_ABLAUF.map((schritt, index) => (
              <li key={schritt.title} className="border-t border-hairline py-6">
                <span className="label tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="headline-sub mt-3">{schritt.title}</h3>
                <p className="mt-3 leading-relaxed text-paper-soft">{schritt.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="label">التواصل المباشر</h2>
          <ul className="mt-8">
            {/* Every value here is a Latin run inside Arabic text, so each one
                is isolated. Without that the bidi algorithm moves the leading
                plus of the phone number and the dots of the address. */}
            <li className="border-t border-hairline py-6">
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-lg text-paper underline-offset-4 hover:underline">
                <bdi>{CONTACT.email}</bdi>
              </a>
              <p className="mt-2 text-sm text-paper-mute">
                رد خلال 24 ساعة، وفي أيام العمل أسرع من ذلك عادة.
              </p>
            </li>
            <li className="border-t border-hairline py-6">
              <a
                href={`tel:${CONTACT.phone}`}
                className="text-lg text-paper underline-offset-4 hover:underline">
                <bdi>{CONTACT.phoneDisplay}</bdi>
              </a>
              <p className="mt-2 text-sm text-paper-mute">
                اتصل مباشرة أو اترك رسالة، وسأعاود الاتصال.
              </p>
            </li>
            <li className="border-t border-hairline py-6">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-paper underline-offset-4 hover:underline">
                <bdi>LinkedIn</bdi>
              </a>
              <p className="mt-2 text-sm text-paper-mute">
                لكل ما يمكن توضيحه في رسالة قصيرة.
              </p>
            </li>
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-paper-mute">{AR_CTA.note}</p>
        </div>
      </div>

      <hr className="rule mt-16" />

      <div className="grid gap-x-12 gap-y-10 pt-10 md:grid-cols-2">
        <div>
          <h2 className="label">الأتعاب</h2>
          <p className="mt-4 leading-relaxed text-paper-soft">{AR_KONDITIONEN.rate}</p>
        </div>
        <div>
          <h2 className="label">الاستشارة الأولى</h2>
          <p className="mt-4 leading-relaxed text-paper-soft">
            مجانية ودون التزام. وإذا كانت الأتمتة غير مجدية في حالتك، أقول ذلك
            صراحة.
          </p>
        </div>
      </div>
    </Section>
  </PageShell>
);
