"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, Sparkles, ArrowRight } from "lucide-react";
import { availableTimeSlots } from "@/data/timeSlots";

export function QuickReservation() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("08:30 PM");
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/reservations?date=${date}&time=${encodeURIComponent(time)}&guests=${guests}`);
  };

  return (
    <section className="py-24 bg-[#0a0a0c] relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-b from-[#141419] to-[#0e0e12] border border-gold-500/25 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gold flare accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table Concierge</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl text-cream-100 font-light tracking-tight">
              YOUR TABLE AWAITS.
            </h2>

            <p className="text-cream-400 text-xs sm:text-sm mt-3 font-light leading-relaxed">
              We recommend reserving at least 48 hours in advance for evening degustation seatings and private salons.
            </p>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Date Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest text-cream-400 flex items-center gap-1.5 font-medium">
                <CalendarIcon className="w-3.5 h-3.5 text-gold-400" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
                required
              />
            </div>

            {/* Time Slot Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest text-cream-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Seating Time</span>
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
              >
                {availableTimeSlots.map((slot) => (
                  <option key={slot.time} value={slot.time} disabled={slot.status === "booked"}>
                    {slot.time} ({slot.period}) {slot.status === "booked" ? "— Sold Out" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-widest text-cream-400 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                <span>Party Size</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 focus:outline-none focus:border-gold-400 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA Button */}
            <div className="sm:col-span-3 lg:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Reserve Table</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
