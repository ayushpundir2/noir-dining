"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { formatINR } from "@/lib/utils";

export default function OrdersIndexPage() {
  const { orders } = useRestaurant();

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="mb-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
            Active & Past Orders
          </span>
          <h1 className="font-display text-3xl sm:text-5xl text-cream-100 font-light">
            YOUR TASTING ORDERS
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#121217] border border-gold-500/20 p-8">
            <ShoppingBag className="w-12 h-12 text-cream-500 mx-auto mb-4" />
            <h3 className="font-display text-xl text-cream-100 mb-2">No Active Orders</h3>
            <p className="text-xs text-cream-400 mb-6">Discover our seasonal culinary repertoire and place your first order.</p>
            <Link
              href="/menu"
              className="px-6 py-2.5 rounded-full bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#121217] border border-gold-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gold-500/40 transition-all"
              >
                <div>
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

                  <p className="text-xs text-cream-400 mt-1">
                    {order.items.length} items • Placed at {new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                  </p>
                  <p className="text-xs text-cream-200 mt-2 font-medium">
                    {order.items.map((i) => `${i.quantity}x ${i.dish.name}`).join(", ")}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  <span className="font-mono text-base text-cream-100 font-bold">{formatINR(order.total)}</span>
                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-300 hover:bg-gold-500 hover:text-noir-black text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span>Track Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
