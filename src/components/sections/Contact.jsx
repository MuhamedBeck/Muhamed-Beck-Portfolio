import { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
        setTimeout(() => setSent(false), 3500);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen items-center justify-center py-20">
      <RevealOnScroll>
        {/* Wrapper mit max-width */}
        <div className="px-4 w-full max-w-screen-lg mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>

          {sent && (
            <div className="absolute left-1/2 -translate-x-1/2 top-16 flex flex-col items-center z-10 animate-fade-in-up">
              <FaEnvelopeOpenText className="text-6xl text-blue-400 animate-bounce mb-2" />
              <span className="text-lg text-blue-300 font-semibold bg-white/10 px-6 py-3 rounded-xl shadow-lg animate-fade-in-up">
                Message Sent!
              </span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`
              w-full
              mx-auto
              space-y-6
              ${sent ? "opacity-60 pointer-events-none" : ""}
              /* Breite für verschiedene Breakpoints */
              max-w-full
              sm:max-w-xl
              md:max-w-2xl
              lg:max-w-3xl
            `}>
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-6 md:py-4 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 text-base md:text-lg"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="example@gmail.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-6 md:py-4 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 text-base md:text-lg"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={5}
                placeholder="Your Message to me"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:px-6 md:py-4 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 resize-none text-base md:text-lg"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || sent}
              className={`
                w-full flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                py-3 px-4 md:py-4 md:px-6 rounded-lg font-medium
                transition overflow-hidden shadow-lg hover:-translate-y-0.5
                cursor-pointer hover:shadow-[0_0_15px_rgba(95,130,246,0.4)]
                text-base md:text-lg
                ${loading ? "opacity-60 pointer-events-none" : ""}
              `}>
              <FaEnvelopeOpenText
                className={`
                  text-xl md:text-2xl transition-transform duration-300
                  ${loading ? "animate-spin" : sent ? "animate-bounce" : ""}
                `}
              />
              {loading ? "Sending..." : sent ? "Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
