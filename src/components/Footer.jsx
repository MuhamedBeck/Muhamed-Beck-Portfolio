const Footer = () => (
  <footer className="w-full py-6 text-center text-gray-400 bg-black border-t border-gray-800 mt-12">
    <div className="max-w-4xl mx-auto px-4">
      &copy; {new Date().getFullYear()} Muhamed Nur Beck. All rights reserved. |{" "}
      <a href="#contact" className="underline hover:text-blue-400 transition">
        Contact
      </a>
    </div>
  </footer>
);

export default Footer;
