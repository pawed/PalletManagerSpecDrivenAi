// Mock data — replace with API calls when backend is ready

/** @type {{ id: string, name: string, qty: number, unit: string, location: string, category: string, note: string }[]} */
export const WAREHOUSE = [
  { id: "w1", name: "Halogen LED z czujnikiem ruchu",    qty: 6,   unit: "szt", location: "Misio",   category: "lighting", note: "2 nowe" },
  { id: "w2", name: "Znak 'Teren prywatny' laminowany", qty: 1,   unit: "szt", location: "Misio",   category: "signs",    note: "" },
  { id: "w3", name: "Megafon Rebel",                     qty: 1,   unit: "szt", location: "Misio",   category: "other",    note: "Naprawiony" },
  { id: "w4", name: "Lampki najazdowe solarne",          qty: 12,  unit: "szt", location: "Misio",   category: "lighting", note: "Pod parking" },
  { id: "w5", name: "Taśma biało-czerwona",              qty: 500, unit: "m",   location: "Stalowy", category: "supplies", note: "Trzeba jeszcze ~750 m" },
];

export const WH_CATEGORIES = [
  { id: "lighting", pl: "Oświetlenie",  en: "Lighting" },
  { id: "signs",    pl: "Znaki",        en: "Signs" },
  { id: "supplies", pl: "Zaopatrzenie", en: "Supplies" },
  { id: "other",    pl: "Inne",         en: "Other" },
];

export const LOCATIONS = ["Misio", "Stalowy", "Asia/Radek", "Konrad"];
