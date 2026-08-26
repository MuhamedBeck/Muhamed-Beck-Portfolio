// English case study content.
//
// These two pages were previously ArDataVisualization.jsx (463 lines) and
// LLMMavenPlugin.jsx (455 lines), which were near-identical copies of each
// other: the same classes at the same line numbers, differing only in text.
// The substance was real -- Design Science Research, a survey of 81
// participants, JaCoCo coverage figures, 50+ FPS -- but it sat under headings
// like "Innovation Impact", which appeared verbatim in both the bachelor and
// the master thesis, and "Comprehensive Evaluation", "Intelligent Coverage
// Analysis", "Smart Analysis".
//
// Facts and metrics come from the owner's theses and CV. Nothing here is
// rounded up or restated more strongly than the source supports.

export const PROJECTS_EN = [
  {
    path: "/en/projects/llm-maven-plugin",
    title: "LLM unit test automation",
    subtitle:
      "Master thesis at INFOMOTION GmbH: automated unit test generation for Java Spring Boot projects",
    role: "Master thesis, 02/2022 to 10/2024",
    stats: [
      { value: "9 → 42 %", label: "test coverage", note: "measured with JaCoCo" },
      { value: "1,440 → 30 min", label: "writing effort", note: "per project, against manual test development" },
      { value: "€2.13", label: "per generated suite", note: "down from €566 manually" },
    ],
    ausgangslage:
      "Writing unit tests for Spring Boot services is repetitive work that teams postpone, so coverage drifts down over time. Existing generators produced structurally valid but semantically empty tests, and none of them integrated with the Maven build the team already ran. A literature review of automated testing tools and LLM applications in software engineering found no approach that combined coverage analysis, test generation and the build lifecycle for Java Spring Boot.",
    loesung: [
      "Applied Design Science Research with its relevance, rigor and design cycles, so the artifact was built against a stated real-world problem rather than a hypothetical one.",
      "Developed and compared prompt strategies systematically: zero-shot, one-shot and few-shot, evaluating which produced compilable and meaningful JUnit 5 tests.",
      "Built UTestGenLLM, a Maven plugin that hooks into configurable build phases, analyses the project's classes and generates tests without leaving the normal build.",
      "Integrated JaCoCo so the plugin reads existing coverage, identifies untested classes and methods, and prioritises generation by the actual gaps rather than generating blindly.",
      "Ran the LLM against a private Azure-hosted GPT instance, so proprietary source code never reached a public endpoint.",
      "Validated across multiple projects with quantitative coverage metrics and an expert evaluation.",
    ],
    ergebnisse: [
      "Test coverage rose from 9 to 42 percent across the evaluated projects",
      "Effort for writing tests fell from 1,440 to 30 minutes per project compared with manual development",
      "Cost per generated test suite fell from about 566 € of developer time to about 2.13 € in API cost",
      "Prompt engineering was shown to measurably affect the quality of generated technical code",
      "Produced a reusable framework for integrating LLMs into enterprise software development workflows",
    ],
    stack: [
      "Java",
      "Maven",
      "Spring Boot",
      "JUnit 5",
      "JaCoCo",
      "OpenAI GPT-3.5 and GPT-4",
      "Azure OpenAI",
    ],
  },
  {
    path: "/en/projects/ar-data-visualization",
    title: "AR data visualisation",
    subtitle:
      "Bachelor thesis at INFOMOTION GmbH: SAP BusinessObjects reports as interactive 3D visualisations in the browser",
    role: "Bachelor thesis, 2022",
    stats: [
      { value: "50+", label: "frames per second", note: "rendering in the browser" },
      { value: "< 15 s", label: "load time", note: "across all components" },
      { value: "81", label: "survey participants", note: "at German companies" },
    ],
    ausgangslage:
      "Business intelligence reports are read on flat screens, which limits how many dimensions can be shown at once. Augmented reality had been applied to business contexts before, but not in combination with an enterprise reporting system, and no study had established whether companies would actually adopt it. That left two open questions: whether browser-based AR is technically viable against a live SAP source, and what stops organisations from using it.",
    loesung: [
      "Reviewed existing AR applications in business contexts and identified the gap: no AR-based data visualisation integrated with SAP BusinessObjects.",
      "Surveyed 81 participants across German companies on adoption barriers and which visualisation features would be useful.",
      "Designed a system architecture joining web technologies, AR frameworks and an enterprise data source.",
      "Built the frontend with Angular 14 and TypeScript, using AR.js, A-Frame and BabiaXR for the immersive layer.",
      "Implemented marker generation and recognition with ARToolKit for precise spatial positioning of the 3D charts.",
      "Built a Spring Boot backend with REST APIs pulling live data from SAP BusinessObjects, validated against the INFOMOTION library database and its lending analytics.",
      "Tested functional and non-functional requirements, including rendering performance and load time.",
    ],
    ergebnisse: [
      "Bar charts, pie charts and multi-chart displays rendered in AR with full rotation and scaling",
      "Rendering held above 50 frames per second, with all components loading in under 15 seconds",
      "Ran in Chrome and Firefox without an app install, on the device people already carry",
      "The survey named the two main barriers: lack of knowledge (59 percent) and missing use cases (41 percent)",
      "Demonstrated that browser-based AR is feasible for enterprise reporting, and produced a framework for later AR business intelligence work",
    ],
    stack: [
      "Angular 14",
      "TypeScript",
      "AR.js",
      "A-Frame",
      "BabiaXR",
      "ARToolKit",
      "Spring Boot",
      "REST APIs",
      "SAP BusinessObjects",
    ],
  },
];

export const getProjectEn = (path) => PROJECTS_EN.find((p) => p.path === path);
