"use client";

import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EMAILJS_SERVICE_ID = "service_PritzyVentures";
const EMAILJS_TEMPLATE_ID = "template_hpts7za";
const EMAILJS_PUBLIC_KEY = "-HV9VyfeGj5Kk79ew";

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          company: form.company || "Not provided",
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message. Please try again, or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-white/30 focus:bg-white/6 transition-all duration-200";

  const labelClass = "block text-white/40 text-xs font-semibold tracking-wide mb-2";

  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Contact Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4"
          >
            Let&apos;s connect.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-base max-w-lg mx-auto"
          >
            Whether you&apos;re interested in a partnership, investment, or just want to learn
            more about what we&apos;re building — we&apos;d love to hear from you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-white/3 overflow-hidden"
        >
          {submitted ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/8 border border-white/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-bold mb-3">Message received.</h3>
              <p className="text-white/40 text-sm max-w-sm mx-auto">
                Thank you for reaching out. We review all inquiries and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company name (optional)"
                    value={form.company}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Subject *</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass + " appearance-none cursor-pointer"}
                  >
                    <option value="" disabled className="bg-black text-white/40">
                      Select a topic
                    </option>
                    <option value="partnership" className="bg-black text-white">Partnership</option>
                    <option value="investment" className="bg-black text-white">Investment</option>
                    <option value="enterprise" className="bg-black text-white">Enterprise Solutions</option>
                    <option value="careers" className="bg-black text-white">Careers</option>
                    <option value="general" className="bg-black text-white">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your inquiry, project, or idea..."
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass + " resize-none"}
                />
              </div>

              {/* Info row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Response Time", value: "Within 48 hours" },
                  { label: "Location", value: "United States" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl border border-white/8 bg-white/3">
                    <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-white/60 text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2.5 bg-white text-black text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02]"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
