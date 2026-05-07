// Cost service — maps GET /api/Costs
// API CostDto fields match UI shape exactly:
//   id (uuid string), name (string|null), amount (double), category (string|null)
import { get } from './api.js';

const normalise = (c) => ({
  ...c,
  name:     c.name     ?? '',
  category: c.category ?? '',
});

export const getAll = () =>
  get('/Costs').then((data) => data.map(normalise));
