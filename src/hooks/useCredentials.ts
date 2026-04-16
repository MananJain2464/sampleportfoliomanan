import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Credential } from '@/lib/supabase';

const QUERY_KEY = ['credentials'];

export function useCredentials(type?: 'certificate' | 'competition') {
  return useQuery<Credential[]>({
    queryKey: type ? [...QUERY_KEY, type] : QUERY_KEY,
    queryFn: async () => {
      let query = supabase.from('credentials').select('*');
      if (type) query = query.eq('type', type);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddCredential() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credential: Omit<Credential, 'id'>) => {
      const { error } = await supabase.from('credentials').insert([credential]);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateCredential() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Credential> & { id: string }) => {
      const { error } = await supabase.from('credentials').update(updates).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteCredential() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('credentials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
