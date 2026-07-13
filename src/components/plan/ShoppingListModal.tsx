"use client";

import { useMemo } from "react";
import {
  Apple,
  ShoppingCart,
  CheckCheck,
  X,
} from "lucide-react";
import { fridgeStock, mealPrepRecipes } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { DayPlan } from "@/types";

interface ShoppingListModalProps {
  plan: DayPlan[];
  onClose: () => void;
}

const categoryOrder = ["Maso", "Zelenina", "Sýry", "Mléčné", "Suché", "Konzervy", "Omáčky", "Koření", "Oleje", "Pečivo", "Mražené", "Ovoce"];

const commonShoppingItems: { name: string; category: string }[] = [
  { name: "Mléko", category: "Mléčné" },
  { name: "Vejce", category: "Mléčné" },
  { name: "Máslo", category: "Mléčné" },
  { name: "Jogurt", category: "Mléčné" },
  { name: "Smetana", category: "Mléčné" },
  { name: "Sýr", category: "Sýry" },
  { name: "Mozzarella", category: "Sýry" },
  { name: "Kuřecí prsa", category: "Maso" },
  { name: "Mleté maso", category: "Maso" },
  { name: "Vepřová krkovice", category: "Maso" },
  { name: "Hovězí maso", category: "Maso" },
  { name: "Slanina", category: "Maso" },
  { name: "Brambory", category: "Zelenina" },
  { name: "Cibule", category: "Zelenina" },
  { name: "Česnek", category: "Zelenina" },
  { name: "Rajčata", category: "Zelenina" },
  { name: "Paprika", category: "Zelenina" },
  { name: "Mrkev", category: "Zelenina" },
  { name: "Celer", category: "Zelenina" },
  { name: "Petržel", category: "Zelenina" },
  { name: "Čínské zelí", category: "Zelenina" },
  { name: "Brokolice", category: "Zelenina" },
  { name: "Rýže", category: "Suché" },
  { name: "Těstoviny", category: "Suché" },
  { name: "Mouka", category: "Suché" },
  { name: "Cukr", category: "Suché" },
  { name: "Chléb", category: "Pečivo" },
  { name: "Rohlíky", category: "Pečivo" },
  { name: "Olej", category: "Oleje" },
  { name: "Sůl", category: "Koření" },
  { name: "Pepř", category: "Koření" },
  { name: "Sójová omáčka", category: "Omáčky" },
  { name: "Kečup", category: "Omáčky" },
  { name: "Rajčatový protlak", category: "Konzervy" },
  { name: "Kokosové mléko", category: "Konzervy" },
  { name: "Fazole", category: "Konzervy" },
  { name: "Kukuřice", category: "Konzervy" },
  { name: "Ananas", category: "Ovoce" },
  { name: "Citron", category: "Ovoce" },
  { name: "Česnek", category: "Zelenina" },
  { name: "Avokádo", category: "Zelenina" },
  { name: "Cuketa", category: "Zelenina" },
  { name: "Lilek", category: "Zelenina" },
  { name: "Žampiony", category: "Zelenina" },
  { name: "Jarní cibulka", category: "Zelenina" },
  { name: "Zázvor", category: "Zelenina" },
  { name: "Chilli", category: "Koření" },
  { name: "Sezamový olej", category: "Oleje" },
  { name: "Arašídy", category: "Suché" },
  { name: "Rýžový ocet", category: "Omáčky" },
  { name: "Tofu", category: "Suché" },
  { name: "Ramen nudle", category: "Suché" },
  { name: "Vaječné nudle", category: "Suché" },
  { name: "Nori plátky", category: "Suché" },
  { name: "Sushi rýže", category: "Suché" },
  { name: "Wonton těsto", category: "Suché" },
  { name: "Rýžový papír", category: "Suché" },
  { name: "Fazolové klíčky", category: "Zelenina" },
  { name: "Kachna", category: "Maso" },
  { name: "Quinoa", category: "Suché" },
  { name: "Ovesné vločky", category: "Suché" },
  { name: "Med", category: "Suché" },
  { name: "Tortilla placky", category: "Suché" },
  { name: "Kari pasta", category: "Omáčky" },
  { name: "Hoisin omáčka", category: "Omáčky" },
  { name: "Tacos skořápky", category: "Suché" },
];

function itemInFridge(name: string): boolean {
  const lower = name.toLowerCase();
  return fridgeStock.some(
    (f) => f.name.toLowerCase().includes(lower) || lower.includes(f.name.toLowerCase())
  );
}

export function ShoppingListModal({ plan, onClose }: ShoppingListModalProps) {
  const shoppingList = useMemo(() => {
    const needed = new Set<string>();
    const meals = plan.flatMap((d) => d.entries.map((e) => e.name));

    for (const mealName of meals) {
      const recipe = mealPrepRecipes.find((r) =>
        mealName.toLowerCase().includes(r.name.toLowerCase()) ||
        r.name.toLowerCase().includes(mealName.toLowerCase())
      );
      if (recipe) {
        for (const ing of recipe.ingredients) {
          const baseName = ing.name.split(",")[0].trim();
          needed.add(baseName);
        }
      } else {
        const match = commonShoppingItems.find((item) =>
          mealName.toLowerCase().includes(item.name.toLowerCase()) ||
          item.name.toLowerCase().includes(mealName.toLowerCase())
        );
        if (match) {
          needed.add(match.name);
        }
      }
    }

    const items = Array.from(needed)
      .filter((name) => !itemInFridge(name))
      .map((name) => {
        const match = commonShoppingItems.find((i) =>
          i.name.toLowerCase() === name.toLowerCase() ||
          name.toLowerCase().includes(i.name.toLowerCase())
        );
        return { name, category: match?.category ?? "Ostatní" };
      });

    items.sort((a, b) => {
      const ai = categoryOrder.indexOf(a.category);
      const bi = categoryOrder.indexOf(b.category);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

    return items;
  }, [plan]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof shoppingList>();
    for (const item of shoppingList) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return map;
  }, [shoppingList]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-[fadeIn_0.2s_ease-out] rounded-3xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Nákupní seznam</h2>
              <p className="text-sm text-stone-500">
                {shoppingList.length === 0
                  ? "Všechno máš doma!"
                  : `${shoppingList.length} věcí k dokoupení`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {shoppingList.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-5xl">🎉</div>
              <p className="text-lg font-semibold text-stone-700">Máš plnou ledničku!</p>
              <p className="mt-1 text-sm text-stone-400">Na všechny naplánovaná jídla máš suroviny doma.</p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
              >
                <span className="inline-flex items-center gap-2">
                  <CheckCheck className="h-4 w-4" />
                  Super, díky!
                </span>
              </button>
            </div>
          ) : (
            Array.from(grouped.entries()).map(([category, items]) => (
              <div key={category} className="mb-5 last:mb-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">{category}</p>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-2.5 text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 shrink-0 text-amber-500" />
                      <span className="text-stone-700">{item.name}</span>
                      <span className="ml-auto text-xs text-amber-500">chybí</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
