"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Dish, Order, OrderStatus, Reservation } from "@/lib/types";
import { initialDishes } from "@/data/dishes";
import { initialOrders, initialReservations } from "@/data/mockAdminData";
import { generateOrderId, generateReservationId, getEstimatedDeliveryTime } from "@/lib/utils";
import { useToast } from "./ToastContext";

interface RestaurantContextType {
  dishes: Dish[];
  addDish: (dish: Omit<Dish, "id">) => Dish;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  toggleDishAvailability: (id: string) => void;
  
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "status">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;

  reservations: Reservation[];
  createReservation: (resData: Omit<Reservation, "id" | "createdAt" | "status">) => Reservation;
  updateReservationStatus: (resId: string, status: Reservation["status"]) => void;

  favorites: string[];
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const DISHES_KEY = "noir_dining_dishes_v1";
const ORDERS_KEY = "noir_dining_orders_v1";
const RESERVATIONS_KEY = "noir_dining_reservations_v1";
const FAVORITES_KEY = "noir_dining_favorites_v1";

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [favorites, setFavorites] = useState<string[]>(["dish-1", "dish-6", "dish-16"]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage
  useEffect(() => {
    try {
      const storedDishes = localStorage.getItem(DISHES_KEY);
      if (storedDishes) setDishes(JSON.parse(storedDishes));

      const storedOrders = localStorage.getItem(ORDERS_KEY);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedRes = localStorage.getItem(RESERVATIONS_KEY);
      if (storedRes) setReservations(JSON.parse(storedRes));

      const storedFav = localStorage.getItem(FAVORITES_KEY);
      if (storedFav) setFavorites(JSON.parse(storedFav));
    } catch {
      // Ignore
    }
    setIsInitialized(true);
  }, []);

  // Save changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(DISHES_KEY, JSON.stringify(dishes));
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore
    }
  }, [dishes, orders, reservations, favorites, isInitialized]);

  // Dish Operations
  const addDish = (dishData: Omit<Dish, "id">): Dish => {
    const newDish: Dish = {
      ...dishData,
      id: `dish-${Date.now()}`,
    };
    setDishes((prev) => [newDish, ...prev]);
    showToast("Culinary Creation Added", {
      type: "success",
      description: `${newDish.name} is now live on the menu.`,
    });
    return newDish;
  };

  const updateDish = (updatedDish: Dish) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === updatedDish.id ? updatedDish : d))
    );
    showToast("Dish Updated", {
      type: "success",
      description: `${updatedDish.name} specifications have been saved.`,
    });
  };

  const deleteDish = (id: string) => {
    const dishToDelete = dishes.find((d) => d.id === id);
    setDishes((prev) => prev.filter((d) => d.id !== id));
    showToast("Dish Removed", {
      type: "info",
      description: `${dishToDelete?.name || "Dish"} removed from culinary list.`,
    });
  };

  const toggleDishAvailability = (id: string) => {
    setDishes((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, isAvailable: !d.isAvailable } : d
      )
    );
  };

  // Order Operations
  const createOrder = (orderData: Omit<Order, "id" | "createdAt" | "status">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: getEstimatedDeliveryTime(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast("Order Status Updated", {
      type: "gold",
      description: `Order ${orderId} is now ${status.toUpperCase()}.`,
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  // Reservation Operations
  const createReservation = (
    resData: Omit<Reservation, "id" | "createdAt" | "status">
  ): Reservation => {
    const newReservation: Reservation = {
      ...resData,
      id: generateReservationId(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (resId: string, status: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status } : r))
    );
    showToast("Reservation Updated", {
      type: "gold",
      description: `Table booking ${resId} status set to ${status}.`,
    });
  };

  // Favorites Operations
  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(dishId);
      if (exists) {
        showToast("Removed from wishlist", { type: "info" });
        return prev.filter((id) => id !== dishId);
      } else {
        showToast("Saved to favorites", { type: "gold" });
        return [...prev, dishId];
      }
    });
  };

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  return (
    <RestaurantContext.Provider
      value={{
        dishes,
        addDish,
        updateDish,
        deleteDish,
        toggleDishAvailability,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        reservations,
        createReservation,
        updateReservationStatus,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
