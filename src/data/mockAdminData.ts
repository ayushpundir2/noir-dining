import { Order, Reservation } from "@/lib/types";
import { initialDishes } from "./dishes";

export const initialOrders: Order[] = [
  {
    id: "NOIR-ORD-7K2X9",
    items: [
      { dish: initialDishes[0], quantity: 2 }, // Smoked Truffle Galouti
      { dish: initialDishes[5], quantity: 1 }, // 24-Hour Burrata Butter Chicken
      { dish: initialDishes[11], quantity: 2 }, // Truffle Kulcha
      { dish: initialDishes[18], quantity: 2 }, // Smoked Cardamom Old Fashioned
    ],
    subtotal: 3340,
    tax: 167,
    deliveryFee: 150,
    discount: 334,
    total: 3323,
    status: "delivering",
    type: "delivery",
    customer: {
      fullName: "Kabir Malhotra",
      email: "kabir.m@luxurydining.in",
      phone: "+91 98201 54932",
      address: "Penthouse 14B, The Imperial Towers, Altamount Road, Mumbai",
    },
    paymentMethod: "UPI",
    notes: "Please pack the truffles separately from warm gravy.",
    createdAt: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    estimatedDeliveryTime: "8:45 PM",
  },
  {
    id: "NOIR-ORD-4M8P1",
    items: [
      { dish: initialDishes[6], quantity: 1 }, // Morel Malai Kofta
      { dish: initialDishes[10], quantity: 1 }, // Dal NOIR
      { dish: initialDishes[12], quantity: 1 }, // Saffron Wild Rice
      { dish: initialDishes[15], quantity: 1 }, // Dark Chocolate Mousse
    ],
    subtotal: 2130,
    tax: 106,
    deliveryFee: 0,
    discount: 0,
    total: 2236,
    status: "preparing",
    type: "dine-in",
    customer: {
      fullName: "Ananya Deshmukh",
      email: "ananya.d@veritas.org",
      phone: "+91 98112 30491",
      tableNumber: "Table 7 (Wine Cellar)",
    },
    paymentMethod: "Card",
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
  },
  {
    id: "NOIR-ORD-9Q3W4",
    items: [
      { dish: initialDishes[7], quantity: 2 }, // Lamb Shank Rogan Josh
      { dish: initialDishes[14], quantity: 4 }, // Laccha Paratha
      { dish: initialDishes[16], quantity: 2 }, // Rose Rasmalai Tres Leches
    ],
    subtotal: 3480,
    tax: 174,
    deliveryFee: 0,
    discount: 350,
    total: 3304,
    status: "delivered",
    type: "dine-in",
    customer: {
      fullName: "Devraj Singhania",
      email: "devraj@singhaniagroup.com",
      phone: "+91 98700 81234",
      tableNumber: "Chef's Counter 2",
    },
    paymentMethod: "Card",
    createdAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
  },
];

export const initialReservations: Reservation[] = [
  {
    id: "NOIR-RES-8492",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    timeSlot: "08:30 PM",
    guests: 4,
    seatingArea: "Private Wine Cellar",
    customerName: "Aarav Oberoi",
    email: "aarav.oberoi@prestige.com",
    phone: "+91 99887 66554",
    specialRequests: "Celebrating 10th wedding anniversary. Kindly chill a vintage bottle of Dom Pérignon.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "NOIR-RES-3195",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "09:15 PM",
    guests: 2,
    seatingArea: "Chef's Omakase Counter",
    customerName: "Sunidhi Mathur",
    email: "sunidhi.m@artisan.co",
    phone: "+91 98334 11223",
    specialRequests: "One guest has mild crustacean allergy.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "NOIR-RES-5201",
    date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    timeSlot: "01:15 PM",
    guests: 6,
    seatingArea: "Main Dining Room",
    customerName: "Dr. Vikram Seth",
    email: "vikram.seth@metrohealth.in",
    phone: "+91 99100 44556",
    specialRequests: "Quiet corner table requested for business discussions.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];
