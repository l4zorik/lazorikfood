"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Newspaper,
  Package,
  Settings,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";

const iconMap = {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  CalendarDays,
  Newspaper,
  Package,
  Users,
  BarChart3,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-stone-200 bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-stone-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
          <ChefHat className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-stone-900">FoodHub</h1>
          <p className="text-xs text-stone-500">by Lazorik</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-brand-50 text-brand-700 shadow-sm"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-brand-600" : "text-stone-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-200 p-4">
        <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 p-4 text-white">
          <p className="text-sm font-semibold">Pro plán</p>
          <p className="mt-1 text-xs text-brand-100">Rozšířená analytika a více poboček</p>
          <button className="mt-3 w-full rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur transition hover:bg-white/30">
            Upgradovat
          </button>
        </div>
      </div>
    </aside>
  );
}
