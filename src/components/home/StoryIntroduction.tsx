"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function StoryIntroduction() {
  return (
    <section className="py-28 bg-[#0b0b0e] relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Culinary Atelier</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-100 font-light leading-[1.15]">
              Not just a meal. <br />
              <span className="italic font-serif text-gold-300">A moment worth remembering.</span>
            </h2>

            <div className="space-y-4 text-cream-400 text-sm sm:text-base leading-relaxed font-light">
              <p>
                Founded on the uncompromising pursuit of sensory resonance, NOIR bridges royal Awadhi hearths, Malabar coastal trade routes, and Parisian culinary discipline.
              </p>
              <p>
                We do not replicate history; we distill it. Every dish on our tasting menu represents months of botanical foraging, slow charcoal simmering, and artisanal pairing—stripping away ornament to reveal the pure emotional essence of each seasonal ingredient.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-gold-500/15">
              <div>
                <p className="font-display text-xl text-cream-100 italic">Chef Kabir Sen</p>
                <p className="text-[11px] uppercase tracking-widest text-gold-400">Executive Culinary Director</p>
              </div>

              <div className="hidden sm:block w-px h-10 bg-gold-500/20" />

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:text-cream-100 transition-colors group"
              >
                <span>Read Tasting Philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden border border-gold-500/25 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
                alt="Artisanal Plating at NOIR"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-transparent to-transparent opacity-80" />

              {/* Floating Floating Accent Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-gold-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold-300 font-semibold">Tasting Season VIII</p>
                  <p className="text-[11px] text-cream-400">Awadhi Hearth & Malabar Coastal Notes</p>
                </div>
                <span className="text-xs font-mono text-gold-400">12 Courses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
