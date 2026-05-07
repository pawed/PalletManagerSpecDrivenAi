// Mock data — replace with API calls when backend is ready

/** @type {{ id: string, name: string, amount: number, category: string }[]} */
export const COSTS = [
  { id: "c1", name: "Zakupy spożywcze i przemysłowe cz.1", amount: 670, category: "supplies" },
  { id: "c2", name: "Torby", amount: 600, category: "merch" },
  { id: "c3", name: "Wlepki", amount: 160, category: "merch" },
  { id: "c4", name: "Koszulki", amount: 3300, category: "merch" },
  { id: "c5", name: "Zakupy spożywcze cz.2", amount: 177, category: "supplies" },
  { id: "c6", name: "Plandeka", amount: 425, category: "build" },
];

export const COST_CATEGORIES = [
  { id: "merch", pl: "Mercz", en: "Merch" },
  { id: "supplies", pl: "Zaopatrzenie", en: "Supplies" },
  { id: "build", pl: "Budowa", en: "Build" },
];
