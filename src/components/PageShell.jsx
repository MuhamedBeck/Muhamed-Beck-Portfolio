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
    <div className="min-h-screen text-gray-100" style={{ background: "#0a0a0a" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {/* pt-28 clears the fixed 64px navbar. The header carries no bottom
            padding: the following section supplies the gap, so a short header
            does not leave a hole the size of a full section rhythm. */}
        <Section className="!pt-28 !pb-0">
          <SectionHeader label={label} headline={headline} intro={intro} />
        </Section>
        {children}
      </main>

      <Footer />
    </div>
  );
};
