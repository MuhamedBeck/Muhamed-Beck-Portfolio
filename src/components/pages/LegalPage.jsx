import { PageShell } from "../PageShell";
import { Section } from "../Section";

/**
 * Shared frame for the legal pages.
 *
 * Impressum and Datenschutz previously each carried their own copy of the
 * navbar, drawer, footer, back-link and a locally defined `Card` component that
 * was byte-identical between the two files. They also opened with a centred
 * gradient headline, which is the one thing on the site that most clearly did
 * not belong: a reader clicking "Impressum" in the footer of an editorial page
 * landed on something that looked like a different website.
 *
 * A legal notice is a reference document, so it gets the same term/definition
 * split the FAQ blocks use: heading left, body right, separated by hairlines.
 * No cards. Nobody scans a privacy policy for visual interest, they look up one
 * clause, and a hairline list is faster to scan than a stack of boxes.
 */
export const LegalPage = ({ label, headline, intro, sections }) => (
  <PageShell label={label} headline={headline} intro={intro}>
    <Section className="!pt-0">
      <div className="max-w-4xl">
        {sections.map((section) => (
          <div
            key={section.title}
            className="border-t border-hairline py-7 md:grid md:grid-cols-[1fr_1.4fr] md:gap-x-12">
            <h2 className="text-lg leading-snug font-normal text-paper">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 leading-relaxed text-paper-soft md:mt-0">
              {section.body}
            </div>
          </div>
        ))}
      </div>
    </Section>
  </PageShell>
);
