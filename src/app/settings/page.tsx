import { Header } from "@/components/layout/Header";
import { Building2, Clock, CreditCard, Globe, Save } from "lucide-react";

const settingsSections = [
  {
    title: "Základní informace",
    icon: Building2,
    fields: [
      { label: "Název podniku", value: "Lazorik Food", type: "text" },
      { label: "Adresa", value: "Masarykovo nám. 1, Hodonín", type: "text" },
      { label: "Telefon", value: "+420 518 123 456", type: "tel" },
      { label: "E-mail", value: "info@lazorikfood.cz", type: "email" },
    ],
  },
  {
    title: "Provozní doba",
    icon: Clock,
    fields: [
      { label: "Po–Čt", value: "10:00 – 22:00", type: "text" },
      { label: "Pá–So", value: "10:00 – 00:00", type: "text" },
      { label: "Ne", value: "11:00 – 21:00", type: "text" },
    ],
  },
  {
    title: "Platby",
    icon: CreditCard,
    fields: [
      { label: "Měna", value: "CZK (Koruna česká)", type: "text" },
      { label: "DPH", value: "12%", type: "text" },
      { label: "Platební metody", value: "Hotovost, Karta, QR platba", type: "text" },
    ],
  },
  {
    title: "Web a rozvoz",
    icon: Globe,
    fields: [
      { label: "Webová stránka", value: "www.lazorikfood.cz", type: "url" },
      { label: "Rozvoz", value: "Aktivní (do 5 km)", type: "text" },
      { label: "Minimální objednávka", value: "200 Kč", type: "text" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <>
      <Header title="Nastavení" subtitle="Konfigurace podniku a systému" />

      <div className="space-y-6 p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {settingsSections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                  <section.icon className="h-5 w-5 text-brand-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.label}>
                    <label className="mb-1.5 block text-sm font-medium text-stone-600">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600">
            <Save className="h-4 w-4" />
            Uložit nastavení
          </button>
        </div>
      </div>
    </>
  );
}
