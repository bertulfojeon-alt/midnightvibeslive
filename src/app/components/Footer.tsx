import { motion } from "motion/react";
import { Music, Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { TermsModal } from "./TermsModal";
import { PrivacyModal } from "./PrivacyModal";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Tickets", href: "#tickets" },
  { name: "FAQs", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

const social = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer id="footer" className="py-16 bg-gradient-to-b from-[#0A0A0F] to-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                <Music className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Midnight Vibes Live
                </h3>
                <p className="text-sm text-gray-500">2025 Tour</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 rounded-lg hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 transition-all group"
                >
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Legal */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <button
                  onClick={() => setShowTerms(true)}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
                <span>•</span>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <a
                  href="https://ticketek.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  Tickets powered by Ticketek
                </a>
              </div>
              <p className="text-sm text-gray-600">© 2025 Midnight Vibes Live. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
}
