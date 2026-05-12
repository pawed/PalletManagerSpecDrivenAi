import { useQuery } from '@tanstack/react-query';
import * as costService from '../services/costService.js';
import { queryKeys } from '../lib/queryKeys.js';

export function useCosts() {
  return useQuery({
    queryKey: queryKeys.costs.all,
    queryFn: costService.getAll,
    staleTime: Infinity,
  });
}
