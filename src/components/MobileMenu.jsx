import { useEffect } from "react";
import { Link } from "react-router-dom";
import mnbLogo from "../assets/MNB_Logo.png";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home", isRoute: true },
    { href: "/services", label: "Services", isRoute: true },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-50 flex flex-col transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(160deg, rgba(9,9,11,0.98) 0%, rgba(15,23,42,0.98) 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06] shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <img src={mnbLogo} alt="MNB Logo" className="h-8 w-auto" />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Close menu">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav: overflow-y-auto + overscroll-contain prevents page scroll-through on iOS */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
          <ul className="space-y-0.5">
            {navLinks.map((item, i) => {
              const linkClass = `flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.05] active:bg-white/10 group ${
                menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
              }`;
              const linkStyle = {
                transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms",
                transitionProperty: "opacity, transform",
                transitionDuration: "300ms",
              };
              const inner = (
                <>
                  <span className="font-medium text-[15px] tracking-wide">{item.label}</span>
                  <svg className="w-4 h-4 text-gray-700 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              );
              return (
                <li key={item.href}>
                  {item.isRoute ? (
                    <Link to={item.href} onClick={() => setMenuOpen(false)} className={linkClass} style={linkStyle}>{inner}</Link>
                  ) : (
                    <a href={item.href} onClick={() => setMenuOpen(false)} className={linkClass} style={linkStyle}>{inner}</a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-white/[0.06]" />

          {/* Hire Me CTA */}
          <Link
            to="/hire"
            onClick={() => setMenuOpen(false)}
            className={`flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.45)] ${
              menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
            style={{
              transitionDelay: menuOpen ? `${80 + navLinks.length * 45}ms` : "0ms",
              transitionProperty: "opacity, transform, box-shadow",
              transitionDuration: "300ms",
            }}>
            Hire Me
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.06] shrink-0">
          <p className="text-gray-600 text-xs font-mono text-center tracking-wider">
            © 2025 Muhamed Nur Beck
          </p>
        </div>
      </div>
    </>
  );
};
