"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-stone-900">Týdenní tržby</h3>
          <p className="text-sm text-stone-500">Přehled za posledních 7 dní</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-500" />
            Tržby
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-200" />
            Objednávky
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={revenueData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#78716c", fontSize: 12 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number, name: string) =>
              name === "revenue" ? [formatCurrency(value), "Tržby"] : [value, "Objednávky"]
            }
          />
          <Bar dataKey="revenue" fill="#f97316" radius={[6, 6, 0, 0]} />
          <Bar dataKey="orders" fill="#fed7aa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
