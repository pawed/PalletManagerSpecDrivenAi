import { useQuery } from '@tanstack/react-query';
import * as revenueService from '../services/revenueService.js';
import { queryKeys } from '../lib/queryKeys.js';

export function useRevenue() {
  return useQuery({
    queryKey: queryKeys.revenue.all,
    queryFn: revenueService.getAll,
    staleTime: Infinity,
  });
}
