import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Personal } from '@/lib/supabase';

const QUERY_KEY = ['personal'];

export function usePersonal() {
  return useQuery<Personal | null>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('personal')
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePersonal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Personal>) => {
      const current = queryClient.getQueryData<Personal>(QUERY_KEY);
      if (current?.id) {
        const { error } = await supabase
          .from('personal')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', current.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('personal')
          .insert([{ ...updates, updated_at: new Date().toISOString() }]);
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
