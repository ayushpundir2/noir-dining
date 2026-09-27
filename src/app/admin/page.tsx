"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Calendar,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { Dish, DishCategory, DietaryType, OrderStatus, Reservation } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export default function AdminPage() {
  const {
    dishes,
    addDish,
    updateDish,
    deleteDish,
    toggleDishAvailability,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<"menu" | "orders" | "reservations" | "analytics">("menu");

  // Menu Search & Category Filter in Admin
  const [dishSearch, setDishSearch] = useState("");
  const [dishCategoryFilter, setDishCategoryFilter] = useState<string>("All");

  // Modal States
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  // New Dish Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Starters" as DishCategory,
    price: 500,
    vegType: "veg" as DietaryType,
    shortDescription: "",
    fullDescription: "",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    isSignature: false,
    spiceLevel: 1 as 0 | 1 | 2 | 3,
    calories: 450,
    preparationTimeMinutes: 15,
    ingredients: "Saffron, Cultured Ghee, Wild Spices",
    allergens: "Dairy",
    pairingRecommendation: "Smoked Cardamom Old Fashioned",
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length;
  const confirmedReservationsCount = reservations.filter((r) => r.status === "confirmed").length;

  const filteredDishes = dishes.filter((d) => {
    if (dishCategoryFilter !== "All" && d.category !== dishCategoryFilter) return false;
    if (dishSearch.trim() && !d.name.toLowerCase().includes(dishSearch.toLowerCase())) return false;
    return true;
  });

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    addDish({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      vegType: formData.vegType,
      rating: 4.8,
      reviewsCount: 1,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription || formData.shortDescription,
      image: formData.image,
      isSignature: formData.isSignature,
      spiceLevel: formData.spiceLevel,
      calories: Number(formData.calories),
      preparationTimeMinutes: Number(formData.preparationTimeMinutes),
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
      allergens: formData.allergens.split(",").map((i) => i.trim()).filter(Boolean),
      pairingRecommendation: formData.pairingRecommendation,
      isAvailable: true,
    });
    setIsAddDishOpen(false);
  };

  const handleUpdateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;
    updateDish(editingDish);
    setEditingDish(null);
  };

  return (
    <div className="min-h-screen bg-noir-black pt-28 pb-24 text-cream-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Admin Top Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.25em] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Management Suite</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-cream-100 font-light">
              ATELIER CONTROL DESK
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddDishOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Culinary Dish</span>
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Revenue */}
          <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-cream-400">Total Settled Revenue</span>
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="font-mono text-2xl sm:text-3xl text-gold-400 font-bold">{formatINR(totalRevenue)}</p>
            <span className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% from previous evening
            </span>
          </div>

          {/* Card 2: Orders */}
          <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-cream-400">All Registered Orders</span>
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-mono text-2xl sm:text-3xl text-cream-100 font-bold">{orders.length}</p>
            <span className="text-[11px] text-cream-400 mt-1 block">Includes dine-in & delivery</span>
          </div>

          {/* Card 3: Active Orders */}
          <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-cream-400">Active Kitchen Orders</span>
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="font-mono text-2xl sm:text-3xl text-cream-100 font-bold">{activeOrdersCount}</p>
            <span className="text-[11px] text-amber-400 mt-1 block">In preparation or en route</span>
          </div>

          {/* Card 4: Reservations */}
          <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-cream-400">Active Table Bookings</span>
              <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="font-mono text-2xl sm:text-3xl text-cream-100 font-bold">{confirmedReservationsCount}</p>
            <span className="text-[11px] text-cream-400 mt-1 block">Across private salons & dining hall</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gold-500/15 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "menu", label: "Menu Management", count: dishes.length },
            { id: "orders", label: "Live Order Logistics", count: orders.length },
            { id: "reservations", label: "Table Reservations", count: reservations.length },
            { id: "analytics", label: "Financial Analytics & Patrons" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                    : "text-cream-400 hover:text-cream-100 hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-2 font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-cream-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENU MANAGEMENT */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {/* Search and Category Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121217] border border-gold-500/20">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dishSearch}
                  onChange={(e) => setDishSearch(e.target.value)}
                  placeholder="Filter dishes by name..."
                  className="w-full pl-9 pr-4 py-2 bg-[#181820] border border-gold-500/20 rounded-lg text-xs text-cream-100 placeholder-cream-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {["All", "Starters", "Mains", "Breads", "Desserts", "Beverages"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDishCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      dishCategoryFilter === cat
                        ? "bg-gold-500 text-noir-black font-semibold"
                        : "bg-white/5 text-cream-400 hover:text-cream-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dishes Table */}
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181820] text-cream-400 uppercase tracking-wider text-[10px] border-b border-white/5">
                    <tr>
                      <th className="py-3.5 px-4">Dish</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Dietary</th>
                      <th className="py-3.5 px-4">Price (INR)</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-cream-200">
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gold-500/20">
                              <Image
                                src={dish.image}
                                alt={dish.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-cream-100 text-xs">{dish.name}</p>
                              <span className="text-[10px] text-cream-400 truncate max-w-xs block">
                                {dish.shortDescription}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-gold-300 font-medium">{dish.category}</td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                              dish.vegType === "veg"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : dish.vegType === "vegan"
                                ? "bg-teal-500/20 text-teal-300"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {dish.vegType}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-semibold text-gold-400">
                          {formatINR(dish.price)}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleDishAvailability(dish.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${
                              dish.isAvailable
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                            }`}
                          >
                            {dish.isAvailable ? "In Stock" : "Sold Out"}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingDish(dish)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-gold-500/20 text-cream-300 hover:text-gold-300 transition-colors"
                              title="Edit specifications"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteDish(dish.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-cream-400 hover:text-red-400 transition-colors"
                              title="Delete creation"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="rounded-2xl bg-[#121217] border border-gold-500/20 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181820] text-cream-400 uppercase tracking-wider text-[10px] border-b border-white/5">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Items Summary</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Change Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-cream-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-gold-400">
                        {order.id}
                        <span className="block text-[10px] text-cream-500 font-sans font-normal">
                          {order.type === "delivery" ? "Delivery" : "Dine-In"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-cream-100">{order.customer.fullName}</p>
                        <p className="text-[11px] text-cream-400">{order.customer.phone}</p>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-xs text-cream-200 truncate">
                          {order.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(", ")}
                        </p>
                        <span className="text-[10px] text-cream-500">{order.items.length} items</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-cream-100">
                        {formatINR(order.total)}
                        <span className="block text-[10px] text-gold-400 font-normal">{order.paymentMethod}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="py-1 px-2.5 rounded-lg bg-[#181822] border border-gold-500/25 text-xs text-gold-300 font-medium focus:outline-none focus:border-gold-400"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Plated & Ready</option>
                          <option value="delivering">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/orders/${order.id}`}
                          className="px-3 py-1 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all inline-block"
                        >
                          View Tracker
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RESERVATIONS MANAGEMENT */}
        {activeTab === "reservations" && (
          <div className="rounded-2xl bg-[#121217] border border-gold-500/20 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181820] text-cream-400 uppercase tracking-wider text-[10px] border-b border-white/5">
                  <tr>
                    <th className="py-3.5 px-4">Reservation ID</th>
                    <th className="py-3.5 px-4">Patron</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Party Size</th>
                    <th className="py-3.5 px-4">Dining Salon</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-cream-200">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-gold-400">{res.id}</td>

                      <td className="py-3.5 px-4">
                        <p className="font-medium text-cream-100">{res.customerName}</p>
                        <p className="text-[11px] text-cream-400">{res.phone} • {res.email}</p>
                        {res.specialRequests && (
                          <span className="text-[10px] text-gold-300 italic block mt-0.5">
                            "{res.specialRequests}"
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-mono text-cream-200">{res.date}</p>
                        <span className="text-[11px] text-gold-400">{res.timeSlot}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-cream-100">{res.guests} Guests</td>

                      <td className="py-3.5 px-4 text-cream-300 font-medium">{res.seatingArea}</td>

                      <td className="py-3.5 px-4">
                        <select
                          value={res.status}
                          onChange={(e) => updateReservationStatus(res.id, e.target.value as Reservation["status"])}
                          className="py-1 px-2.5 rounded-lg bg-[#181822] border border-gold-500/25 text-xs text-gold-300 font-medium focus:outline-none focus:border-gold-400"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS & PATRONS */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sales Trends Chart (Custom SVG & CSS) */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl space-y-4">
              <h3 className="font-display text-lg text-cream-100 font-semibold border-b border-white/5 pb-3">
                Weekly Revenue Velocity
              </h3>

              <div className="space-y-3 pt-2">
                {[
                  { day: "Monday", amount: 48200, percent: 55 },
                  { day: "Tuesday", amount: 56400, percent: 64 },
                  { day: "Wednesday", amount: 64800, percent: 74 },
                  { day: "Thursday", amount: 72100, percent: 82 },
                  { day: "Friday (Degustation Night)", amount: 98400, percent: 100 },
                  { day: "Saturday (Gala)", amount: 92000, percent: 94 },
                  { day: "Sunday (Salon Tasting)", amount: 84300, percent: 86 },
                ].map((item) => (
                  <div key={item.day} className="space-y-1 text-xs">
                    <div className="flex justify-between text-cream-300">
                      <span>{item.day}</span>
                      <span className="font-mono text-gold-400 font-semibold">{formatINR(item.amount)}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Dishes Breakdown */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 shadow-xl space-y-4">
              <h3 className="font-display text-lg text-cream-100 font-semibold border-b border-white/5 pb-3">
                Most Revered Courses
              </h3>

              <div className="space-y-4 pt-2">
                {dishes.slice(0, 5).map((dish, i) => (
                  <div key={dish.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-gold-400 font-bold w-4">0{i + 1}</span>
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-gold-500/20">
                        <Image src={dish.image} alt={dish.name} fill sizes="36px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-cream-100">{dish.name}</p>
                        <p className="text-[10px] text-cream-400">{dish.category} • ★ {dish.rating}</p>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-gold-400">{formatINR(dish.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD NEW DISH */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#141419] border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4 mb-6">
              <h3 className="font-display text-2xl text-cream-100">Add New Culinary Dish</h3>
              <button onClick={() => setIsAddDishOpen(false)} className="text-cream-400 hover:text-cream-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDish} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Saffron Wild Rice Pilaf"
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as DishCategory })}
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-200 focus:outline-none focus:border-gold-400"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Breads">Breads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Price (INR ₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Dietary Classification *</label>
                  <select
                    value={formData.vegType}
                    onChange={(e) => setFormData({ ...formData, vegType: e.target.value as DietaryType })}
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-200 focus:outline-none focus:border-gold-400"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-cream-400 uppercase tracking-wider block mb-1">Image URL (High-Res Food Photography) *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-cream-400 uppercase tracking-wider block mb-1">Short Description (1 sentence) *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="e.g. Saffron-infused basmati rice with toasted almond slivers..."
                  className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-cream-400 uppercase tracking-wider block mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="e.g. Saffron, Basmati Rice, Almonds"
                  className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="sig-check"
                  checked={formData.isSignature}
                  onChange={(e) => setFormData({ ...formData, isSignature: e.target.checked })}
                  className="accent-gold-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="sig-check" className="text-cream-300 cursor-pointer">
                  Mark as Executive Chef Signature Dish
                </label>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDishOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-cream-300 hover:bg-white/10 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 text-noir-black font-semibold uppercase tracking-wider text-xs hover:brightness-110"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DISH */}
      {editingDish && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#141419] border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4 mb-6">
              <h3 className="font-display text-2xl text-cream-100">Edit Dish: {editingDish.name}</h3>
              <button onClick={() => setEditingDish(null)} className="text-cream-400 hover:text-cream-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateDish} className="space-y-4 text-xs">
              <div>
                <label className="text-cream-400 uppercase tracking-wider block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-cream-400 uppercase tracking-wider block mb-1">Availability</label>
                  <select
                    value={editingDish.isAvailable ? "true" : "false"}
                    onChange={(e) => setEditingDish({ ...editingDish, isAvailable: e.target.value === "true" })}
                    className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-200 focus:outline-none focus:border-gold-400"
                  >
                    <option value="true">In Stock & Active</option>
                    <option value="false">Sold Out / Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-cream-400 uppercase tracking-wider block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingDish.shortDescription}
                  onChange={(e) => setEditingDish({ ...editingDish, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1b1b22] border border-gold-500/20 rounded-lg text-cream-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDish(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-cream-300 hover:bg-white/10 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 text-noir-black font-semibold uppercase tracking-wider text-xs hover:brightness-110"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
