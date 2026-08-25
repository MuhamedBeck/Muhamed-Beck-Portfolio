/**
 * EmailJS configuration, read once from the build-time environment.
 *
 * Vite inlines VITE_-prefixed variables at build time, so a missing .env does
 * not fail loudly: `import.meta.env.VITE_SERVICE_ID` simply becomes undefined
 * and emailjs.sendForm(undefined, undefined, ...) rejects at submit. That is
 * exactly what shipped: the site went live without a .env, every enquiry
 * through the English forms rejected, and the rejection was swallowed so the
 * sender saw the button spring back and nothing else.
 *
 * The error handling is fixed, but a form that cannot possibly send should not
 * be on the page at all. IS_CONFIGURED lets each form fall back to the direct
 * contact details instead, which is the same thing the German /kontakt page
 * does on purpose.
 */
export const EMAILJS = {
  serviceId: import.meta.env.VITE_SERVICE_ID,
  templateId: import.meta.env.VITE_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
};

export const EMAILJS_IS_CONFIGURED = Boolean(
  EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey
);
