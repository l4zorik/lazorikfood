"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-stone-200 bg-white/80 px-8 backdrop-blur-md">
      <div>
        <h2 className="text-xl font-bold text-stone-900">{title}</h2>
        {subtitle && <p className="text-sm text-stone-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Hledat objednávky, menu..."
            className="w-64 rounded-xl border border-stone-200 bg-stone-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <button className="relative rounded-xl border border-stone-200 p-2.5 text-stone-600 transition hover:bg-stone-50">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-stone-200 px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700">
            JL
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-stone-900">Jan Lazorík</p>
            <p className="text-xs text-stone-500">Vlastník</p>
          </div>
        </div>
      </div>
    </header>
  );
}
