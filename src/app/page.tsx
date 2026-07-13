"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  Beef,
  Brain,
  CalendarDays,
  ChefHat,
  Heart,
  PiggyBank,
  Plus,
  Sparkles,
  Utensils,
  Zap,
} from "lucide-react";
import { fridgeStock, mealPrepRecipes, weekPlan as initialWeekPlan } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { MealPrepRecipe } from "@/types";
import { MealPrepModal } from "@/components/plan/MealPrepModal";
import { ChatAssistant } from "@/components/plan/ChatAssistant";
import { ShoppingListModal } from "@/components/plan/ShoppingListModal";

const dayLabels = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
const monthNames = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];

const SAVINGS_PER_MEAL = 150;

function formatDate(date: Date) {
  return `${date.getDate()}. ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function getMonday(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function getWeekDays(date: Date) {
  const monday = getMonday(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function generateId() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function MealBadge({ name, type }: { name: string; type: "plan" | "craving" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium leading-none transition-all hover:scale-105",
        type === "plan"
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50"
          : "bg-rose-50 text-rose-600 ring-1 ring-rose-200/50",
      )}
    >
      {type === "plan" ? <Utensils className="h-3.5 w-3.5" /> : <Heart className="h-3.5 w-3.5" />}
      {name}
    </span>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(amount);
}

export default function LandingPage() {
  const today = useMemo(() => new Date(), []);
  const weekDays = useMemo(() => getWeekDays(today), [today]);

  const [plan, setPlan] = useState(() => initialWeekPlan.map((d) => ({ ...d, entries: [...d.entries] })));
  const [recipes] = useState<Map<string, string[]>>(() => {
    const m = new Map<string, string[]>();
    m.set("Řízky", ["Maso naklepat a osolit", "Obalit v trojobalu", "Osmažit dozlatova"]);
    m.set("Langoše", ["Zadělat kynuté těsto", "Vyválet placky", "Osmažit na oleji", "Potřít česnekem a kečupem"]);
    return m;
  });
  const [showPrepModal, setShowPrepModal] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const planMap = useMemo(() => {
    const map = new Map<string, { id: string; name: string; type: "plan" | "craving" }[]>();
    for (const day of plan) map.set(day.date, day.entries);
    return map;
  }, [plan]);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const todayMeals = planMap.get(todayStr) ?? [];
  const totalPlanned = plan.reduce((s, d) => s + d.entries.filter((e) => e.type === "plan").length, 0);
  const totalCravings = plan.reduce((s, d) => s + d.entries.filter((e) => e.type === "craving").length, 0);
  const savings = totalPlanned * SAVINGS_PER_MEAL;
  const daysWithPlan = plan.filter((d) => d.entries.length > 0).length;

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = dateStr(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  const tomorrowMeals = planMap.get(tomorrowStr) ?? [];

  function addMeal(date: string, name: string, type: "plan" | "craving") {
    setPlan((prev) => {
      const existing = prev.find((d) => d.date === date);
      if (existing) {
        return prev.map((d) =>
          d.date === date ? { ...d, entries: [...d.entries, { id: generateId(), name, type }] } : d
        );
      }
      return [...prev, { date, entries: [{ id: generateId(), name, type }] }];
    });
  }

  function removeMeal(date: string, mealId: string) {
    setPlan((prev) =>
      prev.map((d) => (d.date === date ? { ...d, entries: d.entries.filter((e) => e.id !== mealId) } : d)).filter((d) => d.entries.length > 0)
    );
  }

  function handlePrepApply(recipe: MealPrepRecipe, days: string[]) {
    for (const date of days) {
      addMeal(date, recipe.name, "plan");
    }
    setShowPrepModal(false);
  }

  return (
    <div className="min-h-screen">
      {/* HERO — Jídlo je motivace */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative px-8 pb-16 pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 text-7xl">🔥</div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Jídlo je výplata
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100 sm:text-xl">
              Plná lednička. Plný žaludek. Naplánovaný týden. <br />
              Do práce se těšíš kvůli obědu, ne kvůli meetingům.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand-600 shadow-xl shadow-brand-900/20 transition-all hover:scale-105 hover:shadow-2xl"
              >
                <CalendarDays className="h-5 w-5" />
                Plánovat jídlo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setShowPrepModal(true)}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:shadow-xl"
              >
                <Zap className="h-5 w-5" />
                Meal Prep
              </button>
            </div>
          </div>
        </div>

        {/* Stats — šetření, plán, lednička */}
        <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-8 px-8 py-5 sm:gap-16">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{formatCurrency(savings)}</p>
              <p className="flex items-center justify-center gap-1 text-sm text-brand-200">
                <PiggyBank className="h-4 w-4" /> ušetřeno tento týden
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{daysWithPlan}/7</p>
              <p className="flex items-center justify-center gap-1 text-sm text-brand-200">
                <BadgeCheck className="h-4 w-4" /> dnů s plánem
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{fridgeStock.length}</p>
              <p className="flex items-center justify-center gap-1 text-sm text-brand-200">
                <Apple className="h-4 w-4" /> položek v lednici
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DNEŠEK — hlavní otázka */}
      <section className="px-8 pb-8">
        <div className="relative -mt-12 mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-200/50">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4">
              <div className="flex items-center gap-3">
                <ChefHat className="h-6 w-6 text-white/80" />
                <p className="text-lg font-bold text-white">
                  Co jíš dnes?
                </p>
              </div>
            </div>
            <div className="px-8 py-6">
              {todayMeals.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {todayMeals.map((meal) => (
                      <MealBadge key={meal.id} name={meal.name} type={meal.type} />
                    ))}
                  </div>
                  <p className="text-sm text-stone-400">
                    {totalPlanned > 0
                      ? `Tento týden jsi ušetřil ${formatCurrency(savings)} oproti objednávání.`
                      : "Každé naplánované jídlo = ušetřené peníze."}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-stone-200 p-8 text-center">
                  <p className="text-xl font-semibold text-stone-400">Dnes není naplánováno nic</p>
                  <p className="mt-1 text-sm text-stone-400">Objednávka tě vyjde na ~200 Kč. Domácí jídlo na ~50 Kč.</p>
                  <Link
                    href="/plan"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
                  >
                    Naplánovat jídlo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOTIVACE DO PRÁCE + LEDNIČKA */}
      <section className="px-8 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Motivace do práce */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                  <Brain className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Motivace do práce</h3>
                  <p className="text-sm text-stone-500">{dayLabels[(tomorrow.getDay() + 6) % 7]} = den oběda</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-5">
                {tomorrowMeals.length > 0 ? (
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Zítra se máš na co těšit:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tomorrowMeals.map((meal) => (
                        <MealBadge key={meal.id} name={meal.name} type={meal.type} />
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-amber-600">
                      Vydrž do zítřka. Oběd stojí za to. 💪
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-3xl">😕</p>
                    <p className="mt-2 text-sm font-medium text-amber-800">Zítra není naplánováno nic</p>
                    <p className="mt-1 text-xs text-amber-600">Bez plánu = objednávka = zbytečná útrata</p>
                    <Link
                      href="/plan"
                      className="mt-3 inline-flex items-center gap-1 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
                    >
                      Naplánovat zítřek
                    </Link>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2 text-sm text-stone-500">
                <p className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  <span>{totalPlanned} jídel naplánováno na tento týden</span>
                </p>
                <p className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-emerald-500" />
                  <span>Ušetřeno {formatCurrency(savings)} oproti rozvozu</span>
                </p>
                <p className="flex items-center gap-2">
                  <Beef className="h-4 w-4 text-emerald-500" />
                  <span>{fridgeStock.filter((f) => f.category === "Maso" || f.category === "Sýry").length} surovin na vaření</span>
                </p>
              </div>
            </div>

            {/* Lednička */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Apple className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Lednička</h3>
                  <p className="text-sm text-stone-500">{fridgeStock.length} položek skladem</p>
                </div>
              </div>
              <div className="mt-4 max-h-[320px] space-y-1 overflow-y-auto">
                {fridgeStock.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-700">{item.name}</span>
                      <span className="text-xs text-stone-400">{item.category}</span>
                    </div>
                    <span className="font-medium text-stone-600">{item.quantity} {item.unit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/plan"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
              >
                <Plus className="h-4 w-4" /> Přidat do ledničky
              </Link>
            </div>

            {/* Tento týden — mini přehled */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <CalendarDays className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Tento týden</h3>
                  <p className="text-sm text-stone-500">{daysWithPlan} dní s jídlem</p>
                </div>
                <Link href="/plan" className="ml-auto text-sm font-medium text-brand-500 hover:text-brand-600">
                  Celý <ArrowRight className="ml-0.5 inline h-3 w-3" />
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {weekDays.map((day) => {
                  const key = dateStr(day.getFullYear(), day.getMonth(), day.getDate());
                  const entries = planMap.get(key) ?? [];
                  const isToday = key === todayStr;
                  return (
                    <Link
                      key={key}
                      href="/plan"
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all hover:bg-stone-50",
                        isToday && "bg-brand-50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isToday ? "bg-brand-500 text-white" : "bg-stone-100 text-stone-500",
                        )}
                      >
                        {day.getDate()}
                      </span>
                      <span className="w-8 text-xs font-medium text-stone-500">
                        {dayLabels[(day.getDay() + 6) % 7].slice(0, 2)}
                      </span>
                      {entries.length > 0 ? (
                        <span className="flex-1 truncate text-stone-600">
                          {entries.map((e) => e.name).join(", ")}
                        </span>
                      ) : (
                        <span className="flex-1 text-xs italic text-stone-300">prázdno</span>
                      )}
                      {isToday && <span className="text-xs font-semibold text-brand-500">DNES</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEAL PREP + PRINCIPY */}
      <section className="border-t border-stone-200 bg-surface-50 px-8 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Tvoje jídelní jistoty</h2>
            <p className="mt-2 text-stone-500">6 věcí, které ti změní život (a žaludek)</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <PiggyBank className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Šetření</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Domácí jídlo = ~50 Kč. Rozvoz = ~200 Kč. Rozdíl dáváš do kapsy.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Apple className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Plná lednička</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Vždy víš, co máš doma. Žádné zbytečné nákupy, žádný hlad.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <ChefHat className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Plný žaludek</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Nejlepší pocit? Když víš, že na tebe doma čeká dobré jídlo.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                <CalendarDays className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Naplánované pokrmy</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Celý týden v kalendáři. Žádné "co dneska uvařit?".
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50">
                <Zap className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Připravené jídlo</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Uvař jednou, jez 3 dny. Meal prep = superpower.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Brain className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">Motivace do práce</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Do práce nejdeš kvůli práci. Jdeš kvůli obědu, co sis naplánoval.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setShowPrepModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:bg-brand-600"
            >
              <Zap className="h-6 w-6" />
             Začít meal prep
            </button>
          </div>
        </div>
      </section>

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
        onAddRecipe={() => {}}
        onShowShoppingList={() => setShowShoppingList(true)}
      />

      {showShoppingList && (
        <ShoppingListModal
          plan={plan}
          onClose={() => setShowShoppingList(false)}
        />
      )}
    </div>
  );
}
