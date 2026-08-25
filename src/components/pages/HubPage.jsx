import { Link } from "react-router-dom";
import { PageShell } from "../PageShell";
import { Section } from "../Section";

/**
 * Overview page listing a set of entries.
 *
 * Hubs exist for crawl distribution as much as for visitors: with six service
 * pages and a set of articles, a flat footer link list is not enough structure
 * for a search engine to understand what groups with what. The hub gives each
 * cluster a parent that states the relationship.
 *
 * @param {{ items: Array<{ path: string, title: string, text: string, meta?: string }> }} props
 */
export const HubPage = ({ label, headline, intro, items, children }) => (
  <PageShell label={label} headline={headline} intro={intro}>
    <Section className="!pt-0">
      <ul>
        {items.map((item, index) => (
          <li
            key={item.path}
            className="stagger border-t border-white/10"
            style={{ "--fade-delay": `${Math.min(index, 5) * 60}ms` }}>
            {/* The whole row is the target, and it shifts right on hover, which
                reads as an editorial index rather than a grid of cards. */}
            <Link
              to={item.path}
              className="group block py-8 transition-transform duration-300 hover:translate-x-2 md:grid md:grid-cols-[1fr_1.2fr] md:gap-x-12">
              <div>
                <h2 className="headline-sub underline-offset-[0.18em] group-hover:underline">
                  {item.title}
                </h2>
                {item.meta ? (
                  <p className="mt-3 text-xs tracking-[0.2em] text-blue-400 uppercase">
                    {item.meta}
                  </p>
                ) : null}
              </div>
              <div className="mt-4 flex items-start gap-4 md:mt-0">
                <p className="flex-1 leading-relaxed text-gray-400">{item.text}</p>
                <span
                  aria-hidden="true"
                  className="mt-1 text-paper-mute opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="rule" />
      {children}
    </Section>
  </PageShell>
);

export default HubPage;
