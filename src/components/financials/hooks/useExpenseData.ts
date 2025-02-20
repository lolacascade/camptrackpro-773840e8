
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";
import type { Expense } from "@/types/expense";

export function useExpenseData() {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();

  const { data: expenses = [], isLoading, refetch } = useQuery({
    queryKey: ['expenses', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        toast({
          title: "Error",
          description: "Organization or account context not found",
          variant: "destructive",
        });
        return [];
      }

      // Commenting out expenses query until table is created
      // const { data, error } = await supabase
      //   .from('expenses')
      //   .select('*')
      //   .eq('organization_id', organizationId)
      //   .eq('account_id', accountId)
      //   .order('date', { ascending: false });

      // if (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to fetch expenses. Please try again.",
      //     variant: "destructive",
      //   });
      //   return [];
      // }

      // return data as Expense[];
      return [];
    },
    enabled: !!organizationId && !!accountId,
  });

  return { expenses, isLoading, refetch };
}
