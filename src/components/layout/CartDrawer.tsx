"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError("");
      setInputCode("");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="w-screen max-w-md bg-[#111116] border-l border-gold-500/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-gold-500/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30">
                    <ShoppingBag className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-cream-100 font-semibold tracking-wide">
                      Your Tasting Order
                    </h2>
                    <p className="text-xs text-cream-400">
                      {items.length === 0 ? "Empty" : `${items.length} unique creation${items.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 text-cream-400 hover:text-cream-100 rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-noir-card border border-gold-500/20 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-cream-500" />
                    </div>
                    <h3 className="font-display text-xl text-cream-200 mb-2">Your table is empty</h3>
                    <p className="text-sm text-cream-400 max-w-xs mb-6">
                      Explore our tasting creations and assemble your private culinary experience.
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-gold-500/20 border border-gold-500/40 text-gold-300 hover:bg-gold-500/30 transition-all"
                    >
                      Browse Gastronomy
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.dish.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-xl bg-noir-card border border-gold-500/15 flex gap-3.5 group hover:border-gold-500/30 transition-all"
                    >
                      {/* Dish Thumbnail */}
                      <div className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 border border-gold-500/10">
                        <Image
                          src={item.dish.image}
                          alt={item.dish.name}
                          fill
                          sizes="72px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  item.dish.vegType === "veg"
                                    ? "bg-emerald-500"
                                    : item.dish.vegType === "vegan"
                                    ? "bg-teal-400"
                                    : "bg-red-500"
                                }`}
                              />
                              <h4 className="text-sm font-medium text-cream-100 truncate">
                                {item.dish.name}
                              </h4>
                            </div>
                            <span className="text-xs text-gold-400 font-mono mt-0.5 block">
                              {formatINR(item.dish.price)}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.dish.id)}
                            className="text-cream-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                          <div className="flex items-center bg-[#111116] border border-gold-500/20 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.dish.id, -1)}
                              className="p-1 text-cream-300 hover:text-gold-300 hover:bg-white/5 rounded"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-cream-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.dish.id, 1)}
                              className="p-1 text-cream-300 hover:text-gold-300 hover:bg-white/5 rounded"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-cream-200">
                            {formatINR(item.dish.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Totals & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-gold-500/20 bg-[#0d0d11] space-y-4">
                  {/* Coupon Application */}
                  <div>
                    {couponCode ? (
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-gold-500/10 border border-gold-500/30 text-xs">
                        <div className="flex items-center gap-2 text-gold-300">
                          <Tag className="w-3.5 h-3.5" />
                          <span className="font-semibold">{couponCode} applied</span>
                          <span className="text-cream-400">(-{formatINR(discount)})</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-cream-400 hover:text-cream-100 uppercase tracking-widest text-[10px]"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="Promo code (e.g. NOIR10)"
                          className="flex-1 px-3 py-2 bg-noir-card border border-gold-500/20 rounded-lg text-xs text-cream-100 placeholder-cream-500 focus:outline-none focus:border-gold-400 uppercase tracking-wider"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold rounded-lg hover:bg-gold-500/30 transition-all uppercase tracking-wider"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-400 mt-1 pl-1">{promoError}</p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-cream-300 border-t border-white/5 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-cream-100">{formatINR(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-gold-400">
                        <span>Privilege Discount</span>
                        <span className="font-mono">-{formatINR(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-mono text-cream-100">{formatINR(tax)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        Delivery & Packaging
                        {subtotal > 2000 && (
                          <span className="text-[10px] text-emerald-400 font-medium">(Complimentary)</span>
                        )}
                      </span>
                      <span className="font-mono text-cream-100">
                        {deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-cream-100 pt-2 border-t border-gold-500/20">
                      <span className="font-display tracking-wide">Total Amount</span>
                      <span className="font-mono text-gold-400 text-base">{formatINR(total)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold rounded-xl text-sm tracking-widest uppercase hover:brightness-110 shadow-xl shadow-gold-500/15 transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[10px] text-center text-cream-500 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    Complimentary white-glove packaging with each tasting order
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
