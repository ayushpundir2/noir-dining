"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, Utensils, CreditCard, QrCode, Banknote, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRestaurant } from "@/context/RestaurantContext";
import { useToast } from "@/context/ToastContext";
import { formatINR } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, deliveryFee, discount, total, clearCart } = useCart();
  const { createOrder } = useRestaurant();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<"delivery" | "dine-in">("delivery");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("Table 4 (Main Hall)");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Card" | "Pay on Delivery/At Table">("UPI");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-noir-black pt-36 pb-24 text-cream-200 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#121217] border border-gold-500/20">
          <ShoppingBag className="w-12 h-12 text-cream-500 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-cream-100 mb-2">Your Tasting Bag is Empty</h2>
          <p className="text-xs text-cream-400 mb-6 leading-relaxed">
            Please select your desired creations from our tasting menu before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black text-xs font-semibold uppercase tracking-widest hover:brightness-110 transition-all"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      showToast("Please complete your contact details", { type: "info" });
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      showToast("Please provide your delivery address", { type: "info" });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items,
        subtotal,
        tax,
        deliveryFee: orderType === "dine-in" ? 0 : deliveryFee,
        discount,
        total: orderType === "dine-in" ? subtotal + tax - discount : total,
        type: orderType,
        customer: {
          fullName,
          email,
          phone,
          address: orderType === "delivery" ? address : undefined,
          tableNumber: orderType === "dine-in" ? tableNumber : undefined,
        },
        paymentMethod,
        notes: notes.trim() || undefined,
      });

      clearCart();
      showToast("Order Confirmed & Placed in Kitchen!", {
        type: "success",
        description: `Order ${order.id} is being curated.`,
      });

      router.push(`/orders/${order.id}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-[0.3em] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Order Desk</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-cream-100 font-light">
            CHECKOUT & ATELIER DETAILS
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Form: Details & Settings */}
          <div className="lg:col-span-7 space-y-8">
            {/* Dining Mode Selection */}
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                01. Dining Service Mode
              </span>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                    orderType === "delivery"
                      ? "bg-gold-500/15 border-gold-500 text-gold-300 shadow-md shadow-gold-500/10"
                      : "bg-[#18181f] border-gold-500/15 text-cream-400 hover:border-gold-500/30"
                  }`}
                >
                  <Truck className="w-5 h-5 text-gold-400" />
                  <span className="text-xs font-semibold">White-Glove Delivery</span>
                  <span className="text-[10px] text-cream-500">Curated thermal packaging</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("dine-in")}
                  className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                    orderType === "dine-in"
                      ? "bg-gold-500/15 border-gold-500 text-gold-300 shadow-md shadow-gold-500/10"
                      : "bg-[#18181f] border-gold-500/15 text-cream-400 hover:border-gold-500/30"
                  }`}
                >
                  <Utensils className="w-5 h-5 text-gold-400" />
                  <span className="text-xs font-semibold">Dine-In / Table Service</span>
                  <span className="text-[10px] text-cream-500">Plated directly to table</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                02. Patron Credentials
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Advait Singhania"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="advait@luxury.in"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98201 00000"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Address or Table Selection */}
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                03. Destination Specification
              </span>

              {orderType === "delivery" ? (
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Complete Delivery Address & Landmark *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Suite 902, Bayview Crest, Sea Face Road, Worli, Mumbai"
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400 leading-relaxed"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                    Assigned Table or Seating Area
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-200 focus:outline-none focus:border-gold-400"
                  >
                    <option value="Table 4 (Main Hall)">Table 4 — Main Dining Hall</option>
                    <option value="Table 7 (Wine Cellar)">Table 7 — Private Wine Cellar</option>
                    <option value="Chef's Counter 2">Chef's Omakase Counter 2</option>
                    <option value="Terrace Table 12">Terrace Table 12 (Starlit)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-[11px] uppercase tracking-wider text-cream-400 block mb-1.5 font-medium">
                  Chef Preparation Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Mild spice on curries, warm sauces separately, extra cutlery"
                  className="w-full px-4 py-2.5 bg-[#18181f] border border-gold-500/20 rounded-xl text-xs text-cream-100 placeholder-cream-600 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                04. Settlement Instrument
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "UPI", label: "Instant UPI", icon: QrCode, desc: "GPay / PhonePe / Paytm" },
                  { id: "Card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa / Amex / Mastercard" },
                  {
                    id: "Pay on Delivery/At Table",
                    label: orderType === "delivery" ? "Pay on Delivery" : "Pay at Table",
                    icon: Banknote,
                    desc: "Cash or Mobile Card POS",
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all ${
                      paymentMethod === m.id
                        ? "bg-gold-500/15 border-gold-500 text-gold-300 shadow-md shadow-gold-500/10"
                        : "bg-[#18181f] border-gold-500/15 text-cream-400 hover:border-gold-500/30"
                    }`}
                  >
                    <m.icon className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-xs font-semibold text-cream-100">{m.label}</p>
                      <p className="text-[10px] text-cream-500 mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Authorization */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#121217] border border-gold-500/25 p-6 sticky top-28 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
                <h3 className="font-display text-xl text-cream-100 font-semibold">Order Summary</h3>
                <span className="text-xs text-gold-400">{items.length} dishes</span>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {items.map((item) => (
                  <div key={item.dish.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0 border border-gold-500/20">
                        <Image
                          src={item.dish.image}
                          alt={item.dish.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-cream-100 font-medium truncate">{item.dish.name}</p>
                        <p className="text-cream-500 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono text-gold-400 shrink-0 font-medium">
                      {formatINR(item.dish.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="border-t border-white/5 pt-4 space-y-2 text-xs text-cream-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-cream-100">{formatINR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-gold-400">
                    <span>Privilege Promo Discount</span>
                    <span className="font-mono">-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-cream-100">{formatINR(tax)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery & Packaging</span>
                  <span className="font-mono text-cream-100">
                    {orderType === "dine-in" || deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-cream-100 pt-3 border-t border-gold-500/25">
                  <span className="font-display tracking-wide">Final Payable</span>
                  <span className="font-mono text-gold-400 text-lg">
                    {formatINR(orderType === "dine-in" ? subtotal + tax - discount : total)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl shadow-gold-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize Order</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-cream-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>256-bit Encrypted Culinary Transaction</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
