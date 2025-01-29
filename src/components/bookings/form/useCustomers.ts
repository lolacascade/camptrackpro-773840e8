import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization } from "@/hooks/use-organization";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!organizationId || !accountId) {
        console.log('No organization or account context found:', { organizationId, accountId });
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching customers with:', { organizationId, accountId });
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .order('first_name');
        
        if (error) throw error;
        console.log('Customers data received:', data);
        setCustomers(data || []);
      } catch (error) {
        console.error('Error in useCustomers:', error);
        toast({
          title: "Error",
          description: "Failed to load customers",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();

    const subscription = supabase
      .channel('customers_changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'customers',
          filter: `organization_id=eq.${organizationId} AND account_id=eq.${accountId}`
        },
        fetchCustomers
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast, organizationId, accountId]);

  return { customers, isLoading };
}