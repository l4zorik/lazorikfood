"use client";

import { useState } from "react";
import {
  Heart,
  Plus,
  Utensils,
  X,
} from "lucide-react";
import { savedMeals } from "@/lib/data";
import { cn } from "@/lib/utils";

const dayLabels = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
const monthNames = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];

interface AddMealModalProps {
  date: string;
  currentMeals: { id: string; name: string; type: "plan" | "craving" }[];
  onAdd: (name: string, type: "plan" | "craving") => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export function AddMealModal({ date, currentMeals, onAdd, onRemove, onClose }: AddMealModalProps) {
  const [name, setName] = useState("");
  const [mealType, setMealType] = useState<"plan" | "craving">("plan");

  const d = new Date(date + "T00:00:00");
  const dayLabel = `${dayLabels[(d.getDay() + 6) % 7]} ${d.getDate()}. ${monthNames[d.getMonth()]}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, mealType);
    setName("");
  }

  function handleQuickAdd(mealName: string) {
    onAdd(mealName, mealType);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-[fadeIn_0.2s_ease-out] rounded-3xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Přidat jídlo</h2>
            <p className="text-sm text-stone-500">{dayLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {currentMeals.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Aktuální
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentMeals.map((meal) => (
                  <span
                    key={meal.id}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium",
                      meal.type === "plan"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-600",
                    )}
                  >
                    {meal.type === "plan" ? (
                      <Utensils className="h-3.5 w-3.5" />
                    ) : (
                      <Heart className="h-3.5 w-3.5" />
                    )}
                    {meal.name}
                    <button
                      onClick={() => onRemove(meal.id)}
                      className="ml-1 rounded-md p-0.5 transition hover:bg-black/5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={() => setMealType("plan")}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-semibold transition",
                  mealType === "plan"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200",
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Utensils className="h-4 w-4" />
                  Plán
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMealType("craving")}
                className={cn(
                  "flex-1 rounded-xl py-2.5 text-sm font-semibold transition",
                  mealType === "craving"
                    ? "bg-rose-400 text-white shadow-sm"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200",
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="h-4 w-4" />
                  Chuť / přání
                </span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Název jídla..."
                className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200/50"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="rounded-xl bg-brand-500 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-brand-600 disabled:opacity-40"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Rychlý výběr
            </p>
            <div className="flex flex-wrap gap-1.5">
              {savedMeals.map((meal) => (
                <button
                  key={meal.name}
                  onClick={() => handleQuickAdd(meal.name)}
                  className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                  {meal.emoji} {meal.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
