import { useState } from "react";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import Footer from "./Footer";
import { useRouteMeta } from "../seo/useRouteMeta";
import { Section, SectionHeader } from "./Section";

/**
 * Standard page frame: navbar, drawer, main landmark, footer.
 *
 * Every page repeated this block along with its own copy of the menu state.
 * Centralising it also guarantees the <main> landmark is present, which several
 * pages were missing.
 */
export const PageShell = ({ label, headline, intro, children }) => {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] text-gray-100 bg-ink">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {/* pt-28 clears the fixed 64px navbar.

            The bottom padding has to live here. The original plan was for the
            following section to supply the gap, but every page passes !pt-0 to
            its first Section, so nobody supplied it and the measured gap
            between the page header and the first section was 0px on all 18
            pages built on this shell. It showed worst on /kontakt, where the
            "Direkt erreichbar" label touched the intro paragraph.

            Deliberately shorter than a full section rhythm (py-16/py-28): this
            is the gap after a page title, not a gap between two sections. */}
        <Section className="!pt-28 !pb-14 md:!pb-20">
          {/* as="h1": this is the page title, not a section heading. Every page
              that renders through PageShell depends on this for its only
              top-level heading. */}
          <SectionHeader as="h1" label={label} headline={headline} intro={intro} />
        </Section>
        {children}
      </main>

      <Footer />
    </div>
  );
};
