import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import type { Expense } from "@/types/expense";

export function useExpenseData() {
  const session = useSession();
  const { toast } = useToast();

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['expenses', session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        toast({
          title: "Error",
          description: "Failed to fetch expenses. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
    enabled: !!session?.user.id,
  });

  return { expenses, isLoading, refetch };
}