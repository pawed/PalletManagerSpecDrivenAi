import { useQuery } from '@tanstack/react-query';
import * as userService from '../services/userService.js';
import { PEOPLE } from '../data/tasks.js';
import { queryKeys } from '../lib/queryKeys.js';

const PEOPLE_FALLBACK = PEOPLE.map((name) => ({ id: name, displayName: name }));

export function usePeople() {
  return useQuery({
    queryKey: queryKeys.people.all,
    queryFn: () => userService.getPeople().catch(() => PEOPLE_FALLBACK),
    staleTime: Infinity,
  });
}
