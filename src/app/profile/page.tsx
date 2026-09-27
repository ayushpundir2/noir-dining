"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Calendar, Heart, MapPin, Award, ArrowRight, Clock } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function ProfilePage() {
  const { orders, reservations, favorites, dishes, toggleFavorite } = useRestaurant();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"orders" | "reservations" | "favorites" | "addresses">("orders");

  const [savedAddresses] = useState([
    {
      id: "addr-1",
      title: "Primary Residence",
      address: "Penthouse 14B, The Imperial Towers, Altamount Road, Mumbai 400026",
      isDefault: true,
    },
    {
      id: "addr-2",
      title: "Worli Atelier Office",
      address: "Floor 22, Peninsula Corporate Park, Lower Parel, Mumbai 400013",
      isDefault: false,
    },
  ]);

  const favoriteDishes = dishes.filter((d) => favorites.includes(d.id));

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Patron VIP Header */}
        <div className="rounded-3xl bg-[#121217] border border-gold-500/25 p-6 sm:p-10 shadow-2xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold-500 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                alt="Patron Avatar"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl text-cream-100 font-semibold">
                  Siddharth Verma
                </h1>
                <span className="p-1 rounded-full bg-gold-500/20 text-gold-400" title="Verified VIP Patron">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-cream-400 mt-0.5">siddharth.v@veritas.in • +91 98200 12345</p>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300">
                  Grand Cru Tier
                </span>
                <span className="text-xs text-cream-400 font-mono">
                  <strong className="text-gold-400">4,850</strong> Noir Reward Coins
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Member Since</span>
              <span className="text-xs text-cream-200 font-mono">October 2024</span>
            </div>
            <Link
              href="/reservations"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all shadow-md shadow-gold-500/20"
            >
              Book Table
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gold-500/15 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "orders", label: "Orders History", icon: ShoppingBag, count: orders.length },
            { id: "reservations", label: "Reservations", icon: Calendar, count: reservations.length },
            { id: "favorites", label: "Saved Favorites", icon: Heart, count: favoriteDishes.length },
            { id: "addresses", label: "Delivery Addresses", icon: MapPin, count: savedAddresses.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gold-500/20 text-gold-300 border border-gold-500/40"
                    : "text-cream-400 hover:text-cream-100 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 text-gold-400" />
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/40 text-cream-300">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-[#121217] rounded-2xl border border-gold-500/20 p-8">
                <ShoppingBag className="w-12 h-12 text-cream-500 mx-auto mb-4" />
                <h3 className="font-display text-xl text-cream-100 mb-2">No Past Orders</h3>
                <p className="text-xs text-cream-400 mb-4">Start your gastronomic journey from our seasonal menu.</p>
                <Link
                  href="/menu"
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest inline-block"
                >
                  Explore Menu
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 hover:border-gold-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-gold-400">{order.id}</span>
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                          order.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-gold-500/20 text-gold-300 border border-gold-500/30 animate-pulse"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-xs text-cream-400">
                      {order.type === "delivery" ? "Home Delivery" : "Dine-In Table Service"} • Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <div className="text-xs text-cream-200 pt-1">
                      {order.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(" • ")}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <span className="font-mono text-lg text-cream-100 font-bold">{formatINR(order.total)}</span>
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Reservations */}
        {activeTab === "reservations" && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="text-center py-16 bg-[#121217] rounded-2xl border border-gold-500/20 p-8">
                <Calendar className="w-12 h-12 text-cream-500 mx-auto mb-4" />
                <h3 className="font-display text-xl text-cream-100 mb-2">No Active Reservations</h3>
                <p className="text-xs text-cream-400 mb-4">Book your table for an evening of elevated dining.</p>
                <Link
                  href="/reservations"
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest inline-block"
                >
                  Book Table
                </Link>
              </div>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 hover:border-gold-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-gold-400">{res.id}</span>
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                        {res.status}
                      </span>
                    </div>

                    <h4 className="font-display text-lg text-cream-100 font-semibold">
                      {res.seatingArea}
                    </h4>

                    <div className="flex items-center gap-4 text-xs text-cream-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold-400" /> {res.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-gold-400" /> {res.timeSlot}
                      </span>
                      <span>•</span>
                      <span>{res.guests} Guests</span>
                    </div>

                    {res.specialRequests && (
                      <p className="text-[11px] text-cream-400 italic">
                        Note: {res.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-cream-400">Verified Concierge Table</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Favorites (Wishlist) */}
        {activeTab === "favorites" && (
          <div>
            {favoriteDishes.length === 0 ? (
              <div className="text-center py-16 bg-[#121217] rounded-2xl border border-gold-500/20 p-8">
                <Heart className="w-12 h-12 text-cream-500 mx-auto mb-4" />
                <h3 className="font-display text-xl text-cream-100 mb-2">No Saved Dishes</h3>
                <p className="text-xs text-cream-400 mb-4">Click the heart icon on any dish to save it here for future tasting orders.</p>
                <Link
                  href="/menu"
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest inline-block"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favoriteDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="rounded-2xl bg-[#121217] border border-gold-500/20 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <button
                        onClick={() => toggleFavorite(dish.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-red-500"
                        title="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 fill-red-500" />
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold">{dish.category}</span>
                        <h4 className="font-display text-base text-cream-100 font-semibold line-clamp-1">{dish.name}</h4>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="font-mono text-gold-400 font-semibold">{formatINR(dish.price)}</span>
                        <button
                          onClick={() => addToCart(dish, 1)}
                          className="px-3 py-1.5 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all"
                        >
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Saved Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 rounded-2xl bg-[#121217] border border-gold-500/20 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-base text-cream-100 font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold-400" />
                        <span>{addr.title}</span>
                      </h4>
                      {addr.isDefault && (
                        <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-cream-300 leading-relaxed">{addr.address}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-cream-400">
                    <span>Valet Delivery Route Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
