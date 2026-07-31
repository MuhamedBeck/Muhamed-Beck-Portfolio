import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="w-full pt-6 text-center text-gray-400 border-t border-gray-800 mt-4"
    style={{ background: '#0a0a0a', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 20px))' }}>
    <div className="max-w-6xl mx-auto px-4">
      {/* German service pages */}
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mb-4 text-xs">
        <Link
          to="/leistungen/n8n-automatisierung"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
          n8n Automatisierung
        </Link>
        <span className="text-gray-700">·</span>
        <Link
          to="/leistungen/ki-automatisierung-frankfurt"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
          KI-Automatisierung Frankfurt
        </Link>
        <span className="text-gray-700">·</span>
        <Link
          to="/leistungen/hubspot-integration"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
          HubSpot Integration
        </Link>
        <span className="text-gray-700">·</span>
        <Link
          to="/projekte/recruiting-automatisierung"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
          Case Study Recruiting
        </Link>
        <span className="text-gray-700">·</span>
        <Link
          to="/projekte/phoenix-parkservice"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
          Case Study Phoenix
        </Link>
      </div>

      {/* Single Row Layout */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
        {/* Contact Information */}
        <a
          href="mailto:m.nur.beck@hotmail.de"
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
          aria-label="Send email">
          <FaEnvelope className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium">m.nur.beck@hotmail.de</span>
        </a>

        <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>

        <a
          href="tel:+4917666008485"
          className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300 group"
          aria-label="Call phone number">
          <FaPhone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium">+49 176 66008485</span>
        </a>

        <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/muhamed-nur-beck"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.github.com/MuhamedBeck"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

        <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} Muhamed Nur Beck
        </div>

        <div className="w-px h-4 bg-gray-600 hidden sm:block"></div>

        {/* Legal Links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            to="/impressum"
            className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
            Impressum
          </Link>
          <Link
            to="/datenschutz"
            className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
            Datenschutz
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
