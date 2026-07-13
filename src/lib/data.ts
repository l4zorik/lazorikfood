import type {
  BlogPost,
  DayPlan,
  FridgeItem,
  InventoryItem,
  MealPrepRecipe,
  MenuItem,
  Order,
  RevenuePoint,
  StaffMember,
  StatCard,
} from "@/types";

export const stats: StatCard[] = [
  { label: "Dnešní tržby", value: "24 850 Kč", change: "+12.5%", trend: "up" },
  { label: "Objednávky", value: "47", change: "+8", trend: "up" },
  { label: "Průměrná objednávka", value: "529 Kč", change: "+3.2%", trend: "up" },
  { label: "Nízký sklad", value: "5 položek", change: "Vyžaduje akci", trend: "down" },
];

export const revenueData: RevenuePoint[] = [
  { day: "Po", revenue: 18200, orders: 34 },
  { day: "Út", revenue: 21500, orders: 41 },
  { day: "St", revenue: 19800, orders: 38 },
  { day: "Čt", revenue: 24300, orders: 46 },
  { day: "Pá", revenue: 31200, orders: 58 },
  { day: "So", revenue: 35600, orders: 67 },
  { day: "Ne", revenue: 24850, orders: 47 },
];

export const menuItems: MenuItem[] = [
  { id: "1", name: "Burger Classic", category: "Hlavní jídla", price: 189, cost: 68, stock: 45, available: true, image: "🍔", description: "Hovězí maso, cheddar, salát, rajče, domácí omáčka" },
  { id: "2", name: "Margherita Pizza", category: "Pizza", price: 159, cost: 42, stock: 30, available: true, image: "🍕", description: "Rajčatová omáčka, mozzarella, čerstvá bazalka" },
  { id: "3", name: "Caesar Salát", category: "Saláty", price: 129, cost: 35, stock: 22, available: true, image: "🥗", description: "Římský salát, kuřecí prsa, parmazán, krutony" },
  { id: "4", name: "Tiramisu", category: "Dezerty", price: 89, cost: 28, stock: 15, available: true, image: "🍰", description: "Klasický italský dezert s mascarpone" },
  { id: "5", name: "Limonáda domácí", category: "Nápoje", price: 59, cost: 12, stock: 80, available: true, image: "🍋", description: "Čerstvá citronová limonáda s mátou" },
  { id: "6", name: "Steak Ribeye", category: "Hlavní jídla", price: 349, cost: 145, stock: 8, available: true, image: "🥩", description: "300g ribeye steak, pečené brambory, omáčka" },
  { id: "7", name: "Pasta Carbonara", category: "Těstoviny", price: 169, cost: 48, stock: 0, available: false, image: "🍝", description: "Guanciale, vejce, pecorino, černý pepř" },
  { id: "8", name: "Espresso", category: "Nápoje", price: 45, cost: 8, stock: 200, available: true, image: "☕", description: "Dvojité espresso z pražených zrn" },
];

export const orders: Order[] = [
  { id: "ORD-1047", customer: "Jan Novák", items: [{ name: "Burger Classic", qty: 2, price: 189 }, { name: "Limonáda domácí", qty: 2, price: 59 }], total: 496, status: "preparing", type: "dine-in", createdAt: "2026-07-10T18:32:00", table: "Stůl 4" },
  { id: "ORD-1046", customer: "Marie Svobodová", items: [{ name: "Margherita Pizza", qty: 1, price: 159 }], total: 159, status: "ready", type: "takeaway", createdAt: "2026-07-10T18:28:00" },
  { id: "ORD-1045", customer: "Petr Dvořák", items: [{ name: "Steak Ribeye", qty: 1, price: 349 }, { name: "Caesar Salát", qty: 1, price: 129 }], total: 478, status: "delivered", type: "dine-in", createdAt: "2026-07-10T18:15:00", table: "Stůl 7" },
  { id: "ORD-1044", customer: "Eva Horáková", items: [{ name: "Tiramisu", qty: 2, price: 89 }, { name: "Espresso", qty: 2, price: 45 }], total: 268, status: "pending", type: "delivery", createdAt: "2026-07-10T18:10:00" },
  { id: "ORD-1043", customer: "Tomáš Černý", items: [{ name: "Pasta Carbonara", qty: 1, price: 169 }], total: 169, status: "cancelled", type: "takeaway", createdAt: "2026-07-10T17:55:00" },
];

export const inventory: InventoryItem[] = [
  { id: "1", name: "Hovězí maso", category: "Maso", quantity: 12, unit: "kg", minStock: 15, supplier: "Maso Hodonín", lastRestocked: "2026-07-08" },
  { id: "2", name: "Mozzarella", category: "Sýry", quantity: 8, unit: "kg", minStock: 10, supplier: "Sýrárna Morava", lastRestocked: "2026-07-09" },
  { id: "3", name: "Rajčata", category: "Zelenina", quantity: 25, unit: "kg", minStock: 10, supplier: "Farmářský trh", lastRestocked: "2026-07-10" },
  { id: "4", name: "Těstoviny", category: "Suché zboží", quantity: 30, unit: "kg", minStock: 20, supplier: "Italské potraviny", lastRestocked: "2026-07-05" },
  { id: "5", name: "Olivový olej", category: "Oleje", quantity: 6, unit: "l", minStock: 8, supplier: "Mediterraneo", lastRestocked: "2026-07-01" },
  { id: "6", name: "Káva zrnková", category: "Nápoje", quantity: 4, unit: "kg", minStock: 5, supplier: "Coffee House", lastRestocked: "2026-07-07" },
];

export const staff: StaffMember[] = [
  { id: "1", name: "Lucie Malá", role: "Manažer", email: "lucie@lazorikfood.cz", phone: "+420 777 123 456", shift: "08:00 – 16:00", status: "active", avatar: "LM" },
  { id: "2", name: "Martin Král", role: "Šéfkuchař", email: "martin@lazorikfood.cz", phone: "+420 777 234 567", shift: "10:00 – 22:00", status: "active", avatar: "MK" },
  { id: "3", name: "Anna Procházková", role: "Servírka", email: "anna@lazorikfood.cz", phone: "+420 777 345 678", shift: "11:00 – 19:00", status: "on-break", avatar: "AP" },
  { id: "4", name: "Jakub Veselý", role: "Kuchař", email: "jakub@lazorikfood.cz", phone: "+420 777 456 789", shift: "14:00 – 22:00", status: "active", avatar: "JV" },
  { id: "5", name: "Kateřina Nová", role: "Servírka", email: "katerina@lazorikfood.cz", phone: "+420 777 567 890", shift: "16:00 – 00:00", status: "off-duty", avatar: "KN" },
];

export const categories = ["Vše", "Hlavní jídla", "Pizza", "Těstoviny", "Saláty", "Dezerty", "Nápoje"];

export const weekPlan: DayPlan[] = [
  { date: "2026-07-14", entries: [{ id: "p1", name: "Čínská polévka", type: "plan" }, { id: "p2", name: "5 rohlíků", type: "plan" }] },
  { date: "2026-07-15", entries: [{ id: "p3", name: "Čínská polévka", type: "plan" }, { id: "p4", name: "5 rohlíků", type: "plan" }] },
  { date: "2026-07-16", entries: [{ id: "p5", name: "Čínská polévka", type: "plan" }, { id: "p6", name: "5 rohlíků", type: "plan" }] },
  { date: "2026-07-17", entries: [{ id: "p7", name: "Řízky", type: "plan" }, { id: "p8", name: "Bramborový salát", type: "plan" }, { id: "p14", name: "Ledová tříšť", type: "craving" }, { id: "p15", name: "Jahodový koktejl", type: "craving" }] },
  { date: "2026-07-18", entries: [{ id: "p9", name: "Langoše", type: "plan" }, { id: "p10", name: "Česneková omáčka", type: "plan" }, { id: "p11", name: "Minerálka", type: "craving" }] },
  { date: "2026-07-19", entries: [{ id: "p12", name: "Minerálka", type: "plan" }, { id: "p13", name: "Grilovaný hermelín", type: "craving" }] },
];

export const fridgeStock: FridgeItem[] = [
  { id: "f1", name: "Mleté maso", quantity: 2, unit: "kg", category: "Maso" },
  { id: "f2", name: "Kuřecí prsa", quantity: 1.5, unit: "kg", category: "Maso" },
  { id: "f3", name: "Vepřová krkovice", quantity: 1, unit: "kg", category: "Maso" },
  { id: "f4", name: "Hovězí roastbeef", quantity: 0.5, unit: "kg", category: "Maso" },
  { id: "f5", name: "Slanina", quantity: 200, unit: "g", category: "Maso" },
  { id: "f6", name: "Kuřecí stehna", quantity: 1, unit: "kg", category: "Maso" },
  { id: "f7", name: "Mleté vepřové", quantity: 500, unit: "g", category: "Maso" },
  { id: "f8", name: "Rajčata", quantity: 8, unit: "ks", category: "Zelenina" },
  { id: "f9", name: "Okurka salátová", quantity: 2, unit: "ks", category: "Zelenina" },
  { id: "f10", name: "Paprika červená", quantity: 3, unit: "ks", category: "Zelenina" },
  { id: "f11", name: "Paprika zelená", quantity: 2, unit: "ks", category: "Zelenina" },
  { id: "f12", name: "Cibule", quantity: 6, unit: "ks", category: "Zelenina" },
  { id: "f13", name: "Česnek", quantity: 4, unit: "paličky", category: "Zelenina" },
  { id: "f14", name: "Brambory", quantity: 3, unit: "kg", category: "Zelenina" },
  { id: "f15", name: "Mrkev", quantity: 5, unit: "ks", category: "Zelenina" },
  { id: "f16", name: "Celer", quantity: 1, unit: "ks", category: "Zelenina" },
  { id: "f17", name: "Petržel", quantity: 2, unit: "ks", category: "Zelenina" },
  { id: "f18", name: "Pórek", quantity: 1, unit: "ks", category: "Zelenina" },
  { id: "f19", name: "Rukola", quantity: 1, unit: "balení", category: "Zelenina" },
  { id: "f20", name: "Cuketa", quantity: 2, unit: "ks", category: "Zelenina" },
  { id: "f21", name: "Lilek", quantity: 1, unit: "ks", category: "Zelenina" },
  { id: "f22", name: "Žampiony", quantity: 300, unit: "g", category: "Zelenina" },
  { id: "f23", name: "Sýr (eidam)", quantity: 300, unit: "g", category: "Sýry" },
  { id: "f24", name: "Mozzarella", quantity: 3, unit: "ks", category: "Sýry" },
  { id: "f25", name: "Parmazán", quantity: 150, unit: "g", category: "Sýry" },
  { id: "f26", name: "Niva", quantity: 100, unit: "g", category: "Sýry" },
  { id: "f27", name: "Hermelín", quantity: 2, unit: "ks", category: "Sýry" },
  { id: "f28", name: "Gouda", quantity: 200, unit: "g", category: "Sýry" },
  { id: "f29", name: "Tvaroh", quantity: 250, unit: "g", category: "Mléčné" },
  { id: "f30", name: "Vejce", quantity: 15, unit: "ks", category: "Mléčné" },
  { id: "f31", name: "Máslo", quantity: 250, unit: "g", category: "Mléčné" },
  { id: "f32", name: "Mléko", quantity: 1, unit: "l", category: "Mléčné" },
  { id: "f33", name: "Smetana ke šlehání", quantity: 200, unit: "ml", category: "Mléčné" },
  { id: "f34", name: "Jogurt bílý", quantity: 4, unit: "ks", category: "Mléčné" },
  { id: "f35", name: "Těstoviny (penne)", quantity: 500, unit: "g", category: "Suché" },
  { id: "f36", name: "Těstoviny (špagety)", quantity: 1, unit: "kg", category: "Suché" },
  { id: "f37", name: "Rýže", quantity: 1, unit: "kg", category: "Suché" },
  { id: "f38", name: "Bramborová kaše vločky", quantity: 250, unit: "g", category: "Suché" },
  { id: "f39", name: "Couscous", quantity: 250, unit: "g", category: "Suché" },
  { id: "f40", name: "Rajský protlak", quantity: 3, unit: "plechovky", category: "Konzervy" },
  { id: "f41", name: "Krájená rajčata", quantity: 2, unit: "plechovky", category: "Konzervy" },
  { id: "f42", name: "Fazole červené", quantity: 1, unit: "plechovka", category: "Konzervy" },
  { id: "f43", name: "Cizrna", quantity: 1, unit: "plechovka", category: "Konzervy" },
  { id: "f44", name: "Tuňák", quantity: 2, unit: "plechovky", category: "Konzervy" },
  { id: "f45", name: "Kukuřice", quantity: 1, unit: "plechovka", category: "Konzervy" },
  { id: "f46", name: "Olivový olej", quantity: 500, unit: "ml", category: "Oleje" },
  { id: "f47", name: "Řepkový olej", quantity: 1, unit: "l", category: "Oleje" },
  { id: "f48", name: "Sůl", quantity: 1, unit: "kg", category: "Koření" },
  { id: "f49", name: "Pepř černý mletý", quantity: 50, unit: "g", category: "Koření" },
  { id: "f50", name: "Kmín", quantity: 30, unit: "g", category: "Koření" },
  { id: "f51", name: "Paprika sladká", quantity: 40, unit: "g", category: "Koření" },
  { id: "f52", name: "Oregano", quantity: 20, unit: "g", category: "Koření" },
  { id: "f53", name: "Bazalka sušená", quantity: 20, unit: "g", category: "Koření" },
  { id: "f54", name: "Kari", quantity: 30, unit: "g", category: "Koření" },
  { id: "f55", name: "Chilli", quantity: 15, unit: "g", category: "Koření" },
  { id: "f56", name: "Bobkový list", quantity: 10, unit: "ks", category: "Koření" },
  { id: "f57", name: "Hladká mouka", quantity: 1, unit: "kg", category: "Suché" },
  { id: "f58", name: "Cukr krystal", quantity: 1, unit: "kg", category: "Suché" },
  { id: "f59", name: "Med", quantity: 200, unit: "g", category: "Suché" },
  { id: "f60", name: "Kečup", quantity: 1, unit: "láhev", category: "Omáčky" },
  { id: "f61", name: "Hořčice plnotučná", quantity: 1, unit: "ks", category: "Omáčky" },
  { id: "f62", name: "Sójová omáčka", quantity: 200, unit: "ml", category: "Omáčky" },
  { id: "f63", name: "Majonéza", quantity: 200, unit: "ml", category: "Omáčky" },
  { id: "f64", name: "Chléb toastový", quantity: 1, unit: "balení", category: "Pečivo" },
  { id: "f65", name: "Rohlíky", quantity: 6, unit: "ks", category: "Pečivo" },
  { id: "f66", name: "Máslové croissanty", quantity: 4, unit: "ks", category: "Pečivo" },
  { id: "f67", name: "Mražený hrášek", quantity: 300, unit: "g", category: "Mražené" },
  { id: "f68", name: "Mražená brokolice", quantity: 300, unit: "g", category: "Mražené" },
  { id: "f69", name: "Mražené brusinky", quantity: 200, unit: "g", category: "Mražené" },
  { id: "f70", name: "Citrony", quantity: 3, unit: "ks", category: "Ovoce" },
  { id: "f71", name: "Banány", quantity: 4, unit: "ks", category: "Ovoce" },
  { id: "f72", name: "Jablka", quantity: 5, unit: "ks", category: "Ovoce" },
];

export const mealPrepRecipes: MealPrepRecipe[] = [
  // === GRILOVÁNÍ ===
  {
    id: "r1", name: "Grilovaná krkovice s bramboráky", emoji: "🥩",
    description: "Šťavnatá vepřová krkovice naložená v marinádě, podávaná s křupavými bramboráky.",
    prepTime: "2h (včetně marinování)", portions: 4,
    ingredients: [
      { name: "Vepřová krkovice", amount: "1 kg" },
      { name: "Brambory", amount: "1 kg" },
      { name: "Vejce", amount: "2 ks" },
      { name: "Česnek", amount: "4 stroužky" },
      { name: "Majoránka", amount: "1 lžička" },
      { name: "Olej, sůl, pepř, grilovací koření", amount: "dle chuti" },
    ],
    steps: [
      "Nakrájej krkovici na plátky asi 2 cm silné.",
      "Smíchej olej, prolisovaný česnek, grilovací koření, sůl a pepř. Nalož maso na min. 1 hod.",
      "Nastrouhej brambory nahrubo, vymačkej vodu.",
      "Přidej vejce, prolisovaný česnek, majoránku, sůl, pepř a promíchej.",
      "Rozpal gril nebo pánev. Griluj maso z každé strany 5-7 minut.",
      "Na pánvi smaž bramboráky dozlatova z obou stran.",
      "Podávej maso s bramboráky a zeleninovým salátem.",
    ], category: "grilování",
  },
  {
    id: "r2", name: "Grilovaný hermelín s brusinkami", emoji: "🧀",
    description: "Rozteklý hermelín z grilu s brusinkami – dokonalá chuťovka.",
    prepTime: "20 min", portions: 2,
    ingredients: [
      { name: "Hermelín", amount: "2 ks" },
      { name: "Brusinkový džem", amount: "4 lžíce" },
      { name: "Chléb toastový", amount: "4 plátky" },
      { name: "Olivový olej", amount: "2 lžíce" },
      { name: "Čerstvá rukola", amount: "1 hrst" },
    ],
    steps: [
      "Hermelíny podélně rozkroj napůl.",
      "Polož na alobal, pokapej olejem.",
      "Griluj 4 minuty z každé strany, dokud sýr nezačne měknout.",
      "Opeč chleba na grilu dozlatova.",
      "Na talíři dej opečený chléb, rukolu, hermelín a lžíci brusinek.",
    ], category: "grilování",
  },
  {
    id: "r3", name: "Grilovaná kuřecí stehna v bylinkách", emoji: "🍗",
    description: "Šťavnatá kuřecí stehna s čerstvými bylinkami a citronem.",
    prepTime: "1h 15min", portions: 4,
    ingredients: [
      { name: "Kuřecí stehna", amount: "4 ks" },
      { name: "Rozmarýn čerstvý", amount: "3 snítky" },
      { name: "Česnek", amount: "3 stroužky" },
      { name: "Citron", amount: "1 ks" },
      { name: "Olivový olej", amount: "4 lžíce" },
      { name: "Sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Smíchej olej, prolisovaný česnek, nasekaný rozmarýn, šťávu z citronu, sůl a pepř.",
      "Kuřecí stehna nalož do marinády na 30 minut.",
      "Rozpal gril na střední teplotu.",
      "Griluj stehna 20-25 minut z každé strany dozlatova.",
      "Podávej s grilovanou zeleninou nebo bramborami.",
    ], category: "grilování",
  },
  {
    id: "r4", name: "Grilovaný losos s citronem", emoji: "🐟",
    description: "Lehký a zdravý – losos z grilu s grilovaným chřestem.",
    prepTime: "25 min", portions: 2,
    ingredients: [
      { name: "Losos filet", amount: "2 porce" },
      { name: "Chřest zelený", amount: "1 svazek" },
      { name: "Citron", amount: "1 ks" },
      { name: "Olivový olej", amount: "3 lžíce" },
      { name: "Sůl, pepř, kopr", amount: "dle chuti" },
    ],
    steps: [
      "Lososa osol, opepři a pokapej citronem s olivovým olejem.",
      "Chřest očisti, pokapej olejem a osol.",
      "Rozpal gril. Lososa griluj 4 minuty z každé strany.",
      "Chřest griluj 3-4 minuty do změknutí.",
      "Podávej lososa s chřestem a plátkem citronu.",
    ], category: "grilování",
  },
  {
    id: "r5", name: "Grillované zeleninové špízy", emoji: "🥗",
    description: "Barevné špízy z grilované zeleniny – skvělá příloha nebo lehká večeře.",
    prepTime: "30 min (+ 30 min marinování)", portions: 4,
    ingredients: [
      { name: "Cuketa", amount: "1 ks" },
      { name: "Lilek", amount: "1 ks" },
      { name: "Paprika červená", amount: "2 ks" },
      { name: "Červená cibule", amount: "1 ks" },
      { name: "Žampiony", amount: "200 g" },
      { name: "Olivový olej, sůl, pepř, bylinky", amount: "dle chuti" },
    ],
    steps: [
      "Veškerou zeleninu nakrájej na větší kusy.",
      "Smíchej olej, sůl, pepř a bylinky. Zeleninu v marinádě nech 30 min.",
      "Napichuj na špízy střídavě druhy zeleniny.",
      "Griluj 10-15 minut za občasného otáčení.",
      "Podávej jako přílohu k masu nebo samostatně.",
    ], category: "grilování",
  },
  {
    id: "r6", name: "Vepřová žebírka v BBQ marinádě", emoji: "🍖",
    description: "Domácí BBQ žebírka – pomalu grilovaná dokřupava.",
    prepTime: "2h 30min", portions: 4,
    ingredients: [
      { name: "Vepřová žebírka", amount: "1.5 kg" },
      { name: "Kečup", amount: "4 lžíce" },
      { name: "Med", amount: "2 lžíce" },
      { name: "Sójová omáčka", amount: "2 lžíce" },
      { name: "Česnek", amount: "3 stroužky" },
      { name: "Hořčice, uzená paprika, chilli", amount: "dle chuti" },
    ],
    steps: [
      "Smíchej kečup, med, sójovku, prolisovaný česnek, hořčici, papriku a chilli.",
      "Žebírka nalož do BBQ marinády alespoň na 2 hodiny (ideálně přes noc).",
      "Rozpal gril na střední teplotu.",
      "Griluj žebírka 30-40 minut, potírej zbylou marinádou.",
      "Nakonec nech pár minut na přímém žáru dozkrava.",
    ], category: "grilování",
  },

  // === ČESKÁ ===
  {
    id: "r7", name: "Svíčková na smetaně", emoji: "🥩",
    description: "Klasická česká svíčková s houskovým knedlíkem – sytá a krémová.",
    prepTime: "2 hodiny", portions: 6,
    ingredients: [
      { name: "Hovězí zadní", amount: "800 g" },
      { name: "Kořenová zelenina", amount: "500 g" },
      { name: "Cibule", amount: "2 ks" },
      { name: "Smetana ke šlehání", amount: "200 ml" },
      { name: "Máslo", amount: "50 g" },
      { name: "Hladká mouka", amount: "2 lžíce" },
      { name: "Houskový knedlík", amount: "1 balení" },
      { name: "Nové koření, bobkový list, sůl, pepř, citron", amount: "dle chuti" },
    ],
    steps: [
      "Maso protkni slaninou a ze všech stran orestuj na másle.",
      "Přidej nakrájenou cibuli a zeleninu, restuj 5 minut.",
      "Zalij vodou, přidej nové koření a bobkový list. Dust doměkka ~1.5 hod.",
      "Maso vyndej. Zeleninu rozmixuj ponorným mixérem.",
      "Zahustě moukou rozmíchanou ve smetaně, provař.",
      "Přidej šťávu z citronu, sůl, pepř podle chuti.",
      "Nakrájené maso vrať do omáčky a prohřej.",
      "Podávej s houskovým knedlíkem a brusinkami.",
    ], category: "česká",
  },
  {
    id: "r8", name: "Hovězí guláš s knedlíkem", emoji: "🥘",
    description: "Poctivý český guláš – hustý, masitý, voňavý. Lepší než v hospodě.",
    prepTime: "2 hodiny", portions: 6,
    ingredients: [
      { name: "Hovězí maso (plec/žebra)", amount: "1 kg" },
      { name: "Cibule", amount: "4 ks" },
      { name: "Česnek", amount: "4 stroužky" },
      { name: "Sladká paprika", amount: "2 lžíce" },
      { name: "Rajčatový protlak", amount: "2 lžíce" },
      { name: "Kmín, majoránka, sůl, pepř, chilli", amount: "dle chuti" },
      { name: "Hladká mouka na zahuštění", amount: "2 lžíce" },
    ],
    steps: [
      "Cibuli nakrájej nadrobno a orestuj na sádle dozlatova.",
      "Přidej na kostky nakrájené maso a orestuj ze všech stran.",
      "Zapraš paprikou, přidej prolisovaný česnek, kmín a protlak.",
      "Zalij vodou, osol, opepři a dust pod pokličkou 1.5 hodiny.",
      "Až je maso měkké, zahusti moukou rozmíchanou ve studené vodě.",
      "Přidej majoránku a chilli, provař 10 minut.",
      "Podávej s houskovým knedlíkem nebo chlebem.",
    ], category: "česká",
  },
  {
    id: "r9", name: "Bramboračka", emoji: "🥣",
    description: "Klasická česká bramboračka s houbami – sytá polívka na všechny způsoby.",
    prepTime: "50 min", portions: 6,
    ingredients: [
      { name: "Brambory", amount: "6 ks" },
      { name: "Sušené houby", amount: "hrst" },
      { name: "Mrkev", amount: "2 ks" },
      { name: "Celer", amount: "kousek" },
      { name: "Petržel", amount: "1 ks" },
      { name: "Cibule", amount: "1 ks" },
      { name: "Česnek, majoránka, kmín, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Houby namoč na 20 minut do teplé vody.",
      "Zeleninu nakrájej na kostičky. Cibuli orestuj.",
      "Přidej mrkev, celer, petržel, chvíli restuj.",
      "Přidej na kostičky nakrájené brambory, houby i vodu z nich.",
      "Zalij vodou, přidej kmín, sůl, pepř a vař 25 minut.",
      "Nakonec přidej prolisovaný česnek a majoránku.",
    ], category: "česká",
  },
  {
    id: "r10", name: "Vepřo knedlo zelo", emoji: "🥘",
    description: "Nedělní klasika – pečené vepřové, houskový knedlík a kysané zelí.",
    prepTime: "2 hodiny", portions: 4,
    ingredients: [
      { name: "Vepřová pečeně", amount: "700 g" },
      { name: "Kysané zelí", amount: "500 g" },
      { name: "Houskový knedlík", amount: "1 balení" },
      { name: "Cibule, česnek, kmín, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Maso omyj, osuš, osol, opepři a posyp kmínem.",
      "V pekáči zpraž na sádle cibuli, přidej maso.",
      "Podlij trochou vody a peč při 180°C asi 1.5 hodiny.",
      "Během pečení přelévej výpekem.",
      "Zelí ohřej na pánvi, případně lehce dosol a opepři.",
      "Knedlík nakrájej na plátky. Podávej s masem a zelím.",
    ], category: "česká",
  },
  {
    id: "r11", name: "Koprová omáčka s vejcem", emoji: "🥚",
    description: "Jemná koprová omáčka s vajíčkem a bramborem – vzpomínka na dětství.",
    prepTime: "40 min", portions: 4,
    ingredients: [
      { name: "Kopr čerstvý", amount: "1 svazek" },
      { name: "Máslo", amount: "40 g" },
      { name: "Hladká mouka", amount: "2 lžíce" },
      { name: "Mléko", amount: "500 ml" },
      { name: "Vejce", amount: "4 ks" },
      { name: "Brambory", amount: "6 ks" },
      { name: "Ocet, cukr, sůl", amount: "dle chuti" },
    ],
    steps: [
      "Uvař brambory ve slupce.",
      "Na másle připrav světlou jíšku, zalij mlékem a rozmixuj.",
      "Nasekaný kopr přidej do omáčky a vař 10 minut.",
      "Ochutí octem, cukrem a solí.",
      "Uvař vejce natvrdo (8 minut).",
      "Oloupej brambory, nakrájej na plátky.",
      "Podávej – brambory, přelij omáčkou, posyp koprem a přidej půlku vejce.",
    ], category: "česká",
  },

  // === ITALSKÁ ===
  {
    id: "r12", name: "Špagety Carbonara", emoji: "🍝",
    description: "Italská klasika – špagety s guancialem, vejcem a pecorinem. Žádná smetana!",
    prepTime: "25 min", portions: 3,
    ingredients: [
      { name: "Špagety", amount: "400 g" },
      { name: "Guanciale / slanina", amount: "200 g" },
      { name: "Vejce", amount: "4 ks" },
      { name: "Pecorino / parmazán", amount: "100 g" },
      { name: "Pepř černý", amount: "1 lžička" },
    ],
    steps: [
      "Dej vařit vodu na těstoviny. Mezitím nakrájej guanciale na kostičky.",
      "Na suché pánvi opeč guanciale do křupava.",
      "Smíchej vejce s nastrouhaným sýrem a pepřem.",
      "Uvař špagety dle návodu, 1 min před koncem odeber šálek vody.",
      "Horké těstoviny vmíchej ke guanciali, odstav z plotny.",
      "Přidej vaječnou směs a rychle míchej – vejce se nesmí srazit.",
      "V případě potřeby přidej trochu vody z těstovin.",
      "Ihned podávej posypané sýrem a pepřem.",
    ], category: "italská",
  },
  {
    id: "r13", name: "Pizza Margherita domácí", emoji: "🍕",
    description: "Křupavá domácí pizza s rajčatovou omáčkou a mozzarellou.",
    prepTime: "1h 30min", portions: 4,
    ingredients: [
      { name: "Hladká mouka", amount: "500 g" },
      { name: "Droždí", amount: "1 kostka" },
      { name: "Rajčatový protlak", amount: "200 ml" },
      { name: "Mozzarella", amount: "250 g" },
      { name: "Olivový olej, sůl, oregano, bazalka", amount: "dle chuti" },
    ],
    steps: [
      "Z mouky, droždí, vlažné vody, soli a oleje zpracuj těsto.",
      "Nech kynout 45 minut na teplém místě.",
      "Rajčatový protlak smíchej s olejem, solí a oreganem.",
      "Těsto rozděl na 4 díly, vyválej placky.",
      "Potřij omáčkou, posyp natrhanou mozzarellou.",
      "Peč při 250°C 10-12 minut dozlatova.",
      "Doplň čerstvou bazalkou.",
    ], category: "italská",
  },
  {
    id: "r14", name: "Rizoto s kuřetem a hráškem", emoji: "🍚",
    description: "Krémové rizoto s kuřecím masem a zeleným hráškem.",
    prepTime: "40 min", portions: 3,
    ingredients: [
      { name: "Rýže arborio", amount: "300 g" },
      { name: "Kuřecí prsa", amount: "200 g" },
      { name: "Mražený hrášek", amount: "150 g" },
      { name: "Cibule", amount: "1 ks" },
      { name: "Vývar", amount: "750 ml" },
      { name: "Parmazán", amount: "50 g" },
      { name: "Olivový olej, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Cibuli nakrájej nadrobno a orestuj na oleji.",
      "Přidej na kostičky nakrájené kuřecí maso a orestuj.",
      "Přidej rýži a za stálého míchání 2 minuty restuj.",
      "Postupně přilévej vývar po naběračce a míchej.",
      "Po 15 minutách přidej hrášek.",
      "Až je rýže krémová (~20 min), stáhni z plotny.",
      "Vmiř parmazán, přikryj pokličkou a nech 2 minuty odstát.",
    ], category: "italská",
  },
  {
    id: "r15", name: "Bruschetta s rajčaty", emoji: "🥖",
    description: "Jednoduchá italská snídaně nebo předkrm – čerstvá rajčata na křupavém chlebu.",
    prepTime: "15 min", portions: 2,
    ingredients: [
      { name: "Rajčata", amount: "4 ks" },
      { name: "Chléb ciabatta", amount: "4 plátky" },
      { name: "Česnek", amount: "2 stroužky" },
      { name: "Bazalka čerstvá", amount: "5 lístků" },
      { name: "Olivový olej, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Rajčata nakrájej na kostičky, osol, opepři a pokapej olejem.",
      "Chléb opeč na pánvi nebo v troubě dozlatova.",
      "Každý plátek potři prolisovaným česnekem.",
      "Nalož rajčata na chléb.",
      "Ozdob lístky bazalky a zakápni olivovým olejem.",
    ], category: "italská",
  },

  // === ASIJSKÁ ===
  {
    id: "r16", name: "Kuřecí kari s rýží", emoji: "🍛",
    description: "Voňavé kuřecí kari v kokosovém mléce. Lepší než z bistra.",
    prepTime: "35 min", portions: 4,
    ingredients: [
      { name: "Kuřecí prsa", amount: "400 g" },
      { name: "Kokosové mléko", amount: "400 ml" },
      { name: "Kari pasta", amount: "2 lžíce" },
      { name: "Rýže jasmínová", amount: "300 g" },
      { name: "Cibule, česnek, zázvor", amount: "dle chuti" },
      { name: "Sójová omáčka, limetka", amount: "dle chuti" },
    ],
    steps: [
      "Rýži uvař dle návodu.",
      "Na oleji orestuj na kostičky nakrájená kuřecí prsa.",
      "Přidej cibuli, česnek a zázvor nakrájený na drobno.",
      "Vmiř kari pastu a minutu restuj.",
      "Přilij kokosové mléko, přidej sójovku a vař 10 minut.",
      "Ochutí šťávou z limetky.",
      "Podávej s rýží.",
    ], category: "asijská",
  },
  {
    id: "r17", name: "Wok nudle se zeleninou", emoji: "🥡",
    description: "Rychlé wok nudle s křupavou zeleninou a sójovo-sezamovou omáčkou.",
    prepTime: "20 min", portions: 2,
    ingredients: [
      { name: "Vaječné nudle", amount: "250 g" },
      { name: "Mrkev", amount: "2 ks" },
      { name: "Paprika", amount: "1 ks" },
      { name: "Cuketa", amount: "1 ks" },
      { name: "Sójová omáčka", amount: "3 lžíce" },
      { name: "Sezamový olej", amount: "1 lžíce" },
      { name: "Česnek, zázvor, chilli", amount: "dle chuti" },
      { name: "Vejce", amount: "2 ks" },
    ],
    steps: [
      "Uvař nudle dle návodu, scedi a propláchni.",
      "Zeleninu nakrájej na nudličky.",
      "Na wok pánvi rozehřej olej, orestuj česnek se zázvorem.",
      "Přidej zeleninu a restuj 3-4 minuty.",
      "Zatlač zeleninu na stranu, na volné místo rozklepni vejce a zamíchej.",
      "Přidej nudle, sójovou omáčku a sezamový olej.",
      "Promíchej, opepři, posyp sezamem a podávej.",
    ], category: "asijská",
  },
  {
    id: "r18", name: "Ramen polévka", emoji: "🍜",
    description: "Autentická ramen polévka s vepřovým masem a vajíčkem.",
    prepTime: "1h 15min", portions: 3,
    ingredients: [
      { name: "Ramen nudle", amount: "300 g" },
      { name: "Vepřová pečeně", amount: "300 g" },
      { name: "Vývar (kuřecí/hovězí)", amount: "1.5 l" },
      { name: "Vejce", amount: "3 ks" },
      { name: "Sójová omáčka", amount: "4 lžíce" },
      { name: "Česnek, zázvor, jarní cibulka", amount: "dle chuti" },
    ],
    steps: [
      "Vepřové maso upeč doměkka v troubě (180°C, 40 min).",
      "Vejce uvař naměkko (6.5 min), oloupej a přepůl.",
      "Vývar přiveď k varu, přidej prolisovaný česnek, zázvor a sójovku.",
      "Uvař ramen nudle dle návodu.",
      "Do misek rozděl nudle, zalij horkým vývarem.",
      "Přidej plátky pečeného masa, půlky vajec a jarní cibulku.",
    ], category: "asijská",
  },
  {
    id: "r19", name: "Sushi maki (domácí)", emoji: "🍣",
    description: "Jednoduché domácí sushi – rýže, losos, avokádo a nori plátky.",
    prepTime: "1 hodina", portions: 4,
    ingredients: [
      { name: "Sushi rýže", amount: "300 g" },
      { name: "Nori plátky", amount: "6 ks" },
      { name: "Losos (sushi kvalita)", amount: "200 g" },
      { name: "Avokádo", amount: "1 ks" },
      { name: "Rýžový ocet", amount: "3 lžíce" },
      { name: "Sójová omáčka, wasabi, zázvor", amount: "na podávání" },
    ],
    steps: [
      "Rýži propláchni do čisté vody. Uvař dle návodu.",
      "Do horké rýže vmíchej rýžový ocet a nech vychladnout.",
      "Lososa a avokádo nakrájej na dlouhé hranolky.",
      "Na bambusovou podložku polož nori plátek lesklou stranou dolů.",
      "Navlhčenýma rukama rozprostři rýži v tenké vrstvě.",
      "Doprostřed dej lososa s avokádem a sroluj pomoci podložky.",
      "Krájej ostrým nohem na 2 cm silné kousky.",
      "Podávej se sójovou omáčkou, wasabi a zázvorem.",
    ], category: "asijská",
  },

  // === ČÍNSKÁ (rozšíření) ===
  {
    id: "r20", name: "Kuřecí Kung Pao", emoji: "🍗",
    description: "Klasické čínské kung pao kufe – křupavé kuřecí kousky s arašídy, chilli a zeleninou.",
    prepTime: "30 min", portions: 3,
    ingredients: [
      { name: "Kuřecí prsa", amount: "400 g" },
      { name: "Arašídy (nesolené)", amount: "100 g" },
      { name: "Paprika červená a zelená", amount: "2 ks" },
      { name: "Cibule jarní", amount: "4 ks" },
      { name: "Sójová omáčka", amount: "3 lžíce" },
      { name: "Rýžový ocet", amount: "1 lžíce" },
      { name: "Chilli sušené", amount: "5 ks" },
      { name: "Česnek, zázvor, olej, kukuřičný škrob", amount: "dle chuti" },
    ],
    steps: [
      "Kuřecí prsa nakrájej na kostičky, obal v kukuřičném škrobu.",
      "Na woku rozehřej olej, kuřecí maso rychle orestuj a dej stranou.",
      "Na zbylém oleji orestuj nakrájenou papriku, jarní cibulku a chilli.",
      "Přidej prolisovaný česnek a nastrouhaný zázvor.",
      "Vrať maso zpět do woku.",
      "Přidej sójovou omáčku a ocet. Restuj 2 minuty.",
      "Přidej arašídy, promíchej a hned podávej s rýží.",
    ], category: "asijská",
  },
  {
    id: "r21", name: "Vepřové sladkokyselé", emoji: "🥓",
    description: "Křupavé vepřové kousky v lehké sladkokyselé omáčce s ananasem.",
    prepTime: "35 min", portions: 3,
    ingredients: [
      { name: "Vepřová kýta/plec", amount: "400 g" },
      { name: "Ananas (kousky)", amount: "200 g" },
      { name: "Paprika červená", amount: "1 ks" },
      { name: "Cibule", amount: "1 ks" },
      { name: "Rajčatový protlak", amount: "2 lžíce" },
      { name: "Ocet, cukr, sójová omáčka, kečup", amount: "4 lžíce" },
      { name: "Kukuřičný škrob, olej, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Maso nakrájej na kostičky, osol, opepři a obal ve škrobu.",
      "Osmaž na oleji dozlatova a dej stranou.",
      "Na pánvi orestuj cibuli a papriku nakrájenou na kousky.",
      "Přidej ananas a minutu restuj.",
      "Smíchej protlak, kečup, ocet, cukr, sójovku a trochu vody.",
      "Omáčku vlij k zelenině, přiveď k varu.",
      "Vrať maso do pánve, promíchej a zahřej.",
      "Podávej s jasmínovou rýží nebo nudlemi.",
    ], category: "asijská",
  },
  {
    id: "r22", name: "Chow Mein – čínské nudle", emoji: "🥡",
    description: "Autentické čínské smažené nudle s masem a zeleninou – lepší než z rozvozu.",
    prepTime: "25 min", portions: 3,
    ingredients: [
      { name: "Vaječné nudle (silné)", amount: "300 g" },
      { name: "Kuřecí prsa / vepřové maso", amount: "250 g" },
      { name: "Zelí čínské", amount: "150 g" },
      { name: "Mrkev", amount: "1 ks" },
      { name: "Klíčky fazolové", amount: "100 g" },
      { name: "Jarní cibulka", amount: "3 ks" },
      { name: "Sójová omáčka, sezamový olej, česnek, zázvor", amount: "dle chuti" },
    ],
    steps: [
      "Uvař nudle dle návodu, scedi a propláchni studenou vodou.",
      "Maso nakrájej na tenké nudličky.",
      "Na woku rozehřej olej, maso rychle orestuj a dej stranou.",
      "Na zbylém oleji orestuj nakrájenou zeleninu – nejdřív mrkev a zelí.",
      "Přidej fazolové klíčky a jarní cibulku, restuj 2 min.",
      "Přidej nudle, sójovou omáčku a sezamový olej.",
      "Vrať maso do woku a vše promíchej.",
      "Restuj ještě 2 minuty a podávej horké.",
    ], category: "asijská",
  },
  {
    id: "r23", name: "Jarní závitky", emoji: "🥟",
    description: "Křupavé smažené jarní závitky plněné masem a zeleninou.",
    prepTime: "45 min", portions: 12,
    ingredients: [
      { name: "Rýžový papír / jarní těsto", amount: "12 ks" },
      { name: "Mleté vepřové / kuřecí", amount: "250 g" },
      { name: "Zelí čínské", amount: "150 g" },
      { name: "Mrkev", amount: "1 ks" },
      { name: "Houby (shiitake)", amount: "100 g" },
      { name: "Sójová omáčka, česnek, pepř", amount: "dle chuti" },
      { name: "Olej na smažení", amount: "1 l" },
    ],
    steps: [
      "Maso orestuj na pánvi, přidej nadrobno nakrájenou zeleninu.",
      "Osol, opepři, přidej sójovku a česnek. Nech vychladnout.",
      "Rýžový papír namoč na pár vteřin do teplé vody.",
      "Doprostřed dej lžíci náplně a pevně sroluj do závitku.",
      "Smaž v rozpáleném oleji dozlatova z obou stran.",
      "Nech okapat na papírové utěrce.",
      "Podávej se sladko-chilli omáčkou.",
    ], category: "asijská",
  },
  {
    id: "r24", name: "Kuřecí s brokolicí (čínsky)", emoji: "🥦",
    description: "Lehké čínské stir-fry kuřecí maso s brokolicí v česnekové omáčce.",
    prepTime: "20 min", portions: 2,
    ingredients: [
      { name: "Kuřecí prsa", amount: "300 g" },
      { name: "Brokolice", amount: "200 g" },
      { name: "Česnek", amount: "3 stroužky" },
      { name: "Sójová omáčka", amount: "3 lžíce" },
      { name: "Olej, kukuřičný škrob, cukr", amount: "dle chuti" },
    ],
    steps: [
      "Kuřecí maso nakrájej na tenké plátky, obal ve škrobu.",
      "Brokolici rozeber na růžičky.",
      "Na woku rozehřej olej, kuřecí maso orestuj a dej stranou.",
      "Na oleji orestuj brokolici a prolisovaný česnek.",
      "Podlij trochou vody a přiklop na 3 minuty.",
      "Smíchej sójovku s cukrem a lžičkou škrobu.",
      "Vrať maso do woku, přidej omáčku a promíchej.",
      "Restuj 2 minuty do zhoustnutí omáčky.",
    ], category: "asijská",
  },
  {
    id: "r25", name: "Mapo Tofu", emoji: "🫘",
    description: "Pikantní čínské tofu na čínský způsob s mletým vepřovým – výbuch chutí.",
    prepTime: "25 min", portions: 2,
    ingredients: [
      { name: "Tofu měkké", amount: "400 g" },
      { name: "Mleté vepřové", amount: "150 g" },
      { name: "Chilli omáčka (doubanjiang)", amount: "2 lžíce" },
      { name: "Sójová omáčka", amount: "2 lžíce" },
      { name: "Česnek, zázvor, jarní cibulka", amount: "dle chuti" },
      { name: "Kukuřičný škrob", amount: "1 lžíce" },
    ],
    steps: [
      "Tofu nakrájej na kostičky a spař horkou vodou.",
      "Na oleji orestuj mleté vepřové dohněda.",
      "Přidej prolisovaný česnek, zázvor a chilli omáčku.",
      "Přidej tofu a opatrně promíchej.",
      "Zalij trochou vody a sójovou omáčkou. Vař 5 minut.",
      "Zahusti škrobem rozmíchaným ve vodě.",
      "Posyp jarní cibulkou a podávej s rýží.",
    ], category: "asijská",
  },
  {
    id: "r26", name: "Čínské knedlíčky (Jiaozi)", emoji: "🥟",
    description: "Domácí čínské knedlíčky plněné masem – vařené v páře nebo smažené.",
    prepTime: "1 hodina", portions: 20,
    ingredients: [
      { name: "Hladká mouka na těsto", amount: "300 g" },
      { name: "Mleté vepřové", amount: "300 g" },
      { name: "Zelí čínské", amount: "100 g" },
      { name: "Česnek, zázvor, jarní cibulka", amount: "dle chuti" },
      { name: "Sójová omáčka, sezamový olej, sůl", amount: "dle chuti" },
    ],
    steps: [
      "Z mouky a vody zpracuj hladké těsto, nej 30 min odpočinout.",
      "Smíchej mleté maso s nadrobno nakrájeným zelím, česnekem, zázvorem.",
      "Přidej sójovou omáčku, sezamový olej, sůl a pepř.",
      "Těsto vyválej na tenko, vykrájej kolečka (Ø 8 cm).",
      "Doprostřed každého dej lžičku náplně.",
      "Slep okraje do typického tvaru knedlíčku.",
      "Vař v páře 10 minut nebo smaž na pánvi s trochou vody.",
      "Podávej se sójovou omáčkou a chilli.",
    ], category: "asijská",
  },
  {
    id: "r27", name: "Čínská polévka Wonton", emoji: "🍜",
    description: "Autentická wonton polévka – jemné taštičky v čirém vývaru.",
    prepTime: "1 hodina", portions: 4,
    ingredients: [
      { name: "Wonton těsto", amount: "1 balení" },
      { name: "Mleté vepřové", amount: "200 g" },
      { name: "Krevety (volitelně)", amount: "100 g" },
      { name: "Česnek, zázvor, jarní cibulka", amount: "dle chuti" },
      { name: "Sójová omáčka, sezamový olej", amount: "dle chuti" },
      { name: "Kuřecí vývar", amount: "1.5 l" },
      { name: "Čínské houby", amount: "50 g" },
    ],
    steps: [
      "Smíchej mleté maso s prolisovaným česnekem, zázvorem a sójovkou.",
      "Na wonton plátek dej lžičku náplně, přelož a slep do taštičky.",
      "V hrnci přiveď vývar k varu, přidej namočené houby.",
      "Vlož wonton taštičky a vař 4-5 minut, dokud nevyplavou.",
      "Ochutí sójovou omáčkou a sezamovým olejem.",
      "Podávej posypané jarní cibulkou.",
    ], category: "asijská",
  },
  {
    id: "r28", name: "Kachna po pekingsku", emoji: "🦆",
    description: "Domácí verze legendární pekingské kachny s palačinkami a hoisin omáčkou.",
    prepTime: "3 hodiny (+ marinování přes noc)", portions: 4,
    ingredients: [
      { name: "Kachna celá", amount: "1 ks (~2 kg)" },
      { name: "Med", amount: "3 lžíce" },
      { name: "Sójová omáčka", amount: "3 lžíce" },
      { name: "Rýžový ocet", amount: "2 lžíce" },
      { name: "Palačinky (příloha)", amount: "12 ks" },
      { name: "Okurka", amount: "1 ks" },
      { name: "Jarní cibulka", amount: "4 ks" },
      { name: "Hoisin omáčka", amount: "na podávání" },
    ],
    steps: [
      "Kachnu omyj a osuš. Smíchej med, sójovku a ocet – potři celou kachnu.",
      "Nech marinovat přes noc v lednici.",
      "Druhý den kachnu peč při 160°C 2 hodiny.",
      "Zvyš teplotu na 200°C a peč dalších 30 minut do křupava.",
      "Maso nakrájej na tenké plátky.",
      "Okurku nakrájej na tenké nudličky.",
      "Palačinky naplň kachnou, okurkou, jarní cibulkou a hoisin omáčkou.",
    ], category: "asijská",
  },
  {
    id: "r29", name: "Hainanese kuřecí rýže", emoji: "🍚",
    description: "Voňavá kuřecí rýže po čínsku – jedno z nejoblíbenějších jídel Asie.",
    prepTime: "1 hodina", portions: 3,
    ingredients: [
      { name: "Kuřecí stehna/prsa", amount: "500 g" },
      { name: "Rýže jasmínová", amount: "300 g" },
      { name: "Česnek", amount: "5 stroužků" },
      { name: "Zázvor", amount: "3 cm" },
      { name: "Jarní cibulka", amount: "3 ks" },
      { name: "Sezamový olej, sójová omáčka, chilli", amount: "dle chuti" },
    ],
    steps: [
      "Kuřecí maso vlož do hrnce, zalij vodou, přidej sůl a zázvor.",
      "Vař 25 minut doměkka. Maso vyndej, vývar sceď.",
      "Na oleji orestuj prolisovaný česnek a nakrájenou jarní cibulku.",
      "Přidej propláchnutou rýži a 2 minuty restuj.",
      "Zalij vývarem z kuřete (v poměru 1:1.5) a vař pod pokličkou 15 min.",
      "Kuřecí maso pokapej sezamovým olejem a sójovkou.",
      "Podávej rýži s plátky kuřete, chilli a okurkou.",
    ], category: "asijská",
  },
  {
    id: "r30", name: "Čínské restované fazolky", emoji: "🫘",
    description: "Rychlá čínská příloha – křupavé fazolky restované s česnekem a sójovkou.",
    prepTime: "15 min", portions: 2,
    ingredients: [
      { name: "Zelené fazolky", amount: "300 g" },
      { name: "Česnek", amount: "4 stroužky" },
      { name: "Sójová omáčka", amount: "2 lžíce" },
      { name: "Sezamový olej", amount: "1 lžíce" },
      { name: "Chilli vločky", amount: "dle chuti" },
    ],
    steps: [
      "Fazolky očisti a překrájej napůl.",
      "Na woku rozehřej olej, česnek nakrájej na plátky.",
      "Přidej fazolky a restuj 5 minut na vysokém plameni.",
      "Přidej sójovou omáčku a chilli.",
      "Restuj další 3 minuty do změknutí.",
      "Zakápni sezamovým olejem a podávej.",
    ], category: "asijská",
  },

  // === ZDRAVÁ ===
  {
    id: "r31", name: "Proteinový bowl s kuřetem", emoji: "🥗",
    description: "Výživný bowl s kuřecím masem, quinou, avokádem a zeleninou.",
    prepTime: "30 min", portions: 2,
    ingredients: [
      { name: "Kuřecí prsa", amount: "200 g" },
      { name: "Quinoa", amount: "150 g" },
      { name: "Avokádo", amount: "1 ks" },
      { name: "Rajčata", amount: "2 ks" },
      { name: "Okurka", amount: "1 ks" },
      { name: "Rukola", amount: "hrst" },
      { name: "Olivový olej, citron, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Quinou uvař dle návodu a nech vychladnout.",
      "Kuřecí maso orestuj na pánvi dozlatova, nakrájej na plátky.",
      "Avokádo, rajčata a okurku nakrájej na kousky.",
      "Do misky dej rukolu, quinu, zeleninu a kuřecí maso.",
      "Zakápni olivovým olejem a citronem, osol, opepři.",
    ], category: "zdravá",
  },
  {
    id: "r32", name: "Smoothie bowl s ovocem", emoji: "🥣",
    description: "Husté ovocné smoothie s toppingy – rychlá a zdravá snídaně.",
    prepTime: "10 min", portions: 1,
    ingredients: [
      { name: "Banán (mražený)", amount: "1 ks" },
      { name: "Mražené brusinky", amount: "100 g" },
      { name: "Jogurt bílý", amount: "150 g" },
      { name: "Med", amount: "1 lžíce" },
      { name: "Granola / ovesné vločky", amount: "2 lžíce" },
      { name: "Čerstvé ovoce na ozdobu", amount: "dle chuti" },
    ],
    steps: [
      "V mixéru rozmixuj banán, brusinky a jogurt na husté smoothie.",
      "Přidej med a promíchej.",
      "Nalij do misky.",
      "Ozdob granolou a čerstvým ovocem.",
    ], category: "zdravá",
  },
  {
    id: "r33", name: "Cizrnové kari se špenátem", emoji: "🫘",
    description: "Lehké a syté kari z cizrny s čerstvým špenátem. Bezmasá varianta.",
    prepTime: "25 min", portions: 3,
    ingredients: [
      { name: "Cizrna (plechovka)", amount: "1 ks" },
      { name: "Špenát čerstvý", amount: "200 g" },
      { name: "Kokosové mléko", amount: "200 ml" },
      { name: "Cibule, česnek, zázvor, kari", amount: "dle chuti" },
      { name: "Rýže basmati", amount: "200 g" },
    ],
    steps: [
      "Uvař rýži dle návodu.",
      "Na oleji orestuj cibuli, česnek a zázvor.",
      "Přidej kari koření a restuj 1 minutu.",
      "Přidej okapanou cizrnu a kokosové mléko.",
      "Vař 10 minut, pak přidej špenát a nech ho zavadnout.",
      "Ochutí solí a pepřem. Podávej s rýží.",
    ], category: "zdravá",
  },
  {
    id: "r34", name: "Pečený losos s chřestem", emoji: "🐟",
    description: "Zdravá večeře – pečený losos s křupavým chřestem a citronem.",
    prepTime: "25 min", portions: 2,
    ingredients: [
      { name: "Losos filet", amount: "2 ks" },
      { name: "Zelený chřest", amount: "1 svazek" },
      { name: "Citron", amount: "1 ks" },
      { name: "Olivový olej", amount: "2 lžíce" },
      { name: "Sůl, pepř, bylinky", amount: "dle chuti" },
    ],
    steps: [
      "Troubu předehřej na 200°C.",
      "Lososa osol, opepři, pokapej olejem a citronem.",
      "Chřest očisti, pokapej olejem a osol.",
      "Na plech vylož pečicím papírem, dej lososa a chřest.",
      "Peč 15-17 minut (losos by měl být uvnitř růžový).",
      "Podávej s plátkem citronu a třeba i vařeným bramborem.",
    ], category: "zdravá",
  },

  // === SNÍDANĚ ===
  {
    id: "r35", name: "Avokádový toast s vajíčkem", emoji: "🥑",
    description: "Hipsterská klasika, která fakt chutná – avokádo, volské oko a chleba.",
    prepTime: "10 min", portions: 2,
    ingredients: [
      { name: "Chléb toastový", amount: "2 plátky" },
      { name: "Avokádo", amount: "1 ks" },
      { name: "Vejce", amount: "2 ks" },
      { name: "Citronová šťáva", amount: "1 lžička" },
      { name: "Sůl, pepř, chilli vločky", amount: "dle chuti" },
    ],
    steps: [
      "Chléb opeč v toasteru nebo na pánvi.",
      "Avokádo rozmačkej vidličkou, smíchej s citronem, solí a pepřem.",
      "Na pánvi usmaž volské oko (nebo pošírované vejce).",
      "Na opečený chléb dej rozmačkané avokádo.",
      "Polož vejce navrch, posyp chilli a pepřem.",
    ], category: "snídaně",
  },
  {
    id: "r36", name: "Lívance s jahodami", emoji: "🥞",
    description: "Nadýchané lívance s čerstvými jahodami a javorovým sirupem.",
    prepTime: "20 min", portions: 4,
    ingredients: [
      { name: "Hladká mouka", amount: "200 g" },
      { name: "Mléko", amount: "250 ml" },
      { name: "Vejce", amount: "2 ks" },
      { name: "Prášek do pečiva", amount: "1 lžička" },
      { name: "Jahody čerstvé", amount: "200 g" },
      { name: "Javorový sirup / med", amount: "dle chuti" },
    ],
    steps: [
      "Smíchej mouku, prášek do pečiva, vejce a mléko do hladkého těsta.",
      "Na pánvi rozehřej máslo.",
      "Lívance peč z obou stran dozlatova.",
      "Jahody nakrájej na plátky.",
      "Servíruj lívance s jahodami a přelité sirupem.",
    ], category: "snídaně",
  },
  {
    id: "r37", name: "Ovesná kaše přes noc", emoji: "🥣",
    description: "Zdravá snídaně bez vaření – připravíš večer a ráno jen vytáhneš z lednice.",
    prepTime: "5 min (+ noc v lednici)", portions: 2,
    ingredients: [
      { name: "Ovesné vločky", amount: "100 g" },
      { name: "Mléko / jogurt", amount: "200 ml" },
      { name: "Med", amount: "1 lžíce" },
      { name: "Ovoce (banán, jablko, lesní směs)", amount: "dle chuti" },
      { name: "Semínka (chia, slunečnice)", amount: "1 lžíce" },
    ],
    steps: [
      "Smíchej ovesné vločky s mlékem/jogurtem a medem.",
      "Přidej semínka a promíchej.",
      "Nakrájej ovoce a vmíchej do směsi.",
      "Dej přes noc do lednice.",
      "Ráno jen zamíchej, případně dozdob ovocem.",
    ], category: "snídaně",
  },
  {
    id: "r38", name: "Vaječná omeleta se sýrem", emoji: "🍳",
    description: "Rychlá a sytá snídaně – nadýchaná omeleta plněná sýrem.",
    prepTime: "10 min", portions: 1,
    ingredients: [
      { name: "Vejce", amount: "3 ks" },
      { name: "Sýr (gouda/eidam)", amount: "50 g" },
      { name: "Máslo", amount: "1 lžíce" },
      { name: "Sůl, pepř, pažitka", amount: "dle chuti" },
    ],
    steps: [
      "Vejce rozklepni, osol, opepři a prošlehej vidličkou.",
      "Na pánvi rozehřej máslo.",
      "Vlij vejce a nech na středním plameni zatáhnout.",
      "Až je omeleta skoro hotová, posyp polovinu nastrouhaným sýrem.",
      "Přelož na polovinu a nech sýr rozpustit.",
      "Podávej posypané pažitkou.",
    ], category: "snídaně",
  },

  // === MEXICKÁ ===
  {
    id: "r39", name: "Tacos s hovězím masem", emoji: "🌮",
    description: "Křupavé tacos s hovězím masem, avokádem a jogurtovým dresinkem.",
    prepTime: "30 min", portions: 4,
    ingredients: [
      { name: "Hovězí mleté", amount: "400 g" },
      { name: "Tacos skořápky", amount: "8 ks" },
      { name: "Avokádo", amount: "1 ks" },
      { name: "Salát ledový", amount: "4 listy" },
      { name: "Rajčata", amount: "2 ks" },
      { name: "Jogurt, chilli, česnek, sůl, pepř", amount: "dle chuti" },
    ],
    steps: [
      "Mleté maso orestuj na pánvi dohněda.",
      "Přidej chilli, sůl, pepř a prolisovaný česnek.",
      "Avokádo rozmačkej vidličkou.",
      "Rajčata a salát nakrájej nadrobno.",
      "Skořápky tacos naplň: maso, avokádo, salát, rajčata.",
      "Zakápni jogurtem a posyp chilli.",
    ], category: "mexická",
  },
  {
    id: "r40", name: "Burrito bowl", emoji: "🌯",
    description: "Všechno co máš rád na burritu, ale bez zavinování – v misce.",
    prepTime: "35 min", portions: 3,
    ingredients: [
      { name: "Rýže", amount: "200 g" },
      { name: "Mleté maso / kuřecí", amount: "300 g" },
      { name: "Fazole červené", amount: "1 plechovka" },
      { name: "Kukuřice", amount: "1 plechovka" },
      { name: "Avokádo", amount: "1 ks" },
      { name: "Jogurt, chilli, sůl, pepř, limetka", amount: "dle chuti" },
    ],
    steps: [
      "Uvař rýži dle návodu.",
      "Maso orestuj dohněda, ochuť chilli, solí a pepřem.",
      "Fazole a kukuřici prohřej na pánvi.",
      "Do misky vrstvi: rýže, maso, fazole, kukuřice.",
      "Nakrájej avokádo na kousky a přidej nahoru.",
      "Zakápni jogurtem a limetkou.",
    ], category: "mexická",
  },
  {
    id: "r41", name: "Quesadilla se sýrem a šunkou", emoji: "🧀",
    description: "Křupavá tortilla plněná sýrem a šunkou – hotová za 5 minut.",
    prepTime: "10 min", portions: 2,
    ingredients: [
      { name: "Tortilla placky", amount: "2 ks" },
      { name: "Sýr (gouda/mozzarella)", amount: "150 g" },
      { name: "Šunka", amount: "100 g" },
      { name: "Máslo", amount: "1 lžíce" },
    ],
    steps: [
      "Tortillu polož na suchou pánev.",
      "Na jednu polovinu nasyp nastrouhaný sýr a polož šunku.",
      "Přelož druhou polovinou tortilly.",
      "Opékej z každé strany 2 minuty dozlatova, dokud se sýr nerozpustí.",
      "Nakrájej na trojúhelníky a podávej.",
    ], category: "mexická",
  },

  // === POLÉVKY ===
  {
    id: "r42", name: "Česnečka s krutony", emoji: "🥣",
    description: "Sytá česká česnečka s bramborem a křupavými krutony.",
    prepTime: "30 min", portions: 4,
    ingredients: [
      { name: "Brambory", amount: "3 ks" },
      { name: "Česnek", amount: "8 stroužků" },
      { name: "Chléb", amount: "4 plátky" },
      { name: "Vejce", amount: "2 ks" },
      { name: "Majoránka, sůl, pepř, kmín", amount: "dle chuti" },
    ],
    steps: [
      "Brambory nakrájej na kostičky a uvař v osolené vodě s kmínem.",
      "Až jsou brambory měkké, přidej prolisovaný česnek.",
      "Chléb nakrájej na kostičky a opeč na sucho dozlatova.",
      "Do polévky za stálého míchání přidej rozšlehaná vejce.",
      "Ochutí majoránkou, solí a pepřem.",
      "Podávej s opečenými krutony.",
    ], category: "polévka",
  },
];

export const savedMeals = [
  { name: "Řízky", emoji: "🍗" },
  { name: "Bramborový salát", emoji: "🥗" },
  { name: "Langoše", emoji: "🫓" },
  { name: "Čínská polévka", emoji: "🥟" },
  { name: "5 rohlíků", emoji: "🥖" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Těstoviny", emoji: "🍝" },
  { name: "Minerálka", emoji: "💧" },
  { name: "Grilovaný hermelín", emoji: "🧀" },
  { name: "Hovězí burger", emoji: "🍔" },
  { name: "Caesar salát", emoji: "🥬" },
  { name: "Steak", emoji: "🥩" },
  { name: "Palačinky", emoji: "🥞" },
  { name: "Ovesná kaše", emoji: "🥣" },
  { name: "Chleba s máslem", emoji: "🍞" },
  { name: "Uzenáč s cibulí", emoji: "🧅" },
  { name: "Smažák", emoji: "🧈" },
  { name: "Hranolky", emoji: "🍟" },
  { name: "Kebab", emoji: "🥙" },
  { name: "Sushi", emoji: "🍣" },
  { name: "Grilovaná krkovice", emoji: "🥩" },
  { name: "Grilovaná kuřecí stehna", emoji: "🍗" },
  { name: "Grilovaný losos", emoji: "🐟" },
  { name: "BBQ žebírka", emoji: "🍖" },
  { name: "Zeleninové špízy", emoji: "🥗" },
  { name: "Svíčková s knedlíkem", emoji: "🥘" },
  { name: "Hovězí guláš", emoji: "🥘" },
  { name: "Bramboračka", emoji: "🥣" },
  { name: "Vepřo knedlo zelo", emoji: "🥘" },
  { name: "Koprová omáčka", emoji: "🥚" },
  { name: "Špagety carbonara", emoji: "🍝" },
  { name: "Rizoto s kuřetem", emoji: "🍚" },
  { name: "Bruschetta", emoji: "🥖" },
  { name: "Kuřecí kari", emoji: "🍛" },
  { name: "Wok nudle", emoji: "🥡" },
  { name: "Ramen polévka", emoji: "🍜" },
  { name: "Domácí sushi", emoji: "🍣" },
  { name: "Proteinový bowl", emoji: "🥗" },
  { name: "Smoothie bowl", emoji: "🥣" },
  { name: "Cizrnové kari", emoji: "🫘" },
  { name: "Pečený losos", emoji: "🐟" },
  { name: "Avokádový toast", emoji: "🥑" },
  { name: "Lívance", emoji: "🥞" },
  { name: "Ovesná kaše přes noc", emoji: "🥣" },
  { name: "Vaječná omeleta", emoji: "🍳" },
  { name: "Tacos", emoji: "🌮" },
  { name: "Burrito bowl", emoji: "🌯" },
  { name: "Quesadilla", emoji: "🧀" },
  { name: "Česnečka", emoji: "🥣" },
  { name: "Kuřecí vývar", emoji: "🍜" },
  { name: "Rajská polévka", emoji: "🍅" },
  { name: "Cuketová polévka", emoji: "🥒" },
  { name: "Fazolová polévka", emoji: "🫘" },
  { name: "Ledová tříšť", emoji: "🧊" },
  { name: "Jahodový koktejl", emoji: "🥤" },
  { name: "Kofola", emoji: "🥤" },
  { name: "Pivo", emoji: "🍺" },
  { name: "Víno bílé", emoji: "🍷" },
  { name: "Chleba se sádlem", emoji: "🍞" },
  { name: "Tlačenka s cibulí", emoji: "🧅" },
  { name: "Utopenci", emoji: "🥒" },
  { name: "Nakládaný hermelín", emoji: "🧀" },
  { name: "Topinka", emoji: "🍞" },
  { name: "Cibulová polévka", emoji: "🧅" },
  { name: "Kung Pao kuře", emoji: "🍗" },
  { name: "Vepřové sladkokyselé", emoji: "🥓" },
  { name: "Chow Mein nudle", emoji: "🥡" },
  { name: "Jarní závitky", emoji: "🥟" },
  { name: "Kuřecí s brokolicí", emoji: "🥦" },
  { name: "Mapo Tofu", emoji: "🫘" },
  { name: "Čínské knedlíčky", emoji: "🥟" },
  { name: "Wonton polévka", emoji: "🍜" },
  { name: "Kachna po pekingsku", emoji: "🦆" },
  { name: "Hainanese rýže", emoji: "🍚" },
  { name: "Čínské fazolky", emoji: "🫘" },
  { name: "Grilovaný steak", emoji: "🥩" },
  { name: "Grilované klobásy", emoji: "🌭" },
  { name: "Pečené brambory", emoji: "🥔" },
  { name: "Bramboráky", emoji: "🥔" },
  { name: "Kynuté knedlíky", emoji: "🥟" },
  { name: "Rýžový nákyp", emoji: "🍚" },
  { name: "Zeleninové rizoto", emoji: "🍚" },
  { name: "Kuřecí vývar s nudlemi", emoji: "🍜" },
  { name: "Hovězí vývar s játrovými knedlíčky", emoji: "🥣" },
  { name: "Rajská omáčka", emoji: "🍅" },
  { name: "Koprovka", emoji: "🥚" },
  { name: "Smažený sýr", emoji: "🧈" },
  { name: "Svítková polévka", emoji: "🥣" },
  { name: "Pórková polévka", emoji: "🥣" },
  { name: "Bramborové placky", emoji: "🥔" },
  { name: "Špenát s vejcem", emoji: "🥬" },
  { name: "Květáková polévka", emoji: "🥦" },
  { name: "Brokolicová polévka", emoji: "🥦" },
  { name: "Zeleninový vývar", emoji: "🥣" },
  { name: "Hrášková polévka", emoji: "🫛" },
  { name: "Kukuřičná polévka", emoji: "🌽" },
  { name: "Studená okurková polévka", emoji: "🥒" },
  { name: "Chřestová polévka", emoji: "🥦" },
  { name: "Boršč", emoji: "🫘" },
  { name: "Cuketová polévka", emoji: "🥒" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "dokonale-rizky",
    title: "Dokonalé řízky: Tajemství křupavé kůrky",
    description: "Naučte se připravit ty nejkřupavější řízky podle osvědčeného receptu. Tipy na maso, trojobal i správné smažení.",
    image: "🍗",
    author: "Lazorik",
    date: "10. července 2026",
    readTime: "8 min",
    category: "Česká kuchyně",
    tags: ["řízky", "smažení", "česká kuchyně", "trojobal"],
    content: `## Dokonalé řízky

Řízky jsou srdcem české kuchyně. Každá rodina má svůj recept, ale pojďme se podívat na ty nejdůležitější principy, které zaručí dokonalý výsledek.

### Výběr masa

Nejlepší je vepřová kotleta nebo kuřecí prsa. Maso by mělo být čerstvé, nezmražené. Nakrájejte ho na plátky silné asi 1 cm přes vlákno.

### Naklepání

Maso naklepejte přes potravinářskou fólii na tloušťku asi 3-4 mm. Důležité je naklepávat rovnoměrně, aby se maso netrhalo.

### Marináda

Před obalením nechte maso odpočinout v marinádě z mléka, česneku a soli alespoň 30 minut. To zaručí, že řízky budou krásně šťavnaté.

### Trojobal

Trojobal je klíčový:
1. **Hladká mouka** – lehce osolená
2. **Vejce** – rozšlehaná se lžící mléka (dodá křupavost)
3. **Strouhanka** – nejlépe domácí z rohlíků

Řízek obalujte postupně, důkladně. Mezi vejcem a strouhankou nechte okapat přebytek.

### Smažení

Smažte v sádle nebo kvalitním oleji na 170 °C asi 3-4 minuty z každé strany. Nepřekládejte řízky na sebe – každý by měl mít své místo.

### Servírování

Podávejte s bramborovým salátem, vařenými brambory nebo bramborovou kaší. Plátek citronu a okurka dodají svěžest.

> **Tip:** Řízky chutnají skvěle i studené druhý den – ideální na výlet nebo svačinu do práce.`,
  },
  {
    slug: "pekingska-kachna",
    title: "Pekingská kachna: Křupavá kůže a domácí nudle",
    description: "Krok za krokem příprava autentické pekingské kachny s domácími nudlemi a sladko-slanou omáčkou.",
    image: "🦆",
    author: "Lazorik",
    date: "8. července 2026",
    readTime: "12 min",
    category: "Asijská kuchyně",
    tags: ["kachna", "pekingská", "asijská", "nudle", "hokaido"],
    content: `## Pekingská kachna

Pekingská kachna je jedním z nejznámějších čínských pokrmů. Křupavá kůže, šťavnaté maso a tenké nudle – to je kombinace, která okouzlí každého.

### Ingredience

- 1 celá kachna (cca 2 kg)
- 2 lžíce medu
- 1 lžíce sójové omáčky
- 1 lžíce rýžového octa
- 2 cm zázvoru
- 4 stroužky česneku
- Sůl a pepř

### Příprava kachny

1. Kachnu omyjte a osušte papírovými utěrkami.
2. Smíchejte med, sójovou omáčku a ocet – touto směsí potřete kachnu.
3. Do dutiny vložte zázvor a česnek.
4. Nechte marinovat v lednici přes noc.

### Pečení

1. Předehřejte troubu na 180 °C.
2. Kachnu pečte 1 hodinu, pak zvyšte teplotu na 220 °C a pečte dalších 20 minut do křupava.
3. Během pečení přelévejte výpekem.

### Domácí nudle

Na nudle budete potřebovat:
- 300 g hladké mouky
- 3 vejce
- 1 lžíci oleje
- Špetku soli

Zpracujte těsto, nechte 30 minut odpočinout, vyválejte a nakrájejte na tenké nudle. Vařte 2-3 minuty v osolené vodě.

### Omáčka

Smíchejte 3 lžíce sójové omáčky, 2 lžíce medu, 1 lžíci rýžového octa a 1 lžičku sezamového oleje. Zahřejte a zahustěte kukuřičným škrobem.

### Servírování

Kachnu nakrájejte na tenké plátky. Podávejte s nudlemi, omáčkou a jarní cibulkou.

> **Tip:** Pokud chcete extra křupavou kůži, nechte kachnu po marinování 2-3 hodiny odpočívat v lednici odkrytou – kůže tak krásně oschne.`,
  },
  {
    slug: "domaci-zavitky",
    title: "Domácí závitky: Křupavé plněné rolky",
    description: "Recept na křupavé závitky plněné zeleninou a masem. Sója, zázvor a česnek pro dokonalou chuť.",
    image: "🥟",
    author: "Lazorik",
    date: "5. července 2026",
    readTime: "10 min",
    category: "Asijská kuchyně",
    tags: ["závitky", "jarní rolky", "asijská", "smažené"],
    content: `## Domácí závitky

Křupavé závitky jsou skvělým předkrmem nebo hlavním chodem. A doma připravené chutnají mnohem lépe než z mrazáku!

### Nádivka

Základ tvoří:
- 300 g vepřového masa (mletého nebo na nudličky)
- 200 g čínského zelí
- 1 mrkev
- 100 g bambusových výhonků
- 3 stroužky česneku
- 2 cm čerstvého zázvoru
- Sójová omáčka
- Sezamový olej

### Postup

1. **Příprava zeleniny:** Zelí, mrkev a bambus nakrájejte na tenké nudličky.
2. **Maso:** Orestujte mleté maso na pánvi, přidejte nadrobno nakrájený česnek a zázvor.
3. **Dokořenění:** Přidejte zeleninu, zakápněte sójovou omáčkou a sezamovým olejem. Restujte 2-3 minuty.
4. **Zchlazení:** Nechte nádivku vychladnout – teplá by protrhla těsto.

### Balení

Použijte listy na jarní rolky (rice paper nebo pšeničné). Na každý list dejte 1-2 lžíce nádivky. Složte boky a pevně zarolujte.

### Smažení

Smažte v oleji na 175 °C asi 3-4 minuty dozlatova. Nepřidávejte příliš mnoho závitků najednou – teplota klesne.

### Dip

Smíchejte 3 lžíce sladko-kyselé omáčky, 1 lžíci sójové omáčky, čerstvý koriandr a chilli.

> **Tip:** Závitky můžete upéct v troubě (200 °C, 15 minut) – budou méně tučné, ale pořád křupavé.`,
  },
  {
    slug: "svickova-na-smetane",
    title: "Svíčková na smetaně: Babiččina receptura",
    description: "Klasická svíčková omáčka s jemným masem a domácími knedlíky. Recept předávaný z generace na generaci.",
    image: "🥩",
    author: "Lazorik",
    date: "1. července 2026",
    readTime: "15 min",
    category: "Česká kuchyně",
    tags: ["svíčková", "česká kuchyně", "omáčka", "knedlíky"],
    content: `## Svíčková na smetaně

Svíčková je královnou české kuchyně. Každá hospodyňka má svůj tajný recept – ten náš vám prozradíme.

### Ingredience

- 800 g hovězího masa (svíčková nebo zadní)
- 3 mrkve
- 1 petržel
- 1/2 celeru
- 2 cibule
- 200 ml smetany ke šlehání
- 3 lžíce másla
- 2 lžíce hladké mouky
- 2 bobkové listy
- 5 kuliček nového koření
- 5 kuliček pepře
- Sůl a cukr

### Příprava

1. **Maso:** Maso protkněte slaninou, osolte a opepřete. Zprudka orestujte na másle ze všech stran.
2. **Zelenina:** Cibuli nakrájejte na kolečka, mrkev, petržel a celer na kostičky. Orestujte dozlatova.
3. **Dušení:** Zeleninu přidejte k masu, podlijte vodou, přidejte koření a duste doměkka asi 2 hodiny.
4. **Omáčka:** Maso vyjměte, zeleninu rozmixujte. Zahustěte jíškou z másla a mouky. Přidejte smetanu.
5. **Dochucení:** Dosolte, přidejte lžíci cukru a lžíci octa – omáčka musí mít sladko-kyselou chuť.

### Knedlíky

Servírujte s domácími houskovými knedlíky:
- 500 g hrubé mouky
- 1 vejce
- 250 ml mléka
- 1 balíček kvasnic
- Sůl
- Rozdrobená houska

### Servírování

Omáčku přelijte přes maso, ozdobte brusinkami, šlehačkou a citronem.

> **Tip:** Svíčková chutná nejlépe druhý den – chutě se krásně propojí.`,
  },
  {
    slug: "vepro-knedlo-zelo",
    title: "Vepřo knedlo zelo: Klasika české kuchyně",
    description: "Dokonalé vepřové koleno, domácí knedlík a kysané zelí. Srdcová záležitost každého Čecha.",
    image: "🍖",
    author: "Lazorik",
    date: "28. června 2026",
    readTime: "14 min",
    category: "Česká kuchyně",
    tags: ["vepřo knedlo zelo", "česká kuchyně", "vepřové", "zelí", "knedlíky"],
    content: `## Vepřo knedlo zelo

Když se řekne česká kuchyně, většině z nás se vybaví právě tato kombinace. Vepřové maso, nadýchaný knedlík a kysané zelí – jednoduché, ale dokonalé.

### Vepřové maso

Nejlepší je vepřová plec nebo krkovice:
- 1 kg vepřového masa
- 4 stroužky česneku
- Kmín
- Sůl a pepř
- Sádlo

Maso protkněte česnekem, osolte, opepřete a okmínujte. Pečte v troubě na 160 °C asi 2 hodiny, podlévejte výpekem.

### Kysané zelí

Kvalitní kysané zelí je základ:
- 500 g kysaného zelí
- 1 cibule
- 2 lžíce sádla
- 1 lžíce cukru
- Bobkový list
- Jalovec

Cibuli orestujte na sádle, přidejte zelí, cukr a koření. Duste 30-40 minut.

### Houskové knedlíky

Nadýchané knedlíky dělají rozdíl:
- 500 g hrubé mouky
- 1 vejce
- 250 ml vlažného mléka
- 1 kostka droždí
- Sůl
- Kostka staršího rohlíku na kostičky

1. Udělejte kvásek z droždí, mléka a lžíce cukru.
2. Smíchejte s moukou, vejcem a solí.
3. Vmíchejte kostičky rohlíku.
4. Nechte kynout 1 hodinu.
5. Vařte v osolené vodě 20 minut.

### Servírování

Maso nakrájejte na plátky, knedlík na krajíce. Zelí podávejte zvlášť. Vše přelijte šťávou z pečení.

> **Tip:** Pokud chcete extra šťavnaté maso, nechte ho před pečením naložené v mléce s česnekem přes noc.`,
  },
  {
    slug: "domaci-těstoviny",
    title: "Domácí těstoviny: Od vajec k dokonalosti",
    description: "Výroba čerstvých těstovin doma je snadnější, než si myslíte. Stačí mouka, vejce a trocha trpělivosti.",
    image: "🍝",
    author: "Lazorik",
    date: "25. června 2026",
    readTime: "9 min",
    category: "Italská kuchyně",
    tags: ["těstoviny", "pasta", "italská", "domácí"],
    content: `## Domácí těstoviny

Čerstvé těstoviny jsou úplně jiný svět. Jsou jemnější, chutnější a vaření jich je vlastně meditace.

### Základní recept

Na 4 porce:
- 400 g hladké mouky typu 00
- 4 vejce
- 1 lžíce olivového oleje
- Špetka soli

### Postup

1. **Hromádka:** Mouku nasypte na vál, udělejte důlek a rozbijte do něj vejce.
2. **Zpracování:** Vidličkou postupně vmíchávejte mouku do vajec. Nakonec zpracujte rukama.
3. **Hnětení:** Těsto hněťte 10 minut do hladka. Zabalte do fólie a nechte 30 minut odpočinout v lednici.

### Válení

Těsto vyválejte na tenké plátky (nejlépe pomocí strojku na těstoviny). Čím tenčí, tím lepší.

### Tvary

- **Tagliatelle:** Široké nudle
- **Pappardelle:** Ještě širší
- **Fettuccine:** Střední šířka
- **Ravioli:** Plněné těstoviny

### Vaření

Čerstvé těstoviny vařte jen 2-3 minuty v osolené vodě. Sceďte a ihned smíchejte s omáčkou.

### Jednoduchá omáčka

Na pánvi rozehřejte olivový olej, přidejte 3 stroužky česneku, chilli a hrst cherry rajčat. Restujte 2 minuty, přidejte těstoviny a petrželku.

> **Tip:** Těstoviny můžete sušit na válečku přes ramínko na věšák – vypadá to skvěle a těstoviny se nelepí.`,
  },
  {
    slug: "grilovane-maso",
    title: "Grilování jako profík: Tipy a triky",
    description: "Od výběru grilu po dokonalé propečení. Vše, co potřebujete vědět o grilování masa, zeleniny i ovoce.",
    image: "🥩",
    author: "Lazorik",
    date: "20. června 2026",
    readTime: "11 min",
    category: "Grilování",
    tags: ["grilování", "maso", "steak", "barbecue"],
    content: `## Grilování jako profík

Grilování není jen vaření – je to životní styl. Ať už máte zahradní gril nebo malý přenosný, tyhle tipy vám pomohou.

### Výběr grilu

- **Dřevěné uhlí:** Autentická chuť, vyšší náročnost
- **Plynový:** Rychlý a snadný na regulaci
- **Elektrický:** Na balkon, žádný kouř

### Rozdělení zón

Vytvořte na grilu dvě zóny:
- **Přímý žár:** Na opečení masa zvenku
- **Nepřímý žár:** Na dopečení (steaky, kuře)

### Maso na gril

- **Hovězí:** Ribeye, strip loin, flank steak – dejte si záležet na kvalitě
- **Vepřové:** Krkovice, žebírka
- **Kuřecí:** Stehna jsou šťavnatější než prsa
- **Ryby:** Losos, tuňák – grilujte na alobalu

### Marinády

Základ: olej + kyselina (citron/ocet) + bylinky + česnek + sůl. Marinujte 2-24 hodin.

### Teploty propečení

- **Rare:** 52 °C (červený střed)
- **Medium rare:** 55 °C (ideální na steak)
- **Medium:** 58 °C
- **Well done:** 65 °C+

### Zelenina a ovoce

Cuketa, paprika, lilek, ananas, broskve – grilování zvýrazní jejich sladkost. Stačí 3-5 minut z každé strany.

> **Tip:** Nechte maso po grilování 5 minut odpočinout pod alobalem – šťáva se rovnoměrně rozprostře.`,
  },
  {
    slug: "kureci-vyvar",
    title: "Kuřecí vývar: Zlatý elixír zdraví",
    description: "Poctivý domácí vývar, který vás postaví na nohy. Tajemství je v čase a kvalitních surovinách.",
    image: "🍲",
    author: "Lazorik",
    date: "15. června 2026",
    readTime: "7 min",
    category: "Polévky",
    tags: ["vývar", "polévka", "kuřecí", "zdraví"],
    content: `## Kuřecí vývar

Máte rýmu? Bolí vás břicho? Potřebujete se zahřát? Kuřecí vývar je lék na všechno.

### Ingredience

- 1 celé kuře nebo 4 kuřecí stehna
- 3 mrkve
- 1 petržel
- 1/2 celeru
- 1 cibule (i se slupkou – dodá barvu)
- 3 stroužky česneku
- 1 bobkový list
- 5 kuliček pepře
- 5 kuliček nového koření
- Sůl
- Petrželka na ozdobu

### Postup

1. Kuře vložte do hrnce a zalijte studenou vodou.
2. Pomalu přiveďte k varu.
3. Seberte pěnu – to je klíč k čirému vývaru.
4. Přidejte zeleninu a koření.
5. Vařte na mírném ohni 2-3 hodiny.
6. Na závěr osolte – sůl na začátku by maso vysušila.

### Zavářka

- **Nudle:** Domácí nebo kupované
- **Játrové knedlíčky:** Klasická zavářka
- **Hrášek:** Na barvu
- **Mrkev nakrájená na kolečka**

### Tipy pro čirý vývar

- Vývar nechte zchladnout a přeceďte přes plátýnko
- Vařte na nejnižším stupni – nechte jen probublávat
- Cibuli před přidáním rozkrojte a opečte na suché pánvi – karamelizace dodá barvu

> **Tip:** Vývar můžete zamrazit v kelímcích – skvělý základ pro omáčky a polévky.`,
  },
  {
    slug: "bramborovy-salat",
    title: "Bramborový salát: Nesmrtelná klasika",
    description: "Recept na nejlepší bramborový salát k řízkům i k rybě. Majonéza, zelenina a tajná ingredience.",
    image: "🥗",
    author: "Lazorik",
    date: "12. června 2026",
    readTime: "8 min",
    category: "Česká kuchyně",
    tags: ["bramborový salát", "česká kuchyně", "příloha", "vánoce"],
    content: `## Bramborový salát

Bramborový salát je neodmyslitelnou součástí české kuchyně. Dělá se ke štědrovečerní večeři, k řízkům i na oslavy.

### Ingredience

- 1 kg brambor (nastavitelný!)
- 3 mrkve
- 1 petržel
- 1/2 celeru
- 4 vejce
- 200 g hrášku
- 1 cibule
- 200 ml majonézy
- 100 ml bílého jogurtu
- 2 lžíce plnotučné hořčice
- Sůl, pepř, cukr
- Citronová šťáva

### Postup

1. **Brambory:** Uvařte ve slupce den předem – musí vychladnout. Oloupejte a nakrájejte na kostičky.
2. **Zelenina:** Mrkev a petržel uvařte doměkka, nakrájejte na kostičky. Celer nastrouhejte najemno.
3. **Vejce:** Uvařte natvrdo (10 minut), nakrájejte na kostičky.
4. **Smíchání:** Vše smíchejte, přidejte hrášek a najemno nakrájenou cibuli.
5. **Zálivka:** Smíchejte majonézu, jogurt, hořčici a citron. Dochuťte solí, pepřem a cukrem.
6. **Zrání:** Salát musí odležet v lednici alespoň 4 hodiny. Nejlepší je druhý den!

### Tajná ingredience

Nastrouhané jablko! Dodá salátu svěžest a lehkou sladkost. Jedno střední jablko nastrouhejte nahrubo.

> **Tip:** Pokud chcete salát lehčí, nahraďte polovinu majonézy bílým jogurtem nebo zakysanou smetanou.`,
  },
  {
    slug: "palacinky-plnene",
    title: "Plněné palačinky: Sladké i slané variace",
    description: "Deset způsobů, jak připravit dokonalé palačinky. Od klasických s marmeládou po slané se špenátem a ricottou.",
    image: "🥞",
    author: "Lazorik",
    date: "8. června 2026",
    readTime: "7 min",
    category: "Dezerty",
    tags: ["palačinky", "dezert", "snídaně", "sladké"],
    content: `## Plněné palačinky

Palačinky jsou univerzální jídlo. Hodí se k snídani, obědu i večeři. A hlavně – baví je dělat děti i dospělí.

### Základní těsto

- 250 g hladké mouky
- 2 vejce
- 500 ml mléka
- 2 lžíce rozpuštěného másla
- Špetka soli
- 1 lžíce cukru (jen na sladkou verzi)

Vše rozmixujte a nechte 20 minut odpočinout.

### Smažení

Na nepřilnavé pánvi smažte na másle. První palačinka je vždy zkušební – vyhoďte ji, nebo snězte.

### Sladké náplně

1. **Tvarohová:** Tvaroh + cukr + vanilka + rozinky
2. **Ovocná:** Jahody/borůvky + cukr + citron
3. **Nutella + banán:** Klasika, která nikdy neomrzí
4. **Jablečná:** Strouhaná jablka + skořice + cukr
5. **Ořechová:** Mleté ořechy + med + máslo

### Slané náplně

1. **Špenát + ricotta + česnek**
2. **Kuřecí maso + žampiony + smetana**
3. **Šunka + sýr + vejce**
4. **Losos + kopr + tvaroh**
5. **Cuketa + parmazán + bazalka**

### Polévání

- Čokoládová poleva
- Karamel
- Zakysaná smetana + med
- Ovoce + šlehačka

> **Tip:** Palačinky můžete upéct v troubě s náplní a sýrem – vznikne z nich palačinkový kastrol.`,
  },
  {
    slug: "pho-bo",
    title: "Pho Bo: Vietnamská polévka, která vás dostane",
    description: "Autentická hovězí pho polévka, jak ji znáte z vietnamských bister. Vývar, rýžové nudle a čerstvé bylinky.",
    image: "🍜",
    author: "Lazorik",
    date: "5. července 2026",
    readTime: "13 min",
    category: "Asijská kuchyně",
    tags: ["pho", "vietnamská", "polévka", "nudle", "bistro"],
    content: `## Pho Bo

Pho je srdcem vietnamské kuchyně. Tato voňavá hovězí polévka s rýžovými nudlemi je dokonalé jídlo na oběd, večeři i kocovinu. Naučte se ji připravit jako ve vašem oblíbeném bistru.

### Vývar – základ všeho

Kvalitní pho stojí a padá s vývarem. Vaří se minimálně 6 hodin.

**Ingredience na vývar:**
- 1,5 kg hovězích kostí (špikové, oháňka, žebra)
- 500 g hovězího předního
- 2 cibule (přepůlené a opečené na sucho)
- 10 cm kousky zázvoru (také opečeného)
- 1 celá skořice
- 3 kuličky badyánu
- 5 kuliček nového koření
- 1 lžíce koriandrových semínek (opražených)
- 2 lžíce rybí omáčky
- 1 lžíce cukru
- Sůl

### Příprava pho vývaru

1. **Předvaření kostí:** Kosti vložte do hrnce, zalijte studenou vodou, přiveďte k varu a vařte 5 minut. Vodu slijte, kosti propláchněte.
2. **Opékání:** Cibuli a zázvor opečte na suché pánvi nebo pod grilem do ztmavnutí – karamelizace dodá vývaru barvu a chuť.
3. **Koření:** Skořici, badyán a koriandr opražte na suché pánvi 1–2 minuty.
4. **Vaření:** V čistém hrnci zalijte kosti a maso 4 litry vody. Přidejte cibuli, zázvor a opražené koření.
5. **Vařte na mírném ohni:** Nechte jen probublávat. Vařte 4 hodiny, pak vyjměte maso.
6. **Kosti vařte další 2 hodiny.**
7. **Dochucení:** Vývar přeceďte, přidejte rybí omáčku, cukr a sůl.

### Servírování

Na talíři:
- Rýžové nudle – spařené horkou vodou
- Hovězí maso – na tenké plátky (nebo syrové – propeče se v horkém vývaru)
- Horký vývar – zalijte nudle a maso

### Obloha (podávejte zvlášť)

- Čerstvé lístky thajské bazalky
- Nakrájená jarní cibulka
- Koriandr
- Chilli kolečka
- Bílé fazolové klíčky
- Limetka na vymačkání
- Rybí omáčka + chilli (na dochucení)

> **Tip:** Pravé pho se jí hůlkami i lžící zároveň – nudle hůlkami, vývar lžící. Hlasité srkání je známka uznání kuchaři!`,
  },
  {
    slug: "banh-mi",
    title: "Banh Mi: Vietnamský sendvič plný chutí",
    description: "Křupavá bageta s pikantním masem, nakládanou zeleninou a koriandrem. Kompletní recept na tenhle street-food fenomén.",
    image: "🥖",
    author: "Lazorik",
    date: "3. července 2026",
    readTime: "10 min",
    category: "Asijská kuchyně",
    tags: ["banh mi", "vietnamská", "sendvič", "street food", "bistro"],
    content: `## Banh Mi

Banh mi je dokonalý příklad fusion kuchyně – vietnamské suroviny v křupavé francouzské bagetě. Tohle je nejlepší sendvič na světě.

### Bageta

Pravá banh mi bageta musí být křupavá zvenku a nadýchaná uvnitř:
- 500 g hladké mouky
- 300 ml vlažné vody
- 15 g droždí
- 1 lžíce cukru
- 1 lžička soli
- 2 lžíce oleje

Postup je klasický – zadělat těsto, nechat vykynout, tvarovat dlouhé úzké bagety a péct na vysokou teplotu.

**Rychlejší varianta:** Kupte kvalitní bagetu, postříkejte vodou a dejte na 5 minut do trouby na 200 °C – bude jako čerstvá.

### Kuřecí nebo vepřová náplň

**Marináda:**
- 500 g kuřecích stehen nebo vepřové krkovice
- 3 stroužky česneku
- 2 lžíce rybí omáčky
- 1 lžíce medu
- 1 lžička sezamového oleje
- Sůl a pepř

Maso nakrájejte na tenké plátky, promíchejte s marinádou a nechte 30 minut odležet. Pak orestujte na pánvi dozlatova.

### Daikon & mrkev (pickles)

Nakládaná zelenina je klíčová:
- 1 menší daikon (bílá ředkev)
- 2 mrkve
- Směs: 200 ml vody, 100 ml rýžového octa, 2 lžíce cukru, 1 lžička soli

Zeleninu nakrájejte na tenké nudličky (julienne), zalijte nálevem a nechte alespoň 30 minut.

### Dokončení

1. Bagetu rozkrojte, lehce vydlabejte střídku
2. Namažte majonézou smíchanou s trochou sriracha
3. Vložte maso
4. Přidejte nakládanou zeleninu
5. Okurka na tenké plátky
6. Čerstvý koriandr
7. Chilli dle chuti
8. Zakápněte sójovou omáčkou

> **Tip:** Každá vrstva v banh mi má svou funkci – maso zasytí, pickles osvěží, koriandr provoní a chilli nakopne.`,
  },
  {
    slug: "bun-bo-nam-bo",
    title: "Bun Bo Nam Bo: Studená rýžová salátová klasika",
    description: "Rýžové nudle s hovězím masem, arašídy a rybí omáčkou. Jednoduché jídlo z vietnamského bistra, které si zamilujete.",
    image: "🥢",
    author: "Lazorik",
    date: "30. června 2026",
    readTime: "9 min",
    category: "Asijská kuchyně",
    tags: ["bun bo", "vietnamská", "rýžové nudle", "salát", "bistro"],
    content: `## Bun Bo Nam Bo

Bun Bo Nam Bo je lehký letní pokrm, který vás zasytí, aniž by vás unavil. Hovězí maso, rýžové nudle, bylinky a křupavé arašídy v dokonalé harmonii.

### Co budete potřebovat

- 400 g hovězího masa (květová špička nebo roštěná)
- 300 g rýžových nudlí (vermicelli)
- 1 salátová okurka
- 200 g fazolových klíčků
- 100 g arašídů (opražených, nasekaných)
- Čerstvá máta
- Koriandr
- Jarní cibulka

### Marináda na maso

- 2 lžíce rybí omáčky
- 1 lžíce třtinového cukru
- 2 stroužky česneku
- 1 lžička sezamového oleje
- Špetka bílého pepře

Maso nakrájejte na tenké proužky, promíchejte a nechte marinovat 30 minut.

### Nuoc cham (zálivka)

- 100 ml vlažné vody
- 3 lžíce rybí omáčky
- 2 lžíce cukru
- 1 lžíce rýžového octa
- 1 stroužek česneku (lisovaný)
- 1 chilli (nasekané)
- 1 lžíce limetkové šťávy

### Sestavení

1. **Nudle:** Rýžové nudle spařte horkou vodou (nebo uvařte dle návodu), propláchněte studenou vodou.
2. **Maso:** Orestujte na vysokém plameni 2-3 minuty – musí být křupavé zvenku a šťavnaté uvnitř.
3. **Zelenina:** Okurku nakrájejte na nudličky.
4. **Mísa:** Do velké mísy dejte nudle, přidejte okurku, klíčky, bylinky.
5. **Navrch:** Maso, arašídy, jarní cibulka.
6. **Přelít:** Zalijte nuoc cham.

> **Tip:** Toto jídlo se podává studené – ideální na léto. Hovězí maso by mělo být jen krátce orestované, ne propečené do sucha.`,
  },
  {
    slug: "goi-cuon",
    title: "Goi Cuon: Čerstvé jarní rolky s krevetami",
    description: "Průhledné rýžové rolky plněné krevetami, bylinkami a rýžovými nudlemi. Lehké, svěží a zdravé předkrmy.",
    image: "🥬",
    author: "Lazorik",
    date: "28. června 2026",
    readTime: "8 min",
    category: "Asijská kuchyně",
    tags: ["goi cuon", "vietnamská", "fresh rolls", "jarní rolky", "bistro"],
    content: `## Goi Cuon (Fresh Spring Rolls)

Goi cuon jsou čerstvé jarní rolky – žádné smažení, jen čisté chutě. Průhledný rýžový papír odhaluje barevnou náplň.

### Ingredience

- 500 g krevet (střední, loupané)
- 200 g rýžových nudlí (vermicelli)
- 1 salát
- Čerstvá máta
- Koriandr
- 200 g fazolových klíčků
- Rýžový papír (kulaté listy)
- 1 mrkev (na tenké nudličky)

### Příprava

1. **Krevety:** Uvařte v osolené vodě 2-3 minuty. Nechte vychladnout, rozkrojte podélně napůl.
2. **Nudle:** Rýžové nudle spařte horkou vodou, sceďte.
3. **Zelenina:** Salát natrhejte na kousky, bylinky otrhejte.

### Balení

1. Rýžový papír namočte na 10 vteřin do vlažné vody – změkne.
2. Položte na vlhkou utěrku.
3. Na spodní třetinu položte salát, nudle, bylinky, klíčky a mrkev.
4. Na horní část položte 3-4 půlky krevet – řezem nahoru (budou krásně vidět).
5. Složte boky a pevně zarolujte.

### Dip

**Hoisin arašídová omáčka:**
- 3 lžíce hoisin omáčky
- 2 lžíce arašídového másla
- 1 lžíce rybí omáčky
- 100 ml kokosového mléka
- 1 chilli
- Nasekané arašídy na posyp

> **Tip:** Goi cuon se musí jíst čerstvé – během hodiny rýžový papír tvrdne. Dělejte je až těsně před podáváním.`,
  },
  {
    slug: "pho-smaženy-ryze",
    title: "Smažený rýže s kuřecím: Bistro klasika",
    description: "Rychlá a chutná smažená rýže s kuřecím masem, vajíčkem a zeleninou. Hotovo za 15 minut.",
    image: "🍚",
    author: "Lazorik",
    date: "25. června 2026",
    readTime: "6 min",
    category: "Asijská kuchyně",
    tags: ["smažený rýže", "čínská", "bistro", "rychlé", "wok"],
    content: `## Smažený rýže

Smažená rýže z bistra je jídlo, které zachrání večer. Rychlé, levné a chutné. Tady je recept na dokonalou wok rýži.

### Ingredience

- 400 g uvařené rýže (ideálně den staré – neslepuje se)
- 300 g kuřecích prsou
- 2 vejce
- 1 mrkev
- 1 cibule
- 100 g hrášku
- 3 stroužky česneku
- 3 lžíce sójové omáčky
- 1 lžíce ústřicové omáčky
- Sezamový olej
- Jarní cibulka na ozdobu

### Postup

1. Kuřecí maso nakrájejte na kostičky, osolte.
2. Na wok pánvi rozehřejte olej na maximum.
3. Orestujte maso dozlatova (2 minuty), vyjměte.
4. Na stejné pánvi orestujte nasekaný česnek a cibuli.
5. Přidejte mrkev na kostičky, restujte 1 minutu.
6. Udělejte místo uprostřed, rozbijte vejce – míchejte, až se srazí.
7. Přidejte rýži, hrášek, sójovou a ústřicovou omáčku.
8. Vraťte maso, promíchejte. Restujte další 2 minuty.
9. Zakápněte sezamovým olejem.

### Servírování

Posypte jarní cibulkou, případně přidejte chilli a okurku.

> **Tip:** Tajemství dobré smažené rýže je studená rýže a hodně vysoká teplota. Rýži nikdy nemačkejte – jen nadlehčujte.`,
  },
  {
    slug: "kebab-doner",
    title: "Doner Kebab: Maso na jehle jako z autentické turecké kuchyně",
    description: "Jak naložit maso na kebab, upéct ho a naservírovat s čerstvým pečivem a omáčkami. Domácí verze legendy.",
    image: "🥙",
    author: "Lazorik",
    date: "22. června 2026",
    readTime: "12 min",
    category: "Grilování",
    tags: ["kebab", "doner", "turecká", "maso", "bistro"],
    content: `## Doner Kebab

Doner kebab je jedno z nejoblíbenějších bister na světě. Šťavnaté maso, křupavá zelenina a jogurtová omáčka – perfektní kombinace.

### Maso

Domácí kebab není konec světa. Nepotřebujete vertikální gril – postačí trouba a špejle.

**Ingredience na 1 kg masa:**
- 1 kg jehněčího nebo hovězího masa (kýta nebo plec)
- 1 cibule (nastrouhaná)
- 4 stroužky česneku
- 2 lžičky soli
- 1 lžička černého pepře
- 1 lžička kmínu
- 1 lžička papriky
- 1 lžička sušeného oregana
- 1/2 lžičky skořice (tajná ingredience!)
- 3 lžíce jogurtu
- 2 lžíce olivového oleje

### Příprava

1. Maso nakrájejte na tenké plátky (co nejtenčí).
2. Smíchejte všechno koření s jogurtem a olejem.
3. Maso promíchejte s marinádou, nechte v lednici přes noc.
4. Napichujte plátky masa na špejli nebo je naskládejte na sebe do pekáčku.
5. Pečte v troubě na 180 °C asi 45 minut, občas přelijte výpekem.
6. Posledních 10 minut zapněte gril pro křupavou kůrku.

### Omáčky

**Jogurtovo-česneková:**
200 ml bílého jogurtu, 2 stroužky česneku, sůl, máta

**Pikantní:**
100 ml passaty, 1 chilli, lžíce octa, sůl, kmín

### Servírování

Pita chléb nebo tortilla + maso + ledový salát + rajče + okurka + cibule + omáčky.

> **Tip:** Kebab chutná nejlépe, když je maso nakrájené na tenké plátky a lehce opečené na pánvi těsně před podáváním.`,
  },
  {
    slug: "kureci-rizek-vietnamsky",
    title: "Cơm Gà: Kuřecí rýže po vietnamsku",
    description: "Jednoduché, ale dokonalé jídlo – kuřecí maso na rýži se zázvorem a rybí omáčkou. Bistro za 5 minut.",
    image: "🐔",
    author: "Lazorik",
    date: "18. června 2026",
    readTime: "7 min",
    category: "Asijská kuchyně",
    tags: ["cơm gà", "vietnamská", "kuřecí", "rýže", "bistro"],
    content: `## Cơm Gà (Kuřecí rýže)

Cơm gà je jedno z nejjednodušších a nejoblíbenějších jídel ve vietnamských bistrech. Kuřecí stehno, rýže, zázvor a rybí omáčka – hotovo za 15 minut.

### Ingredience

- 2 kuřecí stehna
- 300 g jasmínové rýže
- 3 stroužky česneku
- 2 cm zázvoru
- 2 lžíce rybí omáčky
- 1 lžíce medu
- Jarní cibulka
- Okurka

### Postup

1. Rýži uvařte dle návodu.
2. Kuřecí stehna osolte a opepřete.
3. Na pánvi rozehřejte olej, stehna orestujte dozlatova z každé strany.
4. Přidejte nakrájený zázvor a česnek, restujte 1 minutu.
5. Podlijte 100 ml vody, přidejte rybí omáčku a med. Duste 10 minut.
6. Vyjměte maso, šťávu nechte zredukovat na omáčku.
7. Maso nakrájejte na plátky.

### Servírování

Na talíř dejte rýži, na ni plátky kuřete, přelijte omáčkou. Přidejte okurku a jarní cibulku.

> **Variace:** Cơm gà xé – kuřecí maso natrhané na vlákna, smíchané s bylinkami a zálivkou.`,
  },
  {
    slug: "pho-cha-gio",
    title: "Cha Gio: Smažené jarní závitky po vietnamsku",
    description: "Křupavé smažené závitky plněné vepřovým masem a skleněnými nudlemi. Nepostradatelná součást každého vietnamského bistra.",
    image: "🥟",
    author: "Lazorik",
    date: "15. června 2026",
    readTime: "9 min",
    category: "Asijská kuchyně",
    tags: ["cha gio", "vietnamská", "závitky", "smažené", "bistro"],
    content: `## Cha Gio (Smažené jarní závitky)

Cha gio jsou křupavější, menší a intenzivnější než jejich čínští bratranci. Tenký rýžový papír, vepřová nádivka a rybí omáčka – to je ta pravá chuť Vietnamu.

### Nádivka

- 300 g mletého vepřového
- 100 g skleněných nudlí (cellophane)
- 1 mrkev (nastrouhaná najemno)
- 100 g černých hub (shiitake)
- 1 cibule
- 1 vejce
- 2 lžíce rybí omáčky
- Pepř

### Příprava

1. **Nudle:** Skleněné nudle namočte na 10 minut do studené vody, pak nakrájejte na krátké kousky.
2. **Houby:** Shiitake namočte, nakrájejte na drobno.
3. **Nádivka:** Smíchejte všechno dohromady rukama.
4. **Balení:** Použijte rýžový papír namočený ve vodě. Rolujte pevně, ale ne příliš tlusté – asi jako malíček.

### Smažení

- Olej rozehřejte na 170 °C
- Smažte po dávkách 5-6 minut dozlatova
- Nechte okapat na papírové utěrce

### Servírování

Podávejte s čerstvým salátem, mátou a nuoc cham. Závitek se jí zabalený v listu salátu s bylinkami – namočený v omáčce.

> **Tip:** Závitky můžete připravit předem a zamrazit (nevařené). Smažte je rovnou z mrazáku – přidejte 2 minuty navíc.`,
  },
  {
    slug: "bokchoy-cesnek",
    title: "Bok Choy na česneku: Jednoduchá čínská příloha",
    description: "Čínské zelí na pánvi s česnekem a zázvorem. Hotovo za 5 minut. Skvělá příloha k masu i nudlím.",
    image: "🥬",
    author: "Lazorik",
    date: "10. června 2026",
    readTime: "5 min",
    category: "Asijská kuchyně",
    tags: ["bok choy", "čínská", "zelenina", "příloha", "wok"],
    content: `## Bok Choy na česneku

Bok choy je čínské zelí, které v českých obchodech seženete čím dál častěji. Jeho jemně nahořklá chuť a křupavý stonek z něj dělá perfektní přílohu.

### Ingredience

- 400 g bok choy
- 4 stroužky česneku
- 1 cm zázvoru
- 2 lžíce sójové omáčky
- 1 lžíce ústřicové omáčky
- 1 lžička sezamového oleje
- Chilli (volitelné)

### Postup

1. Bok choy podélně rozkrojte, propláchněte.
2. Na wok pánvi rozehřejte olej.
3. Orestujte nasekaný česnek a zázvor – 30 vteřin.
4. Přidejte bok choy a restujte 2 minuty na vysokém plameni.
5. Zalijte sójovou a ústřicovou omáčkou.
6. Restujte ještě 1 minutu.
7. Zakápněte sezamovým olejem.

### Variace

- **S masem:** Přidejte nudličky hovězího nebo kuřecího
- **S houbami:** Shiitake nebo žampiony
- **S tofu:** Na kostičky orestované dozlatova

> **Tip:** Nepřesmažte – stonek by měl zůstat křupavý a list jen zavadlý.`,
  },
  {
    slug: "vietnamska-kava",
    title: "Cà Phê Sữa Đá: Vietnamská ledová káva",
    description: "Sladká, silná ledová káva s kondenzovaným mlékem. Esenciální tečka po každém vietnamském jídle v bistru.",
    image: "☕",
    author: "Lazorik",
    date: "8. června 2026",
    readTime: "4 min",
    category: "Dezerty",
    tags: ["káva", "vietnamská", "ledová", "cà phê", "nápoj"],
    content: `## Cà Phê Sữa Đá

Vietnamská ledová káva je sladká, silná a hypnotizující. Pomalé kapání přes překapávač je rituál, který stojí za to.

### Co budete potřebovat

- Vietnamský překapávač (phín) – koupíte v asijských obchodech
- Kvalitní hrubě mletou kávu (ideálně robusta – silnější)
- Slazené kondenzované mléko
- Led

### Postup

1. Do překapávače dejte 2-3 lžíce mleté kávy.
2. Lehce přimáčkněte pérkem.
3. Přelijte 2 lžícemi horké vody – nechte 1 minutu nabobtnat.
4. Dolijte horkou vodu až po okraj.
5. Nechte pomalu kapat přes překapávač – trvá to 5-10 minut.
6. Do sklenice dejte 3 lžíce kondenzovaného mléka.
7. Až káva prokape, promíchejte s mlékem.
8. Přidejte plný kelímek ledu.

### Tip

Kávu pijte pomalu – je mnohem silnější než běžné espresso. Cukr už nepřidávejte, kondenzované mléko je dost sladké.

> **Vietnamský zvyk:** Po obědě v bistru si dát cà phê sữa đá a koukat na provoz – to je správné "slow living".`,
  },
];

export const navItems = [
  { href: "/", label: "Domů", icon: "LayoutDashboard" },
  { href: "/orders", label: "Objednávky", icon: "ShoppingBag" },
  { href: "/menu", label: "Menu", icon: "UtensilsCrossed" },
  { href: "/plan", label: "Kalendář", icon: "CalendarDays" },
  { href: "/blog", label: "Blog", icon: "Newspaper" },
  { href: "/inventory", label: "Sklad", icon: "Package" },
  { href: "/staff", label: "Personál", icon: "Users" },
  { href: "/analytics", label: "Analytika", icon: "BarChart3" },
  { href: "/settings", label: "Nastavení", icon: "Settings" },
] as const;
