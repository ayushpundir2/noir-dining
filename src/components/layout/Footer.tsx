"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MapPin, Clock, Phone, Mail } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    showToast("Welcome to the NOIR Inner Circle", {
      type: "gold",
      description: "Exclusive invitations and seasonal tasting previews will be sent to your email.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-[#070709] border-t border-gold-500/15 text-cream-200 relative overflow-hidden pt-20 pb-12">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gold-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Massive Editorial Header Callout */}
        <div className="border-b border-gold-500/15 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold mb-3 block">
              An Ephemeral Gastronomic Journey
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-cream-100">
              COME DINE <br />
              <span className="italic font-serif text-gold-300">WITH US.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/reservations"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black font-semibold tracking-widest text-xs uppercase hover:brightness-110 shadow-xl shadow-gold-500/20 transition-all flex items-center gap-2 group"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/menu"
              className="px-8 py-4 rounded-full border border-gold-500/30 text-cream-200 hover:text-gold-300 hover:border-gold-400 text-xs uppercase tracking-widest transition-all"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        {/* 4 Column Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-gold-500/15 text-sm">
          {/* Col 1: Atelier Philosophy */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-[0.25em] text-cream-100 font-semibold">
                NOIR
              </span>
              <span className="text-[10px] tracking-[0.3em] text-gold-400 uppercase">
                Modern Dining
              </span>
            </div>
            <p className="text-cream-400 text-xs leading-relaxed max-w-xs">
              Contemporary dining crafted around bold flavors, seasonal provenance, and unforgettable moments. Every dish is a dialogue between memory and innovation.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400 pt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Michelin Selection Guide 2026</span>
            </div>
          </div>

          {/* Col 2: Atelier Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Location & Hours
            </h4>
            <div className="space-y-3 text-xs text-cream-400 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>NOIR Haute Atelier, Waterfront Promenade, Apollo Bunder, Colaba, Mumbai 400001</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-cream-200 font-medium">Lunch:</p>
                  <p>12:30 PM – 03:30 PM</p>
                  <p className="text-cream-200 font-medium mt-1">Dinner:</p>
                  <p>07:00 PM – 11:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Concierge
            </h4>
            <div className="space-y-3 text-xs text-cream-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 22 6890 4000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>reservations@noirdining.in</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-cream-500 uppercase tracking-wider mb-2">Valet Parking</p>
                <p className="text-xs text-cream-300">Complimentary private valet service available at the porte-cochère.</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              The Patron Circle
            </h4>
            <p className="text-xs text-cream-400 leading-relaxed">
              Receive curated invitations to seasonal menu debuts, private sommelier cellars, and culinary salon evenings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2.5 bg-noir-card border border-gold-500/20 rounded-lg text-xs text-cream-100 placeholder-cream-500 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500/30 text-xs font-semibold rounded-lg uppercase tracking-widest transition-all"
              >
                Join Circle
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-500 gap-4">
          <p>© {new Date().getFullYear()} NOIR Modern Dining. All rights reserved. PS-2 Engineering Project.</p>
          <div className="flex items-center gap-6">
            <Link href="/menu" className="hover:text-gold-400 transition-colors">Menu</Link>
            <Link href="/reservations" className="hover:text-gold-400 transition-colors">Reservations</Link>
            <Link href="/mood" className="hover:text-gold-400 transition-colors">AI Sommelier</Link>
            <Link href="/admin" className="hover:text-gold-400 transition-colors">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
