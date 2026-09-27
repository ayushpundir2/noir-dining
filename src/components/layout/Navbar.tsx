"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu as MenuIcon, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/mood", label: "AI Sommelier", isAi: true },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#09090b]/92 backdrop-blur-md border-b border-gold-500/15 py-3.5 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.25em] text-cream-100 font-semibold transition-colors group-hover:text-gold-300">
              NOIR
            </span>
            <span className="text-[9px] tracking-[0.35em] text-gold-500 uppercase transition-colors group-hover:text-gold-200">
              Modern Dining
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-gold-300 flex items-center gap-1.5 ${
                    isActive ? "text-gold-400" : "text-cream-300"
                  }`}
                >
                  {link.isAi && <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Cart, Profile, Reserve CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Trigger */}
            <button
              onClick={openCart}
              aria-label="View shopping bag"
              className="relative p-2.5 rounded-full text-cream-200 hover:text-gold-300 hover:bg-white/5 border border-gold-500/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-gold-400 text-noir-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/30">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Profile Link */}
            <Link
              href="/profile"
              aria-label="User dining passport"
              className="p-2.5 rounded-full text-cream-200 hover:text-gold-300 hover:bg-white/5 border border-gold-500/20 transition-all hidden sm:flex items-center justify-center"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
            </Link>

            {/* Reserve CTA Button */}
            <Link
              href="/reservations"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-noir-black hover:brightness-110 shadow-lg shadow-gold-500/15 transition-all"
            >
              Reserve Table
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-lg text-cream-200 hover:text-gold-400 border border-gold-500/20 bg-noir-card md:hidden"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
