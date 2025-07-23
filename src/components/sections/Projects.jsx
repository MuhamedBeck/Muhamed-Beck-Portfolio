import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">Phoenix Parkservice</h3>
                <p className="text-gray-400 mb-4">
                  Developed and led the IT infrastructure including the Website
                  for{" "}
                  <a
                    href="https://www.phoenixparkservice.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-300 hover:text-blue-400">
                    phoenixparkservice.de
                  </a>{" "}
                  with modern DevOps, microservices, and AI-powered SEO process
                  optimazation.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["Spring Boot", "Angular", "Docker", "CI/CD", "n8n"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-2 px-4 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end">
                <a
                  href="https://www.phoenixparkservice.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4">
                  Visit Website →
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">LinkedIn AI Analyzer</h3>
                <p className="text-gray-400 mb-4">
                  A tool for analyzing LinkedIn posts and generating
                  personalized messages. Features: post engagement analysis,
                  priority lead identification, AI-powered news, lead scoring by
                  seniority.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["React", "Vite", "Spring Boot", "Java", "OpenAI API"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-2 px-4 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end">
                <a
                  href="https://linkedin-analyzer-amgf.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4">
                  View Website →
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  Unit Test Generation Tool (AI)
                </h3>
                <p className="text-gray-400 mb-4">
                  Maven plugin for real-world projects at Infomotion. Uses
                  OpenAI to automatically generate unit tests, streamlining test
                  coverage and developer productivity. Not publicly accessible.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["Java", "Maven", "Spring Boot", "OpenAI API", "Jacoco"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-2 px-4 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end">
                <a
                  href="/projects/llm-unit-automation"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4">
                  View Details →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
