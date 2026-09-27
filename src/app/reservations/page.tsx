"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { availableTimeSlots, seatingAreas } from "@/data/timeSlots";
import { useRestaurant } from "@/context/RestaurantContext";
import { useToast } from "@/context/ToastContext";
import { Reservation } from "@/lib/types";

function ReservationContent() {
  const searchParams = useSearchParams();
  const { createReservation } = useRestaurant();
  const { showToast } = useToast();

  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [selectedArea, setSelectedArea] = useState<typeof seatingAreas[number]["name"]>("Main Dining Room");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [occasion, setOccasion] = useState("None");

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Sync params on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const pDate = searchParams.get("date");
    const pTime = searchParams.get("time");
    const pGuests = searchParams.get("guests");

    setDate(pDate || today);
    setSelectedTime(pTime || "08:30 PM");
    if (pGuests) setGuests(Number(pGuests));
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email || !date || !selectedTime) {
      showToast("Please complete required reservation fields", { type: "info" });
      return;
    }

    const fullSpecialNotes = [
      occasion !== "None" ? `Occasion: ${occasion}` : "",
      specialRequests.trim(),
    ]
      .filter(Boolean)
      .join(" • ");

    const newRes = createReservation({
      date,
      timeSlot: selectedTime,
      guests,
      seatingArea: selectedArea,
      customerName,
      phone,
      email,
      specialRequests: fullSpecialNotes,
    });

    setConfirmedReservation(newRes);
    showToast("Table Reserved Successfully!", {
      type: "success",
      description: `Reservation ${newRes.id} confirmed for ${guests} guests on ${date}.`,
    });
  };

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Editorial Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Table Bookings</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-cream-100 font-light tracking-tight">
            RESERVE YOUR TABLE
          </h1>
          <p className="text-cream-400 text-xs sm:text-sm font-light max-w-xl mx-auto mt-3">
            Choose your dining salon, select your preferred seating window, and let our maître d' craft an impeccable evening.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-[#111116] border border-gold-500/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 1. Date & Guest Count */}
            <div>
              <h3 className="font-display text-lg text-cream-100 mb-4 flex items-center gap-2">
                <span className="text-gold-400 font-mono text-sm">01.</span>
                <span>Date & Party Size</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-2 font-medium">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-2 font-medium">
                    Number of Guests
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                          guests === num
                            ? "bg-gold-500 text-noir-black font-bold shadow-md shadow-gold-500/20"
                            : "bg-[#18181f] border border-gold-500/15 text-cream-300 hover:border-gold-500/40"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Seating Area Selection */}
            <div>
              <h3 className="font-display text-lg text-cream-100 mb-4 flex items-center gap-2">
                <span className="text-gold-400 font-mono text-sm">02.</span>
                <span>Select Dining Atmosphere</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seatingAreas.map((area) => {
                  const isSelected = selectedArea === area.name;
                  return (
                    <div
                      key={area.name}
                      onClick={() => setSelectedArea(area.name)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-gold-500/10 border-gold-500 shadow-lg shadow-gold-500/10"
                          : "bg-[#18181f] border-gold-500/15 hover:border-gold-500/35"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                          {area.badge}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400" />}
                      </div>
                      <h4 className="font-display text-base text-cream-100 font-semibold">
                        {area.name}
                      </h4>
                      <p className="text-xs text-cream-400 mt-1 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Seating Time Slots */}
            <div>
              <h3 className="font-display text-lg text-cream-100 mb-4 flex items-center gap-2">
                <span className="text-gold-400 font-mono text-sm">03.</span>
                <span>Select Time Slot</span>
              </h3>

              <div className="space-y-4">
                {/* Lunch Slots */}
                <div>
                  <span className="text-xs text-cream-400 uppercase tracking-wider block mb-2">
                    Lunch (12:30 PM – 3:30 PM)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {availableTimeSlots
                      .filter((s) => s.period === "lunch")
                      .map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        const isBooked = slot.status === "booked";
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isBooked
                                ? "opacity-35 cursor-not-allowed bg-zinc-900 border-zinc-800"
                                : isSelected
                                ? "bg-gold-500 text-noir-black border-gold-400 font-semibold shadow-lg shadow-gold-500/20"
                                : "bg-[#18181f] border-gold-500/20 text-cream-200 hover:border-gold-400"
                            }`}
                          >
                            <span className="font-mono text-xs font-semibold">{slot.time}</span>
                            <span
                              className={`text-[9px] uppercase tracking-wider mt-1 ${
                                isSelected ? "text-noir-black font-medium" : slot.status === "limited" ? "text-amber-400" : "text-emerald-400"
                              }`}
                            >
                              {isBooked ? "Sold Out" : slot.status === "limited" ? "1 Table Left" : "Available"}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Dinner Slots */}
                <div>
                  <span className="text-xs text-cream-400 uppercase tracking-wider block mb-2">
                    Dinner (07:00 PM – 11:30 PM)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {availableTimeSlots
                      .filter((s) => s.period === "dinner")
                      .map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        const isBooked = slot.status === "booked";
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isBooked
                                ? "opacity-35 cursor-not-allowed bg-zinc-900 border-zinc-800"
                                : isSelected
                                ? "bg-gold-500 text-noir-black border-gold-400 font-semibold shadow-lg shadow-gold-500/20"
                                : "bg-[#18181f] border-gold-500/20 text-cream-200 hover:border-gold-400"
                            }`}
                          >
                            <span className="font-mono text-xs font-semibold">{slot.time}</span>
                            <span
                              className={`text-[9px] uppercase tracking-wider mt-1 ${
                                isSelected ? "text-noir-black font-medium" : slot.status === "limited" ? "text-amber-400" : "text-emerald-400"
                              }`}
                            >
                              {isBooked ? "Sold Out" : slot.status === "limited" ? "1 Table Left" : "Available"}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Guest Contact & Special Requests */}
            <div>
              <h3 className="font-display text-lg text-cream-100 mb-4 flex items-center gap-2">
                <span className="text-gold-400 font-mono text-sm">04.</span>
                <span>Guest Details & Requests</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Siddharth Verma"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 12345"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="siddharth@example.com"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Special Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-200 focus:outline-none focus:border-gold-400"
                  >
                    <option value="None">Casual Fine Dining</option>
                    <option value="Anniversary">Wedding / Relationship Anniversary</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Business">Business Degustation</option>
                    <option value="Proposal">Romantic Proposal</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Dietary Allergens or Preferences
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Vegetarian only, peanut allergy, high-back booth preferred"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-cream-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Instant confirmation • No cancellation fee up to 4 hours prior</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-gold-500/25 transition-all"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedReservation && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedReservation(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#141419] border border-gold-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl z-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6 text-gold-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
                Reservation Confirmed
              </span>

              <h2 className="font-display text-3xl text-cream-100 font-light mb-2">
                We Await Your Presence
              </h2>

              <p className="text-xs text-cream-400 max-w-sm mx-auto mb-6">
                Your reservation has been recorded in the NOIR maîtres d’ log. A digital confirmation has been registered for your dining passport.
              </p>

              {/* Booking Card Details */}
              <div className="p-5 rounded-2xl bg-[#191920] border border-gold-500/20 text-left space-y-3 mb-6 text-xs text-cream-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-cream-400">Booking Reference</span>
                  <span className="font-mono text-gold-400 font-semibold">{confirmedReservation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-400">Date & Time</span>
                  <span className="font-mono text-cream-100">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-400">Party Size</span>
                  <span className="text-cream-100">{confirmedReservation.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-400">Seating Salon</span>
                  <span className="text-gold-300">{confirmedReservation.seatingArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-400">Primary Guest</span>
                  <span className="text-cream-100">{confirmedReservation.customerName}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Done
                </button>
                <a
                  href="/profile"
                  className="flex-1 py-3 px-4 rounded-xl border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 text-xs font-semibold uppercase tracking-widest transition-all"
                >
                  View in Passport
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReservationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-noir-black pt-32 text-center text-cream-400">Loading reservation concierge...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
