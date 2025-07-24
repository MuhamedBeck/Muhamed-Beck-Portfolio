import { RevealOnScroll } from "../RevealOnScroll";

export const LlmUnitTestAutomation = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20 px-4 flex items-center justify-center">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto w-full rounded-2xl shadow-2xl bg-gray-900/80 border border-white/10 p-8 md:p-16 relative overflow-hidden">
          <div className="flex flex-col items-center mb-12">
            <div className="mb-4 animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent text-center drop-shadow-lg mb-2">
              LLM Unit-Test Automation
            </h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              Revolutionizing Java Testing: Automated, AI-powered
            </p>
          </div>

          <RevealOnScroll>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                This project explores the power of Large Language Models (LLMs)
                to automate the generation of unit tests for Java Spring Boot
                projects. The result: a Maven plugin that analyzes your code,
                identifies untested areas using JaCoCo, and generates
                high-quality, ready-to-run JUnit tests—instantly.
              </p>
              <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30">
                <h3 className="text-xl font-bold text-blue-400 mb-6 text-center">
                  Plugin Architecture & Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        1
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        Configuration
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Developer configures plugin in pom.xml with API keys,
                      model selection, and parameters
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        2
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        Analysis
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Maven plugin triggers JaCoCo to analyze current test
                      coverage and identify uncovered Classes
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        3
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        Coverage Report
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      JaCoCo provides detailed coverage data back to the Maven
                      plugin for processing
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        4
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        Prompt Engineering
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Plugin creates context-rich prompts with class content and
                      coverage data for LLM
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        5
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        AI Generation
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      LLM generates comprehensive JUnit 5 tests with proper
                      imports and structure
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="flex items-center mb-2">
                      <span className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                        6
                      </span>
                      <span className="text-neutral-200 font-semibold">
                        Integration
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Generated tests are cleaned, validated, and integrated
                      into project structure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Cinematic timeline/steps */}
          <RevealOnScroll>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                How It Works
              </h2>
              <ol className="relative border-l border-cyan-500/30 ml-2">
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    1
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Analyze Coverage
                  </h3>
                  <p className="text-gray-400">
                    The plugin uses{" "}
                    <span className="font-bold text-cyan-400">JaCoCo</span> to
                    scan your project and find code that isn't covered by tests.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    2
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Prompt the LLM
                  </h3>
                  <p className="text-gray-400">
                    For each uncovered class, a carefully engineered prompt is
                    sent to a local LLM (e.g., GPT-4), including code context
                    and requirements.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    3
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Generate & Integrate Tests
                  </h3>
                  <p className="text-gray-400">
                    The LLM returns a complete, ready-to-run{" "}
                    <span className="font-bold text-cyan-400">JUnit 5</span>{" "}
                    test class. The plugin saves it to your project and can even
                    retry/fix on errors.
                  </p>
                </li>
                <li className="ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    4
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Evaluate & Improve
                  </h3>
                  <p className="text-gray-400">
                    Run the new tests, measure coverage again, and enjoy higher
                    quality and faster development. Manual review is always
                    possible for full control.
                  </p>
                </li>
              </ol>
            </div>
          </RevealOnScroll>

          {/* Results and impact */}
          <RevealOnScroll>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-indigo-400 mb-4">
                Results & Impact
              </h2>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>
                  <span className="text-indigo-300 font-semibold">
                    +33% test coverage
                  </span>{" "}
                  in real-world projects (Academy, Infomapper, Chart Checker)
                </li>
                <li>
                  <span className="text-indigo-300 font-semibold">
                    Up to 99% time and cost savings
                  </span>{" "}
                  compared to manual test writing
                </li>
                <li>
                  <span className="text-indigo-300 font-semibold">
                    Cost reduction
                  </span>{" "}
                  and{" "}
                  <span className="text-indigo-300 font-semibold">
                    developer satisfaction
                  </span>{" "}
                  confirmed by expert survey
                </li>
                <li>
                  All data processed securely on-premise—no code leaves your
                  infrastructure
                </li>
              </ul>
            </div>
          </RevealOnScroll>

          {/* Cinematic call to action */}
          <RevealOnScroll>
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Why does this matter?
              </h2>
              <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                Imagine a world where developers focus on innovation, not
                boilerplate. Where AI and human expertise combine for robust,
                reliable software. This project is a step toward that future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="border border-blue-400 text-blue-400 py-3 px-8 rounded-lg font-semibold hover:bg-blue-400/10 transition-all duration-300">
                  Back to Portfolio
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Cinematic overlay effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-black/40" />
        </div>
      </RevealOnScroll>
    </section>
  );
};
