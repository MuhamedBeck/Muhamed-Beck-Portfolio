import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Section } from "../Section";
import { CONTACT } from "../../content/site";
import { EMAILJS, EMAILJS_IS_CONFIGURED } from "../../content/emailjs";

/**
 * Contact block on the English homepage.
 *
 * The error handling and the real <label> elements were fixed earlier; this
 * change is the presentation. Gone: the gradient-clipped "Get In Touch"
 * heading, the blue-to-cyan gradient submit button with its glow-on-hover, and
 * the centred column.
 */
export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
        EMAILJS.serviceId,
        EMAILJS.templateId,
        e.target,
        EMAILJS.publicKey
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
  // in index.css supplies the ring.
  const inputClass =
    "w-full rounded-lg border border-hairline bg-white/5 px-4 py-3 text-white transition focus:border-blue-500 focus:bg-blue-500/5";
  const labelClass = "mb-2 block text-sm text-paper-mute";

  return (
    <div id="contact">
      <Section>
        <div className="max-w-2xl border-t border-hairline pt-12">
          <h2 className="headline-sub">Which process costs you the most time?</h2>

          {!EMAILJS_IS_CONFIGURED ? (
            /* No EmailJS credentials in this build, so the form could only
               fail. Show the direct route instead, the way /kontakt does. */
            <div className="mt-8">
              <p className="intro">
                Write a couple of sentences about it. You get a real assessment of
                whether and how it can be automated, not a standard reply.
              </p>
              <a href={`mailto:${CONTACT.email}`} className="btn-ghost btn-accent mt-8">
                Write an email
              </a>
              <p className="mt-5 text-sm text-paper-mute">
                {CONTACT.email} · {CONTACT.phoneDisplay} · Reply within 24 hours
              </p>
            </div>
          ) : sent ? (
            <div className="mt-8" role="status">
              <p className="intro">Message sent.</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                I&apos;ll get back to you within 24 hours. No reply?{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-accent hover:underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          ) : (
            <>
              <p className="intro mt-5">
                Write a couple of sentences about it. You get a real assessment of
                whether and how it can be automated, not a standard reply.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="contact-name">
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
                  <div>
                    <label className={labelClass} htmlFor="contact-email">
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
                </div>

                <div>
                  <label className={labelClass} htmlFor="contact-message">
                    What would you like to automate? *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400" role="alert">
                    The message could not be sent. Please email me directly:{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="underline hover:text-red-300">
                      {CONTACT.email}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-ghost btn-accent">
                  {loading ? "Sending" : "Send message"}
                </button>

                <p className="text-sm text-paper-mute">
                  Reply within 24 hours · Frankfurt and remote
                </p>
              </form>
            </>
          )}
        </div>
      </Section>
    </div>
  );
};
