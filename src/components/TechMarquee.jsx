import {
  SiAngular, SiReact, SiTypescript, SiJavascript,
  SiSpring, SiDocker, SiKubernetes, SiPython,
  SiNodedotjs, SiZapier, SiHubspot,
  SiPostgresql, SiGit,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
// Simple Icons dropped the OpenAI mark in react-icons 5.7, so it comes from
// Remix Icon instead; RiOpenaiFill matches the solid style of the Si icons.
import { RiOpenaiFill } from "react-icons/ri";
import { N8nIcon } from "./icons/N8nIcon";

const techs = [
  { Icon: SiReact,       name: "React",       color: "#61DAFB" },
  { Icon: SiAngular,     name: "Angular",     color: "#DD0031" },
  { Icon: FaJava,        name: "Java",        color: "#ED8B00" },
  { Icon: SiSpring,      name: "Spring Boot", color: "#6DB33F" },
  { Icon: SiTypescript,  name: "TypeScript",  color: "#3178C6" },
  { Icon: SiJavascript,  name: "JavaScript",  color: "#F7DF1E" },
  { Icon: N8nIcon,       name: "n8n",         color: "#EA4B71" },
  { Icon: SiZapier,      name: "Zapier",      color: "#FF4A00" },
  { Icon: RiOpenaiFill,  name: "OpenAI",      color: "#10a37f" },
  { Icon: SiHubspot,     name: "HubSpot",     color: "#FF7A59" },
  { Icon: SiPython,      name: "Python",      color: "#3776AB" },
  { Icon: SiNodedotjs,   name: "Node.js",     color: "#339933" },
  { Icon: SiDocker,      name: "Docker",      color: "#2496ED" },
  { Icon: SiKubernetes,  name: "Kubernetes",  color: "#326CE5" },
  { Icon: SiPostgresql,  name: "PostgreSQL",  color: "#4169E1" },
  { Icon: SiGit,         name: "Git",         color: "#F05032" },
];

// Duplicate for seamless infinite loop
const items = [...techs, ...techs];

export const TechMarquee = () => (
  <section
    aria-label="Tech stack"
    className="py-10 overflow-hidden bg-ink">
    <p className="text-center text-[10px] font-semibold tracking-[0.25em] text-paper-mute uppercase mb-8">
      Tech Stack &amp; Tools
    </p>

    {/* Fade mask on edges */}
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}>
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {items.map(({ Icon, name, color }, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 px-8 group cursor-default">
            <Icon
              className="w-7 h-7 transition-all duration-300 opacity-50 group-hover:opacity-100 group-hover:scale-110"
              style={{ color }}
            />
            <span className="text-[11px] text-paper-mute group-hover:text-gray-300 transition-colors duration-300 whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
