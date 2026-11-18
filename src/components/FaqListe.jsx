/**
 * Frequently asked questions, collapsed.
 *
 * Fully open, eight answers were about a screen of uninterrupted text on every
 * service page and guide. Collapsed, the reader picks; the answers stay in the
 * HTML, so search engines and in-page search still find them, and the FAQPage
 * JSON-LD reads the same array. The plus turns into a cross when open
 * (.faq-zeichen in index.css). One component for the service pages, the
 * guides and the homepage, so they cannot drift apart.
 *
 * `abstand` is the margin above the list. The homepage passes "mt-14", the
 * gap every other homepage section keeps below its heading.
 */
export const FaqListe = ({ fragen, abstand = "mt-8" }) => (
  <div className={`${abstand} max-w-4xl border-b border-hairline`}>
    {fragen.map((item) => (
      <details key={item.q} className="faq group border-t border-hairline">
        <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg leading-snug text-paper transition-colors hover:text-accent">
          <span>{item.q}</span>
          <span
            aria-hidden="true"
            className="faq-zeichen mt-0.5 shrink-0 text-2xl leading-none font-light text-accent">
            +
          </span>
        </summary>
        <p className="max-w-[65ch] pb-7 leading-relaxed text-paper-soft">{item.a}</p>
      </details>
    ))}
  </div>
);
