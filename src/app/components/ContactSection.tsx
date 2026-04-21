import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";

// 🔧 REPLACE THIS with your actual Make.com webhook URL
const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/4jma7qvl8g4og9rcav6ey74xul7i8qr8";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", newsletter: false });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          newsletter: formData.newsletter,
          submittedAt: new Date().toISOString(),
          source: "Midnight Vibes Live — Contact Form",
        }),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", newsletter: false });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => { setSubmitted(false); setError(false); }, 4000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-[#0A0A0F]">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6">
            <Mail className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 text-lg">Have questions? We're here to help</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="peer w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute left-4 -top-2.5 bg-[#0A0A0F] px-2 text-sm text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400 peer-focus:bg-[#0A0A0F]"
            >
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="peer w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="Your Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 bg-[#0A0A0F] px-2 text-sm text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400 peer-focus:bg-[#0A0A0F]"
            >
              Your Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="peer w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 text-white placeholder-transparent focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Your Message"
            />
            <label
              htmlFor="message"
              className="absolute left-4 -top-2.5 bg-[#0A0A0F] px-2 text-sm text-purple-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-400 peer-focus:bg-[#0A0A0F]"
            >
              Your Message
            </label>
          </div>

          {/* Newsletter */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mt-1 w-5 h-5 bg-white/5 border border-white/10 rounded text-purple-600 focus:ring-2 focus:ring-purple-500/20"
            />
            <label htmlFor="newsletter" className="text-gray-400 text-sm">
              Subscribe to our newsletter for exclusive updates, presale codes, and event announcements
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading || submitted}
            whileHover={!loading && !submitted ? { scale: 1.02 } : {}}
            whileTap={!loading && !submitted ? { scale: 0.98 } : {}}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70"
          >
            {submitted ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Message Sent!
              </motion.div>
            ) : error ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Failed — try again
              </motion.div>
            ) : loading ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending...
              </div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
            {submitted && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-green-500 rounded-xl"
              />
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
