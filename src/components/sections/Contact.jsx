import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";
import { CONTACT } from "../../content/site";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // The failure path has to be visible. This previously swallowed the rejection
  // and reset the button, so a failed send looked exactly like an untouched
  // form and the enquiry was lost without either side knowing.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      );
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Deliberately no focus:outline-none. These fields previously removed the
  // focus ring and replaced it with a border tint only, which leaves keyboard
  // users without a reliable position indicator. The global :focus-visible rule
  // in index.css now supplies the ring.
  const inputClass =
    "w-full bg-white/5 border border-hairline rounded-lg px-4 py-3 md:px-6 md:py-4 text-white transition focus:border-blue-500 focus:bg-blue-500/5 text-base md:text-lg";

  return (
    <section
      id="contact"
      className="items-center justify-center py-12 pb-8">
      <RevealOnScroll legacy>
        {/* Wrapper mit max-width */}
        <div className="px-4 w-full max-w-screen-lg mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>

          {sent ? (
            /* Replaces the form rather than floating over it. The old toast
               vanished after 3.5s and named neither a recipient, a response
               time, nor a fallback if nothing arrived. */
            <div
              className="mx-auto max-w-full rounded-2xl border border-green-500/30 bg-green-500/5 px-6 py-14 text-center sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
              role="status">
              <h3 className="mb-2 text-xl font-bold text-white">Message sent</h3>
              <p className="mb-3 text-gray-400">
                I'll get back to you within 24 hours.
              </p>
              <p className="text-sm text-gray-400">
                No reply?{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-accent underline hover:text-blue-300">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-full space-y-6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm text-gray-400">
                  Name *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm text-gray-400">
                  Email *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm text-gray-400">
                  What do you want to automate? *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-400" role="alert">
                  The message could not be sent. Please email me directly:{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="underline hover:text-red-300">
                    {CONTACT.email}
                  </a>
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full flex items-center justify-center gap-2
                  bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                  py-3 px-4 md:py-4 md:px-6 rounded-lg font-medium
                  transition-all duration-300 overflow-hidden shadow-lg
                  hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                  hover:from-blue-400 hover:to-cyan-400
                  active:scale-[0.98] active:translate-y-0
                  cursor-pointer
                  text-base md:text-lg
                  relative group
                  ${loading ? "opacity-60 pointer-events-none" : ""}
                `}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </button>

              <p className="text-center text-xs text-gray-400">
                Response within 24 hours · Frankfurt, Germany
              </p>
            </form>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
};
