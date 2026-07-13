"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  Sparkles,
  Trash2,
  Utensils,
} from "lucide-react";
import { mealPrepRecipes, weekPlan as initialWeekPlan } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { MealEntry, MealPrepRecipe } from "@/types";
import { AddMealModal } from "@/components/plan/AddMealModal";
import { MealPrepModal } from "@/components/plan/MealPrepModal";
import { ChatAssistant } from "@/components/plan/ChatAssistant";
import { ShoppingListModal } from "@/components/plan/ShoppingListModal";

const dayLabels = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
const monthNames = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];

function getMonday(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateId() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function MealChip({ entry, onRemove }: { entry: MealEntry; onRemove?: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium leading-tight group",
        entry.type === "plan"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-600",
      )}
    >
      {entry.type === "plan" ? (
        <Utensils className="h-3 w-3 shrink-0" />
      ) : (
        <Heart className="h-3 w-3 shrink-0" />
      )}
      <span className="truncate">{entry.name}</span>
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}

export default function PlanPage() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [plan, setPlan] = useState<{ date: string; entries: MealEntry[] }[]>(
    () => initialWeekPlan.map((d) => ({ ...d, entries: [...d.entries] }))
  );
  const [recipes, setRecipes] = useState<Map<string, string[]>>(() => {
    const m = new Map<string, string[]>();
    m.set("Řízky", ["Maso naklepat a osolit", "Obalit v trojobalu", "Osmažit dozlatova"]);
    m.set("Langoše", ["Zadělat kynuté těsto", "Vyválet placky", "Osmažit na oleji", "Potřít česnekem a kečupem"]);
    m.set("Čínská polévka", ["Uvařit vývar", "Přidat zeleninu", "Přidat nudle a maso", "Ochutit sójovkou"]);
    return m;
  });

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showPrepModal, setShowPrepModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = useMemo(() => getMonthDays(year, month), [year, month]);
  const todayStr = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const planMap = useMemo(() => {
    const map = new Map<string, MealEntry[]>();
    for (const day of plan) map.set(day.date, day.entries);
    return map;
  }, [plan]);

  function addMeal(date: string, name: string, type: "plan" | "craving") {
    setPlan((prev) => {
      const existing = prev.find((d) => d.date === date);
      if (existing) {
        return prev.map((d) =>
          d.date === date
            ? { ...d, entries: [...d.entries, { id: generateId(), name, type }] }
            : d
        );
      }
      return [...prev, { date, entries: [{ id: generateId(), name, type }] }];
    });
  }

  function removeMeal(date: string, mealId: string) {
    setPlan((prev) =>
      prev.map((d) =>
        d.date === date
          ? { ...d, entries: d.entries.filter((e) => e.id !== mealId) }
          : d
      ).filter((d) => d.entries.length > 0)
    );
  }

  function addRecipe(mealName: string, steps: string[]) {
    setRecipes((prev) => {
      const next = new Map(prev);
      next.set(mealName, steps);
      return next;
    });
  }

  function handlePrepApply(recipe: MealPrepRecipe, days: string[]) {
    for (const date of days) {
      addMeal(date, recipe.name, "plan");
    }
    setShowPrepModal(false);
  }

  function prevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function goToday() {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Jídelní kalendář</h1>
            <p className="text-sm text-stone-500">Plánuj jídla a zapisuj si chuťě na každý den</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPrepModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
            >
              <Sparkles className="h-4 w-4" />
              Meal Prep
            </button>
            <button
              onClick={goToday}
              className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Dnes
            </button>
            <div className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white p-1">
              <button onClick={prevMonth} className="rounded-lg p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-700">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[140px] text-center text-sm font-semibold text-stone-800">
                {monthNames[month]} {year}
              </span>
              <button onClick={nextMonth} className="rounded-lg p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-700">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="grid grid-cols-7 border-b border-stone-100">
            {dayLabels.map((label) => (
              <div key={label} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-stone-400">
                {label}
              </div>
            ))}
          </div>

          <div className="divide-y divide-stone-100">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7">
                {row.map((day, di) => {
                  if (day === null) {
                    return <div key={`empty-${ri}-${di}`} className="min-h-[130px] bg-stone-50/50 p-2" />;
                  }
                  const key = dateKey(year, month, day);
                  const entries = planMap.get(key) ?? [];
                  const isToday = key === todayStr;
                  const isPast = key < todayStr;

                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedDay(key)}
                      className={cn(
                        "relative min-h-[130px] cursor-pointer border-r border-stone-100 p-2.5 transition-all last:border-r-0 hover:bg-stone-50",
                        isToday && "bg-brand-50/40 hover:bg-brand-50/60",
                        isPast && !isToday && "opacity-60",
                      )}
                    >
                      {isToday && (
                        <div className="pointer-events-none absolute inset-0 border-2 border-brand-500/40" />
                      )}
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold",
                            isToday ? "bg-brand-500 text-white shadow-sm" : "text-stone-700",
                          )}
                        >
                          {day}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedDay(key); }}
                          className="flex h-6 w-6 items-center justify-center rounded-lg text-stone-300 transition hover:bg-brand-50 hover:text-brand-500"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {entries.length > 0 && (
                        <div className="mt-2 flex flex-col gap-1">
                          {entries.map((entry) => (
                            <MealChip key={entry.id} entry={entry} onRemove={() => removeMeal(key, entry.id)} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-50 ring-1 ring-emerald-200" />
              Plánovaná jídla
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-rose-50 ring-1 ring-rose-200" />
              Chuť a přání
            </span>
          </div>
          <p className="text-xs text-stone-400">Klikni na den pro přidání jídla</p>
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Tento týden</h2>
              <p className="mt-1 text-sm text-stone-500">Přehled jídel na tento týden</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 7 }, (_, i) => {
              const monday = getMonday(today);
              const target = new Date(monday);
              target.setDate(monday.getDate() + i);
              const key = dateKey(target.getFullYear(), target.getMonth(), target.getDate());
              const entries = planMap.get(key) ?? [];
              return (
                <div
                  key={key}
                  onClick={() => setSelectedDay(key)}
                  className={cn(
                    "cursor-pointer rounded-xl border p-4 transition-all hover:shadow-sm",
                    key === todayStr
                      ? "border-brand-300 bg-brand-50/40 ring-2 ring-brand-200/50"
                      : "border-stone-200 bg-surface-50 hover:border-brand-200",
                  )}
                >
                  <p className="text-sm font-semibold text-stone-700">
                    {dayLabels[i]} {target.getDate()}.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entries.length > 0 ? (
                      entries.map((entry) => <MealChip key={entry.id} entry={entry} />)
                    ) : (
                      <span className="text-xs italic text-stone-300">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedDay && (
        <AddMealModal
          date={selectedDay}
          currentMeals={planMap.get(selectedDay) ?? []}
          onAdd={(name, type) => addMeal(selectedDay, name, type)}
          onRemove={(id) => removeMeal(selectedDay, id)}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {showPrepModal && (
        <MealPrepModal
          onApply={handlePrepApply}
          onClose={() => setShowPrepModal(false)}
        />
      )}

      <ChatAssistant
        weekPlan={plan}
        recipes={recipes}
        mealPrepRecipes={mealPrepRecipes}
        onAddMeal={addMeal}
        onRemoveMeal={removeMeal}
        onAddRecipe={addRecipe}
        onShowShoppingList={() => setShowShoppingList(true)}
      />

      {showShoppingList && (
        <ShoppingListModal
          plan={plan}
          onClose={() => setShowShoppingList(false)}
        />
      )}
    </>
  );
}
