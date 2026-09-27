"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="py-32 bg-[#08080a] relative overflow-hidden border-t border-gold-500/10">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Core Philosophy Statement */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atmosphere</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-cream-100 font-light leading-[1.15]">
            Seasonal ingredients. <br />
            <span className="italic font-serif text-gold-300">Thoughtful cooking.</span> <br />
            Exceptional company.
          </h2>

          <p className="text-cream-400 text-sm sm:text-base font-light max-w-xl mx-auto pt-2 leading-relaxed">
            Designed as an intimate nocturnal sanctuary, NOIR pairs low acoustic jazz, hand-sculpted basalt stone hearths, and soft amber illumination to create an atmosphere of profound serenity.
          </p>
        </div>

        {/* Overlapping Immersive Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop"
              alt="NOIR Main Dining Room"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 max-w-md">
              <span className="text-[10px] tracking-widest text-gold-400 uppercase font-semibold">The Main Banquettes</span>
              <h4 className="font-display text-xl text-cream-100 mt-1">Sculpted Stone & Candlelight</h4>
            </div>
          </motion.div>

          {/* Secondary Stacked Images */}
          <div className="md:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop"
                alt="Private Wine Cellar"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] tracking-widest text-gold-400 uppercase font-semibold">The Reserve Cellar</span>
                <h4 className="font-display text-lg text-cream-100">1,200 Rare Vintages & Sommelier Table</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 flex flex-col justify-between"
            >
              <div className="space-y-2 mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold">Private Engagements</span>
                <h4 className="font-display text-xl text-cream-100">Bespoke Dining Salons</h4>
                <p className="text-xs text-cream-400 leading-relaxed font-light">
                  Host intimate degustation dinners, anniversaries, and curated tasting flights guided directly by our Sommelier and Master of Culinary Arts.
                </p>
              </div>

              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 hover:text-cream-100 transition-colors group pt-2"
              >
                <span>Inquire for Private Bookings</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
