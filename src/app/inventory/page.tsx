import { Header } from "@/components/layout/Header";
import { inventory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AlertTriangle, Plus, Package } from "lucide-react";

export default function InventoryPage() {
  const lowStock = inventory.filter((i) => i.quantity <= i.minStock);

  return (
    <>
      <Header title="Sklad" subtitle="Sledování zásob a surovin" />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-sm">
              <p className="text-sm text-stone-500">Celkem položek</p>
              <p className="text-2xl font-bold text-stone-900">{inventory.length}</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4">
              <p className="text-sm text-amber-700">Nízký sklad</p>
              <p className="text-2xl font-bold text-amber-900">{lowStock.length}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600">
            <Plus className="h-4 w-4" />
            Přidat položku
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Surovina</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Kategorie</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Množství</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Minimum</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Dodavatel</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Poslední doplnění</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">Stav</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inventory.map((item) => {
                const isLow = item.quantity <= item.minStock;
                const percentage = Math.min((item.quantity / item.minStock) * 100, 100);

                return (
                  <tr key={item.id} className="transition hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100">
                          <Package className="h-4 w-4 text-stone-500" />
                        </div>
                        <span className="font-medium text-stone-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-stone-900">
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-500">
                      {item.minStock} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{item.supplier}</td>
                    <td className="px-6 py-4 text-sm text-stone-400">{item.lastRestocked}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              isLow ? "bg-red-500" : percentage > 150 ? "bg-emerald-500" : "bg-brand-500"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        {isLow && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
