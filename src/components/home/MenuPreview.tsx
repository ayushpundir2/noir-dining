"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Eye, Heart, Sparkles } from "lucide-react";
import { Dish, DishCategory } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { DishDetailModal } from "@/components/menu/DishDetailModal";

const categories: DishCategory[] = ["Starters", "Mains", "Breads", "Desserts", "Beverages"];

export function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState<DishCategory>("Starters");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const { dishes, isFavorite, toggleFavorite } = useRestaurant();
  const { addToCart } = useCart();

  const filteredDishes = dishes.filter((d) => d.category === activeCategory);

  return (
    <section className="py-28 bg-[#0b0b0e] relative overflow-hidden border-t border-gold-500/10" id="menu-preview">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A La Carte Preview</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-cream-100 font-light">
              THE TASTING MENU
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-[#141419] border border-gold-500/20 max-w-full overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-noir-black font-semibold"
                      : "text-cream-400 hover:text-cream-100 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full shadow-lg shadow-gold-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Dishes Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => {
              const favorite = isFavorite(dish.id);
              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl bg-noir-card border border-gold-500/15 overflow-hidden group hover:border-gold-500/35 hover:shadow-2xl hover:shadow-black/60 transition-all flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-card via-transparent to-transparent opacity-80" />

                    {/* Veg Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-md ${
                          dish.vegType === "veg"
                            ? "bg-black/70 border border-emerald-500/40 text-emerald-400"
                            : dish.vegType === "vegan"
                            ? "bg-black/70 border border-teal-400/40 text-teal-300"
                            : "bg-black/70 border border-red-500/40 text-red-400"
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

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleFavorite(dish.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cream-300 hover:text-red-400 transition-colors"
                      aria-label="Save dish"
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-cream-400 mb-1">
                        <span className="text-gold-400 uppercase tracking-widest text-[10px]">
                          {dish.category}
                        </span>
                        <span>★ {dish.rating} ({dish.reviewsCount})</span>
                      </div>

                      <h3
                        onClick={() => setSelectedDish(dish)}
                        className="font-display text-xl text-cream-100 font-semibold group-hover:text-gold-300 transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>

                      <p className="text-xs text-cream-400 line-clamp-2 mt-2 leading-relaxed font-light">
                        {dish.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-gold-400 font-semibold text-lg">
                        {formatINR(dish.price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDish(dish)}
                          className="p-2 rounded-lg bg-white/5 border border-gold-500/20 text-cream-300 hover:text-gold-300 hover:bg-white/10 transition-colors"
                          title="Inspect details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => addToCart(dish, 1)}
                          className="px-3 py-2 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View Entire Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold-500/40 text-cream-100 hover:text-gold-300 hover:border-gold-300 bg-noir-card text-xs uppercase tracking-[0.2em] font-semibold transition-all group shadow-xl"
          >
            <span>Explore All 22+ Culinary Creations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
}
