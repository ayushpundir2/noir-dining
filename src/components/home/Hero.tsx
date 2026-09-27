"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  const headlineLines = ["WHERE FLAVOR", "BECOMES", "EXPERIENCE."];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-noir-black pt-20">
      {/* Background Image with slow cinematic scale & dark gradient overlay */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0.8 }}
        animate={{ scale: 1.02, opacity: 1 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
          alt="NOIR Fine Dining Ambiance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.38] contrast-[1.12]"
        />
        {/* Editorial Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-noir-black" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Subtle Luxury Pre-header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-gold-500/30 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold-300 font-semibold">
            Contemporary Haute Gastronomy
          </span>
        </motion.div>

        {/* Headline: Staggered line reveal */}
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight text-cream-100 leading-[1.08] mb-8">
          {headlineLines.map((line, idx) => (
            <span key={idx} className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + idx * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block ${idx === 1 ? "italic font-serif text-gold-300" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-cream-300 text-sm sm:text-base md:text-lg max-w-2xl font-light tracking-wide leading-relaxed mb-10"
        >
          Contemporary dining crafted around bold flavors, seasonal ingredients, and unforgettable moments. An intimate exploration of Indian culinary heritage through a modern lens.
        </motion.p>

        {/* Dual Luxury Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 shadow-2xl shadow-gold-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/reservations"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-gold-500/40 bg-black/40 backdrop-blur-md text-cream-100 hover:text-gold-300 hover:border-gold-300 text-xs uppercase tracking-[0.2em] font-medium transition-all text-center"
          >
            Reserve a Table
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-500 hover:text-gold-400 transition-colors cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-gold-400" />
      </motion.div>
    </section>
  );
}
