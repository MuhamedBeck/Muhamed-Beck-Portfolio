import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const frontendSkills = [
    "Angular",
    "React.js",
    "TypeScript",
    "HTML/CSS",
    "Tailwind",
  ];

  const backendSkills = [
    "Java",
    "Spring Boot",
    "Python",
    "Node.js",
    "REST APIs",
  ];

  const otherSkills = ["Docker", "Kubernetes", "CI/CD", "Helm", "Git"];
  const aiSkills = ["n8n", "Zapier", "OpenAI/GPT", "Anthropic Claude", "OpenClaw", "Voice AI", "Prompt Engineering"];

  const mainExperience = [
    {
      title: "AI Automation Manager",
      company: "TOPEOPLE Group GmbH",
      period: "09/2025 - Present",
      highlights: [
        "Automated recruiting & internal workflows with n8n/Zapier; cut cycle time 80%",
        "Built GPT apps (OpenAI/Azure, LangChain/RAG) for candidate ops; raised automation rate 90%",
        "Deployed Voice AI agents (Twilio/WebRTC, STT/TTS); improved CSAT",
        "Shipped ATS/CRM integrations (REST/Webhooks; OAuth2/JWT) incl. Personio/Greenhouse/HubSpot",
        "Ran CI/CD & Ops (GitLab, Docker/Kubernetes); Prometheus monitoring",
        "Set LLM guardrails (PII/GDPR, evaluation tests, audit/RBAC) and ROI tracking (time-to-hire, SLA)",
        "Built standalone apps using JavaScript, HTML & CSS with forms connected to n8n and Zapier",
      ],
    },
    {
      title: "Full-Stack Developer & AI Integration Lead",
      company: "Phoenix Parkservice (Freelance)",
      period: "06/2024 - 09/2025",
      highlights: [
        "Architected microservices with Spring Boot/Angular & REST APIs",
        "Implemented complete DevOps pipeline with Docker & CI/CD",
        "Increased organic traffic by 35% through AI-based SEO automation",
      ],
    },
    {
      title: "Full-Stack Developer & Master Thesis",
      company: "INFOMOTION GmbH",
      period: "09/2022 - 09/2024",
      highlights: [
        "Developed LLM-based Maven plugin increasing test coverage by 33%",
        "Created AR/3D visualization app for SAP BusinessObjects dashboards",
        "Managed Kubernetes deployments and Azure cloud integration",
      ],
    },
    {
      title: "Cryptographie Engineering Intern",
      company: "Deutsche Bank",
      period: "05/2021 - 10/2021",
      highlights: [
        "Supported digital signature validation service PoC and deployment",
      ],
    },
  ];

  const additionalExperience = [
    {
      title: "Java Tutor",
      company: "Frankfurt University of Applied Sciences",
      period: "11/2020 - 03/2021",
      highlights: [
        "Led tutorials for 30+ students, improved pass rates by 20%",
      ],
    },
    {
      title: "1st & 2nd Level Support",
      company: "Mila IT-Services",
      period: "04/2018 - 11/2018",
      highlights: [
        "Resolved 60+ hardware/software issues, maintained high satisfaction",
      ],
    },
  ];

  return (
    <section
      id="about"
      className="min-h-[100dvh] flex items-center justify-center py-20 overflow-x-hidden">
      <RevealOnScroll legacy>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-2xl p-8 border border-white/10 backdrop-blur-sm bg-gray-900/50 mb-12">
            <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              AI Automation Manager & Full-Stack Developer specializing in LLM
              integration, n8n/Zapier workflow automation, and modern web
              development. Building production-ready AI solutions with OpenAI,
              Anthropic Claude, and OpenClaw, from intelligent automation
              pipelines to scalable full-stack applications.
            </p>
          </div>

          <RevealOnScroll legacy>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="group relative">
                <div className="relative rounded-2xl p-6 h-full border border-white/10 bg-gray-900/50 shadow-lg hover:bg-gray-900/70 group-hover:-translate-y-2 group-hover:scale-[1.03] transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontendSkills.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/20 text-blue-200 py-2 px-4 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-500/30 hover:text-white transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative rounded-2xl p-6 h-full border border-white/10 bg-gray-900/50 shadow-lg hover:bg-gray-900/70 group-hover:-translate-y-2 group-hover:scale-[1.03] transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {backendSkills.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-cyan-500/20 text-cyan-200 py-2 px-4 rounded-lg text-sm font-semibold shadow-sm hover:bg-cyan-500/30 hover:text-white transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative rounded-2xl p-6 h-full border border-white/10 bg-gray-900/50 shadow-lg hover:bg-gray-900/70 group-hover:-translate-y-2 group-hover:scale-[1.03] transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4 text-indigo-400">
                    DevOps & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {otherSkills.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-indigo-500/20 text-indigo-200 py-2 px-4 rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-500/30 hover:text-white transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="relative rounded-2xl p-6 h-full border border-white/10 bg-gray-900/50 shadow-lg hover:bg-gray-900/70 group-hover:-translate-y-2 group-hover:scale-[1.03] transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">
                    AI & Automation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {aiSkills.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-purple-500/20 text-purple-200 py-2 px-4 rounded-lg text-sm font-semibold shadow-sm hover:bg-purple-500/30 hover:text-white transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll legacy>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="p-6 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300">
                    <h4 className="font-bold text-blue-400 mb-2">
                      M.Sc in Business Informatics
                    </h4>
                    <p className="text-gray-300 mb-1">
                      Frankfurt University of Applied Sciences
                    </p>
                    <p className="text-sm text-gray-400">
                      2022 - 2024 • GPA: 1.4 (German scale)
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300">
                    <h4 className="font-bold text-blue-400 mb-2">
                      B.Sc in International Business Information Systems
                    </h4>
                    <p className="text-gray-300 mb-1">
                      Frankfurt University of Applied Sciences
                    </p>
                    <p className="text-sm text-gray-400">
                      2018 - 2022 • GPA: 1.6 (German scale)
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300">
                    <h4 className="font-bold text-blue-400 mb-2">
                      Abitur (General University Entrance Qualification)
                    </h4>
                    <p className="text-gray-300 mb-1">
                      Ernst-Reuter-Schule 1, Frankfurt
                    </p>
                    <p className="text-sm text-gray-400">
                      Dec 2012 - Jun 2017 • Grade: 1.9 (German scale)
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">
                  Work Experience
                </h3>
                <div className="space-y-4">
                  {mainExperience.map((job, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-cyan-400 mb-1">
                            {job.title}
                          </h4>
                          <p className="text-gray-300">{job.company}</p>
                        </div>
                        <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                          {job.period}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {job.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-400 flex items-start">
                            <span className="text-cyan-400 mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div
                    className={`grid grid-cols-1 gap-4 transition-all duration-700 ease-in-out ${
                      showAllExperiences
                        ? "max-h-[1000px] opacity-100 mt-4"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}>
                    {additionalExperience.map((job, index) => (
                      <div
                        key={index}
                        className={`group p-6 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 ${
                          showAllExperiences
                            ? `translate-y-0 opacity-100 delay-${
                                (index + 1) * 100
                              }`
                            : "translate-y-4 opacity-0"
                        }`}
                        style={{
                          transitionDelay: showAllExperiences
                            ? `${(index + 1) * 100}ms`
                            : "0ms",
                        }}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-cyan-400 mb-1">
                              {job.title}
                            </h4>
                            <p className="text-gray-300">{job.company}</p>
                          </div>
                          <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                            {job.period}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {job.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-400 flex items-start">
                              <span className="text-cyan-400 mr-2">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowAllExperiences(!showAllExperiences)}
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center justify-center mx-auto gap-2">
                      {showAllExperiences
                        ? "Show less"
                        : "View all experiences"}
                      <span
                        className={`transform transition-transform duration-300 ${
                          showAllExperiences ? "rotate-180" : ""
                        }`}>
                        ↓
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll legacy>
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Certificates & Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
                    issuer: "Google",
                    date: "Jan 2026",
                    iconBg: "bg-blue-500/20 border-blue-500/30",
                    iconColor: "text-blue-400",
                  },
                  {
                    title: "React.js",
                    issuer: "Great Learning",
                    date: "Jul 2025",
                    iconBg: "bg-cyan-500/20 border-cyan-500/30",
                    iconColor: "text-cyan-400",
                  },
                  {
                    title: "SAP BusinessObjects Web Intelligence Grundlagen",
                    issuer: "INFOMOTION GmbH",
                    date: "Feb 2022",
                    iconBg: "bg-indigo-500/20 border-indigo-500/30",
                    iconColor: "text-indigo-400",
                  },
                  {
                    title: "Advanced Proficiency in KNIME Analytics Platform",
                    issuer: "KNIME",
                    date: "Apr 2023",
                    iconBg: "bg-purple-500/20 border-purple-500/30",
                    iconColor: "text-purple-400",
                  },
                  {
                    title: "Basic Proficiency in KNIME Analytics Platform",
                    issuer: "KNIME",
                    date: "Apr 2023",
                    iconBg: "bg-purple-500/20 border-purple-500/30",
                    iconColor: "text-purple-400",
                  },
                ].map((cert, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 flex items-start gap-4">
                    <div className={`mt-0.5 w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border ${cert.iconBg}`}>
                      <svg className={`w-4 h-4 ${cert.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm leading-snug mb-1">
                        {cert.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </RevealOnScroll>
    </section>
  );
};
