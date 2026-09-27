# NOIR — Modern Dining 🍷✨
> **Haute Gastronomy Web Application | PS-2 Engineering Project**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A premium, cinematic restaurant web application built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with an obsidian-charcoal luxury aesthetic, warm off-white editorial typography, and champagne gold accents.

---

## 🌟 Key Features

- **Cinematic Hero**: Full-viewport ambient backdrop with slow scale zoom, staggered line reveal (*"WHERE FLAVOR BECOMES EXPERIENCE"*), and dual luxury CTAs.
- **Atmospheric Storytelling**: Split editorial layout featuring Chef Kabir Sen's culinary philosophy, provenance details, and restaurant craft.
- **The Signatures**: 4 flagship creations with hover zoom, dietary classification pills, and direct order actions.
- **Categorized Tasting Menu (`/menu`)**: Live search across dish names and ingredients, category pills, pure veg / vegan / non-veg dietary filter, price ceiling slider, and sorting by popularity, price, or rating.
- **Dish Detail Modal**: Comprehensive gastronomic specifications, provenance, key ingredients list, beverage pairings, allergen warnings, calories, and quantity controls.
- **Slide-Over Cart Drawer**: Quantity steppers, coupon code engine (`NOIR10` for 10% off, `LUXURY20` for 20% off), 5% GST tax calculation, free delivery over ₹2,000, and checkout navigation.
- **Full Checkout Flow (`/checkout`)**: White-glove home delivery vs dine-in table service, patron contact validation, destination coordinates, and settlement options (UPI, Card, Pay at Table).
- **Live 5-Step Order Status Tracker (`/orders/[id]`)**: Animated status progression (*Confirmed* ➔ *Preparing* ➔ *Plated* ➔ *Delivering* ➔ *Delivered*) with an interactive **Evaluator Simulator** to test stages in real time.
- **Table Reservation Engine (`/reservations`)**: Date picker, guest count, dining salon selection (*Main Dining Room*, *Private Wine Cellar*, *Rooftop Terrace*, *Chef's Omakase Counter*), live time slot matrix with availability status, and booking confirmation with unique reference IDs.
- **AI Sommelier & Palate Concierge (`/mood`)**: Natural language craving interpreter ("*What are you in the mood for?*"). Parse budget limits, dietary preferences, and flavor profiles (spicy, truffle, smoky, sweet) with match score percentages and one-click add to cart.
- **User Dining Passport (`/profile`)**: VIP Grand Cru tier, loyalty points, past order history with tracking links, active table bookings, and saved favorite dishes.
- **Executive Admin Suite (`/admin`)**: Real-time KPI summary cards, weekly revenue velocity chart, live menu item CRUD (Add, Edit, Delete, Toggle stock), order status logistics controller, and table booking manager.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Typography**: Cormorant Garamond (Editorial Serif) & Plus Jakarta Sans
- **Animation System**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context with LocalStorage persistence
- **Backend Ready**: Modular service layer in `src/lib/ai-recommender.ts` with environment variable hooks (`NEXT_PUBLIC_AI_RECOMMENDER_API`) ready for FastAPI + PostgreSQL.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/noir-dining.git
   cd noir-dining
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev -- -p 3000
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm run start -- -p 3000
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Network Access (Testing on Mobile / Tablet)

To test the application on your mobile phone or tablet on the same Wi-Fi network:
```bash
npm run start -- -p 3000 -H 0.0.0.0
```
Then navigate to `http://<YOUR_LOCAL_IP>:3000` (e.g. `http://172.20.10.13:3000`) on your device.

---

## 📄 License & Credits
Built by **Ayush Pundir** for the **PS-2 Engineering Project**.
All rights reserved © 2026 NOIR Modern Dining.
