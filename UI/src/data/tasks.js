// Mock data — replace with API calls when backend is ready

/** @type {{ id: number, task: string, who: string[], date: string|null, status: string, category: string, note?: string }[]} */
export const TASKS = [
  { id: 1, task: "Do połowy czerwca ogarnięcie gruzu", who: ["Konrad"], date: "2025-06-15", status: "done", category: "site" },
  { id: 2, task: "Ogrodzenie i znaki zakazu wokół gruzu", who: ["Konrad"], date: "2025-07-25", status: "in-progress", category: "site" },
  { id: 3, task: "Loteria fantowa — sprawdzić legalność", who: ["Konrad"], date: null, status: "in-progress", category: "admin", note: "podpytać czy to jest legalne" },
  { id: 4, task: "Zapytać Matczyn o wynajem nalewaka", who: ["Konrad"], date: null, status: "todo", category: "supplies" },
  { id: 5, task: "Dogadać 300 europalet", who: ["Konrad"], date: "2025-08-01", status: "done", category: "build", note: "odbiór 01.08, oddajemy 11–13.08" },
  { id: 6, task: "Wyrównanie terenu — Anasiewicz", who: ["Konrad"], date: null, status: "done", category: "site", note: "Mateusz Prakowski wyrówna teren" },
  { id: 7, task: "Paliwo z Admarem", who: ["Konrad"], date: null, status: "done", category: "supplies" },
  { id: 8, task: "Słupki od Gonza", who: ["Stalowy"], date: null, status: "done", category: "build" },
  { id: 9, task: "Ogrodzenie metalowe do backstage", who: ["Konrad"], date: null, status: "done", category: "build" },
  { id: 10, task: "Słupki oświetleniowe", who: ["Stalowy"], date: "2025-08-01", status: "done", category: "build", note: "ustawianie 3 sierpnia" },
  { id: 11, task: "Sprawdzić kasę z poprzedniej edycji", who: ["Kinia", "Asia"], date: null, status: "done", category: "finance", note: "ok. 700 zł" },
  { id: 12, task: "Promocja zbiórki", who: ["Kinia", "Asia"], date: "2025-07-14", status: "done", category: "promo" },
  { id: 13, task: "Posty na stronie", who: ["Kinia", "Asia"], date: "2025-07-12", status: "in-progress", category: "promo" },
  { id: 14, task: "Wycena koszulek", who: ["Radosław"], date: null, status: "done", category: "merch" },
  { id: 15, task: "Wlepki", who: ["Radosław"], date: null, status: "done", category: "merch" },
  { id: 16, task: "Naprawa namiotu", who: ["Stalowy"], date: "2025-06-30", status: "done", category: "build" },
  { id: 17, task: "Zwożenie palet", who: ["Stalowy"], date: "2025-07-26", status: "todo", category: "build", note: "do 2 sierpnia" },
  { id: 18, task: "Początek budowy", who: ["Stalowy"], date: "2025-08-04", status: "todo", category: "build" },
  { id: 19, task: "Scena ma stać", who: ["Stalowy"], date: "2025-08-07", status: "todo", category: "build" },
  { id: 20, task: "Prysznic, woda", who: ["Konrad"], date: "2025-08-05", status: "todo", category: "build" },
];

export const TASK_CATEGORIES = [
  { id: "site", pl: "Teren", en: "Site" },
  { id: "build", pl: "Budowa", en: "Build" },
  { id: "production", pl: "Produkcja", en: "Production" },
  { id: "catering", pl: "Jedzenie", en: "Catering" },
  { id: "supplies", pl: "Zaopatrzenie", en: "Supplies" },
  { id: "safety", pl: "Bezpieczeństwo", en: "Safety" },
  { id: "promo", pl: "Promocja", en: "Promo" },
  { id: "merch", pl: "Mercz", en: "Merch" },
  { id: "finance", pl: "Finanse", en: "Finance" },
  { id: "admin", pl: "Administracja", en: "Admin" },
];

export const PEOPLE = [
  "Konrad", "Stalowy", "Kinia", "Asia", "Misio", "Radosław", "Garf", "Radar", "Solis", "Puzi",
];
