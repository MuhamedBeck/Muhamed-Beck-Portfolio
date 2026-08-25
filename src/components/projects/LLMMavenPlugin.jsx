import { RevealOnScroll } from "../RevealOnScroll";
import { useRouteMeta } from "../../seo/useRouteMeta";

export const LLMMavenPlugin = () => {
  useRouteMeta();
  return (
    <section className="min-h-[100dvh] w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20 px-4 flex items-center justify-center">
      <RevealOnScroll legacy>
        <div className="max-w-5xl mx-auto w-full rounded-2xl shadow-2xl bg-gray-900/80 border border-hairline p-8 md:p-16 relative overflow-hidden">
          <div className="flex flex-col items-center mb-12">
            <div className="mb-4 animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent text-center drop-shadow-lg mb-2">
              LLM Unit Test Automation
            </h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              AI-Powered Automated Unit Test Generation for Spring Boot Projects
            </p>
          </div>

          <RevealOnScroll legacy>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Master Thesis Overview
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                This master thesis explores the application of Large Language
                Models (LLMs) in automated unit test generation for Java Spring
                Boot applications. The research demonstrates how ChatGPT can be
                integrated into Maven build processes to automatically analyze
                code coverage and generate unit tests, significantly improving
                testing efficiency.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Academic Achievement
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Master of Science (M.Sc.) - Software Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Frankfurt University of Applied Sciences
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Focus: AI-Driven Software Testing Automation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Conducted at INFOMOTION GmbH
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Innovation Impact
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      First comprehensive LLM-based Maven testing plugin
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Significant cost & time reduction in test development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Enhanced test coverage through AI automation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Privacy-compliant enterprise LLM integration
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30">
                <h3 className="text-xl font-bold text-accent mb-6 text-center">
                  Technology Stack & Architecture
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        LLM Integration
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      OpenAI GPT-3.5/GPT-4 with custom prompt engineering for
                      Java test generation
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Maven Plugin
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Custom Maven plugin for seamless Spring Boot project
                      integration
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Coverage Analysis
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      JaCoCo integration for intelligent test coverage analysis
                      and reporting
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Enterprise Security
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Azure-hosted private GPT instance ensuring data privacy
                      and compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Research Methodology */}
          <RevealOnScroll legacy>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Research & Development Process
              </h2>
              <ol className="relative border-l border-cyan-500/30 ml-2">
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    1
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Literature Review & Problem Analysis
                  </h3>
                  <p className="text-gray-400">
                    Comprehensive analysis of existing automated testing tools
                    and LLM applications in software engineering, identifying
                    gaps in Java Spring Boot testing automation.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    2
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Design Science Research Methodology
                  </h3>
                  <p className="text-gray-400">
                    Applied systematic DSR approach with relevance, rigor, and
                    design cycles to develop an innovative artifact addressing
                    real-world testing challenges.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    3
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Prompt Engineering Optimization
                  </h3>
                  <p className="text-gray-400">
                    Systematic development and evaluation of prompt strategies
                    using Zero-Shot, One-Shot, and Few-Shot learning techniques
                    for optimal test generation.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    4
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Maven Plugin Development
                  </h3>
                  <p className="text-gray-400">
                    Built UTestGenLLM plugin with automated JaCoCo integration,
                    intelligent class analysis, and seamless LLM communication
                    for production environments.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    5
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Comprehensive Evaluation
                  </h3>
                  <p className="text-gray-400">
                    Multi-project validation with quantitative metrics and
                    expert evaluation, demonstrating significant improvements in
                    test coverage and development efficiency.
                  </p>
                </li>
              </ol>
            </div>
          </RevealOnScroll>

          {/* Key Features */}
          <RevealOnScroll legacy>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Key Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    Intelligent Coverage Analysis
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Automated JaCoCo integration analyzes existing test
                    coverage, identifies untested classes and methods, and
                    prioritizes test generation based on coverage gaps.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      JaCoCo Integration
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Smart Analysis
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    LLM-Powered Test Generation
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Advanced prompt engineering with context-aware test case
                    generation using GPT-3.5/GPT-4, producing executable JUnit 5
                    tests with proper imports and structure.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      GPT Integration
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      JUnit 5
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    Maven Lifecycle Integration
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Seamless integration into Maven build phases with
                    configurable execution timing, automated error handling, and
                    build process continuity.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Maven Plugin
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Build Integration
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    Enterprise-Grade Security
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Private Azure-hosted GPT instances ensure sensitive code
                    remains secure, with configurable API endpoints and
                    comprehensive privacy compliance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Azure Security
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Privacy Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Research Impact */}
          <RevealOnScroll legacy>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Research Impact & Findings
              </h2>
              <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      95%
                    </div>
                    <div className="text-gray-300 text-sm">Time Reduction</div>
                    <div className="text-paper-mute text-xs">
                      Compared to manual test development
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      74%
                    </div>
                    <div className="text-gray-300 text-sm">
                      Error-Free Tests
                    </div>
                    <div className="text-paper-mute text-xs">
                      Generated without modification
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      84%
                    </div>
                    <div className="text-gray-300 text-sm">Success Rate</div>
                    <div className="text-paper-mute text-xs">
                      After minimal adjustments
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-900/30">
                  <h4 className="text-lg font-bold text-blue-300 mb-3">
                    Key Research Contributions
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        First comprehensive study integrating LLMs with Maven
                        build processes for automated testing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Demonstrated significant cost reduction (€566 to €2.13)
                        and time savings in test development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Validated effectiveness of prompt engineering techniques
                        for technical code generation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Established framework for enterprise LLM integration in
                        software development workflows
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Technical Achievements */}
          <RevealOnScroll legacy>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Technical Achievements & Validation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-cyan-300">
                    Coverage Improvements
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Academy Project</span>
                      <span className="text-cyan-400 font-bold">26% → 43%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Infomapper Project</span>
                      <span className="text-cyan-400 font-bold">0% → 39%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Chart Checker Project
                      </span>
                      <span className="text-cyan-400 font-bold">0% → 43%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Average Improvement</span>
                      <span className="text-cyan-400 font-bold">+33%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-cyan-300">
                    Quality Metrics
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      71% test success rate on first execution
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Automated JaCoCo integration and reporting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Context-aware test generation with imports
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Configurable prompt engineering strategies
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Enterprise-ready security and compliance
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Seamless Spring Boot project integration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="border border-blue-400 text-accent py-3 px-8 rounded-lg font-semibold hover:bg-blue-400/10 transition-all duration-300 my-4">
              Back to Portfolio
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
