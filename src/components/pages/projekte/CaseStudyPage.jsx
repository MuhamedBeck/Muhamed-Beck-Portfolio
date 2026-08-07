import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Navbar } from "../../Navbar";
import { MobileMenu } from "../../MobileMenu";
import Footer from "../../Footer";
import { RevealOnScroll } from "../../RevealOnScroll";
import { useRouteMeta } from "../../../seo/useRouteMeta";

export const CaseStudyPage = ({ data }) => {
  useRouteMeta();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100" style={{ background: "#0a0a0a" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
      <section className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20 pt-28 px-4">
        <div className="max-w-5xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Zurück zur Startseite</span>
          </Link>
        </div>

        <RevealOnScroll>
          <div className="max-w-5xl mx-auto rounded-2xl shadow-2xl bg-gray-900/80 border border-white/10 p-8 md:p-16">
            {/* Header */}
            <div className="flex flex-col items-center mb-12 text-center">
              <div className="inline-flex items-center gap-2 border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-mono px-4 py-2 rounded-full mb-6">
                Case Study
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-3">
                {data.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">{data.subtitle}</p>
              <p className="text-sm text-gray-500">{data.role}</p>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {data.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-blue-400 mb-2">{s.value}</div>
                    <div className="text-gray-300 text-sm">{s.label}</div>
                    <div className="text-gray-500 text-xs">{s.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ausgangslage */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Ausgangslage</h2>
              <p className="text-gray-300 leading-relaxed">{data.ausgangslage}</p>
            </div>

            {/* Loesung */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Lösung</h2>
              <ul className="space-y-3">
                {data.loesung.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ergebnisse */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Ergebnisse</h2>
              <ul className="space-y-3">
                {data.ergebnisse.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                    <FaCheck className="w-4 h-4 text-cyan-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Technologie-Stack</h2>
              <div className="flex flex-wrap gap-2">
                {data.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm border border-blue-500/30 bg-blue-500/10 text-blue-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center border-t border-white/10 pt-10">
              <p className="text-gray-300 mb-6">
                Ähnliche Prozesse in Ihrem Unternehmen? Lassen Sie uns sprechen.
              </p>
              <Link
                to="/hire"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
                Projekt anfragen
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
      </main>

      <Footer />
    </div>
  );
};
