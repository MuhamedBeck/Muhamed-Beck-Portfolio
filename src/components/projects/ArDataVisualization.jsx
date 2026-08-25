import { RevealOnScroll } from "../RevealOnScroll";
import { useRouteMeta } from "../../seo/useRouteMeta";

export const ArDataVisualization = () => {
  useRouteMeta();
  return (
    <section className="min-h-[100dvh] w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20 px-4 flex items-center justify-center">
      <RevealOnScroll legacy>
        <div className="max-w-5xl mx-auto w-full rounded-2xl shadow-2xl bg-gray-900/80 border border-hairline p-8 md:p-16 relative overflow-hidden">
          <div className="flex flex-col items-center mb-12">
            <div className="mb-4 animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent text-center drop-shadow-lg mb-2">
              AR Data Visualization
            </h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              SAP BusinessObjects meets Augmented Reality
            </p>
          </div>

          <RevealOnScroll legacy>
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-accent mb-4">
                Bachelor Thesis Overview
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                This bachelor thesis explores the combination of Augmented
                Reality (AR) with business data visualization. The project
                demonstrates how SAP BusinessObjects reports and dashboards
                can be turned into interactive 3D AR experiences accessible
                through the browser.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-xl font-bold text-accent mb-4">
                    Academic Achievement
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      B.Sc. - International Business Information Systems
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Frankfurt University of Applied Sciences
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Submitted: August 2, 2022
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Supervised by Prof. Dr. Peter Ebinger & Prof. Dr. Markus
                      Grüne
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
                      First-of-its-kind AR business intelligence solution
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Bridges gap between BI and emerging tech
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Developed as generic solution for INFOMOTION clients
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      Extensive user research and market analysis included
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30">
                <h3 className="text-xl font-bold text-accent mb-6 text-center">
                  System Architecture & Technology Stack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Frontend Layer
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Angular 14 with TypeScript, AR.js, A-Frame.js, and
                      BabiaXR.js for immersive experiences
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Backend Services
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      Spring Boot backend with RESTful APIs for SAP
                      BusinessObjects integration
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Data Source
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      SAP BusinessObjects for enterprise reporting and data
                      visualization
                    </p>
                  </div>
                  <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-700">
                    <div className="mb-2">
                      <span className="text-neutral-200 font-semibold">
                        Library Database
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs">
                      INFOMOTION library database with book lending analytics
                      and usage patterns
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
                    Literature Review & Gap Analysis
                  </h3>
                  <p className="text-gray-400">
                    Comprehensive analysis of existing AR applications in
                    business contexts, identifying the research gap in AR-based
                    data visualization with SAP integration.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    2
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    User Research & Market Analysis
                  </h3>
                  <p className="text-gray-400">
                    Conducted extensive survey with 81 participants across
                    German companies to understand AR adoption barriers and user
                    preferences for data visualization features.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    3
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Technical Architecture Design
                  </h3>
                  <p className="text-gray-400">
                    Designed a comprehensive system architecture combining web
                    technologies, AR frameworks, and enterprise data sources for
                    seamless integration.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    4
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Prototype Development
                  </h3>
                  <p className="text-gray-400">
                    Built a fully functional web application demonstrating
                    multiple visualization types including bar charts, pie
                    charts, and multi-chart displays in AR.
                  </p>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full ring-8 ring-cyan-500/10 text-white font-bold">
                    5
                  </span>
                  <h3 className="font-semibold text-lg text-cyan-300">
                    Performance Evaluation
                  </h3>
                  <p className="text-gray-400">
                    Rigorous testing of functional and non-functional
                    requirements, achieving 50+ FPS rendering and sub-15 second
                    loading times across components.
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
                    Marker-Based AR Tracking
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Custom marker generation and recognition system using
                    ARToolKit.js for precise spatial positioning of 3D data
                    visualizations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      AR.js
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Custom Markers
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    3D Data Visualization
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Real-time rendering of interactive charts, graphs, and
                    reports with full 360° rotation and scaling capabilities in
                    AR space.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      BabiaXR.js
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      A-Frame.js
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    SAP Integration
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Direct connection to SAP BusinessObjects for live data
                    retrieval, supporting multiple chart types and real-time
                    updates.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      RESTful APIs
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      Live Data
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-blue-950/30 rounded-xl border border-blue-900/30 p-6">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">
                    Cross-Platform Support
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Web-based solution compatible with modern browsers,
                    eliminating need for app installations while maintaining
                    performance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      WebGL
                    </span>
                    <span className="bg-blue-500/15 text-blue-300 px-2 py-1 rounded text-xs">
                      PWA Ready
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
                      81
                    </div>
                    <div className="text-gray-300 text-sm">
                      Survey Participants
                    </div>
                    <div className="text-paper-mute text-xs">
                      Across German companies
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      89%
                    </div>
                    <div className="text-gray-300 text-sm">User Interest</div>
                    <div className="text-paper-mute text-xs">
                      In AR business applications
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">
                      11%
                    </div>
                    <div className="text-gray-300 text-sm">Current Usage</div>
                    <div className="text-paper-mute text-xs">
                      AR in German enterprises
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
                        First comprehensive study combining AR, SAP
                        BusinessObjects, and web technologies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Identified major barriers: lack of knowledge (59%) and
                        missing use cases (41%)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Demonstrated feasibility of browser-based AR for
                        enterprise applications
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2"></span>
                      <span>
                        Provided framework for future AR business intelligence
                        solutions
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
                    Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Rendering Performance
                      </span>
                      <span className="text-cyan-400 font-bold">50+ FPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Loading Time</span>
                      <span className="text-cyan-400 font-bold">
                        &lt; 15 seconds
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Browser Compatibility
                      </span>
                      <span className="text-cyan-400 font-bold">
                        Chrome + Firefox
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        Chart Types Supported
                      </span>
                      <span className="text-cyan-400 font-bold">6+ Types</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-cyan-300">
                    Functional Capabilities
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Multiple simultaneous chart display
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Real-time SAP data integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      360° camera-based interaction
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Responsive design adaptation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Custom marker generation
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                      Scalable component architecture
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="border border-blue-400 text-accent py-3 px-8 rounded-lg font-semibold hover:bg-blue-400/10 transition-all duration-300 my-4">
                Back to Portfolio
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </RevealOnScroll>
    </section>
  );
};
