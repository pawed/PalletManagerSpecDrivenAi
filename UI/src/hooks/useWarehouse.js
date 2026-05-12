import { useQuery } from '@tanstack/react-query';
import * as warehouseService from '../services/warehouseService.js';
import { queryKeys } from '../lib/queryKeys.js';

export function useWarehouse() {
  return useQuery({
    queryKey: queryKeys.warehouse.all,
    queryFn: warehouseService.getAll,
    staleTime: Infinity,
  });
}
