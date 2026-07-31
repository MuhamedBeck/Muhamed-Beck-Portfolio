import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Navbar } from "../Navbar";
import { MobileMenu } from "../MobileMenu";
import Footer from "../Footer";
import { RevealOnScroll } from "../RevealOnScroll";
import {
  FaCogs,
  FaCode,
  FaExchangeAlt,
  FaCheck,
} from "react-icons/fa";
import { usePageMeta } from "../../seo/usePageMeta";
import { getRouteMeta } from "../../seo/routes.meta";

export const HireMe = () => {
  usePageMeta(getRouteMeta("/hire"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service_type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const services = [
    {
      icon: <FaCogs className="w-7 h-7" />,
      title: "AI & Workflow Automation",
      description:
        "Custom workflows with n8n, Zapier, OpenAI, Claude AI & OpenClaw. Connecting tools, eliminating manual work, and speeding up your processes.",
      tags: ["n8n", "Zapier", "Claude AI", "OpenClaw", "OpenAI"],
    },
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "Full-Stack Web Development",
      description:
        "Web applications with React, Angular, Spring Boot & Docker. From landing pages to microservice architectures.",
      tags: ["React", "Angular", "Spring Boot", "Docker", "REST API"],
    },
    {
      icon: <FaExchangeAlt className="w-7 h-7" />,
      title: "HubSpot & CRM Integration",
      description:
        "HubSpot, RecruitCRM & ATS integrations via REST APIs, webhooks & OAuth2. Connecting your lead and candidate pipelines.",
      tags: ["HubSpot", "RecruitCRM", "REST API", "OAuth2", "Webhooks"],
    },
  ];

  const stats = [
    { value: "80%", label: "Faster processes" },
    { value: "35%", label: "More organic traffic" },
    { value: "90%", label: "Automation rate" },
    { value: "24h", label: "Response time" },
  ];

  const steps = [
    {
      number: "01",
      title: "Send your request",
      desc: "Fill out the form below with your project details.",
    },
    {
      number: "02",
      title: "Get a response",
      desc: "I'll reply within 24 hours with questions or a proposal.",
    },
    {
      number: "03",
      title: "Align & plan",
      desc: "We discuss scope, timeline & approach together.",
    },
    {
      number: "04",
      title: "Build & deliver",
      desc: "I build your solution with regular updates and transparency.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const combinedMessage = [
      `Service: ${formData.service_type}`,
      formData.company ? `Company: ${formData.company}` : null,
      `\nProject description:\n${formData.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: combinedMessage,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );
      setSent(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service_type: "",
        message: "",
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-300";

  return (
    <div className="min-h-screen text-gray-100" style={{ background: '#0a0a0a' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
          }}
        />

        <RevealOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 border border-green-500/40 bg-green-500/10 text-green-400 text-sm font-mono px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for Freelance Projects · Frankfurt & Remote
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
              Let's Work Together
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              I help businesses automate workflows and build web applications.
              Based in Frankfurt — available for freelance projects, remote or on-site.
              I respond within{" "}
              <span className="text-cyan-400 font-semibold">24 hours</span>.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#request-form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 transition-all duration-300 cursor-pointer">
              Get in Touch
            </a>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="py-16 px-4">
        <RevealOnScroll>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-gray-900/50 p-6 hover:bg-gray-900/70 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)]">
                  <div className="text-blue-400 mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={step.number} className="text-center">
                  {/* connector line on desktop */}
                  <div className="relative flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-xl border border-blue-500/40 bg-blue-500/10 flex items-center justify-center">
                      <span className="text-blue-400 font-mono font-bold text-sm">
                        {step.number}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-[calc(50%+24px)] w-[calc(100%+24px)] h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── REQUEST FORM ── */}
      <section id="request-form" className="py-20 px-4">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Request a Service
              </h2>
              <p className="text-gray-400">
                Tell me about your project — I'll get back to you within 24
                hours.
              </p>
            </div>

            {sent ? (
              <div className="text-center py-16 rounded-2xl border border-green-500/30 bg-green-500/5">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Request Sent!
                </h3>
                <p className="text-gray-400 mb-3">
                  I'll get back to you within 24 hours.
                </p>
                <p className="text-gray-500 text-sm">
                  No confirmation?{" "}
                  <a
                    href="mailto:m.nur.beck@hotmail.de"
                    className="text-blue-400 hover:underline">
                    m.nur.beck@hotmail.de
                  </a>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-white/10 bg-gray-900/50 p-8">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-sm text-gray-400 mb-2"
                      htmlFor="hire-name">
                      Name *
                    </label>
                    <input
                      id="hire-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Max Mustermann"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm text-gray-400 mb-2"
                      htmlFor="hire-email">
                      Email *
                    </label>
                    <input
                      id="hire-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="max@company.de"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label
                    className="block text-sm text-gray-400 mb-2"
                    htmlFor="hire-company">
                    Company / Organization{" "}
                    <span className="text-gray-600">(optional)</span>
                  </label>
                  <input
                    id="hire-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="ACME GmbH"
                    className={inputClass}
                  />
                </div>

                {/* Service select */}
                <div>
                  <label
                    className="block text-sm text-gray-400 mb-2"
                    htmlFor="hire-service">
                    Service needed *
                  </label>
                  <select
                    id="hire-service"
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={(e) =>
                      setFormData({ ...formData, service_type: e.target.value })
                    }
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-colors duration-300 cursor-pointer appearance-none">
                    <option value="" disabled className="bg-gray-900 text-gray-400">
                      Select a service...
                    </option>
                    <option value="AI Workflow Automation (n8n/Zapier)" className="bg-gray-900 text-white">
                      AI Workflow Automation (n8n / Zapier)
                    </option>
                    <option value="Claude AI / OpenClaw Integration" className="bg-gray-900 text-white">
                      Claude AI / OpenClaw Integration
                    </option>
                    <option value="HubSpot & CRM Integration" className="bg-gray-900 text-white">
                      HubSpot & CRM Integration
                    </option>
                    <option value="Full-Stack Web Development" className="bg-gray-900 text-white">
                      Full-Stack Web Development
                    </option>
                    <option value="SEO Optimization" className="bg-gray-900 text-white">SEO Optimization</option>
                    <option value="Custom IT Solution" className="bg-gray-900 text-white">
                      Custom IT Solution
                    </option>
                    <option value="Other / Not sure yet" className="bg-gray-900 text-white">
                      Other / Not sure yet
                    </option>
                  </select>
                </div>

                {/* Project description */}
                <div>
                  <label
                    className="block text-sm text-gray-400 mb-2"
                    htmlFor="hire-message">
                    Tell me about your project *
                  </label>
                  <textarea
                    id="hire-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe what you need, your current setup, and your goals..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please email me directly:{" "}
                    <a
                      href="mailto:m.nur.beck@hotmail.de"
                      className="underline hover:text-red-300">
                      m.nur.beck@hotmail.de
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 disabled:opacity-60 disabled:pointer-events-none cursor-pointer">
                  {loading ? "Sending..." : "Send Request"}
                </button>

                <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                  Response within 24 hours · Frankfurt, Germany
                </p>
              </form>
            )}

            {/* Direct contact fallback */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Prefer direct contact?{" "}
                <a
                  href="mailto:m.nur.beck@hotmail.de?subject=Service Request via Portfolio"
                  className="text-blue-400 hover:text-cyan-400 transition-colors">
                  m.nur.beck@hotmail.de
                </a>{" "}
                ·{" "}
                <a
                  href="tel:+4917666008485"
                  className="text-blue-400 hover:text-cyan-400 transition-colors">
                  +49 176 66 00 8485
                </a>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <Footer />
    </div>
  );
};
