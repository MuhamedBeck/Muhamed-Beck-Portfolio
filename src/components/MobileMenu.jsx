import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const menuItems = [
    {
      href: "#home",
      label: "Home",
      description: "Welcome & Introduction",
      number: "01",
    },
    {
      href: "/services",
      label: "Services",
      description: "What I Offer",
      number: "02",
    },
    {
      href: "#about",
      label: "About",
      description: "Background & Skills",
      number: "03",
    },
    {
      href: "#projects",
      label: "Projects",
      description: "Featured Work",
      number: "04",
    },
    {
      href: "#contact",
      label: "Contact",
      description: "Get In Touch",
      number: "05",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={`safe-area-full fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transition-all duration-500 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)",
          backdropFilter: "blur(20px) saturate(1.2)",
          borderLeft: "1px solid rgba(59, 130, 246, 0.2)",
        }}>
        {/* Header */}
        <div className="relative p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></div>
                <div>
                  <h3 className="text-white font-semibold text-xl tracking-wide">
                    NAVIGATION
                  </h3>
                  <p className="text-blue-400 text-xs font-mono uppercase tracking-widest">
                    PORTFOLIO 2025
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 group"
              aria-label="Close Menu">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Decorative line */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* Navigation Items */}
        <nav className="p-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-blue-500/20 transform ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 100}ms` : "0ms",
                  willChange: "transform, opacity",
                }}>
                <div className="w-16 h-16 rounded-lg border border-blue-500/30 flex items-center justify-center transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-blue-500/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10"></div>
                  <span className="text-blue-400 font-mono text-lg font-bold relative z-10 group-hover:text-blue-300 transition-colors duration-300">
                    {item.number}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>

                <div className="flex-1">
                  <span className="block text-white font-semibold text-lg tracking-wide group-hover:text-blue-300 transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="block text-gray-400 text-sm font-mono uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </span>
                </div>

                <div className="text-gray-500 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1">
                  <div className="w-6 h-6 border border-gray-500/50 rounded group-hover:border-blue-400/80 flex items-center justify-center transition-all duration-300">
                    <div className="w-2 h-2 border-r border-t border-gray-500 group-hover:border-blue-400 transform rotate-45 transition-colors duration-300"></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="relative p-6 rounded-lg border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-400/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-400/10 rounded-lg"></div>
            <div className="relative text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <p className="text-blue-400 text-xs font-mono uppercase tracking-widest">
                  DEVELOPED BY
                </p>
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}></div>
              </div>
              <p className="text-white font-semibold tracking-wide">
                MUHAMED NUR BECK
              </p>
              <p className="text-gray-400 text-xs font-mono mt-1">
                © 2025 ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none rounded-l-2xl" />
      </div>
    </>
  );
};
