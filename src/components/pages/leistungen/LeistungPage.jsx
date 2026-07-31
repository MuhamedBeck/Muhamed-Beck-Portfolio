import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Navbar } from "../../Navbar";
import { MobileMenu } from "../../MobileMenu";
import Footer from "../../Footer";
import { RevealOnScroll } from "../../RevealOnScroll";
import { usePageMeta } from "../../../seo/usePageMeta";
import { getRouteMeta } from "../../../seo/routes.meta";
import { PREIS_TEXT } from "../../../content/leistungen.de";

export const LeistungPage = ({ data }) => {
  usePageMeta(getRouteMeta(data.path));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100" style={{ background: "#0a0a0a" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
      <section className="min-h-screen w-full py-20 pt-28 px-4" style={{ background: "#0a0a0a" }}>
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-mono px-4 py-2 rounded-full mb-8">
                {data.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6 leading-tight">
                {data.h1}
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {data.intro}
              </p>
            </div>

            {/* Szenarien */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {data.szenarien.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl p-6 border border-white/10 bg-gray-900/50 backdrop-blur-sm">
                  <h2 className="text-lg font-bold text-blue-400 mb-3">{s.title}</h2>
                  <p className="text-gray-300 leading-relaxed text-sm">{s.text}</p>
                </div>
              ))}
            </div>

            {/* Leistungen */}
            <div className="rounded-2xl p-8 border border-white/10 bg-gray-900/50 backdrop-blur-sm mb-16">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Leistungen im Überblick</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {data.leistungen.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <FaCheck className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ablauf */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                So läuft ein Projekt ab
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.ablauf.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-2xl p-6 border border-white/10 bg-gray-900/50 backdrop-blur-sm">
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                      0{i + 1}
                    </div>
                    <h3 className="font-bold text-gray-100 mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Preis */}
            <div className="rounded-2xl p-8 border border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-gray-900/50 backdrop-blur-sm mb-16 text-center">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">Stundensatz</h2>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                90 bis 135 € / Stunde
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">{PREIS_TEXT}</p>
            </div>

            {/* Case Study */}
            <div className="rounded-2xl p-8 border border-white/10 bg-gray-900/50 backdrop-blur-sm mb-16">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">Ergebnis aus der Praxis</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center shrink-0">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {data.caseStudy.stat}
                  </div>
                  <div className="text-gray-400 text-sm mt-2 max-w-[180px]">
                    {data.caseStudy.statLabel}
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed mb-4">{data.caseStudy.text}</p>
                  <Link
                    to={data.caseStudy.link}
                    className="text-cyan-400 hover:text-blue-400 transition-colors font-medium">
                    {data.caseStudy.linkText} →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Häufige Fragen
              </h2>
              <div className="space-y-4">
                {data.faq.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl p-6 border border-white/10 bg-gray-900/50 backdrop-blur-sm">
                    <h3 className="font-bold text-gray-100 mb-2">{item.q}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link
                to="/hire"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
                Projekt anfragen
              </Link>
              <p className="text-gray-500 text-sm mt-4">
                Antwort innerhalb von 24 Stunden · Frankfurt & Remote
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>
      </main>

      <Footer />
    </div>
  );
};
