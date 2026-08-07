import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20 overflow-x-hidden">
      <RevealOnScroll legacy>
        <div className="max-w-5xl mx-auto px-4 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">Phoenix Parkservice</h3>
                <p className="text-gray-400 mb-4">
                  Developed and led the IT infrastructure and website for{" "}
                  <a
                    href="https://www.phoenixparkservice.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-300 hover:text-blue-400">
                    phoenixparkservice.de
                  </a>
                  , including modern DevOps, booking service, microservices, and
                  AI-powered SEO automation using n8n Workflow.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["Spring Boot", "Angular", "Docker", "CI/CD", "n8n"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-1 px-2 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default whitespace-nowrap">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end mt-auto">
                <a
                  href="https://www.phoenixparkservice.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 font-bold"
                  aria-label="Visit Phoenix Parkservice website">
                  Visit Website &rarr;
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  LLM Unit Test Automation (Master Thesis)
                </h3>
                <p className="text-gray-400 mb-4">
                  AI-powered Maven plugin that automates unit test generation
                  for Spring Boot projects. Integrates ChatGPT with JaCoCo
                  for coverage analysis and cuts test writing time by up to
                  95% compared to manual test development.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["Java", "Maven", "ChatGPT", "JaCoCo", "Spring Boot"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-1 px-2 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default whitespace-nowrap">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end mt-auto">
                <a
                  href="/projects/llm-maven-plugin"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 font-bold">
                  View Details →
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">TaskFlow</h3>
                <p className="text-gray-400 mb-4">
                  A full-stack task management application built with Angular
                  and Spring Boot, featuring JWT authentication, modern UI
                  design, and comprehensive task management capabilities with
                  priority system and due date tracking.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {[
                  "Angular",
                  "Spring Boot",
                  "PostgreSQL",
                  "JWT",
                  "TypeScript",
                ].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/15 text-blue-300 py-1 px-2 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default whitespace-nowrap">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-end mt-auto">
                <a
                  href="https://taskflow-nu-three.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 font-bold">
                  Visit Website →
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  AR Data Visualization (Bachelor Thesis)
                </h3>
                <p className="text-gray-400 mb-4">
                  Web-based AR solution that turns SAP BusinessObjects reports
                  into interactive 3D visualizations. Built with Angular, AR.js
                  and A-Frame for browser-based augmented reality.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-2 justify-start">
                {["Angular", "AR.js", "SAP BO", "Spring Boot", "A-Frame"].map(
                  (tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/15 text-blue-300 py-1 px-2 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default whitespace-nowrap">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end mt-auto">
                <a
                  href="/projects/ar-data-visualization"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 font-bold">
                  View Details →
                </a>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-[320px] p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all">
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
                      className="bg-blue-500/15 text-blue-300 py-1 px-2 rounded-lg text-sm hover:bg-blue-500/25 hover:text-blue-200 transition-all duration-300 cursor-default whitespace-nowrap">
                      {tech}
                    </span>
                  )
                )}
              </div>
              <div className="flex justify-end mt-auto">
                <a
                  href="https://linkedin-analyzer-weld.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 font-bold">
                  Visit Website →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
