import { useQuery } from '@tanstack/react-query';
import { get } from '../services/api.js';
import { queryKeys } from '../lib/queryKeys.js';

export function useOverview() {
  return useQuery({
    queryKey: queryKeys.overview.all,
    queryFn: () => get('/Overview'),
    staleTime: 60 * 10000,
  });
}
