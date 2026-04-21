import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#15111f] border border-purple-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[0_0_60px_rgba(168,85,247,0.3)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
              <section>
                <h3 className="text-white font-semibold mb-2">1. Information We Collect</h3>
                <p>We collect personal information you provide when purchasing tickets or subscribing to our newsletter, including your name, email address, and payment details. Payment information is processed securely via Ticketek and is not stored on our servers.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">2. How We Use Your Information</h3>
                <p>Your information is used to process ticket purchases, send event updates and reminders, deliver newsletters you have subscribed to, and improve our services. We will not sell or share your personal information with third parties for marketing purposes without your consent.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">3. Newsletter & Communications</h3>
                <p>If you subscribe to our newsletter, you will receive event announcements, presale codes, and artist updates. You may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">4. Cookies</h3>
                <p>Our website uses cookies to improve user experience and analyse site traffic. By using our site, you consent to our use of cookies. You may disable cookies through your browser settings, though this may affect site functionality.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">5. Data Security</h3>
                <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, or disclosure. However, no internet transmission is completely secure.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">6. Your Rights</h3>
                <p>You have the right to access, correct, or request deletion of your personal information. To exercise these rights, please contact us at privacy@midnightvibeslive.com.au.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">7. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our services following changes constitutes acceptance of the updated policy.</p>
              </section>
              <p className="text-gray-600 text-xs pt-4 border-t border-white/10">Last updated: January 2025 · Midnight Vibes Live 2025</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
