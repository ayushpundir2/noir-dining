"use client";

import React from "react";
import { ToastProvider } from "./ToastContext";
import { RestaurantProvider } from "./RestaurantContext";
import { CartProvider } from "./CartContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <RestaurantProvider>
        <CartProvider>{children}</CartProvider>
      </RestaurantProvider>
    </ToastProvider>
  );
}
