"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, Heart, ArrowRight, Bot, Compass, RefreshCw } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { useCart } from "@/context/CartContext";
import { recommendDishes } from "@/lib/ai-recommender";
import { MoodRecommendation, Dish } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { DishDetailModal } from "@/components/menu/DishDetailModal";

const presetPrompts = [
  "I want something spicy, vegetarian and under ₹400",
  "Rich buttery comfort dish with aromatic truffles",
  "Zero-proof cocktail or elixir for late evening",
  "Decadent dark chocolate dessert with floral notes",
  "Light healthy vegan small plate under ₹500",
  "Prime non-veg chef signature with slow-braised meat",
];

export default function MoodPage() {
  const { dishes, isFavorite, toggleFavorite } = useRestaurant();
  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<MoodRecommendation[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const handleSearch = async (userQuery: string) => {
    if (!userQuery.trim()) return;
    setIsAnalyzing(true);
    setRecommendations(null);

    // Simulate intelligent botanical reasoning time
    setTimeout(async () => {
      const results = await recommendDishes(userQuery, dishes);
      setRecommendations(results);
      setIsAnalyzing(false);
    }, 650);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSelectPreset = (preset: string) => {
    setQuery(preset);
    handleSearch(preset);
  };

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-28 text-cream-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Sommelier & Palate Concierge</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl text-cream-100 font-light tracking-tight">
            WHAT ARE YOU IN <br />
            <span className="italic font-serif text-gold-300">THE MOOD FOR?</span>
          </h1>

          <p className="text-cream-400 text-xs sm:text-sm font-light mt-4 leading-relaxed">
            Tell our culinary AI what your palate desires in plain words. Specify flavors, cravings, dietary restrictions, or budget limits.
          </p>
        </div>

        {/* Query Input Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={handleFormSubmit}
            className="p-2 sm:p-3 rounded-2xl bg-[#131319] border border-gold-500/30 shadow-2xl flex flex-col sm:flex-row items-center gap-3 focus-within:border-gold-400 transition-colors"
          >
            <div className="flex items-center gap-3 px-3 w-full sm:flex-1">
              <Sparkles className="w-5 h-5 text-gold-400 shrink-0 animate-pulse" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'I want something spicy, vegetarian and under ₹400'..."
                className="w-full bg-transparent text-sm text-cream-100 placeholder-cream-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !query.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Consult AI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Prompts */}
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
            <span className="text-[11px] text-cream-500 uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Inspirations:</span>
            </span>
            {presetPrompts.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset)}
                className="px-3 py-1.5 rounded-full bg-[#181820] border border-gold-500/15 text-cream-300 hover:text-gold-300 hover:border-gold-500/40 text-xs transition-colors"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

        {/* AI Loading State */}
        {isAnalyzing && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin mx-auto mb-4" />
            <p className="font-display text-lg text-cream-100">Consulting culinary atelier database...</p>
            <p className="text-xs text-cream-400 mt-1">Cross-referencing botanical flavor notes, dietary parameters & seasonal provenance.</p>
          </div>
        )}

        {/* Recommendations Grid */}
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
              <div>
                <h3 className="font-display text-xl text-cream-100 font-semibold">
                  Palate Pairings & Curated Matches
                </h3>
                <p className="text-xs text-cream-400 mt-0.5">
                  Showing {recommendations.length} creations tailored to: "{query}"
                </p>
              </div>

              <span className="text-xs font-mono text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                AI Match Ready
              </span>
            </div>

            {recommendations.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-[#121217] border border-gold-500/20 p-8">
                <h4 className="font-display text-xl text-cream-100 mb-2">No direct pairings found</h4>
                <p className="text-xs text-cream-400">
                  Try broadening your budget ceiling or asking for different flavor notes like creamy, smoky, or dessert.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => {
                  const dish = rec.dish;
                  const favorite = isFavorite(dish.id);

                  return (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl bg-[#121217] border border-gold-500/25 overflow-hidden flex flex-col justify-between hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300"
                    >
                      {/* Image section */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-85" />

                        {/* AI Match Score Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-gold-500 text-noir-black text-xs font-bold font-mono tracking-tight flex items-center gap-1 shadow-lg shadow-gold-500/30">
                            <Sparkles className="w-3 h-3" />
                            <span>{rec.matchScore}% Match</span>
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

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Matched Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {rec.matchedTags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/25 text-gold-300 font-semibold"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h4
                            onClick={() => setSelectedDish(dish)}
                            className="font-display text-xl text-cream-100 font-semibold hover:text-gold-300 transition-colors cursor-pointer"
                          >
                            {dish.name}
                          </h4>

                          {/* AI Rationale */}
                          <div className="p-2.5 rounded-lg bg-[#181822] border border-white/5 text-[11px] text-cream-300 leading-relaxed mt-2.5">
                            <span className="text-gold-400 font-semibold block mb-0.5">
                              Why our Sommelier matched this:
                            </span>
                            {rec.matchReason}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="font-mono text-gold-400 font-semibold text-lg">
                            {formatINR(dish.price)}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedDish(dish)}
                              className="p-2 rounded-lg bg-white/5 border border-gold-500/20 text-cream-300 hover:text-gold-300 hover:bg-white/10 transition-colors"
                              title="Inspect creation"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => addToCart(dish, 1)}
                              className="px-3.5 py-2 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
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
              </div>
            )}
          </motion.div>
        )}
      </div>

      <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
}
