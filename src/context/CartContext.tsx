"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Dish } from "@/lib/types";
import { useToast } from "./ToastContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: Dish, quantity?: number, specialInstructions?: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  couponCode: string;
  discount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "noir_dining_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // LocalStorage unavailable
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, isInitialized]);

  const addToCart = (dish: Dish, quantity: number = 1, specialInstructions?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialInstructions: specialInstructions || updated[existingIndex].specialInstructions,
        };
        return updated;
      }
      return [...prev, { dish, quantity, specialInstructions }];
    });

    showToast(`Added to your order`, {
      type: "gold",
      description: `${quantity}x ${dish.name}`,
    });
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId));
    showToast("Item removed from order", { type: "info" });
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setDiscountPercent(0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === "NOIR10") {
      setCouponCode("NOIR10");
      setDiscountPercent(0.1);
      showToast("Promotion Applied!", {
        type: "success",
        description: "10% privilege discount applied to your order.",
      });
      return { success: true, message: "10% discount applied" };
    } else if (trimmed === "LUXURY20") {
      setCouponCode("LUXURY20");
      setDiscountPercent(0.2);
      showToast("VIP Promotion Applied!", {
        type: "success",
        description: "20% patron discount applied to your order.",
      });
      return { success: true, message: "20% VIP discount applied" };
    } else {
      showToast("Invalid code", {
        type: "info",
        description: "Please try code 'NOIR10' or 'LUXURY20'.",
      });
      return { success: false, message: "Invalid code. Use NOIR10 or LUXURY20" };
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountPercent);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.05); // 5% GST
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 2000 ? 0 : 150;
  const total = taxableAmount + tax + deliveryFee;
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        couponCode,
        discount,
        applyCoupon,
        removeCoupon,
        subtotal,
        tax,
        deliveryFee,
        total,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
