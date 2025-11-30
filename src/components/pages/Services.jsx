import { RevealOnScroll } from "../RevealOnScroll";
import { Link } from "react-router-dom";
import {
  FaCogs,
  FaCode,
  FaSearch,
  FaHeadset,
  FaRocket,
  FaEnvelope,
} from "react-icons/fa";

export const Services = () => {
  const services = [
    {
      icon: <FaCogs className="w-10 h-10" />,
      title: "Workflow Automation",
      subtitle: "n8n & Zapier Solutions",
      description:
        "Transform your business processes with intelligent automation. I build custom workflows using n8n and Zapier that connect your favorite tools, eliminate repetitive tasks, and save you hours every week.",
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
        "From sleek landing pages to complex web applications, I deliver modern, responsive, and high-performance websites tailored to your needs. Built with cutting-edge technologies for speed and scalability.",
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
        "Get found online with data-driven SEO strategies. I optimize your website for search engines, improve your rankings, and drive organic traffic that converts into customers.",
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
        "Reliable IT support when you need it. From troubleshooting hardware and software issues to setting up new systems, I provide professional support that keeps your business running smoothly.",
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
        "Have a unique challenge? Let's talk! From AI integration and DevOps pipelines to custom software development, I bring creative solutions to complex technical problems.",
      features: [
        "AI & LLM integration (OpenAI, Azure)",
        "DevOps & CI/CD pipelines",
        "Docker & Kubernetes deployment",
        "Cloud architecture (Azure, AWS)",
        "Database design & optimization",
        "Security & authentication (OAuth2, JWT)",
        "Voice AI & chatbot development",
        "Custom API development",
      ],
      highlight: "Let's build something amazing together",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 py-20 px-4">
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

      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional IT services tailored to help your business grow.
              From automation and web development to SEO and support – I deliver
              solutions that make a real impact.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <RevealOnScroll key={index}>
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
          <RevealOnScroll>
            <div className="mt-16 text-center">
              <div className="inline-block rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-blue-950/50 p-10 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                  Let's discuss how I can help your business with custom IT
                  solutions. Whether you have a specific project in mind or just
                  want to explore possibilities – I'm here to help.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 group">
                    <FaEnvelope className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Contact Me</span>
                  </Link>

                  <a
                    href="mailto:m.nur.beck@hotmail.de"
                    className="inline-flex items-center justify-center gap-2 border border-blue-500 text-blue-400 py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10">
                    <span>m.nur.beck@hotmail.de</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Bottom Info */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>
              Based in Frankfurt, Germany • Available for remote work worldwide
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
