import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { useToast } from "@/components/ui/use-toast";

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        console.log("Fetching customers...");
        const { data, error } = await supabase
          .from('customers')
          .select(`
            id,
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            country,
            postal_code,
            lifetime_value,
            created_at,
            updated_at
          `)
          .order('first_name', { ascending: true });
        
        if (error) {
          console.error('Error fetching customers:', error);
          throw error;
        }
        
        console.log("Customers data:", data);
        setCustomers(data || []);
      } catch (error) {
        console.error('Error in useCustomers:', error);
        toast({
          title: "Error",
          description: "Failed to load customers",
          variant: "destructive",
        });
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();

    // Set up real-time subscription
    const subscription = supabase
      .channel('customers_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'customers'
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchCustomers(); // Refresh the data when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return {
    customers,
    isLoading,
  };
}