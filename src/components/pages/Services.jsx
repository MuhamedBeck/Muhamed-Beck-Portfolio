import { RevealOnScroll } from "../RevealOnScroll";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaCogs,
  FaCode,
  FaSearch,
  FaHeadset,
  FaRocket,
} from "react-icons/fa";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { useRouteMeta } from "../../seo/useRouteMeta";

export const Services = () => {
  useRouteMeta();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const services = [
    {
      icon: <FaCogs className="w-10 h-10" />,
      title: "Workflow Automation",
      subtitle: "n8n & Zapier Solutions",
      description:
        "I build custom workflows using n8n and Zapier that connect your tools, eliminate repetitive tasks, and free up your team's time.",
      features: [
        "Custom n8n workflow development",
        "Zapier integrations & automations",
        "API connections & webhooks",
        "CRM/ATS automation (HubSpot, Personio, Greenhouse)",
        "Email & notification automation",
        "Data sync between platforms",
        "AI-powered workflow optimization",
      ],
      highlight: "Cut cycle time by up to 80%",
    },
    {
      icon: <FaCode className="w-10 h-10" />,
      title: "Web Development",
      subtitle: "Full-Stack Solutions",
      description:
        "Whether you need a landing page, a dashboard, or a full web application, I build responsive, performant sites with modern frameworks, tailored to what you actually need.",
      features: [
        "React.js & Angular applications",
        "Spring Boot & Node.js backends",
        "TypeScript & JavaScript development",
        "REST API design & implementation",
        "WordPress development & customization",
        "Responsive & mobile-first design",
        "E-commerce & booking systems",
        "Docker & cloud deployment",
      ],
      highlight: "Modern tech stack, scalable solutions",
    },
    {
      icon: <FaSearch className="w-10 h-10" />,
      title: "SEO Optimization",
      subtitle: "Visibility & Growth",
      description:
        "I optimize your site for search engines, covering technical audits, structured data, page speed, and local SEO for the German market.",
      features: [
        "Technical SEO audits & fixes",
        "On-page optimization",
        "Meta tags & structured data (Schema.org)",
        "Page speed optimization",
        "Google Search Console setup",
        "Google Analytics integration",
        "AI-powered SEO automation",
        "Local SEO for German businesses",
      ],
      highlight: "Increased organic traffic by 35%",
    },
    {
      icon: <FaHeadset className="w-10 h-10" />,
      title: "IT Support",
      subtitle: "1st & 2nd Level Support",
      description:
        "Reliable support when you need it, from troubleshooting hardware and software issues to setting up new systems.",
      features: [
        "Hardware troubleshooting & setup",
        "Software installation & configuration",
        "Network & connectivity issues",
        "System administration",
        "User training & documentation",
        "Remote & on-site support",
        "Preventive maintenance",
      ],
      highlight: "Fast response, reliable solutions",
    },
    {
      icon: <FaRocket className="w-10 h-10" />,
      title: "Custom IT Solutions",
      subtitle: "Tailored to Your Needs",
      description:
        "AI integration, DevOps pipelines, custom software: if your project doesn't fit a standard category, let's figure out the right approach together.",
      features: [
        "AI & LLM integration (OpenAI, Claude, Azure)",
        "OpenClaw & Anthropic Claude integration",
        "Voice AI agents (Twilio/WebRTC, STT/TTS)",
        "DevOps & CI/CD pipelines",
        "Docker & Kubernetes deployment",
        "Cloud architecture (Azure, AWS)",
        "Security & authentication (OAuth2, JWT)",
        "Custom API development & webhooks",
      ],
      highlight: "Flexible scope, tailored to you",
    },
  ];

  return (
    <div className="min-h-[100dvh] text-gray-100" style={{ background: '#0a0a0a' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <section className="w-full py-20 pt-28 px-4" style={{ background: '#0a0a0a' }}>
        {/* Back to Home Link */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group">
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Back to Home</span>
          </Link>
        </div>

        <RevealOnScroll legacy>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Automation, web development, SEO, and IT support: here's
              what I can help you with.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <RevealOnScroll legacy key={index}>
                <div className="group relative rounded-2xl border border-white/10 bg-gray-900/50 p-8 md:p-10 hover:bg-gray-900/70 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  {/* Highlight Badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-500/30">
                      {service.highlight}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500">
                        {service.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="mb-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                          {service.title}
                        </h2>
                        <p className="text-blue-400 font-medium">
                          {service.subtitle}
                        </p>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA Section */}
          <RevealOnScroll legacy>
            <div className="mt-16 text-center">
              <div className="inline-block rounded-2xl border border-white/10 bg-white/5 p-10 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                  Have a project in mind or just want to explore what's
                  possible? Drop me a message.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 cursor-pointer">
                    Contact Me
                  </button>

                  <a
                    href="mailto:m.nur.beck@hotmail.de?subject=Anfrage%20via%20Portfolio%20Seite&body=Sehr%20geehrter%20Herr%20Beck%2C%0A%0AIch%20war%20auf%20ihrer%20Portfolio%20Seite%20und%20habe%20folgende%20Anfrage%3A%0A%0A"
                    className="inline-flex items-center justify-center gap-2 border border-blue-500 text-blue-400 py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10">
                    <span>m.nur.beck@hotmail.de</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Bottom Info */}
          <div className="mt-12 text-center text-paper-mute text-sm">
            <p>
              Based in Frankfurt, Germany • Available for remote work worldwide
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
    
    <Footer />
    </div>
  );
};
