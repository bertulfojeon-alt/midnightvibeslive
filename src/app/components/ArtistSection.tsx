import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Award, Music, TrendingUp, Users, Instagram, Facebook, Youtube, ExternalLink } from "lucide-react";

const achievements = [
  { icon: Award, label: "3x Grammy Winner", value: "2023-2025" },
  { icon: TrendingUp, label: "500M+ Streams", value: "Spotify" },
  { icon: Users, label: "World Tour", value: "50+ Cities" },
  { icon: Music, label: "Platinum Albums", value: "5 Releases" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "from-pink-500 to-orange-500" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "from-blue-600 to-blue-500" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com", color: "from-red-600 to-red-500" },
  { icon: ExternalLink, label: "Official Site", href: "#", color: "from-purple-600 to-purple-500" },
];

// TikTok SVG icon (lucide doesn't have it)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/>
    </svg>
  );
}

export function ArtistSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-[#0A0A0F] to-[#15111f] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
            fill="url(#wave-gradient)"
            animate={{ d: ["M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z", "M0,500 Q250,700 500,500 T1000,500 L1000,1000 L0,1000 Z", "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1652094669838-1b094db8351c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Artist Performance"
                className="rounded-2xl shadow-2xl border border-purple-500/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent rounded-2xl" />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Meet the Artist
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4 text-gray-300 text-lg leading-relaxed"
              >
                <p>
                  A global phenomenon redefining modern music, blending genres and breaking boundaries with every
                  performance. Known for electrifying stage presence and chart-topping hits that resonate with millions.
                </p>
                <p>
                  From sold-out stadium tours to intimate festival moments, this is an artist who transforms every show
                  into an unforgettable experience. Expect genre-bending sounds — electronic, R&B, and live band energy
                  all in one night.
                </p>
              </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <achievement.icon className="w-6 h-6 text-purple-400 mb-2" />
                  <div className="text-white font-semibold">{achievement.label}</div>
                  <div className="text-sm text-gray-400">{achievement.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Audio Player Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-purple-400" />
                Latest Hits
              </h3>
              <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                <p className="text-xs text-gray-500 mb-3">Now Playing</p>
                <p className="text-white font-medium mb-3">Midnight Vibes — Top Tracks</p>
                {/* Placeholder audio element — swap src for real MP3 link */}
                <audio
                  controls
                  className="w-full accent-purple-500"
                  style={{ colorScheme: "dark" }}
                >
                  <source src="YOUR_MP3_LINK_HERE" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-xs text-gray-600 mt-2 text-center">Replace src with your MP3 link when ready</p>
              </div>
            </motion.div>

            {/* Official Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="text-white font-semibold mb-3">Follow the Artist</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${link.color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white text-sm font-medium hover:opacity-90 transition-opacity border border-white/10"
                >
                  <TikTokIcon className="w-4 h-4" />
                  TikTok
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
