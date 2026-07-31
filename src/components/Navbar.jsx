import { useEffect } from "react";
import { Link } from "react-router-dom";
import mnbLogo from "../assets/MNB_Logo.webp";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // ...existing code...

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={mnbLogo} alt="MNB Logo" width="500" height="500" className="h-12 w-auto" />
          </Link>

          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}>
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Services
            </Link>
            <a
              href="/#projects"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Projects
            </a>
            <a
              href="/#about"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              About Me
            </a>
            <a
              href="/#contact"
              className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              Contact
            </a>
            <Link
              to="/hire"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
