import { Link } from "react-router-dom";
import { Section } from "../Section";
import { LinkArrow } from "../LinkArrow";

/**
 * Projects block on the English homepage.
 *
 * Was five bordered cards with min-h-[320px], hover lift, blue glow and pill
 * tags, under a gradient-clipped "Featured Projects" heading. Now an editorial
 * index, the same shape HubPage uses for /projekte, so the whole row is the
 * click target and the stack reads as a list of work rather than a grid of
 * boxes.
 *
 * Internal links point at /en/projects/... directly. public/_redirects has
 * documented 301s from the old /projects/... paths, which stay as a safety net
 * for anything already linking there, but there is no reason to make a visitor
 * take the redirect hop.
 */
const PROJECTS = [
  {
    title: "Phoenix Parkservice",
    text: "Booking and administration software for a parking operator, built with Spring Boot and Angular, plus AI-supported SEO automation with n8n. Organic traffic rose 35 percent in three months.",
    stack: "Spring Boot, Angular, Docker, CI/CD, n8n",
    href: "https://www.phoenixparkservice.de",
    linkText: "phoenixparkservice.de",
    external: true,
  },
  {
    title: "LLM unit test automation",
    text: "Master thesis. A Maven plugin that generates unit tests for Spring Boot projects, pairing an LLM with JaCoCo coverage analysis. Test coverage rose from 9 to 42 percent and writing effort fell from 1,440 to 30 minutes per project.",
    stack: "Java, Maven, ChatGPT, JaCoCo, Spring Boot",
    href: "/en/projects/llm-maven-plugin",
    linkText: "Read the case study",
  },
  {
    title: "AR data visualisation",
    text: "Bachelor thesis. A browser-based augmented reality solution that turns SAP BusinessObjects reports into interactive 3D visualisations, rendering at over 50 frames per second.",
    stack: "Angular, AR.js, A-Frame, SAP BO, Spring Boot",
    href: "/en/projects/ar-data-visualization",
    linkText: "Read the case study",
  },
  {
    title: "TaskFlow",
    text: "Full-stack task management application with JWT authentication, a priority system and due date tracking.",
    stack: "Angular, Spring Boot, PostgreSQL, JWT",
    href: "https://taskflow-nu-three.vercel.app/",
    linkText: "Open the app",
    external: true,
  },
  {
    title: "LinkedIn AI Analyzer",
    text: "Analyses LinkedIn posts and drafts personalised messages: engagement analysis, lead identification and lead scoring by seniority.",
    stack: "React, Vite, Spring Boot, Java, OpenAI API",
    href: "https://linkedin-analyzer-weld.vercel.app/",
    linkText: "Open the app",
    external: true,
  },
];

export const Projects = () => (
  <div id="projects">
    <Section>
      <h2 className="label">Selected work</h2>
      <ul className="mt-8">
        {PROJECTS.map((project) => {
          const inner = (
            <>
              <div>
                <h3 className="headline-sub">{project.title}</h3>
                <p className="mt-3 text-sm text-paper-mute">{project.stack}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="max-w-[62ch] leading-relaxed text-paper-soft">
                  {project.text}
                </p>
                <span className="link-arrow mt-2">
                  {project.linkText}
                  <LinkArrow />
                </span>
              </div>
            </>
          );
          const rowClass =
            "group block border-t border-hairline py-8 transition-transform duration-300 hover:translate-x-2 md:grid md:grid-cols-[1fr_1.2fr] md:gap-x-12";
          return (
            <li key={project.title}>
              {project.external ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}>
                  {inner}
                </a>
              ) : (
                <Link to={project.href} className={rowClass}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  </div>
);
