export type DishCategory = 
  | "Starters" 
  | "Mains" 
  | "Breads" 
  | "Desserts" 
  | "Beverages";

export type DietaryType = "veg" | "non-veg" | "vegan";

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  price: number; // in INR
  vegType: DietaryType;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription: string;
  image: string;
  isSignature: boolean;
  spiceLevel: 0 | 1 | 2 | 3; // 0 = mild/none, 3 = high
  calories: number;
  preparationTimeMinutes: number;
  ingredients: string[];
  allergens: string[];
  pairingRecommendation?: string;
  isAvailable: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 
  | "confirmed" 
  | "preparing" 
  | "ready" 
  | "delivering" 
  | "delivered"
  | "cancelled";

export type OrderType = "delivery" | "dine-in";

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  tableNumber?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number; // 5% GST
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  type: OrderType;
  customer: OrderCustomer;
  paymentMethod: "UPI" | "Card" | "Pay on Delivery/At Table";
  notes?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
}

export interface Reservation {
  id: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: "Main Dining Room" | "Private Wine Cellar" | "Rooftop Terrace" | "Chef's Omakase Counter";
  customerName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: "confirmed" | "seated" | "completed" | "cancelled";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface MoodRecommendation {
  dish: Dish;
  matchScore: number; // e.g. 96
  matchReason: string;
  matchedTags: string[];
}
