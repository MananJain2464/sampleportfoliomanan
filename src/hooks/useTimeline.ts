import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, TimelineEntry } from '@/lib/supabase';

const QUERY_KEY = ['timeline'];

export function useTimeline(type?: 'experience' | 'education') {
  return useQuery<TimelineEntry[]>({
    queryKey: type ? [...QUERY_KEY, type] : QUERY_KEY,
    queryFn: async () => {
      let query = supabase.from('timeline').select('*').order('sort_order');
      if (type) query = query.eq('type', type);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddTimelineEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Omit<TimelineEntry, 'id'>) => {
      const { error } = await supabase.from('timeline').insert([entry]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateTimelineEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TimelineEntry> & { id: string }) => {
      const { error } = await supabase.from('timeline').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteTimelineEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('timeline').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
