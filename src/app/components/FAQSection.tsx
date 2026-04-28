import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I purchase tickets?",
    answer: "Click the 'Buy Tickets Now' button and select your preferred ticket type. You'll be redirected to our secure payment portal to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay. All transactions are encrypted and secure.",
  },
  {
    question: "Can I get a refund if I can't attend?",
    answer: "Tickets are non-refundable but are transferable. You can transfer your ticket to another person through your account up to 24 hours before the event.",
  },
  {
    question: "What time should I arrive?",
    answer: "Gates open at 6:00 PM. We recommend arriving early to allow time for security screening and to secure your spot, especially for general admission tickets.",
  },
  {
    question: "What's the bag policy?",
    answer: "Small bags only (max 30cm are permitted). No outside food or drinks allowed. Sealed water bottles are permitted. All bags are subject to inspection at entry.",
  },
  {
    question: "Is there an age limit?",
    answer: "All ages are welcome. Attendees under 16 must be accompanied by a parent or guardian. Licensed areas are restricted to 18+ with valid ID.",
  },
  {
    question: "Will food and drinks be available?",
    answer: "Yes! Multiple food vendors and bars will be operating throughout the venue. A variety of cuisines and beverages will be available for purchase.",
  },
  {
    question: "Can I bring a camera?",
    answer: "Personal smartphones are allowed. Professional cameras with detachable lenses and recording equipment are prohibited without prior approval.",
  },
  {
    question: "Is the venue accessible for people with disabilities?",
    answer: "Yes, Qudos Bank Arena is fully wheelchair accessible with companion seating, accessible restrooms, and designated parking. Contact us for specific accessibility requirements.",
  },
  {
    question: "Is re-entry allowed?",
    answer: "Re-entry is not permitted once you have exited the venue. Please ensure you have everything you need before leaving the arena.",
  },
  {
    question: "What if the event is postponed or cancelled?",
    answer: "In the event of a postponement or cancellation, ticket holders will be notified via email. Refunds or exchanges will be processed in accordance with the ticket provider's terms and conditions.",
  },
];

export function FAQSection() {
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
    <section id="faq" ref={sectionRef} className="py-32 bg-gradient-to-b from-[#15111f] to-[#0A0A0F]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Accordion.Item
                  value={`faq-${index}`}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
                      <span className="text-white font-semibold pr-4">{faq.question}</span>
                      <ChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180 flex-shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</div>
                  </Accordion.Content>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
