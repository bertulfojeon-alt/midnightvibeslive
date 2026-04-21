import { motion } from "motion/react";
import { Check, Star, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tickets = [
  {
    name: "General Admission",
    price: "$89.00",
    priceNote: "from",
    features: [
      "Standing access",
      "Full experience",
      "Merchandise discount",
      "Access to all bars",
    ],
    featured: false,
    badge: null,
    ageNote: "All Ages Welcome",
  },
  {
    name: "VIP Experience",
    price: "$199.00",
    priceNote: "from",
    features: [
      "Early entry",
      "Exclusive merch pack",
      "VIP viewing zone",
      "Complimentary drinks",
      "Priority re-entry",
    ],
    featured: true,
    badge: "Most Popular",
    icon: Star,
    ageNote: "All Ages Welcome",
  },
  {
    name: "Meet & Greet",
    price: "$299.00",
    priceNote: "",
    features: [
      "Photo with artist",
      "Exclusive backstage access",
      "Signed merchandise",
      "VIP lounge access",
      "Backstage tour",
    ],
    featured: false,
    badge: "Very Limited",
    badgeColor: "red",
    icon: Zap,
    ageNote: "18+ Licensed Areas",
  },
];

export function TicketSection() {
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
    <section id="tickets" ref={sectionRef} className="py-32 bg-gradient-to-b from-[#0A0A0F] via-[#15111f] to-[#0A0A0F] scroll-smooth">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Experience</h2>
          <p className="text-gray-400 text-lg">Secure your spot for the concert of the year</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tickets.map((ticket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative group flex"
              style={{ transform: ticket.featured ? "scale(1.05)" : "scale(1)" }}
            >
              {ticket.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold z-10 ${
                  ticket.badgeColor === "red"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}>
                  {ticket.badge}
                </div>
              )}

              <div className={`relative flex flex-col w-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 ${
                ticket.featured
                  ? "border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]"
                  : "border-white/10 group-hover:border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
              }`}>
                {ticket.icon && (
                  <div className="mb-4"><ticket.icon className="w-8 h-8 text-purple-400" /></div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">{ticket.name}</h3>

                <div className="mb-1">
                  {ticket.priceNote && <span className="text-sm text-gray-400 mr-1">{ticket.priceNote}</span>}
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {ticket.price}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-6">Prices include GST · Booking fees may apply</p>

                <ul className="space-y-3 mb-4 flex-1">
                  {ticket.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-purple-300 mb-2 text-center">{ticket.ageNote}</p>
                <p className="text-xs text-gray-500 mb-4 text-center">Non-refundable · Transferable up to 24hrs before event</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl font-semibold transition-all mt-auto ${
                    ticket.featured
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/50"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  Buy Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          Tickets powered by <span className="text-purple-400 font-medium">Ticketek</span> · Refund policy as per ticket provider's terms
        </motion.p>
      </div>
    </section>
  );
}
