import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Bell, AlertCircle, Info, Star } from "lucide-react";

const announcements = [
  {
    icon: Star,
    type: "highlight",
    title: "VIP Packages Almost Sold Out",
    message: "Only 15 VIP packages remaining. Upgrade now before they're gone!",
    time: "2 hours ago",
  },
  {
    icon: Info,
    type: "info",
    title: "Set Times Confirmed",
    message: "Supporting acts: 8:30 PM | Main act: 10:00 PM. Gates open at 6:00 PM.",
    time: "1 day ago",
  },
  {
    icon: Bell,
    type: "update",
    title: "Artist Message",
    message: '"Can\'t wait to see you all in Sydney! This is going to be epic!" - The Artist',
    time: "2 days ago",
  },
  {
    icon: Info,
    type: "info",
    title: "Melbourne Show Added",
    message: "Due to overwhelming demand, a second show has been added — Melbourne, Rod Laver Arena, 6th December 2025. Tickets on sale now!",
    time: "4 days ago",
  },
  {
    icon: AlertCircle,
    type: "warning",
    title: "Traffic Advisory",
    message: "Major event day. Please allow extra travel time and consider public transport.",
    time: "5 days ago",
  },
];

export function AnnouncementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0A0A0F]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Updates</h2>
          <p className="text-gray-400 text-lg">Stay informed with the latest announcements</p>
        </motion.div>

        <div className="space-y-6">
          {announcements.map((announcement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline connector */}
              {index < announcements.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
              )}

              <div className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 p-3 rounded-lg ${
                    announcement.type === "highlight"
                      ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                      : announcement.type === "warning"
                      ? "bg-gradient-to-br from-orange-500/20 to-red-500/20"
                      : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                  }`}
                >
                  <announcement.icon
                    className={`w-6 h-6 ${
                      announcement.type === "highlight"
                        ? "text-purple-400"
                        : announcement.type === "warning"
                        ? "text-orange-400"
                        : "text-blue-400"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{announcement.title}</h3>
                    <span className="text-xs text-gray-500">{announcement.time}</span>
                  </div>
                  <p className="text-gray-400">{announcement.message}</p>
                </div>

                {/* New item highlight glow */}
                {index === 0 && (
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-1 -top-1 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
