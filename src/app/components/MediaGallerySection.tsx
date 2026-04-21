import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Only landscape images split into two rows
const row1Images = [
  { url: "https://images.unsplash.com/photo-1635961726947-0f821cf9ba28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920", alt: "Concert Stage" },
  { url: "https://plus.unsplash.com/premium_photo-1681830630610-9f26c9729b75?q=80&w=1170&auto=format&fit=crop", alt: "Concert Crowd" },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop", alt: "Artist Performance" },
  { url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1170&auto=format&fit=crop", alt: "Live Show" },
  { url: "https://images.unsplash.com/photo-1468359601543-843bfaef291a?q=80&w=1174&auto=format&fit=crop", alt: "Stage Lights" },
  { url: "https://images.unsplash.com/photo-1515175192010-cf3250992719?q=80&w=1632&auto=format&fit=crop", alt: "Festival Vibes" },
  { url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1170&auto=format&fit=crop", alt: "Crowd Energy" },
];

const row2Images = [
  { url: "https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?q=80&w=1170&auto=format&fit=crop", alt: "Performer" },
  { url: "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?q=80&w=1074&auto=format&fit=crop", alt: "Concert Night" },
  { url: "https://images.unsplash.com/photo-1620577610365-86c411bad78d?q=80&w=1170&auto=format&fit=crop", alt: "Show Lights" },
  { url: "https://images.unsplash.com/photo-1510682657356-6ee07db8204b?q=80&w=1632&auto=format&fit=crop", alt: "Stage View" },
  { url: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1170&auto=format&fit=crop", alt: "Live Music" },
  { url: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1170&auto=format&fit=crop", alt: "Concert Atmosphere" },
  { url: "https://plus.unsplash.com/premium_photo-1664304095595-e428558e8161?q=80&w=1170&auto=format&fit=crop", alt: "Music Event" },
];

// Duplicate for seamless loop
const loopRow1 = [...row1Images, ...row1Images];
const loopRow2 = [...row2Images, ...row2Images];

const YOUTUBE_VIDEO_ID = "hZDJjSHHGok";

function InfiniteRow({ images, direction }: { images: typeof loopRow1; direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-4 w-max ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        style={{ willChange: "transform" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-72 h-48 rounded-xl overflow-hidden group"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-all duration-300 rounded-xl" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MediaGallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (playerRef.current) {
          const src = playerRef.current.src;
          if (entry.isIntersecting) {
            // Autoplay when visible
            playerRef.current.src = src.includes("autoplay=1") ? src : src.replace("autoplay=0", "autoplay=1");
          } else {
            // Pause when out of view
            playerRef.current.src = src.replace("autoplay=1", "autoplay=0");
          }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h2>
          <p className="text-gray-400 text-lg">Relive the magic through our lens</p>
          <p className="text-purple-400 mt-2">#MidnightVibesAU</p>
        </motion.div>
      </div>

      {/* Sliding rows */}
      <div className="space-y-4">
        <InfiniteRow images={loopRow1} direction="left" />
        <InfiniteRow images={loopRow2} direction="right" />
      </div>

      {/* YouTube Trailer */}
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">Official Tour Trailer</h3>
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] max-w-4xl mx-auto aspect-video">
            <iframe
              ref={playerRef}
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&mute=1&rel=0&modestbranding=1&enablejsapi=1`}
              title="Official Tour Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
