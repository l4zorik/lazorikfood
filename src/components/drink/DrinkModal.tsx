"use client";

import { useState } from "react";
import { X, Wine, ChevronRight } from "lucide-react";
import { drinks, drinkCategories } from "@/lib/data";
import { formatCurrency, cn } from "@/lib/utils";
import type { Drink, DrinkCategory } from "@/types";

interface DrinkModalProps {
  onClose: () => void;
}

export function DrinkModal({ onClose }: DrinkModalProps) {
  const [activeCategory, setActiveCategory] = useState<DrinkCategory>("Bez alkoholu");

  const filtered = drinks.filter((d) => d.category === activeCategory && d.available);

  const categoryIcons: Record<DrinkCategory, string> = {
    "Bez alkoholu": "🧃",
    Ovocné: "🍓",
    Ledové: "🧊",
    Fresh: "🍊",
    "Top chuť": "⭐",
  };

  const categoryColors: Record<DrinkCategory, string> = {
    "Bez alkoholu": "bg-sky-50 text-sky-600",
    Ovocné: "bg-rose-50 text-rose-600",
    Ledové: "bg-cyan-50 text-cyan-600",
    Fresh: "bg-lime-50 text-lime-600",
    "Top chuť": "bg-amber-50 text-amber-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12 backdrop-blur-sm">
      <div className="w-full max-w-2xl animate-[fadeIn_0.2s_ease-out] rounded-3xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Wine className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Nápojový lístek</h2>
              <p className="text-sm text-stone-500">Nealkoholické nápoje, fresh & speciality</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap gap-2">
            {drinkCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition",
                  activeCategory === cat
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "border border-stone-200 bg-white text-stone-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                )}
              >
                <span>{categoryIcons[cat]}</span>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-stone-400">
                Žádné dostupné nápoje v této kategorii.
              </p>
            )}
            {filtered.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} categoryColors={categoryColors} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DrinkCard({
  drink,
  categoryColors,
}: {
  drink: Drink;
  categoryColors: Record<DrinkCategory, string>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:border-brand-200 hover:shadow-sm",
        expanded ? "border-brand-200" : ""
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-50 text-2xl">
          {drink.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-stone-900">{drink.name}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                categoryColors[drink.category]
              )}
            >
              {drink.category}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-stone-500">{drink.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-stone-900">{formatCurrency(drink.price)}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 text-stone-400 transition",
              expanded && "rotate-90"
            )}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-stone-100 px-5 py-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
            Složení
          </p>
          <div className="flex flex-wrap gap-1.5">
            {drink.ingredients.map((ing) => (
              <span
                key={ing}
                className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
