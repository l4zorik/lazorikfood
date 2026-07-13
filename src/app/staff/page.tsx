import { Header } from "@/components/layout/Header";
import { staff } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Plus, Mail, Phone } from "lucide-react";

const statusConfig = {
  active: { label: "Aktivní", className: "bg-emerald-50 text-emerald-700" },
  "on-break": { label: "Pauza", className: "bg-amber-50 text-amber-700" },
  "off-duty": { label: "Mimo směnu", className: "bg-stone-100 text-stone-500" },
};

export default function StaffPage() {
  const activeCount = staff.filter((s) => s.status === "active").length;

  return (
    <>
      <Header title="Personál" subtitle="Správa zaměstnanců a směn" />

      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-sm">
              <p className="text-sm text-stone-500">Celkem zaměstnanců</p>
              <p className="text-2xl font-bold text-stone-900">{staff.length}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4">
              <p className="text-sm text-emerald-700">Právě aktivních</p>
              <p className="text-2xl font-bold text-emerald-900">{activeCount}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600">
            <Plus className="h-4 w-4" />
            Přidat zaměstnance
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900">{member.name}</h3>
                    <p className="text-sm text-brand-600">{member.role}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusConfig[member.status].className
                  )}
                >
                  {statusConfig[member.status].label}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-stone-400" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-stone-400" />
                  {member.phone}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                <div>
                  <p className="text-xs text-stone-400">Směna</p>
                  <p className="text-sm font-medium text-stone-700">{member.shift}</p>
                </div>
                <button className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:border-brand-300 hover:text-brand-600">
                  Upravit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
