"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award } from "lucide-react";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The NOIR Chronicle</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-cream-100 font-light tracking-tight">
            OUR STORY & PHILOSOPHY
          </h1>

          <p className="text-cream-400 text-xs sm:text-sm font-light mt-4 leading-relaxed">
            Where classical subcontinental slow-cooking disciplines meet contemporary European precision and architectural elegance.
          </p>
        </div>

        {/* Feature Narrative Grid 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-24">
          <div className="md:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
              alt="Culinary Sourcing"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Provenance</span>
              <h3 className="font-display text-xl text-cream-100">Kashmiri Morels & Malabar Botanicals</h3>
            </div>
          </div>

          <div className="md:col-span-6 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl text-cream-100 font-light leading-snug">
              The Geometry of Slow Fire & Cold Smoke
            </h2>

            <p className="text-xs sm:text-sm text-cream-400 leading-relaxed font-light">
              NOIR was conceived in 2022 by Chef Kabir Sen and an ensemble of culinary historians. Frustrated by the homogenization of modern dining, they sought to build an atelier that rejected compromise.
            </p>

            <p className="text-xs sm:text-sm text-cream-400 leading-relaxed font-light">
              Every black urad lentil is simmered for thirty-six hours over fragrant hardwood charcoal. Every galouti is perfumed with hand-distilled vetiver smoke. We collaborate directly with single-estate spice growers in Wayanad, foraged gucchi gatherers in Jammu, and saffron purveyors in Pampore.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[#141419] border border-gold-500/20 text-center flex-1">
                <span className="font-mono text-2xl text-gold-400 font-bold block">36 hrs</span>
                <span className="text-[10px] text-cream-400 uppercase tracking-wider">Lentil Simmer</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141419] border border-gold-500/20 text-center flex-1">
                <span className="font-mono text-2xl text-gold-400 font-bold block">1,200</span>
                <span className="text-[10px] text-cream-400 uppercase tracking-wider">Cellar Vintages</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141419] border border-gold-500/20 text-center flex-1">
                <span className="font-mono text-2xl text-gold-400 font-bold block">100%</span>
                <span className="text-[10px] text-cream-400 uppercase tracking-wider">Single-Estate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Narrative Grid 2 */}
        <div className="rounded-3xl bg-[#121217] border border-gold-500/20 p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-cream-100 font-light">
            An Unwavering Standard of Luxury
          </h2>

          <p className="text-xs sm:text-sm text-cream-300 leading-relaxed font-light max-w-2xl mx-auto">
            "We believe true hospitality is invisible—felt in the warmth of the lighting, the rhythm of course progression, and the quiet dignity of ingredients treated with absolute respect."
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-gold-500/20"
            >
              Discover The Tasting Menu
            </Link>

            <Link
              href="/reservations"
              className="px-8 py-3.5 rounded-full border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 text-xs font-semibold uppercase tracking-widest transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
