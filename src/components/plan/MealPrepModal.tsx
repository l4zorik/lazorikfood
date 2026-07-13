"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChefHat,
  Clock,
  Flame,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { fridgeStock, mealPrepRecipes } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { MealPrepRecipe } from "@/types";

const dayLabels = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const monthNames = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];

interface MealPrepModalProps {
  onApply: (recipe: MealPrepRecipe, days: string[]) => void;
  onClose: () => void;
}

function getWeekDates(): string[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${dayLabels[(d.getDay() + 6) % 7]} ${d.getDate()}. ${monthNames[d.getMonth()]}`;
}

function checkFridge(ingredientName: string): { inStock: boolean; item?: { name: string; quantity: number; unit: string } } {
  const match = fridgeStock.find(
    (f) => ingredientName.toLowerCase().includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(ingredientName.toLowerCase())
  );
  if (match && match.quantity > 0) {
    return { inStock: true, item: match };
  }
  return { inStock: false };
}

const recipeCategories = [
  { id: "all", label: "Vše", emoji: "🍽️" },
  { id: "grilování", label: "Grilování", emoji: "🥩" },
  { id: "asijská", label: "Asijská", emoji: "🥡" },
  { id: "česká", label: "Česká", emoji: "🥘" },
  { id: "italská", label: "Italská", emoji: "🍝" },
  { id: "zdravá", label: "Zdravá", emoji: "🥗" },
  { id: "mexická", label: "Mexická", emoji: "🌮" },
  { id: "polévka", label: "Polévky", emoji: "🥣" },
  { id: "snídaně", label: "Snídaně", emoji: "🍳" },
];

export function MealPrepModal({ onApply, onClose }: MealPrepModalProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<MealPrepRecipe | null>(null);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<"select" | "days" | "done">("select");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const weekDates = getWeekDates();

  const filteredRecipes = useMemo(() => {
    if (categoryFilter === "all") return mealPrepRecipes;
    return mealPrepRecipes.filter((r) => r.category === categoryFilter);
  }, [categoryFilter]);

  function handleSelectRecipe(recipe: MealPrepRecipe) {
    setSelectedRecipe(recipe);
    setStep("days");
  }

  function toggleDay(date: string) {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  }

  function handleApply() {
    if (!selectedRecipe) return;
    onApply(selectedRecipe, Array.from(selectedDays));
    setStep("done");
  }

  function reset() {
    setSelectedRecipe(null);
    setSelectedDays(new Set());
    setStep("select");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12 backdrop-blur-sm">
      <div className="w-full max-w-2xl animate-[fadeIn_0.2s_ease-out] rounded-3xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <ChefHat className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Meal Prep</h2>
              <p className="text-sm text-stone-500">Připrav jídlo na celý týden najednou</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "select" && (
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {/* Category filter */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
              {recipeCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                    categoryFilter === cat.id
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700",
                  )}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  {cat.id !== "all" && (
                    <span className="ml-0.5 opacity-50">
                      {mealPrepRecipes.filter((r) => r.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <p className="mb-3 text-xs text-stone-400">
              {categoryFilter === "all"
                ? `${mealPrepRecipes.length} receptů`
                : `${filteredRecipes.length} receptů v kategorii`}
            </p>

            <div className="grid gap-4">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                  className="group rounded-2xl border border-stone-200 bg-stone-50/50 p-5 text-left transition-all hover:border-brand-200 hover:bg-brand-50/50 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-3xl">{recipe.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-stone-900 group-hover:text-brand-700">{recipe.name}</h3>
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                          <Check className="h-3.5 w-3.5" />
                          Vybrat
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">{recipe.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {recipe.prepTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {recipe.portions} porcí
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5" />
                          {recipe.steps.length} kroků
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {recipe.ingredients.map((ing) => {
                          const { inStock } = checkFridge(ing.name);
                          return (
                            <span
                              key={ing.name}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs",
                                inStock
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-amber-50 text-amber-600",
                              )}
                            >
                              {inStock ? "✅" : "🛒"} {ing.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "days" && selectedRecipe && (
          <div className="max-h-[60vh] overflow-y-auto p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedRecipe.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">{selectedRecipe.name}</h3>
                  <p className="text-sm text-stone-500">{selectedRecipe.portions} porcí · {selectedRecipe.prepTime}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-stone-50 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Ingredience</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {selectedRecipe.ingredients.map((ing) => {
                    const { inStock } = checkFridge(ing.name);
                    return (
                      <div key={ing.name} className="flex items-center justify-between text-sm">
                        <span className="text-stone-600">{ing.name}</span>
                        <span className={cn("text-xs", inStock ? "text-emerald-500" : "text-amber-500")}>
                          {inStock ? "✅" : "🛒"} {ing.amount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium text-stone-500 hover:text-stone-700">Postup</summary>
                <ol className="mt-2 space-y-1.5 pl-5">
                  {selectedRecipe.steps.map((step, i) => (
                    <li key={i} className="text-sm text-stone-600 list-decimal">{step}</li>
                  ))}
                </ol>
              </details>
            </div>

            <p className="mb-3 text-sm font-semibold text-stone-700">
              Rozdistribuovat na dny:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {weekDates.map((date) => {
                const isSelected = selectedDays.has(date);
                const dayCount = Array.from(selectedDays).length;
                return (
                  <button
                    key={date}
                    onClick={() => toggleDay(date)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-sm transition-all",
                      isSelected
                        ? "border-brand-300 bg-brand-50 text-brand-700 shadow-sm"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{formatDateLabel(date)}</span>
                      {isSelected && <Check className="h-4 w-4 text-brand-500" />}
                    </div>
                    {isSelected && (
                      <p className="mt-0.5 text-xs text-brand-400">
                        {(selectedRecipe.portions / Math.max(dayCount, 1)).toFixed(0)} porcí
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep("select")}
                className="rounded-xl border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
              >
                Zpět
              </button>
              <button
                onClick={handleApply}
                disabled={selectedDays.size === 0}
                className="flex-1 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 disabled:opacity-40"
              >
                {selectedDays.size === 0
                  ? "Vyber alespoň jeden den"
                  : `Připravit pro ${selectedDays.size} dní`}
              </button>
            </div>
          </div>
        )}

        {step === "done" && selectedRecipe && (
          <div className="p-12 text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <h3 className="text-xl font-bold text-stone-900">Hotovo!</h3>
            <p className="mt-2 text-stone-500">
              {selectedRecipe.name} bude na{" "}
              {selectedDays.size} dní. Stačí uvařit a ohřívat.
            </p>
            <p className="mt-1 text-sm text-brand-500">
              Nezapomeň nakoupit chybějící ingredience 🛒
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={reset}
                className="rounded-xl border border-stone-200 px-6 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
              >
                Další prep
              </button>
              <button
                onClick={onClose}
                className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Hotovo
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
