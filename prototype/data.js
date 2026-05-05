// Festival data — fixtures from 2025 edition
// Excel serial → JS Date: serial - 25569 days from 1970-01-01

window.FESTIVAL_DATA = (function () {
  const excelDate = (serial) => {
    const utc = (Number(serial) - 25569) * 86400 * 1000;
    return new Date(utc);
  };
  const iso = (d) => d.toISOString().slice(0, 10);

  // Festival is 8-9 August 2025; buildup starts ~July 15
  const FESTIVAL_START = "2025-08-08";
  const FESTIVAL_END = "2025-08-09";

  const TASKS = [
    { id: 1, task: "Do połowy czerwca ogarnięcie gruzu", taskEn: "Clear rubble by mid-June", who: ["Konrad"], date: "2025-06-15", status: "done", category: "site" },
    { id: 2, task: "Ogrodzenie i znaki zakazu wokół gruzu", taskEn: "Fence + warning signs around rubble", who: ["Konrad"], date: "2025-07-25", status: "in-progress", category: "site" },
    { id: 3, task: "Loteria fantowa — sprawdzić legalność", taskEn: "Raffle — check legality", who: ["Konrad"], date: null, status: "in-progress", note: "podpytać czy to jest legalne", category: "admin" },
    { id: 4, task: "Zapytać Matczyn o wynajem nalewaka", taskEn: "Ask Matczyn about tap rental", who: ["Konrad"], date: null, status: "todo", category: "supplies" },
    { id: 5, task: "Dogadać 300 europalet", taskEn: "Arrange 300 europallets", who: ["Konrad"], date: "2025-08-01", status: "done", note: "odbiór 01.08, oddajemy 11–13.08", category: "build" },
    { id: 6, task: "Wyrównanie terenu — Anasiewicz", taskEn: "Ground leveling — Anasiewicz", who: ["Konrad"], date: null, status: "done", note: "Mateusz Prakowski wyrówna teren", category: "site" },
    { id: 7, task: "Paliwo z Admarem", taskEn: "Fuel with Admar", who: ["Konrad"], date: null, status: "done", category: "supplies" },
    { id: 8, task: "Słupki od Gonza", taskEn: "Posts from Gonzo", who: ["Stalowy"], date: null, status: "done", category: "build" },
    { id: 9, task: "Ogrodzenie metalowe do backstage", taskEn: "Metal fence for backstage", who: ["Konrad"], date: null, status: "done", category: "build" },
    { id: 10, task: "Słupki oświetleniowe", taskEn: "Lighting posts", who: ["Stalowy"], date: "2025-08-01", status: "done", note: "ustawianie 3 sierpnia", category: "build" },
    { id: 11, task: "Sprawdzić kasę z poprzedniej edycji", taskEn: "Check leftover cash from last edition", who: ["Kinia", "Asia"], date: null, status: "done", note: "ok. 700 zł", category: "finance" },
    { id: 12, task: "Promocja zbiórki", taskEn: "Promote fundraiser", who: ["Kinia", "Asia"], date: "2025-07-14", status: "done", category: "promo" },
    { id: 13, task: "Posty na stronie", taskEn: "Website posts", who: ["Kinia", "Asia"], date: "2025-07-12", status: "in-progress", category: "promo" },
    { id: 14, task: "Wycena koszulek", taskEn: "T-shirt quotes", who: ["Radosław"], date: null, status: "done", category: "merch" },
    { id: 15, task: "Wlepki", taskEn: "Stickers", who: ["Radosław"], date: null, status: "done", category: "merch" },
    { id: 16, task: "Naprawa namiotu", taskEn: "Tent repair", who: ["Stalowy"], date: "2025-06-30", status: "done", category: "build" },
    { id: 17, task: "Zwożenie palet", taskEn: "Bring pallets to site", who: ["Stalowy"], date: "2025-07-26", status: "todo", note: "do 2 sierpnia", category: "build" },
    { id: 18, task: "Początek budowy", taskEn: "Build start", who: ["Stalowy"], date: "2025-08-04", status: "todo", category: "build" },
    { id: 19, task: "Scena ma stać", taskEn: "Stage standing", who: ["Stalowy"], date: "2025-08-07", status: "todo", category: "build" },
    { id: 20, task: "Prysznic, woda", taskEn: "Shower, water", who: ["Konrad"], date: "2025-08-05", status: "todo", category: "build" },
    { id: 21, task: "Oświetlenie pola, toi-toi", taskEn: "Field lighting, toilets", who: ["Stalowy", "Misio"], date: "2025-07-17", status: "todo", note: "toi-toi na 6 sierpnia", category: "build" },
    { id: 22, task: "Ogrodzenie pola, backstage", taskEn: "Field & backstage fencing", who: ["Stalowy"], date: "2025-08-06", status: "todo", category: "build" },
    { id: 23, task: "Sklepik, namioty na scenie", taskEn: "Shop, stage tents", who: ["Stalowy"], date: "2025-08-07", status: "todo", category: "build" },
    { id: 24, task: "Oznakowanie pola i taśmy", taskEn: "Field signage & tape", who: ["Kinia"], date: "2025-08-08", status: "todo", note: "potrzeba 750 m taśmy", category: "site" },
    { id: 25, task: "Nagłośnienie", taskEn: "Sound system", who: ["Konrad"], date: "2025-08-08", status: "cancelled", category: "production" },
    { id: 26, task: "Jedzenie dla zespołów", taskEn: "Food for bands", who: ["Misio"], date: null, status: "in-progress", note: "leczo / bigos / grochówka 60 osób", category: "catering" },
    { id: 27, task: "Beczka piwa dla zespołów", taskEn: "Beer keg for bands", who: ["Misio"], date: "2025-08-07", status: "done", note: "~200 zł", category: "catering" },
    { id: 28, task: "Piwo w puszkach", taskEn: "Canned beer", who: [], date: null, status: "todo", category: "catering" },
    { id: 29, task: "Koszulki dla organizatorów", taskEn: "Crew t-shirts", who: [], date: null, status: "in-progress", note: "rozmiary do ustalenia", category: "merch" },
    { id: 30, task: "Nalewak i gaz — Robert", taskEn: "Tap and gas — Robert", who: ["Solis"], date: null, status: "todo", category: "supplies" },
    { id: 31, task: "Plakietki dla zespołów", taskEn: "Band passes", who: ["Kinia", "Asia"], date: "2025-07-30", status: "done", category: "production" },
    { id: 32, task: "Pytanie do znajomych policjantów", taskEn: "Ask cop friends", who: [], date: null, status: "done", category: "admin" },
    { id: 33, task: "Sprawdzić znaki informacyjne", taskEn: "Check info signs", who: ["Kinia"], date: "2025-07-17", status: "in-progress", note: "do druku i laminacji", category: "site" },
    { id: 34, task: "Sprawdzić apteczkę", taskEn: "Check first-aid kit", who: ["Garf"], date: "2025-07-17", status: "done", category: "safety" },
    { id: 35, task: "Wiaderka na kiepy", taskEn: "Cigarette buckets", who: ["Kinia"], date: "2025-07-05", status: "todo", category: "site" },
    { id: 36, task: "Spawanie obręczy na śmieci", taskEn: "Welding trash hoops", who: ["Radar"], date: null, status: "in-progress", category: "build" },
    { id: 37, task: "Kogut na sklepik", taskEn: "Beacon for shop", who: ["Konrad"], date: "2025-07-05", status: "done", category: "production" },
    { id: 38, task: "Beczki piwa od Wróbla", taskEn: "Beer kegs from Wróbel", who: [], date: null, status: "cancelled", category: "catering" },
    { id: 39, task: "Dodatkowy agregat", taskEn: "Extra generator", who: ["Stalowy"], date: null, status: "in-progress", note: "15 kW główny + 2,5 kW", category: "production" },
    { id: 40, task: "Soundcheck z zespołami", taskEn: "Soundcheck with bands", who: ["Solis"], date: "2025-08-08", status: "todo", category: "production" },
    { id: 41, task: "Tackery, zszywki, trytki", taskEn: "Staplers, staples, zip ties", who: [], date: "2025-07-25", status: "todo", category: "supplies" },
    { id: 42, task: "Foodtruck — gastro", taskEn: "Foodtruck", who: ["Garf"], date: "2025-07-07", status: "done", note: "Hot dogi + foodtruck oba dni", category: "catering" },
    { id: 43, task: "Gaśnice", taskEn: "Fire extinguishers", who: ["Garf"], date: "2025-07-25", status: "in-progress", note: "do 7 sierpnia", category: "safety" },
    { id: 44, task: "Regulamin, zgłoszenia do służb", taskEn: "Regulations, service notifications", who: [], date: "2025-07-12", status: "in-progress", category: "admin" },
    { id: 45, task: "Namiot dla ludzi", taskEn: "Crowd tent", who: ["Puzi"], date: null, status: "in-progress", category: "build" },
    { id: 46, task: "Kosztorys", taskEn: "Budget estimate", who: [], date: null, status: "done", category: "finance" },
    { id: 47, task: "Ubezpieczenie imprezy", taskEn: "Event insurance", who: ["Konrad"], date: "2025-07-29", status: "todo", category: "admin" },
    { id: 48, task: "Koszty agregatu", taskEn: "Generator costs", who: ["Stalowy"], date: "2025-07-21", status: "done", note: "~1000 zł, kaucja 4000 zł", category: "finance" },
    { id: 49, task: "Cebularze z piekarni", taskEn: "Onion rolls from bakery", who: [], date: null, status: "todo", category: "catering" },
    { id: 50, task: "Woda — Cisowianka", taskEn: "Water — Cisowianka", who: ["Garf"], date: "2025-07-10", status: "cancelled", category: "catering" },
    { id: 51, task: "Zapytać Inter o jedzenie", taskEn: "Ask Inter about food", who: ["Puzi"], date: null, status: "todo", category: "catering" },
    { id: 52, task: "Zwiezienie sprzętu przed 7.08", taskEn: "Bring all equipment by Aug 7", who: [], date: "2025-08-07", status: "todo", category: "build" },
    { id: 53, task: "Gumki do namiotu", taskEn: "Tent rubbers", who: ["Garf"], date: "2025-07-25", status: "done", category: "supplies" },
    { id: 54, task: "Oznaczenie parkingu, oświetlenie", taskEn: "Parking signage, lighting", who: [], date: "2025-07-25", status: "todo", category: "site" },
    { id: 55, task: "Posty o sponsorach", taskEn: "Sponsor posts", who: ["Kinia", "Asia"], date: null, status: "todo", category: "promo" },
    { id: 56, task: "Zamykany garnek na pasze", taskEn: "Sealed pot for feed", who: ["Konrad"], date: null, status: "in-progress", note: "~21 litrów", category: "supplies" },
    { id: 57, task: "Oznakowanie parkingu", taskEn: "Parking signs", who: [], date: null, status: "todo", category: "site" },
    { id: 58, task: "Spotkanie 31 lipca", taskEn: "Meeting July 31", who: [], date: "2025-07-31", status: "todo", category: "admin" },
  ];

  const STATUSES = [
    { id: "todo", pl: "Nie rozpoczęto", en: "Not started" },
    { id: "in-progress", pl: "W trakcie", en: "In progress" },
    { id: "done", pl: "Wykonane", en: "Done" },
    { id: "cancelled", pl: "Anulowane", en: "Cancelled" },
  ];

  const CATEGORIES = [
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

  const PEOPLE = ["Konrad", "Stalowy", "Kinia", "Asia", "Misio", "Radosław", "Garf", "Radar", "Solis", "Puzi"];

  // ----- COSTS -----
  const COSTS = [
    { id: "c1", name: "Zakupy spożywcze i przemysłowe cz.1", nameEn: "Food & supplies pt.1", amount: 670, category: "supplies" },
    { id: "c2", name: "Torby", nameEn: "Bags", amount: 600, category: "merch" },
    { id: "c3", name: "Wlepki", nameEn: "Stickers", amount: 160, category: "merch" },
    { id: "c4", name: "Koszulki", nameEn: "T-shirts", amount: 3300, category: "merch" },
    { id: "c5", name: "Zakupy spożywcze cz.2", nameEn: "Food & supplies pt.2", amount: 177, category: "supplies" },
    { id: "c6", name: "Plandeka", nameEn: "Tarp", amount: 425, category: "build" },
    { id: "c7", name: "Inne drobne", nameEn: "Misc small", amount: 50, category: "supplies" },
    { id: "c8", name: "Baner sponsorów", nameEn: "Sponsor banner", amount: 60, category: "promo" },
    { id: "c9", name: "Jedzenie dla zespołów", nameEn: "Food for bands", amount: 475, category: "catering" },
    { id: "c10", name: "Toi-toi", nameEn: "Portable toilets", amount: 1140, category: "site" },
    { id: "c11", name: "Zespół: Nic ważnego", nameEn: "Band: Nic ważnego", amount: 300, category: "bands" },
    { id: "c12", name: "Zespół: Tojad", nameEn: "Band: Tojad", amount: 300, category: "bands" },
    { id: "c13", name: "Zespół: Pogoria", nameEn: "Band: Pogoria", amount: 1000, category: "bands" },
    { id: "c14", name: "Zespół: Obywatel X", nameEn: "Band: Obywatel X", amount: 500, category: "bands" },
    { id: "c15", name: "Zespół: Reszta pokolenia", nameEn: "Band: Reszta pokolenia", amount: 300, category: "bands" },
    { id: "c16", name: "Zespół: Likho", nameEn: "Band: Likho", amount: 500, category: "bands" },
    { id: "c17", name: "Zespół: Granda", nameEn: "Band: Granda", amount: 300, category: "bands" },
    { id: "c18", name: "Zespół: Nikodem", nameEn: "Band: Nikodem", amount: 300, category: "bands" },
    { id: "c19", name: "Apteczka, prysznic, kod QR", nameEn: "First aid, shower, QR map", amount: 285, category: "safety" },
    { id: "c20", name: "Sztućce, miski do jedzenia", nameEn: "Cutlery, bowls", amount: 370, category: "catering" },
    { id: "c21", name: "Agregat", nameEn: "Generator", amount: 1050, category: "production" },
  ];

  const REVENUE = [
    { id: "r1", name: "Świnka skarbonka", nameEn: "Piggy bank", amount: 540, category: "donations" },
    { id: "r2", name: "Sponsorzy — Radek", nameEn: "Sponsors — Radek", amount: 3300, category: "sponsors" },
    { id: "r3", name: "Sponsorzy — Konrad", nameEn: "Sponsors — Konrad", amount: 1200, category: "sponsors" },
    { id: "r4", name: "Zrzutka", nameEn: "Crowdfunding", amount: 2660, category: "donations" },
    { id: "r5", name: "Mercz — Kinga (BLIK)", nameEn: "Merch — Kinga (BLIK)", amount: 925, category: "merch" },
    { id: "r6", name: "Mercz — Asia (gotówka)", nameEn: "Merch — Asia (cash)", amount: 3670, category: "merch" },
  ];

  const COST_CATEGORIES = [
    { id: "bands", pl: "Zespoły", en: "Bands" },
    { id: "merch", pl: "Mercz", en: "Merch" },
    { id: "site", pl: "Teren", en: "Site" },
    { id: "production", pl: "Produkcja", en: "Production" },
    { id: "catering", pl: "Catering", en: "Catering" },
    { id: "supplies", pl: "Zaopatrzenie", en: "Supplies" },
    { id: "safety", pl: "Bezpieczeństwo", en: "Safety" },
    { id: "promo", pl: "Promocja", en: "Promo" },
    { id: "build", pl: "Budowa", en: "Build" },
  ];

  const REVENUE_CATEGORIES = [
    { id: "sponsors", pl: "Sponsorzy", en: "Sponsors" },
    { id: "donations", pl: "Zbiórki", en: "Donations" },
    { id: "merch", pl: "Mercz", en: "Merch" },
  ];

  // ----- WAREHOUSE -----
  const WAREHOUSE = [
    { id: "w1", name: "Halogen LED z czujnikiem ruchu", nameEn: "LED floodlight w/ motion sensor", qty: 6, unit: "szt", location: "Misio", category: "lighting", note: "2 nowe, 1 bez uchwytu (sprawne)" },
    { id: "w2", name: "Znak \"Teren prywatny\" laminowany", nameEn: "\"Private property\" laminated sign", qty: 1, unit: "szt", location: "Misio", category: "signs", note: "" },
    { id: "w3", name: "Znak \"Parking\" laminowany ←", nameEn: "\"Parking\" laminated sign ←", qty: 3, unit: "szt", location: "Misio", category: "signs", note: "" },
    { id: "w4", name: "Znak \"Parking\" blaszany", nameEn: "\"Parking\" metal street sign", qty: 1, unit: "szt", location: "Misio", category: "signs", note: "" },
    { id: "w5", name: "Megafon Rebel", nameEn: "Megaphone Rebel", qty: 1, unit: "szt", location: "Misio", category: "other", note: "Naprawiony" },
    { id: "w6", name: "Kogut 12V", nameEn: "Beacon 12V", qty: 1, unit: "szt", location: "Asia/Radek", category: "other", note: "" },
    { id: "w7", name: "Microswitch RF 433 12V", nameEn: "RF 433 12V microswitch", qty: 1, unit: "szt", location: "Asia/Radek", category: "other", note: "" },
    { id: "w8", name: "Pilot RF 433", nameEn: "RF 433 remote", qty: 5, unit: "szt", location: "Asia/Radek", category: "other", note: "" },
    { id: "w9", name: "Lampki najazdowe solarne", nameEn: "Solar driveway lights", qty: 12, unit: "szt", location: "Misio", category: "lighting", note: "Pod parking" },
    { id: "w10", name: "Lampka solarna wisząca", nameEn: "Hanging solar lamp", qty: 1, unit: "szt", location: "Misio", category: "lighting", note: "" },
    { id: "w11", name: "Lampa solarna typu UFO", nameEn: "UFO-type solar lamp", qty: 1, unit: "szt", location: "Misio", category: "lighting", note: "" },
    { id: "w12", name: "Lampka solarna ogrodzeniowa", nameEn: "Solar fence lamp", qty: 5, unit: "szt", location: "Asia/Radek", category: "lighting", note: "" },
    { id: "w13", name: "Kantówki na maszty oświetleniowe", nameEn: "Lighting mast posts", qty: 10, unit: "szt", location: "Asia/Radek", category: "lighting", note: "Od Kuby Rosińskiego" },
    { id: "w14", name: "Lampki Łukasza do BackStage'u", nameEn: "Łukasz's backstage lights", qty: 1, unit: "kpl", location: "Misio", category: "lighting", note: "" },
    { id: "w15", name: "Lampka solarna ogrodzeniowa 100 LED", nameEn: "Solar fence lamp 100 LED", qty: 1, unit: "szt", location: "Asia/Radek", category: "lighting", note: "" },
    { id: "w16", name: "Baner sponsorzy", nameEn: "Sponsor banner", qty: 1, unit: "szt", location: "Asia/Radek", category: "banners", note: "U Konrada" },
    { id: "w17", name: "Taśma biało-czerwona", nameEn: "Red-white tape", qty: 500, unit: "m", location: "Stalowy", category: "supplies", note: "Trzeba jeszcze ~750 m" },
    { id: "w18", name: "Oświetlenie banerów", nameEn: "Banner lighting", qty: 1, unit: "kpl", location: "Stalowy", category: "lighting", note: "Działa, regulacja natężenia OK" },
    { id: "w19", name: "Słupki na ogrodzenie", nameEn: "Fence posts", qty: 1, unit: "kpl", location: "Stalowy", category: "build", note: "U Gonza" },
    { id: "w20", name: "Identyfikatory", nameEn: "Crew passes", qty: 95, unit: "szt", location: "Asia/Radek", category: "other", note: "Gotowe" },
    { id: "w21", name: "Wąż do prysznica", nameEn: "Shower hose", qty: 1, unit: "szt", location: "Konrad", category: "build", note: "" },
    { id: "w22", name: "Apteczka", nameEn: "First-aid kit", qty: 1, unit: "szt", location: "Konrad", category: "safety", note: "" },
  ];

  const WH_CATEGORIES = [
    { id: "lighting", pl: "Oświetlenie", en: "Lighting" },
    { id: "signs", pl: "Znaki", en: "Signs" },
    { id: "banners", pl: "Banery", en: "Banners" },
    { id: "build", pl: "Budowa", en: "Build" },
    { id: "supplies", pl: "Zaopatrzenie", en: "Supplies" },
    { id: "safety", pl: "Bezpieczeństwo", en: "Safety" },
    { id: "other", pl: "Inne", en: "Other" },
  ];

  const LOCATIONS = ["Misio", "Stalowy", "Asia/Radek", "Konrad"];

  return {
    FESTIVAL_START, FESTIVAL_END,
    TASKS, STATUSES, CATEGORIES, PEOPLE,
    COSTS, REVENUE, COST_CATEGORIES, REVENUE_CATEGORIES,
    WAREHOUSE, WH_CATEGORIES, LOCATIONS,
  };
})();
