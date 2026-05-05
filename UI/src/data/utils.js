import { I18N } from './festival';

// Pretend "today" = July 22, 2025 (~17 days before festival)
export const TODAY = new Date(2025, 6, 22);

export const fmtPLN = (n) => 
  new Intl.NumberFormat("pl-PL").format(Math.round(n)) + " zł";

export const parseISO = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isoDate = (d) => 
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fmtDate = (s, lang) => {
  const d = parseISO(s);
  if (!d) return "";
  const t = I18N[lang];
  const months = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
  return `${d.getDate()} ${months[d.getMonth()]}`;
};

export const initials = (name) => 
  name.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

export const daysToFestival = () => {
  const festivalStart = new Date(2025, 7, 8); // August 8
  const today = TODAY;
  return Math.max(0, Math.round((festivalStart - today) / 86400000));
};
