import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `NOIR-ORD-${random}`;
}

export function generateReservationId(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NOIR-RES-${random}`;
}

export function getEstimatedDeliveryTime(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 42);
  return now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
}
