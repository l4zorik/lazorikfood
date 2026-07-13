# FoodHub – Manažer potravinářského businessu

Moderní webová aplikace pro správu restaurace, bistra nebo food trucku. Vytvořeno od nuly pro [l4zorik/lazorikfood](https://github.com/l4zorik/lazorikfood).

## Funkce

- **Dashboard** – KPI metriky, týdenní graf tržeb, poslední objednávky, upozornění na nízký sklad
- **Objednávky** – přehled všech objednávek se stavy (čeká, připravuje se, připraveno, doručeno)
- **Menu** – správa jídelního lístku, cen, marží a dostupnosti
- **Sklad** – sledování surovin, dodavatelů a minimálních zásob
- **Personál** – správa zaměstnanců, směn a stavů
- **Analytika** – trendy tržeb, prodej dle kategorií, top položky
- **Nastavení** – konfigurace podniku, provozní doba, platby, rozvoz

## Tech stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Recharts** (grafy)
- **Lucide React** (ikony)

## Spuštění

```bash
npm install
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Struktura

```
src/
├── app/           # Stránky (dashboard, orders, menu, inventory, staff, analytics, settings)
├── components/    # UI komponenty (layout, dashboard)
├── lib/           # Data, utility
└── types/         # TypeScript typy
```

## Licence

Soukromý projekt – Jan Lazorík © 2026
