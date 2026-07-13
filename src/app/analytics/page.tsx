"use client";

import { Header } from "@/components/layout/Header";
import { revenueData, menuItems } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const categorySales = [
  { name: "Hlavní jídla", value: 35, color: "#f97316" },
  { name: "Pizza", value: 22, color: "#fb923c" },
  { name: "Nápoje", value: 18, color: "#fdba74" },
  { name: "Saláty", value: 12, color: "#fed7aa" },
  { name: "Dezerty", value: 8, color: "#ffedd5" },
  { name: "Těstoviny", value: 5, color: "#ea580c" },
];

const topItems = [...menuItems]
  .filter((i) => i.available)
  .sort((a, b) => b.price - a.price)
  .slice(0, 5);

export default function AnalyticsPage() {
  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = revenueData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <>
      <Header title="Analytika" subtitle="Přehled výkonnosti a trendů" />

      <div className="space-y-6 p-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Týdenní tržby</p>
            <p className="mt-1 text-3xl font-bold text-stone-900">{formatCurrency(totalRevenue)}</p>
            <p className="mt-2 text-sm text-emerald-600">+15.3% oproti minulému týdnu</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Celkem objednávek</p>
            <p className="mt-1 text-3xl font-bold text-stone-900">{totalOrders}</p>
            <p className="mt-2 text-sm text-emerald-600">+11 objednávek</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Průměrná marže</p>
            <p className="mt-1 text-3xl font-bold text-stone-900">64%</p>
            <p className="mt-2 text-sm text-stone-400">Napříč menu</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Trend tržeb</h3>
            <p className="mb-4 text-sm text-stone-500">Denní vývoj za týden</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#78716c", fontSize: 12 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e7e5e4" }}
                  formatter={(value: number) => [formatCurrency(value), "Tržby"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Prodej dle kategorií</h3>
            <p className="mb-4 text-sm text-stone-500">Podíl na celkových tržbách</p>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categorySales.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "Podíl"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categorySales.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-stone-600">{cat.name}</span>
                    <span className="font-semibold text-stone-900">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-stone-900">Nejdražší položky menu</h3>
          <p className="mb-4 text-sm text-stone-500">Podle ceny pro zákazníka</p>
          <div className="space-y-3">
            {topItems.map((item, i) => (
              <div key={item.id} className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
                  {i + 1}
                </span>
                <span className="text-2xl">{item.image}</span>
                <div className="flex-1">
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-400">{item.category}</p>
                </div>
                <p className="font-semibold text-stone-900">{formatCurrency(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
