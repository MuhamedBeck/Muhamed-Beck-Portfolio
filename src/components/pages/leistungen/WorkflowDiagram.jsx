/**
 * What the automation actually does, as a flow.
 *
 * The service pages describe capabilities in prose and list what a project
 * looks like, but never showed the shape of the thing being sold: something
 * happens, a few steps run, data lands in a system. That is the one picture a
 * buyer evaluating an automation supplier wants, and it is also the hardest
 * thing to fake, which is why every other page in this space is text only.
 *
 * Deliberately not an SVG. Labels stay at real text size and reflow instead of
 * scaling with a drawing, the sequence is a real <ol> so a screen reader gets
 * "1. Trigger ... 2. ..." in order, and the connecting line is decoration that
 * carries no information of its own.
 *
 * It also has to stay visibly distinct from the "So läuft ein Projekt ab"
 * section further down, which is about how a project runs rather than how the
 * workflow runs. Hence the line-and-node treatment rather than the hairline
 * columns that section uses.
 *
 * Two layouts, because a flow that scrolls sideways on a phone is a flow whose
 * last stage nobody reads: below md it stacks with the line running down the
 * left, above md it runs across.
 */
export const WorkflowDiagram = ({ data }) => (
  <figure className="m-0">
    <figcaption className="label">{data.caption}</figcaption>

    <ol
      className="
        mt-10 grid gap-y-9
        md:grid-cols-[repeat(var(--stages),1fr)] md:gap-x-8 md:gap-y-0
      "
      style={{ "--stages": data.stages.length }}>
      {data.stages.map((stage, index) => {
        const isLast = index === data.stages.length - 1;
        return (
          <li
            key={stage.title}
            className={`
              relative pl-8 md:pl-0
              ${!isLast ? "pb-1" : ""}
              before:absolute before:content-['']
              before:top-2 before:bottom-[-2.25rem] before:left-[7px] before:w-px
              before:bg-hairline
              md:before:top-[7px] md:before:right-0 md:before:bottom-auto
              md:before:left-0 md:before:h-px md:before:w-auto
              ${isLast ? "before:hidden md:before:block" : ""}
            `}>
            {/* Node marker. The last one is filled: it is where the data ends
                up, which is the only stage the reader is really buying. */}
            <span
              aria-hidden="true"
              className={`
                absolute top-0 left-0 z-10 block h-[15px] w-[15px] rounded-full border
                md:relative md:top-auto md:left-auto
                ${isLast ? "border-accent bg-accent" : "border-accent bg-ink"}
              `}
            />
            <p className="text-xs tracking-[0.2em] text-accent uppercase md:mt-5">
              {stage.kind}
            </p>
            <h3 className="mt-3 text-base font-normal text-paper">{stage.title}</h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-paper-soft">
              {stage.text}
            </p>
          </li>
        );
      })}
    </ol>

    {/* The band underneath is the actual differentiator: anyone can wire two
        tools together, the question is what happens when a call fails at 3am. */}
    <p className="mt-12 border-t border-hairline pt-5 text-sm leading-relaxed text-paper-mute">
      <span className="text-paper-dim">Läuft durchgehend mit: </span>
      {data.alongside}
    </p>
  </figure>
);
