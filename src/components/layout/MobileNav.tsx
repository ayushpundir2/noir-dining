"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, UtensilsCrossed, Calendar, ShoppingBag, User, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { totalItemCount, openCart } = useCart();

  const navLinks = [
    { href: "/", label: "Home", icon: UtensilsCrossed },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/reservations", label: "Reservations", icon: Calendar },
    { href: "/mood", label: "AI Sommelier", icon: Sparkles, badge: "AI" },
    { href: "/profile", label: "My Passport", icon: User },
    { href: "/admin", label: "Admin Suite", icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-6 lg:hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-5">
            <Link href="/" onClick={onClose} className="flex flex-col">
              <span className="font-display text-2xl tracking-[0.25em] text-cream-100 font-semibold">
                NOIR
              </span>
              <span className="text-[9px] tracking-[0.3em] text-gold-400 uppercase">
                Modern Dining
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-2 text-cream-300 hover:text-gold-400 rounded-full border border-gold-500/20 bg-noir-card"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 py-8">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-gold-500/10 text-gold-400 border border-gold-500/30"
                        : "text-cream-200 hover:text-gold-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-gold-400" />
                      <span className="font-display text-xl tracking-wider">{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] tracking-widest uppercase bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded border border-gold-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 pt-6 border-t border-gold-500/20">
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-noir-card border border-gold-500/30 text-cream-100 rounded-xl hover:border-gold-400 transition-all font-medium text-sm"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>View Order Cart</span>
              {totalItemCount > 0 && (
                <span className="bg-gold-500 text-noir-black text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                  {totalItemCount}
                </span>
              )}
            </button>

            <Link
              href="/reservations"
              onClick={onClose}
              className="w-full text-center py-3.5 px-4 bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black font-semibold rounded-xl text-sm tracking-widest uppercase hover:brightness-110 shadow-lg shadow-gold-500/20 transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
