// Overview service — maps GET /api/Overview
// Returns OverviewDto: tasksDone, tasksTotal, inProgress,
//   totalCosts, totalRevenue, balance, revenueEntries, costEntries, warehouseItems
import { get } from './api.js';

export const getOverview = () => get('/Overview');
