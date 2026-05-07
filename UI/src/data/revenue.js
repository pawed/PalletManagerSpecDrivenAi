// Mock data — replace with API calls when backend is ready

/** @type {{ id: string, name: string, amount: number, category: string }[]} */
export const REVENUE = [
  { id: "r1", name: "Świnka skarbonka",    amount: 540,  category: "donations" },
  { id: "r2", name: "Sponsorzy — Radek",   amount: 3300, category: "sponsors" },
  { id: "r3", name: "Sponsorzy — Konrad",  amount: 1200, category: "sponsors" },
  { id: "r4", name: "Zrzutka",             amount: 2660, category: "donations" },
];

export const REVENUE_CATEGORIES = [
  { id: "sponsors",  pl: "Sponsorzy", en: "Sponsors" },
  { id: "donations", pl: "Zbiórki",   en: "Donations" },
];
