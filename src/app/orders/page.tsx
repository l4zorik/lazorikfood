import { Header } from "@/components/layout/Header";
import { orders } from "@/lib/data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import { Filter, Plus } from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Čeká", className: "bg-amber-50 text-amber-700 border-amber-200" },
  preparing: { label: "Připravuje se", className: "bg-blue-50 text-blue-700 border-blue-200" },
  ready: { label: "Připraveno", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  delivered: { label: "Doručeno", className: "bg-stone-50 text-stone-600 border-stone-200" },
  cancelled: { label: "Zrušeno", className: "bg-red-50 text-red-600 border-red-200" },
};

const typeLabels = {
  "dine-in": "Na místě",
  takeaway: "S sebou",
  delivery: "Rozvoz",
};

const statusCounts = {
  pending: orders.filter((o) => o.status === "pending").length,
  preparing: orders.filter((o) => o.status === "preparing").length,
  ready: orders.filter((o) => o.status === "ready").length,
  delivered: orders.filter((o) => o.status === "delivered").length,
};

export default function OrdersPage() {
  return (
    <>
      <Header title="Objednávky" subtitle="Správa a sledování všech objednávek" />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                className={cn(
                  "rounded-xl border px-4 py-2 text-center",
                  statusConfig[status as OrderStatus].className
                )}
              >
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs font-medium">{statusConfig[status as OrderStatus].label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50">
              <Filter className="h-4 w-4" />
              Filtr
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600">
              <Plus className="h-4 w-4" />
              Nová objednávka
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Zákazník</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Položky</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Typ</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Stav</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">Částka</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">Čas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-stone-50">
                  <td className="px-6 py-4 text-sm font-medium text-brand-600">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-900">{order.customer}</p>
                    {order.table && <p className="text-xs text-stone-400">{order.table}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">
                    {order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-600">{typeLabels[order.type]}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                        statusConfig[order.status].className
                      )}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-stone-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-stone-400">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
