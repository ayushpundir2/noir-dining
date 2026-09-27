export interface TimeSlot {
  time: string;
  period: "lunch" | "dinner";
  status: "available" | "limited" | "booked";
  remainingTables: number;
}

export const availableTimeSlots: TimeSlot[] = [
  // Lunch
  { time: "12:30 PM", period: "lunch", status: "available", remainingTables: 5 },
  { time: "01:15 PM", period: "lunch", status: "available", remainingTables: 3 },
  { time: "02:00 PM", period: "lunch", status: "limited", remainingTables: 1 },
  { time: "02:45 PM", period: "lunch", status: "available", remainingTables: 4 },

  // Dinner
  { time: "07:00 PM", period: "dinner", status: "limited", remainingTables: 2 },
  { time: "07:45 PM", period: "dinner", status: "booked", remainingTables: 0 },
  { time: "08:30 PM", period: "dinner", status: "limited", remainingTables: 1 },
  { time: "09:15 PM", period: "dinner", status: "available", remainingTables: 4 },
  { time: "10:00 PM", period: "dinner", status: "available", remainingTables: 6 },
];

export const seatingAreas = [
  {
    name: "Main Dining Room",
    description: "Intimate low-lit banquettes surrounded by curated stone sculptures and candlelight.",
    surcharge: 0,
    minGuests: 1,
    maxGuests: 6,
    badge: "Signature Ambiance",
  },
  {
    name: "Private Wine Cellar",
    description: "Surrounded by 1,200 curated vintage bottles, mahogany dining table with dedicated sommelier.",
    surcharge: 500,
    minGuests: 4,
    maxGuests: 12,
    badge: "Exclusive & Private",
  },
  {
    name: "Rooftop Terrace",
    description: "Open-air starlit dining overlooking the city skyline, gentle breeze, and ambient hearths.",
    surcharge: 250,
    minGuests: 2,
    maxGuests: 8,
    badge: "Starlit Skyline",
  },
  {
    name: "Chef's Omakase Counter",
    description: "Front-row interactive seating directly facing Executive Chef plating stations.",
    surcharge: 750,
    minGuests: 1,
    maxGuests: 4,
    badge: "Direct Chef Interaction",
  },
] as const;
