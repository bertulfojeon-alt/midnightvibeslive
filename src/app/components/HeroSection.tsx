import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-11-29T19:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden flex items-center">
      {/* Background Video/Image with Zoom Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.1] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        <img
          src="https://images.unsplash.com/photo-1635961726947-0f821cf9ba28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Concert Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0F]" />
        <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-gradient-to-l from-purple-600/20 via-blue-600/10 to-transparent" />
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-8 z-20 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-full backdrop-blur-sm"
      >
        <span className="text-white font-semibold">VIP Tickets Selling Fast 🔥</span>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur-md rounded-xl p-4 border border-purple-500/30"
      >
        <div className="flex gap-4">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-white">{item.value.toString().padStart(2, "0")}</div>
              <div className="text-xs text-purple-300">{item.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left Content - 60% */}
        <div className="lg:col-span-3 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Experience the Night That Defines a Generation
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-3"
          >
            <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-bold">
              Midnight Vibes Live – 2025
            </h2>
            <div className="space-y-2 text-gray-300 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>Qudos Bank Arena, Sydney NSW</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>Saturday, 29th November 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>Doors Open 6:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-blue-500 shadow-2xl"
            >
              Buy Tickets Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20"
            >
              View Ticket Options
            </motion.button>
          </motion.div>
        </div>

        {/* Right Content - 40% Artist Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="lg:col-span-2 hidden lg:block"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1652094669838-1b094db8351c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Artist"
              className="rounded-2xl shadow-2xl border border-purple-500/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
