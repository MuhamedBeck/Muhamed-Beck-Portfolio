import { GenIcon } from "react-icons/lib";
// Marks the homepage marquee already draws: they sit in the shared react-icons
// chunk anyway, so importing them here costs nothing.
import {
  SiAngular, SiDocker, SiHubspot, SiKubernetes, SiNodedotjs, SiPostgresql,
  SiPython, SiReact, SiSpring, SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { MARKEN_DATEN } from "./marken.daten";
import { TwilioIcon } from "./TwilioIcon";
import { WERKZEUGMARKEN } from "./werkzeugmarken";

/* Every other mark is drawn from a copy of its data, so it loads with the CV
   instead of with every page (see marken.daten.js). A new mark goes the same
   way: imported from react-icons it would grow the chunk every page loads. */
const zeichen = (name) => GenIcon(MARKEN_DATEN[name]);

/* Every tool the CV and /ueber-mich name, with its mark. Only those two pages
   import this map, through Werkzeuge.jsx.

   `farbe` is the brand colour where it reads on the dark ground, measured
   against #0a0a0a, and as in the tech marquee where it has the brand. Four
   brands fall under 3:1 there (Make 2,38, CSS 2,36, Elastic 2,39, Helm 1,41)
   and are lightened just past 3,5:1, keeping their hue; .tech-mark darkens
   every colour again on the light ground, where all of them clear 3,5:1. No
   `farbe` means a black brand, drawn in the text colour. No `Icon` means there
   is no mark to draw, and the name stands alone. */
export const MARKEN = {
  ...WERKZEUGMARKEN,
  openai: { name: "OpenAI", Icon: RiOpenaiFill, farbe: "#10A37F" },
  anthropic: { name: "Anthropic", Icon: zeichen("SiAnthropic") },
  langchain: { name: "LangChain", Icon: zeichen("SiLangchain") },
  mcp: { name: "MCP", Icon: zeichen("SiModelcontextprotocol") },
  react: { name: "React", Icon: SiReact, farbe: "#61DAFB" },
  typescript: { name: "TypeScript", Icon: SiTypescript, farbe: "#3178C6" },
  angular: { name: "Angular", Icon: SiAngular, farbe: "#DD0031" },
  html: { name: "HTML", Icon: zeichen("SiHtml5"), farbe: "#E34F26" },
  css: { name: "CSS", Icon: zeichen("SiCss"), farbe: "#7E54A9" },
  java: { name: "Java", Icon: FaJava, farbe: "#ED8B00" },
  springboot: { name: "Spring Boot", Icon: SiSpring, farbe: "#6DB33F" },
  nodejs: { name: "Node.js", Icon: SiNodedotjs, farbe: "#339933" },
  python: { name: "Python", Icon: SiPython, farbe: "#3776AB" },
  supabase: { name: "Supabase", Icon: zeichen("SiSupabase"), farbe: "#3FCF8E" },
  postgresql: { name: "PostgreSQL", Icon: SiPostgresql, farbe: "#4169E1" },
  elasticsearch: { name: "Elasticsearch", Icon: zeichen("SiElasticsearch"), farbe: "#297088" },
  kibana: { name: "Kibana", Icon: zeichen("SiKibana"), farbe: "#297088" },
  docker: { name: "Docker", Icon: SiDocker, farbe: "#2496ED" },
  kubernetes: { name: "Kubernetes", Icon: SiKubernetes, farbe: "#326CE5" },
  helm: { name: "Helm", Icon: zeichen("SiHelm"), farbe: "#5C61AF" },
  gitlab: { name: "GitLab", Icon: zeichen("SiGitlab"), farbe: "#FC6D26" },
  vercel: { name: "Vercel", Icon: zeichen("SiVercel") },
  azure: { name: "Azure", Icon: zeichen("VscAzure"), farbe: "#0078D4" },
  twilio: { name: "Twilio", Icon: TwilioIcon, farbe: "#F22F46" },
  deepgram: { name: "Deepgram", Icon: zeichen("SiDeepgram"), farbe: "#13EF93" },
  elevenlabs: { name: "ElevenLabs", Icon: zeichen("SiElevenlabs") },
  hubspot: { name: "HubSpot", Icon: SiHubspot, farbe: "#FF7A59" },
  recruitcrm: { name: "RecruitCRM" },
  personio: { name: "Personio", Icon: zeichen("SiPersonio") },
  stripe: { name: "Stripe", Icon: zeichen("SiStripe"), farbe: "#635BFF" },
  slack: { name: "Slack", Icon: zeichen("FaSlack") },
  calendly: { name: "Calendly", Icon: zeichen("SiCalendly"), farbe: "#006BFF" },
  docuseal: { name: "DocuSeal" },
  googleads: { name: "Google Ads", Icon: zeichen("SiGoogleads"), farbe: "#4285F4" },
  googleanalytics: { name: "Google Analytics", Icon: zeichen("SiGoogleanalytics"), farbe: "#E37400" },
  googletagmanager: { name: "Google Tag Manager", Icon: zeichen("SiGoogletagmanager"), farbe: "#246FDB" },
  knime: { name: "KNIME", Icon: zeichen("SiKnime"), farbe: "#FFD500" },
};
