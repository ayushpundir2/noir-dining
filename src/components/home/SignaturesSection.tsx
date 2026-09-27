"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, Heart } from "lucide-react";
import { Dish } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { DishDetailModal } from "@/components/menu/DishDetailModal";

export function SignaturesSection() {
  const { dishes, isFavorite, toggleFavorite } = useRestaurant();
  const { addToCart } = useCart();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Filter 4 prominent signatures
  const signatureDishes = dishes.filter((d) => d.isSignature).slice(0, 4);

  return (
    <section className="py-28 bg-[#09090b] relative overflow-hidden border-t border-gold-500/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterpiece Collection</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-100 font-light">
            THE SIGNATURES
          </h2>
          <p className="text-cream-400 text-sm font-light">
            Four defining creations that exemplify our dedication to botanical depth, slow smoke, and culinary discipline.
          </p>
        </div>

        {/* 4 Cards Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureDishes.map((dish, idx) => {
            const favorite = isFavorite(dish.id);
            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group relative rounded-2xl bg-[#131318] border border-gold-500/15 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent opacity-80" />

                  {/* Top Wishlist Button */}
                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cream-300 hover:text-red-400 transition-colors"
                    aria-label="Save dish"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  {/* Veg / Non-Veg Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md ${
                        dish.vegType === "veg"
                          ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400"
                          : dish.vegType === "vegan"
                          ? "bg-teal-950/80 border border-teal-400/30 text-teal-300"
                          : "bg-red-950/80 border border-red-500/30 text-red-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          dish.vegType === "veg"
                            ? "bg-emerald-500"
                            : dish.vegType === "vegan"
                            ? "bg-teal-400"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="capitalize">{dish.vegType}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-cream-400 mb-1">
                      <span className="text-gold-400 tracking-wider uppercase text-[10px]">
                        {dish.category}
                      </span>
                      <span>★ {dish.rating}</span>
                    </div>

                    <h3 className="font-display text-lg text-cream-100 font-semibold group-hover:text-gold-300 transition-colors line-clamp-1">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-cream-400 line-clamp-2 mt-1.5 leading-relaxed font-light">
                      {dish.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Tasting Price</span>
                      <span className="font-mono text-gold-400 font-semibold text-base">
                        {formatINR(dish.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDish(dish)}
                        className="p-2 rounded-lg bg-white/5 border border-gold-500/20 text-cream-300 hover:text-gold-300 hover:bg-white/10 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="p-2 sm:px-3 sm:py-2 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                        title="Add to order"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
