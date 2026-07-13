import type { Order, OrderStatus } from "@/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Čeká", className: "bg-amber-50 text-amber-700" },
  preparing: { label: "Připravuje se", className: "bg-blue-50 text-blue-700" },
  ready: { label: "Připraveno", className: "bg-emerald-50 text-emerald-700" },
  delivered: { label: "Doručeno", className: "bg-stone-100 text-stone-600" },
  cancelled: { label: "Zrušeno", className: "bg-red-50 text-red-600" },
};

const typeLabels = {
  "dine-in": "Na místě",
  takeaway: "S sebou",
  delivery: "Rozvoz",
};

interface RecentOrdersProps {
  orders: Order[];
  limit?: number;
}

export function RecentOrders({ orders, limit = 5 }: RecentOrdersProps) {
  const displayed = orders.slice(0, limit);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-stone-900">Poslední objednávky</h3>
      </div>
      <div className="divide-y divide-stone-100">
        {displayed.map((order) => (
          <div key={order.id} className="flex items-center justify-between px-6 py-4 transition hover:bg-stone-50">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                {order.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium text-stone-900">{order.customer}</p>
                <p className="text-sm text-stone-500">
                  {order.id} · {typeLabels[order.type]}
                  {order.table && ` · ${order.table}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusConfig[order.status].className)}>
                {statusConfig[order.status].label}
              </span>
              <div className="text-right">
                <p className="font-semibold text-stone-900">{formatCurrency(order.total)}</p>
                <p className="text-xs text-stone-400">{formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
