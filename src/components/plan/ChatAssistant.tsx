"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChefHat,
  Heart,
  MessageCircle,
  MessageCircleOff,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DayPlan, MealPrepRecipe } from "@/types";

const dayLabels = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
const dayLabelsShort = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

function getMonday(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dayNameFromDate(d: string) {
  const date = new Date(d + "T00:00:00");
  return dayLabels[(date.getDay() + 6) % 7];
}

function todayStr() {
  const d = new Date();
  return dateStr(d.getFullYear(), d.getMonth(), d.getDate());
}

function getWeekDates() {
  const today = new Date();
  const monday = getMonday(today);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return dateStr(d.getFullYear(), d.getMonth(), d.getDate());
  });
}

function generateId() {
  return `opt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

interface ChatAssistantProps {
  weekPlan: DayPlan[];
  recipes: Map<string, string[]>;
  mealPrepRecipes: MealPrepRecipe[];
  onAddMeal: (date: string, name: string, type: "plan" | "craving") => void;
  onRemoveMeal: (date: string, mealId: string) => void;
  onAddRecipe: (mealName: string, steps: string[]) => void;
  onShowShoppingList?: () => void;
}

type OptionItem = { label: string; icon?: React.ReactNode; action: () => void; description?: string };

function OptionButton({ option }: { option: OptionItem }) {
  return (
    <button
      onClick={option.action}
      className="flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
    >
      {option.icon && <span className="shrink-0">{option.icon}</span>}
      <span className="flex-1">{option.label}</span>
      {option.description && <span className="shrink-0 text-xs text-stone-400">{option.description}</span>}
    </button>
  );
}

function Chip({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-1.5 text-sm font-medium transition-all",
        active
          ? "border-brand-300 bg-brand-50 text-brand-700"
          : "border-stone-200 bg-white text-stone-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700",
      )}
    >
      {label}
    </button>
  );
}

export function ChatAssistant({ weekPlan, recipes, mealPrepRecipes, onAddMeal, onRemoveMeal, onAddRecipe, onShowShoppingList }: ChatAssistantProps) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ title: string; view: React.ReactNode }[]>([]);
  const [view, setView] = useState<React.ReactNode>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [view, scrollToBottom]);

  function pushView(title: string, newView: React.ReactNode) {
    setHistory((prev) => [...prev, { title, view }]);
    setView(newView);
  }

  function goBack() {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setView(prev.view);
    } else {
      setView(null);
    }
  }

  function showMainMenu() {
    setHistory([]);
    setView(null);
  }

  const mainView = (
    <div className="space-y-2">
      <p className="mb-4 text-sm leading-relaxed text-stone-600">
        Vyber, co chceš udělat:
      </p>

      <OptionButton option={{
        label: "Přidat jídlo na den",
        icon: <Plus className="h-5 w-5 text-emerald-500" />,
        description: "plán / přání",
        action: () => pushView("Přidat jídlo", <AddMealView />),
      }} />

      <OptionButton option={{
        label: "Smazat jídlo z dne",
        icon: <Trash2 className="h-5 w-5 text-rose-500" />,
        action: () => pushView("Smazat jídlo", <RemoveMealView />),
      }} />

      <OptionButton option={{
        label: "Ukázat jídla na den",
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        action: () => pushView("Ukázat den", <ShowDayView />),
      }} />

      <OptionButton option={{
        label: "Recepty",
        icon: <ChefHat className="h-5 w-5 text-brand-500" />,
        description: `${recipes.size} receptů`,
        action: () => pushView("Recepty", <RecipesView />),
      }} />

      <OptionButton option={{
        label: "Přidat recept",
        icon: <BookOpen className="h-5 w-5 text-violet-500" />,
        action: () => pushView("Přidat recept", <AddRecipeView />),
      }} />

      <OptionButton option={{
        label: "Nákupní seznam",
        icon: <ShoppingCart className="h-5 w-5 text-emerald-500" />,
        description: "co koupit",
        action: () => { setOpen(false); onShowShoppingList?.(); },
      }} />
    </div>
  );

  function AddMealView() {
    const [step, setStep] = useState<"day" | "type" | "meal" | "done">("day");
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<"plan" | "craving" | null>(null);
    const [customMeal, setCustomMeal] = useState("");
    const [addedMeal, setAddedMeal] = useState("");

    const weekDates = getWeekDates();
    const today = todayStr();

    function handleDaySelect(day: string) {
      setSelectedDay(day);
      setStep("type");
    }

    function handleTypeSelect(type: "plan" | "craving") {
      setSelectedType(type);
      setStep("meal");
    }

    function addMeal(name: string) {
      if (!selectedDay || !selectedType) return;
      onAddMeal(selectedDay, name, selectedType);
      setAddedMeal(name);
      setStep("done");
    }

    function handleCustomAdd() {
      const trimmed = customMeal.trim();
      if (!trimmed || !selectedDay || !selectedType) return;
      addMeal(trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
    }

    if (step === "done") {
      const typeLabel = selectedType === "plan" ? "naplánováno" : "přidáno jako přání";
      return (
        <div className="space-y-4 py-4 text-center">
          <div className="text-4xl">✅</div>
          <p className="font-semibold text-stone-800">
            <span className="text-brand-600">{addedMeal}</span> {typeLabel} na{" "}
            <span className="font-bold">{selectedDay ? dayNameFromDate(selectedDay) : ""}</span>
          </p>
          <div className="flex gap-2 pt-2">
            <button onClick={() => setStep("day")} className="rounded-xl border border-stone-200 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50">
              Přidat další
            </button>
            <button onClick={showMainMenu} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Hotovo
            </button>
          </div>
        </div>
      );
    }

    if (step === "meal") {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-600">Vyber jídlo nebo napiš vlastní:</p>
          <div className="flex flex-wrap gap-1.5">
            {["Pizza", "Těstoviny", "Řízky", "Bramborový salát", "Langoše", "Čínská polévka", "Rohlíky", "Minerálka", "Steak", "Burger"].map((name) => (
              <Chip key={name} label={name} onClick={() => addMeal(name)} />
            ))}
          </div>
          <div className="pt-3">
            <div className="flex gap-2">
              <input
                value={customMeal}
                onChange={(e) => setCustomMeal(e.target.value)}
                placeholder="Vlastní jídlo..."
                className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200/50"
                onKeyDown={(e) => e.key === "Enter" && handleCustomAdd()}
              />
              <button
                onClick={handleCustomAdd}
                disabled={!customMeal.trim()}
                className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40 hover:bg-brand-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (step === "type") {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-600">
            Pro <span className="font-bold text-brand-600">{selectedDay ? dayNameFromDate(selectedDay) : ""}</span>:
          </p>
          <OptionButton option={{
            label: "Plánované jídlo",
            icon: <Utensils className="h-5 w-5 text-emerald-500" />,
            action: () => handleTypeSelect("plan"),
          }} />
          <OptionButton option={{
            label: "Chuť / přání",
            icon: <Heart className="h-5 w-5 text-rose-500" />,
            action: () => handleTypeSelect("craving"),
          }} />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-600">Vyber den:</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const monday = getMonday(new Date());
            const target = new Date(monday);
            target.setDate(monday.getDate() + i);
            const key = dateStr(target.getFullYear(), target.getMonth(), target.getDate());
            return (
              <Chip
                key={key}
                label={`${dayLabelsShort[i]} ${target.getDate()}.`}
                active={selectedDay === key}
                onClick={() => handleDaySelect(key)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  function RemoveMealView() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const today = todayStr();
    const weekDates = getWeekDates();

    const dayPlan = weekPlan.find((d) => d.date === selectedDay);

    if (selectedDay && dayPlan && dayPlan.entries.length > 0) {
      return (
        <div className="space-y-3">
          <p className="text-sm font-medium text-stone-600">
            Klikni na jídlo pro smazání z <span className="font-bold">{dayNameFromDate(selectedDay)}</span>:
          </p>
          <div className="flex flex-wrap gap-2">
            {dayPlan.entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  onRemoveMeal(selectedDay, entry.id);
                  setSelectedDay(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-100 hover:ring-rose-300"
              >
                <Trash2 className="h-4 w-4" />
                {entry.name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (selectedDay && (!dayPlan || dayPlan.entries.length === 0)) {
      return (
        <div className="space-y-4 py-4 text-center">
          <p className="text-stone-500">Na tento den nic není.</p>
          <button onClick={() => setSelectedDay(null)} className="rounded-xl bg-stone-100 px-4 py-2 text-sm text-stone-600 hover:bg-stone-200">
            Vybrat jiný den
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-600">Vyber den pro smazání:</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const monday = getMonday(new Date());
            const target = new Date(monday);
            target.setDate(monday.getDate() + i);
            const key = dateStr(target.getFullYear(), target.getMonth(), target.getDate());
            const count = weekPlan.find((d) => d.date === key)?.entries.length ?? 0;
            return (
              <button
                key={key}
                onClick={() => setSelectedDay(key)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left transition-all hover:border-rose-200 hover:bg-rose-50",
                  count > 0 ? "border-stone-200 bg-white" : "border-dashed border-stone-200 bg-stone-50 text-stone-400",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dayLabelsShort[i]} {target.getDate()}.</span>
                  {count > 0 && <span className="text-xs text-rose-400">{count} jídel</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function ShowDayView() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const today = todayStr();

    if (selectedDay) {
      const dayPlan = weekPlan.find((d) => d.date === selectedDay);
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedDay(null)} className="rounded-lg p-1 text-stone-400 hover:bg-stone-100">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <p className="text-lg font-bold text-stone-800">{selectedDay ? dayNameFromDate(selectedDay) : ""}</p>
          </div>
          {dayPlan && dayPlan.entries.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {dayPlan.entries.map((entry) => (
                <span
                  key={entry.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium",
                    entry.type === "plan"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
                  )}
                >
                  {entry.type === "plan" ? <Utensils className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                  {entry.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-stone-400 italic">Nic naplánováno</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-600">Vyber den pro zobrazení:</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const monday = getMonday(new Date());
            const target = new Date(monday);
            target.setDate(monday.getDate() + i);
            const key = dateStr(target.getFullYear(), target.getMonth(), target.getDate());
            const count = weekPlan.find((d) => d.date === key)?.entries.length ?? 0;
            return (
              <button
                key={key}
                onClick={() => setSelectedDay(key)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-left transition-all hover:border-brand-200 hover:bg-brand-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{dayLabelsShort[i]} {target.getDate()}.</span>
                  <span className="text-xs text-stone-400">{count > 0 ? `${count} jídel` : "prázdno"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function RecipesView() {
    if (recipes.size === 0) {
      return (
        <div className="space-y-4 py-4 text-center">
          <p className="text-stone-500">Zatím nemáš žádné recepty.</p>
          <button onClick={() => pushView("Přidat recept", <AddRecipeView />)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
            Přidat recept
          </button>
        </div>
      );
    }

    const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

    if (selectedRecipe) {
      const steps = recipes.get(selectedRecipe);
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedRecipe(null)} className="rounded-lg p-1 text-stone-400 hover:bg-stone-100">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <p className="text-lg font-bold text-stone-800">{selectedRecipe}</p>
          </div>
          {steps && steps.length > 0 ? (
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-stone-400 italic">Recept je prázdný</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {Array.from(recipes.entries()).map(([name, steps]) => (
          <button
            key={name}
            onClick={() => setSelectedRecipe(name)}
            className="flex w-full items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-left text-sm font-medium text-stone-700 transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
          >
            <ChefHat className="h-5 w-5 text-brand-400" />
            <span className="flex-1">{name}</span>
            <span className="text-xs text-stone-400">{steps.length} kroků</span>
          </button>
        ))}
      </div>
    );
  }

  function AddRecipeView() {
    const [mealName, setMealName] = useState("");
    const [stepsText, setStepsText] = useState("");
    const [done, setDone] = useState(false);

    function handleSave() {
      const name = mealName.trim();
      const steps = stepsText.split("\n").map((s) => s.trim()).filter((s) => s.length > 0);
      if (!name || steps.length === 0) return;
      onAddRecipe(name.charAt(0).toUpperCase() + name.slice(1), steps);
      setDone(true);
    }

    if (done) {
      return (
        <div className="space-y-4 py-4 text-center">
          <div className="text-4xl">📖</div>
          <p className="font-semibold text-stone-800">Recept uložen!</p>
          <button onClick={showMainMenu} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
            Hotovo
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-400">Název jídla</p>
          <input
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Např. Špagety carbonara"
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200/50"
          />
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-400">Postup (každý krok na nový řádek)</p>
          <textarea
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
            placeholder="Nakrájet cibuli&#10;Osmažit maso&#10;Smíchat s těstovinami"
            rows={5}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none transition focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-200/50"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!mealName.trim() || !stepsText.trim()}
          className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 disabled:opacity-40"
        >
          Uložit recept
        </button>
      </div>
    );
  }

  const currentView = view ?? mainView;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all hover:scale-105",
          open ? "bg-stone-700 text-white shadow-stone-900/20" : "bg-brand-500 text-white shadow-brand-500/30",
        )}
      >
        {open ? <MessageCircleOff className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-96 flex-col rounded-3xl border border-stone-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 rounded-t-3xl border-b border-stone-100 bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Jídelní asistent</p>
              <p className="text-xs text-brand-100">Vyber možnost z nabídky</p>
            </div>
            <Sparkles className="h-5 w-5 text-yellow-200" />
          </div>

          <div className="max-h-[420px] overflow-y-auto p-5">
            {/* Breadcrumb */}
            {history.length > 0 && (
              <div className="mb-4 flex items-center gap-2">
                <button onClick={goBack} className="rounded-lg p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <span className="text-xs text-stone-400">
                  {history.map((h) => h.title).join(" / ")} / <span className="font-medium text-stone-600">{history[history.length - 1]?.title}</span>
                </span>
              </div>
            )}
            {currentView}
          </div>
        </div>
      )}
    </>
  );
}
