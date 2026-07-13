export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  available: boolean;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  type: "dine-in" | "takeaway" | "delivery";
  createdAt: string;
  table?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  lastRestocked: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  shift: string;
  status: "active" | "off-duty" | "on-break";
  avatar: string;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface RevenuePoint {
  day: string;
  revenue: number;
  orders: number;
}

export interface MealEntry {
  id: string;
  name: string;
  type: "plan" | "craving";
}

export interface DayPlan {
  date: string;
  entries: MealEntry[];
}

export interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry?: string;
}

export interface PrepIngredient {
  name: string;
  amount: string;
}

export interface MealPrepRecipe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  prepTime: string;
  portions: number;
  ingredients: PrepIngredient[];
  steps: string[];
  category: "grilování" | "česká" | "italská" | "asijská" | "zdravá" | "snídaně" | "mexická" | "polévka" | "dezert" | "příloha";
}

export interface ShoppingItem {
  name: string;
  amount: string;
  needed: boolean;
  inFridge: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}
