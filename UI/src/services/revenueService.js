// Revenue service — maps GET /api/Revenue
// API RevenueDto fields match UI shape exactly:
//   id (uuid string), name (string|null), amount (double), category (string|null)
import { get } from './api.js';

const normalise = (r) => ({
  ...r,
  name:     r.name     ?? '',
  category: r.category ?? '',
});

export const getAll = () =>
  get('/Revenue').then((data) => data.map(normalise));
