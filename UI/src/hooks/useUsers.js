import { useQuery } from '@tanstack/react-query';
import * as userService from '../services/userService.js';
import { PEOPLE } from '../data/tasks.js';
import { queryKeys } from '../lib/queryKeys.js';

export function usePeople() {
  return useQuery({
    queryKey: queryKeys.people.all,
    queryFn: () => userService.getPeopleNames().catch(() => PEOPLE),
    staleTime: Infinity,
  });
}
