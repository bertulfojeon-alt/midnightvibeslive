import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#15111f] border border-purple-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[0_0_60px_rgba(168,85,247,0.3)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
              <section>
                <h3 className="text-white font-semibold mb-2">1. Ticket Purchase</h3>
                <p>All tickets are sold subject to availability. Prices are inclusive of GST. Booking fees may apply and are non-refundable. Tickets are limited to 4 per transaction to prevent scalping.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">2. Refund & Transfer Policy</h3>
                <p>Tickets are non-refundable except in the event of cancellation by the promoter. Tickets may be transferred to another person via the Ticketek platform up to 24 hours before the event. The promoter reserves the right to cancel tickets obtained in breach of these terms.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">3. Entry Conditions</h3>
                <p>Ticket holders must comply with all venue rules and the directions of staff and security. The venue reserves the right to refuse entry or remove any person behaving in a manner deemed inappropriate. Valid ID may be required for 18+ licensed areas.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">4. Event Changes</h3>
                <p>The promoter reserves the right to change the lineup, set times, or program without notice. If an event is cancelled, ticket holders will be refunded the face value of their ticket. Supporting acts are subject to change.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">5. Recording & Photography</h3>
                <p>Professional cameras and recording equipment are prohibited without prior written consent. By attending, you consent to being photographed and filmed for promotional purposes.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">6. Liability</h3>
                <p>The promoter, venue, and their agents accept no responsibility for personal injury, loss, or damage to property sustained at the event, except as required by law.</p>
              </section>
              <section>
                <h3 className="text-white font-semibold mb-2">7. Governing Law</h3>
                <p>These terms are governed by the laws of New South Wales, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of NSW.</p>
              </section>
              <p className="text-gray-600 text-xs pt-4 border-t border-white/10">Last updated: January 2025 · Midnight Vibes Live 2025</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
