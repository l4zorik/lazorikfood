import type { StatCard as StatCardType } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface StatCardProps {
  stat: StatCardType;
}

export function StatCard({ stat }: StatCardProps) {
  const TrendIcon =
    stat.trend === "up" ? ArrowUpRight : stat.trend === "down" ? ArrowDownRight : Minus;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-stone-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900">{stat.value}</p>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
            stat.trend === "up" && "bg-emerald-50 text-emerald-700",
            stat.trend === "down" && "bg-red-50 text-red-700",
            stat.trend === "neutral" && "bg-stone-100 text-stone-600"
          )}
        >
          <TrendIcon className="h-3 w-3" />
          {stat.change}
        </span>
        {stat.trend !== "neutral" && (
          <span className="text-xs text-stone-400">oproti včerejšku</span>
        )}
      </div>
    </div>
  );
}
