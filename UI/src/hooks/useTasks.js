import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as taskService from '../services/taskService.js';
import { queryKeys } from '../lib/queryKeys.js';

export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: taskService.getAll,
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdateTaskStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => taskService.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: queryKeys.tasks.all });
      const prev = qc.getQueryData(queryKeys.tasks.all);
      qc.setQueryData(queryKeys.tasks.all, old =>
        old.map(t => t.id === id ? { ...t, status } : t)
      );
      return { prev };
    },
    onError: (_, __, ctx) => qc.setQueryData(queryKeys.tasks.all, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.tasks.all }),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => taskService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tasks.all }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => taskService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tasks.all }),
  });
}
