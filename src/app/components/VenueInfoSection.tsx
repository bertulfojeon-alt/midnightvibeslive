import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Accessibility, ShieldCheck, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

const venueInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Qudos Bank Arena\nSydney Olympic Park, NSW 2127",
  },
  {
    icon: Navigation,
    title: "Directions",
    content: "5 minute walk from Olympic Park Train Station\nBuses, taxis & rideshare drop-off available at main entrance",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    content: "Fully wheelchair accessible\nCompanion seating available\nAccessible restrooms throughout\nVisual & hearing assistance on request",
  },
];

const entryRules = [
  { question: "What can I bring?", answer: "Small bags only (max 30cm). No outside food or drinks. Sealed water bottles permitted." },
  { question: "What's prohibited?", answer: "Professional cameras, recording devices, weapons, illegal substances, glass containers." },
  { question: "Age restrictions?", answer: "All ages welcome. Under 16s must be accompanied by an adult. Licensed areas 18+ with valid ID required." },
  { question: "Security screening?", answer: "All attendees will pass through metal detectors. Allow extra time for entry." },
];

// Exact embed: Qudos Bank Arena, 19 Edwin Flack Ave, Sydney Olympic Park NSW 2127
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.676!2d151.06155!3d-33.84755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bb573e1af29f%3A0x5fd6a6f3b7e0f0c0!2sQudos+Bank+Arena%2C+19+Edwin+Flack+Ave%2C+Sydney+Olympic+Park+NSW+2127%2C+Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau";

export function VenueInfoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !leftRef.current) return;
    const updateHeight = () => {
      if (leftRef.current) setLeftHeight(leftRef.current.offsetHeight);
    };
    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(leftRef.current);
    return () => ro.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-[#15111f] to-[#0A0A0F]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
        >
          Venue Information
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {venueInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <info.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                  <p className="text-gray-400 whitespace-pre-line">{info.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Entry Rules Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold text-white">Entry Rules</h3>
              </div>
              <Accordion.Root type="single" collapsible className="space-y-2">
                {entryRules.map((rule, index) => (
                  <Accordion.Item key={index} value={`item-${index}`} className="border border-white/10 rounded-lg overflow-hidden">
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-all group">
                        <span>{rule.question}</span>
                        <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                      <div className="p-4 pt-0 text-gray-400">{rule.answer}</div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </motion.div>
          </motion.div>

          {/* Right: Map — same height as left column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            style={{ height: leftHeight ? `${leftHeight}px` : "600px" }}
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
      </div>
    </section>
  );
}
