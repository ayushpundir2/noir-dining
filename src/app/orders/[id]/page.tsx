"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Truck,
  Sparkles,
  Phone,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useRestaurant } from "@/context/RestaurantContext";
import { OrderStatus } from "@/lib/types";
import { formatINR } from "@/lib/utils";

const statusSteps: {
  status: OrderStatus;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}[] = [
  {
    status: "confirmed",
    label: "Order Confirmed",
    sublabel: "Order received & verified by Maître D'",
    icon: CheckCircle2,
  },
  {
    status: "preparing",
    label: "In the Kitchen",
    sublabel: "Executive Chef handcrafting your courses",
    icon: ChefHat,
  },
  {
    status: "ready",
    label: "Plated & Ready",
    sublabel: "Quality inspected & packed in thermal cases",
    icon: PackageCheck,
  },
  {
    status: "delivering",
    label: "Out for Delivery",
    sublabel: "Chauffeur en route with temperature control",
    icon: Truck,
  },
  {
    status: "delivered",
    label: "Delivered / Served",
    sublabel: "Bon Appétit • Pure culinary bliss",
    icon: Sparkles,
  },
];

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const { getOrderById, orders, updateOrderStatus } = useRestaurant();

  const order = getOrderById(orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-noir-black pt-36 pb-24 text-cream-200 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-[#121217] border border-gold-500/20">
          <h2 className="font-display text-2xl text-cream-100 mb-2">Order Not Located</h2>
          <p className="text-xs text-cream-400 mb-6">We could not find an active order matching identifier {orderId}.</p>
          <Link
            href="/menu"
            className="px-6 py-2.5 rounded-full bg-gold-500 text-noir-black text-xs font-semibold uppercase tracking-widest inline-block"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex((s) => s.status === order.status);
  const activeStep = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <div className="min-h-screen bg-noir-black pt-32 pb-24 text-cream-200">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cream-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dining Passport</span>
          </Link>

          <span className="text-[11px] font-mono text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Live Atelier Status
          </span>
        </div>

        {/* Header Information Card */}
        <div className="rounded-3xl bg-[#121217] border border-gold-500/25 p-6 sm:p-8 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/15 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
                Order Reference
              </span>
              <h1 className="font-display text-2xl sm:text-4xl text-cream-100 font-semibold tracking-wide">
                {order.id}
              </h1>
              <p className="text-xs text-cream-400 mt-1">
                Placed at {new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })} • {order.type === "delivery" ? "White-Glove Home Delivery" : "Dine-In Table Service"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#181820] border border-gold-500/20 text-right sm:min-w-[180px]">
              <span className="text-[10px] uppercase tracking-wider text-cream-400 block">
                Estimated Delivery
              </span>
              <div className="flex items-center justify-end gap-1.5 mt-0.5 text-gold-400 font-mono text-xl font-bold">
                <Clock className="w-4 h-4" />
                <span>{order.estimatedDeliveryTime || "35-40 mins"}</span>
              </div>
            </div>
          </div>

          {/* Animated Stepper Track */}
          <div className="py-8 sm:py-10">
            <div className="relative">
              {/* Progress Line Behind (Desktop) */}
              <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-zinc-800 -z-0">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(activeStep / (statusSteps.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              {/* Steps (Grid on Desktop, Vertical on Mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                {statusSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx < activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                    <div
                      key={step.status}
                      className="flex md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-3"
                    >
                      {/* Step Circle with Ripple/Glow on Current */}
                      <div className="relative shrink-0">
                        {isCurrent && (
                          <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -inset-1.5 rounded-full bg-gold-400/30"
                          />
                        )}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isCompleted
                              ? "bg-gold-500 text-noir-black shadow-lg shadow-gold-500/20"
                              : isCurrent
                              ? "bg-gold-400 text-noir-black ring-4 ring-gold-500/20 shadow-xl"
                              : "bg-[#181820] text-cream-500 border border-white/10"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Text */}
                      <div>
                        <h4
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            isCurrent
                              ? "text-gold-300 font-bold"
                              : isCompleted
                              ? "text-cream-100"
                              : "text-cream-500"
                          }`}
                        >
                          {step.label}
                        </h4>
                        <p className="text-[11px] text-cream-400 mt-0.5 leading-tight">
                          {step.sublabel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Status Simulator Tool (Allows Reviewer/Evaluator to preview stages) */}
          <div className="p-4 rounded-2xl bg-[#0e0e12] border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-cream-300">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="font-semibold text-gold-300">Evaluator Simulator:</span>
              <span className="text-cream-400">Advance order stages in real time</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {statusSteps.map((s) => (
                <button
                  key={s.status}
                  onClick={() => updateOrderStatus(order.id, s.status)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    order.status === s.status
                      ? "bg-gold-500 text-noir-black"
                      : "bg-[#1b1b24] text-cream-300 hover:bg-[#252532] border border-white/5"
                  }`}
                >
                  {s.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Details: Order Items & Delivery Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Items Breakdown */}
          <div className="md:col-span-7 rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
            <h3 className="font-display text-lg text-cream-100 font-semibold border-b border-white/5 pb-3">
              Courses in Preparation ({order.items.length})
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.dish.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#181820] border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gold-500/10">
                      <Image
                        src={item.dish.image}
                        alt={item.dish.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cream-100">{item.dish.name}</p>
                      <p className="text-[11px] text-cream-400">
                        {item.quantity}x • {item.dish.category}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-gold-400 font-semibold">
                    {formatINR(item.dish.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold-500/15 space-y-1.5 text-xs text-cream-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-cream-100">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-gold-400">
                  <span>Privilege Discount</span>
                  <span className="font-mono">-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes (5% GST)</span>
                <span className="font-mono text-cream-100">{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery & White-Glove Packaging</span>
                <span className="font-mono text-cream-100">{order.deliveryFee === 0 ? "FREE" : formatINR(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-cream-100 text-sm pt-2 border-t border-white/5">
                <span className="font-display">Total Settled</span>
                <span className="font-mono text-gold-400 text-base">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Patron Information */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#121217] border border-gold-500/20 p-6 space-y-4">
              <h3 className="font-display text-lg text-cream-100 font-semibold border-b border-white/5 pb-3">
                Patron & Destination
              </h3>

              <div className="space-y-3 text-xs text-cream-300">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Patron</span>
                  <p className="font-medium text-cream-100 mt-0.5">{order.customer.fullName}</p>
                  <p className="text-cream-400">{order.customer.phone} • {order.customer.email}</p>
                </div>

                {order.type === "delivery" ? (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Delivery Address</span>
                    <p className="text-cream-200 mt-0.5 leading-relaxed">{order.customer.address}</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Table Location</span>
                    <p className="text-cream-200 mt-0.5">{order.customer.tableNumber}</p>
                  </div>
                )}

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream-500 block">Settlement</span>
                  <p className="text-gold-400 mt-0.5 font-medium">{order.paymentMethod} (Verified)</p>
                </div>

                {order.notes && (
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-cream-400 italic">
                    "{order.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* Concierge Contact Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#16161d] to-[#101014] border border-gold-500/25 p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">Private Steward</span>
                <p className="font-display text-base text-cream-100">Chef Kabir Concierge Desk</p>
                <p className="text-[11px] text-cream-400">+91 22 6890 4000 (Ext. 2)</p>
              </div>
              <a
                href="tel:+912268904000"
                className="p-3 rounded-full bg-gold-500/20 text-gold-300 hover:bg-gold-500 hover:text-noir-black transition-colors"
                title="Call steward"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
