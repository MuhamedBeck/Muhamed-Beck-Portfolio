import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  // ...existing code...

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-x-hidden">
      <RevealOnScroll>
        <div className="text-center z-10 px-4 w-full max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Hi, I'm Muhamed Nur Beck
          </h1>

          <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-lg mx-auto px-2">
            I'm a full-stack & AI developer who loves crafting clean, scalable
            web applications. My goal is to build solutions that offer
            exceptional performance, delightful user experience and innovative
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4 px-4">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-center group cursor-pointer">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                View Projects
              </span>
            </a>
            <a
              href="#contact"
              className="border border-blue-500 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10 text-center group flex items-center justify-center gap-2 cursor-pointer">
              <svg
                className="w-4 h-4 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
