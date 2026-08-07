import { RevealOnScroll } from "./RevealOnScroll";

/**
 * Section shell with the house rhythm.
 *
 * Spacing is designed pairwise: each section pads 64px on mobile to 112px on
 * desktop per edge, so two adjacent sections add up to the 128 to 224px gap the
 * layout is built around. Keeping that in one place is the only way the rhythm
 * survives twenty pages.
 *
 * RevealOnScroll adds `is-ready` once the section enters the viewport, which is
 * what arms the `.stagger` and `.reveal-line` animations inside it.
 */
export const Section = ({ id, children, className = "" }) => (
  <RevealOnScroll>
    <section id={id} className={`px-4 py-16 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  </RevealOnScroll>
);

/**
 * Label, headline and optional intro, on the shared stagger ladder.
 *
 * The label is the small wide-tracked line above the headline. That contrast
 * between wide micro type and tight display type is what carries the editorial
 * feel, so it is worth having a component that makes it the default.
 */
export const SectionHeader = ({ label, headline, intro }) => (
  <header>
    {label ? (
      <p className="label stagger" style={{ "--fade-delay": "0ms" }}>
        {label}
      </p>
    ) : null}
    <h2
      className="headline reveal-line mt-6 max-w-[20ch]"
      style={{ "--fade-delay": "80ms" }}>
      <span>{headline}</span>
    </h2>
    {intro ? (
      <p className="intro stagger mt-7 max-w-[52ch]" style={{ "--fade-delay": "200ms" }}>
        {intro}
      </p>
    ) : null}
  </header>
);
