"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ShoppingBag, Eye, Heart, Sparkles, X, RotateCcw } from "lucide-react";
import { Dish, DishCategory, DietaryType } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { DishDetailModal } from "@/components/menu/DishDetailModal";

const categories: ("All" | DishCategory | "Signatures")[] = [
  "All",
  "Signatures",
  "Starters",
  "Mains",
  "Breads",
  "Desserts",
  "Beverages",
];

export default function MenuPage() {
  const { dishes, isFavorite, toggleFavorite } = useRestaurant();
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | DishCategory | "Signatures">("All");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | DietaryType>("all");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // Availability
        if (!dish.isAvailable) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(q);
          const matchDesc = dish.shortDescription.toLowerCase().includes(q);
          const matchIng = dish.ingredients.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchIng) return false;
        }

        // Category
        if (selectedCategory === "Signatures") {
          if (!dish.isSignature) return false;
        } else if (selectedCategory !== "All") {
          if (dish.category !== selectedCategory) return false;
        }

        // Dietary
        if (dietaryFilter !== "all") {
          if (dish.vegType !== dietaryFilter) return false;
        }

        // Price
        if (dish.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [dishes, searchQuery, selectedCategory, dietaryFilter, maxPrice, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    dietaryFilter !== "all" ||
    maxPrice < 1000 ||
    sortBy !== "popular";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setDietaryFilter("all");
    setMaxPrice(1000);
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Gastronomy Repertoire</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-cream-100 font-light tracking-tight">
          THE CULINARY ARCHIVE
        </h1>
        <p className="text-cream-400 text-xs sm:text-sm font-light max-w-xl mx-auto mt-3">
          Explore individual courses, slow-cooked gravies, and botanic elixirs crafted with pure ingredients and culinary discipline.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Search & Main Controls Bar */}
        <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-5 mb-8 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes by name or ingredients (e.g. Truffle, Burrata, Kofta)..."
                className="w-full pl-10 pr-9 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-500 focus:outline-none focus:border-gold-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-cream-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-200 focus:outline-none focus:border-gold-400"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="md:col-span-3 flex items-center gap-3">
              <span className="text-[11px] text-cream-400 uppercase tracking-wider shrink-0">
                Max: {formatINR(maxPrice)}
              </span>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Secondary Controls: Category Tabs & Dietary Filter */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-white/5">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                      isActive
                        ? "bg-gold-500 text-noir-black font-semibold shadow-md shadow-gold-500/20"
                        : "bg-white/5 text-cream-400 hover:text-cream-100 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Dietary Pills & Reset */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-[#18181f] border border-gold-500/15">
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "veg", label: "Veg" },
                    { id: "vegan", label: "Vegan" },
                    { id: "non-veg", label: "Non-Veg" },
                  ] as const
                ).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDietaryFilter(d.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      dietaryFilter === d.id
                        ? "bg-gold-500/20 text-gold-300 font-semibold"
                        : "text-cream-400 hover:text-cream-200"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="p-2 rounded-xl bg-white/5 text-cream-400 hover:text-gold-300 border border-white/10 text-xs transition-colors flex items-center gap-1"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-cream-400 mb-6">
          <span>Showing {filteredDishes.length} dishes</span>
          {hasActiveFilters && (
            <span className="text-gold-400 font-medium">Filtered Selection</span>
          )}
        </div>

        {/* Empty State */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-[#111116] border border-gold-500/20 max-w-lg mx-auto p-8">
            <SlidersHorizontal className="w-12 h-12 text-cream-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-cream-100 mb-2">No culinary creations found</h3>
            <p className="text-xs text-cream-400 leading-relaxed mb-6">
              No menu items matched your current filter criteria. Try adjusting the price ceiling, search keywords, or dietary preferences.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs uppercase tracking-widest font-semibold hover:bg-gold-500/30 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Food Grid */
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredDishes.map((dish) => {
                const favorite = isFavorite(dish.id);
                return (
                  <motion.div
                    key={dish.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl bg-noir-card border border-gold-500/15 overflow-hidden group hover:border-gold-500/35 hover:shadow-2xl hover:shadow-black/70 transition-all flex flex-col justify-between"
                  >
                    {/* Image Section */}
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

                      {dish.isSignature && (
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold-500/90 text-noir-black text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Signature</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
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
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  );
}
