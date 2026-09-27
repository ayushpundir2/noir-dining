"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Flame, Clock, Heart, Sparkles, AlertTriangle, Wine, ShoppingBag } from "lucide-react";
import { Dish } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useRestaurant();

  if (!dish) return null;

  const handleAddToCart = () => {
    addToCart(dish, quantity, notes);
    onClose();
  };

  const favorite = isFavorite(dish.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#121217] border border-gold-500/25 rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close & Favorite Top Floating Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(dish.id)}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cream-200 hover:text-red-400 transition-colors"
              aria-label="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cream-200 hover:text-cream-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left: Image Container */}
            <div className="md:col-span-5 relative aspect-square md:aspect-auto min-h-[260px] md:min-h-full">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30 md:bg-gradient-to-r md:from-transparent md:to-[#121217]" />

              {dish.isSignature && (
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-noir-black text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>Chef Signature</span>
                </div>
              )}
            </div>

            {/* Right: Detailed Specifications */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      dish.vegType === "veg"
                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                        : dish.vegType === "vegan"
                        ? "border-teal-400/40 text-teal-300 bg-teal-400/10"
                        : "border-red-500/40 text-red-400 bg-red-500/10"
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

                  <span className="px-2.5 py-0.5 rounded-full text-xs text-gold-300 bg-gold-500/10 border border-gold-500/30">
                    {dish.category}
                  </span>

                  {dish.spiceLevel > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-orange-400">
                      <Flame className="w-3 h-3" />
                      <span>{"🌶️".repeat(dish.spiceLevel)}</span>
                    </span>
                  )}
                </div>

                {/* Name & Pricing */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-cream-100 font-semibold leading-tight">
                    {dish.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xl font-mono text-gold-400 font-semibold">
                      {formatINR(dish.price)}
                    </span>
                    <span className="text-xs text-cream-400">★ {dish.rating} ({dish.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Full Description */}
                <p className="text-xs sm:text-sm text-cream-300 leading-relaxed font-light">
                  {dish.fullDescription}
                </p>

                {/* Ingredients Pill List */}
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold mb-2">
                    Key Ingredients & Provenance
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-cream-300"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pairing & Allergens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-white/5">
                  {dish.pairingRecommendation && (
                    <div className="flex items-start gap-2 text-cream-300">
                      <Wine className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400 block font-semibold">
                          Recommended Pairing
                        </span>
                        <span>{dish.pairingRecommendation}</span>
                      </div>
                    </div>
                  )}

                  {dish.allergens.length > 0 && (
                    <div className="flex items-start gap-2 text-cream-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-semibold">
                          Allergens
                        </span>
                        <span>{dish.allergens.join(", ")}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Calories & Preparation Time */}
                <div className="flex items-center gap-6 text-xs text-cream-400 pt-1 font-mono">
                  <span>{dish.calories} kcal</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {dish.preparationTimeMinutes} mins prep
                  </span>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special request for Chef (e.g. less spice, warm plates)..."
                    className="w-full px-3 py-1.5 bg-[#181820] border border-gold-500/20 rounded-lg text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Action Controls: Quantity & Add to Cart */}
              <div className="pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center justify-between w-full sm:w-auto bg-[#18181e] border border-gold-500/25 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-cream-300 hover:text-gold-300 rounded hover:bg-white/5"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-sm text-cream-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-cream-300 hover:text-gold-300 rounded hover:bg-white/5"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order • {formatINR(dish.price * quantity)}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
