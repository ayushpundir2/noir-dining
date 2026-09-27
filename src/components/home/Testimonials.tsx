"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-28 bg-[#09090b] relative overflow-hidden border-t border-gold-500/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Praise & Acclaim</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-cream-100 font-light">
            THE CRITICS SPEAK
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative">
          <div className="relative rounded-3xl bg-[#121217] border border-gold-500/20 p-8 sm:p-14 shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            <Quote className="absolute top-6 right-8 w-24 h-24 text-gold-500/5 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 relative z-10"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* Review Quote */}
                <p className="font-display text-lg sm:text-2xl text-cream-100 font-light italic leading-relaxed">
                  "{current.comment}"
                </p>

                {/* Critic Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-500/30">
                    <Image
                      src={current.avatar}
                      alt={current.author}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-base text-cream-100 font-semibold">
                      {current.author}
                    </h4>
                    <p className="text-xs text-gold-400">
                      {current.role} • <span className="text-cream-400">{current.organization}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      i === currentIndex ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full bg-noir-card border border-gold-500/20 text-cream-300 hover:text-gold-300 hover:border-gold-400 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full bg-noir-card border border-gold-500/20 text-cream-300 hover:text-gold-300 hover:border-gold-400 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
