// Warehouse service — maps GET /api/Warehouse
// API WarehouseItemDto fields match UI shape exactly:
//   id (uuid string), name, qty (double), unit, location, category, note (all string|null)
import { get } from './api.js';

const normalise = (w) => ({
  ...w,
  name:     w.name     ?? '',
  unit:     w.unit     ?? '',
  location: w.location ?? '',
  category: w.category ?? '',
  note:     w.note     ?? '',
});

export const getAll = () =>
  get('/Warehouse').then((data) => data.map(normalise));
