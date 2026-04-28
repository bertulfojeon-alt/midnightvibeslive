import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Car, Train, Music, Users, Mic2 } from "lucide-react";

const details = [
  {
    icon: Calendar,
    title: "Date & Time",
    content: "Saturday, 29th November 2025\nDoors: 6:00 PM | Show: 8:00 PM",
  },
  {
    icon: MapPin,
    title: "Venue",
    content: "Qudos Bank Arena\nSydney Olympic Park, NSW 2127",
  },
  {
    icon: Train,
    title: "Transport",
    content: "Olympic Park Station (5min walk)\nRegular trains from Central & Parramatta\nBuses, taxis & rideshare available",
  },
  {
    icon: Car,
    title: "Parking",
    content: "P1-P5 Parking available\n$15 pre-book online (recommended) | $25 at gate\nPre-book via Sydney Olympic Park",
  },
  {
    icon: Music,
    title: "Supporting Acts",
    content: "The Echoes — 6:30 PM\nNeon Dreams — 7:30 PM\nSoundwave Collective — 8:30 PM",
  },
  {
    icon: Users,
    title: "Capacity",
    content: "21,000 Capacity\nGeneral Admission & Reserved Seating\nAll ages event · 18+ licensed areas",
  },
];

// Exact embed: Qudos Bank Arena, 19 Edwin Flack Ave, Sydney Olympic Park NSW 2127
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5!2d151.0619254!3d-33.8442832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a4b08ed5bcb3%3A0x1b040938318011e5!2sQudos+Bank+Arena!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau";

export function EventDetailsSection() {
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
    <section id="details" ref={sectionRef} className="py-32 bg-[#0A0A0F]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Event Details
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                    <detail.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{detail.title}</h3>
                    <p className="text-sm text-gray-400 whitespace-pre-line">{detail.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Map — Qudos Bank Arena exact location */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            style={{ height: "500px" }}
          >
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Event Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
              <Mic2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">About the Event</h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Get ready for a night of genre-bending music — blending electronic, R&B, and live band energy into one
            unforgettable experience. Expect fan-favourite hits, teases of new releases, and a jaw-dropping production
            featuring state-of-the-art lighting and sound. This isn't just a concert. It's an event that defines a
            generation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />
      </div>
    </section>
  );
}
