import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector("section");

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when hero is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroSection) observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 group"
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(168,85,247,0.9)] transition-shadow"
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
