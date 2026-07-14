"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { DrinkModal } from "@/components/drink/DrinkModal";
import { menuItems, categories } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import { Plus, Search, Wine } from "lucide-react";

export default function MenuPage() {
  const [showDrinks, setShowDrinks] = useState(false);

  return (
    <>
      <Header title="Menu" subtitle="Správa jídelního lístku a cen" />

      <div className="space-y-6 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition",
                  i === 0
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "border border-stone-200 text-stone-600 hover:bg-stone-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Hledat v menu..."
                className="rounded-xl border border-stone-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button
              onClick={() => setShowDrinks(true)}
              className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600"
            >
              <Wine className="h-4 w-4" />
              Nápoje
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600">
              <Plus className="h-4 w-4" />
              Přidat položku
            </button>
          </div>
        </div>

        {showDrinks && <DrinkModal onClose={() => setShowDrinks(false)} />}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md",
                !item.available && "opacity-60"
              )}
            >
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-5xl">
                {item.image}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-stone-900">{item.name}</h3>
                    <p className="text-xs text-stone-400">{item.category}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      item.available ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                    )}
                  >
                    {item.available ? "Dostupné" : "Vyprodáno"}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-stone-500">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-stone-900">{formatCurrency(item.price)}</p>
                    <p className="text-xs text-stone-400">
                      Náklad: {formatCurrency(item.cost)} · Marže{" "}
                      {Math.round(((item.price - item.cost) / item.price) * 100)}%
                    </p>
                  </div>
                  <button className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 transition group-hover:border-brand-300 group-hover:text-brand-600">
                    Upravit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
